import React from 'react';
import { Package, Truck, Clock, Shield, Star, Users, CheckCircle, ArrowRight, Wrench, Award } from 'lucide-react';

interface ServicesPageProps {
  onServiceSelect: (service: 'materials' | 'vehicles') => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({ onServiceSelect }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            <h1 className="text-5xl lg:text-6xl font-bold mb-6">
              Our Services
            </h1>
            <p className="text-xl text-black max-w-3xl mx-auto mb-8">
              Comprehensive construction solutions designed to meet all your project needs. 
              From premium materials to professional vehicle rentals, we've got you covered.
            </p>
            
            <div className="grid md:grid-cols-3 gap-6 mt-12">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <Shield className="w-8 h-8 text-black mx-auto mb-3" />
                <h3 className="font-bold text-lg mb-2">Quality Guaranteed</h3>
                <p className="text-black text-sm">Certified materials & maintained vehicles</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <Clock className="w-8 h-8 text-black mx-auto mb-3" />
                <h3 className="font-bold text-lg mb-2">24/7 Availability</h3>
                <p className="text-black text-sm">Round-the-clock service support</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <Users className="w-8 h-8 text-black mx-auto mb-3" />
                <h3 className="font-bold text-lg mb-2">Expert Team</h3>
                <p className="text-black text-sm">Professional operators & consultants</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Services */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Choose Your Service
            </h2>
            <p className="text-xl text-gray-600">
              Select from our comprehensive range of construction services
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Materials Service */}
            <div 
              onClick={() => onServiceSelect('materials')}
              className="group relative bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-3xl p-10 cursor-pointer hover:shadow-2xl transition-all duration-500 border border-yellow-200 hover:border-yellow-300"
            >
              <div className="absolute top-8 right-8">
                <div className="bg-yellow-400 p-4 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                  <Package className="text-white w-10 h-10" />
                </div>
              </div>
              
              <div className="space-y-8">
                <div>
                  <h3 className="text-4xl font-bold text-gray-900 mb-4">Material Supply</h3>
                  <p className="text-gray-700 text-lg leading-relaxed">
                    Premium construction materials sourced from trusted suppliers. 
                    Quality-tested sand, steel, soil, bricks, and more delivered directly to your site.
                  </p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4">
                    <div className="font-semibold text-gray-900">River Sand</div>
                    <div className="text-sm text-gray-600">Premium quality for construction</div>
                  </div>
                  <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4">
                    <div className="font-semibold text-gray-900">Steel Rods</div>
                    <div className="text-sm text-gray-600">High-strength reinforcement</div>
                  </div>
                  <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4">
                    <div className="font-semibold text-gray-900">Garden Soil</div>
                    <div className="text-sm text-gray-600">Rich, fertile landscaping soil</div>
                  </div>
                  <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4">
                    <div className="font-semibold text-gray-900">Clay Bricks</div>
                    <div className="text-sm text-gray-600">Durable construction bricks</div>
                  </div>
                </div>

                <div className="bg-white/50 rounded-xl p-6">
                  <h4 className="font-bold text-gray-900 mb-3">Service Features:</h4>
                  <ul className="space-y-2">
                    <li className="flex items-center text-gray-700">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                      Quality certification for all materials
                    </li>
                    <li className="flex items-center text-gray-700">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                      Same-day delivery available
                    </li>
                    <li className="flex items-center text-gray-700">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                      Competitive bulk pricing
                    </li>
                    <li className="flex items-center text-gray-700">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                      Expert material consultation
                    </li>
                  </ul>
                </div>
                
                <div className="flex items-center text-yellow-600 font-semibold group-hover:text-yellow-700">
                  Explore Materials
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-2 transition-transform" />
                </div>
              </div>
            </div>

