import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { HiOutlineLightBulb, HiOutlineWrench, HiOutlineAcademicCap } from 'react-icons/hi2';
import api from '../lib/api';

export default function Home() {
  const [team, setTeam] = useState([]);
  const [loadingTeam, setLoadingTeam] = useState(true);

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const response = await api.get('/team');
        if (response.data.success) {
          setTeam(response.data.data);
        }
      } catch (err) {
        console.error('Failed to fetch team:', err);
      } finally {
        setLoadingTeam(false);
      }
    };
    fetchTeam();
  }, []);


  return (
    <>
      {/* HERO */}
      <section className="flex flex-col items-center justify-center text-center min-h-screen bg-gradient-glow1 relative overflow-hidden py-8">
        {/* Multi-layer glow background */}
        <div className="absolute w-96 h-96 bg-sg/10 blur-[120px] rounded-full -top-20 left-1/2 -translate-x-1/2 pointer-events-none" />
        <div className="absolute w-64 h-64 bg-sg/5 blur-[80px] rounded-full bottom-10 right-10 pointer-events-none" />
        <div className="absolute w-48 h-48 bg-teal/5 blur-[80px] rounded-full bottom-10 left-10 pointer-events-none" />

        {/* Logo with float animation */}
        <div className="mb-4 z-10 animate-float">
          <div className="relative mx-auto w-fit">
            <div className="absolute inset-0 bg-sg/20 blur-2xl rounded-full scale-150" />
            <img src="/assets/SMGI_hp-.png" className="w-20 sm:w-24 h-20 sm:h-24 object-contain mx-auto relative z-10 drop-shadow-2xl" alt="Semanggi Logo" />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-3xl sm:text-5xl font-bold text-sg tracking-[0.2em] mb-2 z-10 drop-shadow-lg">
          SEMANGGI
        </h1>
        <p className="text-sm sm:text-base text-sg/70 tracking-[0.4em] uppercase mb-4 z-10 font-light">
          Forum
        </p>

        {/* Tagline */}
        <p className="text-gray-300 text-sm max-w-md mx-auto mb-8 z-10 px-6 leading-relaxed">
          Ekosistem kolaboratif mahasiswa – berkembang melalui <span className="text-sg font-semibold">project nyata</span>, diskusi, dan kontribusi bermakna.
        </p>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 max-w-4xl w-full px-4 sm:px-6 z-10 mb-8">
          {[
            { icon: <HiOutlineLightBulb className="w-6 h-6 text-sg" />, title: 'Tempat Ide diuji', desc: 'Eksplorasi dan validasi ide bersama komunitas' },
            { icon: <HiOutlineWrench className="w-6 h-6 text-sg" />, title: 'Tempat Skill diasah', desc: 'Kerjakan project nyata dan tingkatkan kemampuan' },
            { icon: <HiOutlineAcademicCap className="w-6 h-6 text-sg" />, title: 'Tempat Karakter dibentuk', desc: 'Tumbuh bersama orang-orang yang semangat' },
          ].map((item, i) => (
            <div key={i} className="group bg-darkbg-card border border-white/5 border-b-4 border-b-sg p-4 sm:p-6 rounded-2xl relative hover:border-b-sg-light hover:-translate-y-2 hover:shadow-xl hover:shadow-sg/15 transition-all duration-300 cursor-default">
              <div className="mb-3 group-hover:scale-110 transition-transform duration-300 inline-block">{item.icon}</div>
              <p className="font-bold text-white text-sm sm:text-base mb-2">{item.title}</p>
              <p className="text-gray-500 text-xs leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="z-10 px-4 flex flex-col items-center gap-4">
          <p className="text-xs text-gray-500 italic">
            "Kami tidak mencari yang sudah sempurna, kami mencari yang siap berkembang."
          </p>
          <div className="flex gap-4 flex-wrap justify-center">
            <Link to="/register">
              <button className="btn-primary">Gabung Sekarang →</button>
            </Link>
            <Link to="/forum">
              <button className="btn-secondary px-8 py-3 rounded-xl text-xs font-bold uppercase tracking-widest">Lihat Forum</button>
            </Link>
          </div>
        </div>
      </section>

      {/* PROJECT */}
      <section className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <h2 className="section-title text-center mb-12 sm:mb-16">Our Project</h2>

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
          </div>
          <div className="card text-center hover:border-sg/20 transition-all">
            <h3 className="font-bold text-sm mb-2 uppercase">Game of Story</h3>
            <p className="text-[11px] sm:text-xs text-gray-400 mb-4">
              game tentang sejarah bangsa...
              <Link to="/projects" className="text-link ml-1">selengkapnya</Link>
            </p>
            <div className="h-32 rounded-lg bg-gradient-to-br from-orange-200/80 via-green-200/80 to-green-400/80" />
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-6 border-t border-white/10 pt-8">
          <p className="text-xs text-gray-400 italic max-w-md text-center md:text-left">
            Kami percaya bahwa setiap individu memiliki potensi unik yang berkembang dalam lingkungan yang tepat.
          </p>
          <Link to="/projects" className="btn-secondary">Explore &rarr;</Link>
        </div>
      </section>

      {/* TEAM */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-xs text-sg tracking-[0.3em] uppercase mb-2">Tim Kami</p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-widest">OUR TEAM</h2>
          <p className="text-gray-400 text-sm mt-2">Orang-orang yang menggerakkan Semanggi</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 mb-12">
          {loadingTeam ? (
            <div className="col-span-full py-10 text-center text-gray-500 animate-pulse uppercase tracking-widest text-xs">
              Memuat Tim...
            </div>
          ) : team.length > 0 ? (
            team.map((member, i) => (
              <div key={i} className="group bg-darkbg-card border border-white/5 rounded-2xl p-5 text-center hover:border-sg/30 hover:-translate-y-2 hover:shadow-xl hover:shadow-sg/10 transition-all duration-300 cursor-default">
                <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-sg/30 to-sg/5 border border-white/10 flex items-center justify-center text-2xl sm:text-3xl mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 overflow-hidden`}>
                  {member.photoUrl ? (
                    <img src={member.photoUrl} alt={member.name} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-gray-400 text-xs font-bold">{member.name.charAt(0)}</span>
                  )}
                </div>
                <p className="font-bold text-sm sm:text-base text-white mb-1">{member.name}</p>
                <p className="text-xs text-sg font-semibold tracking-wider uppercase">{member.role}</p>
              </div>
            ))
          ) : (
            <div className="col-span-full py-10 text-center text-gray-600 italic text-sm">
              Belum ada anggota tim yang terdaftar di database.
            </div>
          )}
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-6 border-t border-white/10 pt-8">
          <p className="text-xs text-gray-400 italic max-w-md text-center md:text-left">
            Kami percaya bahwa setiap individu memiliki potensi unik yang berkembang dalam lingkungan yang tepat.
          </p>
          <Link to="/about" className="btn-secondary">Kenali Kami →</Link>
        </div>
      </section>
    </>
  );
}

