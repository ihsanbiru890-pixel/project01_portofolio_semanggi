import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { 
  HiOutlineChatBubbleLeftRight, 
  HiOutlineChartBar, 
  HiOutlineFolder, 
  HiOutlineClipboardDocumentList, 
  HiOutlineArchiveBox,
  HiOutlineUserCircle
} from 'react-icons/hi2';
import api from '../lib/api';

export default function Profile() {
  const [projects, setProjects] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ title: '', desc: '', category: '', link: '' });
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (!savedUser) {
      navigate('/login');
      return;
    }
    
    const parsedUser = JSON.parse(savedUser);
    setUser(parsedUser);

    const fetchUserDetails = async () => {
      try {
        const response = await api.get(`/users/${parsedUser.id}`);
        if (response.data.success) {
          setUser(response.data.data);
          setProjects(response.data.data.portfolios || []);
        }
      } catch (err) {
        console.error('Failed to fetch user details:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [navigate]);

  const stats = [
    { label: 'Diskusi', val: user?.discussions?.length || '0' },
    { label: 'Proyek', val: projects.length.toString() },
    { label: 'Bergabung', val: user?.createdAt ? new Date(user.createdAt).toLocaleDateString('id-ID', { month: 'short', year: 'numeric' }) : '...' },
  ];

  const categories = ['Web Dev', 'Desain', 'Cinematic', 'Game', 'Riset', 'Lainnya'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title) return;
    
    try {
      // In a real app, you would have a POST /portfolios endpoint
      // For now, let's just update local state to simulate success
      setProjects(prev => [...prev, { ...formData, id: Date.now() }]);
      setFormData({ title: '', desc: '', category: '', link: '' });
      setShowForm(false);
    } catch (err) {
      console.error('Failed to add project:', err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  if (!user && loading) return (
    <div className="min-h-screen flex items-center justify-center text-sg uppercase tracking-widest text-xs animate-pulse">
      Memuat Profil...
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
      {/* Profile Card */}
      <div className="relative bg-darkbg-card border border-white/5 rounded-3xl p-8 md:p-10 overflow-hidden mb-8">
        <div className="absolute top-0 right-0 w-64 h-64 bg-sg/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-8">
          <div className="relative shrink-0">
            <div className="w-28 h-28 rounded-full border-2 border-sg/40 bg-darkbg-surface flex items-center justify-center shadow-xl shadow-sg/10 overflow-hidden text-gray-700">
              {user?.profilePicUrl ? (
                <img src={user.profilePicUrl} alt={user.username} className="w-full h-full object-cover" />
              ) : <HiOutlineUserCircle className="w-full h-full p-2" />}
            </div>
            <span className="absolute bottom-1 right-1 w-4 h-4 bg-sg rounded-full border-2 border-darkbg-card" />
          </div>
          <div className="text-center md:text-left flex-1">
            <h1 className="text-2xl font-bold mb-1">{user?.username || 'Nama Pengguna'}</h1>
            <p className="text-gray-400 text-sm mb-4">{user?.email || 'member@semanggi.id'}</p>
            <div className="flex flex-wrap gap-2 justify-center md:justify-start mb-6">
              <span className="bg-sg/10 border border-sg/20 text-sg px-3 py-1 rounded-full text-xs font-semibold">
                {user?.role?.name || 'Member'}
              </span>
              <span className="bg-white/5 border border-white/10 text-gray-300 px-3 py-1 rounded-full text-xs">Mahasiswa</span>
            </div>
            <div className="flex gap-6 justify-center md:justify-start">
              {stats.map((s, i) => (
                <div key={i} className="text-center">
                  <p className="font-bold text-sg text-lg">{s.val}</p>
                  <p className="text-gray-500 text-xs">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <button className="shrink-0 border border-white/10 hover:border-sg/40 text-gray-300 hover:text-sg px-5 py-2 rounded-xl text-xs font-semibold transition-all">
              Edit Profil
            </button>
            <button 
              onClick={handleLogout}
              className="shrink-0 border border-red-500/10 hover:border-red-500/40 text-gray-500 hover:text-red-500 px-5 py-2 rounded-xl text-xs font-semibold transition-all"
            >
              Keluar
            </button>
          </div>
        </div>
      </div>

      {/* Content Grid */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="bg-darkbg-card border border-white/5 rounded-2xl p-6 hover:border-sg/20 transition-all">
          <h3 className="font-bold mb-4 flex items-center gap-2 text-sm uppercase tracking-wider">
            <HiOutlineChatBubbleLeftRight className="text-sg w-5 h-5" /> Aktivitas Diskusi
          </h3>
          <div className="text-center py-8">
            <HiOutlineClipboardDocumentList className="w-12 h-12 text-gray-700 mx-auto mb-3" />
            <p className="text-gray-500 text-sm">
              {user?.discussions?.length > 0 ? `Telah membuat ${user.discussions.length} diskusi.` : 'Belum ada diskusi yang dibuat.'}
            </p>
            <Link to="/forum" className="text-sg text-xs hover:underline mt-2 inline-block">Melihat forum →</Link>
          </div>
        </div>

        <div className="bg-darkbg-card border border-white/5 rounded-2xl p-6 hover:border-sg/20 transition-all">
          <h3 className="font-bold mb-4 flex items-center gap-2 text-sm uppercase tracking-wider">
            <HiOutlineChartBar className="text-sg w-5 h-5" /> Status Akun
          </h3>
          <div className="space-y-3 text-sm text-gray-400">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-sg shrink-0" />
              <span className="text-white capitalize">Status: {user?.accountStatus || 'Active'}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-white/20 shrink-0" />
              <span className="opacity-50">Member sejak {stats[2].val}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Portfolio Section */}
      <div className="bg-darkbg-card border border-white/5 rounded-3xl overflow-hidden">
        <div className="p-6 border-b border-white/5 flex justify-between items-center">
          <h3 className="font-bold flex items-center gap-2 text-sm uppercase tracking-wider">
            <HiOutlineFolder className="text-sg w-5 h-5" /> Koleksi Proyek Porto
            {projects.length > 0 && (
              <span className="ml-2 bg-sg/20 text-sg text-[10px] px-2 py-0.5 rounded-full border border-sg/30">
                {projects.length}
              </span>
            )}
          </h3>
          <button
            onClick={() => setShowForm(!showForm)}
            className="btn-primary py-2 px-4 text-xs"
          >
            {showForm ? '✕ Batal' : '+ Tambah Proyek'}
          </button>
        </div>

        {/* Add Project Form */}
        {showForm && (
          <div className="p-6 border-b border-white/5 bg-white/5">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-gray-400 uppercase tracking-wider block mb-1.5">Nama Proyek *</label>
                  <input name="title" type="text" placeholder="Contoh: Website Portfolio" className="input" required value={formData.title} onChange={handleChange} />
                </div>
                <div>
                  <label className="text-xs text-gray-400 uppercase tracking-wider block mb-1.5">Kategori</label>
                  <select name="category" className="input" value={formData.category} onChange={handleChange}>
                    <option value="">-- Pilih Kategori --</option>
                    {categories.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className="text-xs text-gray-400 uppercase tracking-wider block mb-1.5">Deskripsi</label>
                <textarea name="desc" placeholder="Ceritakan proyek ini singkat..." className="input h-20 resize-none" value={formData.desc} onChange={handleChange} />
              </div>
              <div>
                <label className="text-xs text-gray-400 uppercase tracking-wider block mb-1.5">Link Proyek (opsional)</label>
                <input name="link" type="url" placeholder="https://..." className="input" value={formData.link} onChange={handleChange} />
              </div>
              <div className="flex gap-3 justify-end">
                <button type="button" onClick={() => setShowForm(false)} className="border border-white/10 hover:border-white/30 text-gray-400 px-4 py-2 rounded-xl text-xs font-semibold transition-all">
                  Batal
                </button>
                <button type="submit" className="btn-primary py-2 px-6 text-xs">
                  Simpan Proyek
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Project List or Empty State */}
        {projects.length === 0 ? (
          <div className="text-center py-12">
            <HiOutlineArchiveBox className="w-12 h-12 text-gray-700 mx-auto mb-3" />
            <p className="text-gray-500 text-sm">Belum ada proyek ditambahkan.</p>
            <button onClick={() => setShowForm(true)} className="text-sg text-xs hover:underline mt-2 inline-block">
              Tambah proyek pertama →
            </button>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 gap-4 p-6">
            {projects.map((p) => (
              <div key={p.id} className="bg-darkbg border border-white/5 rounded-2xl p-5 hover:border-sg/20 transition-all group">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-bold text-sm group-hover:text-sg transition-colors">{p.title}</h4>
                  {p.category && (
                    <span className="text-xs bg-sg/10 text-sg px-2 py-0.5 rounded-full border border-sg/20 shrink-0 ml-2">
                      {p.category}
                    </span>
                  )}
                </div>
                {p.desc && <p className="text-gray-500 text-xs mb-3 leading-relaxed line-clamp-2">{p.desc}</p>}
                {p.link && (
                  <a href={p.link} target="_blank" rel="noopener noreferrer" className="text-xs text-sg hover:underline flex items-center gap-1">
                    🔗 Lihat Proyek
                  </a>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
