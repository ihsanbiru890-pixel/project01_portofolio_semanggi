import os

os.makedirs('src/pages', exist_ok=True)
os.makedirs('src/components', exist_ok=True)

# Home.jsx
home = '''import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="flex flex-col items-center text-center py-20 sm:py-28 bg-gradient-glow1 relative overflow-hidden">
        <div className="absolute w-64 h-64 bg-sg/10 blur-[100px] rounded-full -top-10"></div>

        <div className="mb-8 z-10">
          <img src="/assets/SMGI_hp-.png" className="w-28 sm:w-32 h-28 sm:h-32 object-contain mx-auto" alt="Semanggi Logo" />
        </div>

        <h1 className="text-3xl sm:text-5xl font-serif text-sg tracking-widest mb-4 z-10">
          SEMANGGI FORUM
        </h1>

        <p className="text-gray-400 text-sm sm:text-base mb-6 z-10">
          ekosistem untuk berkembang
        </p>

        <p className="text-gray-300 text-sm sm:text-base max-w-xl mx-auto mb-12 z-10 px-4">
          Forum kolaboratif mahasiswa untuk berkembang melalui project nyata, diskusi, dan kontribusi.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 max-w-5xl w-full px-4 sm:px-6 z-10">
          <div className="bg-darkbg-card border-b-4 border-sg p-6 sm:p-8 rounded-2xl relative hover:border-sg-light transition-colors">
            <p className="absolute top-3 right-3 text-2xl">&#128161;</p>
            <p className="text-sm sm:text-base">Tempat Ide diuji</p>
          </div>
          <div className="bg-darkbg-card border-b-4 border-sg p-6 sm:p-8 rounded-2xl relative hover:border-sg-light transition-colors">
            <p className="absolute top-3 right-3 text-2xl">&#129488;</p>
            <p className="text-sm sm:text-base">Tempat Skill diasah</p>
          </div>
          <div className="bg-darkbg-card border-b-4 border-sg p-6 sm:p-8 rounded-2xl relative hover:border-sg-light transition-colors">
            <p className="absolute top-3 right-3 text-2xl">&#128526;</p>
            <p className="text-sm sm:text-base">Tempat Karakter dibentuk</p>
          </div>

        <div className="mt-16 z-10 px-4">
          <p className="text-sm text-gray-400 mb-6 italic">
            Kami tidak mencari yang sudah sempurna, kami mencari yang siap berkembang.
          </p>
          <Link to="/form-pendaftaran">
            <button className="btn-primary">
              Gabung
            </button>
          </Link>
        </div>
      </section>

      {/* PROJECT */}
      <section className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <h2 className="section-title text-center mb-12 sm:mb-16">
          Our Project
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12">
          <div className="card text-center hover:border-sg/20 transition-all">
            <h3 className="font-bold text-sm mb-2">THE REST AREA</h3>
            <p className="text-[11px] sm:text-xs text-gray-400 mb-4">
              video cinematic seorang mahasiswa...
              <Link to="/projects" className="text-link ml-1">selengkapnya</Link>
            </p>
            <img src="/assets/therest.jpeg" className="rounded-lg h-32 w-full object-cover" alt="The Rest Area" />
          </div>
          <div className="card text-center hover:border-sg/20 transition-all">
            <h3 className="font-bold text-sm mb-2 uppercase">Website SMGGI</h3>
            <p className="text-[11px] sm:text-xs text-gray-400 mb-4">
              website resmi semanggi...
              <Link to="/projects" className="text-link ml-1">selengkapnya</Link>
            </p>
            <div className="bg-black rounded-lg h-32 flex items-center justify-center border border-white/10">
              <img src="/assets/logoresmi.png" className="w-20 h-20 object-contain" alt="Logo Resmi" />
            </div>
          <div className="card text-center hover:border-sg/20 transition-all">
            <h3 className="font-bold text-sm mb-2 uppercase">Game of Story</h3>
            <p className="text-[11px] sm:text-xs text-gray-400 mb-4">
              game tentang sejarah bangsa...
              <Link to="/projects" className="text-link ml-1">selengkapnya</Link>
            </p>
            <div className="h-32 rounded-lg bg-gradient-to-br from-orange-200/80 via-green-200/80 to-green-400/80"></div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-6 border-t border-white/10 pt-8">
          <p className="text-xs text-gray-400 italic max-w-md text-center md:text-left">
            Kami percaya bahwa setiap individu memiliki potensi unik yang berkembang dalam lingkungan yang tepat.
          </p>
          <Link to="/projects" className="btn-secondary">
            Explore &rarr;
          </Link>
        </div>
      </section>

      {/* TEAM */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="section-title mb-12 sm:mb-16">
          Our Team
        </h2>

        <div className="flex flex-wrap justify-center gap-6 sm:gap-10 mb-12 sm:mb-16">
          <div className="w-20 h-20 sm:w-28 sm:h-28 bg-sg/20 rounded-full"></div>
          <div className="w-20 h-20 sm:w-28 sm:h-28 bg-sg/20 rounded-full"></div>
          <div className="w-20 h-20 sm:w-28 sm:h-28 bg-sg/20 rounded-full"></div>
          <div className="w-20 h-20 sm:w-28 sm:h-28 bg-sg/20 rounded-full"></div>

        <div className="flex justify-center md:justify-end max-w-7xl mx-auto">
          <Link to="/about" className="btn-secondary">
            About &rarr;
          </Link>
        </div>
      </section>
    </>
  );
}
'''
with open('src/pages/Home.jsx', 'w', encoding='utf-8') as f:
    f.write(home)
print('Home.jsx done')
