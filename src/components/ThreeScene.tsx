import { useRef, useMemo, useEffect, useState, Suspense } from 'react';
import { motion } from 'motion/react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Float, RoundedBox, Sphere, Cylinder, Environment, Line, Sparkles } from '@react-three/drei';
import { EffectComposer, Bloom, BrightnessContrast } from '@react-three/postprocessing';
import * as THREE from 'three';
import { useTheme } from './ThemeProvider';

// -------------------------------------------------------------------------
// Camera Manager
// -------------------------------------------------------------------------
function CameraManager() {
  const { camera, size } = useThree();

  useEffect(() => {
    const aspect = size.width / size.height;

    if (aspect < 0.7) {
      camera.position.z = 11;
    } else if (aspect < 1) {
      camera.position.z = 9.5;
    } else if (aspect < 1.3) {
      camera.position.z = 8.5;
    } else {
      camera.position.z = 7.5;
    }
  }, [size, camera]);

  return null;
}

// -------------------------------------------------------------------------
// Scroll Rig
// -------------------------------------------------------------------------
function ScrollRig({ children }: { children: React.ReactNode }) {
  const group = useRef<THREE.Group>(null);

  useFrame(() => {
    if (!group.current) return;
    const scrollY = window.scrollY;
    const targetY = scrollY * 0.012;
    group.current.position.y = THREE.MathUtils.lerp(group.current.position.y, targetY, 0.05);
  });

  return <group ref={group}>{children}</group>;
}

