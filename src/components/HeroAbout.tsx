import React from 'react';
import { ChevronDown, Code, Cpu, Database, Award, Target, Users, Briefcase, Download, Mail } from 'lucide-react';
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
    { icon: Briefcase, title: '2+ Years', desc: 'Học tập & Làm việc thực tế' },
    { icon: Users, title: '10+ Projects', desc: 'Đã hoàn thành' },
    { icon: Award, title: 'Sinh viên IT', desc: 'Đang phát triển' },
    { icon: Target, title: '100%', desc: 'Đam mê & Nỗ lực' },
  ];

  return (
    <section id="home" className="relative">
      {/* Hero Section */}
      <div className="min-h-screen flex flex-col justify-center relative bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 dark:from-gray-900 dark:via-slate-900 dark:to-black overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 animate-pulse opacity-15">
            <Code size={50} className="text-sky-400" />
          </div>
          <div className="absolute top-60 right-16 animate-pulse delay-1000 opacity-15">
            <Cpu size={45} className="text-blue-400" />
          </div>
          <div className="absolute bottom-24 left-24 animate-pulse delay-2000 opacity-15">
            <Database size={55} className="text-indigo-400" />
          </div>
          <div className="absolute bottom-16 right-10 animate-pulse delay-3000 opacity-15">
            <Code size={48} className="text-cyan-400" />
          </div>
        </div>

        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='1.5'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          ></div>
        </div>

        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between z-10 py-12">
          {/* Left Content */}
          <div className="flex-1 text-center md:text-left animate-fade-in-up">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4 leading-tight">
              {t('hero.title').split(' ').map((word, index) => (
                <span key={index} className={index === 0 || index === 1 ? 'text-sky-400' : ''}>
                  {word}{' '}
                </span>
              ))}
            </h1>
            <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl leading-relaxed">
              {t('hero.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-4 mb-8">
              <button
                onClick={scrollToExperience}
                className="bg-sky-500 hover:bg-sky-600 text-white px-6 py-3 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                {t('hero.cta1')}
              </button>
              <button
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="border-2 border-white text-white hover:bg-white hover:text-slate-900 px-6 py-3 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105"
              >
                {t('hero.cta2')}
              </button>
            </div>
            <div className="flex justify-center md:justify-start gap-4">
              <button className="bg-white/10 hover:bg-white/20 text-white p-3 rounded-full transition-all duration-300">
                <Download size={20} />
              </button>
              <button className="bg-white/10 hover:bg-white/20 text-white p-3 rounded-full transition-all duration-300">
                <Mail size={20} />
              </button>
            </div>
          </div>

          {/* Right Profile Image */}
          <div className="mt-12 md:mt-0 md:flex-1 flex justify-center">
            <div className="relative w-64 h-64 md:w-80 md:h-80">
              <div className="absolute inset-0 bg-gradient-to-br from-sky-400 to-blue-600 rounded-full p-2 transform hover:scale-105 transition-transform duration-300">
                <div className="w-full h-full bg-gray-300 dark:bg-gray-700 rounded-full flex items-center justify-center text-6xl text-gray-600 dark:text-gray-400">
                  <img
                    src={ProfileImage}
                    alt="Profile portrait"
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
              </div>
              <div className="absolute -top-4 -right-4 w-16 h-16 bg-sky-500 rounded-full flex items-center justify-center shadow-lg animate-pulse">
                <Award className="text-white" size={28} />
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <button
          onClick={scrollToExperience}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce"
        >
          <ChevronDown size={32} className="text-white hover:text-sky-400 transition-colors" />
        </button>
      </div>

      {/* About Section */}
      <div className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
              {t('about.title')}
            </h2>
            <div className="w-24 h-1 bg-sky-500 mx-auto mb-6"></div>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              {t('about.description1')}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            {/* Left: About Details */}
            <div className="space-y-4 md:space-y-6">
              <h3 className="text-3xl font-bold text-slate-900 dark:text-white">
                {t('about.name')}
              </h3>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                {t('about.description2')}
              </p>
              <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-lg">
                <h4 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">
                  {t('about.goal.title')}
                </h4>
                <p className="text-gray-600 dark:text-gray-300">
                  {t('about.goal.description')}
                </p>
              </div>
            </div>

            {/* Right: Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
              {highlights.map((item, index) => (
                <div
                  key={index}
                  className="p-4 md:p-6 bg-white dark:bg-gray-700 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 text-center"
                >
                  <div className="bg-sky-500 w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                    <item.icon className="text-white" size={20} />
                  </div>
                  <h3 className="text-base md:text-lg font-bold text-slate-900 dark:text-white mb-1 md:mb-2">{item.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-xs md:text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroAbout;