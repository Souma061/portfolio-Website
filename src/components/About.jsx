import AOS from 'aos';
import { Code2, Database, Globe, Zap } from 'lucide-react';
import { useEffect } from 'react';

export default function About() {
  const mernStack = [
    {
      icon: Globe,
      name: 'MongoDB',
      description: 'NoSQL Database',
      color: 'text-green-400'
    },
    {
      icon: Code2,
      name: 'Express.js',
      description: 'Backend Framework',
      color: 'text-gray-300'
    },
    {
      icon: Zap,
      name: 'React.js',
      description: 'Frontend Library',
      color: 'text-cyan-400'
    },
    {
      icon: Database,
      name: 'Node.js',
      description: 'Runtime Environment',
      color: 'text-green-500'
    }
  ];

  useEffect(() => {
    AOS.refresh();
  }, []);

  return (
    <section id="about" className="py-20 bg-slate-950">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center" data-aos="fade-up" data-aos-duration="800">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            <span className="bg-linear-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              About Me
            </span>
          </h2>
          <div className="w-20 h-1 bg-linear-to-r from-blue-500 to-cyan-500 mx-auto rounded-full"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* MERN Stack */}
          <div className="space-y-8" data-aos="fade-right" data-aos-duration="800">
            <h3 className="text-2xl font-bold text-white mb-8">MERN Stack Expertise</h3>
            <div className="grid grid-cols-2 gap-6">
              {mernStack.map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <div
                    key={index}
                    className="group flex flex-col items-center justify-center p-6 sm:p-8 rounded-lg bg-linear-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 hover:border-blue-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10 hover:scale-105"
                    data-aos="fade-up"
                    data-aos-delay={index * 100}
                  >
                    <div className={`mb-4 transition-transform duration-300 group-hover:scale-110 ${item.color}`}>
                      <IconComponent size={40} className="stroke-current" />
                    </div>
                    <h4 className="text-white font-bold text-center text-sm sm:text-base">{item.name}</h4>
                    <p className="text-slate-400 text-xs sm:text-sm text-center mt-2">{item.description}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Content */}
          <div className="space-y-6" data-aos="fade-left" data-aos-duration="800">
            <p className="text-lg text-slate-300 leading-relaxed">
              I'm a Backend Enthusiast passionate about building robust, scalable server-side solutions. With strong expertise in Node.js, Express.js, MongoDB, and the MERN stack, I create efficient APIs and databases that power modern applications.
            </p>

            <p className="text-lg text-slate-300 leading-relaxed">
              My focus is on backend development, database optimization, API design, and system architecture. I love solving complex problems with clean code, implementing best practices, and building applications that are fast, secure, and maintainable at scale.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-6">
              <div className="bg-linear-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-lg p-4 hover:border-blue-500/50 transition-colors duration-300" data-aos="zoom-in" data-aos-delay="100">
                <h4 className="text-white font-semibold mb-2 text-sm">Projects Built</h4>
                <p className="text-2xl sm:text-3xl font-bold bg-linear-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">3+</p>
              </div>
              <div className="bg-linear-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-lg p-4 hover:border-blue-500/50 transition-colors duration-300" data-aos="zoom-in" data-aos-delay="200">
                <h4 className="text-white font-semibold mb-2 text-sm">Experience</h4>
                <p className="text-2xl sm:text-3xl font-bold bg-linear-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">1+ Years</p>
              </div>
            </div>

            <a
              href="#contact"
              className="inline-block mt-8 px-8 py-3 rounded-lg bg-linear-to-r from-blue-500 to-cyan-500 text-white font-semibold hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 shadow-lg hover:shadow-blue-500/50 transform hover:scale-105" data-aos="fade-up" data-aos-delay="300"
            >
              Get In Touch
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
