import AOS from 'aos';
import { useEffect } from 'react';
import { skillCategories, techStackIcons } from '../data/skills';

export default function Skills() {
  useEffect(() => {
    AOS.refresh();
  }, []);

  // Data imported from ../data/skills

  return (
    <section id="skills" className="py-20 bg-slate-800">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center" data-aos="fade-up" data-aos-duration="800">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            <span className="bg-linear-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Skills & Expertise
            </span>
          </h2>
          <div className="w-20 h-1 bg-linear-to-r from-blue-500 to-cyan-500 mx-auto rounded-full"></div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {skillCategories.map((category, index) => {
            const Icon = category.icon;
            return (
              <div
                key={index}
                className="group relative bg-linear-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 rounded-lg p-8 hover:border-blue-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10"
                data-aos="fade-up"
                data-aos-delay={index * 100}
                data-aos-duration="800"
              >
                {/* Background gradient on hover */}
                <div className="absolute inset-0 bg-linear-to-br from-blue-500/5 to-cyan-500/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                <div className="relative z-10">
                  <div className="mb-6 inline-block p-3 bg-linear-to-br from-blue-500/20 to-cyan-500/20 rounded-lg group-hover:from-blue-500/40 group-hover:to-cyan-500/40 transition-all duration-300">
                    <Icon className="w-8 h-8 text-blue-400" />
                  </div>

                  <h3 className="text-xl font-bold text-white mb-4">{category.title}</h3>

                  <ul className="space-y-3">
                    {category.skills.map((skill, skillIndex) => (
                      <li key={skillIndex} className="flex items-center gap-3">
                        <span className="w-2 h-2 rounded-full bg-linear-to-r from-blue-400 to-cyan-400"></span>
                        <span className="text-slate-300 group-hover:text-white transition-colors duration-300">
                          {skill}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>

        {/* Tech Stack Icons */}
        <div className="mt-16" data-aos="fade-up" data-aos-duration="800">
          <h3 className="text-2xl font-bold text-white mb-8 text-center">Languages and Tools I Use</h3>
          <div className="flex flex-wrap gap-4 justify-center items-center bg-linear-to-r from-slate-800/30 to-slate-900/30 border border-slate-700/50 rounded-lg p-8">
            {techStackIcons.map((tech, index) => (
              <div
                key={index}
                className="group flex flex-col items-center gap-2 hover:scale-110 transition-transform duration-300"
                data-aos="zoom-in"
                data-aos-delay={index * 50}
              >
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white/10 hover:bg-white/20 border border-slate-600/50 group-hover:border-blue-400/50 flex items-center justify-center group-hover:shadow-lg group-hover:shadow-blue-500/20 transition-all duration-300 p-2">
                  <img src={tech.src} alt={tech.name} className="w-full h-full object-contain" />
                </div>
                <span className="text-xs text-slate-400 group-hover:text-slate-200 text-center font-medium transition-colors duration-300">
                  {tech.name}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
