import { useRef, MouseEvent } from 'react';
import { motion, useSpring, useTransform, useMotionValue } from 'motion/react';
import { ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Project } from '../types/portfolio';

interface ExperienceBlockProps {
  project: Project;
  index: number;
  variant?: 'featured' | 'compact';
}

export default function ExperienceBlock({ project, index, variant = 'featured' }: ExperienceBlockProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["8deg", "-8deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-8deg", "8deg"]);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    x.set((mouseX / width) - 0.5);
    y.set((mouseY / height) - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const isEven = index % 2 === 0;

  if (variant === 'compact') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: (index % 3) * 0.1 }}
        viewport={{ once: true, margin: "-50px" }}
        className="group relative flex flex-col gap-6"
      >
        <Link to={`/project/${project.id}`} className="block relative w-full aspect-[16/10] rounded-3xl overflow-hidden bg-slate-950 border border-white/5">
          <img src={project.image} alt={project.title} loading="lazy" className="w-full h-full object-cover opacity-70 transition-transform duration-1000 group-hover:scale-105 group-hover:opacity-100" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-80" />

          {/* Dynamic Theme Glow */}
          <div
            className="absolute -inset-2 opacity-0 group-hover:opacity-20 transition-opacity duration-700 blur-3xl -z-10"
            style={{ backgroundColor: project.themeColor }}
          />
        </Link>
        <div className="px-1">
          <h3 className="text-2xl font-bold text-white tracking-tight">{project.title}</h3>
          <p className="text-slate-500 text-xs font-mono mt-1 tracking-widest uppercase">{project.role}</p>
        </div>
      </motion.div>
    );
  }

  // Featured Variant (The original cinematic scroll section)
  return (
    <section ref={ref} className="relative py-20 lg:py-32 flex items-center overflow-hidden">
      {/* Background Ambient Glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[160px] opacity-5 pointer-events-none"
        style={{ backgroundColor: project.themeColor }}
      />

      <div className={`relative z-10 max-w-7xl mx-auto px-6 w-full flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-12 lg:gap-24`}>
        {/* Text Column */}
        <motion.div
          initial={{ opacity: 0, x: isEven ? -40 : 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: false, margin: "-100px" }}
          className="flex-1 space-y-10"
        >
          <div className="flex items-center gap-6 flex-wrap">
            <span className="text-white font-mono text-[9px] tracking-[0.4em] uppercase bg-white/5 border border-white/10 px-6 py-2.5 rounded-full backdrop-blur-xl">
              Artifact 0{index + 1}
            </span>
            <div className="flex items-center gap-3 text-slate-400 font-mono text-[9px] tracking-[0.3em] uppercase">
              {project.tags?.map((tag, i) => (
                <span key={tag} className="flex items-center gap-3">
                  {tag}
                  {i < (project.tags?.length || 0) - 1 && <span className="w-1 h-1 rounded-full bg-white/20" />}
                </span>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white leading-[0.95] uppercase max-w-2xl">
              {project.title}
            </h2>
            <p className="text-md md:text-lg text-slate-400 leading-relaxed max-w-lg font-light tracking-tight">
              {project.description}
            </p>
          </div>
        </motion.div>

        {/* Card Column */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, x: isEven ? 50 : -50 }}
          whileInView={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: false, margin: "-100px" }}
          className="flex-1 w-full perspective-[2000px]"
        >
          <motion.div
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            className="group relative w-full aspect-[16/10] rounded-[2.5rem] bg-slate-950 border border-white/5 shadow-2xl overflow-hidden cursor-pointer"
          >
            {/* Image Layer with Depth */}
            <div className="absolute inset-0 overflow-hidden" style={{ transform: "translateZ(20px) scale(1.05)" }}>
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover opacity-80 grayscale-[0.2] transition-all duration-1000 group-hover:scale-105 group-hover:opacity-100 group-hover:grayscale-0"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent opacity-100" />
            </div>

            {/* Internal Overlay (Bottom Left) */}
            {/* Action Button (Bottom Right) */}
            <div
              className="absolute bottom-10 right-10 z-20 pointer-events-none"
              style={{ transform: "translateZ(60px)" }}
            >
              <Link
                to={`/project/${project.id}`}
                className="w-16 h-16 rounded-full bg-white/5 backdrop-blur-2xl border border-white/10 text-white flex items-center justify-center hover:bg-white hover:text-black transition-all duration-500 shadow-2xl group/btn pointer-events-auto relative z-30"
              >
                <ExternalLink className="w-6 h-6 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
              </Link>
            </div>

            {/* Shine Effect */}
            <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
