import React from 'react';
import { Building, Truck, Star, Shield, Clock, Users, ArrowRight, CheckCircle, Award, TrendingUp } from 'lucide-react';

interface GuestPartnerPageProps {
  onSignUp: () => void;
}

export const GuestPartnerPage: React.FC<GuestPartnerPageProps> = ({ onSignUp }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-green-700 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            <h1 className="text-5xl lg:text-6xl font-bold mb-6">
              Become an Auto X Partner
            </h1>
            <p className="text-xl text-green-100 max-w-3xl mx-auto mb-8">
              Join Sri Lanka's leading construction marketplace. Grow your business by connecting 
              with contractors and construction companies across all 25 districts.
            </p>
            
            <div className="grid md:grid-cols-3 gap-6 mt-12">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <TrendingUp className="w-8 h-8 text-white mx-auto mb-3" />
                <h3 className="font-bold text-lg mb-2">Grow Your Business</h3>
                <p className="text-green-100 text-sm">Reach more customers across Sri Lanka</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <Shield className="w-8 h-8 text-white mx-auto mb-3" />
                <h3 className="font-bold text-lg mb-2">Verified Platform</h3>
                <p className="text-green-100 text-sm">Connect with verified contractors only</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <Award className="w-8 h-8 text-white mx-auto mb-3" />
                <h3 className="font-bold text-lg mb-2">Build Reputation</h3>
                <p className="text-green-100 text-sm">Earn ratings and grow your credibility</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partner Types */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Choose Your Partnership Type
            </h2>
            <p className="text-xl text-gray-600">
              Select the type of services you want to provide
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-8 text-white">
                <div className="flex items-center mb-4">
                  <Truck className="w-12 h-12 mr-4" />
                  <div>
                    <h3 className="text-2xl font-bold">Vehicle Owner</h3>
                    <p className="text-blue-100">Rent out your construction vehicles</p>
                  </div>
                </div>
              </div>
              
              <div className="p-8">
                <div className="mb-6">
                  <h4 className="font-bold text-gray-900 mb-3">What you can offer:</h4>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                      JCBs and Excavators
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                      Transport Lorries and Tippers
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                      Water Bowsers and Cranes
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                      Specialized Construction Equipment
                    </li>
                  </ul>
                </div>

                <div className="mb-6">
                  <h4 className="font-bold text-gray-900 mb-3">Benefits:</h4>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Earn passive income from your vehicles</li>
                    <li>• Access to verified contractors</li>
                    <li>• Insurance support and guidance</li>
                    <li>• Flexible rental terms</li>
                  </ul>
                </div>

                <div className="bg-blue-50 rounded-lg p-4">
                  <div className="text-sm text-gray-600">Average earnings</div>
                  <div className="text-xl font-bold text-blue-600">Rs. 150,000 - 500,000/month</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">
              <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 p-8 text-white">
                <div className="flex items-center mb-4">
                  <Building className="w-12 h-12 mr-4" />
                  <div>
                    <h3 className="text-2xl font-bold">Material Supplier</h3>
                    <p className="text-yellow-100">Supply construction materials</p>
                  </div>
                </div>
              </div>
              
              <div className="p-8">
                <div className="mb-6">
                  <h4 className="font-bold text-gray-900 mb-3">What you can supply:</h4>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                      Sand, Gravel, and Soil
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                      Bricks and Concrete Blocks
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                      Timber and Roofing Materials
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                      Specialized Building Materials
                    </li>
                  </ul>
                </div>

                <div className="mb-6">
                  <h4 className="font-bold text-gray-900 mb-3">Benefits:</h4>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Expand your customer base</li>
                    <li>• Streamlined order management</li>
                    <li>• Guaranteed payment terms</li>
                    <li>• Quality certification support</li>
                  </ul>
                </div>

                <div className="bg-yellow-50 rounded-lg p-4">
                  <div className="text-sm text-gray-600">Average earnings</div>
                  <div className="text-xl font-bold text-yellow-600">Rs. 200,000 - 800,000/month</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Partner Success Stories
            </h2>
            <p className="text-xl text-gray-600">
              Real stories from our successful partners across Sri Lanka
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-50 rounded-2xl p-8">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                  KS
                </div>
                <div className="ml-4">
                  <h4 className="font-bold text-gray-900">Kamal Silva</h4>
                  <p className="text-gray-600 text-sm">Vehicle Owner - Colombo</p>
                </div>
              </div>
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 italic">
                "Auto X helped me rent out my JCB to verified contractors. I've increased my monthly income by 60% and built great relationships with construction companies."
              </p>
            </div>

            <div className="bg-gray-50 rounded-2xl p-8">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center text-white font-bold">
                  NP
                </div>
                <div className="ml-4">
                  <h4 className="font-bold text-gray-900">Nimal Perera</h4>
                  <p className="text-gray-600 text-sm">Material Supplier - Kandy</p>
                </div>
              </div>
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 italic">
                "As a sand supplier, Auto X connected me with contractors across Central Province. My business has grown 3x in just 8 months!"
              </p>
            </div>

            <div className="bg-gray-50 rounded-2xl p-8">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">
                  RF
                </div>
                <div className="ml-4">
                  <h4 className="font-bold text-gray-900">Ravi Fernando</h4>
                  <p className="text-gray-600 text-sm">Vehicle Owner - Galle</p>
                </div>
              </div>
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 italic">
                "The platform is easy to use and the support team is excellent. I now have consistent bookings for my crane and excavator."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Requirements */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Partnership Requirements
            </h2>
            <p className="text-xl text-gray-600">
              Simple requirements to ensure quality and trust
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-6">For Vehicle Owners</h3>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span className="text-gray-700">Valid business registration in Sri Lanka</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span className="text-gray-700">Comprehensive vehicle insurance</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span className="text-gray-700">Certified operators (if providing)</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span className="text-gray-700">Minimum 2 years in business</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span className="text-gray-700">Vehicle maintenance records</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-6">For Material Suppliers</h3>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span className="text-gray-700">Valid business registration in Sri Lanka</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span className="text-gray-700">Quality certifications for materials</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span className="text-gray-700">Reliable delivery capability</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span className="text-gray-700">Minimum 1 year in business</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span className="text-gray-700">Consistent supply capacity</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-green-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Grow Your Business?
          </h2>
          <p className="text-xl text-green-100 mb-10 max-w-3xl mx-auto">
            Join hundreds of successful partners who have grown their businesses with Auto X. 
            Start your partnership journey today and reach customers across Sri Lanka.
          </p>
          
          <div className="space-y-4">
            <button 
              onClick={onSignUp}
              className="bg-white text-green-600 px-12 py-4 rounded-xl text-lg font-bold hover:bg-gray-100 transition-colors shadow-lg flex items-center mx-auto"
            >
              <Building className="mr-3 w-6 h-6" />
              Register as Partner
              <ArrowRight className="ml-3 w-6 h-6" />
            </button>
            <p className="text-green-100 text-sm">
              Free registration • Quick approval • Start earning immediately
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="text-white">
              <div className="text-3xl font-bold mb-2">500+</div>
              <div className="text-green-100">Active Partners</div>
            </div>
            <div className="text-white">
              <div className="text-3xl font-bold mb-2">25</div>
              <div className="text-green-100">Districts Covered</div>
            </div>
            <div className="text-white">
              <div className="text-3xl font-bold mb-2">95%</div>
              <div className="text-green-100">Partner Satisfaction</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};