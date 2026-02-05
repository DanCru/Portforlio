import React from 'react';
import { GraduationCap, Award, BookOpen, Star, Shield, Trophy } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Education = () => {
  const { t } = useLanguage();

  const education = [
    {
      degree: 'Bachelor of IT',
      school: 'University [Name]',
      year: '2024 - PRESENT',
      gpa: 'IN PROGRESS',
      description: 'Major in Software Engineering. Focused on scalable systems and algorithms.',
      image: 'https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      degree: 'Associate Degree',
      school: 'FPT Polytechnic',
      year: '2021 - 2024',
      gpa: 'DISTINCTION',
      description: 'Graduated with honors. Specialized in Web Development application.',
      image: 'https://images.pexels.com/photos/1205651/pexels-photo-1205651.jpeg?auto=compress&cs=tinysrgb&w=400'
    }
  ];

  return (
    <section id="education" className="py-24 bg-valorant-black relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        <div className="absolute inset-0 bg-grid opacity-10" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center mb-20">
            <span className="font-mono text-valorant-red uppercase tracking-widest text-sm mb-2">// Training Records</span>
          <h2 className="text-4xl md:text-6xl font-display font-bold text-white uppercase tracking-tighter">
             Knowledge <span className="text-stroke text-transparent">Base</span>
          </h2>
        </div>

        {/* Degrees Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-24 max-w-5xl mx-auto">
            {education.map((edu, index) => (
                <div key={index} className="bg-white/5 border border-white/10 p-1 group hover:border-valorant-red/50 transition-colors overflow-hidden">
                    <div className="relative h-48 overflow-hidden mb-4">
                        <img src={edu.image} alt={edu.school} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 filter grayscale group-hover:grayscale-0" />
                        <div className="absolute inset-0 bg-black/50 group-hover:bg-transparent transition-colors duration-300" />
                        <div className="absolute bottom-0 left-0 bg-valorant-red text-white text-xs font-bold px-3 py-1 uppercase tracking-wider">
                            {edu.year}
                        </div>
                    </div>
                    
                    <div className="p-4">
                        <h3 className="text-2xl font-display font-bold text-white uppercase mb-1">{edu.degree}</h3>
                        <p className="text-valorant-red font-mono text-sm mb-3 uppercase tracking-wider">{edu.school}</p>
                        
                        <div className="flex items-center gap-2 mb-4">
                            <span className="text-xs bg-white/10 text-gray-300 px-2 py-0.5 border border-white/10 uppercase tracking-widest">
                                RANK: {edu.gpa}
                            </span>
                        </div>
                        
                        <p className="text-gray-400 text-sm leading-relaxed">
                            {edu.description}
                        </p>
                    </div>
                </div>
            ))}
        </div>

        {/* Certifications Section */}
        <div className="mb-24">
            <div className="flex items-center justify-center gap-3 mb-10">
                <Trophy className="text-valorant-red" size={24} />
                <h3 className="text-2xl font-display font-bold text-white uppercase tracking-widest">Certifications</h3>
            </div>
            
            <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
                {[
                    { name: 'JS Algorithms', issuer: 'freeCodeCamp' },
                    { name: 'Responsive Web', issuer: 'freeCodeCamp' },
                    { name: 'React Guide', issuer: 'Udemy' },
                    { name: 'Git Bootcamp', issuer: 'Udemy' }
                ].map((cert, idx) => (
                    <div key={idx} className="bg-valorant-dark border border-white/10 px-6 py-4 hover:bg-white hover:text-black hover:border-white transition-all duration-300 cursor-default group clip-path-button">
                        <div className="text-xs font-mono text-gray-500 group-hover:text-black/50 uppercase tracking-wider mb-1">{cert.issuer}</div>
                        <div className="font-bold uppercase tracking-wide">{cert.name}</div>
                    </div>
                ))}
            </div>
        </div>

        {/* Philosophy */}
        <div className="max-w-4xl mx-auto text-center border-t border-white/10 pt-16 relative">
            <Shield className="text-white/20 mx-auto mb-6" size={48} />
            <h3 className="text-xl font-display font-bold text-white uppercase tracking-widest mb-4">Core Philosophy</h3>
            <p className="text-gray-400 text-lg md:text-xl font-serif italic max-w-2xl mx-auto">
                "Continuous adaptation. Strategic learning. Always upgrading the codebase of the mind."
            </p>
        </div>

      </div>
    </section>
  );
};

export default Education;