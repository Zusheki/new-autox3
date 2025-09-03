import React from 'react';
import { Truck, Star, Shield, Clock, Users, ArrowRight, CheckCircle, Award, TrendingUp } from 'lucide-react';

interface VehiclesPageProps {
  onSignUp: () => void;
  onVehicleOwnerSignUp: () => void;
}

export const VehiclesPage: React.FC<VehiclesPageProps> = ({ onSignUp, onVehicleOwnerSignUp }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-yellow-400 to-yellow-500 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-black">
            <h1 className="text-5xl lg:text-6xl font-bold mb-6">
              Vehicle Owners
            </h1>
            <p className="text-xl max-w-3xl mx-auto mb-8">
              Own heavy vehicles? Join Sri Lanka's leading platform and start earning by renting out your JCBs, 
              excavators, lorries, tippers, and other construction vehicles.
            </p>
            
            <div className="grid md:grid-cols-3 gap-6 mt-12">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <TrendingUp className="w-8 h-8 text-black mx-auto mb-3" />
                <h3 className="font-bold text-lg mb-2">Increase Income</h3>
                <p className="text-black text-sm">Earn passive income from your vehicles</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <Shield className="w-8 h-8 text-black mx-auto mb-3" />
                <h3 className="font-bold text-lg mb-2">Verified Customers</h3>
                <p className="text-black text-sm">Connect with verified contractors only</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <Award className="w-8 h-8 text-black mx-auto mb-3" />
                <h3 className="font-bold text-lg mb-2">Build Reputation</h3>
                <p className="text-black text-sm">Earn ratings and grow your credibility</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Vehicle Owners Choose Us
            </h2>
            <p className="text-xl text-gray-600">
              Join hundreds of successful vehicle owners across Sri Lanka
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-yellow-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <TrendingUp className="text-yellow-600 w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Maximize Earnings</h3>
              <p className="text-gray-600">Set your own rates and earn up to Rs. 500,000 per month from vehicle rentals.</p>
            </div>

            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Shield className="text-blue-600 w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Insurance Support</h3>
              <p className="text-gray-600">Get guidance on insurance and protection for your valuable equipment.</p>
            </div>

            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Users className="text-green-600 w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Verified Customers</h3>
              <p className="text-gray-600">All customers are verified contractors and construction companies.</p>
            </div>

            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Clock className="text-purple-600 w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Flexible Terms</h3>
              <p className="text-gray-600">Set your own availability, rates, and rental terms.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Vehicle Types */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              What Vehicles Can You List?
            </h2>
            <p className="text-xl text-gray-600">
              We accept all types of heavy vehicles and construction equipment
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-50 rounded-2xl p-8">
              <div className="bg-yellow-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl">🚜</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Agricultural Vehicles</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• JCB Backhoe Loaders</li>
                <li>• Excavators</li>
                <li>• Bulldozers</li>
                <li>• Tractors</li>
              </ul>
            </div>

            <div className="bg-gray-50 rounded-2xl p-8">
              <div className="bg-blue-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl">🚛</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Construction Vehicles</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Tipper Trucks</li>
                <li>• Transport Lorries</li>
                <li>• Concrete Mixers</li>
                <li>• Cranes</li>
              </ul>
            </div>

            <div className="bg-gray-50 rounded-2xl p-8">
              <div className="bg-green-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl">🚰</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Water Supply</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Water Bowsers</li>
                <li>• Water Tankers</li>
                <li>• Septic Trucks</li>
                <li>• Fire Trucks</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              How to Get Started
            </h2>
            <p className="text-xl text-gray-600">
              Simple steps to start earning from your vehicles
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-yellow-400 text-black w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-6 text-xl font-bold">
                1
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Register Your Vehicle</h3>
              <p className="text-gray-600">Sign up and provide details about your vehicles, including photos and specifications.</p>
            </div>

            <div className="text-center">
              <div className="bg-yellow-400 text-black w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-6 text-xl font-bold">
                2
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Get Verified</h3>
              <p className="text-gray-600">Our team verifies your documents and vehicle condition to ensure quality standards.</p>
            </div>

            <div className="text-center">
              <div className="bg-yellow-400 text-black w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-6 text-xl font-bold">
                3
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Start Earning</h3>
              <p className="text-gray-600">Receive rental requests from verified customers and start earning passive income.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Success Stories
            </h2>
            <p className="text-xl text-gray-600">
              Real stories from vehicle owners across Sri Lanka
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-50 rounded-2xl p-8">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center text-white font-bold">
                  KS
                </div>
                <div className="ml-4">
                  <h4 className="font-bold text-gray-900">Kamal Silva</h4>
                  <p className="text-gray-600 text-sm">JCB Owner - Colombo</p>
                </div>
              </div>
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 italic">
                "I've been renting out my JCB through this platform for 8 months. My monthly income increased by 60% and I have consistent bookings."
              </p>
            </div>

            <div className="bg-gray-50 rounded-2xl p-8">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                  NP
                </div>
                <div className="ml-4">
                  <h4 className="font-bold text-gray-900">Nimal Perera</h4>
                  <p className="text-gray-600 text-sm">Tipper Owner - Kandy</p>
                </div>
              </div>
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 italic">
                "The platform helped me reach customers across Central Province. My tipper truck is now booked almost every day."
              </p>
            </div>

            <div className="bg-gray-50 rounded-2xl p-8">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">
                  RF
                </div>
                <div className="ml-4">
                  <h4 className="font-bold text-gray-900">Ravi Fernando</h4>
                  <p className="text-gray-600 text-sm">Crane Owner - Galle</p>
                </div>
              </div>
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 italic">
                "Excellent platform with professional customers. The support team is very helpful and responsive."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-yellow-400 to-yellow-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-black mb-6">
            Ready to Start Earning?
          </h2>
          <p className="text-xl text-black mb-10 max-w-3xl mx-auto">
            Join hundreds of successful vehicle owners who are earning passive income by renting out their vehicles. 
            Register today and start connecting with verified customers across Sri Lanka.
          </p>
          
          <div className="space-y-4">
            <button 
              onClick={onVehicleOwnerSignUp}
              className="bg-black text-yellow-400 px-12 py-4 rounded-xl text-lg font-bold hover:bg-gray-800 transition-colors shadow-lg flex items-center mx-auto"
            >
              <Truck className="mr-3 w-6 h-6" />
              Register as Vehicle Owner
              <ArrowRight className="ml-3 w-6 h-6" />
            </button>
            <p className="text-black text-sm">
              Free registration • Quick approval • Start earning immediately
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="text-black">
              <div className="text-3xl font-bold mb-2">200+</div>
              <div className="text-black">Active Vehicle Owners</div>
            </div>
            <div className="text-black">
              <div className="text-3xl font-bold mb-2">25</div>
              <div className="text-black">Districts Covered</div>
            </div>
            <div className="text-black">
              <div className="text-3xl font-bold mb-2">95%</div>
              <div className="text-black">Owner Satisfaction</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};