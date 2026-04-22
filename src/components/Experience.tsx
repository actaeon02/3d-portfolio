import ScrollReveal from './ScrollReveal';
import { motion, useScroll, useSpring } from 'motion/react';
import { useRef } from 'react';

const experiences = [
  {
    id: 1,
    role: "Data Engineer",
    company: "APRIL",
    period: "Jan 2026 — Present",
    location: "Riau, Indonesia",
    skills: ["Databricks", "Delta Lake", "API", "Python", "PostgreSQL"]
  },
  {
    id: 2,
    role: "System Expert (Data Engineer & BI Developer)",
    company: "SKINTIFIC",
    period: "Mar 2025 — Jan 2026",
    location: "Jakarta, Indonesia",
    skills: ["BigQuery", "Airflow", "Python", "SQL", "Docker"]
  },
  {
    id: 3,
    role: "Sales Data Analyst",
    company: "Artaboga Cemerlang (OT Group)",
    period: "Jul 2024 — Mar 2025",
    location: "Jakarta, Indonesia",
    skills: ["VBA", "SQL", "Google Sheet"]
  },
  {
    id: 4,
    role: "Data Science / IT Intern",
    company: "Cycle & Carriage",
    period: "Jan 2024 — Jun 2024",
    location: "Kuala Lumpur, Malaysia",
    skills: ["SSMS", "SSRS", "Database", "IT Ops"]
  }
];

export default function Experience() {
  return (
    <section id="experience" className="py-24 w-full border-y border-subtle bg-[var(--bg-alt)]/20 overflow-hidden">
      <div className="max-w-5xl mx-auto px-6">
        <ScrollReveal className="pb-12 text-center md:text-left">
          <h2 className="font-mono text-[var(--accent)] font-semibold uppercase tracking-widest mb-2 text-xs">02. Career History</h2>
          <p className="text-4xl font-medium tracking-tight">Professional Timeline</p>
        </ScrollReveal>

        <div className="grid grid-cols-1 gap-6">
          {experiences.map((exp, index) => (
            <ScrollReveal key={exp.id} yOffset={20}>
              <motion.div
                whileHover={{ y: -5, rotateX: index % 2 === 0 ? 1 : -1, rotateY: index % 2 === 0 ? 2 : -2 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className="relative p-8 rounded-3xl border border-subtle bg-[var(--bg-color)]/50 backdrop-blur-sm overflow-hidden group cursor-default"
              >
                {/* Ghost Text Background */}
                <div className="absolute top-1/2 -right-4 -translate-y-1/2 select-none pointer-events-none opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-700">
                   <span className="font-mono text-8xl md:text-9xl font-bold uppercase tracking-tighter block leading-none">
                     {exp.skills[0]}
                   </span>
                </div>

                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="space-y-4 max-w-xl">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="font-mono text-xs text-[var(--accent)] bg-[var(--accent)]/10 px-2 py-1 rounded ring-1 ring-[var(--accent)]/20">
                        {exp.period}
                      </span>
                      <span className="text-xs text-muted uppercase tracking-wider">{exp.location}</span>
                    </div>
                    
                    <div>
                      <h3 className="text-2xl font-bold tracking-tight mb-1 group-hover:text-[var(--accent)] transition-colors duration-300">
                        {exp.role}
                      </h3>
                      <div className="font-medium text-lg text-[var(--text-secondary)]">
                        {exp.company}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 pt-2">
                      {exp.skills.map(skill => (
                        <span key={skill} className="text-[10px] uppercase tracking-widest font-mono font-bold text-muted opacity-60 group-hover:opacity-100 transition-opacity">
                          • {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="hidden md:block">
                    <div className="w-12 h-12 rounded-full border border-subtle flex items-center justify-center group-hover:bg-[var(--accent)] group-hover:border-[var(--accent)] group-hover:text-[var(--bg-color)] transition-all duration-500">
                       <span className="font-mono font-bold">0{index + 1}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
