import { useState } from 'react';

export default function FormPendaftaran() {
  const [showAlert, setShowAlert] = useState(false);
  const [formData, setFormData] = useState({
    nama: '',
    email: '',
    tempatLahir: '',
    tanggalLahir: '',
    domisili: '',
    hp: '',
    status: '',
    motivasi: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.nama || !formData.email) {
      alert('Isi yang wajib dulu bro \uD83D\uDE04');
      return;
    }
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
    setFormData({
      nama: '', email: '', tempatLahir: '', tanggalLahir: '',
      domisili: '', hp: '', status: '', motivasi: ''
    });
  };

  const handleReset = () => {
    setFormData({
      nama: '', email: '', tempatLahir: '', tanggalLahir: '',
      domisili: '', hp: '', status: '', motivasi: ''
    });
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
      <div className="text-center mb-8">
        <h1 className="text-3xl font-extrabold text-white">Form Pendaftaran Online</h1>
        <p className="text-gray-300 mt-2">Lengkapi data diri Anda dengan benar</p>
      </div>

      <div id="successAlert" className={`${showAlert ? 'block' : 'hidden'} bg-sg/20 text-sg-light p-4 rounded-xl mb-6 border border-sg/30`}>
        <strong>Berhasil!</strong> Data terkirim.
      </div>

      <div className="bg-white/90 backdrop-blur rounded-2xl shadow-xl overflow-hidden text-gray-900">
        <div className="bg-gradient-to-r from-sg to-teal-dark text-white p-6">
          <h2 className="text-xl font-bold">Form Pendaftaran</h2>
          <p className="text-sm opacity-90">Isi semua data dengan benar</p>
        </div>

        <form id="form" className="p-6 space-y-6" onSubmit={handleSubmit}>
          <div>
            <h3 className="font-semibold mb-3 border-b pb-2">Data Pribadi</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <input name="nama" type="text" placeholder="Nama Lengkap *" className="input" required value={formData.nama} onChange={handleChange} />
              <input name="email" type="email" placeholder="Email *" className="input" required value={formData.email} onChange={handleChange} />
              <input name="tempatLahir" type="text" placeholder="Tempat Lahir" className="input" value={formData.tempatLahir} onChange={handleChange} />
              <input name="tanggalLahir" type="date" className="input" value={formData.tanggalLahir} onChange={handleChange} />
              <input name="domisili" type="text" placeholder="Domisili" className="input" value={formData.domisili} onChange={handleChange} />
              <input name="hp" type="tel" placeholder="No HP" className="input" value={formData.hp} onChange={handleChange} />
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
            <button type="button" onClick={handleReset} className="px-4 py-2 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-100">Reset</button>
            <button type="submit" className="px-4 py-2 bg-sg text-white rounded-xl hover:bg-sg-dark">Submit</button>
          </div>
        </form>
      </div>
    </div>
  </div>
  );
}

