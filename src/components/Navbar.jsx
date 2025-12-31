import AOS from 'aos';
import { Menu, Moon, Sun, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useI18n } from '../i18n/useI18n.js';
import { applyCatppuccinTheme, getStoredCatppuccinFlavor, setStoredCatppuccinFlavor } from '../theme/catppuccinMocha.js';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [flavor, setFlavor] = useState(() => getStoredCatppuccinFlavor() ?? 'mocha');
  const { locale, setLocale, locales, isTranslating, t } = useI18n();

  const navLinks = [
    { name: t('nav.home'), href: '#home' },
    { name: t('nav.about'), href: '#about' },
    { name: t('nav.skills'), href: '#skills' },
    { name: t('nav.projects'), href: '#projects' },
    { name: t('nav.contact'), href: '#contact' },
  ];

  const handleScroll = (e, href) => {
    e.preventDefault();
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: 'smooth' });
    setIsOpen(false);
    setActiveSection(href.substring(1));

    // Ensure AOS marks elements visible after programmatic scrolling.
    setTimeout(() => {
      try {
        if (typeof AOS.refreshHard === 'function') {
          AOS.refreshHard();
        } else {
          AOS.refresh();
        }
      } finally {
        // AOS listens to scroll; trigger one after smooth-scroll jumps.
        window.dispatchEvent(new Event('scroll'));
      }
    }, 250);
  };

  useEffect(() => {
    // Intentionally only sets up event listeners.
    const handleStorage = (e) => {
      if (e.key !== 'catppuccin-flavor') return;
      const next = getStoredCatppuccinFlavor() ?? 'mocha';
      setFlavor(next);
      applyCatppuccinTheme(next);
    };

    window.addEventListener('storage', handleStorage);
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
    return () => {
      window.removeEventListener('storage', handleStorage);
      window.removeEventListener('scroll', handleScrollEvent);
    };
  }, []);

  useEffect(() => {
    // Ensure theme is applied if user loads mid-session.
    applyCatppuccinTheme(flavor);
  }, [flavor]);

  const toggleTheme = () => {
    const next = flavor === 'mocha' ? 'latte' : 'mocha';
    setFlavor(next);
    setStoredCatppuccinFlavor(next);
    applyCatppuccinTheme(next);
  };

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

          <div className="hidden md:flex items-center ml-4 lg:ml-6 gap-3 shrink-0">
            <label className="sr-only" htmlFor="portfolio-language">
              {t('nav.language.placeholder')}
            </label>
            <select
              id="portfolio-language"
              value={locale}
              onChange={(e) => setLocale(e.target.value)}
              disabled={isTranslating}
              className="inline-block px-3 py-2 rounded-lg bg-mantle border border-white/10 text-subtext1 hover:text-main hover:border-purple/30 hover:bg-white/5 transition-all text-sm font-medium"
              aria-label={t('nav.language.placeholder')}
              title={t('nav.language.placeholder')}
            >
              {locales.map((l) => (
                <option key={l.code} value={l.code}>
                  {l.label}
                </option>
              ))}
            </select>

            <button
              type="button"
              onClick={toggleTheme}
              className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-mantle border border-white/10 text-subtext1 hover:text-main hover:border-purple/30 hover:bg-white/5 transition-all"
              aria-label={flavor === 'mocha' ? t('nav.aria.switchToLatte') : t('nav.aria.switchToMocha')}
              title={flavor === 'mocha' ? t('nav.title.switchToLatte') : t('nav.title.switchToMocha')}
            >
              {flavor === 'mocha' ? <Moon size={18} className="text-purple" /> : <Sun size={18} className="text-yellow" />}
              <span className="text-sm font-medium">{flavor === 'mocha' ? t('nav.theme.mocha') : t('nav.theme.latte')}</span>
            </button>
            <a
              href="#contact"
              onClick={(e) => handleScroll(e, '#contact')}
              className="navbar-cta px-4 lg:px-6 py-2 rounded-lg bg-linear-to-r from-blue to-sky text-[1rem] font-medium text-sm lg:text-[1rem] hover:from-sapphire hover:to-teal transition-all duration-300 shadow-lg hover:shadow-blue/50 whitespace-nowrap"
            >
              {t('nav.getInTouch')}
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
              className="navbar-cta block px-3 py-2 rounded-md bg-linear-to-r from-blue to-sky text-[1rem] font-medium hover:from-sapphire hover:to-teal transition-all duration-300"
            >
              {t('nav.getInTouch')}
            </a>

            <label className="sr-only" htmlFor="portfolio-language-mobile">
              {t('nav.language.placeholder')}
            </label>
            <select
              id="portfolio-language-mobile"
              value={locale}
              onChange={(e) => setLocale(e.target.value)}
              disabled={isTranslating}
              className="w-full block px-3 py-2 rounded-md bg-surface0/50 border border-white/10 text-subtext1 hover:text-main hover:border-purple/30 hover:bg-surface0 transition-all"
              aria-label={t('nav.language.placeholder')}
            >
              {locales.map((l) => (
                <option key={l.code} value={l.code}>
                  {l.label}
                </option>
              ))}
            </select>

            <button
              type="button"
              onClick={toggleTheme}
              className="w-full flex items-center gap-2 px-3 py-2 rounded-md bg-surface0/50 border border-white/10 text-subtext1 hover:text-main hover:border-purple/30 hover:bg-surface0 transition-all"
              aria-label={flavor === 'mocha' ? t('nav.aria.switchToLatte') : t('nav.aria.switchToMocha')}
            >
              {flavor === 'mocha' ? <Moon size={18} className="text-purple" /> : <Sun size={18} className="text-yellow" />}
              <span className="font-medium">{t('nav.mobile.themePrefix')} {flavor === 'mocha' ? t('nav.theme.mocha') : t('nav.theme.latte')}</span>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
