import { ExternalLink, Github } from 'lucide-react';
import { useEffect, useState } from 'react';
import PortfolioService, { Project } from '../services/portfolio.service';
import { useLanguage } from '../contexts/LanguageContext';
import { getLocalized } from '../utils/languageUtils';

const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const { language } = useLanguage();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await PortfolioService.getPublicData();
        setProjects(data.projects);
      } catch (error) {
        console.error("Failed to fetch projects", error);
      }
    };
    fetchData();
  }, []);

  return (
    <section id="projects" className="py-24 relative bg-gray-50 dark:bg-valorant-black overflow-hidden transition-colors duration-300">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-sky-100 dark:bg-valorant-red/5 blur-[100px]" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-100 dark:bg-cyan-500/5 blur-[100px]" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col items-start mb-20 border-b border-slate-200 dark:border-white/10 pb-8">
            <span className="font-mono text-sky-600 dark:text-valorant-red uppercase tracking-widest text-sm mb-2">// Selected Works</span>
            <h2 className="text-5xl md:text-7xl font-display font-bold text-slate-900 dark:text-white uppercase tracking-tighter">
                Featured <span className="dark:text-stroke dark:text-transparent text-slate-900">Projects</span>
            </h2>
        </div>

        <div className="space-y-32">
          {projects.map((project, index) => (
            <div key={index} className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 lg:gap-20 items-stretch group`}>
              {/* Project Image - Weapon Card Style */}
              <div className="lg:w-7/12 relative">
                <div className="absolute -inset-2 bg-gradient-to-r from-sky-500 to-indigo-500 dark:from-valorant-red dark:to-transparent opacity-0 group-hover:opacity-20 transition-opacity duration-500 clip-path-slant-right" />
                <div className="h-full bg-white dark:bg-valorant-dark relative clip-path-slant-right overflow-hidden border border-slate-200 dark:border-white/10 group-hover:border-sky-500 dark:group-hover:border-valorant-red/50 transition-colors shadow-xl dark:shadow-none">
                    {project.image && (
                        <img 
                            src={project.image.startsWith('http') ? project.image : `http://localhost:7745${project.image}`}
                            alt={getLocalized(project.title, language)}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 filter brightness-95 dark:brightness-75 group-hover:brightness-100"
                        />
                    )}
                    
                    {/* Overlay Grid */}
                    <div className="absolute inset-0 bg-grid opacity-10 dark:opacity-20" />
                    
                    {/* Floating Status Badge */}
                    <div className="absolute top-6 left-6 flex items-center gap-2">
                        <div className={`px-4 py-1 text-xs font-bold uppercase tracking-wider shadow-sm ${project.status === 'Live' ? 'bg-sky-500 dark:bg-valorant-red text-white' : 'bg-white dark:bg-white text-slate-900 dark:text-valorant-black'}`}>
                            {project.status}
                        </div>
                    </div>

                    {/* Hover Reveal Actions */}
                    <div className="absolute inset-0 bg-slate-900/40 dark:bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-6 backdrop-blur-sm">
                        {project.live_url && (
                             <a href={project.live_url} target="_blank" rel="noopener noreferrer" className="p-4 bg-sky-500 dark:bg-valorant-red text-white hover:bg-white hover:text-sky-600 dark:hover:text-valorant-red transition-all transform hover:-translate-y-1 clip-path-button shadow-lg">
                                <ExternalLink size={24} />
                            </a>
                        )}
                        {project.github_url && (
                            <a href={project.github_url} target="_blank" rel="noopener noreferrer" className="p-4 bg-white text-slate-900 hover:bg-slate-200 dark:hover:bg-white dark:hover:text-valorant-black transition-all transform hover:-translate-y-1 clip-path-button shadow-lg">
                                <Github size={24} />
                            </a>
                        )}
                    </div>
                </div>
              </div>

              {/* Project Details - Tech Spec Style */}
              <div className="lg:w-5/12 flex flex-col justify-center">
                <div className="space-y-6">
                  {/* Header */}
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                        <span className="w-2 h-2 bg-sky-500 dark:bg-valorant-red rounded-sm" />
                        <span className="font-mono text-sm uppercase tracking-widest text-slate-500 dark:text-gray-400">{getLocalized(project.category, language)}</span>
                    </div>
                    <h3 className="text-4xl md:text-5xl font-display font-bold text-slate-900 dark:text-white uppercase leading-none mb-4 group-hover:text-sky-600 dark:group-hover:text-valorant-red transition-colors">
                        {getLocalized(project.title, language)}
                    </h3>
                  </div>

                  {/* Descriptions */}
                  <div className="space-y-4">
                    <p className="text-slate-600 dark:text-gray-400 text-lg leading-relaxed border-l-2 border-sky-500 dark:border-valorant-red/30 pl-4">
                       {getLocalized(project.description, language)}
                    </p>
                    <p className="text-slate-500 dark:text-gray-500 text-sm leading-relaxed">
                       {getLocalized(project.long_description, language)}
                    </p>
                  </div>

                  {/* Specs Grid */}
                  <div className="bg-white dark:bg-white/5 p-6 border border-slate-200 dark:border-white/10 shadow-lg dark:shadow-none">
                    <div className="grid grid-cols-2 gap-4 mb-6">
                        {project.metrics && Object.entries(project.metrics).map(([key, value], idx) => (
                            <div key={idx} className="flex flex-col">
                                <span className="text-[10px] uppercase text-slate-400 dark:text-gray-500 font-mono tracking-wider">{key}</span>
                                <span className="text-xl font-display font-bold text-slate-800 dark:text-white">{value}</span>
                            </div>
                        ))}
                    </div>

                    <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-100 dark:border-white/10">
                        {project.tech_stack?.map((tech, idx) => (
                            <span key={idx} className="text-xs font-mono uppercase px-2 py-1 bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-gray-300 border border-slate-200 dark:border-white/10 rounded-sm">
                                {tech}
                            </span>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View More Projects Button */}
        <div className="flex justify-center mt-24">
          <button className="group relative px-12 py-4 bg-transparent border border-slate-300 dark:border-white/20 text-slate-900 dark:text-white font-display font-bold uppercase tracking-widest hover:bg-slate-100 dark:hover:bg-white/5 transition-colors">
            <span className="relative z-10 flex items-center gap-2">
                View All Projects <Github size={18} />
            </span>
            <div className="absolute top-0 right-0 w-2 h-2 bg-sky-500 dark:bg-valorant-red" />
            <div className="absolute bottom-0 left-0 w-2 h-2 bg-sky-500 dark:bg-valorant-red" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Projects;