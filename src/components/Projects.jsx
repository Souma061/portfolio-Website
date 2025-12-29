import AOS from 'aos';
import { ExternalLink, Github } from 'lucide-react';
import { useEffect } from 'react';
import { projects } from '../data/projects';

export default function Projects() {
  useEffect(() => {
    AOS.refresh();
  }, []);

  const majorProjects = projects.filter(p => p.category === 'major');
  const miniProjects = projects.filter(p => p.category === 'mini');

  const ProjectCard = ({ project, index }) => (
    <div
      className="bg-linear-to-br from-surface0/50 to-mantle/50 border border-white/10 rounded-lg p-6 hover:border-blue/50 transition-all duration-300 group h-full hover:shadow-lg hover:shadow-blue/10"
      data-aos="fade-up"
      data-aos-delay={index * 100}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-orange group-hover:text-peach transition-colors">
          {project.title}
        </h3>
        <div className="flex gap-3">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-subtext0 hover:text-main transition-colors p-2 hover:bg-surface0/50 rounded-full"
            title="View Code"
          >
            <Github size={20} />
          </a>
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue hover:text-sapphire transition-colors p-2 hover:bg-blue/10 rounded-full"
            title="Live Demo"
          >
            <ExternalLink size={20} />
          </a>
        </div>
      </div>

      <p className="text-subtext1 mb-6 leading-relaxed text-sm">
        {project.description}
      </p>

      <div className="flex flex-wrap gap-2 mt-auto">
        {project.technologies.map((tech, i) => (
          <span
            key={i}
            className="px-3 py-1 text-xs bg-blue/10 border border-blue/20 text-blue rounded-full"
          >
            {tech}
          </span>
        ))}
      </div>
    </div>
  );

  return (
    <section id="projects" className="py-20 bg-crust relative" data-aos="fade-up">
      <div className="w-full px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header */}
        <div className="mb-16 text-center" data-aos="fade-up">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            <span className="font-mono text-4xl sm:text-5xl lg:text-6xl font-bold">
              <span className="text-green">code</span>
              <span className="text-purple">:</span>
              <span className="text-blue">work</span>
            </span>
          </h2>
          <p className="text-subtext0 mt-4 text-lg">
            <span className="text-purple font-medium">Scalable systems</span> and <span className="text-cyan font-medium">full-stack applications</span>
          </p>
        </div>

        {/* Major Projects - Timeline Style or Featured Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-20">
          {majorProjects.map((project, index) => (
            <div
              key={project.id}
              className="group relative bg-mantle border border-surface0 rounded-2xl overflow-hidden hover:border-purple/50 transition-all duration-300"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div className="absolute inset-0 bg-purple/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <div className="p-8 relative z-10">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <span className="inline-block px-3 py-1 rounded-full bg-surface1 text-green text-xs font-mono mb-3 border border-surface2">
                      {project.year}
                    </span>
                    <h3 className="text-2xl font-bold text-orange mb-2 group-hover:text-peach transition-colors">
                      {project.title}
                    </h3>
                  </div>
                </div>

                <p className="text-subtext1 mb-8 leading-relaxed">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-8">
                  {project.technologies.map((tech, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 text-xs font-medium bg-surface0 text-subtext1 rounded-lg border border-surface1"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex gap-4">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-surface0 text-main font-medium hover:bg-surface1 transition-colors border border-surface1"
                  >
                    <Github size={18} />
                    <span>Code</span>
                  </a>
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-live-button flex items-center gap-2 px-4 py-2 rounded-lg bg-blue text-[1rem] font-medium hover:bg-sapphire transition-colors shadow-lg shadow-blue/20"
                  >
                    <ExternalLink size={18} />
                    <span>Live Demo</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mini Tools Header */}
        <div className="mb-12 text-center" data-aos="fade-up">
          <h3 className="text-2xl font-bold text-main mb-2">Frontend Experiments & Tools</h3>
          <p className="text-subtext0">Creative coding and utility applications</p>
        </div>

        {/* Mini Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {miniProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {/* CTA Button */}
        <div className="mt-20 text-center" data-aos="fade-up">
          <p className="text-subtext0 mb-6">Want to see more code?</p>
          <a
            href="https://github.com/Souma061"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-lg border border-surface1 text-main font-semibold hover:border-blue hover:bg-blue/10 transition-all duration-300"
          >
            <Github size={20} />
            Visit My GitHub
          </a>
        </div>

      </div>
    </section>
  );
}
