import { useEffect, useState } from 'react';

export default function LoadingScreen() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-darkbg flex flex-col items-center justify-center overflow-hidden">
      {/* Dynamic Background Elements */}
      <div className="absolute w-96 h-96 bg-sg/10 blur-[120px] rounded-full animate-pulse" />
      
      <div className="relative flex flex-col items-center">
        {/* Animated Logo Container */}
        <div className="relative mb-8 animate-float">
          <div className="absolute inset-0 bg-sg/20 blur-2xl rounded-full scale-150 animate-pulse" />
          <img 
            src="/assets/logoresmi.png" 
            className="w-24 h-24 object-contain relative z-10 drop-shadow-[0_0_15px_rgba(46,213,115,0.3)]" 
            alt="Logo" 
          />
        </div>

        {/* Text and Progress */}
        <div className="text-center">
          <h2 className="text-sg font-bold tracking-[0.3em] uppercase text-sm mb-4 animate-pulse">
            SEMANGGI FORUM
          </h2>
          
          {/* Progress Bar Container */}
          <div className="w-48 h-1 bg-white/5 rounded-full overflow-hidden relative mx-auto">
            <div className="absolute inset-0 bg-sg/10" />
            <div 
              className="h-full bg-sg shadow-[0_0_10px_rgba(46,213,115,0.5)] animate-loading-bar"
              style={{ width: '100%' }}
            />
          </div>
          
          <p className="text-[10px] text-gray-500 uppercase tracking-[0.5em] mt-4 opacity-50">
            Mempersiapkan Ekosistem...
          </p>
        </div>
      </div>

      {/* Decorative Border Glow */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-sg/20 to-transparent" />
    </div>
  );
}
