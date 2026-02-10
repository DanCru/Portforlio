import Header from '../components/Header';
import HeroAbout from '../components/HeroAbout';
import Experience from '../components/Experience';
import Skills from '../components/Skills';
import Education from '../components/Education';
import Projects from '../components/Projects';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import BackToTop from '../components/BackToTop';

const Home = () => {
  return (
    <>
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
    </>
  );
};

export default Home;
