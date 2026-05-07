import { useRef, useState, useEffect, useMemo, Suspense } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Float, Text, useProgress } from '@react-three/drei';
import { EffectComposer, Bloom, Noise, ChromaticAberration } from '@react-three/postprocessing';
import * as THREE from 'three';
import { useContact } from '../context/ContactContext';
import { freelanceProjects } from '../data/freelanceProjects';
import ExperienceBlock from '../components/ExperienceBlock';
import Footer from '../components/Footer';



// --- Adaptive 3D Background (Synced to Window Scroll) ---
function ScrollBackground({ scrollProgress, featuredCount }: { scrollProgress: any, featuredCount: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const particlesRef = useRef<THREE.Group>(null);
  const screensRef = useRef<THREE.Group>(null);
  const timeRef = useRef(0);

  const particleCount = Math.min(featuredCount * 25, 150);
  const screenCount = Math.min(featuredCount * 8, 40);

  const screenData = useMemo(() => {
    return Array.from({ length: screenCount }).map((_, i) => ({
      position: [
        (Math.random() - 0.5) * 25,
        (Math.random() - 0.5) * 20,
        -(i * 3)
      ],
      rotation: [0, (Math.random() - 0.5) * 0.8, 0],
      scale: Math.random() * 1.5 + 0.5,
      isHighlight: i % 4 === 0
    }));
  }, [screenCount]);

  useFrame((state, delta) => {
    timeRef.current += delta;
    const t = timeRef.current;
    const progress = scrollProgress.get();

    // 1. Linear journey: Consistent zoom from top to bottom.
    const cameraZ = 12 - (progress * 55);
    state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, cameraZ, 0.08);

    // 2. Parallax: Centerpiece moves consistently
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.05 + (progress * 0.4);
      groupRef.current.rotation.x = Math.sin(t * 0.2) * 0.05;
      groupRef.current.position.z = -30 - (progress * 20);
    }

    // 3. Float the screens/planes
    if (screensRef.current) {
      screensRef.current.rotation.y = Math.sin(t * 0.1) * 0.05;
      screensRef.current.position.y = Math.cos(t * 0.3) * 0.2;
    }

    if (particlesRef.current) {
      particlesRef.current.children.forEach((child) => {
        child.position.z += delta * 15;
        if (child.position.z > state.camera.position.z + 20) {
          child.position.z -= 200;
        }
      });
    }
  });

  return (
    <group>
      <Environment preset="city" />
      <ambientLight intensity={0.2} />
      <spotLight position={[-10, -10, -5]} intensity={2} color="#4f46e5" />

      <group ref={groupRef} position={[0, -0.5, -20]} scale={2.5}>
        <Float speed={2} rotationIntensity={1} floatIntensity={2}>
          {/* Internal Glow Source */}
          <pointLight intensity={8} distance={15} color="#4f46e5" />

          {/* Kinetic Outer Ring 01 */}
          <mesh rotation={[Math.PI / 4, 0, 0]}>
            <torusGeometry args={[1.8, 0.015, 16, 100]} />
            <meshStandardMaterial color="#ffffff" transparent opacity={0.3} />
          </mesh>

          {/* Kinetic Outer Ring 02 */}
          <mesh rotation={[-Math.PI / 4, Math.PI / 4, 0]}>
            <torusGeometry args={[2.2, 0.01, 16, 100]} />
            <meshStandardMaterial color="#4f46e5" transparent opacity={0.2} />
          </mesh>

          {/* Glitchy Wireframe Shell */}
          <mesh scale={1.1}>
            <icosahedronGeometry args={[1.2, 1]} />
            <meshStandardMaterial color="#4f46e5" wireframe transparent opacity={0.05} />
          </mesh>
        </Float>
      </group>

      <group ref={screensRef}>
        {screenData.map((data, i) => (
          <Float key={`screen-${i}`} speed={1} position={data.position as [number, number, number]}>
            <mesh rotation={data.rotation as [number, number, number]}>
              <planeGeometry args={[data.scale, data.scale * 0.56]} />
              <meshStandardMaterial
                color={data.isHighlight ? "#4f46e5" : "#1e293b"}
                transparent
                opacity={data.isHighlight ? 0.15 : 0.03}
                wireframe={!data.isHighlight}
                side={THREE.DoubleSide}
              />
            </mesh>
          </Float>
        ))}
      </group>

      <group ref={particlesRef}>
        {Array.from({ length: particleCount }).map((_, i) => (
          <group key={i}>
            <mesh position={[(Math.random() - 0.5) * 30, (Math.random() - 0.5) * 30, (Math.random() - 0.5) * 150 - 40]}>
              <boxGeometry args={[0.02, 0.02, Math.random() * 8 + 2]} />
              <meshBasicMaterial color="#ffffff" transparent opacity={0.1} />
            </mesh>
            {i % 10 === 0 && (
              <Text
                position={[(Math.random() - 0.5) * 20, (Math.random() - 0.5) * 20, (Math.random() - 0.5) * 150 - 40]}
                fontSize={0.05}
                color="#4f46e5"
                fillOpacity={0.3}
              >
                {`0x${Math.floor(Math.random() * 1000).toString(16)}`}
              </Text>
            )}
          </group>
        ))}
      </group>
    </group>
  );
}

