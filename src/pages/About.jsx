import { useEffect, useRef } from 'react';

export default function About() {
  const modelViewerRef = useRef(null);

  useEffect(() => {
    import('@google/model-viewer');
  }, []);

  return (
    <section className="relative px-2 sm:px-4 pt-6 pb-16 overflow-hidden">
      {/* Background glow */}
      <div className="absolute w-64 h-64 bg-sg/10 blur-[120px] rounded-full -top-10 left-1/4" />
      <div className="absolute w-40 h-40 bg-teal/10 blur-[100px] rounded-full bottom-0 right-0" />

      {/* HERO */}
      <div className="relative w-full h-64 md:h-80 overflow-hidden rounded-2xl mb-10 mx-auto max-w-7xl">
        <img
          src="/assets/gambar2.jpeg"
          className="w-full h-full object-cover opacity-30"
          alt="About Hero"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-3xl md:text-5xl font-bold tracking-widest text-white">
            TENTANG KAMI
          </h1>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">

        {/* Text & 3D */}
        <div className="flex flex-col md:flex-row gap-8 mb-12">
          {/* TEXT */}
          <div className="flex-1 bg-darkbg-card p-5 sm:p-6 rounded-2xl">
            <h2 className="font-serif text-xl sm:text-2xl text-white mb-4">
              Selamat datang di SEMANGGI FORUM
            </h2>
            <p className="text-gray-300 text-sm leading-relaxed">
              Semanggi Forum adalah forum kolaboratif yang dibangun oleh mahasiswa dengan semangat untuk berkembang bersama melalui project nyata, diskusi bermakna, dan kontribusi sosial. Banyak orang punya potensi. Tapi sedikit yang punya sistem. Di sinilah kami membangun itu — perlahan, metodis, dengan rasa hormat pada proses.
            </p>
          </div>

          {/* 3D (only MD+) */}
          <div className="hidden md:flex flex-1 items-center justify-center relative min-h-[300px]">
            <model-viewer
              ref={modelViewerRef}
              src="/assets/semanggi3d.glb"
              alt="3D Semanggi"
              auto-rotate
              camera-controls
              interaction-prompt="none"
              disable-zoom
              style={{ width: '100%', height: '300px' }}
            />
            {/* Glow */}
            <div className="absolute w-[200px] h-[200px] bg-sg/20 blur-[80px] rounded-full" />
          </div>
        </div>

        {/* Vision / Mission / Goals */}
        <div className="flex flex-col gap-6 items-center">
          <div className="bg-darkbg-card p-5 sm:p-6 rounded-2xl w-full">
            <h3 className="text-sg font-bold text-sm uppercase tracking-widest mb-3">VISI</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              Menjadi komunitas mahasiswa yang aktif, produktif, dan berkembang bersama melalui kolaborasi nyata, serta mampu menciptakan dampak melalui karya, pengetahuan, dan kontribusi sosial.
            </p>
          </div>

          <div className="bg-darkbg-card p-5 sm:p-6 rounded-2xl w-full">
            <h3 className="text-sg font-bold text-sm uppercase tracking-widest mb-3">MISI</h3>
            <ul className="space-y-2 text-gray-300 text-sm list-disc list-inside">
              <li>Membangun sistem project yang konsisten dan berkelanjutan</li>
              <li>Mengembangkan skill setiap anggota sesuai minat dan potensinya</li>
              <li>Menciptakan budaya diskusi yang solutif, bukan sekadar opini</li>
              <li>Mendokumentasikan setiap proses menjadi konten yang bernilai</li>
              <li>Menjadi wadah kolaborasi, eksplorasi, dan kontribusi</li>
            </ul>
          </div>

          <div className="bg-darkbg-card p-5 sm:p-6 rounded-2xl w-full">
            <h3 className="text-sg font-bold text-sm uppercase tracking-widest mb-3">TUJUAN</h3>
            <ul className="space-y-2 text-gray-300 text-sm list-disc list-inside">
              <li>Menghasilkan project nyata</li>
              <li>Mengembangkan skill secara terarah</li>
              <li>Membangun relasi dan peluang</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

