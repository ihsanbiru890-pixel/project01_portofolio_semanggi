import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { HiOutlineLightBulb, HiOutlineWrench, HiOutlineAcademicCap } from 'react-icons/hi2';
import api from '../lib/api';

export default function Home() {
  const [team, setTeam] = useState([]);
  const [loadingTeam, setLoadingTeam] = useState(true);
  const [selectedMember, setSelectedMember] = useState(null);
  const [showAllTeam, setShowAllTeam] = useState(false);

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
          <h2 className="text-3xl sm:text-4xl font-bold tracking-widest">PARA KELOPAK SEMANGGI</h2>
          <p className="text-gray-400 text-sm mt-2">Orang-orang yang menggerakkan Semanggi</p>
        </div>

        <div className="flex flex-wrap justify-center gap-5 mb-12">
          {loadingTeam ? (
            <div className="w-full py-10 text-center text-gray-500 animate-pulse uppercase tracking-widest text-xs">
              Memuat Tim...
            </div>
          ) : (() => {
            const staticNames = [
              "Alif Alfredo", "Abrar Sagusta Putra", "Dhea Syahrani", 
              "Ferta Junindi", "Ifradil", "M. Ikhsan", 
              "M. Khadavi", "Rahmat Sriyanto", "Ziaulhaq"
            ];
            
            const displayTeam = staticNames.map((name, i) => {
              const memberFromDb = team.find(m => m.name.toLowerCase() === name.toLowerCase());
              const role = (name.toLowerCase() === "dhea syahrani" || name.toLowerCase() === "ifradil") ? "Leaf" : "ROOT";
              const slug = name.toLowerCase().replace(/\s+/g, '-').replace(/\./g, '');
              const localPhoto = `/assets/team/root/${slug}.webp`;
              
              return memberFromDb 
                ? { ...memberFromDb, role, photoUrl: memberFromDb.photoUrl || localPhoto } 
                : { name, role, photoUrl: localPhoto, bio: null };
            });

            // Show ONLY ROOT on Home
            const visibleTeam = displayTeam.filter(m => m.role === "ROOT");

            return visibleTeam.map((member, i) => (
              <div 
                key={i} 
                onClick={() => setSelectedMember(member)}
                className="group relative w-full sm:w-[calc(50%-1.25rem)] lg:w-[calc(25%-1.25rem)] aspect-[3/4] bg-darkbg-card border border-white/5 rounded-3xl overflow-hidden hover:border-sg/50 hover:-translate-y-2 hover:shadow-2xl hover:shadow-sg/20 transition-all duration-500 cursor-pointer"
              >
                {/* Photo Background */}
                <div className="absolute inset-0 z-0">
                  {member.photoUrl ? (
                    <img src={member.photoUrl} alt={member.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700" />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-sg/20 to-darkbg-card flex items-center justify-center">
                      <span className="text-sg/20 text-8xl font-black">{member.name.charAt(0)}</span>
                    </div>
                  )}
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500" />
                </div>

                {/* Content */}
                <div className="absolute inset-0 z-10 p-6 flex flex-col justify-end text-left">
                  <p className="text-[10px] text-sg font-bold tracking-[0.3em] uppercase mb-1 drop-shadow-md">{member.role}</p>
                  <h3 className="text-lg font-bold text-white leading-tight drop-shadow-md">{member.name}</h3>
                  
                  {/* Hover detail hint */}
                  <div className="h-0 group-hover:h-8 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center overflow-hidden">
                    <span className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold flex items-center gap-2">
                      Lihat Detail 
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                    </span>
                  </div>
                </div>
              </div>
            ));
          })()}
        </div>

        {/* Show More Link */}
        <div className="flex justify-center mb-12">
          <Link 
            to="/team"
            className="group flex flex-col items-center gap-3"
          >
            <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-sg/20 group-hover:border-sg/50 transition-all duration-500">
              <svg className="w-5 h-5 text-gray-400 group-hover:text-sg group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
            </div>
            <span className="text-[10px] text-gray-500 uppercase tracking-[0.3em] font-bold group-hover:text-sg transition-colors">Lihat Seluruh Anggota</span>
          </Link>
        </div>

        {/* Member Detail Modal */}
        {selectedMember && (
          <div className="fixed inset-0 z-[200] bg-black/90 backdrop-blur-xl flex items-center justify-center p-4" onClick={() => setSelectedMember(null)}>
            <div className="bg-darkbg-card border border-white/10 rounded-[2.5rem] w-full max-w-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row relative" onClick={e => e.stopPropagation()}>
              <button onClick={() => setSelectedMember(null)} className="absolute top-6 right-6 z-20 text-white/50 hover:text-white transition-colors">✕</button>
              
              {/* Photo */}
              <div className="w-full md:w-2/5 aspect-[3/4] md:aspect-auto relative bg-darkbg-card border-r border-white/5">
                {selectedMember.photoUrl ? (
                  <img src={selectedMember.photoUrl} alt={selectedMember.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-sg/10 flex items-center justify-center">
                    <span className="text-sg/20 text-9xl font-black">{selectedMember.name.charAt(0)}</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>

              {/* Info */}
              <div className="p-8 md:p-12 flex-1 flex flex-col justify-center">
                <div className="mb-6">
                  <p className="text-xs text-sg font-bold tracking-[0.4em] uppercase mb-3">Kelopak Semanggi</p>
                  <h2 className="text-3xl font-bold text-white mb-2">{selectedMember.name}</h2>
                  <span className="inline-block px-4 py-1.5 bg-sg/10 text-sg border border-sg/20 rounded-full text-[10px] font-black uppercase tracking-widest">
                    Role: Leaf
                  </span>
                </div>

                <div className="space-y-4">
                  <p className="text-gray-400 text-sm leading-relaxed italic">
                    "{selectedMember.bio || 'Menjadi bagian dari Semanggi untuk tumbuh dan berkontribusi bagi ekosistem mahasiswa.'}"
                  </p>
                  
                  <div className="pt-6 border-t border-white/5 flex gap-4">
                    {/* Placeholder social icons */}
                    {[1, 2, 3].map(i => (
                      <div key={i} className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-gray-500 hover:text-sg hover:border-sg/30 transition-all cursor-pointer">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.411 2.865 8.139 6.839 9.465.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.341-3.369-1.341-.454-1.152-1.11-1.459-1.11-1.459-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482C19.138 20.136 22 16.411 22 12c0-5.523-4.477-10-10-10z"/></svg>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

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

