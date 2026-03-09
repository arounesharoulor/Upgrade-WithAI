import React, { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { Preload } from '@react-three/drei';
import { motion, useScroll, useTransform } from 'framer-motion';
import Scene from './components/Scene';
import OverlayUI from './components/OverlayUI';
import RoadContent from './components/RoadContent';

function App() {
  const [view, setView] = useState('ROAD'); // ROAD, OVERVIEW, LIST, ABOUT
  const { scrollYProgress } = useScroll();

  // Interpolate background color through the phases.
  // 0 - 0.25 (About Us) -> Make this darker
  // 0.25 - 0.5 (Services) 
  // 0.5 - 0.75 (Approach)
  // 0.75 - 1.0 (Commence)
  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.25, 0.5, 0.75, 1],
    ['#0f172a', '#d4e0fa', '#c4d7fa', '#d4e0fa', '#edf1fb']
  );

  useEffect(() => {
    // Scroll to top when view changes away from road
    if (view !== 'ROAD') {
      window.scrollTo(0, 0);
    }
  }, [view]);

  return (
    <>
      <motion.div style={{ backgroundColor: view === 'ROAD' ? backgroundColor : '#edf1fb' }} className={`w-full ${view === 'ROAD' ? 'h-[600vh]' : 'h-screen overflow-hidden'}`}>
        <div className="fixed inset-0 w-full h-full z-0 bg-transparent">
           <Canvas camera={{ position: [0, 5, 15], fov: 60 }} dpr={[1, 2]}>
              <Scene view={view} />
              <Preload all />
           </Canvas>
        </div>

        {/* Scrollable HTML Content for ROAD view */}
        {view === 'ROAD' && <RoadContent />}

        {/* 2D UI Overlay Layer */}
        <OverlayUI view={view} setView={setView} scrollYProgress={scrollYProgress} />
      </motion.div>
    </>
  );
}

export default App;