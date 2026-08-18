import { useEffect, useState } from 'react';
import { Building2, Heart, Globe, Users } from 'lucide-react';

export default function Partners() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const partners = [
    {
      name: 'Humanity First Group',
      icon: Heart,
      description: 'Global humanitarian organization focused on disaster relief and sustainable development',
      established: '2005',
      focus: 'Emergency Relief'
    },
    {
      name: 'CareBridge Foundation',
      icon: Building2,
      description: 'Dedicated to healthcare access and medical support for underprivileged communities',
      established: '2010',
      focus: 'Healthcare'
    },
    {
      name: 'Hope & Unity Alliance',
      icon: Globe,
      description: 'International coalition working towards poverty alleviation and education',
      established: '2008',
      focus: 'Education'
    },
    {
      name: 'Community Hands Network',
      icon: Users,
      description: 'Grassroots organization empowering local communities through sustainable programs',
      established: '2012',
      focus: 'Community Development'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % partners.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [partners.length]);

  return (
    <section className="w-full overflow-hidden bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-7xl mx-auto">
        <div className="text-center mb-12 md:mb-16 space-y-4">
          <div className="inline-block px-4 py-2 bg-teal-100 text-teal-700 rounded-full text-sm font-semibold">
            Our Network
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900">
            Partner Organizations
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Working together with trusted NGOs to amplify our impact and reach more communities
          </p>
        </div>

        <div className="relative h-[22rem] sm:h-[26rem] md:h-[30rem] mb-8">
          {partners.map((partner, index) => {
            const isActive = index === currentIndex;
            const isPrev = index === (currentIndex - 1 + partners.length) % partners.length;
            const isNext = index === (currentIndex + 1) % partners.length;

            let positionClass = 'opacity-0 scale-75 z-0';
            if (isActive) {
              positionClass = 'opacity-100 scale-100 z-20 translate-x-0';
            } else if (isPrev) {
              positionClass = 'opacity-30 scale-90 z-10 -translate-x-1/3';
            } else if (isNext) {
              positionClass = 'opacity-30 scale-90 z-10 translate-x-1/3';
            }

            return (
              <div
                key={index}
                className={`absolute inset-0 transition-all duration-700 ease-in-out ${positionClass}`}
              >
                <div className="h-full mx-auto w-full max-w-2xl px-2 sm:px-0">
                  <div className="h-full bg-gradient-to-br from-emerald-50 via-blue-50 to-teal-50 rounded-3xl shadow-2xl p-5 sm:p-8 flex flex-col items-center justify-center space-y-5 sm:space-y-6 border-2 border-emerald-100">
                    <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-emerald-500 to-blue-500 rounded-3xl flex items-center justify-center rotate-6 hover:rotate-12 transition-transform">
                      <partner.icon className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
                    </div>

                    <div className="text-center space-y-3 sm:space-y-4">
                      <h3 className="text-2xl sm:text-3xl font-bold text-gray-900">
                        {partner.name}
                      </h3>

                      <p className="text-sm sm:text-lg text-gray-600 max-w-xl leading-relaxed">
                        {partner.description}
                      </p>

                      <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-6 pt-2 sm:pt-4">
                        <div className="text-center">
                          <p className="text-xs sm:text-sm text-gray-500">Established</p>
                          <p className="text-base sm:text-lg font-bold text-emerald-600">{partner.established}</p>
                        </div>
                        <div className="hidden sm:block w-px h-10 bg-gray-300" />
                        <div className="text-center">
                          <p className="text-xs sm:text-sm text-gray-500">Focus Area</p>
                          <p className="text-base sm:text-lg font-bold text-blue-600">{partner.focus}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex justify-center gap-3">
          {partners.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`transition-all duration-300 rounded-full ${
                index === currentIndex
                  ? 'w-12 h-3 bg-gradient-to-r from-emerald-600 to-blue-600'
                  : 'w-3 h-3 bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-gray-600 text-lg mb-6">
          
          
          </p>
        </div>
      </div>
    </section>
  );
}
