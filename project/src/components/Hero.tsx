import { Heart, Sparkles, UserPlus, Menu } from 'lucide-react';
import logo from '../logo.png';

interface HeroProps {
  onDonateClick: () => void;
  onVolunteerClick: () => void;
}

export default function Hero({ onDonateClick, onVolunteerClick }: HeroProps) {
  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden px-4">
      
      {/* --- HEADER --- */}
      <header className="absolute top-0 left-0 right-0 z-50 px-6 py-4 md:px-12 md:py-5 flex items-center justify-between">
        
        <div className="flex items-center gap-3">
          <img 
            src={logo} 
            alt="Dastarkhawan-e-Amal Logo" 
            className="h-10 md:h-12 w-auto object-contain drop-shadow-sm"
          />
          <div>
            <h1 className="text-base md:text-lg font-bold text-gray-900 tracking-tight leading-none">
              Dastarkhawan-e-Amal
            </h1>
            <p className="text-[9px] font-black text-emerald-600 tracking-[0.2em] uppercase mt-0.5">
              Every Plate Matters
            </p>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-10 text-[11px] font-bold text-gray-500 uppercase tracking-[0.2em]">
          <a href="#about" className="hover:text-emerald-600 transition-colors">About</a>
          {/* Linked to #what-we-do section */}
          <a href="#what-we-do" className="hover:text-emerald-600 transition-colors">Relief Programs</a>
          {/* Linked to #footer section */}
          <a href="#footer" className="hover:text-emerald-600 transition-colors">Contact</a>
        </nav>

        <div className="flex items-center gap-4">
          <button className="md:hidden p-2 text-gray-600 hover:text-emerald-600 transition-colors">
            <Menu className="w-5 h-5" />
          </button>
          <button 
            onClick={onDonateClick}
            className="hidden md:flex px-5 py-2 bg-emerald-600 text-white rounded-full text-[10px] font-black tracking-[0.15em] hover:bg-emerald-700 transition-all shadow-sm"
          >
            DONATE
          </button>
        </div>
      </header>

      {/* --- BACKGROUND EFFECTS --- */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/10 via-blue-600/10 to-teal-600/10 pointer-events-none" />
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-400/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      {/* --- MAIN CONTENT --- */}
      <div className="flex-grow flex items-center justify-center px-4 pt-32 md:pt-40 relative z-10">
        <div className="max-w-5xl mx-auto text-center space-y-10 animate-fade-in-up">
          
          <div className="inline-flex items-center gap-2 px-5 py-2 bg-white/90 backdrop-blur-md rounded-full shadow-sm border border-emerald-100/50 mx-auto">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">Ramzan 2026 Campaign</span>
          </div>

          <h2 className="text-5xl md:text-7xl font-black text-gray-900 leading-tight tracking-tight">
            Nourishing Lives, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">
              Sharing Blessings.
            </span>
          </h2>

          <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto leading-relaxed font-medium">
            Join Dastarkhan-e-Amal in providing essential food support to underprivileged families this holy month.
          </p>

          <div className="flex flex-col sm:flex-row gap-5 justify-center items-center pt-6">
            <button
              onClick={onDonateClick}
              className="group relative px-10 py-4 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white rounded-full font-bold text-sm tracking-widest shadow-xl hover:shadow-2xl hover:-translate-y-1 transform transition-all duration-300 flex items-center gap-3"
            >
              <Heart className="w-5 h-5 group-hover:scale-110 transition-transform" />
              MAKE A DONATION
            </button>

            <button
              onClick={onVolunteerClick}
              className="group px-10 py-4 bg-white text-emerald-700 rounded-full font-bold text-sm tracking-widest shadow-md hover:shadow-lg hover:-translate-y-1 transform transition-all duration-300 border-2 border-emerald-50 flex items-center gap-3 hover:border-emerald-200"
            >
              <UserPlus className="w-5 h-5 group-hover:scale-110 transition-transform" />
              JOIN AS VOLUNTEER
            </button>
          </div>

          <div className="pt-12 flex flex-wrap justify-center gap-12 md:gap-16 text-center border-t border-gray-100/50 mt-8 pb-16">
            <div className="space-y-1">
              <p className="text-4xl font-black text-gray-900">10k+</p>
              <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Families Helped</p>
            </div>
            <div className="space-y-1">
              <p className="text-4xl font-black text-gray-900">500+</p>
              <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Volunteers</p>
            </div>
            <div className="space-y-1">
              <p className="text-4xl font-black text-gray-900">95%</p>
              <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Direct Impact</p>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 animate-bounce pointer-events-none">
        <div className="w-5 h-9 border-2 border-gray-300 rounded-full flex justify-center p-1">
          <div className="w-1 h-2 bg-gray-400 rounded-full animate-scroll-down" />
        </div>
      </div>
    </section>
  );
}