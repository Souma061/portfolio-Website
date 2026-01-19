import AOS from "aos";
import { Code2, ExternalLink, Github, Zap } from "lucide-react";
import { useEffect, useState } from "react";
import { useI18n } from "../i18n/useI18n.js";

export default function Projects() {
  const { t, projects } = useI18n();
  useEffect(() => {
    AOS.refresh();
  }, []);

  const majorProjects = projects.filter((p) => p.category === "major");
  const miniProjects = projects.filter((p) => p.category === "mini");

  const ProjectCard = ({ project, index, featured = false }) => {
    const [isLoaded, setIsLoaded] = useState(false);
    return (
      <div
        className={`group relative bg-mantle border border-surface0 rounded-2xl overflow-hidden hover:border-blue/50 focus-within:border-blue/50 transition-all duration-500 hover:shadow-xl hover:shadow-blue/10 hover:-translate-y-2 h-full flex flex-col ${featured ? "lg:col-span-1" : ""}`}
        data-aos="fade-up"
        data-aos-delay={index * 100}
      >
        {/* Image Preview */}
        <div className="relative h-48 sm:h-56 w-full overflow-hidden bg-surface0">
          <div className="absolute inset-0 bg-gradient-to-t from-mantle via-transparent to-transparent z-10 opacity-60" />

          {/* Loading Skeleton */}
          {!isLoaded && (
            <div className="absolute inset-0 bg-surface0 animate-pulse z-0" />
          )}

          <img
            src={project.img}
            alt={project.title}
            className={`w-full h-full object-cover transform group-hover:scale-110 transition-all duration-700 ${isLoaded ? "opacity-100 blur-0" : "opacity-0 blur-sm"
              }`}
            loading="lazy"
            onLoad={() => setIsLoaded(true)}
          />

          {/* Overlay Badges */}
          <div className="absolute top-4 left-4 z-20 flex gap-2">
            <span className="px-3 py-1 text-xs font-mono font-bold bg-crust/80 backdrop-blur-md text-green border border-green/20 rounded-full shadow-lg">
              {project.year}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col flex-grow relative z-20">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-xl font-bold text-orange group-hover:text-peach transition-colors line-clamp-1">
              {project.title}
            </h3>
            <div className="flex gap-2">
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-subtext0 hover:text-white transition-colors p-2 hover:bg-surface1 rounded-full"
                title={t("projects.tooltip.viewCode")}
              >
                <Github size={18} />
              </a>
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue hover:text-white transition-colors p-2 hover:bg-blue rounded-full"
                title={t("projects.tooltip.liveDemo")}
              >
                <ExternalLink size={18} />
              </a>
            </div>
          </div>

          {/* Role & Metrics */}
          {(project.role || project.metrics) && (
            <div className="flex flex-wrap gap-3 mb-4 text-xs">
              {project.role && (
                <span className="flex items-center gap-1.5 text-subtext1 bg-surface0 px-2.5 py-1 rounded-md border border-surface1">
                  <Code2 size={12} className="text-blue" />
                  {project.role}
                </span>
              )}
              {project.metrics && (
                <span className="flex items-center gap-1.5 text-subtext1 bg-surface0 px-2.5 py-1 rounded-md border border-surface1">
                  <Zap size={12} className="text-yellow" />
                  {project.metrics}
                </span>
              )}
            </div>
          )}

          <p className="text-subtext1 mb-6 leading-relaxed text-sm line-clamp-3">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2 mt-auto">
            {project.technologies.slice(0, 4).map((tech, i) => (
              <span
                key={i}
                className="px-2.5 py-1 text-xs font-medium bg-blue/5 text-blue border border-blue/10 rounded-lg group-hover:border-blue/20 transition-colors"
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 4 && (
              <span className="px-2.5 py-1 text-xs font-medium bg-surface0 text-subtext1 rounded-lg border border-surface1">
                +{project.technologies.length - 4}
              </span>
            )}
          </div>
        </div>
      </div>
    );
  };
  return (
    <section id="projects" className="py-24 bg-crust relative overflow-hidden">
      {/* Background Decorative */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-blue/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple/5 rounded-full blur-[100px]" />
      </div>

      <div className="w-full px-4 sm:px-6 lg:px-8 relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-20 text-center" data-aos="fade-up">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            <span className="font-mono">
              <span className="text-green">code</span>
              <span className="text-subtext0">.</span>
              <span className="text-blue">craft</span>
            </span>
          </h2>
          <p className="text-subtext0 text-lg max-w-2xl mx-auto">
            {t("projects.sub.scalable")} {t("projects.sub.and")}{" "}
            <span className="text-cyan font-medium">
              {t("projects.sub.fullstack")}
            </span>
          </p>
        </div>

        {/* Major Projects */}
        <div className="mb-24">
          <div className="flex items-center gap-4 mb-10 pl-2">
            <h3 className="text-2xl font-bold text-white flex items-center gap-3">
              <span className="w-8 h-1 bg-blue rounded-full"></span>
              Featured Projects
            </h3>
          </div>
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-10">
            {majorProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                featured={true}
              />
            ))}
          </div>
        </div>

        {/* Mini Projects */}
        <div>
          <div className="flex items-center gap-4 mb-10 pl-2">
            <h3 className="text-xl font-bold text-white flex items-center gap-3">
              <span className="w-8 h-1 bg-purple rounded-full"></span>
              {t("projects.mini.title")}
            </h3>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {miniProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        </div>

        {/* CTA Button */}
        <div className="mt-24 text-center" data-aos="fade-up">
          <p className="text-subtext0 mb-8 text-lg">
            {t("projects.cta.question")}
          </p>
          <a
            href="https://github.com/Souma061"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-surface0 border border-surface1 text-main font-semibold hover:border-blue hover:bg-blue/5 transition-all duration-300 hover:shadow-lg hover:shadow-blue/10"
          >
            <Github
              size={20}
              className="group-hover:text-blue transition-colors"
            />
            {t("projects.cta.button")}
          </a>
        </div>
      </div>
    </section>
  );
}
