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
      
      // Scroll spy logic
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
    <header className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-lg' 
        : 'bg-transparent'
    }`}>
      <nav className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center">
            <img 
              src={Logo} 
              alt="Đức.Dev Logo" 
              className="h-10 w-10 rounded-full mr-2"
            />
            <span className={`text-xl font-bold transition-colors duration-300 ${isScrolled ? 'text-blue-900 dark:text-white' : 'text-white'}`}>
              Đức<span className="text-sky-400">.</span>Dev
            </span>
          </div>

          <div className="flex items-center space-x-4">
            {/* Desktop Menu */}
            <ul className="hidden md:flex space-x-6 lg:space-x-8">
              {menuItems.map((item) => (
                <li key={item.id} className="relative">
                  <button
                    onClick={() => scrollToSection(item.id)}
                    className={`transition-colors duration-300 hover:text-sky-500 pb-1 ${
                      isScrolled 
                        ? 'text-gray-700 dark:text-gray-300' 
                        : 'text-white'
                    } ${activeSection === item.id ? 'text-sky-500 dark:text-sky-400' : ''}`}
                  >
                    {item.label}
                  </button>
                  {/* Active indicator */}
                  <span 
                    className={`absolute bottom-0 left-0 h-0.5 bg-sky-500 transition-all duration-300 ${
                      activeSection === item.id ? 'w-full' : 'w-0'
                    }`}
                  />
                </li>
              ))}
            </ul>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg transition-colors duration-300 ${
                isScrolled 
                  ? 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800' 
                  : 'text-white hover:bg-white/10'
              }`}
            >
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>

            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className={`p-2 rounded-lg transition-colors duration-300 flex items-center space-x-1 ${
                isScrolled 
                  ? 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800' 
                  : 'text-white hover:bg-white/10'
              }`}
            >
              <Globe size={16} />
              <span className="text-sm font-medium">{language.toUpperCase()}</span>
            </button>

            {/* Mobile Menu Button */}
            <button
              className={`md:hidden transition-colors duration-300 ${
                isScrolled 
                  ? 'text-gray-700 dark:text-gray-300' 
                  : 'text-white'
              }`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-lg">
            <ul className="py-4 space-y-2">
              {menuItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => scrollToSection(item.id)}
                    className="block w-full text-left px-6 py-2 text-gray-700 dark:text-gray-300 hover:text-sky-500 transition-colors"
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