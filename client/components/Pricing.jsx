// src/components/Pricing.jsx
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { MdLocalOffer, MdStars, MdTrendingUp, MdCheck } from 'react-icons/md';
import Section from './Section';
import SectionHeader from './SectionHeader';
import { useState } from 'react';

const plans = [
  {
    name: "Static Website",
    icon: MdLocalOffer,
    price: "₹12,999",
    period: "one-time",
    popular: false,
    color: "from-purple-600 to-purple-500",
    features: [
      "Domain Setup",
      "Web Hosting",
      "Up to 5–8 Pages",
      "Business Logo Design",
      "SEO Friendly Content",
      "Mobile Responsive",
      "WhatsApp Integration",
      "Social Media Setup"
    ],
    cta: "Get Started →"
  },
  {
    name: "Medium Web App",
    icon: MdStars,
    price: "Custom Quote",
    period: "",
    popular: true,
    color: "from-cyan-600 to-cyan-500",
    features: [
      "Everything in Static",
      "Admin Dashboard",
      "Custom CMS",
      "API Integration",
      "Database Integration",
      "User Authentication",
      "Content Management",
      "Real-time Features"
    ],
    cta: "Contact Us →"
  },
  {
    name: "Advanced Application",
    icon: MdTrendingUp,
    price: "Scope-based",
    period: "",
    popular: false,
    color: "from-pink-600 to-pink-500",
    features: [
      "Everything in Medium",
      "Custom AI Features",
      "Payment Gateway Integration",
      "Multi-User & Role-Based Auth",
      "Cloud Deployment (AWS/GCP)",
      "CI/CD Pipeline",
      "Advanced Analytics",
      "Dedicated Support"
    ],
    cta: "Let's Discuss →"
  }
];

export default function Pricing() {
  const [expanded, setExpanded] = useState(null);

  return (
    <Section id="pricing" className="bg-gradient-to-b from-[#0a0e1f] to-[#0f1629] py-24 md:py-32">
      {/* Header */}
      <div className="text-center mb-20 md:mb-28">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-4"
        >
          <SectionHeader
            eyebrow="Flexible Plans"
            eyebrowClass="text-cyan-400"
            title="Smart Pricing"
            highlight="That Scales"
            highlightClass="text-cyan-300"
            subtitle="Pick a plan that fits your project. All plans are fully customizable."
            subtitleClass="text-gray-300"
          />
        </motion.div>
      </div>

      {/* Horizontal scrollable cards layout */}
      <div className="space-y-6">
        {plans.map((plan, i) => {
          const isExpanded = expanded === i;
          const isPopular = plan.popular;

          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.6 }}
              className={`rounded-2xl overflow-hidden border transition-all duration-300 ${
                isPopular
                  ? 'border-cyan-600/70 bg-gradient-to-r from-cyan-950/40 via-cyan-900/20 to-transparent shadow-2xl shadow-cyan-900/40'
                  : 'border-gray-800/50 bg-gradient-to-r from-gray-900/40 to-transparent'
              }`}
            >
              {/* Main header row */}
              <button
                onClick={() => setExpanded(isExpanded ? null : i)}
                className="w-full p-6 md:p-8 flex items-center justify-between hover:bg-white/5 transition-colors"
              >
                <div className="flex items-center gap-6 flex-1 text-left">
                  {/* Icon */}
                  <motion.div
                    className={`p-4 rounded-xl bg-gradient-to-br ${plan.color} flex-shrink-0`}
                    whileHover={{ scale: 1.1 }}
                  >
                    <plan.icon size={32} className="text-white" />
                  </motion.div>

                  {/* Plan info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="text-xl md:text-2xl font-bold">{plan.name}</h3>
                      {isPopular && (
                        <span className="px-4 py-1 bg-gradient-to-r from-cyan-600 to-cyan-500 text-white text-xs font-bold rounded-full">
                          MOST POPULAR
                        </span>
                      )}
                    </div>
                    <p className="text-gray-400 text-sm md:text-base">
                      {plan.features.length} key features included
                    </p>
                  </div>

                  {/* Price */}
                  <div className="text-right flex-shrink-0">
                    <div className="text-3xl md:text-4xl font-black text-cyan-400">
                      {plan.price}
                    </div>
                    {plan.period && (
                      <p className="text-gray-400 text-sm">{plan.period}</p>
                    )}
                  </div>
                </div>

                {/* Expand icon */}
                <motion.div
                  animate={{ rotate: isExpanded ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="ml-4 flex-shrink-0"
                >
                  <span className="text-2xl text-cyan-400">⌄</span>
                </motion.div>
              </button>

              {/* Expandable content */}
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{
                  opacity: isExpanded ? 1 : 0,
                  height: isExpanded ? 'auto' : 0,
                }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden border-t border-gray-800/50"
              >
                <div className="p-6 md:p-8 bg-white/5">
                  {/* Features grid */}
                  <div className="grid md:grid-cols-2 gap-4 mb-8">
                    {plan.features.map((feature, idx) => (
                      <motion.div
                        key={feature}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        className="flex items-center gap-3"
                      >
                        <MdCheck className={`text-lg flex-shrink-0 bg-gradient-to-br ${plan.color} rounded-full p-1 w-5 h-5`} />
                        <span className="text-gray-300">{feature}</span>
                      </motion.div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    href={`https://wa.me/918825802060?text=Hi!%20I'm%20interested%20in%20the%20${encodeURIComponent(plan.name)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-block py-3 px-8 rounded-xl font-bold transition-all duration-300 bg-gradient-to-r ${plan.color} hover:shadow-lg`}
                  >
                    {plan.cta}
                  </motion.a>
                </div>
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </Section>
  );
}