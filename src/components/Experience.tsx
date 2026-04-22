import ScrollReveal from './ScrollReveal';
import { motion, useScroll, useSpring } from 'motion/react';
import { useRef } from 'react';

const experiences = [
  {
    id: 1,
    role: "System Expert (Data Engineer & BI Developer)",
    company: "SKINTIFIC",
    period: "Mar 2025 — Present",
    location: "Jakarta, Indonesia"
  },
  {
    id: 2,
    role: "Sales Data Analyst",
    company: "Artaboga Cemerlang (OT Group)",
    period: "Jul 2024 — Mar 2025",
    location: "Jakarta, Indonesia"
  },
  {
    id: 3,
    role: "Data Science / IT Intern",
    company: "Cycle & Carriage",
    period: "Jan 2024 — Jun 2024",
    location: "Kuala Lumpur, Malaysia"
  }
];

export default function Experience() {
  return (
    <section id="experience" className="py-24 w-full border-y border-subtle bg-[var(--bg-alt)]/20">
      <div className="max-w-5xl mx-auto px-6">
        <ScrollReveal className="pb-12">
          <h2 className="font-mono text-[var(--accent)] font-semibold uppercase tracking-widest mb-2 text-xs">02. Career History</h2>
          <p className="text-3xl font-medium tracking-tight">Professional Timeline</p>
        </ScrollReveal>

        <div className="space-y-8">
          {experiences.map((exp) => (
            <ScrollReveal key={exp.id}>
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-center p-6 rounded-2xl hover:bg-[var(--bg-alt)]/50 transition-colors group">
                <div className="md:col-span-3">
                  <span className="font-mono text-sm text-muted">{exp.period}</span>
                </div>
                <div className="md:col-span-4">
                  <h3 className="text-xl font-bold tracking-tight group-hover:text-[var(--accent)] transition-colors">{exp.role}</h3>
                </div>
                <div className="md:col-span-3">
                  <div className="font-medium text-[var(--text-secondary)]">{exp.company}</div>
                </div>
                <div className="md:col-span-2 md:text-right">
                  <span className="text-xs text-muted uppercase tracking-wider">{exp.location}</span>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
