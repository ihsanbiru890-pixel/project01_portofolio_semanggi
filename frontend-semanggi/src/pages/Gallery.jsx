import { useState, useEffect } from 'react';
import { HiOutlinePhoto } from 'react-icons/hi2';
import api from '../lib/api';
import ConfirmModal from '../components/ConfirmModal';

const tags = ['Semua', 'Diskusi', 'Workshop', 'Project', 'Event'];

export default function Gallery() {
  const [activeTag, setActiveTag] = useState('Semua');
  const [lightbox, setLightbox] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newPhoto, setNewPhoto] = useState({ title: '', tag: 'Diskusi', description: '', file: null });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmModal, setConfirmModal] = useState({ isOpen: false, id: null });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    setIsAdmin(user.role?.name === 'ADMIN');
  }, []);

  const fetchGallery = async () => {
    setLoading(true);
    try {
      const url = activeTag === 'Semua' ? '/gallery' : `/gallery?tag=${activeTag}`;
      const response = await api.get(url);
      if (response.data.success) {
        setPhotos(response.data.data);
      }
    } catch (err) {
      console.error('Failed to fetch gallery:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGallery();
  }, [activeTag]);

  const handleAddPhoto = async (e) => {
    e.preventDefault();
    if (!newPhoto.file) return alert('Pilih foto terlebih dahulu');
    
    setIsSubmitting(true);
    const formData = new FormData();
    formData.append('image', newPhoto.file);
    formData.append('title', newPhoto.title);
    formData.append('tag', newPhoto.tag);
    formData.append('description', newPhoto.description);

    try {
      const res = await api.post('/gallery', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      if (res.data.success) {
        setIsAddModalOpen(false);
        setNewPhoto({ title: '', tag: 'Diskusi', description: '', file: null });
        fetchGallery();
      }
    } catch (err) {
      alert('Gagal menambah foto');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeletePhoto = async (e, id) => {
    e.stopPropagation();
    setConfirmModal({ isOpen: true, id });
  };

  const confirmDelete = async () => {
    try {
      await api.delete(`/gallery/${confirmModal.id}`);
      fetchGallery();
    } catch (err) {
      alert('Gagal menghapus foto');
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
      {/* Header */}
      <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <p className="text-xs text-sg tracking-[0.3em] uppercase mb-2">Dokumentasi</p>
          <h1 className="text-4xl font-bold tracking-widest mb-2">GALERI</h1>
          <p className="text-gray-400 text-sm">Rekaman momen berharga dalam perjalanan Semanggi.</p>
        </div>
        {isAdmin && (
          <button 
            onClick={() => setIsAddModalOpen(true)}
            className="btn-primary py-2.5 px-6 text-xs uppercase tracking-widest flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
            Tambah Foto
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="h-52 bg-white/5 animate-pulse rounded-2xl" />
          ))}
        </div>
      ) : (
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
          {photos.map(photo => (
            <div
              key={photo.id}
              className="group relative break-inside-avoid rounded-2xl overflow-hidden border border-white/5 cursor-zoom-in hover:border-sg/30 hover:shadow-xl hover:shadow-sg/10 transition-all duration-300"
              onClick={() => setLightbox(photo)}
            >
              <img
                src={photo.imageUrl}
                alt={photo.title}
                className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-4">
                <div>
                  <span className="text-xs bg-sg/20 text-sg border border-sg/30 px-2 py-0.5 rounded-full font-semibold mb-1 inline-block">
                    {photo.tag}
                  </span>
                  <p className="text-white font-bold text-sm">{photo.title}</p>
                </div>
                {isAdmin && (
                  <button 
                    onClick={(e) => handleDeletePhoto(e, photo.id)}
                    className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full transition-colors"
                    title="Hapus Foto"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {!loading && photos.length === 0 && (
        <div className="text-center py-20">
          <HiOutlinePhoto className="w-16 h-16 text-gray-700 mx-auto mb-3" />
          <p className="text-gray-500 text-sm">Belum ada foto untuk kategori ini.</p>
        </div>
      )}

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <div
            className="relative max-w-4xl w-full rounded-3xl overflow-hidden shadow-2xl border border-white/10"
            onClick={e => e.stopPropagation()}
          >
            <img src={lightbox.imageUrl} alt={lightbox.title} className="w-full max-h-[80vh] object-contain bg-darkbg-card" />
            <div className="bg-darkbg-card px-6 py-4 flex justify-between items-center">
              <div>
                <span className="text-xs text-sg font-semibold mr-2">{lightbox.tag}</span>
                <span className="text-white font-bold">{lightbox.title}</span>
              </div>
              <button
                onClick={() => setLightbox(null)}
                className="text-gray-400 hover:text-white text-2xl leading-none transition-colors"
              >
                ✕
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Add Photo Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-darkbg-card border border-white/10 rounded-3xl w-full max-w-md p-8 shadow-2xl relative">
            <button 
              onClick={() => setIsAddModalOpen(false)}
              className="absolute top-6 right-6 text-gray-500 hover:text-white transition-colors"
            >✕</button>
            
            <h2 className="text-xl font-bold mb-6">Tambah Foto Galeri</h2>
            
            <form onSubmit={handleAddPhoto} className="space-y-4">
              <div>
                <label className="text-[10px] text-gray-500 uppercase tracking-[0.2em] block mb-2 font-bold">Pilih File</label>
                <input 
                  type="file" 
                  accept="image/*"
                  onChange={(e) => setNewPhoto({ ...newPhoto, file: e.target.files[0] })}
                  className="block w-full text-xs text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-[10px] file:font-bold file:uppercase file:tracking-widest file:bg-sg/10 file:text-sg hover:file:bg-sg/20 transition-all"
                />
              </div>

              <div>
                <label className="text-[10px] text-gray-500 uppercase tracking-[0.2em] block mb-2 font-bold">Judul</label>
                <input 
                  type="text" 
                  className="input"
                  placeholder="Judul foto..."
                  value={newPhoto.title}
                  onChange={(e) => setNewPhoto({ ...newPhoto, title: e.target.value })}
                  required
                />
              </div>

              <div>
                <label className="text-[10px] text-gray-500 uppercase tracking-[0.2em] block mb-2 font-bold">Kategori</label>
                <select 
                  className="input"
                  value={newPhoto.tag}
                  onChange={(e) => setNewPhoto({ ...newPhoto, tag: e.target.value })}
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
                  value={newPhoto.description}
                  onChange={(e) => setNewPhoto({ ...newPhoto, description: e.target.value })}
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
                ) : 'Simpan Foto'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Confirm Modal */}
      <ConfirmModal 
        isOpen={confirmModal.isOpen}
        title="Hapus Foto"
        message="Hapus foto ini secara permanen dari galeri?"
        onConfirm={confirmDelete}
        onClose={() => setConfirmModal({ isOpen: false, id: null })}
      />
    </div>
  );
}
