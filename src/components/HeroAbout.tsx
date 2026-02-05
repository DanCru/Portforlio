import React from 'react';
import { ChevronDown, Code, Cpu, Database, Crosshair, Zap, Shield, Hexagon } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import ProfileImage from '../image/image-profile2.png'; 

const HeroAbout = () => {
  const { t } = useLanguage();

  const scrollToExperience = () => {
    const experienceSection = document.getElementById('experience');
    if (experienceSection) {
      experienceSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const highlights = [
    { icon: Crosshair, title: '2+ Years', desc: 'COMBAT EXPERIENCE' },
    { icon: Hexagon, title: '10+ Projects', desc: 'MISSIONS COMPLETED' },
    { icon: Zap, title: 'Sinh viên IT', desc: 'LEVELING UP' },
    { icon: Shield, title: '100%', desc: 'DEDICATION' },
  ];

  return (
    <section id="home" className="relative min-h-screen flex flex-col">
      {/* Background with Grid and Overlay */}
      <div className="absolute inset-0 bg-valorant-black z-0">
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-valorant-red/10 to-transparent" />
        
        {/* Animated Shapes */}
        <div className="absolute top-20 right-20 animate-pulse opacity-20">
          <div className="w-32 h-32 border border-valorant-red/30 rounded-full flex items-center justify-center">
            <div className="w-24 h-24 border border-valorant-red/50 rounded-full" />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 relative z-10 flex-grow flex flex-col justify-center pt-20">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          
          {/* Left Content - Agent Stats Style */}
          <div className="flex-1 w-full lg:w-1/2">
            <div className="mb-6 inline-block">
              <span className="font-mono text-valorant-red text-sm tracking-widest border border-valorant-red/30 px-3 py-1 rounded-sm uppercase">
                // System Initialized
              </span>
            </div>
            
            <h1 className="text-6xl md:text-8xl font-display font-bold uppercase leading-[0.9] tracking-tighter mb-6 text-white text-shadow">
              <span className="block text-stroke hover:text-white transition-colors duration-300">
                {t('hero.title').split(' ').slice(0, 1)}
              </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-valorant-red to-white">
                {t('hero.title').split(' ').slice(1).join(' ')}
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-400 font-sans max-w-xl mb-8 border-l-4 border-valorant-red pl-6">
              {t('hero.subtitle')}
            </p>

            <div className="flex flex-wrap gap-4 mb-12">
              <button
                onClick={scrollToExperience}
                className="group relative px-8 py-4 bg-valorant-red text-white font-display font-bold uppercase tracking-wider clip-path-button hover:bg-white hover:text-valorant-black transition-colors"
              >
                {t('hero.cta1')}
                <span className="absolute bottom-0 right-0 w-2 h-2 bg-white group-hover:bg-valorant-red" />
              </button>
              
              <button
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-4 border border-white/20 text-white font-display font-bold uppercase tracking-wider hover:bg-white/5 transition-colors"
              >
                {t('hero.cta2')}
              </button>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 border-t border-white/10 pt-8">
              {highlights.map((item, index) => (
                <div key={index} className="space-y-1 group cursor-default">
                  <div className="text-valorant-red mb-2 opacity-50 group-hover:opacity-100 transition-opacity">
                    <item.icon size={20} />
                  </div>
                  <div className="font-display text-2xl font-bold">{item.title}</div>
                  <div className="font-mono text-[10px] text-gray-500 tracking-widest uppercase">{item.desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content - Character/Profile Display */}
          <div className="flex-1 w-full lg:w-1/2 flex justify-center lg:justify-end relative">
            <div className="relative w-full max-w-md aspect-square">
              {/* Decorative Frame */}
              <div className="absolute inset-0 border-2 border-white/10 clip-path-slant-right" />
              <div className="absolute -inset-4 border border-valorant-red/20 clip-path-slant-left opacity-50" />
              
              {/* Main Image Container */}
              <div className="absolute inset-2 bg-valorant-dark clip-path-slant-right overflow-hidden group">
                <img 
                  src={ProfileImage} 
                  alt="Profile" 
                  className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-500 scale-100 group-hover:scale-110" 
                />
                
                {/* Overlay UI Details */}
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 to-transparent">
                  <div className="font-display text-4xl text-white uppercase tracking-wider">Duc.DEV</div>
                  <div className="flex items-center space-x-2 text-valorant-red font-mono text-sm">
                    <span className="pulse-dot w-2 h-2 bg-valorant-red rounded-full animate-pulse" />
                    <span>ONLINE</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50 animate-bounce">
        <span className="font-mono text-[10px] uppercase tracking-widest">Scroll</span>
        <ChevronDown size={20} />
      </div>
    </section>
  );
};

export default HeroAbout;