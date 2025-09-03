import React from 'react';
import { Package, Star, Shield, Clock, Users, ArrowRight, CheckCircle, Award, TrendingUp } from 'lucide-react';

interface MaterialsPageProps {
  onSignUp: () => void;
  onMaterialSupplierSignUp: () => void;
}

export const MaterialsPage: React.FC<MaterialsPageProps> = ({ onSignUp, onMaterialSupplierSignUp }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-700 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            <h1 className="text-5xl lg:text-6xl font-bold mb-6">
              Material Suppliers
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
              Supply construction materials across Sri Lanka. Join our platform and connect with contractors 
              who need sand, soil, bricks, gravel, and other building materials.
            </p>
            
            <div className="grid md:grid-cols-3 gap-6 mt-12">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <TrendingUp className="w-8 h-8 text-white mx-auto mb-3" />
                <h3 className="font-bold text-lg mb-2">Expand Business</h3>
                <p className="text-blue-100 text-sm">Reach more customers across Sri Lanka</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <Shield className="w-8 h-8 text-white mx-auto mb-3" />
                <h3 className="font-bold text-lg mb-2">Quality Certified</h3>
                <p className="text-blue-100 text-sm">Get quality certification support</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <Award className="w-8 h-8 text-white mx-auto mb-3" />
                <h3 className="font-bold text-lg mb-2">Build Reputation</h3>
                <p className="text-blue-100 text-sm">Earn ratings and customer reviews</p>
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
              Why Material Suppliers Choose Us
            </h2>
            <p className="text-xl text-gray-600">
              Join hundreds of successful suppliers across Sri Lanka
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <TrendingUp className="text-blue-600 w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Increase Sales</h3>
              <p className="text-gray-600">Expand your customer base and increase monthly sales by up to 300%.</p>
            </div>

            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Shield className="text-green-600 w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Quality Support</h3>
              <p className="text-gray-600">Get support for quality certifications and material testing.</p>
            </div>

            <div className="text-center">
              <div className="bg-yellow-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Users className="text-yellow-600 w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Verified Buyers</h3>
              <p className="text-gray-600">Connect with verified contractors and construction companies.</p>
            </div>

            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Clock className="text-purple-600 w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Flexible Terms</h3>
              <p className="text-gray-600">Set your own prices, delivery terms, and payment methods.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Material Types */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              What Materials Can You Supply?
            </h2>
            <p className="text-xl text-gray-600">
              We accept all types of construction and building materials
            </p>
          </div>

           <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gray-50 rounded-2xl p-6 text-center">
              <div className="bg-yellow-100 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Package className="text-yellow-600 w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Sand</h3>
              <p className="text-gray-600 text-sm">River sand, sea sand, construction sand</p>
            </div>

            <div className="bg-gray-50 rounded-2xl p-6 text-center">
              <div className="bg-green-100 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Package className="text-green-600 w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Soil</h3>
              <p className="text-gray-600 text-sm">Garden soil, topsoil, fill dirt</p>
            </div>


            <div className="bg-gray-50 rounded-2xl p-6 text-center">
              <div className="bg-red-100 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Package className="text-red-600 w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Bricks</h3>
              <p className="text-gray-600 text-sm">Clay bricks, concrete blocks</p>
            </div>

            <div className="bg-gray-50 rounded-2xl p-6 text-center">
              <div className="bg-gray-100 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Package className="text-gray-600 w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Gravel</h3>
              <p className="text-gray-600 text-sm">Crushed stone, aggregate</p>
            </div>

            <div className="bg-gray-50 rounded-2xl p-6 text-center">
              <div className="bg-blue-100 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Package className="text-blue-600 w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Metal</h3>
              <p className="text-gray-600 text-sm">Steel rods, iron bars</p>
            </div>

            <div className="bg-gray-50 rounded-2xl p-6 text-center">
              <div className="bg-orange-100 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Package className="text-orange-600 w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Timber</h3>
              <p className="text-gray-600 text-sm">Construction wood, planks</p>
            </div>

            <div className="bg-gray-50 rounded-2xl p-6 text-center">
              <div className="bg-purple-100 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Package className="text-purple-600 w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Cement</h3>
              <p className="text-gray-600 text-sm">Portland cement, concrete mix</p>
            </div>

            <div className="bg-gray-50 rounded-2xl p-6 text-center">
              <div className="bg-pink-100 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Package className="text-pink-600 w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Hardware</h3>
              <p className="text-gray-600 text-sm">Nails, screws, tools</p>
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
              Simple steps to start selling your materials
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-500 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-6 text-xl font-bold">
                1
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Register Your Business</h3>
              <p className="text-gray-600">Sign up and provide details about your materials, including photos and specifications.</p>
            </div>

            <div className="text-center">
              <div className="bg-blue-500 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-6 text-xl font-bold">
                2
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Get Verified</h3>
              <p className="text-gray-600">Our team verifies your business and material quality to ensure standards.</p>
            </div>

            <div className="text-center">
              <div className="bg-blue-500 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-6 text-xl font-bold">
                3
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Start Selling</h3>
              <p className="text-gray-600">Receive orders from verified customers and grow your business.</p>
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
              Real stories from material suppliers across Sri Lanka
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-50 rounded-2xl p-8">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                  WS
                </div>
                <div className="ml-4">
                  <h4 className="font-bold text-gray-900">Wilson Silva</h4>
                  <p className="text-gray-600 text-sm">Sand Supplier - Gampaha</p>
                </div>
              </div>
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 italic">
                "My sand supply business grew 3x after joining this platform. I now supply to contractors across Western Province."
              </p>
            </div>

            <div className="bg-gray-50 rounded-2xl p-8">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">
                  LP
                </div>
                <div className="ml-4">
                  <h4 className="font-bold text-gray-900">Lanka Perera</h4>
                  <p className="text-gray-600 text-sm">Brick Supplier - Kalutara</p>
                </div>
              </div>
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 italic">
                "The platform helped me reach new customers and increase my monthly sales by 250%. Excellent support team."
              </p>
            </div>

            <div className="bg-gray-50 rounded-2xl p-8">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center text-white font-bold">
                  MF
                </div>
                <div className="ml-4">
                  <h4 className="font-bold text-gray-900">Mahinda Fernando</h4>
                  <p className="text-gray-600 text-sm">Soil Supplier - Kandy</p>
                </div>
              </div>
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 italic">
                "Professional platform with verified customers. My soil supply business is now operating island-wide."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Expand Your Business?
          </h2>
          <p className="text-xl text-blue-100 mb-10 max-w-3xl mx-auto">
            Join hundreds of successful material suppliers who are growing their businesses with our platform. 
            Register today and start connecting with verified customers across Sri Lanka.
          </p>
          
          <div className="space-y-4">
            <button 
              onClick={onMaterialSupplierSignUp}
              className="bg-white text-blue-600 px-12 py-4 rounded-xl text-lg font-bold hover:bg-gray-100 transition-colors shadow-lg flex items-center mx-auto"
            >
              <Package className="mr-3 w-6 h-6" />
              Register as Material Supplier
              <ArrowRight className="ml-3 w-6 h-6" />
            </button>
            <p className="text-blue-100 text-sm">
              Free registration • Quick approval • Start selling immediately
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="text-white">
              <div className="text-3xl font-bold mb-2">300+</div>
              <div className="text-blue-100">Active Suppliers</div>
            </div>
            <div className="text-white">
              <div className="text-3xl font-bold mb-2">25</div>
              <div className="text-blue-100">Districts Covered</div>
            </div>
            <div className="text-white">
              <div className="text-3xl font-bold mb-2">98%</div>
              <div className="text-blue-100">Supplier Satisfaction</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};