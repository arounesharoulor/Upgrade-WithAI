import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Services from '../components/Services'
import Pricing from '../components/Pricing'
import WhyUs from '../components/WhyUs'
import About from '../components/About'
import Contact from '../components/Contact'
import Footer from '../components/Footer'

function App() {
  return (
    <div className="bg-gradient-to-b from-[#0b0f1a] via-[#0f1629] to-[#0b0f1a] text-gray-100 min-h-screen w-full overflow-x-hidden">
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
    </div>
  )
}

export default App