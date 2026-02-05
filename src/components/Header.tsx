import { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon, Globe } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import Logo from '../image/Logo.png';

const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const { language, toggleLanguage, t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      const sections = ['home', 'experience', 'skills', 'education', 'projects', 'contact'];
      const scrollPosition = window.scrollY + 100;
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  const menuItems = [
    { id: 'home', label: t('nav.home') },
    { id: 'experience', label: t('nav.experience') },
    { id: 'skills', label: t('nav.skills') },
    { id: 'education', label: t('nav.education') },
    { id: 'projects', label: t('nav.projects') },
    { id: 'contact', label: t('nav.contact') },
  ];

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 border-b border-white/10 ${
      isScrolled 
        ? 'bg-valorant-black/90 backdrop-blur-md py-2' 
        : 'bg-transparent py-4'
    }`}>
      <nav className="container mx-auto px-6">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center group cursor-pointer">
            <div className="relative">
              <div className="absolute -inset-1 bg-valorant-red rounded-full opacity-75 group-hover:opacity-100 blur transition duration-200"></div>
              <img 
                src={Logo} 
                alt="Đức.Dev Logo" 
                className="relative h-12 w-12 rounded-full border-2 border-valorant-white"
              />
            </div>
            <div className="ml-3 flex flex-col">
              <span className="font-display text-2xl font-bold tracking-wider text-white uppercase leading-none">
                ĐỨC<span className="text-valorant-red">.DEV</span>
              </span>
              <span className="text-[10px] uppercase tracking-[0.2em] text-gray-400">System Online</span>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-1">
            <ul className="flex space-x-1">
              {menuItems.map((item) => (
                <li key={item.id} className="relative group">
                  <button
                    onClick={() => scrollToSection(item.id)}
                    className={`font-display uppercase tracking-widest text-sm px-4 py-2 relative overflow-hidden transition-all duration-200 ${
                      activeSection === item.id 
                        ? 'text-valorant-black bg-valorant-white clip-path-slant-left' 
                        : 'text-gray-400 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {item.label}
                    {/* Corner accents */}
                    <span className="absolute top-0 right-0 w-1 h-1 bg-valorant-red opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span className="absolute bottom-0 left-0 w-1 h-1 bg-valorant-red opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                </li>
              ))}
            </ul>

            <div className="h-6 w-px bg-white/20 mx-4" />

            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="p-2 text-gray-400 hover:text-white transition-colors font-mono text-xs border border-transparent hover:border-white/20 rounded"
            >
              {language.toUpperCase()}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white hover:text-valorant-red transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <div className="space-y-1.5">
              <span className="block w-8 h-0.5 bg-current"></span>
              <span className="block w-6 h-0.5 bg-current ml-auto"></span>
              <span className="block w-4 h-0.5 bg-current ml-auto"></span>
            </div>}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-valorant-black border-b border-white/10 backdrop-blur-md">
            <ul className="flex flex-col p-4 space-y-2">
              {menuItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => scrollToSection(item.id)}
                    className={`block w-full text-left px-4 py-3 font-display uppercase tracking-wider transition-colors border-l-2 ${
                      activeSection === item.id 
                        ? 'text-valorant-red border-valorant-red bg-white/5' 
                        : 'text-gray-400 border-transparent hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;