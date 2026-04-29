import { useState, useEffect } from 'react';
import { HiOutlinePlay, HiOutlineFilm } from 'react-icons/hi2';
import api from '../lib/api';
import ConfirmModal from '../components/ConfirmModal';

const tags = ['Semua', 'Cinematic', 'Behind the Scenes', 'Tutorial', 'Event'];

export default function Videos() {
  const [activeTag, setActiveTag] = useState('Semua');
  const [lightbox, setLightbox] = useState(null);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newVideo, setNewVideo] = useState({ title: '', tag: 'Cinematic', description: '', videoFile: null, thumbFile: null });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmModal, setConfirmModal] = useState({ isOpen: false, id: null });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    setIsAdmin(user.role?.name === 'ADMIN');
  }, []);

  const handleAddVideo = async (e) => {
    e.preventDefault();
    if (!newVideo.videoFile) return alert('Pilih file video terlebih dahulu');
    
    setIsSubmitting(true);
    const formData = new FormData();
    formData.append('video', newVideo.videoFile);
    if (newVideo.thumbFile) formData.append('thumbnail', newVideo.thumbFile);
    formData.append('title', newVideo.title);
    formData.append('tag', newVideo.tag);
    formData.append('description', newVideo.description);

    try {
      const res = await api.post('/videos', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      if (res.data.success) {
        setIsAddModalOpen(false);
        setNewVideo({ title: '', tag: 'Cinematic', description: '', videoFile: null, thumbFile: null });
        fetchVideos();
      }
    } catch (err) {
      alert('Gagal menambah video');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteVideo = async (e, id) => {
    e.stopPropagation();
    setConfirmModal({ isOpen: true, id });
  };

  const confirmDelete = async () => {
    try {
      await api.delete(`/videos/${confirmModal.id}`);
      fetchVideos();
    } catch (err) {
      alert('Gagal menghapus video');
    }
  };

  const fetchVideos = async () => {
    setLoading(true);
    try {
      const url = activeTag === 'Semua' ? '/videos' : `/videos?tag=${activeTag}`;
      const response = await api.get(url);
      if (response.data.success) {
        setVideos(response.data.data);
      }
    } catch (err) {
      console.error('Failed to fetch videos:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, [activeTag]);

  const filteredVideos = activeTag === 'Semua' 
    ? videos 
    : videos.filter(v => v.tag === activeTag);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 min-h-screen">
      {/* Header */}
      <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <p className="text-xs text-sg tracking-[0.3em] uppercase mb-2">Video Dokumentasi</p>
          <h1 className="text-4xl font-bold tracking-widest mb-2">OUTPUT VISUAL</h1>
          <p className="text-gray-400 text-sm">Kumpulan dokumentasi video dan karya sinematik Semanggi.</p>
        </div>
        {isAdmin && (
          <button 
            onClick={() => setIsAddModalOpen(true)}
            className="btn-primary py-2.5 px-6 text-xs uppercase tracking-widest flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
            Tambah Video
          </button>
        )}
      </div>

      {/* Filter Tags */}
      <div className="flex flex-wrap gap-2 mb-8">
        {tags.map(tag => (
          <button
            key={tag}
            onClick={() => setActiveTag(tag)}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold border transition-all ${
              activeTag === tag
                ? 'bg-sg text-white border-sg'
                : 'border-white/10 text-gray-400 hover:border-sg/50 hover:text-sg'
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[1, 2].map(i => (
            <div key={i} className="h-64 bg-white/5 animate-pulse rounded-3xl" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredVideos.map(video => (
            <div
              key={video.id}
              className="group bg-darkbg-card rounded-3xl overflow-hidden border border-white/5 hover:border-sg/30 hover:shadow-2xl hover:shadow-sg/10 transition-all duration-500"
            >
              {/* Thumbnail Container */}
              <div 
                className="relative aspect-video overflow-hidden cursor-pointer"
                onClick={() => setLightbox(video)}
              >
                <img
                  src={video.thumbnailUrl}
                  alt={video.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500 flex items-center justify-center">
                  <div className="w-16 h-16 bg-sg text-white rounded-full flex items-center justify-center shadow-2xl scale-90 group-hover:scale-100 transition-transform duration-500">
                    <HiOutlinePlay className="w-8 h-8 ml-1" />
                  </div>
                </div>
                <div className="absolute top-4 left-4">
                  <span className="text-[10px] bg-sg/80 backdrop-blur-md text-white px-3 py-1 rounded-full font-bold uppercase tracking-widest">
                    {video.tag}
                  </span>
                </div>
                {isAdmin && (
                  <button
                    onClick={(e) => handleDeleteVideo(e, video.id)}
                    className="absolute top-4 right-4 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full transition-colors opacity-0 group-hover:opacity-100"
                    title="Hapus Video"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                )}
              </div>

              {/* Info */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-sg transition-colors">
                  {video.title}
                </h3>
                <p className="text-gray-400 text-sm line-clamp-2 font-light leading-relaxed">
                  {video.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {!loading && filteredVideos.length === 0 && (
        <div className="text-center py-20 bg-darkbg-card rounded-3xl border border-white/5">
          <HiOutlineFilm className="w-16 h-16 text-gray-700 mx-auto mb-3" />
          <p className="text-gray-500 text-sm">Belum ada video untuk kategori ini.</p>
        </div>
      )}

      {/* Video Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[150] bg-black/95 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <div
            className="relative max-w-5xl w-full aspect-video rounded-3xl overflow-hidden shadow-2xl border border-white/10"
            onClick={e => e.stopPropagation()}
          >
            <iframe
              src={lightbox.videoUrl + "?autoplay=1"}
              title={lightbox.title}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
            <button
              onClick={() => setLightbox(null)}
              className="absolute -top-12 right-0 text-white hover:text-sg transition-colors flex items-center gap-2 uppercase tracking-widest text-xs font-bold"
            >
              Tutup ✕
            </button>
          </div>
        </div>
      )}

      {/* Add Video Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-darkbg-card border border-white/10 rounded-3xl w-full max-w-md p-8 shadow-2xl relative">
            <button 
              onClick={() => setIsAddModalOpen(false)}
              className="absolute top-6 right-6 text-gray-500 hover:text-white transition-colors"
            >✕</button>
            
            <h2 className="text-xl font-bold mb-6">Tambah Video Baru</h2>
            
            <form onSubmit={handleAddVideo} className="space-y-4">
              <div>
                <label className="text-[10px] text-gray-500 uppercase tracking-[0.2em] block mb-2 font-bold">File Video</label>
                <input 
                  type="file" 
                  accept="video/*"
                  onChange={(e) => setNewVideo({ ...newVideo, videoFile: e.target.files[0] })}
                  className="block w-full text-xs text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-[10px] file:font-bold file:uppercase file:tracking-widest file:bg-sg/10 file:text-sg hover:file:bg-sg/20 transition-all"
                />
              </div>

              <div>
                <label className="text-[10px] text-gray-500 uppercase tracking-[0.2em] block mb-2 font-bold">Thumbnail (Opsional)</label>
                <input 
                  type="file" 
                  accept="image/*"
                  onChange={(e) => setNewVideo({ ...newVideo, thumbFile: e.target.files[0] })}
                  className="block w-full text-xs text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-[10px] file:font-bold file:uppercase file:tracking-widest file:bg-sg/10 file:text-sg hover:file:bg-sg/20 transition-all"
                />
              </div>

              <div>
                <label className="text-[10px] text-gray-500 uppercase tracking-[0.2em] block mb-2 font-bold">Judul</label>
                <input 
                  type="text" 
                  className="input"
                  placeholder="Judul video..."
                  value={newVideo.title}
                  onChange={(e) => setNewVideo({ ...newVideo, title: e.target.value })}
                  required
                />
              </div>

              <div>
                <label className="text-[10px] text-gray-500 uppercase tracking-[0.2em] block mb-2 font-bold">Kategori</label>
                <select 
                  className="input"
                  value={newVideo.tag}
                  onChange={(e) => setNewVideo({ ...newVideo, tag: e.target.value })}
                >
                  {tags.filter(t => t !== 'Semua').map(t => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-[10px] text-gray-500 uppercase tracking-[0.2em] block mb-2 font-bold">Deskripsi</label>
                <textarea 
                  className="input h-20 resize-none"
                  placeholder="Deskripsi singkat..."
                  value={newVideo.description}
                  onChange={(e) => setNewVideo({ ...newVideo, description: e.target.value })}
                />
              </div>

              <button 
                type="submit"
                disabled={isSubmitting}
                className="btn-primary w-full py-3 mt-4 disabled:opacity-50 flex justify-center items-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                    Mengunggah...
                  </>
                ) : 'Simpan Video'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Confirm Modal */}
      <ConfirmModal 
        isOpen={confirmModal.isOpen}
        title="Hapus Video"
        message="Hapus video ini secara permanen?"
        onConfirm={confirmDelete}
        onClose={() => setConfirmModal({ isOpen: false, id: null })}
      />
    </div>
  );
}
