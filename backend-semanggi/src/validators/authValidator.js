const { z } = require('zod');

exports.registerSchema = z.object({
  body: z.object({
    email: z.string().email("Invalid email format explicitly required"),
    username: z.string().min(3, "Username must be at least 3 characters").max(50),
    password: z.string().min(8, "Password must be at least 8 characters long"),
    roleId: z.number().int().optional()
  })
});

exports.loginSchema = z.object({
  body: z.object({
    email: z.string().email("Invalid email format"),
    password: z.string().min(1, "Password is required")
  })
});
