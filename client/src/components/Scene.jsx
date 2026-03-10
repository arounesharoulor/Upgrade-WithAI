import React, { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Float, Text, Icosahedron, TorusKnot, MeshDistortMaterial, Sparkles, Stars, Clouds, Cloud } from '@react-three/drei';

export default function Scene({ view }) {
  const groupRef = useRef();
  const particlesRef = useRef();
  const scrollRef = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      // Calculate scroll progress from 0 to 1
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        scrollRef.current = window.scrollY / totalScroll;
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const particleCount = 4000;
  const [positions, sizes] = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);
    for (let i = 0; i < particleCount; i++) {
        // Create a winding 3D path going forward (negative Z)
        const t = i / particleCount;
        const z = - (t * 250); // Path length 250 units
        
        // Add waviness to the path
        const xPath = Math.sin(z * 0.05) * 8;
        const yPath = Math.cos(z * 0.03) * 3;
        
        // Scatter particles around the path
        const x = xPath + (Math.random() - 0.5) * 20;
        const y = yPath + (Math.random() - 0.5) * 20 - 8; // offset downwards
        
        positions[i * 3] = x;
        positions[i * 3 + 1] = y;
        positions[i * 3 + 2] = z;

        sizes[i] = Math.random() * 0.08 + 0.02;
    }
    return [positions, sizes];
  }, []);

  const cameraTarget = useRef(new THREE.Vector3());
  const cameraPosition = useRef(new THREE.Vector3(0, 5, 15));

  const darkColor = new THREE.Color("#020617"); // very dark slate
  const lightColor = new THREE.Color("#1e293b"); // mild dark slate
  const darkParticle = new THREE.Color("#3b82f6"); 
  const lightParticle = new THREE.Color("#8b5cf6"); 

  useFrame((state) => {
    if (view === 'ROAD') {
      // Background logic based on scrollRef
      if (state.scene.fog && particlesRef.current) {
        // scroll between 0 to 0.25 is jumping from dark to light
        const t = Math.min(Math.max(scrollRef.current * 4, 0), 1); 
        state.scene.fog.color.lerpColors(darkColor, lightColor, t);
        particlesRef.current.material.color.lerpColors(darkParticle, lightParticle, t);
      }

      // Move camera forward based on scroll progress (0 to 1) -> maps to Z 0 to -240
      const targetZ = -(scrollRef.current * 230); 
      
      cameraPosition.current.z = THREE.MathUtils.lerp(cameraPosition.current.z, targetZ + 15, 0.03);
      
      // Calculate path center at camera's future position to follow it
      const xPath = Math.sin((targetZ) * 0.05) * 8;
      const yPath = Math.cos((targetZ) * 0.03) * 3 - 3;

      cameraPosition.current.x = THREE.MathUtils.lerp(cameraPosition.current.x, xPath, 0.02);
      cameraPosition.current.y = THREE.MathUtils.lerp(cameraPosition.current.y, Math.max(yPath + 4, 1), 0.02); // Keep slightly above the path

      state.camera.position.copy(cameraPosition.current);

      cameraTarget.current.x = THREE.MathUtils.lerp(cameraTarget.current.x, xPath, 0.04);
      cameraTarget.current.y = THREE.MathUtils.lerp(cameraTarget.current.y, yPath, 0.04);
      cameraTarget.current.z = Math.min(cameraPosition.current.z - 15, targetZ - 10);
      
      state.camera.lookAt(cameraTarget.current);

      groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, 0, 0.05);
      groupRef.current.scale.set(1, 1, 1);
    } else {
      // In other views, we move the camera away and show a dispersed view
      state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, 40, 0.015);
      state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, 30, 0.015);
      state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, 30, 0.015);
      state.camera.lookAt(0, 0, -50);
      
      groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, -15, 0.02);
    }
    
    // Slight rotation to all particles for life
    if (particlesRef.current) {
      // Subtle pulse to the opacity
      particlesRef.current.material.opacity = THREE.MathUtils.lerp(
         particlesRef.current.material.opacity,
         view === 'ROAD' ? 0.7 + Math.sin(state.clock.elapsedTime)*0.1 : 0.1,
         0.05
      );
    }
  });

  return (
    <group ref={groupRef}>
      <ambientLight intensity={1.2} color="#ffffff" />
      <directionalLight position={[10, 20, 10]} intensity={2} color="#ffffff" />
      <directionalLight position={[-10, 5, -10]} intensity={1} color="#60a5fa" />
      <fog attach="fog" args={['#d4e0fa', 15, 60]} />

      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particleCount}
            array={positions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial 
           size={0.12} 
           color="#1a3b8c" 
           sizeAttenuation 
           transparent 
           opacity={0.7} 
           depthWrite={false}
        />
      </points>

      {/* Decorative 3D Floating Objects along the path */}
      {view === 'ROAD' && (
        <>
            {/* Immersive Atmos-style Cloud Intro */}
            <Clouds renderOrder={2} limit={400} material={THREE.MeshLambertMaterial}>
               {/* Extremely dense cloud tunnel right at the beginning */}
               <Cloud seed={1} position={[0, -2, -10]} bounds={[15, 5, 20]} volume={15} color="#cbd5e1" opacity={0.6} fade={20} />
               <Cloud seed={2} position={[5, 3, -15]} bounds={[10, 5, 15]} volume={10} color="#94a3b8" opacity={0.8} fade={20} />
               <Cloud seed={3} position={[-5, 4, -20]} bounds={[10, 5, 15]} volume={10} color="#e2e8f0" opacity={0.5} fade={20} />
               <Cloud seed={4} position={[0, -3, -5]} bounds={[10, 5, 10]} volume={15} color="#64748b" opacity={0.4} fade={20} />
            </Clouds>

            {/* Subtle atmosphere particles remaining deep down the path */}
            <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
            <Sparkles count={400} scale={[20, 20, 30]} size={4} speed={1} opacity={0.3} position={[0, 0, -30]} color="#38bdf8" />
            
            <FloatingObjects />
            <PathRings />
        </>
      )}

    </group>
  );
}

