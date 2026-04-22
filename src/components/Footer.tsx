import ScrollReveal from './ScrollReveal';
import { Github, Linkedin, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full py-16 border-t border-subtle">
      <div className="max-w-5xl mx-auto px-6 flex flex-col items-center text-center">
        <ScrollReveal
           className="space-y-8 w-full"
        >
          <div className="space-y-4">
            <h2 className="text-3xl md:text-5xl font-medium tracking-tight">Let's build something data-driven.</h2>
            <p className="text-muted text-lg max-w-md mx-auto">
              Currently open for new opportunities and interesting projects.
            </p>
          </div>

          <a 
            href="mailto:hello@example.com" 
            className="inline-block bg-[var(--text-primary)] text-[var(--bg-color)] px-8 py-4 rounded-full font-medium text-lg hover:scale-105 transition-transform"
          >
            Say Hello
          </a>

          <div className="flex justify-center space-x-6 pt-12">
            <a href="#" className="p-3 text-muted hover:text-[var(--text-primary)] hover:bg-[var(--text-secondary)]/10 rounded-full transition-colors">
              <Github className="w-6 h-6" />
            </a>
            <a href="#" className="p-3 text-muted hover:text-[var(--text-primary)] hover:bg-[var(--text-secondary)]/10 rounded-full transition-colors">
              <Linkedin className="w-6 h-6" />
            </a>
            <a href="mailto:hello@example.com" className="p-3 text-muted hover:text-[var(--text-primary)] hover:bg-[var(--text-secondary)]/10 rounded-full transition-colors">
              <Mail className="w-6 h-6" />
            </a>
          </div>

          <div className="font-mono text-xs text-muted pt-8 opacity-60">
            &copy; {new Date().getFullYear()} Mikael Andrew. All rights reserved.
          </div>
        </ScrollReveal>
      </div>
    </footer>
  );
}
