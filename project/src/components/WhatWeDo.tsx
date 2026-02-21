import { Heart, Package, Utensils, Soup, ArrowRight } from 'lucide-react';

interface WhatWeDoProps {
  onDonateClick: () => void;
}

export default function WhatWeDo({ onDonateClick }: WhatWeDoProps) {
  const programs = [
    {
      id: 'ration',
      icon: Package,
      tagline: 'Feed a Family',
      title: 'The Last Plate – Ration Bag',
      price: '5,000',
      zakat: true,
      description: 'Ensure no one faces an empty plate. This bag provides essential staples for an entire family.',
      details: [
        'Atta (Flour): 10 KG',
        'Ghee/Oil: 2 KG',
        'Sugar & Pulses: 2 KG each',
        'Rice, Dates & Rooh Afza'
      ]
    },
    {
      id: 'plate',
      icon: Utensils,
      tagline: 'Blessed Meal',
      title: 'Individual Iftar Plate',
      price: '300',
      zakat: false,
      description: 'Provide a warm, nutritious meal to someone breaking their fast on the streets.',
      details: [
        'Chicken Biryani/Pulao',
        'Samosas & Pakoras',
        'Dates & Chilled Rooh Afza',
        'Fresh Seasonal Fruit'
      ]
    },
    {
      id: 'daig',
      icon: Soup,
      tagline: 'Community Feast',
      title: 'The Daig Distribution',
      price: '12,000',
      zakat: true,
      description: 'A grand gesture of kindness. One Daig feeds people in needy neighborhoods.',
      details: [
        'Menu: Chicken Biryani',
        'Includes Raita & Salad',
        'Perfect for Sadaqah Jariyah'
      ]
    }
  ];

  return (
    <section id="what-we-do" className="py-20 px-8 md:px-16 bg-white">
      <div className="max-w-6xl mx-auto">
        
       
        <div className="text-center mb-16 space-y-4">
          <div className="inline-block px-4 py-1.5 bg-emerald-100 text-emerald-700 rounded-full text-xs font-bold uppercase tracking-widest">
            Help Us Feed Those in Need
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
            Share Your Blessings This Ramzan
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Your generosity ensures that every table has a meal. Choose a package below to start your journey of giving.
          </p>
        </div>

       
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {programs.map((program) => {
            const Icon = program.icon;
            return (
              <div
                key={program.id}
                className="group relative flex-1 bg-gray-50 rounded-[2.5rem] p-8 border border-gray-100 transition-all duration-500 ease-in-out flex flex-col hover:bg-white hover:shadow-2xl hover:border-emerald-200 lg:hover:flex-[1.5]"
              >
               
                <div className="relative z-10 w-full">
                  <div className="flex justify-between items-start mb-6">
                    <div className="w-14 h-14 bg-emerald-600 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-100 group-hover:scale-110 transition-transform duration-500">
                      <Icon size={28} />
                    </div>
                    {program.zakat && (
                      <span className="text-[10px] bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full font-bold uppercase">
                        Zakat
                      </span>
                    )}
                  </div>

                  <span className="text-emerald-600 font-bold text-xs uppercase tracking-widest mb-2 block">
                    {program.tagline}
                  </span>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2 leading-tight">
                    {program.title}
                  </h3>
                  <p className="text-3xl font-black text-emerald-700 mb-4">Rs. {program.price}</p>
                  
                  <p className="text-gray-600 text-sm leading-relaxed mb-6">
                    {program.description}
                  </p>

                 
                  <button 
                    onClick={onDonateClick}
                    className="flex items-center gap-2 text-emerald-600 font-bold text-sm group-hover:opacity-0 transition-all duration-300"
                  >
                    Donate Now <ArrowRight size={16} />
                  </button>
                </div>

               
                <div className="max-h-0 overflow-hidden opacity-0 group-hover:max-h-[500px] group-hover:opacity-100 transition-all duration-500 ease-in-out">
                  <div className="border-t border-gray-100 pt-6 mt-4 mb-8">
                    <ul className="space-y-2">
                      {program.details.map((item, i) => (
                        <li key={i} className="flex items-center gap-2 text-gray-600 text-sm">
                          <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button 
                    onClick={onDonateClick}
                    className="w-full py-4 bg-emerald-600 text-white rounded-2xl font-bold text-md hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-100 flex items-center justify-center gap-2"
                  >
                    <Heart size={18} fill="white" />
                    Donate Now
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}