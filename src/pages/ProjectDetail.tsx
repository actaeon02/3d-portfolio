import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { freelanceProjects } from '../data/freelanceProjects';
import { useContact } from '../context/ContactContext';

export default function ProjectDetail() {
  const { id } = useParams();
  const { openContact } = useContact();

  const project = freelanceProjects.find(p => p.id === Number(id));

  if (!project) {
    return (
      <div className="min-h-screen bg-[#020205] text-white flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-mono">404</h1>
          <p className="text-slate-400">Project Protocol Not Found</p>
          <Link to="/freelance" className="text-indigo-400 hover:text-indigo-300 underline">Return to Archive</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020205] text-white selection:bg-white/30 selection:text-white">
      <header className="fixed top-0 left-0 w-full z-50 p-4 md:p-8 flex justify-between items-start mix-blend-difference pointer-events-none">
        <Link to="/freelance" className="flex items-center gap-4 text-white/50 hover:text-white transition-all group pointer-events-auto">
          <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-2" />
          <span className="font-mono text-[10px] tracking-[0.4em] uppercase">Archive</span>
        </Link>
        <button onClick={openContact} className="font-mono text-[10px] tracking-[0.4em] uppercase text-white/50 hover:text-white transition-colors pointer-events-auto">
          Inquire
        </button>
      </header>

      <main className="pt-32 pb-24 px-6 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-16"
        >
          {/* Header */}
          <div className="space-y-8">
            <div className="flex gap-3 flex-wrap">
              {project.tags?.map(tag => (
                <span key={tag} className="text-[10px] font-mono tracking-widest uppercase px-3 py-1 bg-white/5 border border-white/10 rounded-full text-slate-300">
                  {tag}
                </span>
              ))}
            </div>
            <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold tracking-tight uppercase font-sans leading-none" style={{ color: project.themeColor || '#fff' }}>
              {project.title}
            </h1>
            <div className="flex items-center justify-between border-t border-b border-white/10 py-6">
              <div>
                <div className="text-[10px] font-mono tracking-widest text-slate-500 uppercase mb-1">Role</div>
                <div className="text-sm md:text-base font-mono text-slate-200">{project.role}</div>
              </div>
              {project.link && (
                <a href={project.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm font-mono hover:text-indigo-400 transition-colors">
                  View Live <ArrowUpRight className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>

          {/* Hero Image */}
          {/* Hero Media */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="w-full aspect-video rounded-3xl overflow-hidden border border-white/10 bg-slate-900/50 relative group"
          >
            {project.video ? (
              <>
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm group-hover:opacity-0 transition-all z-10 pointer-events-none">
                  <span className="font-mono text-[10px] tracking-[0.5em] uppercase text-white/60">Demo Stream // Active</span>
                </div>
                <video 
                  key={project.video}
                  autoPlay 
                  loop 
                  muted 
                  playsInline
                  className="w-full h-full object-contain"
                >
                  <source src={project.video} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </>
            ) : (
              <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
            )}
          </motion.div>

          {/* Description & Features */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
            <div className="md:col-span-4">
              <h3 className="text-sm font-mono tracking-widest text-slate-500 uppercase sticky top-32">Overview</h3>
            </div>
            <div className="md:col-span-8 space-y-16">
              <p className="text-md md:text-lg text-slate-300 leading-relaxed font-light">
                {project.overview || project.description}
              </p>

              {project.features && (
                <div className="space-y-8 pt-8 border-t border-white/5">
                  <h4 className="text-[12px] font-mono tracking-[0.4em] uppercase text-white/40">Key Features</h4>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                    {project.features.map((feature, i) => (
                      <li key={i} className="flex gap-4 group">
                        <span className="text-indigo-500 font-mono text-[10px] pt-1">0{i + 1}</span>
                        <span className="text-slate-400 text-md leading-relaxed group-hover:text-white transition-colors">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Media Archive (Gallery Only) */}
          {project.gallery && project.gallery.length > 0 && (
            <div className="space-y-32 pt-32">
              <div className="border-t border-white/10 pt-12">
                <h3 className="text-sm font-mono tracking-widest text-slate-500 uppercase mb-12">Additional Artifacts</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {project.gallery.map((img, i) => (
                    <div key={i} className="aspect-video rounded-2xl overflow-hidden border border-white/5 bg-white/5">
                      <img src={img} alt={`Artifact View ${i + 1}`} className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Call to Action */}
          <div className="pt-32 pb-20 text-center border-t border-white/5">
            <div className="text-[10px] font-mono tracking-[0.5em] text-slate-500 uppercase mb-8">End of Artifact Specification</div>
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-6 group"
              >
                <span className="text-2xl sm:text-5xl md:text-7xl font-bold tracking-tighter hover:text-indigo-400 transition-colors">Launch Live Site</span>
                <ArrowUpRight className="w-6 h-6 sm:w-10 sm:h-10 md:w-16 md:h-16 text-indigo-500 group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform" />
              </a>
            )}
          </div>
        </motion.div>
      </main>
    </div>
  );
}
