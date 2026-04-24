import { useState, useEffect } from 'react';
import { Moon, Sun, MessageSquare, Box } from 'lucide-react';
import { useTheme } from './ThemeProvider';
import { Link, useLocation } from 'react-router-dom';
import { useContact } from '../context/ContactContext';
import { PERSONAL_INFO } from '../constants';

const navLinks = [
  { name: 'About', href: '/#about' },
  { name: 'Experience', href: '/#experience' },
  { name: 'Designs', href: '/#projects' },
  { name: 'Tech', href: '/#tech-stack' },
  { name: 'Web Portfolio', href: '/freelance' }
];

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [activeSection, setActiveSection] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      
      if (location.pathname !== '/') {
        setActiveSection('freelance');
        return;
      }

      const sections = navLinks.map(link => link.href.split('#')[1]).filter(Boolean);
      let current = '';

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.4 && rect.bottom >= window.innerHeight * 0.2) {
            current = section;
          }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-in-out px-4 py-4 md:px-8 ${
      scrolled ? 'pt-4' : 'pt-8'
    }`}>
      <div className={`max-w-5xl mx-auto flex items-center justify-between transition-all duration-500 px-6 py-2 rounded-full ${
        scrolled 
          ? 'bg-[var(--bg-color)]/80 backdrop-blur-xl border border-[var(--text-secondary)]/30 shadow-[0_8px_32px_rgba(0,0,0,0.12)]' 
          : 'bg-transparent border border-transparent'
      }`}>
        <Link 
          to="/" 
          onClick={() => { 
            if (location.pathname === '/') window.scrollTo({ top: 0, behavior: 'smooth' }); 
          }} 
          className="flex items-center group"
          aria-label="Home"
        >
          <div className="w-9 h-9 relative flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
            <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
              <path d="M24 2.5L43.4853 13.75V36.25L24 47.5L4.51472 36.25V13.75L24 2.5Z" stroke="currentColor" strokeWidth="2.5" className="text-[var(--text-primary)] opacity-20"/>
              <circle cx="24" cy="14" r="5" className="fill-[var(--accent)] opacity-30 blur-sm" />
              <path d="M14 34V18L24 26L34 18V34" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--text-primary)] transition-colors duration-300 group-hover:text-[var(--accent)]" />
              <path d="M18 28H30" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" className="text-[var(--accent)]" />
              <circle cx="24" cy="14" r="3.5" className="fill-[var(--accent)]" />
            </svg>
          </div>
        </Link>
        
        <div className="hidden md:flex items-center space-x-1 p-1">
          {navLinks.map((link) => {
            const isFreelance = link.href === '/freelance';
            const isActive = isFreelance 
              ? location.pathname === '/freelance'
              : location.pathname === '/' && activeSection === link.href.split('#')[1];

            const Content = () => (
              <>
                {link.name}
                {isFreelance && (
                  <span className="ml-2 text-[10px] font-bold bg-[var(--accent)] text-black px-1.5 py-0.5 rounded leading-none shrink-0">3D</span>
                )}
              </>
            );

            const baseClass = `relative px-4 py-2 rounded-full text-xs font-semibold tracking-widest uppercase transition-all duration-300 flex items-center border ${
              isActive 
                ? 'text-[var(--accent)] bg-[var(--accent)]/10 border-[var(--accent)]/30' 
                : 'text-muted border-transparent hover:text-[var(--text-primary)] hover:bg-[var(--text-secondary)]/10 hover:border-[var(--text-secondary)]/20'
            }`;

            return isFreelance ? (
              <Link key={link.name} to={link.href} className={baseClass}><Content/></Link>
            ) : (
              <a key={link.name} href={link.href} className={baseClass}><Content/></a>
            );
          })}
        </div>

        <div className="flex items-center">
          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-full hover:bg-[var(--text-secondary)]/10 transition-all active:scale-95 text-[var(--text-primary)]"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>
      </div>
    </nav>
  );
}
