import { Link, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { HiOutlineUser, HiOutlineHandThumbUp, HiOutlineChatBubbleLeft } from 'react-icons/hi2';
import api from '../lib/api';
import ConfirmModal from '../components/ConfirmModal';

export default function ThreadDetail() {
  const { id } = useParams();
  const [thread, setThread] = useState(null);
  const [loading, setLoading] = useState(true);
  const [replyContent, setReplyContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  
  // Edit states
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedContent, setEditedContent] = useState('');
  const [confirmModal, setConfirmModal] = useState({ isOpen: false, title: '', message: '', onConfirm: () => {} });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    setCurrentUser(user);
  }, []);

  const fetchThread = async () => {
    try {
      const response = await api.get(`/discussions/${id}`);
      setThread(response.data);
    } catch (err) {
      console.error('Failed to fetch thread:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchThread();
  }, [id]);

  const handlePostReply = async () => {
    if (!currentUser) return alert('Silakan login terlebih dahulu');
    if (!replyContent.trim()) return;
    
    setIsSubmitting(true);
    try {
      await api.post('/posts', {
        discussionId: parseInt(id),
        userId: currentUser.id,
        content: replyContent
      });
      setReplyContent('');
      fetchThread(); // Refresh data
    } catch (err) {
      alert('Gagal mengirim balasan');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteThread = async () => {
    setConfirmModal({
      isOpen: true,
      title: 'Hapus Diskusi',
      message: 'Apakah Anda yakin ingin menghapus diskusi ini? Tindakan ini tidak dapat dibatalkan.',
      onConfirm: async () => {
        try {
          await api.delete(`/discussions/${id}`);
          window.location.href = '/forum';
        } catch (err) {
          alert('Gagal menghapus diskusi');
        }
      }
    });
  };

  const handleDeletePost = async (postId) => {
    setConfirmModal({
      isOpen: true,
      title: 'Hapus Balasan',
      message: 'Hapus balasan ini secara permanen?',
      onConfirm: async () => {
        try {
          await api.delete(`/posts/${postId}`);
          fetchThread();
        } catch (err) {
          alert('Gagal menghapus balasan');
        }
      }
    });
  };

  const handleUpdateThread = async () => {
    try {
      await api.put(`/discussions/${id}`, {
        title: editedTitle,
        content: editedContent
      });
      setIsEditing(false);
      fetchThread();
    } catch (err) {
      alert('Gagal memperbarui diskusi');
    }
  };

  const startEditing = () => {
    setEditedTitle(thread.title);
    setEditedContent(thread.content);
    setIsEditing(true);
  };

  if (loading) return (
    <div className="max-w-4xl mx-auto px-4 py-10 animate-pulse">
      <div className="h-64 bg-white/5 rounded-3xl mb-8"></div>
      <div className="h-32 bg-white/5 rounded-3xl"></div>
    </div>
  );

  if (!thread) return (
    <div className="max-w-4xl mx-auto px-4 py-20 text-center text-gray-500">
      Diskusi tidak ditemukan.
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-gray-500 mb-6">
        <Link to="/forum" className="hover:text-sg transition-colors">Forum</Link>
        <span>›</span>
        <span className="text-gray-300">Detail Diskusi</span>
      </div>

      {/* Thread Content */}
      <div className="bg-darkbg-card border border-white/5 rounded-3xl p-8 mb-8">
        <div className="flex items-center gap-3 mb-6 flex-wrap">
          <span className="bg-sg/10 text-sg px-3 py-1 rounded-full border border-sg/20 font-semibold text-xs uppercase">
            {thread.category?.name || 'Umum'}
          </span>
          <span className="text-gray-500 text-xs flex items-center gap-1">
            <HiOutlineUser className="w-3.5 h-3.5" />
            Diposting oleh <span className="text-white font-medium">{thread.user?.username || 'Anonim'}</span>
          </span>
          <span className="text-gray-500 text-xs">• {new Date(thread.createdAt).toLocaleDateString('id-ID')}</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold mb-6 leading-snug">
          {thread.title}
        </h1>
        <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-wrap">
          {thread.content}
        </p>

        {/* Reactions & Actions */}
        <div className="mt-6 pt-6 border-t border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-sg border border-white/10 hover:border-sg/30 rounded-full px-3 py-1.5 transition-all">
              <HiOutlineHandThumbUp className="w-4 h-4" /> <span>{thread.reactions?.length || 0} Suka</span>
            </button>
            <button className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-sg border border-white/10 hover:border-sg/30 rounded-full px-3 py-1.5 transition-all">
              <HiOutlineChatBubbleLeft className="w-4 h-4" /> <span>Balas</span>
            </button>
          </div>
          
          <div className="flex items-center gap-4">
            {(currentUser?.role?.name === 'ADMIN' || currentUser?.id === thread.userId) && (
              <button 
                onClick={startEditing}
                className="text-xs text-gray-500 hover:text-sg transition-colors"
              >
                Edit
              </button>
            )}
            {currentUser?.role?.name === 'ADMIN' && (
              <button 
                onClick={handleDeleteThread}
                className="text-xs text-gray-500 hover:text-red-500 transition-colors"
              >
                Hapus Diskusi
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Comments */}
      <div className="mb-8">
        <h3 className="font-bold text-lg mb-4">Balasan ({thread.posts?.length || 0})</h3>
        <div className="space-y-4">
          {thread.posts?.map((post, i) => (
            <div key={i} className="bg-white/5 border border-white/5 rounded-2xl p-5 hover:border-sg/20 transition-all">
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-sm text-white flex items-center gap-1">
                   <HiOutlineUser className="w-4 h-4 text-sg" />
                   {post.user?.username || 'Anonim'}
                </span>
                <div className="flex items-center gap-3">
                  <span className="text-gray-500 text-[10px] uppercase tracking-widest">{new Date(post.createdAt).toLocaleDateString('id-ID')}</span>
                  {(currentUser?.role?.name === 'ADMIN' || currentUser?.id === post.userId) && (
                    <button 
                      onClick={() => handleDeletePost(post.id)}
                      className="text-red-500/50 hover:text-red-500 transition-colors text-[10px] uppercase font-bold"
                    >
                      Hapus
                    </button>
                  )}
                </div>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed">{post.content}</p>
            </div>
          ))}
          {(!thread.posts || thread.posts.length === 0) && (
            <p className="text-center py-10 text-gray-600 italic text-sm">Belum ada balasan untuk diskusi ini.</p>
          )}
        </div>
      </div>

      {/* Reply Box */}
      <div className="bg-darkbg-card border border-white/5 rounded-3xl p-6">
        <h4 className="font-bold text-sm mb-4">Tulis Balasan</h4>
        <textarea
          value={replyContent}
          onChange={(e) => setReplyContent(e.target.value)}
          placeholder="Bagikan pendapat atau jawabanmu..."
          className="input h-28 resize-none mb-4"
        />
        <div className="flex justify-between items-center">
          <p className="text-xs text-gray-500">
            {currentUser ? `Membalas sebagai ${currentUser.username}` : 'Pastikan Anda sudah login untuk membalas.'}
          </p>
          <button 
            onClick={handlePostReply}
            disabled={isSubmitting || !replyContent.trim()}
            className="btn-primary py-2 px-6 text-xs disabled:opacity-50"
          >
            {isSubmitting ? 'Mengirim...' : 'Kirim'}
          </button>
        </div>
      </div>

      {/* Edit Modal */}
      {isEditing && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-darkbg-card border border-white/10 rounded-3xl w-full max-w-lg p-8 shadow-2xl relative">
            <button 
              onClick={() => setIsEditing(false)}
              className="absolute top-6 right-6 text-gray-500 hover:text-white transition-colors"
            >✕</button>
            
            <h2 className="text-xl font-bold mb-6">Edit Diskusi</h2>
            
            <div className="space-y-4">
              <div>
                <label className="text-xs text-gray-500 uppercase tracking-widest block mb-2 font-bold">Judul</label>
                <input 
                  type="text" 
                  className="input"
                  value={editedTitle}
                  onChange={(e) => setEditedTitle(e.target.value)}
                  placeholder="Judul diskusi..."
                />
              </div>
              
              <div>
                <label className="text-xs text-gray-500 uppercase tracking-widest block mb-2 font-bold">Konten</label>
                <textarea 
                  className="input h-48 resize-none"
                  value={editedContent}
                  onChange={(e) => setEditedContent(e.target.value)}
                  placeholder="Detail diskusi..."
                />
              </div>
              
              <button 
                onClick={handleUpdateThread}
                className="btn-primary w-full py-3 mt-4"
              >
                Simpan Perubahan
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Confirm Modal */}
      <ConfirmModal 
        isOpen={confirmModal.isOpen}
        title={confirmModal.title}
        message={confirmModal.message}
        onConfirm={confirmModal.onConfirm}
        onClose={() => setConfirmModal({ ...confirmModal, isOpen: false })}
      />
    </div>
  );
}
