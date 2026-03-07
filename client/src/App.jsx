// src/App.jsx
import { useState } from 'react';
import Navbar from '../components/Navbar';
import IntroScreen from '../components/IntroScreen'; // ← must import this
import Hero from '../components/Hero';
import About from '../components/About';
import Services from '../components/Services';
import Pricing from '../components/Pricing';
import WhyUs from '../components/WhyUs';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

function App() {
  const [showMainContent, setShowMainContent] = useState(false);

  const handleEnterExperience = () => {
    setShowMainContent(true);
  };

  return (
    <div className="bg-[#0a0e1f] text-gray-100 min-h-screen w-full overflow-x-hidden">
      {!showMainContent ? (
        <IntroScreen onEnter={handleEnterExperience} />
      ) : (
        <>
          <Navbar />
          <main className="w-full">
            <Hero />
            <About />
            <Services />
            <Pricing />
            <WhyUs />
            <Contact />
          </main>
          <Footer />
        </>
      )}
    </div>
  );
}

export default App;