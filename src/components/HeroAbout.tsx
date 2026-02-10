import { ChevronDown, Crosshair, Zap, Shield, Hexagon } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import ProfileImage from '../image/image-profile4.jpg'; 
import { useEffect, useState } from 'react';
import PortfolioService from '../services/portfolio.service';
import { getLocalized } from '../utils/languageUtils';

const HeroAbout = () => {
  const { t, language } = useLanguage();
  const [heroTitle, setHeroTitle] = useState('');
  const [heroSubtitle, setHeroSubtitle] = useState('');
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await PortfolioService.getPublicData();
        // Extract localized content based on current language
        const titleData = data.settings.hero_title;
        const subtitleData = data.settings.hero_subtitle;
        
        setHeroTitle(getLocalized(titleData, language) || t('hero.title'));
        setHeroSubtitle(getLocalized(subtitleData, language) || t('hero.subtitle'));
      } catch (error) {
        console.error("Failed to fetch portfolio data", error);
      }
    };
    fetchData();
  }, [t, language]);

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
    <section id="home" className="relative min-h-screen flex flex-col bg-white dark:bg-valorant-black transition-colors duration-300">
      {/* Background with Grid and Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-grid opacity-10 dark:opacity-20 pointer-events-none" />
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-sky-100/50 to-transparent dark:from-valorant-red/10 dark:to-transparent pointer-events-none" />
        
        {/* Animated Shapes */}
        <div className="absolute top-20 right-20 animate-pulse opacity-20">
          <div className="w-32 h-32 border border-sky-300 dark:border-valorant-red/30 rounded-full flex items-center justify-center">
            <div className="w-24 h-24 border border-sky-500 dark:border-valorant-red/50 rounded-full" />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 relative z-10 flex-grow flex flex-col justify-center pt-20">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          
          {/* Left Content - Agent Stats Style */}
          <div className="flex-1 w-full lg:w-1/2">
            <div className="mb-6 inline-block">
              <span className="font-mono text-sky-600 dark:text-valorant-red text-sm tracking-widest border border-sky-200 dark:border-valorant-red/30 px-3 py-1 rounded-sm uppercase bg-sky-50 dark:bg-transparent">
                // System Initialized
              </span>
            </div>
            
            <h1 className="text-6xl md:text-8xl font-display font-bold uppercase leading-[0.9] tracking-tighter mb-6 text-slate-900 dark:text-white">
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-white/50 dark:text-stroke dark:hover:text-white transition-colors duration-300">
                {heroTitle.includes(' ') ? heroTitle.split(' ').slice(0, 1) : heroTitle}
              </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-indigo-600 dark:from-valorant-red dark:to-white">
                {heroTitle.includes(' ') ? heroTitle.split(' ').slice(1).join(' ') : ''}
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-slate-600 dark:text-gray-400 font-sans max-w-xl mb-8 border-l-4 border-sky-500 dark:border-valorant-red pl-6">
              {heroSubtitle}
            </p>

            <div className="flex flex-wrap gap-4 mb-12">
              <button
                onClick={scrollToExperience}
                className="group relative px-8 py-4 bg-slate-900 dark:bg-valorant-red text-white font-display font-bold uppercase tracking-wider clip-path-button hover:bg-sky-600 dark:hover:bg-white dark:hover:text-valorant-black transition-colors shadow-lg dark:shadow-none"
              >
                {t('hero.cta1')}
                <span className="absolute bottom-0 right-0 w-2 h-2 bg-sky-400 dark:bg-white group-hover:bg-white dark:group-hover:bg-valorant-red" />
              </button>
              
              <button
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-4 border border-slate-300 dark:border-white/20 text-slate-900 dark:text-white font-display font-bold uppercase tracking-wider hover:bg-slate-100 dark:hover:bg-white/5 transition-colors"
              >
                {t('hero.cta2')}
              </button>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 border-t border-slate-200 dark:border-white/10 pt-8">
              {highlights.map((item, index) => (
                <div key={index} className="space-y-1 group cursor-default">
                  <div className="text-sky-600 dark:text-valorant-red mb-2 opacity-80 dark:opacity-50 group-hover:opacity-100 transition-opacity">
                    <item.icon size={20} />
                  </div>
                  <div className="font-display text-2xl font-bold text-slate-900 dark:text-white">{item.title}</div>
                  <div className="font-mono text-[10px] text-slate-500 dark:text-gray-500 tracking-widest uppercase">{item.desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content - Character/Profile Display */}
          <div className="flex-1 w-full lg:w-1/2 flex justify-center lg:justify-end relative">
            <div className="relative w-full max-w-2xl aspect-square">
              {/* Decorative Frame */}
              <div className="absolute inset-0 border-2 border-slate-200 dark:border-white/10 clip-path-slant-right" />
              <div className="absolute -inset-4 border border-sky-200 dark:border-valorant-red/20 clip-path-slant-left opacity-50" />
              
              {/* Main Image Container */}
              <div className="absolute inset-2 bg-slate-100 dark:bg-valorant-dark clip-path-slant-right overflow-hidden group shadow-2xl dark:shadow-none">
                <img 
                  src={ProfileImage} 
                  alt="Profile" 
                  className="w-full h-full object-cover transition-all duration-500 scale-100 group-hover:scale-110" 
                />
                
                {/* Overlay UI Details */}
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-white/10 dark:from-black/90 to-transparent">

                  <div className="font-display text-4xl text-slate-900 dark:text-white uppercase tracking-wider">Duc.DEV</div>
                  <div className="flex items-center space-x-2 text-sky-600 dark:text-valorant-red font-mono text-sm">
                    <span className="pulse-dot w-2 h-2 bg-sky-600 dark:bg-valorant-red rounded-full animate-pulse" />
                    <span>ONLINE</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50 animate-bounce text-sky-600 dark:text-white">
        <span className="font-mono text-[10px] uppercase tracking-widest">Scroll</span>
        <ChevronDown size={20} />
      </div>
    </section>
  );
};

export default HeroAbout;