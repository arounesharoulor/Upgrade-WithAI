import React, { useState } from 'react';
import { motion } from 'framer-motion'; // eslint-disable-line no-unused-vars
import { MdWeb, MdCode, MdSmartToy } from 'react-icons/md';
import Section from './Section';
import SectionHeader from './SectionHeader';
import InfoCard from './InfoCard';

const services = [
  {
    title: "Static Websites",
    icon: MdWeb,
    description: "Beautiful, blazing-fast websites that establish your online presence. Perfect for businesses, portfolios, and personal brands.",
    features: [
      "Mobile Responsive",
      "SEO Optimized",
      "Lightning Fast",
      "Up to 5–8 Pages",
      "Custom Design",
      "WhatsApp Integration"
    ]
  },
  {
    title: "Web Applications",
    icon: MdCode,
    description: "Powerful, interactive applications with admin dashboards, real-time data, and seamless user experiences.",
    features: [
      "Custom CMS",
      "API Integration",
      "Database Driven",
      "User Authentication",
      "Admin Dashboard",
      "Real-time Features"
    ]
  },
  {
    title: "AI-Powered Solutions",
    icon: MdSmartToy,
    description: "Cutting-edge applications powered by AI — chatbots, intelligent automation, predictive analytics, and data-driven decision making.",
    features: [
      "AI Integration",
      "Smart Automation",
      "Chatbots & Assistants",
      "Predictive Analytics",
      "Natural Language Processing",
      "Custom AI Workflows"
    ]
  }
];

export default function Services() {
  const [active, setActive] = useState(0);

  // auto rotate tabs every 5 seconds
  React.useEffect(() => {
    const interval = setInterval(() => {
      setActive(prev => (prev + 1) % services.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Section id="services" className="bg-[#0a0e1f] py-24 md:py-32 text-cyan-200">
      <div className="text-center mb-16 md:mb-24">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-4">
          <SectionHeader
            eyebrow="What We Build"
            eyebrowClass="text-cyan-400"
            title="Explore Our Services"
            
            highlightClass="text-emerald-400"
            subtitle="Select a card to see more details and features for each offering."
            subtitleClass="text-gray-200"
          />
        </motion.div>
      </div>

      {/* tabs */}
      <div className="flex justify-center gap-4 mb-12">
        {services.map((svc, idx) => (
          <button
            key={idx}
            onClick={() => setActive(idx)}
            className={`px-6 py-3 rounded-full font-semibold transition-colors duration-200 focus:outline-none ${
              active === idx
                ? 'bg-emerald-500 text-black'
                : 'bg-gray-800 text-cyan-200 hover:bg-gray-700'
            }`}
          >
            {svc.title}
          </button>
        ))}
      </div>

      {/* active service details */}
      <motion.div
        key={active}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto text-center"
      >
        <InfoCard
          icon={React.createElement(services[active].icon, { size: 48 })}
          title={services[active].title}
        >
          <p className="text-cyan-100 mb-6 leading-relaxed">
            {services[active].description}
          </p>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-left text-gray-200">
            {services[active].features.map((f) => (
              <li key={f} className="flex items-start gap-2">
                <span className="text-emerald-400">•</span>
                <span>{f}</span>
              </li>
            ))}
          </ul>
        </InfoCard>
      </motion.div>

    </Section>
  );
}