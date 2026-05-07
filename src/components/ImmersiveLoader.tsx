import { motion, AnimatePresence } from 'motion/react';
import { useProgress } from '@react-three/drei';
import { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useLoading } from '../context/LoadingContext';

const SYSTEM_LOGS = [
  'INITIALIZING_KERNEL_0x24',
  'ESTABLISHING_NEURAL_LINK',
  'CACHING_3D_GEOMETRY',
  'WARMING_GPU_SHADERS',
  'OPTIMIZING_SPATIAL_GRIDS',
  'SYNCHRONIZING_CLOCKS',
  'FETCHING_ARTIFACT_DATA',
  'MOUNTING_FILESYSTEM',
  'READY_FOR_INTERACTION'
];

export default function ImmersiveLoader() {
  const { progress, active } = useProgress();
  const location = useLocation();
  const { isLoading, setIsLoading } = useLoading();
  const [isReady, setIsReady] = useState(false);
  const [show, setShow] = useState(true);
  const [currentLog, setCurrentLog] = useState(0);

  // 1. Log Cycling
  useEffect(() => {
    const logInterval = setInterval(() => {
      setCurrentLog((prev) => (prev + 1) % SYSTEM_LOGS.length);
    }, 150);
    return () => clearInterval(logInterval);
  }, []);

  const hasLoadedOnceRef = useRef(false);

  // 2. State Sync Logic
  useEffect(() => {
    // If we have already completed the initial load and no manual loading is requested, do nothing.
    if (hasLoadedOnceRef.current && !isLoading) return;

    // Reset loader when active loading is detected (only on first load or manual trigger)
    if (isLoading || active || progress < 100) {
      setIsReady(false);
      setShow(true);
    }

    // Release logic
    if (progress === 100 && !active) {
      const timer = setTimeout(() => {
        setIsLoading(false);
        setIsReady(true);
        hasLoadedOnceRef.current = true;
        // Hide completely after exit animation
        const hideTimer = setTimeout(() => setShow(false), 1200);
        return () => clearTimeout(hideTimer);
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [progress, active, isLoading, setIsLoading]);

  // 3. Safety Net (Force release if stuck)
  useEffect(() => {
    if (show && !isReady) {
      const safetyTimer = setTimeout(() => {
        console.warn('Loader safety net triggered');
        setIsLoading(false);
        setIsReady(true);
        setTimeout(() => setShow(false), 1200);
      }, 8000); // 8 second hard limit
      return () => clearTimeout(safetyTimer);
    }
  }, [show, isReady, setIsLoading]);

  if (!show) return null;

  return (
    <AnimatePresence mode="wait">
      {!isReady && (
        <motion.div
          key="immersive-loader"
          initial={{ opacity: 1 }}
          exit={{ 
            y: "-100%", 
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } 
          }}
          className="fixed inset-0 z-[9999] bg-[#020205] flex flex-col items-center justify-center pointer-events-auto overflow-hidden"
        >
          {/* Technical Grid Background */}
          <div className="absolute inset-0 opacity-[0.05] pointer-events-none" 
               style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '50px 50px' }} 
          />

          {/* Vertical Scan Line */}
          <motion.div 
            animate={{ left: ['-10%', '110%'] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className="absolute top-0 bottom-0 w-[1px] bg-indigo-500/50 shadow-[0_0_20px_rgba(99,102,241,0.8)] z-20"
          />

          <div className="relative z-10 flex flex-col items-center">
            <div className="relative">
              <motion.div
                animate={{ opacity: [1, 0.8, 1], x: [0, -1, 1, 0] }}
                transition={{ duration: 0.2, repeat: Infinity }}
                className="text-[12vw] md:text-[15vw] font-bold tracking-[-0.08em] text-white/10 leading-none select-none font-mono"
              >
                {Math.round(progress).toString().padStart(3, '0')}
              </motion.div>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-[12vw] md:text-[15vw] font-bold tracking-[-0.08em] text-white leading-none font-mono">
                  {Math.round(progress).toString().padStart(3, '0')}
                </span>
              </div>
            </div>

            <div className="mt-8 space-y-4 text-center">
              <div className="flex items-center gap-4 justify-center">
                <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
                <span className="font-mono text-[10px] tracking-[0.5em] text-indigo-400 uppercase">
                  Initializing Artifact Pipeline
                </span>
              </div>

              <div className="h-4 overflow-hidden font-mono text-[8px] text-white/20 uppercase tracking-[0.2em] max-w-xs mx-auto">
                <motion.div
                  key={currentLog}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {SYSTEM_LOGS[currentLog]}
                </motion.div>
              </div>
            </div>
          </div>

          <div className="absolute top-12 left-12 border-l border-t border-white/20 w-8 h-8" />
          <div className="absolute top-12 right-12 border-r border-t border-white/20 w-8 h-8" />
          <div className="absolute bottom-12 left-12 border-l border-b border-white/20 w-8 h-8" />
          <div className="absolute bottom-12 right-12 border-r border-b border-white/20 w-8 h-8" />
          
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 font-mono text-[8px] text-white/30 tracking-[0.4em] uppercase">
            Mikael Andrew // Structural Case 01
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
