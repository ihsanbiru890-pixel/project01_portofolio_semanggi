import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="py-16 border-t border-white/5 bg-darkbg-card bg-glow2">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-12">
        <div className="flex flex-col justify-between">
          <div>
            <div className="text-sg font-bold text-sm leading-tight mb-4">
              SEMANGGI<br />FORUM
            </div>
            <p className="text-[10px] text-gray-500 tracking-widest uppercase">
              &copy; 2026 Semanggi Forum.<br />All Rights Reserved.
            </p>
          </div>
        </div>
        <div className="space-y-4">
          <h4 className="text-xs font-bold tracking-[0.2em] text-gray-300 uppercase mb-6">Contact Kami</h4>
          <div className="flex flex-col space-y-3 text-xs text-gray-400">
            <a href="mailto:forumsemanggi@gmail.com" className="hover:text-sg flex items-center transition-colors">
              <span className="mr-2">&#9993;</span> forumsemanggi@gmail.com
            </a>
            <a href="https://wa.me/082328846584" className="hover:text-sg flex items-center transition-colors">
              <span className="mr-2">&#128172;</span> +62 823-2884-6584
            </a>
            <a href="https://maps.app.goo.gl/GriFBGXaXLr6raTH7" className="hover:text-sg flex items-center transition-colors">
              <span className="mr-2">&#128205;</span> Banda Aceh, Indonesia
            </a>
          </div>
        </div>
        <div className="space-y-4">
          <h4 className="text-xs font-bold tracking-[0.2em] text-gray-300 uppercase mb-6">Social Media</h4>
          <div className="flex space-x-6 text-gray-400">
            <a href="https://www.instagram.com/semanggiforum/#" className="hover:text-sg transition-colors">Instagram</a>
            <a href="#" className="hover:text-sg transition-colors">LinkedIn</a>
            <a href="#" className="hover:text-sg transition-colors">YouTube</a>
          </div>
        </div>
      </div>
      <div className="mt-16 text-center">
        <p className="text-[10px] tracking-[0.5em] text-gray-600 uppercase">Semanggi Forum</p>
      </div>
    </footer>
  );
}
