import React, { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { Preload } from '@react-three/drei';
import { useScroll } from 'framer-motion';
import Scene from './components/Scene';
import OverlayUI from './components/OverlayUI';

function App() {
  const [view, setView] = useState('ROAD'); // ROAD, OVERVIEW, LIST, ABOUT
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    // Scroll to top when view changes away from road
    if (view !== 'ROAD') {
      window.scrollTo(0, 0);
    }
  }, [view]);

  return (
    <>
      {/* 
        This div provides the scroll height for the window. 
        Only needed when we are in ROAD view so we can scroll through the 3D scene.
      */}
      <div className={`w-full ${view === 'ROAD' ? 'h-[600vh]' : 'h-screen overflow-hidden'}`}>
        <div className="fixed inset-0 w-full h-full z-0 bg-transparent">
           <Canvas camera={{ position: [0, 5, 15], fov: 60 }} dpr={[1, 2]}>
              <Scene view={view} />
              <Preload all />
           </Canvas>
        </div>

        {/* 2D UI Overlay Layer */}
        <OverlayUI view={view} setView={setView} scrollYProgress={scrollYProgress} />
      </div>
    </>
  );
}

export default App;