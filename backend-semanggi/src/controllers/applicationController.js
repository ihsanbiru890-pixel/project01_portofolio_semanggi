const applicationService = require('../services/applicationService.js');
const mailService = require('../services/mailService.js');

exports.create = async (req, res, next) => {
  try {
    const data = await applicationService.createApplication(req.body);
    res.status(201).json({ success: true, data });
  } catch (err) {
    next(err);
  }
};

exports.getAll = async (req, res, next) => {
  try {
    const data = await applicationService.getAllApplications();
    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
};

exports.getById = async (req, res, next) => {
  try {
    const data = await applicationService.getApplicationById(req.params.id);
    if (!data) return res.status(404).json({ success: false, message: 'Data pendaftaran tidak ditemukan' });
    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
};

exports.update = async (req, res, next) => {
  try {
    const { status } = req.body;
    const oldData = await applicationService.getApplicationById(req.params.id);
    
    const data = await applicationService.updateApplication(req.params.id, req.body);
    
    // If status changed to ACCEPTED, send email
    if (status === 'ACCEPTED' && oldData.status !== 'ACCEPTED') {
      try {
        await mailService.sendAcceptanceEmail(data);
      } catch (mailErr) {
        console.error('Failed to send acceptance email:', mailErr);
        // We don't want to fail the whole update just because email failed
      }
    }
    
    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
};

exports.remove = async (req, res, next) => {
  try {
    await applicationService.deleteApplication(req.params.id);
    res.json({ success: true, message: 'Data pendaftaran berhasil dihapus' });
  } catch (err) {
    next(err);
  }
};
