import { useRef, ReactNode } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';

export default function ScrollReveal({ 
  children, 
  className = "", 
  yOffset = 30,
}: { 
  children: ReactNode; 
  className?: string; 
  yOffset?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["0 1", "0 0.75"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 20,
    restDelta: 0.001
  });

  const opacity = useTransform(smoothProgress, [0, 1], [0, 1]);
  const y = useTransform(smoothProgress, [0, 1], [yOffset, 0]);

  return (
    <motion.div ref={ref} style={{ opacity, y }} className={`relative ${className}`}>
      {children}
    </motion.div>
  );
}
