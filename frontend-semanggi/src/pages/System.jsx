import { Link } from 'react-router-dom';

export default function System() {
  const methods = [
    {
      icon: (
        <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
      title: 'MANDOR METHOD',
      desc: 'Sistem kerja berbasis proyek yang terstruktur untuk memastikan setiap tugas memiliki arah, peran yang jelas, dan progres yang terpantau.',
    },
    {
      icon: (
        <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeWidth="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a2 2 0 01-2-2v-6a2 2 0 012-2h2" />
          <path strokeWidth="2" d="M15 3H9a2 2 0 00-2 2v6l4 4 4-4V5a2 2 0 00-2-2z" />
        </svg>
      ),
      title: 'PROBLEM THREAD',
      desc: 'Ruang diskusi terfokus untuk mengurai masalah secara mendalam, menemukan akar persoalan, dan merumuskan solusi yang tepat.',
    },
    {
      icon: (
        <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeWidth="2" d="M4 4v5h5M20 20v-5h-5M4 20l5-5M20 4l-5 5" />
        </svg>
      ),
      title: 'ITERASI & DELIVER',
      desc: 'Proses pengembangan yang berkelanjutan dengan fokus pada peningkatan terus-menerus dan pengiriman hasil yang berkualitas.',
    },
  ];

  const sops = [
    'Tidak ada paksaan dalam project',
    'Komitmen terhadap project yang disepakati',
    'Diskusi harus membawa solusi',
    'Menghargai kontribusi setiap anggota',
    'Konsistensi lebih penting dari intensitas',
  ];

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <img src="/assets/gambar1.jpeg" className="w-full h-64 object-cover opacity-20" alt="Background" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-darkbg/60 to-darkbg" />
        </div>
        <div className="relative z-10 max-w-6xl mx-auto px-6 pt-16 pb-20">
          <p className="text-xs text-sg tracking-[0.3em] uppercase mb-3">Cara Kami Belajar</p>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-widest">SYSTEM</h1>
        </div>
      </section>

      {/* METHODS */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 pb-10">
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-9 top-0 bottom-0 w-px bg-gradient-to-b from-sg via-sg/40 to-transparent hidden md:block" />

          <div className="space-y-8">
            {methods.map((m, i) => (
              <div key={i} className="flex flex-col md:flex-row gap-6 items-start md:items-center group">
                <div className="shrink-0">
                  <div className="w-16 h-16 md:w-[72px] md:h-[72px] rounded-full bg-gradient-to-br from-sg to-sg-dark flex items-center justify-center shadow-xl shadow-sg/30 border-4 border-darkbg group-hover:scale-110 transition-transform duration-300">
                    {m.icon}
                  </div>
                </div>
                <div className="flex-1 bg-darkbg-card rounded-2xl border border-white/5 p-6 sm:p-8 hover:border-sg/30 hover:shadow-lg hover:shadow-sg/10 transition-all duration-300">
                  <h2 className="text-sg font-bold text-lg sm:text-xl mb-2">{m.title}</h2>
                  <p className="text-gray-400 text-sm leading-relaxed">{m.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SOP */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 pb-20">
        <div className="bg-darkbg-card rounded-3xl border border-white/5 p-8 sm:p-10 md:p-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-sg/15 blur-[80px] pointer-events-none" />
          <div className="relative z-10">
            <div className="text-center mb-8">
              <h2 className="text-5xl sm:text-6xl font-extrabold mb-2">SOP</h2>
              <p className="text-gray-400 text-sm tracking-widest uppercase">Rule Dasar</p>
              <div className="w-12 h-1 bg-sg rounded-full mx-auto mt-4" />
            </div>

            <div className="grid sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
              {sops.map((sop, i) => (
                <div key={i} className="flex items-start gap-3 bg-white/5 rounded-xl p-4 border border-white/5">
                  <span className="w-7 h-7 shrink-0 rounded-full bg-sg/20 border border-sg/30 text-sg text-xs font-bold flex items-center justify-center mt-0.5">
                    {i + 1}
                  </span>
                  <p className="text-sm text-gray-300">{sop}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="flex flex-col items-center mt-12 text-center gap-4">
          <p className="text-gray-400 text-sm max-w-md">
            Kami mencari orang yang siap bertanggung jawab dan berkembang.
          </p>
          <Link to="/register">
            <button className="btn-primary">JOIN US →</button>
          </Link>
        </div>
      </section>
    </>
  );
}
