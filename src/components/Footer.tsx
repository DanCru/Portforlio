import { ArrowUp, ShieldCheck, Terminal, Globe } from 'lucide-react';
import Logo from '../image/Logo.png';

const Footer = () => {

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-200 dark:bg-valorant-black relative pt-20 pb-10 overflow-hidden text-slate-900 dark:text-white transition-colors duration-300">
      {/* Decorative Lines */}
      <div className="absolute top-0 left-0 w-full h-px bg-slate-300 dark:bg-white/10" />
      <div className="absolute top-0 left-20 w-40 h-1 bg-sky-500 dark:bg-valorant-red" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Column */}
          <div className="col-span-1 md:col-span-2 space-y-6">
            <div className="flex items-center gap-4">
              <img src={Logo} alt="Logo" className="w-16 h-16 rounded-full border-2 border-slate-300 dark:border-white/20" />
              <div>
                <h3 className="font-display text-3xl font-bold text-slate-900 dark:text-white uppercase tracking-wider">ĐỨC.DEV</h3>
                <span className="font-mono text-xs text-sky-600 dark:text-valorant-red uppercase tracking-widest">// Frontend Developer</span>
              </div>
            </div>
            <p className="text-slate-600 dark:text-gray-400 max-w-md font-sans">
              Building intuitive, scalable, and engaging web solutions. 
              Always ready for the next challenge.
            </p>
            <div className="flex gap-4">
                {['Github', 'LinkedIn', 'Twitter'].map((social) => (
                    <button key={social} className="px-4 py-2 border border-slate-300 dark:border-white/20 text-xs font-mono uppercase text-slate-600 dark:text-gray-300 hover:bg-slate-900 dark:hover:bg-white hover:text-white dark:hover:text-slate-900 transition-colors">
                        {social}
                    </button>
                ))}
            </div>
          </div>

          {/* Links Column */}
          <div className="space-y-6">
            <h4 className="font-display text-xl font-bold text-slate-900 dark:text-white uppercase">Navigate</h4>
            <ul className="space-y-2 font-mono text-sm text-slate-600 dark:text-gray-400">
                {['Home', 'Experience', 'Projects', 'Contact'].map((item) => (
                    <li key={item}>
                        <a href={`#${item.toLowerCase()}`} className="hover:text-sky-600 dark:hover:text-valorant-red transition-colors flex items-center gap-2">
                            <span className="w-1 h-1 bg-slate-400 dark:bg-white/50" /> {item}
                        </a>
                    </li>
                ))}
            </ul>
          </div>

          {/* Status Column */}
          <div className="space-y-6">
            <h4 className="font-display text-xl font-bold text-slate-900 dark:text-white uppercase">Status</h4>
            <div className="space-y-4">
                <div className="flex items-center gap-3 text-slate-600 dark:text-gray-400">
                    <ShieldCheck size={20} className="text-sky-600 dark:text-valorant-red" />
                    <span className="font-mono text-xs uppercase">Open for Work</span>
                </div>
                <div className="flex items-center gap-3 text-slate-600 dark:text-gray-400">
                    <Terminal size={20} className="text-sky-600 dark:text-valorant-red" />
                    <span className="font-mono text-xs uppercase">Building Solutions</span>
                </div>
                 <div className="flex items-center gap-3 text-slate-600 dark:text-gray-400">
                    <Globe size={20} className="text-sky-600 dark:text-valorant-red" />
                    <span className="font-mono text-xs uppercase">Based in Vietnam</span>
                </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-300 dark:border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="font-mono text-xs text-slate-500 dark:text-gray-500 uppercase tracking-wider">
            © 2026 Duc.DEV // All Rights Reserved
          </div>
          
          <button
            onClick={scrollToTop}
            className="group flex items-center gap-2 font-bold uppercase tracking-widest text-slate-900 dark:text-white hover:text-sky-600 dark:hover:text-valorant-red transition-colors"
          >
            Back to Top <ArrowUp size={20} className="group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;