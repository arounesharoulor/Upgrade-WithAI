import { motion } from 'framer-motion'; // eslint-disable-line no-unused-vars
import { useState, useEffect } from 'react';
import Section from './Section';
import ThreeScene from './ThreeScene';


export default function Hero() {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const services = [
    {
      icon: '🖥️',
      title: 'Static Websites',
      desc: 'Fast, SEO-optimized websites that establish your presence'
    },
    {
      icon: '⚡',
      title: 'Web Applications',
      desc: 'Powerful apps with dashboards, databases & real-time features'
    },
    {
      icon: '🧠',
      title: 'AI Solutions',
      desc: 'Smart automation with ML, chatbots & predictive analytics'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCardIndex((prevIndex) => (prevIndex + 1) % services.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [services.length]);

  return (
    <Section className="relative min-h-screen flex items-center justify-center pt-28 pb-20 overflow-hidden text-purple-200" id="hero">
      {/* 3D canvas + background gradient */}
      <div className="absolute inset-0">
        {/* gradient behind the 3D canvas */}
        <div className="absolute inset-0 -z-20 bg-gradient-to-br from-[#0a0e1f]/50 via-[#0f1629]/50 to-[#0a0e1f]/50" />
        <ThreeScene />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto text-center">
        <motion.h1
          initial={{ opacity: 0, y: 70 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
          className="text-3xl sm:text-4xl md:text-4xl lg:text-5xl font-black tracking-tight leading-none mb-10"
        >
          The Future Starts Here.
          <br className="sm:hidden" />
          <span className="bg-gradient-to-r from-cyan-400 via-cyan-300 to-purple-300 bg-clip-text text-transparent">
            Upgrade With AI Folks
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 1 }}
          className="text-base sm:text-lg md:text-xl text-purple-300 max-w-4xl mx-auto mb-14 leading-relaxed"
        >
          We craft high-performance websites, powerful web applications and intelligent AI solutions that drive real business growth — fast, secure, and future-ready.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 1 }}
          className="flex justify-center mb-16 min-h-[200px]"
        >
          <motion.div
            key={currentCardIndex}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-br from-cyan-950/30 to-purple-950/30 border border-cyan-500/30 hover:border-cyan-400/60 rounded-xl p-4 backdrop-blur transition-all hover:scale-105 max-w-xs"
          >
            <div className="text-4xl mb-2">{services[currentCardIndex].icon}</div>
            <h3 className="text-lg font-bold text-cyan-300 mb-2">{services[currentCardIndex].title}</h3>
            <p className="text-sm text-gray-300">{services[currentCardIndex].desc}</p>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1.2 }}
          className="grid grid-cols-3 gap-8 md:gap-16 max-w-4xl mx-auto text-center"
        >
          <div>
            <div className="text-4xl md:text-5xl font-black text-cyan-400">50+</div>
            <p className="mt-3 text-purple-200">Projects Delivered</p>
          </div>
          <div>
            <div className="text-4xl md:text-5xl font-black text-cyan-400">30+</div>
            <p className="mt-3 text-purple-200">Happy Clients</p>
          </div>
          <div>
            <div className="text-4xl md:text-5xl font-black text-cyan-400">99%</div>
            <p className="mt-3 text-purple-200">Satisfaction Rate</p>
          </div>
        </motion.div>
      </div>
    </Section>
  );
}