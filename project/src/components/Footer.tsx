import { Heart, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-blue-500 rounded-lg flex items-center justify-center">
                <Heart className="w-6 h-6" />
              </div>
              <span className="text-xl font-bold">Rahmat Relief</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Dedicated to serving humanity with compassion and integrity during Ramzan and beyond.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="#about" className="hover:text-emerald-400 transition-colors">About Us</a>
              </li>
              <li>
                <a href="#donation" className="hover:text-emerald-400 transition-colors">Donate</a>
              </li>
              <li>
                <a href="#" className="hover:text-emerald-400 transition-colors">Our Programs</a>
              </li>
              <li>
                <a href="#" className="hover:text-emerald-400 transition-colors">Reports</a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-4">Contact</h4>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-emerald-400" />
                info@rahmatrelief.org
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-400" />
                +92 300 1234567
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-emerald-400" />
                Karachi, Pakistan
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-4">Follow Us</h4>
            <div className="flex gap-3">
              <a href="#" className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-emerald-600 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-emerald-600 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-emerald-600 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-emerald-600 transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
            <p className="text-gray-400 text-sm mt-4">
              Stay connected for updates and impact stories
            </p>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
            <p>
              © 2026 Rahmat Relief Foundation. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-emerald-400 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-emerald-400 transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-emerald-400 transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