            {/* Vehicle Service */}
            <div 
              onClick={() => onServiceSelect('vehicles')}
              className="group relative bg-gradient-to-br from-blue-50 to-blue-100 rounded-3xl p-10 cursor-pointer hover:shadow-2xl transition-all duration-500 border border-blue-200 hover:border-blue-300"
            >
              <div className="absolute top-8 right-8">
                <div className="bg-blue-500 p-4 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                  <Truck className="text-white w-10 h-10" />
                </div>
              </div>
              
              <div className="space-y-8">
                <div>
                  <h3 className="text-4xl font-bold text-gray-900 mb-4">Vehicle Rental</h3>
                  <p className="text-gray-700 text-lg leading-relaxed">
                    Professional construction vehicles and heavy machinery with experienced operators. 
                    Well-maintained equipment for maximum efficiency and safety.
                  </p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4">
                    <div className="font-semibold text-gray-900">JCB Excavator</div>
                    <div className="text-sm text-gray-600">Heavy-duty excavation work</div>
                  </div>
                  <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4">
                    <div className="font-semibold text-gray-900">Transport Lorry</div>
                    <div className="text-sm text-gray-600">Large capacity transportation</div>
                  </div>
                  <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4">
                    <div className="font-semibold text-gray-900">Water Bowser</div>
                    <div className="text-sm text-gray-600">Site water supply solutions</div>
                  </div>
                  <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4">
                    <div className="font-semibold text-gray-900">Boom Lift</div>
                    <div className="text-sm text-gray-600">High-access work platform</div>
                  </div>
                </div>

                <div className="bg-white/50 rounded-xl p-6">
                  <h4 className="font-bold text-gray-900 mb-3">Service Features:</h4>
                  <ul className="space-y-2">
                    <li className="flex items-center text-gray-700">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                      Fully insured and maintained vehicles
                    </li>
                    <li className="flex items-center text-gray-700">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                      Experienced operators included
                    </li>
                    <li className="flex items-center text-gray-700">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                      Flexible hourly or daily rates
                    </li>
                    <li className="flex items-center text-gray-700">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                      24/7 emergency support
                    </li>
                  </ul>
                </div>
                
                <div className="flex items-center text-blue-600 font-semibold group-hover:text-blue-700">
                  Explore Vehicles
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-2 transition-transform" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Additional Services
            </h2>
            <p className="text-xl text-gray-600">
              Comprehensive support services to ensure project success
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-50 rounded-2xl p-8 text-center hover:shadow-lg transition-shadow">
              <div className="bg-green-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Wrench className="text-green-600 w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Maintenance Support</h3>
              <p className="text-gray-600 leading-relaxed">
                On-site maintenance and repair services for all rented vehicles. 
                Quick response times to minimize project delays.
              </p>
            </div>

            <div className="bg-gray-50 rounded-2xl p-8 text-center hover:shadow-lg transition-shadow">
              <div className="bg-purple-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Users className="text-purple-600 w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Expert Consultation</h3>
              <p className="text-gray-600 leading-relaxed">
                Professional advice on material selection and vehicle requirements. 
                Our experts help optimize your project efficiency.
              </p>
            </div>

            <div className="bg-gray-50 rounded-2xl p-8 text-center hover:shadow-lg transition-shadow">
              <div className="bg-yellow-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Award className="text-yellow-600 w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Quality Assurance</h3>
              <p className="text-gray-600 leading-relaxed">
                Rigorous quality checks and certifications for all materials. 
                Regular inspections ensure consistent service standards.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-gray-900 to-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-gray-300 mb-10 max-w-3xl mx-auto">
            Contact our team today to discuss your project requirements and get a customized quote.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button 
              onClick={() => onServiceSelect('materials')}
            className="bg-yellow-400 text-black px-10 py-4 rounded-xl text-lg font-bold hover:bg-yellow-500 transition-colors shadow-lg"
            >
              Order Materials
            </button>
            <button 
              onClick={() => onServiceSelect('vehicles')}
              className="bg-blue-500 text-white px-10 py-4 rounded-xl text-lg font-bold hover:bg-blue-600 transition-colors shadow-lg"
            >
              Rent Vehicles
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};