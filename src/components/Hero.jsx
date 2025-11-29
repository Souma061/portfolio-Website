import AOS from 'aos';
import { ChevronDown } from 'lucide-react';
import { useEffect } from 'react';

export default function Hero() {
  useEffect(() => {
    AOS.refresh();
  }, []);

  const handleScroll = (e) => {
    e.preventDefault();
    document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-linear-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="absolute top-20 right-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 left-10 w-72 h-72 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse delay-700"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 w-full px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-center lg:items-start">
          {/* Left Avatar Section */}
          <div className="lg:col-span-2 flex flex-col items-center lg:items-start lg:pt-8" data-aos="fade-right" data-aos-delay="100" data-aos-duration="800">
            {/* Avatar with Programmer-bro Image */}
            <div className="relative mb-8 w-64 h-64 sm:w-72 sm:h-72 lg:w-80 lg:h-80">
              {/* Glowing Background */}
              <div className="absolute -inset-6 bg-linear-to-r from-blue-500 via-cyan-500 to-blue-500 rounded-3xl opacity-15 blur-3xl animate-pulse"></div>

              {/* Avatar Image */}
              <img
                src="/icons/Programmer-bro.svg"
                alt="Developer Avatar"
                className="relative w-full h-full rounded-3xl drop-shadow-2xl object-cover"
              />
            </div>

            {/* Backend Dev Badge */}
            <span className="px-6 py-2.5 rounded-full bg-blue-500 text-white text-sm font-semibold shadow-lg">
              Backend Dev
            </span>
          </div>

          {/* Right Content Section */}
          <div className="lg:col-span-3 space-y-6 lg:space-y-8">
            <div data-aos="fade-up" data-aos-duration="800">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-sm font-medium">
                <span className="inline-block w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                Available for freelance & opportunities
              </span>
            </div>

            <div data-aos="fade-up" data-aos-delay="100" data-aos-duration="800">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight mb-2">
                <span className="block text-white">Soumabrata Ghosh</span>
                <span className="block bg-linear-to-r from-blue-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent name-animate">
                  Fullstack Developer
                </span>
              </h1>
            </div>

            <p className="text-lg sm:text-xl text-slate-300 leading-relaxed max-w-2xl" data-aos="fade-up" data-aos-delay="200" data-aos-duration="800">
              Crafting robust APIs and scalable backend systems using <span className="text-cyan-400 font-semibold">Node.js, Express, MongoDB</span>, and the <span className="text-cyan-400 font-semibold">MERN stack</span>. I focus on clean code, system design, and building applications that scale.
            </p>

            {/* Tech Stack Pills */}
            <div className="flex flex-wrap gap-3 pt-2" data-aos="fade-up" data-aos-delay="250" data-aos-duration="800">
              <span className="px-4 py-2 rounded-full border border-blue-500/50 text-blue-300 text-sm font-medium bg-blue-500/10">Node.js</span>
              <span className="px-4 py-2 rounded-full border border-cyan-500/50 text-cyan-300 text-sm font-medium bg-cyan-500/10">Express</span>
              <span className="px-4 py-2 rounded-full border border-green-500/50 text-green-300 text-sm font-medium bg-green-500/10">MongoDB</span>
              <span className="px-4 py-2 rounded-full border border-purple-500/50 text-purple-300 text-sm font-medium bg-purple-500/10">React</span>
              <span className="px-4 py-2 rounded-full border border-pink-500/50 text-pink-300 text-sm font-medium bg-pink-500/10">System Design</span>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4" data-aos="fade-up" data-aos-delay="300" data-aos-duration="800">
              <a
                href="#projects"
                className="px-8 py-3 rounded-lg bg-linear-to-r from-blue-500 to-cyan-500 text-white font-semibold text-base hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 shadow-lg hover:shadow-blue-500/50 transform hover:scale-105 text-center"
              >
                See My Work
              </a>
              <a
                href="/resume.html"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3 rounded-lg border-2 border-slate-600 text-slate-300 font-semibold text-base hover:border-slate-400 hover:text-white transition-all duration-300 hover:bg-slate-800/50 text-center"
              >
                Download Resume
              </a>
              <a
                href="#contact"
                className="px-8 py-3 rounded-lg border-2 border-slate-500 text-slate-300 font-semibold text-base hover:border-white hover:text-white transition-all duration-300 hover:bg-slate-800/50 text-center"
              >
                Let's Talk
              </a>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <button
          onClick={handleScroll}
          className="mx-auto block mt-20 text-slate-400 hover:text-white transition-colors duration-300 animate-bounce" data-aos="fade-up" data-aos-delay="400"
        >
          <ChevronDown size={32} className="animate-bounce" />
        </button>
      </div>
    </section>
  );
}
