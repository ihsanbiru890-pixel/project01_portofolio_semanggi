import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { HiOutlineUser, HiOutlineChatBubbleOvalLeft } from 'react-icons/hi2';
import api from '../lib/api';

export default function Forum() {
  const navigate = useNavigate();
  const [threads, setThreads] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState('Semua');
  const [loading, setLoading] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newThread, setNewThread] = useState({ title: '', content: '', categoryId: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    setCurrentUser(user);
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [threadsRes, categoriesRes] = await Promise.all([
        api.get('/discussions'),
        api.get('/categories')
      ]);
      setThreads(threadsRes.data);
      const cats = categoriesRes.data;
      setCategories([{ id: 'all', name: 'Semua' }, ...cats]);
      if (cats.length > 0) setNewThread(prev => ({ ...prev, categoryId: cats[0].id }));
    } catch (err) {
      console.error('Failed to fetch forum data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCreateThread = async (e) => {
    e.preventDefault();
    if (!currentUser) return alert('Silakan login untuk membuat diskusi');
    
    setIsSubmitting(true);
    try {
      await api.post('/discussions', {
        ...newThread,
        userId: currentUser.id,
        categoryId: parseInt(newThread.categoryId)
      });
      setIsModalOpen(false);
      setNewThread({ title: '', content: '', categoryId: categories[1]?.id || '' });
      fetchData();
    } catch (err) {
      alert('Gagal membuat diskusi');
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredThreads = activeCategory === 'Semua' 
    ? threads 
    : threads.filter(t => t.category?.name === activeCategory);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div>
          <p className="text-xs text-sg tracking-[0.3em] uppercase mb-2">Komunitas</p>
          <h1 className="text-4xl font-bold tracking-widest">FORUM DISKUSI</h1>
          <p className="text-gray-400 text-sm mt-2">Tempat ide bertemu dengan solusi</p>
        </div>
        <button 
          onClick={() => currentUser ? setIsModalOpen(true) : navigate('/login')}
          className="btn-primary shrink-0"
        >
          + Buat Diskusi
        </button>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map((cat) => (
          <button 
            key={cat.id} 
            onClick={() => setActiveCategory(cat.name)}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold border transition-all ${activeCategory === cat.name ? 'bg-sg text-white border-sg' : 'border-white/10 text-gray-400 hover:border-sg/50 hover:text-sg'}`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Thread List */}
      <div className="space-y-6">
        {loading ? (
          <div className="space-y-6">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-48 bg-white/5 animate-pulse rounded-3xl" />
            ))}
          </div>
        ) : filteredThreads.length > 0 ? (
          filteredThreads.map((t) => (
            <Link to={`/forum/${t.id}`} key={t.id} className="block group">
              <div className="bg-darkbg-card border border-white/5 rounded-3xl p-7 sm:p-8 hover:border-sg/40 hover:shadow-2xl hover:shadow-sg/5 transition-all duration-500 relative overflow-hidden">
                {/* Subtle Glow on Hover */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-sg/5 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="flex justify-between items-start mb-5 relative z-10">
                  <span className="text-[10px] tracking-widest uppercase bg-sg/10 text-sg px-3 py-1 rounded-full border border-sg/20 font-bold">
                    {t.category?.name || 'Umum'}
                  </span>
                  <span className="text-[10px] text-gray-500 font-medium tracking-widest uppercase">
                    {new Date(t.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </span>
                </div>
                
                <h2 className="text-xl sm:text-2xl font-bold text-white mb-3 group-hover:text-sg transition-colors duration-300 leading-tight">
                  {t.title}
                </h2>
                
                <p className="text-gray-400 text-sm mb-6 line-clamp-2 leading-relaxed font-light">
                  {t.content}
                </p>
                
                <div className="flex items-center justify-between mt-auto pt-5 border-t border-white/5 relative z-10">
                  <div className="flex items-center gap-5">
                    <span className="flex items-center gap-2 text-xs text-gray-500 group-hover:text-gray-300 transition-colors">
                      <div className="w-6 h-6 rounded-full bg-sg/20 flex items-center justify-center border border-sg/30">
                        <HiOutlineUser className="w-3.5 h-3.5 text-sg" />
                      </div>
                      <span className="font-semibold">{t.user?.username || 'Anonim'}</span>
                    </span>
                    <span className="flex items-center gap-2 text-xs text-gray-500">
                      <HiOutlineChatBubbleOvalLeft className="w-4 h-4 text-sg/50" /> 
                      <span className="font-medium">{t.posts?.length || 0} Balasan</span>
                    </span>
                  </div>
                  
                  <div className="text-sg opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div className="text-center py-20 bg-darkbg-card rounded-3xl border border-white/5">
            <p className="text-gray-500 italic">Belum ada diskusi di forum ini.</p>
          </div>
        )}
      </div>

      {/* Create Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-darkbg-card border border-white/10 rounded-3xl w-full max-w-lg p-8 shadow-2xl relative">
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-6 right-6 text-gray-500 hover:text-white"
            >✕</button>
            
            <h2 className="text-xl font-bold mb-6">Mulai Diskusi Baru</h2>
            
            <form onSubmit={handleCreateThread} className="space-y-4">
              <div>
                <label className="text-xs text-gray-500 uppercase tracking-widest block mb-2">Kategori</label>
                <select 
                  className="input"
                  value={newThread.categoryId}
                  onChange={(e) => setNewThread({...newThread, categoryId: e.target.value})}
                  required
                >
                  {categories.filter(c => c.id !== 'all').map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="text-xs text-gray-500 uppercase tracking-widest block mb-2">Judul</label>
                <input 
                  type="text" 
                  placeholder="Apa yang ingin kamu diskusikan?"
                  className="input"
                  value={newThread.title}
                  onChange={(e) => setNewThread({...newThread, title: e.target.value})}
                  required
                />
              </div>
              
              <div>
                <label className="text-xs text-gray-500 uppercase tracking-widest block mb-2">Konten</label>
                <textarea 
                  placeholder="Tulis detail pertanyaan atau ide kamu di sini..."
                  className="input h-32 resize-none"
                  value={newThread.content}
                  onChange={(e) => setNewThread({...newThread, content: e.target.value})}
                  required
                />
              </div>
              
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="btn-primary w-full py-3 mt-4 disabled:opacity-50"
              >
                {isSubmitting ? 'Memproses...' : 'Publikasikan Diskusi'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
