import { motion } from 'framer-motion';
import { Cpu, Server, Database, Cloud, Code, Terminal, Layers } from 'lucide-react';
import { useEffect, useState } from 'react';
import PortfolioService, { Skill } from '../services/portfolio.service';
import { useLanguage } from '../contexts/LanguageContext';
import { getLocalized } from '../utils/languageUtils';

const Skills = () => {
  const [skillCategories, setSkillCategories] = useState<{title: string, icon: any, skills: {name: string, level: number}[]}[]>([]);
  const { language } = useLanguage();

  const iconMap: {[key: string]: any} = {
    'Frontend': Cpu,
    'Backend': Server,
    'Database': Database,
    'DevOps/Cloud': Cloud,
    'Tools': Terminal,
    'Other': Code
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await PortfolioService.getPublicData();
        const skillsData: {[key: string]: Skill[]} = data.skills;
        
        const mappedCategories = Object.keys(skillsData).map(category => ({
            title: category, // Category keys usually come from DB group key, might be just string or JSON string if we grouped by JSON?
            // Actually, backend grouping might be tricky if category is JSON. 
            // The controller groups by 'category' column. If 'category' is JSON, it groups by the exact JSON string.
            // So for now, we assume category is grouped by the unique string in DB. 
            // IF we stored it as JSON, the key is the JSON string. We need to parse it to display.
            icon: iconMap[category] || Layers,
            skills: skillsData[category].map((s: Skill) => ({
                name: s.name,
                level: s.proficiency
            }))
        }));

        // If category keys are JSON strings, we should parse them for display
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
            <span className="font-mono text-sky-600 dark:text-valorant-red uppercase tracking-widest text-sm mb-2">// Proficiency</span>
            <h2 className="text-4xl md:text-6xl font-display font-bold text-slate-900 dark:text-white uppercase tracking-tighter">
                Technical <span className="dark:text-stroke dark:text-transparent text-slate-900">Stack</span>
            </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {skillCategories.map((category, index) => (
            //@ts-ignore - Framer motion generic types can be tricky
            <div key={index} className="bg-white dark:bg-valorant-dark border-t-2 border-slate-200 dark:border-valorant-red/0 hover:border-sky-500 dark:hover:border-valorant-red transition-all duration-300 p-6 group relative shadow-lg dark:shadow-none bg-opacity-80 backdrop-blur-sm">
                {/* Corner accents - visible only in dark mode or subtle in light */}
                <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-sky-200 dark:border-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-sky-200 dark:border-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="flex items-center mb-8 pb-4 border-b border-slate-100 dark:border-white/10">
                <div className="bg-sky-50 dark:bg-white/5 p-3 rounded-sm mr-4 group-hover:bg-sky-100 dark:group-hover:bg-valorant-red/20 transition-colors">
                  <category.icon size={24} className="text-sky-600 dark:text-white" />
                </div>
                <h3 className="text-xl font-display font-bold text-slate-900 dark:text-white uppercase tracking-wider">{category.title}</h3>
              </div>

              <div className="space-y-6">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skillIndex}>
                    <div className="flex justify-between mb-2">
                        <span className="text-slate-600 dark:text-gray-400 font-mono text-xs uppercase tracking-wider font-bold">{skill.name}</span>
                        <span className="text-sky-600 dark:text-valorant-red font-mono text-xs font-bold">{skill.level}%</span>
                    </div>
                    {/* Progress Bar Valorant Style */}
                    <div className="h-2 bg-slate-200 dark:bg-white/5 skew-x-[-20deg] relative overflow-hidden">
                        <motion.div 
                             initial={{ width: 0 }}
                             whileInView={{ width: `${skill.level}%` }}
                             viewport={{ once: true }}
                             transition={{ duration: 1, delay: index * 0.1 + skillIndex * 0.1 }}
                             className="h-full bg-gradient-to-r from-sky-400 to-indigo-500 dark:from-valorant-red dark:to-valorant-red"
                        />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Additional Skills Tags */}
        <div className="mt-20 border-t border-slate-200 dark:border-white/10 pt-10 text-center">
            <h3 className="text-xl font-display font-bold text-slate-900 dark:text-white uppercase tracking-widest mb-8">Additional Skills</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              'Agile/Scrum', 'System Architecture', 'Performance Optimization',
              'Security Practices', 'Code Review', 'Problem Solving',
              'Team Leadership', 'Client Communication'
            ].map((skill, index) => (
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