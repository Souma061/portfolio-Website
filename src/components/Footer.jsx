import AOS from 'aos';
import { Github, Linkedin, Mail, Twitter } from 'lucide-react';
import { useEffect } from 'react';
import { useI18n } from '../i18n/useI18n.js';

export default function Footer() {
  const { t } = useI18n();


  useEffect(() => {
    if (typeof AOS.refreshHard === 'function') {
      AOS.refreshHard();
    } else {
      AOS.refresh();
    }

    // AOS applies `opacity: 0` until it sees a scroll event.
    // Footer is lazy-loaded, so force a tick to trigger visibility.
    requestAnimationFrame(() => {
      window.dispatchEvent(new Event('scroll'));
    });
  }, []);

  return (
    <footer className="mt-auto py-8 border-t border-white/5">
      <div
        className="container mx-auto px-4 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6 text-sm"
        data-aos="fade"
        data-aos-offset="0"
        data-aos-duration="400"
      >

        {/* Social Links - Left Side */}
        <div className="flex gap-6 order-2 md:order-1">
          <a href="mailto:soumabrataghosh57@gmail.com" className="text-gray-400 hover:text-orange transition-colors">
            <Mail size={22} />
          </a>
          <a href="https://github.com/Souma061" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-orange transition-colors">
            <Github size={22} />
          </a>
          <a href="https://www.linkedin.com/in/soumabrata-ghosh-85862530b/" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-orange transition-colors">
            <Linkedin size={22} />
          </a>
          <a href="https://x.com/SoumabrataGhosh" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-orange transition-colors">
            <Twitter size={22} />
          </a>
        </div>

        {/* Text - Right Side */}
        <div className="text-gray-500 font-medium order-1 md:order-2 flex items-center gap-1">
          <span>{t('footer.madeWith')}</span>
          <span className="text-purple heart-beat">❤</span>
          <span>{t('footer.thankYou')}</span>
        </div>

      </div>

      {/* Custom CSS for Heartbeat */}
      <style>{`
        .heart-beat {
          animation: beat 1.5s infinite;
          display: inline-block;
        }
        @keyframes beat {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.2); }
        }
      `}</style>
    </footer>
  );
}
