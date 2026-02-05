import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { Cpu, Server, Database, Cloud, Smartphone, Terminal } from 'lucide-react';

const Skills = () => {
  const { t } = useLanguage();

  const skillCategories = [
    {
      title: 'Frontend Protocol',
      icon: Cpu,
      skills: [
        { name: 'React/Next.js', level: 90 },
        { name: 'Vue.js/Nuxt.js', level: 85 },
        { name: 'TypeScript', level: 88 },
        { name: 'Tailwind CSS', level: 95 },
      ]
    },
    {
      title: 'Backend Systems',
      icon: Server,
      skills: [
        { name: 'Node.js', level: 85 },
        { name: 'Python/Django', level: 70 },
        { name: 'Laravel/PHP', level: 75 },
        { name: 'Express.js', level: 85 },
      ]
    },
    {
      title: 'Data Archives',
      icon: Database,
      skills: [
        { name: 'PostgreSQL', level: 80 },
        { name: 'MongoDB', level: 85 },
        { name: 'Redis', level: 70 },
        { name: 'MySQL', level: 85 },
      ]
    },
    {
      title: 'Cloud Ops',
      icon: Cloud,
      skills: [
        { name: 'AWS', level: 70 },
        { name: 'Docker', level: 80 },
        { name: 'Kubernetes', level: 60 },
        { name: 'CI/CD', level: 75 },
      ]
    }
  ];

  return (
    <section id="skills" className="py-24 bg-valorant-black relative overflow-hidden">
        {/* Decorative Grid */}
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-grid opacity-5" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center mb-20">
            <span className="font-mono text-valorant-red uppercase tracking-widest text-sm mb-2">// Arsenal</span>
            <h2 className="text-4xl md:text-6xl font-display font-bold text-white uppercase tracking-tighter">
                Technical <span className="text-stroke text-transparent">Loadout</span>
            </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {skillCategories.map((category, index) => (
            //@ts-ignore - Framer motion generic types can be tricky
            <div key={index} className="bg-valorant-dark border-t-2 border-valorant-red/0 hover:border-valorant-red transition-all duration-300 p-6 group relative">
                <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="flex items-center mb-8 pb-4 border-b border-white/10">
                <div className="bg-white/5 p-3 rounded-sm mr-4 group-hover:bg-valorant-red/20 transition-colors">
                  <category.icon size={24} className="text-white" />
                </div>
                <h3 className="text-xl font-display font-bold text-white uppercase tracking-wider">{category.title}</h3>
              </div>

              <div className="space-y-6">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skillIndex}>
                    <div className="flex justify-between mb-2">
                        <span className="text-gray-400 font-mono text-xs uppercase tracking-wider">{skill.name}</span>
                        <span className="text-valorant-red font-mono text-xs">{skill.level}%</span>
                    </div>
                    {/* Progress Bar Valorant Style */}
                    <div className="h-2 bg-white/5 skew-x-[-20deg] relative overflow-hidden">
                        <motion.div 
                             initial={{ width: 0 }}
                             whileInView={{ width: `${skill.level}%` }}
                             viewport={{ once: true }}
                             transition={{ duration: 1, delay: index * 0.1 + skillIndex * 0.1 }}
                             className="h-full bg-valorant-red"
                        />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Additional Skills Tags */}
        <div className="mt-20 border-t border-white/10 pt-10 text-center">
            <h3 className="text-xl font-display font-bold text-white uppercase tracking-widest mb-8">Secondary Abilities</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              'Agile/Scrum', 'System Architecture', 'Performance Optimization',
              'Security Ops', 'Code Review Monitor', 'Problem Solving',
              'Squad Leadership', 'Client Comms'
            ].map((skill, index) => (
              <span 
                key={index}
                className="bg-transparent border border-white/20 text-gray-400 px-4 py-2 font-mono text-sm uppercase hover:bg-white hover:text-valorant-black hover:border-white transition-all duration-300 cursor-default"
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