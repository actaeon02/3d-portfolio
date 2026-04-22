import ScrollReveal from './ScrollReveal';

const projects = [
  {
    id: "01",
    title: "Enterprise ETL & BI Ecosystem",
    company: "SKINTIFIC",
    tags: ["Airflow", "BigQuery", "Python", "PowerBI"],
    imageColor: "from-blue-600 to-indigo-900",
    problem: "Fragmented data sources (API, MSSQL, MongoDB, Google Sheets) were slowing down decision cycles and requiring high manual overhead for data integration.",
    architecture: "Orchestrated automated ETL pipelines using Python, Airflow, and Docker. Modeled a centralized BigQuery warehouse with table partitioning and optimized query logic to handle complex retail datasets.",
    outcome: "Reduced manual transformation time by 45% and dashboard refresh latency by 40%. Implemented Row-Level Security to deliver localized insights to 50+ stakeholders."
  },
  {
    id: "02",
    title: "Sales Analytics Intelligence",
    company: "Artaboga Cemerlang (OT Group)",
    tags: ["SQL", "Data Modeling", "Excel", "Google Sheets"],
    imageColor: "from-amber-500 to-orange-900",
    problem: "The management team required fast visibility into KPIs across 21 regional markets to improve sales efficiency and merchandising accuracy.",
    architecture: "Developed a suite of 9 mission-critical dashboards by optimizing workflows and designing robust data models that automated the tracking of sales growth drivers.",
    outcome: "Achieved a 15% reduction in report generation time and a 12% increase in sales efficiency through data-driven action items delivered to the CEO and HOD."
  }
];

export default function SelectedWorks() {
  return (
    <section id="projects" className="py-32 w-full">
      <div className="max-w-5xl mx-auto px-6">
        <ScrollReveal
           className="pb-24"
        >
          <h2 className="font-mono text-[var(--accent)] tracking-wider text-sm font-semibold uppercase mb-2">03. System Designs</h2>
          <p className="text-4xl md:text-5xl font-medium tracking-tight">Enterprise Architecture</p>
        </ScrollReveal>

        <div className="space-y-32">
          {projects.map((project, index) => (
            <div key={project.id} className="group">
              <ScrollReveal
                className="w-full aspect-[16/9] md:aspect-[21/9] rounded-2xl overflow-hidden mb-12 relative group-hover:shadow-2xl transition-all duration-500"
              >
                {/* Background Image */}
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105"
                  style={{ backgroundImage: `url(${index === 0 ? 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop' : 'https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?q=80&w=1974&auto=format&fit=crop'})` }}
                ></div>
                {/* Dark Gradient Overlay for readability and style */}
                <div className={`absolute inset-0 bg-gradient-to-br ${project.imageColor} mix-blend-multiply opacity-60 group-hover:opacity-40 transition-opacity duration-500`}></div>
              </ScrollReveal>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16">
                
                <ScrollReveal 
                  className="md:col-span-4"
                >
                  <div className="font-mono text-5xl font-bold text-[var(--accent)] opacity-60 mb-4">{project.id}</div>
                  <div className="text-xs font-mono uppercase tracking-[0.2em] text-[var(--accent)] mb-2">{project.company}</div>
                  <h3 className="text-3xl font-bold tracking-tight mb-6">{project.title}</h3>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map(tag => (
                      <span key={tag} className="font-mono text-xs uppercase tracking-widest px-3 py-1 border border-subtle rounded-full text-muted">
                        {tag}
                      </span>
                    ))}
                  </div>
                </ScrollReveal>

                <ScrollReveal 
                  className="md:col-span-8 space-y-8"
                >
                  <div>
                    <h4 className="text-sm font-semibold uppercase tracking-widest mb-3 text-[var(--accent)] font-mono">The Problem</h4>
                    <p className="text-lg text-muted leading-relaxed">{project.problem}</p>
                  </div>
                  
                  <div className="w-full h-px border-t border-subtle"></div>
                  
                  <div>
                    <h4 className="text-sm font-semibold uppercase tracking-widest mb-3 text-[var(--accent)] font-mono">The Architecture</h4>
                    <p className="text-lg text-muted leading-relaxed">{project.architecture}</p>
                  </div>

                  <div className="w-full h-px border-t border-subtle"></div>
                  
                  <div>
                    <h4 className="text-sm font-semibold uppercase tracking-widest mb-3 text-[var(--accent)] font-mono">The Outcome</h4>
                    <p className="text-lg text-muted leading-relaxed">{project.outcome}</p>
                  </div>
                </ScrollReveal>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
