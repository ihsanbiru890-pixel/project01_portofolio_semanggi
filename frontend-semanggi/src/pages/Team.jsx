import { useState, useEffect } from 'react';
import api from '../lib/api';

export default function Team() {
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMember, setSelectedMember] = useState(null);
  const [activeFilter, setActiveFilter] = useState('Semua');

  const filters = ['Semua', 'ROOT', 'Leaf'];

  const staticNames = [
    "Alif Alfredo", "Abrar Sagusta Putra", "Dhea Syahrani", 
    "Ferta Junindi", "Ifradil", "M. Ikhsan", 
    "M. Khadavi", "Rahmat Sriyanto", "Ziaulhaq"
  ];

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
        setLoading(false);
      }
    };
    fetchTeam();
  }, []);

  const displayTeam = staticNames.map((name, i) => {
    const memberFromDb = team.find(m => m.name.toLowerCase() === name.toLowerCase());
    const role = (name.toLowerCase() === "dhea syahrani" || name.toLowerCase() === "ifradil") ? "Leaf" : "ROOT";
    const slug = name.toLowerCase().replace(/\s+/g, '-').replace(/\./g, '');
    const localPhoto = `/assets/team/root/${slug}.webp`;

    return memberFromDb 
      ? { ...memberFromDb, role, photoUrl: memberFromDb.photoUrl || localPhoto } 
      : { name, role, photoUrl: localPhoto, bio: null };
  });

  // Show EVERYONE (ROOT + Leaf) on this page
  const allTeam = displayTeam;

  // Final filtered list
  const filteredTeam = allTeam.filter(m => 
    activeFilter === 'Semua' ? true : m.role === activeFilter
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
      {/* Header */}
      <div className="text-center mb-10">
        <p className="text-xs text-sg tracking-[0.4em] uppercase mb-3">Filosofi Semanggi</p>
        <h1 className="text-4xl sm:text-5xl font-black tracking-widest mb-4 uppercase">Para Kelopak</h1>
        <p className="text-gray-400 text-sm max-w-2xl mx-auto leading-relaxed">
          Setiap individu dalam ekosistem ini adalah bagian penting yang saling melengkapi, 
          tumbuh bersama layaknya kelopak daun semanggi.
        </p>
      </div>

      {/* Filters */}
      <div className="flex justify-center gap-3 mb-16 overflow-x-auto pb-4 no-scrollbar">
        {filters.map(f => (
          <button
            key={f}
            onClick={() => setActiveFilter(f)}
            className={`px-8 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest border transition-all duration-300 ${
              activeFilter === f
                ? 'bg-sg text-black border-sg shadow-lg shadow-sg/20 scale-105'
                : 'bg-white/5 text-gray-500 border-white/5 hover:border-white/10 hover:text-gray-300'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {loading ? (
          [1, 2, 3, 4, 5, 6, 7, 8].map(i => (
            <div key={i} className="aspect-[3/4] bg-white/5 animate-pulse rounded-3xl" />
          ))
        ) : filteredTeam.length > 0 ? (
          filteredTeam.map((member, i) => (
            <div 
              key={i} 
              onClick={() => setSelectedMember(member)}
              className="group relative aspect-[3/4] bg-darkbg-card border border-white/5 rounded-3xl overflow-hidden hover:border-sg/50 hover:-translate-y-2 hover:shadow-2xl hover:shadow-sg/20 transition-all duration-500 cursor-pointer"
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
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500" />
              </div>

              {/* Content */}
              <div className="absolute inset-0 z-10 p-6 flex flex-col justify-end text-left">
                <p className="text-[10px] text-sg font-bold tracking-[0.3em] uppercase mb-1 drop-shadow-md">{member.role}</p>
                <h3 className="text-lg font-bold text-white leading-tight drop-shadow-md">{member.name}</h3>
                
                <div className="h-0 group-hover:h-8 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center overflow-hidden">
                  <span className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold flex items-center gap-2">
                    Lihat Detail 
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                  </span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full py-20 text-center text-gray-600 italic tracking-widest text-xs uppercase">
            Tidak ada anggota dalam kategori ini
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {selectedMember && (
        <div className="fixed inset-0 z-[200] bg-black/90 backdrop-blur-xl flex items-center justify-center p-4" onClick={() => setSelectedMember(null)}>
          <div className="bg-darkbg-card border border-white/10 rounded-[2.5rem] w-full max-w-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row relative" onClick={e => e.stopPropagation()}>
            <button onClick={() => setSelectedMember(null)} className="absolute top-6 right-6 z-20 text-white/50 hover:text-white transition-colors">✕</button>
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
            <div className="p-8 md:p-12 flex-1 flex flex-col justify-center">
              <div className="mb-6">
                <p className="text-xs text-sg font-bold tracking-[0.4em] uppercase mb-3">Kelopak Semanggi</p>
                <h2 className="text-3xl font-bold text-white mb-2">{selectedMember.name}</h2>
                <span className="inline-block px-4 py-1.5 bg-sg/10 text-sg border border-sg/20 rounded-full text-[10px] font-black uppercase tracking-widest">
                  Role: {selectedMember.role}
                </span>
              </div>
              <div className="space-y-4">
                <p className="text-gray-400 text-sm leading-relaxed italic">
                  "{selectedMember.bio || 'Menjadi bagian dari Semanggi untuk tumbuh dan berkontribusi bagi ekosistem mahasiswa.'}"
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
