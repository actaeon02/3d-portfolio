import { useRef, MouseEvent, useState, useEffect } from 'react';
import { motion, useSpring, useTransform, useMotionValue } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Environment, ScrollControls, Scroll, useScroll as useDreiScroll } from '@react-three/drei';
import * as THREE from 'three';
import { useContact } from '../context/ContactContext';

const creativeProjects = [
  {
    id: 1,
    title: 'Liquid Finance',
    role: 'WebGL • React • WebSockets',
    description: 'A high-performance trading dashboard utilizing WebGL for rendering thousands of data points at 60fps with real-time data integration.',
    image: '/src/assets/images/data_pipeline_schematic_1776927661689.png',
  },
  {
    id: 2,
    title: 'Nexus E-Commerce',
    role: 'Three.js • Next.js • Motion',
    description: 'Award-winning interactive retail experience. Users navigate a 3D product landscape seamlessly integrated with a modern shopping cart.',
    image: '/src/assets/images/retail_analytics_visualization_1776927683270.png',
  },
  {
    id: 3,
    title: 'Aura Architecture',
    role: 'Headless CMS • React • GSAP',
    description: 'A visually driven portfolio for an international architectural firm, featuring complex scroll-triggered animations and fluid page transitions.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
  }
];

// --- NEW: Camera Controller ---
// This drives the camera forward along the Z-axis based on scroll progress
function CameraRig() {
  const scroll = useDreiScroll();
  
  useFrame((state) => {
    // scroll.offset goes from 0 (top) to 1 (bottom)
    // We fly from Z=5 down to Z=-30 so we never fly past the final objects (no abyss)
    const targetZ = THREE.MathUtils.lerp(5, -30, scroll.offset);
    state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, targetZ, 0.1);
    
    // Add a slight tilt to the camera for a "floating" feel as we move
    const targetRotZ = Math.sin(scroll.offset * Math.PI * 2) * 0.05;
    state.camera.rotation.z = THREE.MathUtils.lerp(state.camera.rotation.z, targetRotZ, 0.1);
  });

  return null;
}

function ScrollBackground() {
  const groupRef = useRef<THREE.Group>(null);
  const particlesRef = useRef<THREE.Group>(null);
  const screensRef = useRef<THREE.Group>(null);
  const timeRef = useRef(0);

  useFrame((state, delta) => {
    timeRef.current += delta;
    const t = timeRef.current;

    if (groupRef.current) {
      // The central core object slowly rotates
      groupRef.current.rotation.y = t * 0.1;
      groupRef.current.rotation.x = t * 0.05;
    }

    if (particlesRef.current) {
      // Smoothly move each particle forward along Z axis
      particlesRef.current.children.forEach((child) => {
        child.position.z += delta * 5; // Reduced speed for a more cinematic feel
        if (child.position.z > 20) {
          // Send it back deep into the scene once it passes the camera
          child.position.z -= 100;
        }
      });
    }
  });

  return (
    <group>
      <Environment preset="city" />
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 10, 5]} intensity={1.5} color="#cbd5e1" />
      <spotLight position={[-10, -10, -5]} intensity={1.5} color="#4f46e5" />
      
      {/* 
        Central Core / "Server Architecture" 
        Positioned at Z=-45 so the camera (stopping at -30) always has something epic ahead of it
        Scaled up to remain imposing even from the beginning of the scroll
      */}
      <group ref={groupRef} position={[0, -0.5, -40]} scale={1.8}>
        <Float speed={1.5} rotationIntensity={1} floatIntensity={1.5}>
          {/* Grid Cube */}
          <mesh scale={5}>
            <boxGeometry args={[1, 1, 1, 3, 3, 3]} />
            <meshStandardMaterial color="#334155" transparent opacity={0.05} wireframe roughness={0.1} />
          </mesh>
          {/* Inner Data Core */}
          <mesh scale={2.5}>
            <octahedronGeometry args={[1, 1]} />
            <meshStandardMaterial color="#000000" emissive="#4f46e5" emissiveIntensity={0.3} wireframe />
          </mesh>
          {/* Core Hardware */}
          <mesh scale={1}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color="#020617" roughness={0.05} metalness={1} />
          </mesh>
        </Float>
      </group>

      {/* Floating UI Panels / Screens mapping the "Creative Web" layout */}
      <group ref={screensRef}>
        {Array.from({ length: 45 }).map((_, i) => {
          const zPos = 5 - i * 1.2; 
          const isHighlight = i % 4 === 0;
          return (
            <Float 
              key={`screen-${i}`}
              speed={0.8 + Math.random() * 0.5} 
              rotationIntensity={0.05} 
              floatIntensity={0.3}
              position={[
                (Math.random() - 0.5) * 18, 
                (Math.random() - 0.5) * 14, 
                zPos
              ]}
            >
              <mesh rotation={[0, (Math.random() - 0.5) * 0.3, 0]}>
                {/* 16:9 Aspect ratio planes for web interfaces */}
                <planeGeometry args={[Math.random() * 2 + 1, (Math.random() * 2 + 1) * 0.56]} />
                <meshStandardMaterial 
                  color={isHighlight ? "#4f46e5" : "#334155"} 
                  transparent 
                  opacity={isHighlight ? 0.15 : 0.05} 
                  wireframe={!isHighlight} 
                  side={THREE.DoubleSide}
                />
              </mesh>
            </Float>
          );
        })}
      </group>

      {/* Data Streams */}
      <group ref={particlesRef}>
        {Array.from({ length: 200 }).map((_, i) => (
          <mesh 
            key={i} 
            position={[
              (Math.random() - 0.5) * 20, 
              (Math.random() - 0.5) * 20, 
              (Math.random() - 0.5) * 100 - 30 
            ]}
          >
            {/* Long thin boxes acting as high-speed data trails */}
            <boxGeometry args={[0.015, 0.015, Math.random() * 5 + 1]} />
            <meshBasicMaterial color={i % 2 === 0 ? "#475569" : "#4f46e5"} transparent opacity={Math.random() * 0.3 + 0.05} />
          </mesh>
        ))}
      </group>
    </group>
  );
}

