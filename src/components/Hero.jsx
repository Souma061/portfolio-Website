import AOS from 'aos';
import { Check, Copy, Github, Linkedin, Mail, Twitter, User } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function Hero() {
  const [copied, setCopied] = useState(false);
  const [activeTooltip, setActiveTooltip] = useState(null);

  useEffect(() => {
    AOS.refresh();
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText('npx soumabrata-dev@latest');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };



  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-[#1e1e2e]">

      {/* Background Decor: diagonal lines (left) */}
      <div className="absolute top-40 left-0 opacity-10 hidden lg:block">
        <svg width="200" height="200" viewBox="0 0 200 200">
          <line x1="0" y1="100" x2="100" y2="0" stroke="white" strokeWidth="20" />
          <line x1="40" y1="100" x2="140" y2="0" stroke="white" strokeWidth="20" />
          <line x1="80" y1="100" x2="180" y2="0" stroke="white" strokeWidth="20" />
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
              <h1 className="text-6xl sm:text-7xl lg:text-8xl font-bold tracking-tighter text-white">
                Soumabrata
              </h1>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-purple tracking-tight">
                Fullstack Dev.
              </h2>
              <p className="text-lg sm:text-xl text-subtext0 font-mono pt-4">
                Building <span className="text-green">robust systems</span> with <span className="text-green">pixel-perfect UIs</span>.
              </p>
            </div>

            {/* Social Icons Row */}
            <div className="flex items-center gap-6 pt-2">
              {[
                { Icon: Github, href: "https://github.com/Souma061", tooltip: "My Code" },
                { Icon: Mail, href: "mailto:soumabrataghosh57@gmail.com", tooltip: "Send Email" },
                { Icon: Linkedin, href: "https://www.linkedin.com/in/soumabrata-ghosh-85862530b/", tooltip: "Let's Connect" },
                { Icon: Twitter, href: "https://x.com/SoumabrataGhosh", tooltip: "Follow Me" },
                { Icon: User, href: "/resume.html", tooltip: "Yup, that's me" }
              ].map((item, index) => {
                const { Icon, href, tooltip } = item;
                return (
                  <div
                    key={index}
                    className="relative group cursor-pointer"
                    onMouseEnter={() => setActiveTooltip(index)}
                    onMouseLeave={() => setActiveTooltip(null)}
                  >
                    <a
                      href={href}
                      target="_blank"
                      rel="noreferrer"
                      className="text-subtext0 hover:text-purple transition-all transform hover:scale-110 block"
                      aria-label={tooltip}
                    >
                      <Icon size={32} />
                    </a>

                    {/* Tooltip */}
                    <div className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-max px-3 py-1 bg-orange text-base font-bold text-xs rounded-lg shadow-lg transition-all duration-300 transform ${activeTooltip === index ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'}`}>
                      {tooltip}
                      <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-orange"></div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* NPX Card (Cyan Bar Style) */}
            <div className="pt-6 w-full sm:w-auto">
              <div className="flex items-center gap-3 bg-[#181825] border border-white/10 rounded-xl px-4 py-3 w-full sm:w-fit shadow-lg shadow-purple/5 hover:border-purple/30 transition-all group">
                {/* Prompt Symbol */}
                <span className="text-purple font-mono font-bold">$</span>

                {/* Command Text */}
                <span
                  className="font-mono text-sm sm:text-base tracking-wide whitespace-nowrap font-bold"
                  style={{ color: '#efe864d9' }}
                >
                  npx soumabrata-dev@latest
                </span>

                {/* Copy Button */}
                <button
                  onClick={handleCopy}
                  className="ml-4 p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-all active:scale-95"
                  title="Copy to clipboard"
                >
                  {copied ? <Check size={16} className="text-green" /> : <Copy size={16} />}
                </button>
              </div>
            </div>

          </div>

          {/* Right Column: Image */}
          <div className="flex justify-center lg:justify-end" data-aos="fade-left" data-aos-duration="1000">
            <div className="animate-float">
              <div className="relative w-72 h-72 sm:w-96 sm:h-96 rounded-[3rem] overflow-hidden border-4 border-white/5 shadow-2xl transition-transform duration-500 hover:scale-[1.02] hover:rotate-1">
                <div className="absolute inset-0 bg-gradient-to-tr from-purple/20 to-transparent mix-blend-overlay z-10"></div>
                <img
                  src="/profile.jpg"
                  alt="Soumabrata"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

        </div>
      </div>
      {/* Notification Notification */}
      <div
        className={`fixed top-24 right-10 z-50 transition-all duration-300 transform ${copied ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0 pointer-events-none'}`}
      >
        <div className="bg-white rounded-xl shadow-xl p-4 flex flex-col gap-1 border border-gray-100 min-w-[280px]">
          <div className="flex items-center gap-2">
            <Check size={18} className="text-green" />
            <span className="text-gray-900 font-bold text-sm">Copied to clipboard</span>
          </div>
          <p className="text-gray-500 text-xs pl-6">Make sure you run this in your terminal &lt;3</p>
        </div>
      </div>
    </section>
  );
}
