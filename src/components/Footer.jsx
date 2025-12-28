import AOS from 'aos';
import { Github, Linkedin, Mail, Twitter } from 'lucide-react';
import { useEffect } from 'react';

export default function Footer() {


  useEffect(() => {
    AOS.refresh();
  }, []);

  return (
    <footer className="py-8 border-t border-white/5">
      <div className="container mx-auto px-4 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6 text-sm">

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
          <span>Made with</span>
          <span className="text-purple heart-beat">❤</span>
          <span>, Thank You!</span>
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
