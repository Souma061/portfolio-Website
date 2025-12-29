import AOS from 'aos';
import { Code2, Database, Globe, Zap } from 'lucide-react';
import { useEffect } from 'react';

export default function About() {
  const mernStack = [
    {
      icon: Globe,
      name: 'MongoDB',
      description: 'NoSQL Database',
      color: 'text-green',
      borderColor: 'group-hover:border-green/50',
      bgColor: 'group-hover:bg-green/10',
    },
    {
      icon: Code2,
      name: 'Express.js',
      description: 'Backend Framework',
      color: 'text-subtext0',
      borderColor: 'group-hover:border-subtext0/50',
      bgColor: 'group-hover:bg-subtext0/10',
    },
    {
      icon: Zap,
      name: 'React.js',
      description: 'Frontend Library',
      color: 'text-sky',
      borderColor: 'group-hover:border-sky/50',
      bgColor: 'group-hover:bg-sky/10',
    },
    {
      icon: Database,
      name: 'Node.js',
      description: 'Runtime Environment',
      color: 'text-green',
      borderColor: 'group-hover:border-green/50',
      bgColor: 'group-hover:bg-green/10',
    }
  ];

  useEffect(() => {
    AOS.refresh();
  }, []);

  return (
    <section id="about" className="py-20 relative overflow-hidden" data-aos="fade-up">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="mb-16 text-center" data-aos="fade-up" data-aos-duration="800">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            <span className="text-main">About</span> <span className="text-purple">Me</span>
          </h2>
          <div className="w-24 h-1 bg-linear-to-r from-blue to-purple mx-auto rounded-full"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">

          {/* MERN Stack Cards */}
          <div className="space-y-8" data-aos="fade-right" data-aos-duration="800">
            <h3 className="text-2xl font-bold text-main mb-8 flex items-center gap-3">
              <span className="text-purple">{'{'}</span>
              MERN Stack
              <span className="text-purple">{'}'}</span>
            </h3>

            <div className="grid grid-cols-2 gap-5">
              {mernStack.map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <div
                    key={index}
                    className={`group flex flex-col items-center justify-center p-6 rounded-2xl bg-mantle border border-white/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${item.borderColor}`}
                  >
                    <div className={`mb-4 p-4 rounded-full bg-white/5 transition-colors duration-300 ${item.bgColor}`}>
                      <IconComponent size={32} className={`transition-transform duration-300 group-hover:scale-110 ${item.color}`} />
                    </div>
                    <h4 className="text-main font-bold text-[1rem] tracking-wide mb-1">{item.name}</h4>
                    <p className="text-gray-400 text-xs font-medium">{item.description}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Text Content */}
          <div className="space-y-8" data-aos="fade-left" data-aos-duration="800">
            <div className="space-y-6 text-xl text-gray-300 leading-relaxed font-light">
              <p>
                Hello, I am <span className="text-yellow font-semibold">Soumabrata Ghosh</span>. I am obsessed with <span className="text-purple font-semibold">API performance</span> and <span className="text-blue font-semibold">database architecture</span>.
                While I enjoy building sleek frontends with <span className="text-cyan font-semibold">React</span>, my true passion lies in designing the <span className="text-pink font-semibold">logic</span> that happens under the hood.
              </p>

              <p>
                I focus on writing <span className="text-main font-medium">self-documenting code</span>, optimizing <span className="text-green font-semibold">queries</span>, and building systems that are scalable and easy to maintain.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-5">
              <div className="bg-mantle border border-white/5 rounded-2xl p-6 hover:border-blue/30 transition-colors group">
                <h4 className="text-gray-400 font-bold mb-2 text-sm uppercase tracking-wider">Projects Built</h4>
                <p className="text-5xl font-extrabold text-main group-hover:text-blue transition-colors">5+</p>
              </div>
              <div className="bg-mantle border border-white/5 rounded-2xl p-6 hover:border-purple/30 transition-colors group">
                <h4 className="text-gray-400 font-bold mb-2 text-sm uppercase tracking-wider">Experience</h4>
                <p className="text-5xl font-extrabold text-main group-hover:text-purple transition-colors">1+ <span className="text-xl text-gray-400 font-medium">Years</span></p>
              </div>
            </div>

            <div className="pt-4">
              <a
                href="#contact"
                className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-purple text-white font-bold text-lg hover:bg-purple/90 transition-all duration-300 shadow-lg shadow-purple/20 hover:shadow-purple/40 hover:-translate-y-1"
              >
                Let's Collaborate
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
