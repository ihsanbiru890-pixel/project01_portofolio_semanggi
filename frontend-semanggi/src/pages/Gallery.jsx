import { useState, useEffect } from 'react';
import { HiOutlinePhoto } from 'react-icons/hi2';
import api from '../lib/api';

const tags = ['Semua', 'Diskusi', 'Workshop', 'Project', 'Event'];

export default function Gallery() {
  const [activeTag, setActiveTag] = useState('Semua');
  const [lightbox, setLightbox] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

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

  const handleDeletePhoto = async (e, id) => {
    e.stopPropagation();
    if (!window.confirm('Hapus foto ini?')) return;
    try {
      await api.delete(`/gallery/${id}`);
      fetchGallery();
    } catch (err) {
      alert('Gagal menghapus foto');
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
      {/* Header */}
      <div className="mb-10">
        <p className="text-xs text-sg tracking-[0.3em] uppercase mb-2">Dokumentasi</p>
        <h1 className="text-4xl font-bold tracking-widest mb-2">GALERI</h1>
        <p className="text-gray-400 text-sm">Rekaman momen berharga dalam perjalanan Semanggi.</p>
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
    </div>
  );
}
