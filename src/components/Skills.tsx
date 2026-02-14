import { motion } from 'framer-motion';
import { Cpu, Server, Database, Cloud, Code, Terminal, Layers } from 'lucide-react';
import { useEffect, useState } from 'react';
import PortfolioService, { Skill } from '../services/portfolio.service';
import { useLanguage } from '../contexts/LanguageContext';
import { getLocalized } from '../utils/languageUtils';

const API_BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:7745';

const Skills = () => {
  const [skillCategories, setSkillCategories] = useState<{title: string, icon: any, skills: {name: string, icon_url?: string}[]}[]>([]);
  const { language, t } = useLanguage();

  const iconMap: {[key: string]: any} = {
    'Frontend': Cpu,
    'Backend': Server,
    'Database': Database,
    'DevOps/Cloud': Cloud,
    'Tools': Terminal,
    'Other': Code
  };

  const [additionalSkills, setAdditionalSkills] = useState([
    t('skills.agile'), t('skills.architecture'), t('skills.performance'),
    t('skills.security'), t('skills.codeReview'), t('skills.problemSolving'),
    t('skills.teamLead'), t('skills.communication')
  ]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await PortfolioService.getPublicData();
        const skillsData: {[key: string]: Skill[]} = data.skills;
        
        // Settings for additional skills
        const settings = data.settings;
        if (settings.additional_skills) {
             setAdditionalSkills(settings.additional_skills.split(',').map(s => s.trim()).filter(s => s));
        }

        const mappedCategories = Object.keys(skillsData).map(category => ({
            title: category,
            icon: iconMap[category] || Layers,
            skills: skillsData[category].map((s: Skill) => ({
                name: s.name,
                icon_url: s.icon_url
            }))
        }));
        // ... rest of processing (no change needed here)

        const processedCategories = mappedCategories.map(cat => {
            let displayTitle = cat.title;
            try {
                if (cat.title.startsWith('{')) {
                     const parsed = JSON.parse(cat.title);
                     displayTitle = getLocalized(parsed, language);
                }
            } catch (e) {
                // Not JSON, keep as is
            }
            return {
                ...cat,
                title: displayTitle
            };
        });

        setSkillCategories(processedCategories);
      } catch (error) {
        console.error("Failed to fetch skills", error);
      }
    };
    fetchData();
  }, [language]);

  return (
    <section id="skills" className="py-24 bg-gray-50 dark:bg-valorant-black relative overflow-hidden transition-colors duration-300">
        {/* Decorative Grid */}
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-grid opacity-5 pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center mb-20">
            <span className="font-mono text-sky-600 dark:text-valorant-red uppercase tracking-widest text-sm mb-2">{t('skills.sectionSubtitle')}</span>
            <h2 className="text-4xl md:text-6xl font-display font-bold text-slate-900 dark:text-white uppercase tracking-tighter">
                {t('skills.sectionTitle1')} <span className="dark:text-stroke dark:text-transparent text-slate-900">{t('skills.sectionTitle2')}</span>
            </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {skillCategories.map((category, index) => (
            <div key={index} className="bg-white dark:bg-valorant-dark border-t-2 border-slate-200 dark:border-valorant-red/0 hover:border-sky-500 dark:hover:border-valorant-red transition-all duration-300 p-6 group relative shadow-lg dark:shadow-none bg-opacity-80 backdrop-blur-sm">
                {/* Corner accents */}
                <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-sky-200 dark:border-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-sky-200 dark:border-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="flex items-center mb-8 pb-4 border-b border-slate-100 dark:border-white/10">
                <div className="bg-sky-50 dark:bg-white/5 p-3 rounded-sm mr-4 group-hover:bg-sky-100 dark:group-hover:bg-valorant-red/20 transition-colors">
                  <category.icon size={24} className="text-sky-600 dark:text-white" />
                </div>
                <h3 className="text-xl font-display font-bold text-slate-900 dark:text-white uppercase tracking-wider">{category.title}</h3>
              </div>

              <div className="grid grid-cols-3 gap-4">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div 
                    key={skillIndex}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.05 + skillIndex * 0.05 }}
                    className="flex flex-col items-center gap-2 p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-white/5 transition-colors cursor-default group/skill"
                  >
                    {skill.icon_url ? (
                      <div className="w-10 h-10 flex items-center justify-center">
                        <img 
                          src={skill.icon_url.startsWith('http') ? skill.icon_url : `${API_BASE}${skill.icon_url}`}
                          alt={skill.name}
                          className="w-8 h-8 object-contain group-hover/skill:scale-110 transition-transform"
                        />
                      </div>
                    ) : (
                      <div className="w-10 h-10 flex items-center justify-center bg-slate-100 dark:bg-white/10 rounded-lg">
                        <Code size={18} className="text-slate-400 dark:text-gray-500" />
                      </div>
                    )}
                    <span className="text-slate-600 dark:text-gray-400 font-mono text-[10px] uppercase tracking-wider font-bold text-center leading-tight">{skill.name}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Additional Skills Tags */}
        <div className="mt-20 border-t border-slate-200 dark:border-white/10 pt-10 text-center">
            <h3 className="text-xl font-display font-bold text-slate-900 dark:text-white uppercase tracking-widest mb-8">{t('skills.additionalSkills')}</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {additionalSkills.map((skill, index) => (
              <span 
                key={index}
                className="bg-transparent border border-slate-300 dark:border-white/20 text-slate-600 dark:text-gray-400 px-4 py-2 font-mono text-sm uppercase hover:bg-slate-900 dark:hover:bg-white hover:text-white dark:hover:text-valorant-black transition-all duration-300 cursor-default rounded-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;