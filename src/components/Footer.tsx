import React from 'react';

type ViewType = 'home' | 'vehicles' | 'materials' | 'about' | 'contact' | 'signup';

interface FooterProps {
  onNavigate: (view: ViewType) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-gray-900 text-white">
      {/* Stats Section */}
      <div className="bg-gray-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div className="space-y-3">
              <div className="bg-orange-500 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto">
                <span className="text-white text-2xl">👥</span>
              </div>
              <div className="text-3xl font-bold text-white">500+</div>
              <div className="text-gray-300">Happy Customers</div>
            </div>
            <div className="space-y-3">
              <div className="bg-blue-500 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto">
                <span className="text-white text-2xl">🚚</span>
              </div>
              <div className="text-3xl font-bold text-white">1000+</div>
              <div className="text-gray-300">Successful Deliveries</div>
            </div>
            <div className="space-y-3">
              <div className="bg-green-500 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto">
                <span className="text-white text-2xl">⭐</span>
              </div>
              <div className="text-3xl font-bold text-white">4.9/5</div>
              <div className="text-gray-300">Customer Rating</div>
            </div>
            <div className="space-y-3">
              <div className="bg-purple-500 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto">
                <span className="text-white text-2xl">🏆</span>
              </div>
              <div className="text-3xl font-bold text-white">5+</div>
              <div className="text-gray-300">Years Experience</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="bg-gradient-to-br from-yellow-400 to-yellow-500 p-3 rounded-xl shadow-lg">
                  <Truck className="text-white w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">Auto X</h3>
                  <p className="text-gray-400 text-sm">Heavy Vehicle & Material Platform</p>
                </div>
              </div>
              <p className="text-gray-300 mb-6 leading-relaxed max-w-md">
                Sri Lanka's leading platform connecting construction professionals with heavy vehicle owners 
                and material suppliers. Direct connections, no middleman, negotiate your own terms.
              </p>
              <div className="flex space-x-4">
                <div className="w-12 h-12 bg-yellow-400 rounded-xl flex items-center justify-center hover:bg-yellow-500 cursor-pointer transition-colors group">
                  <span className="text-white font-bold group-hover:scale-110 transition-transform">F</span>
                </div>
                <div className="w-12 h-12 bg-yellow-400 rounded-xl flex items-center justify-center hover:bg-yellow-500 cursor-pointer transition-colors group">
                  <span className="text-white font-bold group-hover:scale-110 transition-transform">T</span>
                </div>
                <div className="w-12 h-12 bg-yellow-400 rounded-xl flex items-center justify-center hover:bg-yellow-500 cursor-pointer transition-colors group">
                  <span className="text-white font-bold group-hover:scale-110 transition-transform">IN</span>
                </div>
                <div className="w-12 h-12 bg-yellow-400 rounded-xl flex items-center justify-center hover:bg-yellow-500 cursor-pointer transition-colors group">
                  <span className="text-white font-bold group-hover:scale-110 transition-transform">IG</span>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-bold mb-6 text-white">Quick Links</h4>
              <ul className="space-y-4 text-gray-300">
                <li>
                  <button 
                    onClick={() => onNavigate('home')}
                    className="hover:text-yellow-400 transition-colors flex items-center group"
                  >
                    <span className="w-2 h-2 bg-yellow-400 rounded-full mr-3 group-hover:scale-125 transition-transform"></span>
                    Home
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => onNavigate('vehicles')}
                    className="hover:text-orange-400 transition-colors flex items-center group"
                  >
                    <span className="w-2 h-2 bg-orange-500 rounded-full mr-3 group-hover:scale-125 transition-transform"></span>
                    Vehicles
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => onNavigate('materials')}
                    className="hover:text-orange-400 transition-colors flex items-center group"
                  >
                    <span className="w-2 h-2 bg-orange-500 rounded-full mr-3 group-hover:scale-125 transition-transform"></span>
                    Materials
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => onNavigate('about')}
                    className="hover:text-orange-400 transition-colors flex items-center group"
                  >
                    <span className="w-2 h-2 bg-orange-500 rounded-full mr-3 group-hover:scale-125 transition-transform"></span>
                    About
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => onNavigate('contact')}
                    className="hover:text-orange-400 transition-colors flex items-center group"
                  >
                    <span className="w-2 h-2 bg-orange-500 rounded-full mr-3 group-hover:scale-125 transition-transform"></span>
                    Contact Us
                  </button>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-lg font-bold mb-6 text-white">Get In Touch</h4>
              <div className="space-y-4 text-gray-300">
                <div className="flex items-start">
                  <div className="bg-yellow-400 p-2 rounded-lg mr-4 mt-1">
                    <Phone className="text-white w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-semibold text-white">Call Us</div>
                    <div>+94 76 1098385</div>
                    <div className="text-sm text-gray-400">24/7 Support Available</div>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-yellow-400 p-2 rounded-lg mr-4 mt-1">
                    <Mail className="text-white w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-semibold text-white">Email Us</div>
                    <div>info@autox.lk</div>
                    <div className="text-sm text-gray-400">Quick Response Guaranteed</div>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-yellow-400 p-2 rounded-lg mr-4 mt-1">
                    <MapPin className="text-white w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-semibold text-white">Visit Us</div>
                    <div>No. 245, Lakeview Avenue</div>
                    <div className="text-sm text-gray-400">Nugegoda, Western Province, Sri Lanka</div>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-yellow-400 p-2 rounded-lg mr-4 mt-1">
                    <Clock className="text-white w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-semibold text-white">Working Hours</div>
                    <div>Mon - Fri: 6:00 AM - 8:00 PM</div>
                    <div className="text-sm text-gray-400">Sat - Sun: 8:00 AM - 6:00 PM</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-center md:text-left mb-4 md:mb-0">
              <p>&copy; 2025 Auto X Sri Lanka. All rights reserved.</p>
            </div>
            <div className="flex space-x-6 text-gray-400 text-sm">
              <a href="#" className="hover:text-yellow-400 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-yellow-400 transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-yellow-400 transition-colors">Cookie Policy</a>
              <a href="#" className="hover:text-yellow-400 transition-colors">Sitemap</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};