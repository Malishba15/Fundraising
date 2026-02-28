import { useState } from 'react';
import Hero from './components/Hero';
import About from './components/About';
import WhatWeDo from './components/WhatWeDo';
import Partners from './components/Partners';
import JoinUs from './components/JoinUs';
import Donation from './components/Donation';
import Footer from './components/Footer';

function App() {
  const [showSuccess, setShowSuccess] = useState(false);
  
  // Controls the form state (Donate/Green vs Volunteer/Blue)
  const [activeTab, setActiveTab] = useState<'donate' | 'volunteer'>('donate');

  // Master function for navigation and tab switching
  const handleScrollToForm = (tab: 'donate' | 'volunteer') => {
    setActiveTab(tab);
    
    const section = document.getElementById('donation');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 via-white to-blue-50">
      
      {/* 1. Hero Section: Branding & Initial CTAs */}
      <Hero 
        onDonateClick={() => handleScrollToForm('donate')} 
        onVolunteerClick={() => handleScrollToForm('volunteer')}
      />
      
      {/* 2. Narrative: Who We Are & Our Commitment */}
      <About />
      
      {/* 3. Packages: Specific Ramadan Feeding Programs */}
      <WhatWeDo onDonateClick={() => handleScrollToForm('donate')} />
      
      {/* 4. Social Proof: Partner Organizations */}
      <Partners />
      
      {/* 5. The Main Interactive Form (Destination for all buttons) */}
      <Donation 
        showSuccess={showSuccess} 
        setShowSuccess={setShowSuccess} 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* 6. FINAL CALL TO ACTION: The Join Us section */}
      <JoinUs onVolunteerClick={() => handleScrollToForm('volunteer')} />
      
      {/* 7. END: Minimalist Footer */}
      <Footer />
    </div>
  );
}

export default App;