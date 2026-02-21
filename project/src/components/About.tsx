import { Shield, Users, TrendingUp, Award } from 'lucide-react';

export default function About() {
  const values = [
    {
      icon: Shield,
      title: 'Transparency',
      description: 'Every donation is tracked and reported with complete accountability'
    },
    {
      icon: Users,
      title: 'Community First',
      description: 'We work directly with communities to understand their needs'
    },
    {
      icon: TrendingUp,
      title: 'Direct Impact',
      description: '95% of funds go directly to humanitarian efforts'
    },
    {
      icon: Award,
      title: 'Collaborating with NGOs',
      description: 'Recognized by leading humanitarian organizations in Pakistan'
    }
  ];

  return (
    <section id="about" className="py-20 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <div className="inline-block px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full text-sm font-semibold">
            About Our Mission
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
            Building a Better Tomorrow
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
           Dastarkhawan-e-Amal Foundation has been at the forefront of humanitarian aid during Ramzan
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div className="space-y-6">
            <h3 className="text-3xl font-bold text-gray-900">Who We Are</h3>
            <p className="text-lg text-gray-700 leading-relaxed">
              Dastarkhawan-e-Amal Foundation is a dedicated humanitarian organization committed to serving underprivileged communities during the blessed month of Ramzan. We believe that no one should go hungry or lack basic necessities during this sacred time.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Our mission is built on the principles of compassion, integrity, and transparency. We mobilize thousands of volunteers and work with partner organizations to ensure that aid reaches those who need it most.
            </p>
          </div>

          <div className="space-y-6">
            <h3 className="text-3xl font-bold text-gray-900">Our Commitment</h3>
            <p className="text-lg text-gray-700 leading-relaxed">
              We take our responsibility seriously. Every donation is carefully managed and deployed with maximum efficiency. Our transparent operations mean you can trust that your contribution will make a real, measurable impact.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Working alongside multiple NGO partners, we've built a robust network that enables us to reach remote areas and serve families who have been overlooked by traditional aid programs.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, index) => (
            <div
              key={index}
              className="group p-6 bg-gradient-to-br from-emerald-50 to-blue-50 rounded-2xl hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-blue-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <value.icon className="w-7 h-7 text-white" />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-2">{value.title}</h4>
              <p className="text-gray-600 leading-relaxed">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
