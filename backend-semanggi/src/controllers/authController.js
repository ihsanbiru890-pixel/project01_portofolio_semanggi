const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');
const { userService } = require('../services/index.js');
const logger = require('../lib/logger.js');

const JWT_SECRET = process.env.JWT_SECRET || 'supersecretfallbackkey';
const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

exports.register = async (req, res, next) => {
  try {
  const { email: rawEmail, username, password, roleId } = req.body;
  const email = rawEmail.toLowerCase();
    
    // Check if user already exists
    const existingUser = await userService.getUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ error: 'User with this email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await userService.createUser({
      email,
      username,
      password: hashedPassword,
      roleId: parseInt(roleId || 1, 10) // default role if not provided
    });

    const token = jwt.sign(
      { id: user.id, role: user.role?.name || 'USER' }, 
      JWT_SECRET, 
      { expiresIn: '1d' }
    );
    res.status(201).json({ token, user });
  } catch (err) { next(err); }
};

exports.login = async (req, res, next) => {
  try {
    const { email: rawEmail, password } = req.body;
    const email = rawEmail.toLowerCase();
    const user = await userService.getUserByEmail(email);

    if (!user) {
      logger.warn(`Login failed: User not found with email ${email}`);
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      logger.warn(`Login failed: Password mismatch for email ${email}`);
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const token = jwt.sign(
      { id: user.id, role: user.role?.name || 'USER' }, 
      JWT_SECRET, 
      { expiresIn: '1d' }
    );
    res.json({ token, user });
  } catch (err) { next(err); }
};

exports.googleLogin = async (req, res, next) => {
  try {
    const { credential } = req.body;
    const ticket = await googleClient.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    const { email, name, picture, sub: googleId } = payload;

    let user = await userService.getUserByEmail(email);

    if (!user) {
      // Create new user if doesn't exist
      user = await userService.createUser({
        email,
        username: name || email.split('@')[0],
        password: await bcrypt.hash(googleId, 10), // dummy password for OAuth users
        profilePicUrl: picture,
        roleId: 1, // default role
      });
    }

    const token = jwt.sign(
      { id: user.id, role: user.role?.name || 'USER' }, 
      JWT_SECRET, 
      { expiresIn: '1d' }
    );
    res.json({ token, user });
  } catch (err) {
    next(err);
  }
};
