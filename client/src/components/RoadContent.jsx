import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

function ScrollSection({ progress, start, end, title, children }) {
  const duration = end - start;
  
  // Create non-overlapping sequence: Title reveals, then hides. Details reveal, then hide.
  const p1 = start; 
  const p2 = start + duration * 0.15; // Title scale/fade in
  const p3 = start + duration * 0.35; // Title solid
  const p4 = start + duration * 0.45; // Title fades out & zooms past
  
  const p5 = start + duration * 0.55; // Details start showing
  const p6 = start + duration * 0.65; // Details solid
  const p7 = start + duration * 0.85; // Details hold
  const p8 = end;                     // Details fade out & zoom past

  const titleOpacity = useTransform(progress, [p1, p2, p3, p4], [0, 1, 1, 0]);
  const titleScale = useTransform(progress, [p1, p2, p3, p4], [0.7, 1, 1.05, 2]);

  const detailOpacity = useTransform(progress, [p4, p5, p6, p7, p8], [0, 0, 1, 1, 0]);
  const detailScale = useTransform(progress, [p4, p5, p6, p7, p8], [0.8, 0.9, 1, 1.05, 1.5]);

  const pointerEvents = useTransform(progress, (v) => {
    return (v > p5 && v < p8 - 0.05) ? "auto" : "none";
  });

  return (
    <motion.div 
      className="fixed inset-0 flex flex-col items-center justify-center px-4 z-10"
    >
       <motion.h2 
          style={{ opacity: titleOpacity, scale: titleScale, pointerEvents: 'none' }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[#2d52a3] font-wide font-bold text-4xl md:text-5xl lg:text-7xl tracking-wider text-center drop-shadow-xl z-20 w-full"
       >
          {title}
       </motion.h2>
       
       <motion.div
          style={{ opacity: detailOpacity, scale: detailScale, pointerEvents }}
          className="w-full max-w-5xl text-center z-10 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
       >
          {children}
       </motion.div>
    </motion.div>
  );
}

export default function RoadContent() {
  const { scrollYProgress } = useScroll();

  return (
    <>
      <ScrollSection progress={scrollYProgress} start={0} end={0.25} title={<span className="text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]">ABOUT US</span>}>
        <div className="backdrop-blur-md bg-black/40 p-8 md:p-12 rounded-3xl border border-white/20 shadow-2xl mx-auto max-w-4xl">
          <p className="text-white/90 text-base md:text-lg lg:text-xl font-sans leading-relaxed font-light mb-6">
             We blend <span className="font-bold text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]">Design, Execution, and Artificial Intelligence</span> to build intelligent digital ecosystems that solve complex real-world problems.
          </p>
          <div className="text-white/70 text-sm md:text-base font-sans leading-relaxed font-light text-left space-y-4">
             <p>As a premium engineering firm, we exist at the intersection of aesthetic brilliance and computational power. Our methodologies eliminate technical debt from day one, allowing startups and enterprises to launch highly scalable infrastructure without compromise.</p>
             <p>We leverage cutting-edge tools to minimize time-to-market. By automating heavy data flows and utilizing machine learning models, we transform traditional software environments into self-optimizing platforms.</p>
             <p className="font-wide font-bold uppercase tracking-wider text-white/90 text-center mt-6 text-xs drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]">Excellence is not an act, but a habit.</p>
          </div>
        </div>
      </ScrollSection>

      <ScrollSection progress={scrollYProgress} start={0.25} end={0.5} title="OUR SERVICES">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl w-full mx-auto">
            <div className="backdrop-blur-md bg-white/50 p-6 rounded-2xl border border-white/60 shadow-xl flex flex-col items-center text-center">
                <div className="text-3xl mb-4">🌐</div>
                <h3 className="text-[#1a1a1a] font-wide font-bold text-base mb-3">STATIC WEBSITES</h3>
                <p className="text-gray-800 font-sans text-xs leading-relaxed">
                    Beautiful, blazing-fast landing pages with flawless SEO. Engineered to establish ironclad brand authority, load instantly globally, and maximize user conversion from the first click.
                </p>
            </div>
            <div className="backdrop-blur-md bg-white/50 p-6 rounded-2xl border border-white/60 shadow-xl flex flex-col items-center text-center border-t-4 border-t-[#2d52a3]">
                <div className="text-3xl mb-4">⚡</div>
                <h3 className="text-[#1a1a1a] font-wide font-bold text-base mb-3">WEB APPS</h3>
                <p className="text-gray-800 font-sans text-xs leading-relaxed">
                    Powerful platforms boasting custom admin dashboards, layered security, third-party API integration, real-time sync, and robust architectures designed to handle millions of queries.
                </p>
            </div>
            <div className="backdrop-blur-md bg-white/50 p-6 rounded-2xl border border-white/60 shadow-xl flex flex-col items-center text-center">
                <div className="text-3xl mb-4">🤖</div>
                <h3 className="text-[#1a1a1a] font-wide font-bold text-base mb-3">AI SOLUTIONS</h3>
                <p className="text-gray-800 font-sans text-xs leading-relaxed">
                    Seamless integration of Large Language Models, contextual predictive engines, autonomous chatbots, high-volume data pipelines, and robust RAG algorithms.
                </p>
            </div>
        </div>
      </ScrollSection>

      <ScrollSection progress={scrollYProgress} start={0.5} end={0.75} title="OUR APPROACH">
         <div className="backdrop-blur-md bg-white/50 p-8 md:p-12 rounded-3xl border border-white/60 shadow-2xl mx-auto max-w-4xl space-y-6 text-left">
             <div className="flex gap-4 items-start">
                 <span className="text-2xl font-wide font-bold text-[#2d52a3] leading-none">1</span>
                 <div>
                    <h4 className="text-base font-wide font-bold text-[#1a1a1a] mb-1">DISCOVERY & TARGETING</h4>
                    <p className="text-gray-800 font-sans text-[13px] md:text-sm">We aggressively analyze market dynamics and business metrics to map the optimal technical path before any engineering begins.</p>
                 </div>
             </div>
             <div className="flex gap-4 items-start">
                 <span className="text-2xl font-wide font-bold text-[#2d52a3] leading-none">2</span>
                 <div>
                    <h4 className="text-base font-wide font-bold text-[#1a1a1a] mb-1">PROTOTYPING & UX</h4>
                    <p className="text-gray-800 font-sans text-[13px] md:text-sm">We construct intelligent wireframes and model intricate user journeys to guarantee maximum retention and engagement density.</p>
                 </div>
             </div>
             <div className="flex gap-4 items-start">
                 <span className="text-2xl font-wide font-bold text-[#2d52a3] leading-none">3</span>
                 <div>
                    <h4 className="text-base font-wide font-bold text-[#1a1a1a] mb-1">A.I. & CLOUD ENG</h4>
                    <p className="text-gray-800 font-sans text-[13px] md:text-sm">We deploy pure, reliable software into auto-scaling cloud environments, fortified by adaptable artificial intelligence modules.</p>
                 </div>
             </div>
        </div>
      </ScrollSection>

      <ScrollSection progress={scrollYProgress} start={0.75} end={1.0} title="COMMENCE BUILD">
        <div className="backdrop-blur-md bg-white/50 p-10 md:p-14 rounded-3xl border border-white/60 shadow-2xl flex flex-col items-center mx-auto max-w-4xl">
          <p className="text-[#1a1a1a] text-xl md:text-2xl font-wide font-bold leading-relaxed mb-6 text-center uppercase tracking-tighter">
             The horizon belongs to <br/><span className="text-[#2d52a3] drop-shadow-md">those who invent it.</span>
          </p>
          <p className="text-[#444] text-sm md:text-base font-sans text-center max-w-xl">
             Explore our <span className="font-bold text-[#1a1a1a] border-b border-black">Pricing</span> to view tiers, or jump to <span className="font-bold text-[#1a1a1a] border-b border-black">Contact</span> to start.
          </p>
        </div>
      </ScrollSection>
    </>
  );
}
