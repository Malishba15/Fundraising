import React, { useState, useEffect, useRef } from 'react';
import { Instagram, Mail, Phone, ArrowUp } from 'lucide-react';
import logo from '../logo.png';

export default function Footer() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isInside, setIsInside] = useState(false);
  const [hideFollower, setHideFollower] = useState(false);
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (footerRef.current) {
        const rect = footerRef.current.getBoundingClientRect();
        setMousePos({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const scrollToTop = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFooterClick = () => {
    if (!hideFollower) {
      document.getElementById('donation')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const interactiveHandlers = {
    onMouseEnter: () => setHideFollower(true),
    onMouseLeave: () => setHideFollower(false),
    onClick: (e: React.MouseEvent) => e.stopPropagation(),
  };

  return (
    <footer 
      id= "footer"
      ref={footerRef}
      onMouseEnter={() => setIsInside(true)}
      onMouseLeave={() => setIsInside(false)}
      onClick={handleFooterClick}
      className={`relative bg-emerald-50 py-24 px-6 md:px-12 border-t border-emerald-100 overflow-hidden ${
        isInside && !hideFollower ? 'cursor-none' : 'cursor-auto'
      }`}
    >
      
      <div 
        className={`pointer-events-none absolute z-50 transition-all duration-200 ease-out ${
          isInside && !hideFollower ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
        }`}
        style={{
          left: mousePos.x,
          top: mousePos.y,
          transform: 'translate(-50%, -50%)',
        }}
      >
        <div className="px-6 py-2.5 bg-emerald-600 text-white rounded-full text-xs font-bold tracking-wide shadow-xl whitespace-nowrap animate-pulse">
          Donate Now
        </div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid md:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          <div className="md:col-span-5 space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-white rounded-full shadow-md overflow-hidden flex-shrink-0 border-2 border-emerald-100 flex items-center justify-center">
                <img 
                  src={logo}
                  alt="Dastarkhan-e-Amal Logo" 
                  className="w-full h-full object-cover"
                  onError={(e) => { e.currentTarget.style.display = 'none'; }}
                />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold text-gray-900 tracking-tight">Dastarkhan-e-Amal</span>
                <span className="text-xs font-bold text-emerald-600 tracking-wider uppercase mt-0.5">Every Plate Matters</span>
              </div>
            </div>
            
            <p className="text-sm text-gray-600 leading-relaxed max-w-sm">
              Dedicated to serving humanity with compassion and integrity during Ramzan and beyond. Join us in making a difference.
            </p>

            <div className="flex gap-3 pt-4">
              <a 
                {...interactiveHandlers}
                href="https://www.instagram.com/dastar.khawane.amal/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-emerald-500 hover:text-white transition-all shadow-sm text-gray-600"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <div className="w-10 h-10 bg-white/50 rounded-full flex items-center justify-center text-gray-400 cursor-not-allowed shadow-sm">
                <span className="text-base font-bold font-serif italic">f</span>
              </div>
            </div>
          </div>

          <div className="md:col-span-3 space-y-6 lg:pl-8">
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest">Quick Links</h3>
            <ul className="space-y-3 text-sm text-gray-600">
              <li>
                <a {...interactiveHandlers} href="#hero" className="hover:text-emerald-600 transition-colors font-medium">Home</a>
              </li>
              <li>
                <a {...interactiveHandlers} href="#about" className="hover:text-emerald-600 transition-colors font-medium">About Us</a>
              </li>
              <li>
                <a {...interactiveHandlers} href="#what-we-do" className="hover:text-emerald-600 transition-colors font-medium">Our Mission</a>
              </li>
              <li>
                <a {...interactiveHandlers} href="#donation" className="hover:text-emerald-600 transition-colors font-medium">Zakat & Sadaqah</a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-4 space-y-6">
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest">Get In Touch</h3>
            
            <div className="space-y-4">
              <div {...interactiveHandlers} className="flex items-center gap-3 group cursor-pointer w-max">
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center group-hover:bg-emerald-500 group-hover:text-white transition-all text-emerald-600 shadow-sm">
                  <Mail className="w-3.5 h-3.5" />
                </div>
                <span className="text-sm text-gray-600 font-medium group-hover:text-emerald-600 transition-colors">info@dastarkhan.org</span>
              </div>

              <div {...interactiveHandlers} className="flex items-center gap-3 group cursor-pointer w-max">
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center group-hover:bg-emerald-500 group-hover:text-white transition-all text-emerald-600 shadow-sm">
                  <Phone className="w-3.5 h-3.5" />
                </div>
                <span className="text-sm text-gray-600 font-medium group-hover:text-emerald-600 transition-colors">+92 300 1234567</span>
              </div>
            </div>
          </div>

        </div>

        <div className="pt-8 mt-16 border-t border-emerald-200/60 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-xs text-gray-500 font-medium">
            © {new Date().getFullYear()} Dastarkhawan-e-Amal. All rights reserved.
          </p>
          
          <button 
            {...interactiveHandlers}
            onClick={scrollToTop}
            className="group flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-500 hover:text-emerald-600 transition-all"
          >
            Back to Top
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center group-hover:-translate-y-1 group-hover:bg-emerald-100 transition-all shadow-sm">
              <ArrowUp className="w-3.5 h-3.5" />
            </div>
          </button>
        </div>

      </div>
    </footer>
  );
}