import { Heart, Users, Home, Gift } from 'lucide-react';

export default function WhatWeDo() {
  const programs = [
    {
      icon: Heart,
      title: 'Food Distribution',
      description: 'We provide nutritious meals and food packages to thousands of families during Ramzan',
    },
    {
      icon: Users,
      title: 'Community Support',
      description: 'Organizing iftaar events and community gatherings to strengthen social bonds',
    },
    {
      icon: Home,
      title: 'Emergency Relief',
      description: 'Rapid response to help families facing health emergencies and financial crises',
    },
    {
      icon: Gift,
      title: 'Clothing Donations',
      description: 'Distributing warm clothes and essential garments to underprivileged communities',
    },
  ];

  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <div className="inline-block px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full text-sm font-semibold">
            Our Mission
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
            What We Do
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            At Rahmat Relief Foundation, we believe in the power of giving. During Ramzan, we reach out to the most vulnerable members of our community.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {programs.map((program, index) => {
            const Icon = program.icon;
            return (
              <div
                key={index}
                className="group bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {program.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {program.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-16 bg-gradient-to-r from-emerald-50 to-blue-50 rounded-3xl p-8 md:p-12 border-2 border-emerald-200">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h3 className="text-3xl font-bold text-gray-900">
              Join Us in Making a Difference
            </h3>
            <p className="text-lg text-gray-600 leading-relaxed">
              Your contribution directly impacts the lives of families in need. Every donation, no matter the size, 
              helps us provide food, clothing, and hope during the blessed month of Ramzan.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <div className="text-center">
                <p className="text-3xl font-bold text-emerald-600">10,000+</p>
                <p className="text-gray-600">Families Helped</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-blue-600">500+</p>
                <p className="text-gray-600">Volunteers</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-teal-600">100%</p>
                <p className="text-gray-600">Transparent</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
