import ScrollReveal from './ScrollReveal';
import { Database, Layout, ArrowRight } from 'lucide-react';

export default function About() {
  return (
    <section id="about" className="py-32 w-full">
      <div className="max-w-5xl mx-auto px-6">
        <ScrollReveal className="space-y-16">
          <div className="space-y-4">
            <h2 className="font-mono text-[var(--accent)] tracking-wider text-sm font-semibold uppercase">01. About</h2>
            <p className="text-3xl md:text-5xl font-medium tracking-tight leading-tight max-w-4xl">
              Bridging the gap between heavy data logic and beautiful user interfaces.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-8 border-t border-subtle">
            <div className="space-y-6">
              <div className="w-14 h-14 rounded-2xl border border-[var(--border)] bg-[var(--bg-alt)]/50 flex items-center justify-center relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent)]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <Database className="w-6 h-6 text-[var(--accent)] relative z-10" />
              </div>
              <div>
                <h3 className="font-mono text-sm uppercase tracking-widest text-muted mb-3">The Backend</h3>
                <p className="text-lg leading-relaxed text-muted">
                  As a data engineer, I thrive in the unseen complexity. I build scalable data pipelines, design efficient data-warehouses, and transform fragmented data into a structured single source of truth.
                </p>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="w-14 h-14 rounded-2xl border border-[var(--border)] bg-[var(--bg-alt)]/50 flex items-center justify-center relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent)]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <Layout className="w-6 h-6 text-[var(--accent)] relative z-10" />
              </div>
              <div>
                <h3 className="font-mono text-sm uppercase tracking-widest text-muted mb-3">The Frontend</h3>
                <p className="text-lg leading-relaxed text-muted">
                  As a web developer, I believe data is useless if it cannot be understood. I craft responsive, premium, and meaningful interfaces that allow users to interact with complex insights effortlessly.
                </p>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
