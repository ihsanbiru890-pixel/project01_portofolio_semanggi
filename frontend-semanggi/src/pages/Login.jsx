import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { HiOutlineEye, HiOutlineEyeSlash } from 'react-icons/hi2';
import api from '../lib/api';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleGoogleCallback = async (response) => {
    setLoading(true);
    setError('');
    try {
      const res = await api.post('/auth/google', { credential: response.credential });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      navigate('/profile');
    } catch (err) {
      setError(err.response?.data?.error || 'Gagal login dengan Google');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    /* global google */
    if (window.google) {
      google.accounts.id.initialize({
        client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
        callback: handleGoogleCallback,
      });
      google.accounts.id.renderButton(
        document.getElementById('google-login-btn'),
        { theme: 'outline', size: 'large', width: 280 }
      );
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await api.post('/auth/login', { 
        email: email.toLowerCase(), 
        password 
      });
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      navigate('/profile');
    } catch (err) {
      setError(err.response?.data?.error || 'Terjadi kesalahan saat masuk');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-10 relative overflow-hidden">
      {/* Glow */}
      <div className="absolute w-96 h-96 bg-sg/10 blur-[120px] rounded-full top-0 left-1/2 -translate-x-1/2 pointer-events-none" />

      <div className="max-w-md w-full relative z-10">
        {/* Logo */}
        <div className="text-center mb-8">
          <img src="/assets/logoresmi.png" className="w-12 h-12 object-contain mx-auto mb-4" alt="Logo" />
          <h1 className="text-2xl font-bold tracking-widest">MASUK</h1>
          <p className="text-gray-400 text-sm mt-1">Masuk untuk berinteraksi dengan komunitas</p>
        </div>

        <div className="bg-darkbg-card border border-white/5 rounded-3xl p-8 shadow-2xl">
          {error && (
            <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 text-red-500 text-xs rounded-xl text-center">
              {error}
            </div>
          )}

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="text-xs text-gray-400 uppercase tracking-wider block mb-1.5">Email</label>
              <input 
                type="email" 
                placeholder="email@kamu.com" 
                className="input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="text-xs text-gray-400 uppercase tracking-wider block mb-1.5">Kata Sandi</label>
              <div className="relative">
                <input 
                  type={showPassword ? "text" : "password"} 
                  placeholder="••••••••" 
                  className="input pr-12"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-sg transition-colors"
                >
                  {showPassword ? (
                    <HiOutlineEyeSlash className="w-5 h-5" />
                  ) : (
                    <HiOutlineEye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>
            <div className="flex justify-end">
              <a href="#" className="text-xs text-sg hover:underline">Lupa kata sandi?</a>
            </div>
            <button 
              type="submit" 
              className="btn-primary w-full mt-2 disabled:opacity-50"
              disabled={loading}
            >
              {loading ? 'MEMPROSES...' : 'MASUK'}
            </button>
          </form>

          <div className="mt-6 flex items-center gap-4">
            <div className="h-px bg-white/5 flex-1" />
            <span className="text-[10px] text-gray-600 uppercase tracking-widest">Atau</span>
            <div className="h-px bg-white/5 flex-1" />
          </div>

          <div className="mt-6">
            <div id="google-login-btn" className='items-center flex justify-center'></div>
          </div>

          <div className="mt-6 pt-6 border-t border-white/5 text-center text-sm text-gray-500">
            Belum punya akun?{' '}
            <Link to="/register" className="text-sg font-semibold hover:underline">Daftar sekarang</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
