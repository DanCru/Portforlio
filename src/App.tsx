import { ThemeProvider } from './contexts/ThemeContext';
import { LanguageProvider } from './contexts/LanguageContext';
import Header from './components/Header';
import HeroAbout from './components/HeroAbout';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Education from './components/Education';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <div className="min-h-screen bg-valorant-black bg-grid text-valorant-white font-sans selection:bg-valorant-red selection:text-white overflow-x-hidden">
          <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_50%,rgba(255,70,85,0.05),transparent_70%)]" />
          <Header />
          <HeroAbout />
          <Experience />
          <Skills />
          <Education />
          <Projects />
          <Contact />
          <Footer />
          <BackToTop />
        </div>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;