import { useEffect, useRef } from 'react';

export default function About() {
  const modelViewerRef = useRef(null);

  useEffect(() => {
    import('@google/model-viewer');
  }, []);

  return (
    <section className="relative px-4 sm:px-6 pt-0 pb-20 overflow-hidden">
      {/* Background glow */}
      <div className="absolute w-64 h-64 bg-sg/10 blur-[120px] rounded-full top-20 left-1/4 pointer-events-none" />
      <div className="absolute w-40 h-40 bg-teal/10 blur-[100px] rounded-full bottom-0 right-0 pointer-events-none" />

      {/* HERO BANNER */}
      <div className="relative w-full h-56 md:h-72 overflow-hidden mb-12">
        <img src="/assets/gambar2.jpeg" className="w-full h-full object-cover opacity-25" alt="About Hero" />
        <div className="absolute inset-0 bg-gradient-to-t from-darkbg via-black/30 to-transparent" />
        <div className="absolute inset-0 flex items-end px-8 pb-8">
          <div>
            <p className="text-xs text-sg tracking-[0.3em] uppercase mb-1">Who We Are</p>
            <h1 className="text-3xl md:text-5xl font-bold tracking-wider text-white">TENTANG KAMI</h1>
          </div>
        </div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Text & 3D */}
        <div className="flex flex-col md:flex-row gap-8 mb-10">
          <div className="flex-1 bg-darkbg-card p-6 sm:p-8 rounded-3xl border border-white/5 hover-lift">
            <p className="text-xs text-sg tracking-[0.3em] uppercase mb-3">Tentang</p>
            <h2 className="font-bold text-xl sm:text-2xl text-white mb-4">
              Selamat datang di <span className="text-sg">SEMANGGI FORUM</span>
            </h2>
            <p className="text-gray-400 text-sm leading-relaxed">
              Semanggi Forum adalah forum kolaboratif yang dibangun oleh mahasiswa dengan semangat untuk berkembang bersama melalui project nyata, diskusi bermakna, dan kontribusi sosial.
            </p>
            <p className="text-gray-500 text-sm leading-relaxed mt-3">
              Banyak orang punya potensi. Tapi sedikit yang punya sistem. Di sinilah kami membangun itu — perlahan, metodis, dengan rasa hormat pada proses.
            </p>
          </div>

          <div className="hidden md:flex flex-1 items-center justify-center relative min-h-[280px] bg-darkbg-card rounded-3xl border border-white/5 overflow-hidden">
            <model-viewer
              ref={modelViewerRef}
              src="/assets/semanggi3d.glb"
              alt="3D Semanggi"
              auto-rotate
              camera-controls
              interaction-prompt="none"
              disable-zoom
              style={{ width: '100%', height: '280px' }}
            />
            <div className="absolute w-[200px] h-[200px] bg-sg/20 blur-[80px] rounded-full pointer-events-none" />
          </div>
        </div>

        {/* Vision / Mission / Goals */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-darkbg-card p-6 rounded-3xl border border-white/5 hover:border-sg/30 hover:-translate-y-1 transition-all duration-300">
            <div className="w-10 h-10 rounded-xl bg-sg/10 flex items-center justify-center mb-4 border border-sg/20">
              <span className="text-sg text-lg">🎯</span>
            </div>
            <h3 className="text-sg font-bold text-xs uppercase tracking-widest mb-3">VISI</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Menjadi komunitas mahasiswa yang aktif, produktif, dan berkembang bersama melalui kolaborasi nyata, serta mampu menciptakan dampak melalui karya, pengetahuan, dan kontribusi sosial.
            </p>
          </div>

          <div className="bg-darkbg-card p-6 rounded-3xl border border-white/5 hover:border-sg/30 hover:-translate-y-1 transition-all duration-300">
            <div className="w-10 h-10 rounded-xl bg-sg/10 flex items-center justify-center mb-4 border border-sg/20">
              <span className="text-sg text-lg">🚀</span>
            </div>
            <h3 className="text-sg font-bold text-xs uppercase tracking-widest mb-3">MISI</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              {[
                'Membangun sistem project yang konsisten',
                'Mengembangkan skill setiap anggota',
                'Menciptakan budaya diskusi yang solutif',
                'Mendokumentasikan setiap proses',
                'Menjadi wadah kolaborasi & eksplorasi',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-sg mt-0.5 shrink-0">▸</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-darkbg-card p-6 rounded-3xl border border-white/5 hover:border-sg/30 hover:-translate-y-1 transition-all duration-300">
            <div className="w-10 h-10 rounded-xl bg-sg/10 flex items-center justify-center mb-4 border border-sg/20">
              <span className="text-sg text-lg">🌱</span>
            </div>
            <h3 className="text-sg font-bold text-xs uppercase tracking-widest mb-3">TUJUAN</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              {[
                'Menghasilkan project nyata yang berdampak',
                'Mengembangkan skill secara terarah',
                'Membangun relasi dan peluang karir',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-sg mt-0.5 shrink-0">▸</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