// -------------------------------------------------------------------------
// Robot Avatar (with enhanced materials)
// -------------------------------------------------------------------------
function RobotAvatar({ isHeroVisible }: { isHeroVisible: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const rightArmRef = useRef<THREE.Group>(null);
  const leftArmRef = useRef<THREE.Group>(null);
  const { theme } = useTheme();
  const timeRef = useRef(0);
  const walkIntensityRef = useRef(1);

  const globalMouse = useRef(new THREE.Vector2(0, 0));
  const isTargetingRef = useRef(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isHeroVisible) {
        isTargetingRef.current = false;
        return;
      }
      isTargetingRef.current = true;
      globalMouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      globalMouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    const handleMouseLeave = () => {
      isTargetingRef.current = false;
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isHeroVisible]);

  const mainColor = theme === 'dark' ? '#1c1917' : '#e7e5e4';
  const jointColor = theme === 'dark' ? '#44403c' : '#a8a29e';
  const accentColor = theme === 'dark' ? '#38bdf8' : '#0ea5e9';

  // Enhanced materials with higher metalness and lower roughness for more specular highlights
  const mainMaterial = {
    color: mainColor,
    roughness: 0.3,
    metalness: 0.7,
    emissive: '#000000',
    emissiveIntensity: 0
  };

  const jointMaterial = {
    color: jointColor,
    roughness: 0.3,
    metalness: 0.75,    // Increased for contrast
  };

  useFrame((state, delta) => {
    timeRef.current += delta;
    const t = timeRef.current;

    const isTargeting = isTargetingRef.current;
    const targetIntensity = isTargeting ? 0 : 1;
    walkIntensityRef.current = THREE.MathUtils.lerp(walkIntensityRef.current, targetIntensity, 0.05);
    const intensity = walkIntensityRef.current;

    const lerpFactor = 0.08;
    const targetLookX = isTargeting ? -(globalMouse.current.y * Math.PI) / 6 : 0;
    const targetLookY = isTargeting ? (globalMouse.current.x * Math.PI) / 3 : 0;

    if (groupRef.current) {
      const walkSwayZ = Math.sin(t * 2) * 0.05 * intensity;
      const walkLeanX = Math.cos(t * 2) * 0.02 * intensity;

      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetLookX + walkLeanX, lerpFactor);
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetLookY, lerpFactor);
      groupRef.current.rotation.z = THREE.MathUtils.lerp(groupRef.current.rotation.z, walkSwayZ, lerpFactor);

      const walkY = Math.sin(t * 4) * 0.15 * intensity;
      groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, -0.5 + walkY, 0.1);

      const breathe = Math.sin(t * 2) * 0.015;
      groupRef.current.scale.y = 1 + breathe;
      groupRef.current.scale.x = 1 - breathe * 0.5;
    }

    if (rightArmRef.current && leftArmRef.current) {
      const swingSpeed = 4;
      const swingX = Math.sin(t * swingSpeed) * 0.5 * intensity;
      const swingZ = (Math.cos(t * swingSpeed * 0.5) * 0.1 + 0.1) * intensity;
      const defaultRotZ = 0.2;

      rightArmRef.current.rotation.x = THREE.MathUtils.lerp(rightArmRef.current.rotation.x, swingX, 0.1);
      rightArmRef.current.rotation.z = THREE.MathUtils.lerp(rightArmRef.current.rotation.z, -defaultRotZ - swingZ, 0.1);

      leftArmRef.current.rotation.x = THREE.MathUtils.lerp(leftArmRef.current.rotation.x, -swingX, 0.1);
      leftArmRef.current.rotation.z = THREE.MathUtils.lerp(leftArmRef.current.rotation.z, defaultRotZ + swingZ, 0.1);

      const armFloat = Math.sin(t * 2) * 0.05;
      rightArmRef.current.position.y = armFloat - 0.2;
      leftArmRef.current.position.y = -armFloat - 0.2;
    }
  });

  return (
    <>
      {/* Small glow particle effect around the robot for contrast
      <Sparkles
        count={30}
        scale={[3, 4, 3]}
        size={0.05}
        color={accentColor}
        opacity={0.4}
        speed={0.5}
      /> */}

      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
        <group ref={groupRef} position={[0, -0.5, 0]}>

          {/* Head */}
          <RoundedBox args={[1.4, 1.2, 1.4]} radius={0.2} smoothness={4} position={[0, 1.8, 0]}>
            <meshStandardMaterial {...mainMaterial} />
            <RoundedBox args={[1.0, 0.5, 0.1]} radius={0.05} smoothness={4} position={[0, 0.1, 0.7]}>
              <meshStandardMaterial color="#0f172a" roughness={0.1} metalness={0.9} />
            </RoundedBox>
            <Sphere args={[0.08]} position={[-0.25, 0.1, 0.72]}>
              <meshStandardMaterial color={accentColor} emissive={accentColor} emissiveIntensity={2} toneMapped={false} />
            </Sphere>
            <Sphere args={[0.08]} position={[0.25, 0.1, 0.72]}>
              <meshStandardMaterial color={accentColor} emissive={accentColor} emissiveIntensity={2} toneMapped={false} />
            </Sphere>
            <Cylinder args={[0.2, 0.2, 1.5]} rotation={[0, 0, Math.PI / 2]} position={[0, 0, 0]}>
              <meshStandardMaterial color={jointColor} roughness={0.5} metalness={0.5} />
            </Cylinder>
          </RoundedBox>

          {/* Torso */}
          <Cylinder args={[0.25, 0.3, 0.6]} position={[0, 1.0, 0]}>
            <meshStandardMaterial color={jointColor} roughness={0.4} metalness={0.6} />
          </Cylinder>
          <RoundedBox args={[1.6, 1.8, 1.2]} radius={0.3} smoothness={4} position={[0, 0, 0]}>
            <meshStandardMaterial {...mainMaterial} />
            <RoundedBox args={[0.8, 0.8, 0.1]} radius={0.1} smoothness={4} position={[0, 0.2, 0.6]}>
              <meshStandardMaterial color="#0f172a" roughness={0.3} metalness={0.7} />
            </RoundedBox>
            <Cylinder args={[0.2, 0.2, 0.1]} rotation={[Math.PI / 2, 0, 0]} position={[0, 0.2, 0.62]}>
              <meshStandardMaterial color={accentColor} emissive={accentColor} emissiveIntensity={1.5} toneMapped={false} />
            </Cylinder>
          </RoundedBox>

          {/* Arms */}
          <group ref={leftArmRef} position={[-1.3, -0.2, 0]}>
            <Sphere args={[0.25]} position={[0, 0.6, 0]}>
              <meshStandardMaterial color={jointColor} roughness={0.4} metalness={0.6} />
            </Sphere>
            <RoundedBox args={[0.4, 1.4, 0.4]} radius={0.1} smoothness={4}>
              <meshStandardMaterial {...mainMaterial} />
            </RoundedBox>
          </group>

          <group ref={rightArmRef} position={[1.3, -0.2, 0]}>
            <Sphere args={[0.25]} position={[0, 0.6, 0]}>
              <meshStandardMaterial {...jointMaterial} />
            </Sphere>
            <RoundedBox args={[0.4, 1.4, 0.4]} radius={0.1} smoothness={4}>
              <meshStandardMaterial color={jointColor} roughness={0.4} metalness={0.6} />
            </RoundedBox>
          </group>

          {/* Base */}
          <Cylinder args={[0.5, 0.3, 0.4]} position={[0, -1.1, 0]}>
            <meshStandardMaterial color={jointColor} roughness={0.3} metalness={0.7} />
          </Cylinder>
          <Sphere args={[0.3]} position={[0, -1.35, 0]} scale={[1, 0.5, 1]}>
            <meshStandardMaterial color={accentColor} emissive={accentColor} emissiveIntensity={2} toneMapped={false} transparent opacity={0.8} />
          </Sphere>

        </group>
      </Float>
    </>
  );
}

