import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/about', label: 'About' },
    { to: '/projects', label: 'Project' },
    { to: '/system', label: 'System' },
  ];

  return (
    <>
      <nav className="sticky top-0 z-50 bg-darkbg/90 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3">
              <img src="/assets/logoresmi.png" alt="Semanggi Logo" className="w-9 h-9 object-contain" />
              <span className="text-sg font-bold text-sm tracking-widest uppercase hidden sm:block">
                Semanggi Forum
              </span>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="text-xs font-semibold uppercase tracking-widest text-gray-400 hover:text-sg transition-colors duration-200"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                to="/form-pendaftaran"
                className="btn-secondary text-xs uppercase tracking-widest"
              >
                Gabung
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-sg focus:outline-none p-2"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`${
          isOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
        } md:hidden overflow-hidden transition-all duration-300 ease-in-out bg-darkbg-card border-b border-white/5`}
      >
        <div className="px-4 py-4 space-y-3">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="block text-xs font-semibold uppercase tracking-widest text-gray-400 hover:text-sg transition-colors duration-200"
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/form-pendaftaran"
            className="block text-xs font-semibold uppercase tracking-widest text-sg hover:text-sg-light transition-colors duration-200"
            onClick={() => setIsOpen(false)}
          >
            Gabung
          </Link>
        </div>
      </div>
    </>
  );
}
