import { useState, useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from './ThemeProvider';

const navLinks = [
  { name: 'About', href: '#about' },
  { name: 'Experience', href: '#experience' },
  { name: 'Designs', href: '#projects' },
  { name: 'Tech', href: '#tech-stack' },
];

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      const sections = navLinks.map(link => link.href.substring(1));
      let current = '';

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          // Active when the top is above 40% of the screen and the bottom is below 0 
          // (meaning it hasn't completely scrolled off the top)
          if (rect.top <= window.innerHeight * 0.4 && rect.bottom >= window.innerHeight * 0.2) {
            current = section;
          }
        }
      }

      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Run initially to set the active section on load
    const timeout = setTimeout(handleScroll, 100);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 nav-blur border-b border-subtle">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <a 
          href="#" 
          onClick={(e) => { 
            e.preventDefault(); 
            window.scrollTo({ top: 0, behavior: 'smooth' }); 
          }} 
          className="flex items-center group"
          aria-label="Home"
        >
          {/* Custom SVG Monogram Logo */}
          <div className="w-10 h-10 relative flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
            <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
              {/* Data Hexagon Outline */}
              <path d="M24 2.5L43.4853 13.75V36.25L24 47.5L4.51472 36.25V13.75L24 2.5Z" stroke="currentColor" strokeWidth="2.5" className="text-[var(--text-primary)] opacity-20"/>
              {/* Outer Glow for the node */}
              <circle cx="24" cy="14" r="5" className="fill-[var(--accent)] opacity-30 blur-sm" />
              {/* Letter M / Node connections */}
              <path d="M14 34V18L24 26L34 18V34" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--text-primary)] transition-colors duration-300 group-hover:text-[var(--accent)]" />
              {/* Letter A horizontal crossbar */}
              <path d="M18 28H30" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" className="text-[var(--accent)]" />
              {/* Top Accent Node */}
              <circle cx="24" cy="14" r="3.5" className="fill-[var(--accent)]" />
            </svg>
          </div>
        </a>
        
        <div className="hidden md:flex items-center space-x-8 text-sm font-medium">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.substring(1);
            return (
              <a 
                key={link.name}
                href={link.href} 
                className={`relative transition-colors duration-300 px-3 py-2 rounded-md group ${
                  isActive 
                    ? 'text-[var(--accent)] bg-[var(--accent)]/10' 
                    : 'text-muted hover:text-[var(--accent)] hover:bg-[var(--accent)]/5'
                }`}
              >
                {link.name}
                {/* Active/Hover Indicator Line */}
                <span 
                  className={`absolute -bottom-1 left-0 w-full h-0.5 bg-[var(--accent)] rounded-full transition-all duration-300 origin-left ${
                    isActive ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0 group-hover:opacity-100 group-hover:scale-x-100'
                  }`}
                />
              </a>
            );
          })}
        </div>

        <button
          onClick={toggleTheme}
          className="p-2 rounded-full hover:bg-[var(--text-secondary)]/10 transition-colors"
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>
    </nav>
  );
}
