import { useState, useEffect } from 'react';
import api from '../lib/api';

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const response = await api.get('/portfolios');
      setProjects(response.data);
    } catch (err) {
      console.error('Failed to fetch projects:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    setIsAdmin(user.role?.name === 'ADMIN');
    fetchProjects();
  }, []);

  const handleDeleteProject = async (id) => {
    if (!window.confirm('Hapus proyek ini?')) return;
    try {
      await api.delete(`/portfolios/${id}`);
      fetchProjects();
    } catch (err) {
      alert('Gagal menghapus proyek');
    }
  };

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <img src="/assets/gambar1.jpeg" className="w-full h-64 object-cover opacity-20" alt="Background" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-darkbg/60 to-darkbg" />
        </div>
        <div className="relative z-10 max-w-6xl mx-auto px-6 pt-16 pb-20 text-center">
          <p className="text-xs text-sg tracking-[0.3em] uppercase mb-3">Portfolio & Output</p>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-widest mb-4">APA YANG<br/>KAMI BANGUN</h1>
          <p className="text-gray-400 text-sm max-w-md mx-auto">
            Hasil karya kolaborasi nyata yang kami ciptakan bersama — dari ide menjadi produk.
          </p>
        </div>
      </section>

      {/* PROJECT LIST */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-20 space-y-10">
        {loading ? (
          <div className="space-y-10">
            {[1, 2].map(i => (
              <div key={i} className="h-64 bg-white/5 animate-pulse rounded-3xl" />
            ))}
          </div>
        ) : projects.length > 0 ? (
          projects.map((project, i) => (
            <div key={i} className="group bg-darkbg-card rounded-3xl border border-white/5 p-8 md:p-10 shadow-xl hover:border-sg/20 hover:shadow-sg/10 transition-all duration-300 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-72 h-72 bg-sg/10 rounded-full blur-[120px] opacity-30 -translate-y-1/2 translate-x-1/2 pointer-events-none" />

              <div className="flex flex-col md:flex-row gap-8 items-center relative z-10">
                {/* Text */}
                <div className="flex-1">
                  <span className="text-xs font-bold px-3 py-1 rounded-full border border-sg/30 text-sg bg-sg/10 mb-4 inline-block tracking-wider">
                    {project.category?.name || 'Umum'}
                  </span>
                  <h2 className="text-2xl font-bold mb-3 group-hover:text-sg transition-colors">{project.title}</h2>
                  <p className="text-gray-400 text-sm leading-relaxed max-w-lg">{project.description}</p>
                  <div className="flex items-center gap-4 mt-6">
                    {project.projectUrl && (
                      <a href={project.projectUrl} target="_blank" rel="noopener noreferrer" className="text-sg text-xs font-bold uppercase tracking-widest hover:underline">
                        Lihat Proyek →
                      </a>
                    )}
                    {isAdmin && (
                      <button 
                        onClick={() => handleDeleteProject(project.id)}
                        className="text-xs text-gray-500 hover:text-red-500 uppercase tracking-widest font-bold transition-colors"
                      >
                        Hapus Proyek
                      </button>
                    )}
                  </div>
                </div>

                {/* Media */}
                <div className="w-full md:w-2/5 shrink-0">
                  {project.coverUrl ? (
                    <img src={project.coverUrl} className="w-full h-48 object-cover rounded-2xl border border-white/10" alt={project.title} />
                  ) : (
                    <div className="w-full h-48 rounded-2xl bg-gradient-to-br from-sg/20 to-teal/20 flex items-center justify-center border border-white/10">
                      <span className="text-sg font-bold tracking-widest">SEMANGGI</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-20 bg-darkbg-card rounded-3xl border border-white/5">
            <p className="text-gray-500 italic">Belum ada proyek yang dipublikasikan.</p>
          </div>
        )}

        {/* Coming Soon card */}
        <div className="bg-darkbg-card rounded-3xl border border-dashed border-white/10 p-10 text-center hover:border-sg/30 transition-all duration-300">
          <p className="text-3xl mb-3">🔨</p>
          <h3 className="font-bold text-white mb-2">Project Baru Dalam Pengerjaan</h3>
          <p className="text-gray-500 text-sm">Stay tuned, kami selalu punya sesuatu yang sedang dibangun.</p>
        </div>
      </section>
    </>
  );
}
