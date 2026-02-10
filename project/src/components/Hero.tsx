import { Heart, Sparkles } from 'lucide-react';

interface HeroProps {
  onDonateClick: () => void;
}

export default function Hero({ onDonateClick }: HeroProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4">
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/10 via-blue-600/10 to-teal-600/10" />

      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-400/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto text-center space-y-8 animate-fade-in">
        <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/80 backdrop-blur-sm rounded-full shadow-lg">
          <Sparkles className="w-5 h-5 text-emerald-600" />
          <span className="text-sm font-semibold text-emerald-800">Ramzan 2026 Campaign</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold text-gray-900 leading-tight">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-blue-600">
            Rahmat Relief Foundation
          </span>
        </h1>

        <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
          Bringing Hope and Compassion to Those in Need This Ramzan
        </p>

        <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
          Join us in our mission to provide food, clothing, and essential support to underprivileged families during the blessed month of Ramzan. Every contribution makes a real difference.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
          <button
            onClick={onDonateClick}
            className="group relative px-8 py-4 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white rounded-full font-semibold text-lg shadow-xl hover:shadow-2xl hover:scale-105 transform transition-all duration-300 flex items-center gap-2"
          >
            <Heart className="w-6 h-6 group-hover:scale-110 transition-transform" />
            Donate Now
            <span className="absolute inset-0 rounded-full bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>

          <button
            onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-4 bg-white text-emerald-700 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl hover:scale-105 transform transition-all duration-300 border-2 border-emerald-200"
          >
            Learn More
          </button>
        </div>

        <div className="pt-8 flex flex-wrap justify-center gap-8 text-center">
          <div className="space-y-1">
            <p className="text-3xl font-bold text-emerald-600">10,000+</p>
            <p className="text-gray-600">Families Helped</p>
          </div>
          <div className="space-y-1">
            <p className="text-3xl font-bold text-blue-600">500+</p>
            <p className="text-gray-600">Volunteers</p>
          </div>
          <div className="space-y-1">
            <p className="text-3xl font-bold text-teal-600">95%</p>
            <p className="text-gray-600">Direct Impact</p>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-emerald-600 rounded-full flex justify-center">
          <div className="w-1.5 h-3 bg-emerald-600 rounded-full mt-2 animate-scroll" />
        </div>
      </div>
    </section>
  );
}