function PathRings() {
  const rings = useMemo(() => {
    return Array.from({ length: 8 }).map((_, i) => {
      const z = -(i * 30 + 15);
      const x = Math.sin(z * 0.05) * 8;
      const y = Math.cos(z * 0.03) * 3;
      return { x, y, z, key: i };
    });
  }, []);
  
  const ringRef = useRef();
  useFrame((state) => {
    if (ringRef.current) {
        ringRef.current.children.forEach((child, i) => {
            child.rotation.x = state.clock.elapsedTime * 0.5 + i;
            child.rotation.y = state.clock.elapsedTime * 0.2 + i;
        });
    }
  });

  return (
    <group ref={ringRef}>
      {rings.map((r, index) => (
         <mesh key={r.key} position={[r.x, r.y, r.z]}>
           <torusGeometry args={[8, 0.05, 16, 100]} />
           <meshBasicMaterial color={index % 2 === 0 ? "#60a5fa" : "#c084fc"} transparent opacity={0.3} wireframe />
         </mesh>
      ))}
    </group>
  );
}


function FloatingObjects() {
  const objects = useMemo(() => {
    // Generate some objects along the negative Z path
    return Array.from({ length: 25 }).map((_, i) => {
      const z = -(i * 10 + 5);
      const xPath = Math.sin(z * 0.05) * 8;
      const yPath = Math.cos(z * 0.03) * 3;
      
      // Scatter them around the path
      const x = xPath + (Math.random() - 0.5) * 25;
      const y = yPath + (Math.random() - 0.5) * 20;
      
      // Randomly pick a shape type: 0 = Icosahedron, 1 = TorusKnot, 2 = Octahedron
      const type = Math.floor(Math.random() * 3);
      const scale = Math.random() * 0.6 + 0.3;
      const speed = Math.random() * 2 + 1;
      
      return { x, y, z, type, scale, speed, key: i };
    });
  }, []);

  return (
    <>
      {objects.map((obj) => (
        <Float 
           key={obj.key} 
           position={[obj.x, obj.y, obj.z]} 
           speed={obj.speed} 
           rotationIntensity={2} 
           floatIntensity={3}
        >
           {obj.type === 0 ? (
              <Icosahedron args={[1, 0]} scale={obj.scale}>
                 <meshStandardMaterial color="#38bdf8" wireframe opacity={0.4} transparent />
              </Icosahedron>
           ) : obj.type === 1 ? (
              <TorusKnot args={[0.5, 0.1, 64, 8]} scale={obj.scale}>
                 <MeshDistortMaterial color="#818cf8" distort={0.5} speed={3} opacity={0.5} transparent />
              </TorusKnot>
           ) : (
              <mesh scale={obj.scale * 0.8}>
                 <octahedronGeometry args={[1, 0]} />
                 <meshStandardMaterial color="#f472b6" wireframe opacity={0.4} transparent />
              </mesh>
           )}
        </Float>
      ))}
    </>
  );
}


function TextCard({ position, title, text }) {
    // Adding randomness to float to separate cards visually
    const speed = Math.random() * 1.5 + 0.5;
    
    return (
        <group position={position}>
            <Float speed={speed} rotationIntensity={0.2} floatIntensity={0.5}>
                <mesh>
                    <planeGeometry args={[0, 0]} /> {/* Invisible plane, text is standalone */}
                    <Text 
                        position={[0, 1.5, 0]} 
                        color="#000000" 
                        fontSize={3.2} 
                        anchorX="center" 
                        anchorY="middle"
                        material-toneMapped={false}
                        letterSpacing={-0.03}
                        font="https://fonts.gstatic.com/s/syncopate/v21/pe0pMIuPIYBCpEV5eFdKvtKqBP5w.woff"
                    >
                        {title}
                        <meshBasicMaterial attach="material" color="#1a1a1a" fog={true} />
                    </Text>
                    <Text 
                        position={[0, -1.2, 0]} 
                        color="#444444" 
                        fontSize={1} 
                        maxWidth={18}
                        textAlign="center"
                        anchorX="center" 
                        anchorY="middle"
                    >
                        {text}
                        <meshBasicMaterial attach="material" color="#444444" fog={true} />
                    </Text>
                </mesh>
            </Float>
        </group>
    )
}
