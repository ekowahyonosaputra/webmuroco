import { useState, useEffect } from 'react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About Us', href: '#about' },
    { label: 'Products', href: '#products' },
    { label: 'Manufacturing', href: '#manufacturing' },
    { label: 'Quality', href: '#quality' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
      scrolled 
        ? 'bg-deep-navy/90 backdrop-blur-xl shadow-2xl border-b border-white/5' 
        : 'bg-transparent'
    }`}>
      <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-3 group">
            <img 
              src="https://muroco.com/wp-content/uploads/2020/09/LOGO-PUTIH-MUROCO.png" 
              alt="Muroco Logo" 
              className="h-8 sm:h-10 w-auto transform group-hover:scale-110 transition-transform duration-300"
            />
          </a>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-white/70 hover:text-accent-orange transition-colors duration-300 relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent-orange transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
            <a href="#contact" className="px-6 py-2.5 bg-accent-orange text-white text-sm font-semibold rounded-lg hover:bg-accent-orange/90 transition-all duration-300 hover:shadow-lg hover:shadow-accent-orange/25">
              Get Quote
            </a>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5"
          >
            <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${mobileOpen ? 'opacity-0' : ''}`} />
            <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>
      </div>

      {/* Mobile Menu - Dropdown */}
      <div className={`lg:hidden absolute top-full left-0 right-0 bg-deep-navy/98 backdrop-blur-xl border-t border-white/10 shadow-2xl transition-all duration-300 overflow-hidden ${mobileOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="px-4 py-6 space-y-1 text-center">
          {navLinks.map((link, index) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="block text-base font-medium text-white/90 hover:text-accent-orange hover:bg-white/5 transition-all duration-300 py-3 px-4 rounded-lg text-center"
              style={{ 
                transitionDelay: `${index * 50}ms`,
                transform: mobileOpen ? 'translateY(0)' : 'translateY(-10px)',
                opacity: mobileOpen ? 1 : 0
              }}
            >
              {link.label}
            </a>
          ))}
          <div className="pt-4 mt-4 border-t border-white/10">
            <a 
              href="#contact" 
              onClick={() => setMobileOpen(false)}
              className="block w-full text-center px-6 py-3 bg-accent-orange text-white font-semibold rounded-lg hover:bg-accent-orange/90 transition-all duration-300"
            >
              Get Quote
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}