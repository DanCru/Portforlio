import { Heart, ArrowUp, ShieldCheck, Terminal, Globe } from 'lucide-react';
import Logo from '../image/Logo.png';

const Footer = () => {

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-valorant-black relative pt-20 pb-10 overflow-hidden">
      {/* Decorative Lines */}
      <div className="absolute top-0 left-0 w-full h-px bg-white/10" />
      <div className="absolute top-0 left-20 w-40 h-1 bg-valorant-red" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Column */}
          <div className="col-span-1 md:col-span-2 space-y-6">
            <div className="flex items-center gap-4">
              <img src={Logo} alt="Logo" className="w-16 h-16 rounded-full border-2 border-white/20" />
              <div>
                <h3 className="font-display text-3xl font-bold text-white uppercase tracking-wider">ĐỨC.DEV</h3>
                <span className="font-mono text-xs text-valorant-red uppercase tracking-widest">// Frontend Operator</span>
              </div>
            </div>
            <p className="text-gray-400 max-w-md font-sans">
              Building tactical web solutions with precision and style. 
              Ready to deploy on your next mission.
            </p>
            <div className="flex gap-4">
                {['Github', 'LinkedIn', 'Twitter'].map((social) => (
                    <button key={social} className="px-4 py-2 border border-white/20 text-xs font-mono uppercase text-gray-300 hover:bg-white hover:text-black transition-colors">
                        {social}
                    </button>
                ))}
            </div>
          </div>

          {/* Links Column */}
          <div className="space-y-6">
            <h4 className="font-display text-xl font-bold text-white uppercase">Coordinates</h4>
            <ul className="space-y-2 font-mono text-sm text-gray-400">
                {['Home', 'Experience', 'Mission Log', 'Contact'].map((item) => (
                    <li key={item}>
                        <a href="#" className="hover:text-valorant-red transition-colors flex items-center gap-2">
                            <span className="w-1 h-1 bg-white/50" /> {item}
                        </a>
                    </li>
                ))}
            </ul>
          </div>

          {/* Status Column */}
          <div className="space-y-6">
            <h4 className="font-display text-xl font-bold text-white uppercase">System Status</h4>
            <div className="space-y-4">
                <div className="flex items-center gap-3 text-gray-400">
                    <ShieldCheck size={20} className="text-valorant-red" />
                    <span className="font-mono text-xs uppercase">Security Protocol: Active</span>
                </div>
                <div className="flex items-center gap-3 text-gray-400">
                    <Terminal size={20} className="text-valorant-red" />
                    <span className="font-mono text-xs uppercase">Compiling Assets...</span>
                </div>
                 <div className="flex items-center gap-3 text-gray-400">
                    <Globe size={20} className="text-valorant-red" />
                    <span className="font-mono text-xs uppercase">Region: VN/SEA</span>
                </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="font-mono text-xs text-gray-500 uppercase tracking-wider">
            © 2026 Duc.DEV // All systems nominal
          </div>
          
          <button
            onClick={scrollToTop}
            className="group flex items-center gap-2 font-bold uppercase tracking-widest text-white hover:text-valorant-red transition-colors"
          >
            Return to Base <ArrowUp size={20} className="group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;