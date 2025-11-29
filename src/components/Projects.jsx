import AOS from 'aos';
import { CheckCircle, ExternalLink, Github } from 'lucide-react';
import { useEffect } from 'react';

export default function Projects() {
  useEffect(() => {
    AOS.refresh();
  }, []);

  const projects = [
    {
      id: 1,
      year: '2025',
      title: 'Full-Stack Blog Sharing Platform',
      description: 'A modern blogging platform where users can create, share, and manage blog posts. Built with React for dynamic UI, Redux for state management, and Appwrite as the backend service for seamless data handling.',
      technologies: ['React.js', 'Redux', 'Tailwind CSS', 'Appwrite'],
      status: 'completed',
      github: 'https://github.com/Souma061/Blog-App',
      live: 'https://postmee-123.vercel.app/',
    },
    {
      id: 2,
      year: '2025(Ongoing)',
      title: 'LinguaChat - Real-Time Multilingual Chat Platform',
      description: 'A real-time multilingual chat application enabling users speaking different languages to communicate seamlessly. Features automatic message translation using AI, real-time messaging with Socket.IO, and MongoDB database for persistent storage.',
      technologies: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Socket.io', 'Lingo.dev AI'],
      status: 'completed',
      github: 'https://github.com/Souma061/LinguaChat',
      live: 'https://linguachat-dva1.onrender.com/',
    },
    {
      id: 3,
      year: '2025',
      title: 'Stellarium - Modern Astrology Website',
      description: 'A modern, elegant astrology website that brings the mysteries of the cosmos to your fingertips. Stellarium offers personalized horoscope readings, celestial insights, and astrological guidance in a beautifully crafted digital experience.',
      technologies: ['HTML5', 'CSS3', 'JavaScript'],
      status: 'completed',
      github: 'https://github.com/Souma061/Stellarium',
      live: 'https://stellarium-ecru.vercel.app/',
    },
  ];

  return (
    <section id="projects" className="py-20 bg-slate-950 relative">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-5"></div>
      </div>

      <div className="w-full px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="mb-12 sm:mb-16 text-center" data-aos="fade-up" data-aos-duration="800">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4">
            <span className="bg-linear-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Project Timeline
            </span>
          </h2>
          <div className="w-16 sm:w-20 h-1 bg-linear-to-r from-blue-500 to-cyan-500 mx-auto rounded-full"></div>
          <p className="text-slate-400 mt-3 sm:mt-4 text-base sm:text-lg">Journey through my recent projects and achievements</p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-0 sm:left-1/2 transform sm:-translate-x-1/2 w-1 h-full bg-linear-to-b from-blue-500 via-cyan-500 to-purple-500 rounded-full"></div>

          {/* Timeline Items */}
          <div className="space-y-8 sm:space-y-12 md:space-y-16">
            {projects.map((project, index) => (
              <div
                key={project.id}
                className={`flex flex-col sm:flex-row gap-6 sm:gap-8 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                data-aos={index % 2 === 0 ? 'fade-right' : 'fade-left'}
                data-aos-duration="800"
                data-aos-delay={index * 100}
              >
                {/* Content */}
                <div className="flex-1 pl-6 sm:pl-0">
                  <div className="bg-linear-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 rounded-lg p-4 sm:p-6 hover:border-blue-500/50 transition-all duration-300 group h-full">
                    <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                      <span className="px-2 sm:px-3 py-1 rounded-full bg-blue-500/20 border border-blue-500/50 text-blue-300 text-xs sm:text-sm font-semibold">
                        {project.year}
                      </span>
                      <CheckCircle size={18} className="text-cyan-400 shrink-0" />
                    </div>

                    <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 sm:mb-3 group-hover:text-cyan-300 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-slate-300 mb-3 sm:mb-4 leading-relaxed text-sm sm:text-base">{project.description}</p>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2 mb-4 sm:mb-6">
                      {project.technologies.map((tech, i) => (
                        <span
                          key={i}
                          className="px-2 sm:px-3 py-1 text-xs bg-blue-500/20 border border-blue-500/50 text-blue-300 rounded-full hover:bg-blue-500/30 transition-colors"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Links */}
                    <div className="flex gap-2 sm:gap-3">
                      <a
                        href={project.github}
                        className="flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 rounded-lg bg-slate-700/50 text-slate-300 hover:text-white hover:bg-slate-600/50 transition-all duration-300 text-xs sm:text-sm font-medium"
                      >
                        <Github size={16} />
                        <span>Code</span>
                      </a>
                      <a
                        href={project.live}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-linear-to-r from-blue-500/30 to-cyan-500/30 text-blue-300 hover:from-blue-500/50 hover:to-cyan-500/50 transition-all duration-300 text-sm font-medium"
                      >
                        <span>Live</span>
                        <ExternalLink size={16} />
                      </a>
                    </div>
                  </div>
                </div>

                {/* Timeline Dot */}
                <div className="flex justify-center md:w-auto">
                  <div className="flex flex-col items-center">
                    <div className="w-4 h-4 rounded-full bg-blue-500 border-4 border-slate-950 shadow-lg shadow-blue-500/50"></div>
                  </div>
                </div>

                {/* Spacer for alignment */}
                <div className="flex-1 hidden md:block"></div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Button */}
        <div className="mt-16 text-center" data-aos="fade-up" data-aos-duration="800">
          <p className="text-slate-400 mb-6">Interested in working together?</p>
          <a
            href="#contact"
            className="inline-block px-8 py-3 rounded-lg bg-linear-to-r from-blue-500 to-cyan-500 text-white font-semibold hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 shadow-lg hover:shadow-blue-500/50 transform hover:scale-105"
          >
            Get In Touch
          </a>
        </div>
      </div>
    </section>
  );
}
