import { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      // Show button when page is scrolled down 400px
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-6 right-6 z-50 p-4 bg-valorant-red text-white shadow-lg transition-all duration-300 transform border border-white/20 clip-path-slant-left hover:bg-white hover:text-valorant-red group ${
        isVisible 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-10 pointer-events-none'
      }`}
      aria-label="Kéo lên đầu trang"
      title="Return to Base"
    >
      <ArrowUp size={24} className="group-hover:-translate-y-1 transition-transform" />
    </button>
  );
};

export default BackToTop;
