import AOS from 'aos';
import { Check, ChevronDown, Copy, Github, Linkedin, Mail } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function Hero() {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    AOS.refresh();
  }, []);

  const handleScroll = (e) => {
    e.preventDefault();
    document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleCopy = () => {
    navigator.clipboard.writeText('npx soumabrata-dev');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-12 sm:pt-20 overflow-hidden">
      <div className="absolute inset-0 bg-base">
        <div className="absolute top-20 right-10 w-72 h-72 bg-purple/10 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 left-10 w-72 h-72 bg-blue/10 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-pulse delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-cyan/10 rounded-full mix-blend-screen filter blur-3xl opacity-10 animate-pulse delay-700"></div>
      </div>

      <div className="relative z-10 w-full px-3 sm:px-8 lg:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 sm:gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-2 flex flex-col items-center lg:items-start lg:pt-8 order-2 lg:order-1" data-aos="fade-right" data-aos-delay="100" data-aos-duration="800">
            <div className="relative mb-6 w-56 h-56 sm:w-72 sm:h-72 lg:w-80 lg:h-80">


              <div className="relative w-full h-full p-2 rounded-full border-2 border-blue/30 bg-mantle/50 backdrop-blur-sm">
                <img
                  src="/profile.jpg"
                  alt="Soumabrata Ghosh"
                  className="w-full h-full rounded-full object-cover shadow-2xl shadow-blue/20"
                />
              </div>
            </div>

            <span className="px-6 py-2.5 rounded-full bg-surface0 border border-purple/20 text-purple text-xs sm:text-sm font-semibold shadow-lg shadow-purple/10">
              Backend Dev
            </span>
          </div>

          <div className="lg:col-span-3 space-y-4 sm:space-y-6 lg:space-y-8 order-1 lg:order-2">
            <div data-aos="fade-up" data-aos-duration="800">
              <span className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full bg-surface0 border border-green/20 text-green text-xs sm:text-sm font-medium">
                <span className="inline-block w-2 h-2 bg-green rounded-full animate-pulse"></span>
                <span className="hidden sm:inline">Available for freelance & opportunities</span>
                <span className="sm:hidden">Available for opportunities</span>
              </span>
            </div>

            <div data-aos="fade-up" data-aos-delay="100" data-aos-duration="800">
              <h1 className="text-4xl sm:text-6xl lg:text-8xl font-bold leading-tight mb-2 tracking-tight">
                <span className="block text-white">Soumabrata</span>
                <span className="block text-purple mt-2">
                  Fullstack Dev.
                </span>
              </h1>
            </div>

            <p className="text-sm sm:text-lg lg:text-xl text-main leading-relaxed max-w-2xl font-mono" data-aos="fade-up" data-aos-delay="200" data-aos-duration="800">
              Converts <span className="text-green font-bold">coffee</span> into <span className="text-green font-bold">code</span>. Specialized in building robust backends with <span className="text-cyan font-semibold">Node.js</span>.
            </p>

            <div className="flex flex-wrap gap-2 sm:gap-3 pt-2" data-aos="fade-up" data-aos-delay="250" data-aos-duration="800">
              <span className="px-3 py-1 sm:px-4 sm:py-2 rounded-full border border-blue/50 text-blue text-xs sm:text-sm font-medium bg-blue/10">Node.js</span>
              <span className="px-3 py-1 sm:px-4 sm:py-2 rounded-full border border-teal/50 text-teal text-xs sm:text-sm font-medium bg-teal/10">Express</span>
              <span className="px-3 py-1 sm:px-4 sm:py-2 rounded-full border border-green/50 text-green text-xs sm:text-sm font-medium bg-green/10">MongoDB</span>
              <span className="px-3 py-1 sm:px-4 sm:py-2 rounded-full border border-mauve/50 text-mauve text-xs sm:text-sm font-medium bg-mauve/10">React</span>
              <span className="px-3 py-1 sm:px-4 sm:py-2 rounded-full border border-pink/50 text-pink text-xs sm:text-sm font-medium bg-pink/10">System Design</span>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 pt-6 items-center sm:items-start" data-aos="fade-up" data-aos-delay="300" data-aos-duration="800">
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

              <div className="flex gap-5 items-center h-14">
                <Github className="text-subtext0 hover:text-white cursor-pointer transition-colors hover:scale-110 duration-300" size={26} />
                <Mail className="text-subtext0 hover:text-white cursor-pointer transition-colors hover:scale-110 duration-300" size={26} />
                <Linkedin className="text-subtext0 hover:text-white cursor-pointer transition-colors hover:scale-110 duration-300" size={26} />
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={handleScroll}
          className="mx-auto block mt-12 sm:mt-20 text-subtext0 hover:text-main transition-colors duration-300 animate-bounce" data-aos="fade-up" data-aos-delay="400"
        >
          <ChevronDown size={24} className="sm:size-8 animate-bounce" />
        </button>
      </div>
    </section>
  );
}
