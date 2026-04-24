import { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Float, RoundedBox, Sphere, Cylinder, Environment } from '@react-three/drei';
import * as THREE from 'three';
import { useTheme } from './ThemeProvider';

function CameraManager() {
  const { camera, size } = useThree();
  
  useEffect(() => {
    const aspect = size.width / size.height;
    
    // Smoothly adjust camera Z depending on aspect ratio to prevent clipping arms on narrow screens
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

function RobotAvatar() {
  const groupRef = useRef<THREE.Group>(null);
  const rightArmRef = useRef<THREE.Group>(null);
  const leftArmRef = useRef<THREE.Group>(null);
  const { theme } = useTheme();
  const timeRef = useRef(0);
  const walkIntensityRef = useRef(1); // Lerped intensity for smooth transitions

  const globalMouse = useRef(new THREE.Vector2(0, 0));
  const isTargetingRef = useRef(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const heroEl = document.getElementById('hero-section');
      if (!heroEl) return;
      
      const rect = heroEl.getBoundingClientRect();
      const isInside = (
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom
      );
      
      isTargetingRef.current = isInside;
      
      if (isInside) {
        // Calculate normalized coordinates (-1 to +1) relative to the hero section
        globalMouse.current.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        globalMouse.current.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      }
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
  }, []);

  // Premium colors
  const mainColor = theme === 'dark' ? '#1c1917' : '#e7e5e4';
  const jointColor = theme === 'dark' ? '#44403c' : '#a8a29e'; 
  const accentColor = theme === 'dark' ? '#38bdf8' : '#0ea5e9';

  useFrame((state, delta) => {
    timeRef.current += delta;
    const t = timeRef.current;

    const isTargeting = isTargetingRef.current;

    // Smoothly transition walk intensity
    const targetIntensity = isTargeting ? 0 : 1;
    walkIntensityRef.current = THREE.MathUtils.lerp(walkIntensityRef.current, targetIntensity, 0.05);
    const intensity = walkIntensityRef.current;

    // Head/Body Look Logic
    const lerpFactor = 0.08;
    const targetLookX = isTargeting ? -(globalMouse.current.y * Math.PI) / 6 : 0;
    const targetLookY = isTargeting ? (globalMouse.current.x * Math.PI) / 3 : 0;

    if (groupRef.current) {
      // Rotation: Combine Look + Walk Sway
      // Walk Sway: subtle Z-tilt and Y-bounce
      const walkSwayZ = Math.sin(t * 2) * 0.05 * intensity;
      const walkLeanX = Math.cos(t * 2) * 0.02 * intensity; // Forward/backward lean

      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetLookX + walkLeanX, lerpFactor);
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetLookY, lerpFactor);
      groupRef.current.rotation.z = THREE.MathUtils.lerp(groupRef.current.rotation.z, walkSwayZ, lerpFactor);

      // Position: Walk Bobbing
      const walkY = Math.sin(t * 4) * 0.15 * intensity; // Faster bob for "walking" feel
      groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, -0.5 + walkY, 0.1);
      
      // Breathing scaling (always active, but subtly influenced by walk)
      const breathe = Math.sin(t * 2) * 0.015;
      groupRef.current.scale.y = 1 + breathe;
      groupRef.current.scale.x = 1 - breathe * 0.5;
    }

    if (rightArmRef.current && leftArmRef.current) {
      // Arm Swings (Inverse of each other)
      // We swing on X for forward/back, and a bit on Z for wide movement
      const swingSpeed = 4;
      const swingX = Math.sin(t * swingSpeed) * 0.5 * intensity;
      const swingZ = (Math.cos(t * swingSpeed * 0.5) * 0.1 + 0.1) * intensity;
      
      // Offset arms slightly outwards as default
      const defaultRotZ = 0.2;

      // Right Arm
      rightArmRef.current.rotation.x = THREE.MathUtils.lerp(rightArmRef.current.rotation.x, swingX, 0.1);
      rightArmRef.current.rotation.z = THREE.MathUtils.lerp(rightArmRef.current.rotation.z, -defaultRotZ - swingZ, 0.1);
      
      // Left Arm
      leftArmRef.current.rotation.x = THREE.MathUtils.lerp(leftArmRef.current.rotation.x, -swingX, 0.1);
      leftArmRef.current.rotation.z = THREE.MathUtils.lerp(leftArmRef.current.rotation.z, defaultRotZ + swingZ, 0.1);

      // Subtle arm floating (independent of walk)
      const armFloat = Math.sin(t * 2) * 0.05;
      rightArmRef.current.position.y = armFloat - 0.2;
      leftArmRef.current.position.y = -armFloat - 0.2;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
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
      <Canvas camera={{ position: [0, 0, 7.5], fov: 45 }}>
        <CameraManager />
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} />
        <pointLight position={[-10, -10, -5]} intensity={1} />
        
        {/* Environment mapping gives the metallic robot realistic reflections without heavy lighting setups */}
        <Environment preset="city" />

        <RobotAvatar />
        <FloatingDataBits />
        
        {/* Allow users to gently pull and rotate the robot manually. autoRotate is off so looking at the mouse works cleanly. */}
        <OrbitControls enableZoom={false} enablePan={false} maxPolarAngle={Math.PI/1.5} minPolarAngle={Math.PI/3} />
      </Canvas>
    </div>
  );
}
