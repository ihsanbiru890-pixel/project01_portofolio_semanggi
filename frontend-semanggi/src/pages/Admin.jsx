import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { HiOutlineUsers, HiOutlineChatBubbleLeftRight, HiOutlineFlag, HiOutlineBriefcase } from 'react-icons/hi2';
import api from '../lib/api';
import ConfirmModal from '../components/ConfirmModal';

export default function Admin() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [applications, setApplications] = useState([]);
  const [stats, setStats] = useState([
    { label: 'Total User', val: '0', icon: <HiOutlineUsers className="w-5 h-5" />, color: 'sg' },
    { label: 'Diskusi Aktif', val: '0', icon: <HiOutlineChatBubbleLeftRight className="w-5 h-5" />, color: 'teal' },
    { label: 'Pendaftar', val: '0', icon: <HiOutlineFlag className="w-5 h-5" />, color: 'gold' },
    { label: 'Proyek Aktif', val: '0', icon: <HiOutlineBriefcase className="w-5 h-5" />, color: 'sg' },
  ]);
  const [loading, setLoading] = useState(true);
  const [showAcceptModal, setShowAcceptModal] = useState(false);
  const [selectedApp, setSelectedApp] = useState(null);
  const [confirmModal, setConfirmModal] = useState({ isOpen: false, title: '', message: '', onConfirm: () => {} });

  const fetchAdminData = async () => {
    try {
      const [usersRes, discussionsRes, portfoliosRes, appsRes] = await Promise.all([
        api.get('/users'),
        api.get('/discussions'),
        api.get('/portfolios'),
        api.get('/applications')
      ]);

      setUsers(usersRes.data || []);
      const apps = appsRes.data.data || appsRes.data || [];
      setApplications(apps);
      
      const discussions = discussionsRes.data || [];
      const portfolios = portfoliosRes.data.data || portfoliosRes.data || [];

      setStats([
        { label: 'Total User', val: (usersRes.data?.length || 0).toString(), icon: <HiOutlineUsers className="w-5 h-5" />, color: 'sg' },
        { label: 'Diskusi Aktif', val: (discussions.length || 0).toString(), icon: <HiOutlineChatBubbleLeftRight className="w-5 h-5" />, color: 'teal' },
        { label: 'Pendaftar', val: (apps.length || 0).toString(), icon: <HiOutlineFlag className="w-5 h-5" />, color: 'gold' },
        { label: 'Proyek Aktif', val: (portfolios.length || 0).toString(), icon: <HiOutlineBriefcase className="w-5 h-5" />, color: 'sg' },
      ]);
    } catch (err) {
      console.error('Failed to fetch admin data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user.role?.name !== 'ADMIN') {
      navigate('/');
      return;
    }
    fetchAdminData();
  }, []);

  const handleDeleteUser = async (id) => {
    setConfirmModal({
      isOpen: true,
      title: 'Hapus Pengguna',
      message: 'Apakah Anda yakin ingin menghapus pengguna ini? Semua data terkait akan ikut terhapus.',
      onConfirm: async () => {
        try {
          await api.delete(`/users/${id}`);
          fetchAdminData();
        } catch (err) {
          alert('Gagal menghapus pengguna');
        }
      }
    });
  };

  const handleDeleteApplication = async (id) => {
    setConfirmModal({
      isOpen: true,
      title: 'Hapus Pendaftaran',
      message: 'Hapus data pendaftaran ini? Tindakan ini tidak dapat dibatalkan.',
      onConfirm: async () => {
        try {
          await api.delete(`/applications/${id}`);
          fetchAdminData();
        } catch (err) {
          alert('Gagal menghapus pendaftaran');
        }
      }
    });
  };

  const handleReviewApplication = async (id, isReviewed) => {
    try {
      await api.put(`/applications/${id}`, { isReviewed: !isReviewed });
      fetchAdminData();
    } catch (err) {
      alert('Gagal memperbarui status');
    }
  };

  const handleAcceptApplication = (app) => {
    setSelectedApp(app);
    setShowAcceptModal(true);
  };

  const confirmAcceptMember = async () => {
    if (!selectedApp) return;
    try {
      // Close modal first to show responsiveness
      setShowAcceptModal(false);
      
      await api.put(`/applications/${selectedApp.id}`, { 
        status: 'ACCEPTED',
        isReviewed: true 
      });
      
      alert(`Berhasil menerima ${selectedApp.nama}. Email konfirmasi sedang dikirim oleh sistem.`);
      fetchAdminData();
    } catch (err) {
      alert('Gagal menerima anggota');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
        <div>
          <p className="text-xs text-sg tracking-[0.3em] uppercase mb-2">Control Panel</p>
          <h1 className="text-4xl font-bold tracking-widest">DASHBOARD ADMIN</h1>
        </div>
        <span className="text-xs text-gray-500 bg-white/5 border border-white/10 px-4 py-2 rounded-full">
          🟢 Semanggi Forum — Live
        </span>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {stats.map((s, i) => (
          <div key={i} className="bg-darkbg-card border border-white/5 rounded-2xl p-5 hover:border-sg/20 hover:-translate-y-1 transition-all duration-300">
            <div className="flex justify-between items-start mb-3">
              <p className="text-xs uppercase tracking-wider text-gray-500">{s.label}</p>
              <span className="text-xl">{s.icon}</span>
            </div>
            <p className="text-3xl font-bold text-sg">{s.val}</p>
          </div>
        ))}
      </div>

      {/* User Management Table */}
      <div className="bg-darkbg-card border border-white/5 rounded-3xl overflow-hidden mb-8">
        <div className="p-6 border-b border-white/5 flex justify-between items-center">
          <h3 className="font-bold">Manajemen Pengguna</h3>
          <button className="bg-sg hover:bg-sg-dark text-white text-xs px-4 py-2 rounded-lg transition-colors font-semibold">
            + Tambah User
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/5">
                <th className="text-left px-6 py-3 text-gray-500 text-xs uppercase tracking-wider font-medium">Nama</th>
                <th className="text-left px-6 py-3 text-gray-500 text-xs uppercase tracking-wider font-medium">Email</th>
                <th className="text-left px-6 py-3 text-gray-500 text-xs uppercase tracking-wider font-medium">Role</th>
                <th className="text-left px-6 py-3 text-gray-500 text-xs uppercase tracking-wider font-medium">Status</th>
                <th className="px-6 py-3" />
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="5" className="px-6 py-10 text-center text-gray-500 animate-pulse">Memuat data...</td>
                </tr>
              ) : users.length > 0 ? (
                users.map((u, i) => (
                  <tr key={i} className="border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4 font-medium">{u.username}</td>
                    <td className="px-6 py-4 text-gray-400">{u.email}</td>
                    <td className="px-6 py-4">
                      <span className={`text-xs px-2 py-1 rounded-full border font-semibold ${u.role?.name === 'ADMIN' ? 'bg-sg/10 text-sg border-sg/30' : 'bg-white/5 text-gray-400 border-white/10'}`}>
                        {u.role?.name || 'MEMBER'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="flex items-center gap-1.5 text-xs text-green-400">
                        <span className="w-1.5 h-1.5 bg-green-400 rounded-full inline-block" />
                        Aktif
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right space-x-3">
                      <button className="text-xs text-gray-400 hover:text-sg transition-colors">Edit</button>
                      <button 
                        onClick={() => handleDeleteUser(u.id)}
                        className="text-xs text-gray-400 hover:text-red-500 transition-colors"
                      >
                        Hapus
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-6 py-10 text-center text-gray-500 italic">Belum ada pengguna terdaftar.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Applications Management Table */}
      <div className="bg-darkbg-card border border-white/5 rounded-3xl overflow-hidden">
        <div className="p-6 border-b border-white/5 flex justify-between items-center">
          <h3 className="font-bold">Daftar Pendaftar Anggota Baru</h3>
          <span className="text-[10px] bg-gold/10 text-gold border border-gold/20 px-2 py-1 rounded-full font-bold uppercase tracking-widest">
            {applications.filter(a => !a.isReviewed).length} Perlu Ditinjau
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/5 text-gray-500 text-[10px] uppercase tracking-widest font-bold">
                <th className="text-left px-6 py-4">Nama</th>
                <th className="text-left px-6 py-4">Email / HP</th>
                <th className="text-left px-6 py-4">Domisili</th>
                <th className="text-left px-6 py-4">Skill</th>
                <th className="text-left px-6 py-4">Status</th>
                <th className="px-6 py-4" />
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="6" className="px-6 py-10 text-center text-gray-500 animate-pulse uppercase tracking-[0.2em] text-[10px]">Memuat data...</td>
                </tr>
              ) : applications.length > 0 ? (
                applications.map((app) => (
                  <tr key={app.id} className={`border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors ${!app.isReviewed ? 'bg-sg/5' : ''}`}>
                    <td className="px-6 py-4">
                      <div className="font-bold text-white">{app.nama}</div>
                      <div className="text-[10px] text-gray-500">{app.status}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-gray-300">{app.email}</div>
                      <div className="text-[10px] text-gray-500">{app.hp}</div>
                    </td>
                    <td className="px-6 py-4 text-gray-400">{app.domisili}</td>
                    <td className="px-6 py-4">
                      <div className="text-[10px] text-sg font-bold uppercase truncate max-w-[150px]">{app.skill}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => handleReviewApplication(app.id, app.isReviewed)}
                          className={`text-[10px] px-2 py-1 rounded-full font-bold uppercase tracking-tighter border transition-all ${app.isReviewed ? 'border-white/10 text-gray-500' : 'border-gold/30 bg-gold/10 text-gold'}`}
                        >
                          {app.isReviewed ? 'Selesai' : 'Tinjau'}
                        </button>
                        {app.status === 'ACCEPTED' && (
                          <span className="text-[10px] text-green-500 font-bold uppercase">Accepted</span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right space-x-3">
                      <button 
                        onClick={() => handleAcceptApplication(app)}
                        className="text-[10px] bg-sg hover:bg-sg-dark text-white px-3 py-1.5 rounded-lg uppercase font-bold transition-colors shadow-lg shadow-sg/10"
                      >
                        Terima
                      </button>
                      <button 
                        onClick={() => handleDeleteApplication(app.id)}
                        className="text-[10px] text-gray-600 hover:text-red-500 uppercase font-bold transition-colors"
                      >
                        Hapus
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="px-6 py-10 text-center text-gray-500 italic text-[10px] uppercase tracking-widest">Belum ada pendaftaran masuk.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Accept Member Confirmation Modal */}
      {showAcceptModal && selectedApp && (
        <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-darkbg-card border border-white/10 rounded-3xl w-full max-w-sm p-8 shadow-2xl relative overflow-hidden group">
            {/* Background Decoration */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-sg/10 rounded-full blur-3xl group-hover:bg-sg/20 transition-all duration-700" />
            
            <div className="relative z-10 text-center">
              <div className="w-16 h-16 bg-sg/10 border border-sg/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <HiOutlineUsers className="w-8 h-8 text-sg" />
              </div>
              
              <h2 className="text-xl font-bold mb-2">Terima Anggota?</h2>
              <p className="text-gray-400 text-sm mb-8 leading-relaxed">
                Apakah Anda yakin ingin menerima <span className="text-white font-bold">{selectedApp.nama}</span> sebagai anggota baru Semanggi?
              </p>
              
              <div className="grid grid-cols-2 gap-3">
                <button 
                  onClick={() => setShowAcceptModal(false)}
                  className="px-4 py-3 rounded-xl border border-white/10 text-gray-400 font-semibold hover:bg-white/5 transition-all text-xs uppercase tracking-widest"
                >
                  Batal
                </button>
                <button 
                  onClick={confirmAcceptMember}
                  className="px-4 py-3 rounded-xl bg-sg hover:bg-sg-dark text-white font-bold transition-all text-xs uppercase tracking-widest shadow-lg shadow-sg/20"
                >
                  Ya, Terima
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Confirm Modal for Deletions */}
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
