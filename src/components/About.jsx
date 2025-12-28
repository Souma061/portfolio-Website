import AOS from 'aos';
import { Code2, Database, Globe, Zap } from 'lucide-react';
import { useEffect } from 'react';

export default function About() {
  const mernStack = [
    {
      icon: Globe,
      name: 'MongoDB',
      description: 'NoSQL Database',
      color: 'text-green'
    },
    {
      icon: Code2,
      name: 'Express.js',
      description: 'Backend Framework',
      color: 'text-subtext0'
    },
    {
      icon: Zap,
      name: 'React.js',
      description: 'Frontend Library',
      color: 'text-sky'
    },
    {
      icon: Database,
      name: 'Node.js',
      description: 'Runtime Environment',
      color: 'text-green'
    }
  ];

  useEffect(() => {
    AOS.refresh();
  }, []);

  return (
    <section id="about" className="py-20 bg-crust">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center" data-aos="fade-up" data-aos-duration="800">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            <span className="bg-linear-to-r from-blue to-sky bg-clip-text text-transparent">
              About Me
            </span>
          </h2>
          <div className="w-20 h-1 bg-linear-to-r from-blue to-sky mx-auto rounded-full"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* MERN Stack */}
          <div className="space-y-8" data-aos="fade-right" data-aos-duration="800">
            <h3 className="text-2xl font-bold text-orange mb-8">MERN Stack Expertise</h3>
            <div className="grid grid-cols-2 gap-6">
              {mernStack.map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <div
                    key={index}
                    className="group flex flex-col items-center justify-center p-6 sm:p-8 rounded-lg bg-linear-to-br from-surface0/50 to-mantle/50 border border-surface1/50 hover:border-blue/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue/10 hover:scale-105"
                    data-aos="fade-up"
                    data-aos-delay={index * 100}
                  >
                    <div className={`mb-4 transition-transform duration-300 group-hover:scale-110 ${item.color}`}>
                      <IconComponent size={40} className="stroke-current" />
                    </div>
                    <h4 className="text-main font-bold text-center text-sm sm:text-base">{item.name}</h4>
                    <p className="text-subtext0 text-xs sm:text-sm text-center mt-2">{item.description}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Content */}
          <div className="space-y-6" data-aos="fade-left" data-aos-duration="800">
            <p className="text-lg text-subtext1 leading-relaxed">
              I am obsessed with <span className="text-green font-medium">API performance</span> and <span className="text-purple font-medium">database architecture</span>. While I enjoy building sleek frontends with <span className="text-cyan font-medium">React</span>, my true passion lies in designing the <span className="text-pink font-medium">logic</span> that happens under the hood—optimizing <span className="text-green font-medium">MongoDB queries</span> and structuring <span className="text-orange font-medium">Express routes</span> for maximum <span className="text-purple font-medium">scalability</span>.
            </p>

            <p className="text-lg text-subtext1 leading-relaxed">
              I believe that a great application isn't just about features, but about how it handles <span className="text-cyan font-medium">data</span>, <span className="text-rose font-medium">security</span>, and <span className="text-orange font-medium">concurrency</span>. I focus on writing <span className="text-green font-medium">self-documenting code</span> and building systems that are easy to <span className="text-blue font-medium">maintain</span> and expand.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-6">
              <div className="bg-linear-to-br from-blue/10 to-sky/10 border border-blue/20 rounded-lg p-4 hover:border-blue/50 transition-colors duration-300" data-aos="zoom-in" data-aos-delay="100">
                <h4 className="text-main font-semibold mb-2 text-sm">Projects Built</h4>
                <p className="text-2xl sm:text-3xl font-bold bg-linear-to-r from-blue to-sky bg-clip-text text-transparent">5+</p>
              </div>
              <div className="bg-linear-to-br from-blue/10 to-sky/10 border border-blue/20 rounded-lg p-4 hover:border-blue/50 transition-colors duration-300" data-aos="zoom-in" data-aos-delay="200">
                <h4 className="text-main font-semibold mb-2 text-sm">Experience</h4>
                <p className="text-2xl sm:text-3xl font-bold bg-linear-to-r from-blue to-sky bg-clip-text text-transparent">1+ Years</p>
              </div>
            </div>

            <a
              href="#contact"
              className="inline-block mt-8 px-8 py-3 rounded-lg bg-linear-to-r from-blue to-sky text-base font-semibold hover:from-sapphire hover:to-teal transition-all duration-300 shadow-lg hover:shadow-blue/50 transform hover:scale-105" data-aos="fade-up" data-aos-delay="300"
            >
              Get In Touch
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
