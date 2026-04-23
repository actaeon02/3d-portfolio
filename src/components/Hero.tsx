import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowDown } from 'lucide-react';
import ThreeScene from './ThreeScene';
import { PERSONAL_INFO } from '../constants';

export default function Hero() {
  const roles = ["Data Engineer", "BI Developer", "Web Developer"];
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const fullText = roles[currentRoleIndex];
      
      if (!isDeleting) {
        setCurrentText(fullText.substring(0, currentText.length + 1));
        if (currentText === fullText) {
          setTimeout(() => setIsDeleting(true), 2000); // Wait 2s before deleting
        }
      } else {
        setCurrentText(fullText.substring(0, currentText.length - 1));
        if (currentText === "") {
          setIsDeleting(false);
          setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
        }
      }
    }, isDeleting ? 40 : 100);

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, currentRoleIndex, roles]);

  return (
    <section id="hero-section" className="relative min-h-screen w-full flex items-center justify-center pt-20 overflow-hidden">
      
      {/* Subtle Data Dot Grid Background */}
      <div 
        className="absolute inset-0 z-0 opacity-10 dark:opacity-20" 
        style={{ 
          backgroundImage: 'radial-gradient(var(--text-primary) 1px, transparent 1px)', 
          backgroundSize: '32px 32px' 
        }}
      />
      {/* Radial fade to seamlessly blend into the background colors at the edges */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,transparent_0%,var(--bg-color)_80%)]" />

      <div className="max-w-7xl w-full mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center z-10">
        
        {/* Left Content */}
        <div className="flex flex-col space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tighter leading-[1.1]">
              Hi, I'm <br />
              <span className="tracking-tight">Mikael<br/>Andrew<motion.span 
                animate={{ opacity: [1, 0, 1] }} 
                transition={{ repeat: Infinity, duration: 1, ease: "easeInOut" }}
                className="text-[var(--accent)]"
              >.</motion.span></span>
            </h1>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-4"
          >
            <h2 className="text-xl md:text-2xl font-medium text-muted h-8 md:h-10">
               <span className="text-[var(--accent)] font-mono">&gt;</span> {currentText}
               <span className="animate-pulse">_</span>
            </h2>
            <p className="text-muted text-base md:text-lg max-w-md leading-relaxed">
              I architect robust data pipelines and build premium web experiences to untangle complex information into actionable insights.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="pt-4 flex gap-4"
          >
            <a 
              href="/resume.pdf" 
              download={PERSONAL_INFO.resumeName}
              className="bg-[var(--text-primary)] text-[var(--bg-color)] px-6 py-3 rounded-full font-medium hover:scale-105 transition-transform"
            >
              My Resume
            </a>
            <a 
              href="#projects" 
              className="border border-subtle px-6 py-3 rounded-full font-medium hover:bg-[var(--text-secondary)]/5 transition-colors"
            >
              System Designs
            </a>
          </motion.div>
        </div>

        {/* Right Content - 3D */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="h-[400px] md:h-[600px] w-full hidden md:block" // Hidden on very small screens to save space as requested
        >
          <ThreeScene />
        </motion.div>
      </div>

      {/* Floating scroll indicator - Hidden on mobile to prevent stacking with buttons */}
      <motion.div
        animate={{ y: [0, 12, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center text-muted hover:text-[var(--text-primary)] transition-colors cursor-pointer"
        onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
      >
        <ArrowDown className="w-6 h-6 opacity-80" />
      </motion.div>
    </section>
  );
}
