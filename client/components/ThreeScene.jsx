import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useEffect } from 'react';

function RotatingMesh() {
  const mesh = useRef();

  // rotate the mesh a little on each frame
  useFrame(() => {
    if (mesh.current) {
      mesh.current.rotation.y += 0.01;
      mesh.current.rotation.x += 0.005;
      mesh.current.rotation.z += 0.002;
    }
  });

  return (
    <mesh ref={mesh} scale={[3, 3, 3]} position={[0, 0, 0]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshPhongMaterial color="#00ff88" emissive="#00ff88" emissiveIntensity={0.8} side={2} />
    </mesh>
  );
}

export default function ThreeScene() {
  useEffect(() => {
    const handleResize = () => {
      // Handle resize if needed
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <Canvas
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -10,
        pointerEvents: 'none'
      }}
      camera={{ position: [0, 0, 4], fov: 75 }}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.8} />
      <pointLight position={[5, 5, 5]} intensity={1.2} />
      <pointLight position={[-5, -5, 5]} intensity={0.8} color="#0088ff" />
      <RotatingMesh />
    </Canvas>
  );
}
