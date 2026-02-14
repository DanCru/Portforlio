import { Calendar, MapPin } from 'lucide-react';
import { useEffect, useState } from 'react';
import PortfolioService, { Experience as ExperienceType } from '../services/portfolio.service';
import { useLanguage } from '../contexts/LanguageContext';
import { getLocalized } from '../utils/languageUtils';

const Experience = () => {
  const [experiences, setExperiences] = useState<ExperienceType[]>([]);
  const { language, t } = useLanguage();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await PortfolioService.getPublicData();
        setExperiences(data.experiences);
      } catch (error) {
         console.error("Failed to fetch experiences", error);
      }
    };
    fetchData();
  }, []);

  return (
    <section id="experience" className="py-24 bg-white dark:bg-valorant-black relative overflow-hidden transition-colors duration-300">
        {/* Background Overlay */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-sky-100/50 dark:bg-valorant-red/5 rounded-full blur-[120px]" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center mb-20">
            <span className="font-mono text-sky-600 dark:text-valorant-red uppercase tracking-widest text-sm mb-2">{t('experience.subtitle')}</span>
          <h2 className="text-4xl md:text-6xl font-display font-bold text-slate-900 dark:text-white uppercase tracking-tighter">
             {t('experience.sectionTitle1')} <span className="dark:text-stroke dark:text-transparent text-slate-900">{t('experience.sectionTitle2')}</span>
          </h2>
        </div>

        <div className="max-w-5xl mx-auto relative">
          {/* Center Timeline Line - Desktop */}
          <div className="absolute left-0 md:left-1/2 transform md:-translate-x-0.5 w-0.5 h-full bg-slate-200 dark:bg-white/10" />
          
          {experiences.map((exp, index) => (
            <div key={index} className="relative mb-20 md:mb-24 group">
              
              {/* Timeline Node */}
              <div className="absolute left-0 md:left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white dark:bg-valorant-black border-2 border-sky-500 dark:border-valorant-red rotate-45 z-10 group-hover:bg-sky-500 dark:group-hover:bg-valorant-red transition-colors duration-300 mt-6 hidden md:block shadow-md" />
              
              <div className={`md:w-5/12 w-full pl-8 md:pl-0 ${
                index % 2 === 0 ? 'md:mr-auto md:pr-12 md:text-right' : 'md:ml-auto md:pl-12'
              }`}>
                {/* Content Card Wrapper */}
                <div className="relative group/card">
                   {/* Rank Badge - Positioned outside the clipped container to avoid being cut off */}
                   <div className={`absolute -top-3 ${index % 2 === 0 ? 'md:right-4 left-4 md:left-auto' : 'left-4'} z-20 bg-sky-500 dark:bg-valorant-red text-white text-[10px] font-bold px-3 py-1 uppercase tracking-widest shadow-md transition-colors duration-300`}>
                       {exp.rank || `LEVEL ${3 - index}`}
                   </div>

                   {/* Main Content */}
                   <div className="relative bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 p-6 pb-12 shadow-xl dark:shadow-none clip-path-slant-left hover:border-sky-300 dark:hover:border-valorant-red/50 transition-all duration-300">
                    
                    <h3 className="text-2xl font-display font-bold text-slate-900 dark:text-white uppercase mb-1 mt-2">{getLocalized(exp.position, language)}</h3>
                    <h4 className="text-lg font-mono text-sky-600 dark:text-valorant-red mb-4 font-bold">{getLocalized(exp.company, language)}</h4>
                    
                    <div className={`flex flex-col gap-2 mb-4 text-slate-500 dark:text-gray-400 text-sm font-mono ${index % 2 === 0 ? 'md:items-end' : ''}`}>
                         <div className="flex items-center gap-2">
                             <Calendar size={14} /> {exp.period}
                         </div>
                         <div className="flex items-center gap-2">
                             <MapPin size={14} /> {getLocalized(exp.location, language)}
                         </div>
                    </div>

                    <p className="text-slate-600 dark:text-gray-300 mb-6 font-sans leading-relaxed text-sm">
                        {getLocalized(exp.description, language)}
                    </p>

                    <div className={`mb-4 ${index % 2 === 0 ? 'md:text-right' : ''}`}>
                        <h5 className="font-bold text-slate-800 dark:text-white uppercase text-xs tracking-widest mb-3 underline decoration-sky-400 dark:decoration-valorant-red underline-offset-4">{t('experience.keyAchievements')}</h5>
                        <ul className="space-y-2">
                            {Array.isArray(exp.achievements) && exp.achievements.map((achievement, achIndex) => (
                            <li key={achIndex} className={`flex items-start text-sm text-slate-600 dark:text-gray-400 ${index % 2 === 0 ? 'md:justify-end md:text-right' : ''}`}>
                                <span className="mr-2 text-sky-500 dark:text-valorant-red font-bold">{`>`}</span>
                                {achievement}
                            </li>
                            ))}
                        </ul>
                    </div>
                    
                    {/* Tech Stack Pills - Light Mode Optimized */}
                    <div className={`flex flex-wrap gap-2 mt-4 ${index % 2 === 0 ? 'md:justify-end' : ''}`}>
                        {Array.isArray(exp.technologies) && exp.technologies.map((tech, i) => (
                            <span key={i} className="text-xs font-mono px-2 py-1 bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-gray-300 rounded-sm">
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
      </div>
    </section>
  );
};

export default Experience;