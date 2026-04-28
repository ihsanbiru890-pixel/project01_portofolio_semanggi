import { useState } from 'react';

/* ============================================================
   CONFIGURATION: Paste your Google Apps Script Web App URL here
   Tutorial: https://github.com/dwyl/learn-to-send-email-via-google-script-html-no-server
   ============================================================ */
const GOOGLE_SCRIPT_URL = '';

export default function FormPendaftaran() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    nama: '',
    email: '',
    tempatLahir: '',
    tanggalLahir: '',
    domisili: '',
    hp: '',
    status: '',
    Skill: '',
    Tools: '',
    motivasi: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (error) setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.nama || !formData.email) {
      alert('Isi yang wajib dulu bro');
      return;
    }

    // If no backend URL configured, show a clear message but still simulate success for demo
    if (!GOOGLE_SCRIPT_URL) {
      setError('Backend belum dikonfigurasi. Tambahkan GOOGLE_SCRIPT_URL di file ini agar data tersimpan.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      // Google Apps Script may return text or JSON
      const text = await response.text();
      let result = {};
      try {
        result = JSON.parse(text);
      } catch {
        result = { result: text };
      }

      if (response.ok || result.result === 'success') {
        setSubmitted(true);
      } else {
        throw new Error(result.error || 'Gagal mengirim data.');
      }
    } catch (err) {
      setError(err.message || 'Terjadi kesalahan saat mengirim. Coba lagi nanti.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({
      nama: '', email: '', tempatLahir: '', tanggalLahir: '',
      domisili: '', hp: '', status: '', Skill: '', Tools: '', motivasi: ''
    });
    setError(null);
  };

  return (
    <div>
      {/* HERO */}
      <section className="relative w-full h-56 md:h-72 overflow-hidden">
        <img
          src="/assets/gambar1.jpeg"
          className="w-full h-full object-cover opacity-25"
          alt="Form Hero"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-3xl md:text-4xl font-bold tracking-widest text-white text-center">
            GABUNG SEMANGGI
          </h1>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-10">

        {/* ===== SUCCESS STATE ===== */}
        {submitted ? (
          <div className="flex flex-col items-center justify-center text-center py-16 px-6">
            {/* Icon centang animasi */}
            <div className="w-24 h-24 rounded-full bg-sg/10 border-2 border-sg/30 flex items-center justify-center mb-6 animate-bounce-slow">
              <svg className="w-12 h-12 text-sg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>

            <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-3">
              Pendaftaran Terkirim! 🎉
            </h2>

            <p className="text-gray-300 text-base md:text-lg leading-relaxed max-w-md">
              Terima kasih, <span className="text-sg font-semibold">{formData.nama || 'Kawan'}</span>!
              Data kamu sudah kami terima.
              <br /><br />
              Selanjutnya akan kami konfirmasi lagi setelah <span className="text-white font-semibold">3 hari</span> melalui email atau nomor yang kamu daftarkan.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <a
                href="/"
                className="px-6 py-3 bg-sg text-white rounded-xl font-semibold hover:bg-sg-dark transition-colors"
              >
                Kembali ke Home
              </a>
              <button
                onClick={() => {
                  setSubmitted(false);
                  handleReset();
                }}
                className="px-6 py-3 border border-white/20 text-gray-300 rounded-xl font-semibold hover:bg-white/5 transition-colors"
              >
                Daftar Lagi
              </button>
            </div>
          </div>

        ) : (
          /* ===== FORM STATE ===== */
          <>
            <div className="text-center mb-8">
              <h1 className="text-3xl font-extrabold text-white">Form Pendaftaran Online</h1>
              <p className="text-gray-300 mt-2">Lengkapi data diri Anda dengan benar</p>
            </div>

            {/* Error Alert */}
            {error && (
              <div className="mb-6 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-red-300 text-sm">
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 mt-0.5 shrink-0 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <p className="font-semibold text-red-200">Gagal mengirim</p>
                    <p>{error}</p>
                  </div>
                </div>
              </div>
            )}

            <div className="bg-white/90 backdrop-blur rounded-2xl shadow-xl overflow-hidden text-gray-900">
              <div className="bg-gradient-to-r from-sg to-slate-600 text-navi p-6">
                <h2 className="text-xl font-bold">Form Pendaftaran</h2>
                <p className="text-sm opacity-90">Isi semua data dengan benar</p>
              </div>

              <form className="p-6 space-y-6" onSubmit={handleSubmit}>
                <div>
                  <h3 className="font-semibold mb-3 border-b pb-2">Data Pribadi</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <input name="nama" type="text" placeholder="Nama Lengkap *" className="input" required value={formData.nama} onChange={handleChange} />
                    <input name="email" type="email" placeholder="Email *" className="input" required value={formData.email} onChange={handleChange} />
                    <input name="tempatLahir" type="text" placeholder="Tempat Lahir" className="input" value={formData.tempatLahir} onChange={handleChange} />
                    <input name="tanggalLahir" type="date" className="input" value={formData.tanggalLahir} onChange={handleChange} />
                    <input name="domisili" type="text" placeholder="Domisili" className="input" value={formData.domisili} onChange={handleChange} />
                    <input name="hp" type="tel" placeholder="No HP" className="input" value={formData.hp} onChange={handleChange} />
                    <input name="Skill" type="text" placeholder="Skill yang kamu punya" className="input" value={formData.Skill} onChange={handleChange} />
                    <input name="Tools" type="text" placeholder="Tools yang bisa kamu pakai" className="input" value={formData.Tools} onChange={handleChange} />
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-3 border-b pb-2">Status</h3>
                  <select name="status" className="input" value={formData.status} onChange={handleChange}>
                    <option value="">-- Pilih Status --</option>
                    <option value="Mahasiswa">Mahasiswa</option>
                    <option value="Bekerja">Bekerja</option>
                  </select>
                </div>

                <div>
                  <h3 className="font-semibold mb-3 border-b pb-2">Tambahan</h3>
                  <textarea name="motivasi" placeholder="Motivasi" className="input h-28" value={formData.motivasi} onChange={handleChange}></textarea>
                </div>

                <div className="flex justify-end gap-3">
                  <button type="button" onClick={handleReset} className="px-4 py-2 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-100">
                    Reset
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className={`px-4 py-2 rounded-xl font-semibold text-white transition-colors flex items-center gap-2 ${
                      loading
                        ? 'bg-sg/60 cursor-not-allowed'
                        : 'bg-sg hover:bg-sg-dark'
                    }`}
                  >
                    {loading && (
                      <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    )}
                    {loading ? 'Mengirim...' : 'Submit'}
                  </button>
                </div>
              </form>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

