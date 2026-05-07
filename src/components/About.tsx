import ScrollReveal from './ScrollReveal';
import { Database, Layout, ArrowRight } from 'lucide-react';

export default function About() {
  return (
    <section id="about" className="py-32 w-full bg-white/40 dark:bg-transparent transition-colors duration-500">
      <div className="max-w-5xl mx-auto px-6">
        <ScrollReveal className="space-y-16">
          <div className="space-y-4">
            <h2 className="font-mono text-[var(--accent)] tracking-wider text-sm font-semibold uppercase">01. About</h2>
            <p className="text-3xl md:text-5xl font-medium tracking-tight leading-tight max-w-4xl">
              Bridging the gap between heavy logic and beautiful aesthetics.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-8 border-t border-subtle">
            <div className="space-y-6">
              <div className="w-14 h-14 rounded-2xl border border-[var(--border)] bg-[var(--bg-alt)]/50 flex items-center justify-center relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent)]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <Database className="w-6 h-6 text-[var(--accent)] relative z-10" />
              </div>
              <div>
                <h3 className="font-mono text-sm uppercase tracking-widest text-muted mb-3">The Day Job</h3>
                <p className="text-lg leading-relaxed text-muted">
                  By day, I thrive in the unseen complexity of enterprise data architecture. I build scalable pipelines, design efficient data-warehouses, and transform fragmented data into a structured single source of truth.
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="w-14 h-14 rounded-2xl border border-[var(--border)] bg-[var(--bg-alt)]/50 flex items-center justify-center relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent)]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <Layout className="w-6 h-6 text-[var(--accent)] relative z-10" />
              </div>
              <div>
                <h3 className="font-mono text-sm uppercase tracking-widest text-muted mb-3">The Night Job</h3>
                <p className="text-lg leading-relaxed text-muted">
                  By night, I craft responsive, premium, and meaningful company profiles and web experiences. I believe logic is useless if it cannot be understood, so I use modern frameworks and 3D elements to bring ideas to life.
                </p>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
