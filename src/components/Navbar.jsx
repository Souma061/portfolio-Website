import { Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleScroll = (e, href) => {
    e.preventDefault();
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: 'smooth' });
    setIsOpen(false);
    setActiveSection(href.substring(1));
  };

  useEffect(() => {
    const handleScrollEvent = () => {
      const sections = ['home', 'about', 'skills', 'projects', 'contact'];
      for (const section of sections) {
        const element = document.querySelector(`#${section}`);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom > 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScrollEvent);
    return () => window.removeEventListener('scroll', handleScrollEvent);
  }, []);

  return (
    <nav className="fixed w-full bg-linear-to-b from-slate-900 via-slate-900 to-transparent backdrop-blur-md z-50 border-b border-slate-700/50 overflow-x-hidden">
      <div className="w-full px-3 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 min-h-16">
          <div className="shrink-0 min-w-fit">
            <a href="#home" className="text-base sm:text-xl lg:text-2xl font-bold bg-linear-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent hover:from-blue-300 hover:to-cyan-300 transition-all duration-300 whitespace-nowrap">
              Soumabrata
            </a>
          </div>

          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            {navLinks.map((link) => {
              const sectionId = link.href.substring(1);
              const isActive = activeSection === sectionId;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleScroll(e, link.href)}
                  className={`transition-colors duration-300 font-medium text-sm relative group whitespace-nowrap ${
                    isActive ? 'text-cyan-400' : 'text-slate-300 hover:text-white'
                  }`}
                >
                  {link.name}
                  <span className={`absolute bottom-0 left-0 h-0.5 bg-linear-to-r from-blue-400 to-cyan-400 transition-all duration-300 ${
                    isActive ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}></span>
                </a>
              );
            })}
          </div>

          <div className="hidden md:block ml-4 lg:ml-6 shrink-0">
            <a
              href="#contact"
              onClick={(e) => handleScroll(e, '#contact')}
              className="px-4 lg:px-6 py-2 rounded-lg bg-linear-to-r from-blue-500 to-cyan-500 text-white font-medium text-sm lg:text-base hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 shadow-lg hover:shadow-blue-500/50 whitespace-nowrap"
            >
              Get In Touch
            </a>
          </div>

          <div className="md:hidden ml-auto shrink-0">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-300 hover:text-white transition-colors p-1"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-slate-900 border-t border-slate-700/50">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navLinks.map((link) => {
              const sectionId = link.href.substring(1);
              const isActive = activeSection === sectionId;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleScroll(e, link.href)}
                  className={`block px-3 py-2 rounded-md transition-colors duration-300 font-medium ${
                    isActive ? 'text-cyan-400 bg-slate-800/50' : 'text-slate-300 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  {link.name}
                </a>
              );
            })}
            <a
              href="#contact"
              onClick={(e) => handleScroll(e, '#contact')}
              className="block px-3 py-2 rounded-md bg-linear-to-r from-blue-500 to-cyan-500 text-white font-medium hover:from-blue-600 hover:to-cyan-600 transition-all duration-300"
            >
              Get In Touch
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
