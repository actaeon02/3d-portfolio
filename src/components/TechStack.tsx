import React from 'react';
import { motion } from 'motion/react';
import ScrollReveal from './ScrollReveal';
import { 
  Database, Terminal, Braces, Cloud, 
  BarChart2, PieChart, Eye, Atom, 
  Server, Palette, Layers, Box, Wind, Coffee, Zap, HardDrive, Triangle, Leaf
} from 'lucide-react';

const pipelineStages = [
  {
    id: "01",
    name: "Core",
    description: "Foundational languages and logic",
    techs: [
      { name: "Python", Icon: Terminal },
      { name: "SQL", Icon: Database },
      { name: "Java", Icon: Coffee },
      { name: "JS & TS", Icon: Braces },
    ]
  },
  {
    id: "02",
    name: "Process",
    description: "ETL & server orchestration",
    techs: [
      { name: "Airflow", Icon: Wind },
      { name: "Databricks", Icon: Layers },
      { name: "Node.js", Icon: Server },
      { name: "Docker", Icon: Box },
    ]
  },
  {
    id: "03",
    name: "Storage",
    description: "Databases & cloud infrastructure",
    techs: [
      { name: "PostgreSQL", Icon: Database },
      { name: "Delta Lake", Icon: Triangle },
      { name: "MongoDB", Icon: Leaf },
      { name: "BigQuery", Icon: Zap },
      { name: "AWS", Icon: HardDrive },
      { name: "GCP", Icon: Cloud },
    ]
  },
  {
    id: "04",
    name: "Delivery",
    description: "Analytics & user interfaces",
    techs: [
      { name: "PowerBI", Icon: BarChart2 },
      { name: "SSRS", Icon: PieChart },
      { name: "Tableau", Icon: PieChart },
      { name: "Looker", Icon: Eye },
      { name: "React", Icon: Atom },
    ]
  }
];

const FlowWire = ({ orientation = 'horizontal' }: { orientation?: 'horizontal' | 'vertical' }) => {
  const isH = orientation === 'horizontal';
  return (
    <div className={`flex items-center justify-center ${isH ? 'w-8 lg:w-16 h-full' : 'h-12 w-full'} z-0 opacity-60`}>
      <div className={`relative bg-[var(--border)] overflow-hidden rounded-full ${isH ? 'w-full h-[3px]' : 'h-full w-[3px]'}`}>
        <motion.div 
          className="absolute bg-[var(--accent)] shadow-[0_0_12px_var(--accent)] blur-[1px]"
          style={isH ? { height: '100%', width: '50%', top: 0, left: 0 } : { width: '100%', height: '50%', top: 0, left: 0 }}
          animate={isH ? { x: ['-200%', '300%'] } : { y: ['-200%', '300%'] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
        />
      </div>
    </div>
  );
};

export default function TechStack() {
  return (
    <section id="tech-stack" className="py-32 w-full relative">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <ScrollReveal className="text-center mb-24">
          <h2 className="font-mono text-[var(--accent)] tracking-wider text-sm font-semibold uppercase mb-4">04. Tech Stack</h2>
          <p className="text-3xl md:text-5xl font-medium tracking-tight mb-6">The Data Pipeline</p>
          <p className="text-muted text-lg max-w-2xl mx-auto leading-relaxed">
            My toolkit is structured like the systems I build: a robust, scalable flow spanning from raw data ingestion to polished, end-user delivery.
          </p>
        </ScrollReveal>

        <div className="flex flex-col lg:flex-row items-center lg:items-stretch justify-center w-full">
          {pipelineStages.map((stage, idx) => (
            <React.Fragment key={stage.id}>
              {/* Stage Card */}
              <div className="w-full lg:flex-1 flex flex-col z-10">
                <ScrollReveal 
                  className="h-full"
                >
                  <div className="p-6 rounded-2xl border border-[var(--border)] bg-[var(--bg-alt)]/30 backdrop-blur-sm h-full hover:border-[var(--accent)]/40 hover:bg-[var(--bg-alt)]/60 transition-all duration-500 shadow-sm hover:shadow-xl group/card relative overflow-hidden">
                    
                    {/* Subtle hover background glow */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent)]/5 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 pointer-events-none" />

                    <div className="flex items-center justify-between mb-3 relative z-10">
                      <h3 className="font-mono font-bold tracking-tight text-xl text-[var(--text-primary)]">{stage.name}</h3>
                      <span className="font-mono text-[10px] sm:text-xs text-[var(--accent)] font-semibold tracking-widest bg-[var(--accent)]/10 px-2.5 py-1 rounded-full border border-[var(--accent)]/20">
                        STAGE {stage.id}
                      </span>
                    </div>
                    <p className="text-sm text-muted mb-8 h-10 relative z-10">{stage.description}</p>
                    
                    <div className="space-y-3 relative z-10 mt-auto">
                      {stage.techs.map(tech => (
                        <div 
                          key={tech.name} 
                          className="flex items-center space-x-4 p-3.5 rounded-xl bg-[var(--bg-color)] border border-[var(--border)] group hover:border-[var(--accent)]/70 hover:shadow-[0_0_15px_rgba(59,130,246,0.12)] transition-all duration-300 transform hover:-translate-y-0.5"
                        >
                          <tech.Icon className="w-5 h-5 text-muted group-hover:text-[var(--accent)] transition-colors duration-300" />
                          <span className="font-medium text-sm text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-colors duration-300">
                            {tech.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </ScrollReveal>
              </div>

              {/* Connecting Wire */}
              {idx < pipelineStages.length - 1 && (
                <React.Fragment>
                  {/* Desktop Wire */}
                  <div className="hidden lg:flex items-center justify-center shrink-0">
                    <FlowWire orientation="horizontal" />
                  </div>
                  {/* Mobile Wire */}
                  <div className="flex lg:hidden justify-center items-center h-12 w-full shrink-0">
                    <FlowWire orientation="vertical" />
                  </div>
                </React.Fragment>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
