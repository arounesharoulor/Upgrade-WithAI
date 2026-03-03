// src/components/Contact.jsx
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import Section from './Section';
import SectionHeader from './SectionHeader';

export default function Contact() {
  return (
    <Section id="contact" className="relative overflow-hidden bg-[#0a0e1f] py-24 md:py-32 text-green-200">
      <div className="max-w-5xl mx-auto text-center relative z-10">
        <SectionHeader
          eyebrow="Let's Talk"
          eyebrowClass="text-green-400"
          title="Get in Touch"
          
          highlightClass="text-green-300"
          subtitle="Fill out the form or use one of the quick contact options. We're responsive and ready to help."
          subtitleClass="text-green-200"
        />

        {/* contact form */}
        <motion.form
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="max-w-xl mx-auto grid grid-cols-1 gap-6 mb-16"
          onSubmit={e => e.preventDefault()}
        >
          <input
            type="text"
            placeholder="Your name"
            className="w-full px-4 py-3 rounded-lg bg-gray-900 border border-gray-700 text-green-100 focus:outline-none"
          />
          <input
            type="email"
            placeholder="Email address"
            className="w-full px-4 py-3 rounded-lg bg-gray-900 border border-gray-700 text-green-100 focus:outline-none"
          />
          <textarea
            placeholder="How can we help you?"
            rows={4}
            className="w-full px-4 py-3 rounded-lg bg-gray-900 border border-gray-700 text-green-100 focus:outline-none"
          />
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-500 px-6 py-3 rounded-lg font-semibold transition-all hover:scale-105"
          >
            Send Message
          </button>
        </motion.form>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="flex flex-col sm:flex-row gap-6 justify-center mb-16"
        >
          <a
            href="https://wa.me/918825802060?text=Hi%20UpgradeWithAIFolks%20team%20—%20let's%20talk%20about%20my%20project"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 px-10 py-5 rounded-xl font-bold text-lg shadow-xl shadow-green-900/30 transition-all hover:scale-105 flex items-center justify-center gap-3"
          >
            <span>Message on WhatsApp</span>
          </a>

          <a
            href="tel:+918825802060"
            className="border-2 border-cyan-600/60 hover:bg-cyan-950/30 px-10 py-5 rounded-xl font-bold text-lg transition-all hover:scale-105"
          >
            +91 88258 02060
          </a>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="text-lg text-green-200"
        >
          Or email us at{' '}
          <a
            href="mailto:admin@upgradewithaifolks.com"
            className="text-cyan-400 hover:text-cyan-300 underline transition-colors"
          >
            admin@upgradewithaifolks.com
          </a>
        </motion.p>
      </div>

      {/* Optional subtle background accent */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-1/4 left-10 text-8xl animate-pulse-slow">✦</div>
        <div className="absolute bottom-1/4 right-20 text-8xl animate-pulse-slow delay-1000">✦</div>
      </div>
    </Section>
  );
}