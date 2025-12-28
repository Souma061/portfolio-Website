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
    navigator.clipboard.writeText('npx soumabrata-dev');
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
            <div className="w-full sm:w-auto pt-4">
              <div className="relative group w-full sm:w-auto">
                <div className="relative z-10 flex items-center bg-[#11111b] border border-white/10 rounded-xl overflow-hidden w-full sm:w-[380px] h-14 shadow-lg transition-transform duration-300 hover:scale-[1.02]">
                  {/* Left Cyan Bar */}
                  <div className="w-14 h-full bg-cyan shrink-0"></div>

                  {/* Text */}
                  <div className="flex-1 pl-6">
                    <code className="text-white font-mono text-base sm:text-lg tracking-wide">npx soumabrata-dev</code>
                  </div>

                  {/* Copy Button */}
                  <div className="pr-4">
                    <button
                      onClick={handleCopy}
                      className="p-2 rounded-lg border border-white/10 text-gray-400 hover:text-white hover:border-white/30 transition-all bg-white/5"
                      title="Copy to clipboard"
                    >
                      {copied ? <Check size={18} className="text-green" /> : <Copy size={18} />}
                    </button>
                  </div>
                </div>
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
    </section>
  );
}
