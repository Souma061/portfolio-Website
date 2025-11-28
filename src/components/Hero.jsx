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
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-linear-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="absolute top-20 right-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 left-10 w-72 h-72 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse delay-700"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 text-center">
        <div className="mb-4 sm:mb-8 inline-block" data-aos="fade-up" data-aos-duration="800">
          <span className="px-3 py-1 sm:px-4 sm:py-2 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs sm:text-sm font-medium">
            Welcome to my portfolio
          </span>
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-7xl font-bold mb-2 sm:mb-4 leading-tight">
          <span className="block text-white">Hi, I'm</span>
          <span className="block bg-linear-to-r from-blue-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent name-animate">
            Soumabrata Ghosh
          </span>
        </h1>

        <p className="text-base sm:text-lg lg:text-xl text-slate-400 mb-8 sm:mb-12 max-w-2xl mx-auto leading-relaxed px-2" data-aos="fade-up" data-aos-delay="200" data-aos-duration="800">
          Crafting beautiful, responsive web experiences with modern technologies.
          Specializing in React, JavaScript, and UI/UX design.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-12 sm:mb-16 flex-wrap px-2" data-aos="fade-up" data-aos-delay="300" data-aos-duration="800">
          <a
            href="#projects"
            className="inline-block px-6 sm:px-8 py-2 sm:py-3 rounded-lg bg-linear-to-r from-blue-500 to-cyan-500 text-white font-semibold text-sm sm:text-base hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 shadow-lg hover:shadow-blue-500/50 transform hover:scale-105"
          >
            View My Work
          </a>
          <a
            href="/resume.html"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 sm:px-8 py-2 sm:py-3 rounded-lg border-2 border-cyan-400 text-cyan-300 font-semibold text-sm sm:text-base hover:border-white hover:text-white transition-all duration-300 hover:bg-cyan-500/10"
          >
            Download Resume
          </a>
          <a
            href="#contact"
            className="inline-block px-6 sm:px-8 py-2 sm:py-3 rounded-lg border-2 border-slate-400 text-slate-300 font-semibold text-sm sm:text-base hover:border-white hover:text-white transition-all duration-300 hover:bg-slate-800/50"
          >
            Get In Touch
          </a>
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
