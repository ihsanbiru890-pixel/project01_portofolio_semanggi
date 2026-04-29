const { sendEmail } = require('../lib/mailer.js');

const mailService = {
  sendAcceptanceEmail: async (app) => {
    const html = `
      <div style="font-family: 'Helvetica', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px; background-color: #0a0d0f; color: #ffffff; border-radius: 20px; border: 1px solid #1a1e21;">
        <div style="text-align: center; margin-bottom: 30px;">
          <img src="https://semanggi.id/assets/logoresmi.png" alt="Semanggi Logo" style="width: 80px; height: 80px; object-fit: contain;">
        </div>
        
        <h1 style="color: #00d1ff; text-align: center; font-size: 24px; letter-spacing: 2px; text-transform: uppercase;">Selamat Datang!</h1>
        
        <div style="background-color: #1a1e21; padding: 30px; border-radius: 15px; margin: 30px 0;">
          <p style="font-size: 16px; line-height: 1.6; color: #cbd5e1;">Halo <strong>${app.nama}</strong>,</p>
          
          <p style="font-size: 16px; line-height: 1.6; color: #cbd5e1;">
            Berdasarkan hasil seleksi pendaftaran Anda, kami dengan bangga menyatakan bahwa Anda <strong>DITERIMA</strong> sebagai anggota baru ekosistem kolaboratif <strong>Semanggi</strong>.
          </p>
          
          <p style="font-size: 16px; line-height: 1.6; color: #cbd5e1;">
            Keahlian Anda dalam bidang <strong>${app.skill}</strong> sangat sesuai dengan visi kami untuk membangun komunitas kreatif yang berdampak.
          </p>
        </div>
        
        <div style="text-align: center; margin: 40px 0;">
          <p style="color: #64748b; font-size: 14px; margin-bottom: 20px;">Silakan bergabung ke grup koordinasi kami untuk langkah selanjutnya:</p>
          <a href="https://chat.whatsapp.com/your-group-link" style="background-color: #00d1ff; color: #ffffff; padding: 15px 35px; text-decoration: none; border-radius: 10px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px; font-size: 14px; display: inline-block;">Gabung Koordinasi</a>
        </div>
        
        <hr style="border: 0; border-top: 1px solid #1a1e21; margin: 40px 0;">
        
        <div style="text-align: center; color: #475569; font-size: 12px;">
          <p>Teruslah berkarya dan berkolaborasi!</p>
          <p>&copy; 2026 Semanggi Creative Hub. All rights reserved.</p>
        </div>
      </div>
    `;

    return sendEmail({
      to: app.email,
      subject: 'Selamat! Anda Diterima di Semanggi',
      html
    });
  }
};

module.exports = mailService;
