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
        <div className="min-h-screen transition-colors duration-300 bg-gray-50 text-slate-900 dark:bg-valorant-black dark:text-valorant-white font-sans selection:bg-valorant-red selection:text-white overflow-x-hidden">
          <div className="fixed inset-0 pointer-events-none opacity-30 dark:opacity-100 bg-[radial-gradient(circle_at_50%_50%,rgba(255,70,85,0.05),transparent_70%)]" />
          {/* Light Mode Grid */}
          <div className="fixed inset-0 pointer-events-none opacity-40 dark:opacity-20 bg-grid-pattern" />
          
          <Header />
            <main>
              <HeroAbout />
              <Experience />
              <Skills />
              <Education />
              <Projects />
              <Contact />
            </main>
          <Footer />
          <BackToTop />
        </div>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;