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
    const throttle = (func, limit) => {
      let lastFunc;
      let lastRan;
      return function () {
        const context = this;
        const args = arguments;
        if (!lastRan) {
          func.apply(context, args);
          lastRan = Date.now();
        } else {
          clearTimeout(lastFunc);
          lastFunc = setTimeout(function () {
            if ((Date.now() - lastRan) >= limit) {
              func.apply(context, args);
              lastRan = Date.now();
            }
          }, limit - (Date.now() - lastRan));
        }
      }
    }

    const handleScrollEvent = throttle(() => {
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
    }, 100);

    window.addEventListener('scroll', handleScrollEvent);
    return () => window.removeEventListener('scroll', handleScrollEvent);
  }, []);

  return (
    <nav className="fixed w-full bg-linear-to-b from-base via-base to-transparent backdrop-blur-md z-50 border-b border-white/10">
      <div className="w-full px-3 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 min-h-16">
          <div className="grow-0">
            <a href="#home" className="text-lg sm:text-2xl font-bold bg-linear-to-r from-blue to-sky bg-clip-text text-transparent hover:from-sapphire hover:to-teal transition-all duration-300">
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
                  className={`transition-colors duration-300 font-medium text-sm relative group whitespace-nowrap ${isActive ? 'text-sky' : 'text-subtext1 hover:text-main'
                    }`}
                >
                  {link.name}
                  <span className={`absolute bottom-0 left-0 h-0.5 bg-linear-to-r from-blue to-sky transition-all duration-300 ${isActive ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}></span>
                </a>
              );
            })}
          </div>

          <div className="hidden md:block ml-4 lg:ml-6 shrink-0">
            <a
              href="#contact"
              onClick={(e) => handleScroll(e, '#contact')}
              className="px-4 lg:px-6 py-2 rounded-lg bg-linear-to-r from-blue to-sky text-base font-medium text-sm lg:text-base hover:from-sapphire hover:to-teal transition-all duration-300 shadow-lg hover:shadow-blue/50 whitespace-nowrap"
            >
              Get In Touch
            </a>
          </div>

          <div className="md:hidden ml-2 shrink-0">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-subtext1 hover:text-main transition-colors p-1 inline-flex items-center justify-center"
            >
              {isOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-mantle border-t border-white/10">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navLinks.map((link) => {
              const sectionId = link.href.substring(1);
              const isActive = activeSection === sectionId;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleScroll(e, link.href)}
                  className={`block px-3 py-2 rounded-md transition-colors duration-300 font-medium ${isActive ? 'text-sky bg-surface0/50' : 'text-subtext1 hover:text-main hover:bg-surface0'
                    }`}
                >
                  {link.name}
                </a>
              );
            })}
            <a
              href="#contact"
              onClick={(e) => handleScroll(e, '#contact')}
              className="block px-3 py-2 rounded-md bg-linear-to-r from-blue to-sky text-base font-medium hover:from-sapphire hover:to-teal transition-all duration-300"
            >
              Get In Touch
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
