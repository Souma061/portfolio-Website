import AOS from 'aos';
import { Check, Copy, Eye, FileText, Github, Linkedin, Mail, Twitter, User } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import useVisitorCount from '../hooks/useVisitorCount.js';
import { useI18n } from '../i18n/useI18n.js';

export default function Hero() {
  const [copied, setCopied] = useState(false);
  const [activeTooltip, setActiveTooltip] = useState(null);
  const imageCardRef = useRef(null);
  const imageRafRef = useRef(0);
  const { visits, loading: visitsLoading } = useVisitorCount();
  const { t } = useI18n();

  useEffect(() => {
    AOS.refresh();
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText('npx soumabrata-dev@latest');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const resetImageTilt = () => {
    const el = imageCardRef.current;
    if (!el) return;
    el.style.transition = 'transform 200ms ease';
    el.style.transform = 'rotateX(0deg) rotateY(0deg)';
  };

  const handleImagePointerMove = (e) => {
    if (e.pointerType && e.pointerType !== 'mouse') return;
    const el = imageCardRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    const dx = (x - 0.5) * 2;
    const dy = (y - 0.5) * 2;
    const maxTilt = 8;

    const rotateY = dx * maxTilt;
    const rotateX = -dy * maxTilt;

    cancelAnimationFrame(imageRafRef.current);
    imageRafRef.current = requestAnimationFrame(() => {
      el.style.transition = 'transform 0ms';
      el.style.transform = `rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg)`;
    });
  };



  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-base">

      {/* Background Decor: diagonal lines (left) */}
      <div className="absolute top-40 left-0 opacity-10 hidden lg:block text-main">
        <svg width="200" height="200" viewBox="0 0 200 200">
          <line x1="0" y1="100" x2="100" y2="0" stroke="currentColor" strokeWidth="20" />
          <line x1="40" y1="100" x2="140" y2="0" stroke="currentColor" strokeWidth="20" />
          <line x1="80" y1="100" x2="180" y2="0" stroke="currentColor" strokeWidth="20" />
        </svg>
      </div>

      {/* Background Decor: circle (center-right) */}
      <div className="absolute top-1/2 right-[10%] w-12 h-12 border-4 border-purple rounded-full opacity-50 hidden lg:block animate-pulse"></div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Left Column: Text & Content */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-8" data-aos="fade-right" data-aos-duration="1000">

            {/* Typography */}
            <div className="space-y-4">
              <h1 className="text-6xl sm:text-7xl lg:text-8xl font-bold tracking-tighter text-main">
                Soumabrata
              </h1>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-purple tracking-tight">
                {t('hero.role')}
              </h2>
              <p className="text-lg sm:text-xl text-subtext0 font-mono pt-4">
                {t('hero.tagline.before')} <span className="text-green">{t('hero.tagline.robust')}</span> {t('hero.tagline.middle')} <span className="text-green">{t('hero.tagline.pixel')}</span>{t('hero.tagline.after')}
              </p>
            </div>

            {/* Social Icons Row */}
            <div className="flex items-center gap-6 pt-2">
              {[
                { Icon: Github, href: "https://github.com/Souma061", tooltip: t('hero.tooltip.myCode') },
                { Icon: Mail, href: "mailto:soumabrataghosh57@gmail.com", tooltip: t('hero.tooltip.sendEmail') },
                { Icon: Linkedin, href: "https://www.linkedin.com/in/soumabrata-ghosh-85862530b/", tooltip: t('hero.tooltip.letsConnect') },
                { Icon: Twitter, href: "https://x.com/SoumabrataGhosh", tooltip: t('hero.tooltip.followMe') },
                { Icon: User, href: "/resume.html", tooltip: t('hero.tooltip.thatsMe') }
              ].map((item, index) => {
                const { Icon, href, tooltip } = item;
                return (
                  <div
                    key={index}
                    className="relative group cursor-pointer"
                    onMouseEnter={() => setActiveTooltip(index)}
                    onMouseLeave={() => setActiveTooltip(null)}
                    onFocus={() => setActiveTooltip(index)}
                    onBlur={() => setActiveTooltip(null)}
                  >
                    <a
                      href={href}
                      target="_blank"
                      rel="noreferrer"
                      className="hero-social-icon text-subtext0 transition-all transform hover:scale-110 block"
                      aria-label={tooltip}
                    >
                      <Icon size={32} />
                    </a>

                    {/* Tooltip */}
                    <div
                      className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-max px-3 py-1 bg-orange text-crust text-xs font-bold rounded-lg shadow-lg transition-all duration-300 transform ${activeTooltip === index
                        ? 'opacity-100 translate-y-0'
                        : 'opacity-0 translate-y-2 pointer-events-none'
                        }`}
                    >
                      {tooltip}
                      <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-orange"></div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* NPX Card (Cyan Bar Style) */}
            <div className="pt-6 w-full sm:w-auto flex flex-col sm:flex-row gap-4">
              <div className="flex items-center gap-3 bg-mantle border border-white/10 rounded-xl px-4 py-3 w-full sm:w-fit shadow-lg shadow-purple/5 hover:border-purple/30 transition-all group">
                {/* Prompt Symbol */}
                <span className="text-purple font-mono font-bold">$</span>

                {/* Command Text */}
                <span
                  className="font-mono text-[0.875rem] sm:text-[1rem] tracking-wide whitespace-nowrap font-bold text-yellow"
                >
                  npx soumabrata-dev@latest
                </span>

                {/* Copy Button */}
                <button
                  onClick={handleCopy}
                  className="ml-4 p-2 rounded-lg text-gray-400 hover:text-main hover:bg-white/10 transition-all active:scale-95"
                  title={t('hero.copy.title')}
                >
                  {copied ? <Check size={16} className="text-green" /> : <Copy size={16} />}
                </button>
              </div>

              {/* View Resume Button */}
              <a
                href="/resume.html"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-mantle border border-white/10 text-main rounded-xl px-5 py-3 shadow-lg shadow-purple/5 hover:border-purple/30 hover:bg-white/5 transition-all group active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple/40 focus-visible:ring-offset-2 focus-visible:ring-offset-base"
              >
                <FileText size={20} className="group-hover:text-purple transition-colors" />
                <span>{t('hero.resume')}</span>
              </a>
            </div>

            {/* Total Views Pill */}
            <div className="w-full flex justify-center lg:justify-start">
              <div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface0/50 border border-surface1 shadow-lg shadow-purple/5"
                aria-label={t('hero.views.aria')}
                title={t('hero.views.title')}
              >
                <Eye size={18} className="text-orange" />
                <span className="text-subtext0 text-sm">{visitsLoading ? '…' : visits.toLocaleString()}</span>
              </div>
            </div>

          </div>

          {/* Right Column: Image */}
          <div className="flex justify-center lg:justify-end" data-aos="fade-left" data-aos-duration="1000">
            <div className="animate-float">
              <div style={{ perspective: '900px' }}>
                <div
                  ref={imageCardRef}
                  className="relative w-72 h-72 sm:w-96 sm:h-96 rounded-[3rem] overflow-hidden border-4 border-white/5 shadow-2xl"
                  style={{ transformStyle: 'preserve-3d', willChange: 'transform', transform: 'rotateX(0deg) rotateY(0deg)' }}
                  onPointerMove={handleImagePointerMove}
                  onPointerLeave={resetImageTilt}
                  onPointerCancel={resetImageTilt}
                >
                  <div className="absolute inset-0 bg-linear-to-tr from-purple/20 to-transparent mix-blend-overlay z-10"></div>
                  <img
                    src="/profile.jpg"
                    alt="Soumabrata"
                    className="w-full h-full object-cover"
                    draggable={false}
                  />
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Notification */}
      <div
        className={`fixed top-24 right-10 z-50 transition-all duration-300 transform ${copied ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0 pointer-events-none'
          }`}
      >
        <div className="bg-white rounded-xl shadow-xl p-4 flex flex-col gap-1 border border-gray-100 min-w-70">
          <div className="flex items-center gap-2">
            <Check size={18} className="text-green" />
            <span className="text-gray-900 font-bold text-sm">{t('hero.toast.copiedTitle')}</span>
          </div>
          <p className="text-gray-500 text-xs pl-6">{t('hero.toast.copiedSubtitle')}</p>
        </div>
      </div>
    </section>
  );
}