// 3D Tilt Experience Block - Untouched, it works perfectly inside Scroll HTML
function ExperienceBlock({ project, index }: { project: typeof creativeProjects[0], index: number }) {
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

  return (
    <section ref={ref} className="relative min-h-[100vh] py-20 lg:py-32 flex items-center overflow-hidden">
      <div className={`relative z-10 max-w-7xl mx-auto px-6 w-full flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-16 lg:gap-32`}>
        <motion.div 
          initial={{ opacity: 0, x: isEven ? -40 : 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: false, margin: "-100px" }}
          className="flex-1 space-y-6"
        >
          <div className="flex items-center gap-4">
            <span className="text-white font-mono text-[10px] tracking-[0.4em] uppercase border border-white/20 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md">Artifact 0{index + 1}</span>
            <span className="text-slate-200 font-mono text-[10px] tracking-[0.2em] uppercase">{project.role}</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white leading-none uppercase font-sans">
            {project.title}
          </h2>
          <p className="text-base md:text-xl text-slate-200 leading-relaxed max-w-lg font-light">
            {project.description}
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9, x: isEven ? 50 : -50 }}
          whileInView={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: false, margin: "-100px" }}
          className="flex-1 w-full perspective-[2000px]"
        >
          <motion.div 
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            className="group relative w-full aspect-[16/10] rounded-3xl bg-slate-900/20 will-change-transform flex items-center justify-center border border-white/5 shadow-2xl overflow-hidden"
          >
            <div className="absolute inset-0 overflow-hidden rounded-3xl" style={{ transform: "translateZ(30px) scale(1.02)" }}>
               <img src={project.image} alt={project.title} className="w-full h-full object-cover opacity-40 transition-all duration-1000 group-hover:opacity-70 group-hover:scale-105" />
               <div className="absolute inset-0 bg-gradient-to-tr from-slate-950 via-slate-950/40 to-transparent opacity-100 transition-opacity duration-700 group-hover:opacity-60" />
            </div>
            
            <div className="absolute bottom-10 left-10 right-10 flex justify-between items-end" style={{ transform: "translateZ(60px)" }}>
              <div className="space-y-1">
                <h3 className="text-2xl font-bold text-white tracking-tight">{project.title}</h3>
                <p className="text-slate-300 text-[10px] font-mono tracking-[0.3em] uppercase opacity-80 group-hover:opacity-100 transition-opacity">{project.role}</p>
              </div>
              <a href="#" className="w-12 h-12 bg-white/5 backdrop-blur-2xl border border-white/10 text-white hover:text-black hover:bg-white rounded-full flex items-center justify-center opacity-0 -translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 shadow-2xl">
                <ExternalLink className="w-5 h-5" />
              </a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default function InteractivePortfolio() {
  const { openContact } = useContact();
  const [pages, setPages] = useState(creativeProjects.length + 1.8);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setPages(creativeProjects.length * 1.5 + 2.2);
      } else if (window.innerWidth < 1024) {
        setPages(creativeProjects.length * 1.3 + 2.0);
      } else {
        setPages(creativeProjects.length + 1.8);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div 
      className="bg-[#020205] w-screen h-screen relative overflow-hidden selection:bg-[#22d3ee]/30 selection:text-white"
      style={{ position: 'relative' }}
    >
      <style>{`
        canvas + div {
          scrollbar-width: none !important;
          -ms-overflow-style: none !important;
          overflow-y: scroll !important;
        }
        canvas + div::-webkit-scrollbar {
          display: none !important;
        }
        body { overflow: hidden !important; }
      `}</style>
      
      {/* Absolute Nav (Outside Canvas to stay fixed above everything) */}
      <header className="fixed top-0 left-0 w-full z-50 p-8 mix-blend-difference flex justify-between items-start pointer-events-none">
        <Link to="/" className="flex items-center gap-4 text-white/50 hover:text-white transition-all group pointer-events-auto">
          <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-3" />
          <span className="font-mono text-xs tracking-[0.4em] uppercase">Return</span>
        </Link>
        <div className="text-right space-y-1">
          <div className="text-white/40 text-[10px] tracking-[0.5em] uppercase font-bold">Division</div>
          <div className="text-white text-sm tracking-widest font-mono uppercase">Interactive Architecture</div>
        </div>
      </header>

      {/* The entire application is now driven by the Canvas and ScrollControls */}
      <Canvas camera={{ position: [0, 0, 5], fov: 40 }}>
        {/* damping makes the scroll smooth, pages defines how long the scroll is */}
        <ScrollControls damping={0.25} pages={pages}>
          
          {/* 3D Scene */}
          <CameraRig />
          <ScrollBackground />

          {/* HTML Overlay mapped to Scroll */}
          <Scroll html style={{ width: '100vw' }}>
            
            {/* Cinematic Hero */}
            <section className="relative h-screen flex flex-col items-center justify-center text-center px-6">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-8 max-w-5xl flex flex-col items-center"
              >
                <div className="inline-block border border-white/20 bg-white/10 backdrop-blur-xl px-6 py-2 rounded-full text-white text-[10px] font-mono tracking-[0.5em] uppercase mb-6 shadow-2xl">
                  Strategic Design • Data Visualization
                </div>
                <h1 className="text-6xl md:text-[8rem] font-bold tracking-tight text-white leading-[0.9] uppercase">
                  Digital <br/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-slate-400">Exhibition</span>
                </h1>
                <p className="text-xs md:text-sm text-slate-200 max-w-2xl mx-auto font-mono leading-relaxed mt-10 tracking-[0.6em] uppercase">
                  Immersive Software Architecture
                </p>
              </motion.div>

              <motion.div 
                animate={{ y: [0, 15, 0], opacity: [0.1, 0.3, 0.1] }}
                transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                className="absolute bottom-12 text-slate-500/40 flex flex-col items-center gap-4"
              >
                <span className="text-[10px] font-mono tracking-[0.4em] uppercase">Begin Transmission</span>
                <div className="w-[1px] h-20 bg-gradient-to-b from-slate-500/60 to-transparent" />
              </motion.div>
            </section>

            {/* Exhibition pieces */}
            <div className="w-full relative z-20">
              {creativeProjects.map((project, index) => (
                <ExperienceBlock key={project.id} project={project} index={index} />
              ))}
            </div>

            {/* Minimalist CTA / Footer */}
            <section className="relative h-[80vh] flex flex-col items-center justify-center text-center px-6 z-20 overflow-hidden">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
                viewport={{ once: false }}
                className="space-y-12 relative z-30 flex flex-col items-center"
              >
                <h2 className="text-6xl md:text-9xl font-bold tracking-tighter text-white drop-shadow-2xl font-sans">
                  Next <span className="text-slate-400">Epoch.</span>
                </h2>
                <p className="text-2xl md:text-3xl text-slate-200 max-w-lg mx-auto font-light tracking-wide italic">
                  Available for strategic partnerships and high-impact software engineering.
                </p>
                <div className="pt-10 flex flex-col gap-6 items-center pointer-events-auto">
                  <button 
                    onClick={openContact}
                    className="group relative inline-flex items-center justify-center h-16 px-14 bg-white text-black font-bold rounded-full overflow-hidden transition-all duration-500 hover:scale-105 active:scale-95 shadow-2xl"
                  >
                    <span className="relative z-10 font-mono tracking-widest text-xs">Initiate Project</span>
                    <div className="absolute inset-0 bg-slate-200 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                  </button>
                </div>
              </motion.div>
            </section>

          </Scroll>
        </ScrollControls>
      </Canvas>
    </div>
  );
}