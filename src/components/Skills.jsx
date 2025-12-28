import AOS from 'aos';
import { useEffect } from 'react';
import { skillCategories, techStackIcons } from '../data/skills';

export default function Skills() {
  useEffect(() => {
    AOS.refresh();
  }, []);

  // Data imported from ../data/skills

  return (
    <section id="skills" className="py-20 bg-base">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center" data-aos="fade-up" data-aos-duration="800">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            <span className="font-mono text-3xl sm:text-4xl text-white font-bold">
              <span className="text-purple">const</span> skills = <span className="text-main">['Frontend', 'Backend', 'Tools']</span>;
            </span>
          </h2>

        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {skillCategories.map((category, index) => {
            const Icon = category.icon;
            return (
              <div
                key={index}
                className="group relative bg-mantle border border-surface0 rounded-2xl p-8 hover:border-purple/50 transition-all duration-300"
                data-aos="fade-up"
                data-aos-delay={index * 100}
                data-aos-duration="800"
              >
                {/* Background gradient on hover */}
                <div className="absolute inset-0 bg-purple/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                <div className="relative z-10">
                  <div className="mb-6 inline-block p-3 bg-surface0 rounded-lg border border-surface1 group-hover:border-purple/30 transition-all duration-300">
                    <Icon className="w-8 h-8 text-white group-hover:text-purple transition-colors" />
                  </div>

                  <h3 className="text-xl font-bold text-orange mb-4">{category.title}</h3>

                  <ul className="space-y-3">
                    {category.skills.map((skill, skillIndex) => (
                      <li key={skillIndex} className="flex items-center gap-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-green shadow-lg shadow-green/50"></span>
                        <span className="text-subtext0 group-hover:text-subtext1 transition-colors duration-300 font-mono text-sm">
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
          <h3 className="text-lg font-mono text-subtext0 mb-8 text-center">&lt;TechStack /&gt;</h3>
          <div className="flex flex-wrap gap-4 justify-center items-center bg-transparent">
            {techStackIcons.map((tech, index) => (
              <div
                key={index}
                className="group flex flex-col items-center gap-2 hover:scale-110 transition-transform duration-300"
                data-aos="zoom-in"
                data-aos-delay={index * 50}
              >
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-surface0 border border-surface1 group-hover:border-purple/50 flex items-center justify-center transition-all duration-300 p-3 hover:scale-110">
                  <img src={tech.src} alt={tech.name} className="w-full h-full object-contain grayscale group-hover:grayscale-0 transition-all duration-300" />
                </div>
                <span className="text-xs text-subtext0 group-hover:text-white text-center font-mono mt-2 transition-colors duration-300">
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