export default function Freelance() {
  const { openContact } = useContact();
  const containerRef = useRef<HTMLDivElement>(null);
  const [mount3D, setMount3D] = useState(false);
  const { progress } = useProgress();

  // Standard window scroll sync
  const { scrollYProgress } = useScroll();
  const smoothScroll = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  // Data Driven Split
  const featured = freelanceProjects.filter(p => p.featured);
  const archive = freelanceProjects.filter(p => !p.featured);

  // Buffer loading to ensure GPU shaders are warm
  useEffect(() => {
    // Delay 3D mount until page transition completes
    const timer = setTimeout(() => setMount3D(true), 400);
    return () => clearTimeout(timer);
  }, []);



  return (
    <div ref={containerRef} className="bg-[#020205] min-h-screen relative selection:bg-indigo-500/30 selection:text-white">
      {/* Fixed 3D Layer */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        {mount3D && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
            className="w-full h-full"
          >
            <Canvas camera={{ position: [0, 0, 15], fov: 35 }} dpr={[1, 1.5]} gl={{ powerPreference: "high-performance", antialias: false }}>
              <Suspense fallback={null}>
                <ScrollBackground scrollProgress={smoothScroll} featuredCount={featured.length} />
                <EffectComposer multisampling={0}>
                  <Bloom luminanceThreshold={0.5} intensity={0.8} />
                  <Noise opacity={0.02} />
                </EffectComposer>
              </Suspense>
            </Canvas>
          </motion.div>
        )}
      </div>

      {/* Standard HTML Content */}
      <div className="relative z-10 w-full">
        {/* Static Header */}
        <header className="fixed top-0 left-0 right-0 z-50 px-4 py-6 md:px-8 md:py-8 flex justify-between items-start pointer-events-none">
          <Link to="/" className="flex items-center gap-4 text-white/50 hover:text-white transition-all group pointer-events-auto">
            <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-2" />
            <span className="font-mono text-[10px] md:text-[12px] tracking-[0.4em] uppercase text-white/80">Back</span>
          </Link>
          <div className="text-right space-y-1">
            <div className="text-white/40 text-[8px] md:text-[9px] tracking-[0.5em] uppercase font-bold">Curated</div>
            <div className="text-white text-[10px] md:text-xs tracking-widest font-mono uppercase">Work History</div>
          </div>
        </header>

        <main>
          {/* Hero Section */}
          <section className="relative h-screen flex flex-col items-center justify-center text-center px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-2 max-w-4xl"
            >
              <div className="flex flex-col items-center">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5, duration: 1 }}
                  className="flex items-center gap-4 mb-6"
                >
                  <span className="w-8 h-[1px] bg-indigo-500/50" />
                  <span className="font-mono text-[10px] tracking-[0.5em] text-indigo-400 uppercase">Portfolio Matrix</span>
                  <span className="w-8 h-[1px] bg-indigo-500/50" />
                </motion.div>

                <h1 className="flex flex-col items-center space-y-4 md:space-y-8">
                  <span className="text-4xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-[-0.04em] text-white leading-[0.85]">
                    Digital
                  </span>
                  <span className="text-4xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-[-0.06em] text-transparent bg-clip-text bg-gradient-to-br from-slate-200 via-white to-indigo-500/50 leading-[0.85] italic">
                    Artifacts.
                  </span>
                </h1>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.5 }}
                  transition={{ delay: 1, duration: 1 }}
                  className="mt-4 text-[10px] md:text-xs text-slate-100 max-w-sm mx-auto font-mono tracking-[0.2em] uppercase leading-relaxed border-t border-white/20 pt-8"
                >
                  Selected Project & Open-source works.
                </motion.p>
              </div>
            </motion.div>
          </section>

          {/* Featured Section */}
          <div className="space-y-0">
            {featured.map((project, index) => (
              <ExperienceBlock key={`featured-${project.id}`} project={project} index={index} variant="featured" />
            ))}
          </div>

          {/* Archive Section */}
          {archive.length > 0 && (
            <section className="relative px-6 pt-36 pb-56 z-20">
              <div className="max-w-7xl mx-auto">
                <div className="mb-8 pb-8 flex items-end justify-between">
                  <div>
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tighter text-white uppercase font-sans">
                      Project Archive
                    </h2>
                    <p className="text-slate-500 font-mono text-xs mt-2 tracking-widest uppercase">
                      Additional works and experiments
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {archive.map((project, index) => (
                    <ExperienceBlock key={`archive-${project.id}`} project={project} index={index} variant="compact" />
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Footer Section */}
          <Footer onContactClick={openContact} />
        </main>
      </div>
    </div>
  );
}