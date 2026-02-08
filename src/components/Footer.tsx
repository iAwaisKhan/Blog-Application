import { Link } from "react-router-dom";
import { useTheme } from "./theme-provider";

const Footer = () => {
  const { isNightMode } = useTheme();
  const footerLinks = [
    { label: 'Journal', path: '/journal' },
    { label: 'Studio', path: '/studio' },
    { label: 'Library', path: '/curation' },
    { label: 'Privacy', path: '/privacy' }
  ];

  return (
    <footer className={`py-12 px-8 border-t transition-colors duration-700 mt-20 ${
      isNightMode ? 'bg-[#0a0a0a] border-white/5' : 'bg-white border-gray-50'
    }`}>
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex flex-col gap-2">
          <h3 className={`font-serif font-bold tracking-[0.4em] uppercase text-xs transition-colors ${
            isNightMode ? 'text-white' : 'text-[#1a1a1a]'
          }`}>FARE</h3>
          <p className="text-[9px] tracking-[0.2em] text-gray-400 uppercase italic">Est. 2026</p>
        </div>

        <nav className="flex items-center gap-12">
          {footerLinks.map((item) => (
            <Link 
              key={item.label}
              to={item.path}
              className={`text-[9px] font-bold tracking-[0.3em] uppercase transition-colors ${
                isNightMode ? 'text-gray-500 hover:text-white' : 'text-gray-400 hover:text-[#1a1a1a]'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className={`text-[8px] tracking-[0.3em] uppercase transition-colors ${
          isNightMode ? 'text-gray-700' : 'text-gray-300'
        }`}>
           FARE — CURATING THE FUTURE
        </div>
      </div>
    </footer>
  );
};

export default Footer;
