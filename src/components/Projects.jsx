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
      className="bg-linear-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 rounded-lg p-6 hover:border-blue-500/50 transition-all duration-300 group h-full hover:shadow-lg hover:shadow-blue-500/10"
      data-aos="fade-up"
      data-aos-delay={index * 100}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
          {project.title}
        </h3>
        <div className="flex gap-3">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-400 hover:text-white transition-colors p-2 hover:bg-slate-700/50 rounded-full"
            title="View Code"
          >
            <Github size={20} />
          </a>
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-300 transition-colors p-2 hover:bg-blue-500/10 rounded-full"
            title="Live Demo"
          >
            <ExternalLink size={20} />
          </a>
        </div>
      </div>

      <p className="text-slate-300 mb-6 leading-relaxed text-sm">
        {project.description}
      </p>

      <div className="flex flex-wrap gap-2 mt-auto">
        {project.technologies.map((tech, i) => (
          <span
            key={i}
            className="px-3 py-1 text-xs bg-blue-500/10 border border-blue-500/20 text-blue-300 rounded-full"
          >
            {tech}
          </span>
        ))}
      </div>
    </div>
  );

  return (
    <section id="projects" className="py-20 bg-slate-950 relative">
      <div className="w-full px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header */}
        <div className="mb-16 text-center" data-aos="fade-up">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            <span className="bg-linear-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Featured Projects
            </span>
          </h2>
          <div className="w-20 h-1 bg-linear-to-r from-blue-500 to-cyan-500 mx-auto rounded-full"></div>
          <p className="text-slate-400 mt-4 text-lg">Scalable systems and full-stack applications</p>
        </div>

        {/* Major Projects - Timeline Style or Featured Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-20">
          {majorProjects.map((project, index) => (
            <div
              key={project.id}
              className="group relative bg-slate-900 border border-slate-800 rounded-xl overflow-hidden hover:border-blue-500/50 transition-all duration-300"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div className="absolute inset-0 bg-linear-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <div className="p-8 relative z-10">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <span className="inline-block px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-semibold mb-3 border border-blue-500/30">
                      {project.year}
                    </span>
                    <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                      {project.title}
                    </h3>
                  </div>
                </div>

                <p className="text-slate-300 mb-8 leading-relaxed">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-8">
                  {project.technologies.map((tech, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 text-xs font-medium bg-slate-800 text-slate-300 rounded-lg border border-slate-700"
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
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800 text-white font-medium hover:bg-slate-700 transition-colors border border-slate-700"
                  >
                    <Github size={18} />
                    <span>Code</span>
                  </a>
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-500 transition-colors shadow-lg shadow-blue-500/20"
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
          <h3 className="text-2xl font-bold text-white mb-2">Frontend Experiments & Tools</h3>
          <p className="text-slate-400">Creative coding and utility applications</p>
        </div>

        {/* Mini Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {miniProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {/* CTA Button */}
        <div className="mt-20 text-center" data-aos="fade-up">
          <p className="text-slate-400 mb-6">Want to see more code?</p>
          <a
            href="https://github.com/Souma061"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-lg border border-slate-700 text-white font-semibold hover:border-blue-500 hover:bg-blue-500/10 transition-all duration-300"
          >
            <Github size={20} />
            Visit My GitHub
          </a>
        </div>

      </div>
    </section>
  );
}
