import ScrollReveal from './ScrollReveal';
import { Github, Linkedin, Mail } from 'lucide-react';
import { SOCIAL_LINKS, PERSONAL_INFO } from '../constants';

interface FooterProps {
  onContactClick?: () => void;
}

export default function Footer({ onContactClick }: FooterProps) {
  return (
    <footer className="w-full py-16 border-t border-subtle">
      <div className="max-w-5xl mx-auto px-6 flex flex-col items-center text-center">
        <ScrollReveal
           className="space-y-8 w-full"
        >
          <div className="space-y-4">
            <h2 className="text-3xl md:text-5xl font-medium tracking-tight">Let's build something data-driven.</h2>
          </div>

          {onContactClick ? (
            <button 
              onClick={onContactClick}
              className="inline-block bg-[var(--text-primary)] text-[var(--bg-color)] px-8 py-4 rounded-full font-medium text-lg hover:scale-105 transition-transform"
            >
              Say Hello
            </button>
          ) : (
            <a 
              href={`mailto:${SOCIAL_LINKS.email}`} 
              className="inline-block bg-[var(--text-primary)] text-[var(--bg-color)] px-8 py-4 rounded-full font-medium text-lg hover:scale-105 transition-transform"
            >
              Say Hello
            </a>
          )}

          <div className="flex justify-center space-x-6 pt-12">
            <a 
              href={SOCIAL_LINKS.github} 
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 text-muted hover:text-[var(--text-primary)] hover:bg-[var(--text-secondary)]/10 rounded-full transition-colors"
            >
              <Github className="w-6 h-6" />
            </a>
            <a 
              href={SOCIAL_LINKS.linkedin} 
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 text-muted hover:text-[var(--text-primary)] hover:bg-[var(--text-secondary)]/10 rounded-full transition-colors"
            >
              <Linkedin className="w-6 h-6" />
            </a>
            <a 
              href={`mailto:${SOCIAL_LINKS.email}`} 
              className="p-3 text-muted hover:text-[var(--text-primary)] hover:bg-[var(--text-secondary)]/10 rounded-full transition-colors"
            >
              <Mail className="w-6 h-6" />
            </a>
          </div>

          <div className="font-mono text-xs text-muted pt-8 opacity-60">
            &copy; {new Date().getFullYear()} {PERSONAL_INFO.fullName}. All rights reserved.
          </div>
        </ScrollReveal>
      </div>
    </footer>
  );
}
