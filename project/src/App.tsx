import { useState } from 'react';
import Hero from './components/Hero';
import About from './components/About';
import WhatWeDo from './components/WhatWeDo';
import Partners from './components/Partners';
import Donation from './components/Donation';
import Footer from './components/Footer';

function App() {
  const [showSuccess, setShowSuccess] = useState(false);

  const scrollToDonation = () => {
    document.getElementById('donation')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 via-white to-blue-50">
      <Hero onDonateClick={scrollToDonation} />
      <About />
      <WhatWeDo />
      <Partners />
      <Donation showSuccess={showSuccess} setShowSuccess={setShowSuccess} />
      <Footer />
    </div>
  );
}

export default App;
