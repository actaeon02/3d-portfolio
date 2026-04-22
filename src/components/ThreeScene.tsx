import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float, RoundedBox, Sphere, Cylinder, Environment } from '@react-three/drei';
import * as THREE from 'three';
import { useTheme } from './ThemeProvider';

function RobotAvatar() {
  const groupRef = useRef<THREE.Group>(null);
  const rightArmRef = useRef<THREE.Group>(null);
  const leftArmRef = useRef<THREE.Group>(null);
  const { theme } = useTheme();
  const timeRef = useRef(0);

  // Premium muted tech colors adapting to light/dark mode
  const mainColor = theme === 'dark' ? '#1c1917' : '#e7e5e4'; // Neutral dark/light
  const jointColor = theme === 'dark' ? '#44403c' : '#a8a29e'; 
  const accentColor = theme === 'dark' ? '#38bdf8' : '#0ea5e9'; // Sky blue glowing accent

  useFrame((state, delta) => {
    timeRef.current += delta;
    const t = timeRef.current;

    if (groupRef.current) {
      // Interactive: Look at the mouse cursor
      const targetX = (state.pointer.x * Math.PI) / 3;
      const targetY = (state.pointer.y * Math.PI) / 4;

      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetX, 0.1);
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -targetY, 0.1);
      
      // Gentle breathing animation (scaling)
      groupRef.current.scale.y = 1 + Math.sin(t * 2) * 0.015;
      groupRef.current.scale.x = 1 - Math.sin(t * 2) * 0.01;
    }

    if (rightArmRef.current && leftArmRef.current) {
      // Right arm floating and slightly waving
      rightArmRef.current.rotation.z = Math.sin(t * 2) * 0.15 - 0.2;
      rightArmRef.current.position.y = Math.sin(t * 2.5) * 0.1 - 0.2;
      
      // Left arm floating gently
      leftArmRef.current.position.y = Math.cos(t * 2.2) * 0.1 - 0.2;
      leftArmRef.current.rotation.z = Math.cos(t * 1.8) * 0.1 + 0.2;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={1.5}>
      <group ref={groupRef} position={[0, -0.5, 0]}>
        
        {/* --- Head --- */}
        <RoundedBox args={[1.4, 1.2, 1.4]} radius={0.2} smoothness={4} position={[0, 1.8, 0]}>
          <meshStandardMaterial color={mainColor} roughness={0.3} metalness={0.7} />
          
          {/* Visor / Face Screen */}
          <RoundedBox args={[1.0, 0.5, 0.1]} radius={0.05} smoothness={4} position={[0, 0.1, 0.7]}>
            <meshStandardMaterial color="#0f172a" roughness={0.1} metalness={0.9} />
          </RoundedBox>

          {/* Glowing Eyes */}
          <Sphere args={[0.08]} position={[-0.25, 0.1, 0.72]}>
            <meshStandardMaterial color={accentColor} emissive={accentColor} emissiveIntensity={2} toneMapped={false} />
          </Sphere>
          <Sphere args={[0.08]} position={[0.25, 0.1, 0.72]}>
            <meshStandardMaterial color={accentColor} emissive={accentColor} emissiveIntensity={2} toneMapped={false} />
          </Sphere>
          
          {/* Ear pieces */}
          <Cylinder args={[0.2, 0.2, 1.5]} rotation={[0, 0, Math.PI / 2]} position={[0, 0, 0]}>
            <meshStandardMaterial color={jointColor} roughness={0.5} metalness={0.5} />
          </Cylinder>
        </RoundedBox>

        {/* --- Torso --- */}
        {/* Neck */}
        <Cylinder args={[0.25, 0.3, 0.6]} position={[0, 1.0, 0]}>
          <meshStandardMaterial color={jointColor} roughness={0.4} metalness={0.6} />
        </Cylinder>

        {/* Main Body */}
        <RoundedBox args={[1.6, 1.8, 1.2]} radius={0.3} smoothness={4} position={[0, 0, 0]}>
          <meshStandardMaterial color={mainColor} roughness={0.3} metalness={0.7} />
          
          {/* Data Core / Chest plate */}
          <RoundedBox args={[0.8, 0.8, 0.1]} radius={0.1} smoothness={4} position={[0, 0.2, 0.6]}>
             <meshStandardMaterial color="#0f172a" roughness={0.4} />
          </RoundedBox>
          {/* Glowing heart/CPU */}
          <Cylinder args={[0.2, 0.2, 0.1]} rotation={[Math.PI / 2, 0, 0]} position={[0, 0.2, 0.62]}>
            <meshStandardMaterial color={accentColor} emissive={accentColor} emissiveIntensity={1.5} toneMapped={false} />
          </Cylinder>
        </RoundedBox>

        {/* --- Left Arm (Detached & Floating) --- */}
        <group ref={leftArmRef} position={[-1.3, -0.2, 0]}>
          <Sphere args={[0.25]} position={[0, 0.6, 0]}>
            <meshStandardMaterial color={jointColor} roughness={0.4} metalness={0.6} />
          </Sphere>
          <RoundedBox args={[0.4, 1.4, 0.4]} radius={0.1} smoothness={4}>
            <meshStandardMaterial color={mainColor} roughness={0.3} metalness={0.7} />
          </RoundedBox>
        </group>

        {/* --- Right Arm (Detached & Waving) --- */}
        <group ref={rightArmRef} position={[1.3, -0.2, 0]}>
          <Sphere args={[0.25]} position={[0, 0.6, 0]}>
             <meshStandardMaterial color={jointColor} roughness={0.4} metalness={0.6}  />
          </Sphere>
          <RoundedBox args={[0.4, 1.4, 0.4]} radius={0.1} smoothness={4}>
            <meshStandardMaterial color={mainColor} roughness={0.3} metalness={0.7} />
          </RoundedBox>
        </group>
        
        {/* --- Base / Anti-Gravity Engine --- */}
        <Cylinder args={[0.5, 0.3, 0.4]} position={[0, -1.1, 0]}>
          <meshStandardMaterial color={jointColor} roughness={0.3} metalness={0.7} />
        </Cylinder>
        {/* Engine Glow */}
        <Sphere args={[0.3]} position={[0, -1.35, 0]} scale={[1, 0.5, 1]}>
           <meshStandardMaterial color={accentColor} emissive={accentColor} emissiveIntensity={2} toneMapped={false} transparent opacity={0.8} />
        </Sphere>

      </group>
    </Float>
  );
}

