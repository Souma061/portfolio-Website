import AOS from 'aos';
import { useEffect } from 'react';
import { skillCategories, techStackIcons } from '../data/skills';

export default function Skills() {
  useEffect(() => {
    AOS.refresh();
  }, []);

  return (
    <section id="skills" className="py-24 bg-base relative overflow-hidden" data-aos="fade-up">
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px pointer-events-none]"></div>

      <div className="w-full px-4 sm:px-6 lg:px-8 relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-20 text-center" data-aos="fade-up" data-aos-duration="800">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            <span className="text-main">Technical</span> <span className="text-purple">Arsenal</span>
          </h2>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface0/60 border border-surface1 text-sm font-mono text-subtext0">
            <span className="w-2 h-2 rounded-full bg-green animate-pulse"></span>
            System Status: Optimal
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, index) => {
            const Icon = category.icon;
            // distinct styles for each index to add variety
            const borderColors = [
              'hover:border-purple/50',
              'hover:border-cyan/50',
              'hover:border-green/50'
            ];
            const iconColors = [
              'text-purple',
              'text-cyan',
              'text-green'
            ];
            const bgGradients = [
              'group-hover:from-purple/10',
              'group-hover:from-cyan/10',
              'group-hover:from-green/10'
            ];

            return (
              <div
                key={index}
                className={`group relative h-full bg-base rounded-3xl p-1 overflow-hidden transition-all duration-500 hover:-translate-y-2 border border-white/5 ${borderColors[index]}`}
                data-aos="fade-up"
                data-aos-delay={index * 150}
              >
                {/* Internal Gradient Overlay */}
                <div className={`absolute inset-0 bg-linear-to-br from-transparent via-transparent to-transparent opacity-0 transition-opacity duration-500 ${bgGradients[index]}`}></div>

                <div className="relative h-full bg-crust rounded-[22px] p-8 flex flex-col items-start gap-6 z-10">

                  {/* Header: Icon & Title */}
                  <div className="flex items-center gap-4 w-full border-b border-white/5 pb-6">
                    <div className={`p-3 rounded-xl bg-white/5 ${iconColors[index]} ring-1 ring-white/10 group-hover:scale-110 transition-transform duration-300`}>
                      <Icon size={32} />
                    </div>
                    <h3 className="text-2xl font-bold text-main tracking-tight">{category.title}</h3>
                  </div>

                  {/* Skills List */}
                  <div className="w-full space-y-4">
                    {category.skills.map((skill, i) => (
                      <div key={i} className="group/item flex items-center justify-between">
                        <span className={`text-gray-400 font-medium group-hover/item:text-main transition-colors duration-300`}>
                          {skill}
                        </span>
                        <div className="h-0.5 w-12 bg-white/5 rounded-full overflow-hidden">
                          <div className={`h-full w-full origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700 delay-100 ${index === 0 ? 'bg-purple' : index === 1 ? 'bg-cyan' : 'bg-green'}`}></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Tech Stack Marquee / Cloud */}
        <div className="mt-20 pt-10 border-t border-white/5" data-aos="fade-up">
          <p className="text-center font-mono text-xl mb-12 font-bold">
            <span className="text-blue">Technologies</span> <span className="text-purple mx-2">I</span> <span className="text-green">Work With</span>
          </p>

          <div className="flex flex-wrap justify-center gap-5 sm:gap-8">
            {techStackIcons.map((tech, index) => {
              const textColors = ['text-blue', 'text-purple', 'text-green', 'text-yellow', 'text-pink', 'text-cyan'];
              const colorClass = textColors[index % textColors.length];

              return (
                <div
                  key={index}
                  className="group flex flex-col items-center gap-4 transition-all duration-300 hover:-translate-y-2 cursor-pointer"
                  data-aos="zoom-in"
                  data-aos-delay={index * 50}
                >
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white/5 border border-white/5 p-4 flex items-center justify-center group-hover:bg-white/10 group-hover:border-white/20 transition-all duration-300 shadow-lg group-hover:shadow-purple/20">
                    <img
                      src={tech.src}
                      alt={tech.name}
                      className="w-full h-full object-contain filter grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-110"
                    />
                  </div>
                  <span className={`text-sm font-semibold ${colorClass} group-hover:text-main transition-colors`}>{tech.name}</span>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
