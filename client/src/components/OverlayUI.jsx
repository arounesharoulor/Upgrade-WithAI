import React from 'react';
import { motion, AnimatePresence, useTransform } from 'framer-motion';

const pricingPlans = [
  { 
    title: "STATIC WEBSITE / PORTFOLIO", 
    price: "₹12,499 - ₹18,999", 
    desc: "Domain, Premium Hosting, 5–8 Pages, Essential SEO, Ultra-Responsive UI, Built for Brand Credibility."
  },
  { 
    title: "MEDIUM WEB APP / E-COMMERCE", 
    price: "Custom Quote", 
    desc: "Authentication, Content Management System, Database Architecting, Payment Integrations, Custom Admin Dashboards." 
  },
  { 
    title: "ADVANCED APP + A.I.", 
    price: "Scope-based", 
    desc: "Large Language Models Integration, Vector Databases, Retrieval-Augmented Generation (RAG), Complex Cloud Deployments." 
  },
];

export default function OverlayUI({ view, setView, scrollYProgress }) {
  // Map scroll progress to translate values and text colors
  // Starts centered (assuming ~3rem padding in md, average offset calculation)
  const scrollX = useTransform(scrollYProgress, [0, 0.05], ["calc(50vw - 50% - 2.5rem)", "0px"]);
  const scrollY = useTransform(scrollYProgress, [0, 0.05], ["calc(50vh - 50% - 2.5rem)", "0px"]);
  const scrollScale = useTransform(scrollYProgress, [0, 0.05], [1.2, 1]);
  
  // Dark background starts at 0, goes light at 0.25
  const h1ScrollColor = useTransform(scrollYProgress, [0, 0.05], ["#ffffff", "#1a1a1a"]);
  const h2ScrollColor = useTransform(scrollYProgress, [0, 0.05], ["#e2e8f0", "#374151"]);

  return (
    <div className="fixed inset-0 z-50 pointer-events-none flex flex-col p-6 md:p-12 h-screen w-screen overflow-hidden">
      
      {/* Top Header / Logo + Nav */}
      <div className="flex justify-between items-start pointer-events-auto shrink-0 z-50 relative">
        <motion.div 
          className="flex flex-col cursor-pointer origin-top-left" 
          onClick={() => setView('ROAD')}
          style={{
            x: view === 'ROAD' ? scrollX : "0px",
            y: view === 'ROAD' ? scrollY : "0px",
            scale: view === 'ROAD' ? scrollScale : 1
          }}
        >
            <motion.h1 
              style={{ color: view === 'ROAD' ? h1ScrollColor : '#1a1a1a' }}
              className="font-wide text-3xl md:text-5xl font-bold tracking-tighter hover:opacity-80 transition-opacity drop-shadow-sm"
            >
               UPGRADE WITH AI
            </motion.h1>
            <motion.h2 
              style={{ color: view === 'ROAD' ? h2ScrollColor : '#374151' }}
              className="text-xs md:text-sm font-sans tracking-[0.2em] mt-2 uppercase font-medium"
            >
               High-Performance Web & Intelligent Solutions
            </motion.h2>
        </motion.div>

        {/* Navigation */}
        <nav className="flex flex-col space-y-1">
          {['ROAD', 'PRICING', 'CONTACT'].map((item) => (
            <div 
              key={item} 
              onClick={(e) => {
                  e.preventDefault();
                  setView(item);
                  if (item !== 'ROAD') window.scrollTo(0, 0); // Reset scroll position when leaving 3D
              }}
              className={`nav-link ${view === item ? 'active text-2xl scale-[1.12]' : ''}`}
            >
              {item}
            </div>
          ))}
        </nav>
      </div>

      {/* Main Content Areas based on View */}
      <div className="flex-1 w-full h-full relative pointer-events-none flex items-center justify-center pt-8 z-40">
        <AnimatePresence mode="wait">
            {view === 'PRICING' && (
                <motion.div 
                   key="pricing"
                   initial={{ opacity: 0, y: 30 }} 
                   animate={{ opacity: 1, y: 0 }} 
                   exit={{ opacity: 0, y: -30 }}
                   transition={{ duration: 0.6, ease: "easeOut" }}
                   className="w-full max-w-6xl h-full flex flex-col pointer-events-auto pt-4 px-4 pb-20 overflow-y-auto hide-scrollbar"
                >
                    <div className="mb-10 w-full">
                       <h3 className="text-[#2d52a3] font-wide text-4xl mb-4 tracking-wider">MODULAR PRICING TIERS</h3>
                       <p className="text-lg font-sans text-gray-800 max-w-4xl leading-relaxed">
                           Whether you need a high-impact presence or a massive database-driven platform intertwined with an enterprise LLM, we deliver uncompromising quality at fair prices. Every plan is meticulously engineered and includes post-launch technical support to guarantee a smooth transition into production. Prices strictly depend on system complexity and operational scope.
                       </p>
                    </div>

                    <div className="border-t border-gray-400/50 mb-12">
                        {pricingPlans.map((p, i) => (
                            <div key={i} onClick={() => window.open(`https://wa.me/918825802060?text=I'm%20interested%20in%20estimating%20the%20${encodeURIComponent(p.title)}`, '_blank')} className="py-8 border-b border-gray-400/50 flex flex-col md:flex-row md:justify-between md:items-center hover:bg-black/5 transition duration-300 cursor-pointer group px-4 rounded-xl">
                               <div className="flex flex-col md:w-[70%]">
                                   <span className="font-bold text-2xl md:text-3xl font-sans group-hover:pl-4 transition-all duration-300 group-hover:text-[#2d52a3] uppercase tracking-tight">{p.title}</span>
                                   <span className="text-md font-sans text-gray-600 mt-2 leading-relaxed">{p.desc}</span>
                               </div>
                               <span className="font-wide font-bold text-xl md:text-2xl mt-4 md:mt-0 text-[#2d52a3] md:text-right whitespace-nowrap">{p.price}</span>
                            </div>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm font-sans">
                        <div className="bg-white/40 p-6 rounded-2xl border border-white/60">
                            <strong className="block text-[#1a1a1a] mb-2 text-base font-wide">TECH STACK</strong>
                            We exclusively deploy on modern, highly-scalable stacks including Next.js, React, Node.js, Python, PostgreSQL, and Vercel/AWS infrastructures.
                        </div>
                        <div className="bg-white/40 p-6 rounded-2xl border border-white/60">
                            <strong className="block text-[#1a1a1a] mb-2 text-base font-wide">DELIVERY TIMES</strong>
                            Static builds typically launch within 1–2 weeks. Bespoke web applications and AI tools map dynamically based on functional complexity constraints.
                        </div>
                        <div className="bg-white/40 p-6 rounded-2xl border border-white/60">
                            <strong className="block text-[#1a1a1a] mb-2 text-base font-wide">MAINTENANCE</strong>
                            Custom Retainer Models available for persistent system updates, continuous AI model tuning, security patching, and server monitoring.
                        </div>
                    </div>
                </motion.div>
            )}

            {view === 'CONTACT' && (
                <motion.div 
                   key="contact"
                   initial={{ opacity: 0, scale: 0.95 }} 
                   animate={{ opacity: 1, scale: 1 }} 
                   exit={{ opacity: 0, scale: 1.05 }}
                   transition={{ duration: 0.6, ease: "easeOut" }}
                   className="max-w-5xl w-full mx-auto pointer-events-auto h-full overflow-y-auto hide-scrollbar pt-10 pb-20 px-4 flex flex-col items-center"
                >
                    <div className="text-center w-full mb-12">
                       <h3 className="text-[#2d52a3] font-wide font-bold text-4xl md:text-5xl lg:text-6xl tracking-wider mb-6">INITIATE CONTACT</h3>
                       <p className="text-xl md:text-3xl leading-relaxed text-[#1a1a1a] font-sans font-light">
                          Ready to disrupt your industry vertical? Reach out to our engineering team to construct your next <span className="font-wide font-bold text-[#2d52a3]">game-changing application.</span>
                       </p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl mb-16">
                        <div className="backdrop-blur-sm bg-black/5 p-10 rounded-3xl border border-black/10 flex flex-col items-center justify-center hover:bg-black/10 transition-colors text-center w-full">
                           <div className="text-5xl mb-6">📱</div>
                           <h4 className="font-wide font-bold text-xl mb-3 tracking-widest text-[#1a1a1a]">DIRECT LINE</h4>
                           <p className="font-sans text-gray-700 text-base mb-8 max-w-[280px]">The absolute fastest method for acquiring rough project estimations. Available for rapid brainstorming logic and high-level consultation.</p>
                           <a href="https://wa.me/918825802060" target="_blank" rel="noreferrer" className="w-full py-5 bg-[#1a1a1a] text-white rounded-full font-wide font-bold text-sm hover:bg-[#2d52a3] transition-all duration-300 tracking-widest shadow-xl hover:shadow-2xl">
                             WHATSAPP / +918825802060
                           </a>
                        </div>
                        <div className="backdrop-blur-sm bg-white/40 p-10 rounded-3xl border border-white/60 flex flex-col items-center justify-center hover:bg-white/60 transition-colors text-center w-full shadow-lg">
                           <div className="text-5xl mb-6">📧</div>
                           <h4 className="font-wide font-bold text-xl mb-3 tracking-widest text-[#1a1a1a]">BUSINESS INQUIRY</h4>
                           <p className="font-sans text-gray-700 text-base mb-8 max-w-[280px]">Transmit your formal Request for Proposal (RFP) or deep technical scope details. Expect a clinically detailed response within 24 hours.</p>
                           <a href="mailto:admin@upgradewithaifolks.com" className="w-full py-5 border-2 border-[#1a1a1a] text-[#1a1a1a] bg-transparent rounded-full font-wide font-bold text-[11px] hover:bg-[#1a1a1a] hover:text-white transition-all duration-300 tracking-[0.2em] overflow-hidden whitespace-nowrap">
                             ADMIN@UPGRADEWITHAIFOLKS.COM
                           </a>
                        </div>
                    </div>

                    {/* Additional Company Info */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center text-sm font-sans text-gray-700 w-full max-w-4xl pt-8 border-t border-gray-400/40">
                        <div className="flex flex-col items-center">
                            <strong className="text-gray-900 block mb-2 font-wide text-base">GLOBAL REACH</strong>
                            <span className="text-base text-gray-600">Servicing diverse clients worldwide through highly calibrated asynchronous workflows.</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <strong className="text-gray-900 block mb-2 font-wide text-base">OPERATING BOUNDS</strong>
                            <span className="text-base text-gray-600">Monday - Friday<br/>09:00 - 19:00 IST<br/>Weekend Emergency Retainers.</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <strong className="text-gray-900 block mb-2 font-wide text-base">HEADQUARTERS</strong>
                            <span className="text-base text-gray-600">Chennai, Tamil Nadu, India<br/>100% Remote Deployment Capacity.</span>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
      </div>

      {/* Socials - Bottom Right */}
      <div className="absolute bottom-6 right-6 md:bottom-12 md:right-12 pointer-events-auto flex items-end z-50">
         <div className="flex space-x-3">
             <a href="mailto:admin@upgradewithaifolks.com" className="w-14 h-14 rounded-full border-2 border-gray-400/80 flex items-center justify-center font-wide font-bold text-gray-700 hover:bg-[#1a1a1a] hover:text-white hover:border-[#1a1a1a] transition-all duration-300 shadow-md">
                 EM
             </a>
             <a href="https://wa.me/918825802060" target="_blank" rel="noreferrer" className="w-14 h-14 rounded-full border-2 border-gray-400/80 flex items-center justify-center font-wide font-bold text-gray-700 hover:bg-[#1a1a1a] hover:text-white hover:border-[#1a1a1a] transition-all duration-300 shadow-md">
                 WA
             </a>
         </div>
      </div>
    </div>
  );
}