function FloatingDataBits() {
  const count = 40;
  const mesh = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const { theme } = useTheme();
  
  const particleColor = theme === 'dark' ? '#38bdf8' : '#0ea5e9';

  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const t = Math.random() * 100;
      const speed = 0.01 + Math.random() / 200;
      // Distribute in a wider shell outside the robot
      const rad = 3 + Math.random() * 4;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      
      const xOrigin = rad * Math.sin(phi) * Math.cos(theta);
      const yOrigin = rad * Math.sin(phi) * Math.sin(theta);
      const zOrigin = rad * Math.cos(phi);
      
      temp.push({ t, speed, xOrigin, yOrigin, zOrigin });
    }
    return temp;
  }, [count]);

  useFrame(() => {
    particles.forEach((particle, i) => {
      particle.t += particle.speed;
      const { t, xOrigin, yOrigin, zOrigin } = particle;
      
      dummy.position.set(
        xOrigin + Math.sin(t) * 0.5,
        yOrigin + Math.cos(t * 1.2) * 0.5,
        zOrigin + Math.sin(t * 0.8) * 0.5
      );
      dummy.rotation.set(t, t, t);
      dummy.updateMatrix();
      mesh.current!.setMatrixAt(i, dummy.matrix);
    });
    mesh.current!.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]} scale={[0.04, 0.04, 0.04]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshBasicMaterial color={particleColor} transparent opacity={0.6} />
    </instancedMesh>
  );
}

export default function ThreeScene() {
  return (
    <div className="w-full h-full relative cursor-move pointer-events-auto">
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} />
        <pointLight position={[-10, -10, -5]} intensity={1} />
        
        {/* Environment mapping gives the metallic robot realistic reflections without heavy lighting setups */}
        <Environment preset="city" opacity={0.2} />

        <RobotAvatar />
        <FloatingDataBits />
        
        {/* Allow users to gently pull and rotate the robot manually. autoRotate is off so looking at the mouse works cleanly. */}
        <OrbitControls enableZoom={false} enablePan={false} maxPolarAngle={Math.PI/1.5} minPolarAngle={Math.PI/3} />
      </Canvas>
    </div>
  );
}
