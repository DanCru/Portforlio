import { motion } from 'framer-motion';
import { Cpu, Server, Database, Cloud } from 'lucide-react';

const Skills = () => {

  const skillCategories = [
    {
      title: 'Frontend',
      icon: Cpu,
      skills: [
        { name: 'React/Next.js', level: 90 },
        { name: 'Vue.js/Nuxt.js', level: 85 },
        { name: 'TypeScript', level: 88 },
        { name: 'Tailwind CSS', level: 95 },
      ]
    },
    {
      title: 'Backend',
      icon: Server,
      skills: [
        { name: 'Node.js', level: 85 },
        { name: 'Python', level: 70 },
        { name: 'Laravel/PHP', level: 75 },
        { name: 'Express.js', level: 85 },
      ]
    },
    {
      title: 'Database',
      icon: Database,
      skills: [
        { name: 'PostgreSQL', level: 80 },
        { name: 'MongoDB', level: 85 },
        { name: 'Redis', level: 70 },
        { name: 'MySQL', level: 85 },
      ]
    },
    {
      title: 'DevOps/Cloud',
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