// -------------------------------------------------------------------------
// Abstract Tech Visuals (Scrolling down)
// -------------------------------------------------------------------------
function AbstractTechVisuals() {
  const { theme } = useTheme();
  const accentColor = theme === 'dark' ? '#38bdf8' : '#0ea5e9';
  const nodeColor = theme === 'dark' ? '#1e293b' : '#cbd5e1';

  const nodes = useMemo(() => {
    const items = [];
    const count = 40; // Reduced from 80 for better performance
    for (let i = 0; i < count; i++) {
      items.push({
        position: new THREE.Vector3(
          (Math.random() - 0.5) * 30,
          -(Math.random() * 120) - 10,
          (Math.random() - 0.5) * 15
        ),
        scale: Math.random() * 0.5 + 0.2,
        speed: Math.random() * 0.02 + 0.01,
      });
    }
    return items;
  }, []);

  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;
    groupRef.current.rotation.y = t * 0.02;
    groupRef.current.children.forEach((child, i) => {
      if (child.type === 'Mesh') {
        child.position.y += Math.sin(t + i) * 0.002;
      }
    });
  });

  return (
    <group ref={groupRef}>
      {nodes.map((node, i) => (
        <Float key={i} speed={2} rotationIntensity={1} floatIntensity={2}>
          <mesh position={node.position}>
            <octahedronGeometry args={[node.scale, 0]} />
            <meshStandardMaterial color={nodeColor} roughness={0.2} metalness={0.8} transparent opacity={0.4} />
            <mesh scale={1.1}>
              <octahedronGeometry args={[node.scale, 0]} />
              <meshBasicMaterial color={accentColor} wireframe transparent opacity={0.1} />
            </mesh>
          </mesh>
        </Float>
      ))}
      {nodes.map((node, i) => {
        if (i === nodes.length - 1) return null;
        const nextNode = nodes[i + 1];
        if (node.position.distanceTo(nextNode.position) < 10) {
          return (
            <Line
              key={`line-${i}`}
              points={[node.position, nextNode.position]}
              color={accentColor}
              lineWidth={1}
              transparent
              opacity={0.03}
            />
          );
        }
        return null;
      })}
    </group>
  );
}

// -------------------------------------------------------------------------
// Main Scene Export
// -------------------------------------------------------------------------
export default function ThreeScene() {
  const [isHeroVisible, setIsHeroVisible] = useState(true);
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' ? window.innerWidth < 768 : false
  );
  const [mount3D, setMount3D] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMount3D(true), 400);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsHeroVisible(window.scrollY < window.innerHeight);
    };

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="w-full h-full relative cursor-move">
      {mount3D && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="w-full h-full"
        >
          <Canvas 
            camera={{ position: [0, 0, 7.5], fov: 45 }}
            dpr={[1, 1.2]}
            gl={{ powerPreference: "high-performance", antialias: false }}
          >
            <Suspense fallback={null}>
              <CameraManager />

              <ambientLight intensity={0.6} />
              <directionalLight position={[10, 10, 5]} intensity={1.5} />
              <pointLight position={[-10, -10, -5]} intensity={1} />

              <Environment preset="city" />

              <ScrollRig>
                {!isMobile && (
                  <group position={typeof window !== 'undefined' && window.innerWidth >= 1024 ? [2.5, 0, 0] : [0, 0, 0]}>
                    <RobotAvatar isHeroVisible={isHeroVisible} />
                  </group>
                )}
                <AbstractTechVisuals />
              </ScrollRig>

              <OrbitControls
                enableZoom={false}
                enablePan={false}
                maxPolarAngle={Math.PI / 1.5}
                minPolarAngle={Math.PI / 3}
                rotateSpeed={0.8}
              />
            </Suspense>
          </Canvas>
        </motion.div>
      )}
    </div>
  );
}