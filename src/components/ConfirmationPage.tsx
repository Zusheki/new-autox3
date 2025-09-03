import React from 'react';
import { CheckCircle, LayoutDashboard, Star, Award, Users, TrendingUp, Home, Menu, Plus, MessageSquare } from 'lucide-react';

interface ConfirmationPageProps {
  onAction: (action: 'dashboard' | 'services') => void;
  registrationData: any;
}

export const ConfirmationPage: React.FC<ConfirmationPageProps> = ({ onAction, registrationData }) => {
  const getRoleDisplayName = (role: string) => {
    switch (role) {
      case 'consumer':
        return 'Service Consumer';
      case 'vehicle_owner':
        return 'Vehicle Owner';
      case 'material_supplier':
        return 'Material Supplier';
      default:
        return 'User';
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'consumer':
        return <Users className="w-8 h-8 text-blue-500" />;
      case 'vehicle_owner':
        return <TrendingUp className="w-8 h-8 text-yellow-500" />;
      case 'material_supplier':
        return <Award className="w-8 h-8 text-green-500" />;
      default:
        return <Star className="w-8 h-8 text-gray-500" />;
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'consumer':
        return 'from-blue-500 to-blue-600';
      case 'vehicle_owner':
        return 'from-yellow-400 to-yellow-500';
      case 'material_supplier':
        return 'from-green-500 to-green-600';
      default:
        return 'from-gray-500 to-gray-600';
    }
  };

  const isBusinessUser = registrationData?.role === 'vehicle_owner' || registrationData?.role === 'material_supplier';

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          {/* Header Section */}
          <div className={`bg-gradient-to-r ${getRoleColor(registrationData?.role)} p-12 text-center text-white relative overflow-hidden`}>
            <div className="absolute top-0 left-0 w-full h-full opacity-10">
              <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full"></div>
              <div className="absolute bottom-10 right-10 w-24 h-24 bg-white rounded-full"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-white rounded-full"></div>
            </div>
            
            <div className="relative z-10">
              <div className="bg-white/20 backdrop-blur-sm w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-12 h-12 text-white" />
              </div>
              
              <h1 className="text-4xl lg:text-5xl font-bold mb-4">
                Welcome to Auto X!
              </h1>
              
              <p className="text-xl lg:text-2xl text-white/90 mb-6">
                Registration Successful
              </p>
              
              <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 max-w-md mx-auto">
                <div className="flex items-center justify-center mb-4">
                  {getRoleIcon(registrationData?.role)}
                </div>
                <h2 className="text-2xl font-bold mb-2">{registrationData?.name}</h2>
                <p className="text-white/90 text-lg">{getRoleDisplayName(registrationData?.role)}</p>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="p-12">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                You're All Set!
              </h3>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                Your account has been created successfully. Choose what you'd like to do next to get started with Auto X.
              </p>
            </div>

            {/* What's Next Section */}
            <div className="bg-gray-50 rounded-2xl p-8 mb-12">
              <h4 className="text-2xl font-bold text-gray-900 mb-6 text-center">What's Next?</h4>
              <div className="grid md:grid-cols-3 gap-6">
                {registrationData?.role === 'consumer' && (
                  <>
                    <div className="text-center">
                      <div className="bg-blue-100 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3">
                        <LayoutDashboard className="w-6 h-6 text-blue-600" />
                      </div>
                      <h5 className="font-semibold text-gray-900 mb-2">Access Dashboard</h5>
                      <p className="text-gray-600 text-sm">View your personalized dashboard and start exploring</p>
                    </div>
                    <div className="text-center">
                      <div className="bg-green-100 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3">
                        <CheckCircle className="w-6 h-6 text-green-600" />
                      </div>
                      <h5 className="font-semibold text-gray-900 mb-2">Find Services</h5>
                      <p className="text-gray-600 text-sm">Browse vehicles and materials from verified suppliers</p>
                    </div>
                    <div className="text-center">
                      <div className="bg-purple-100 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3">
                        <Star className="w-6 h-6 text-purple-600" />
                      </div>
                      <h5 className="font-semibold text-gray-900 mb-2">Start Projects</h5>
                      <p className="text-gray-600 text-sm">Begin your construction projects with quality resources</p>
                    </div>
                  </>
                )}
                
                {isBusinessUser && (
                  <>
                    <div className="text-center">
                      <div className="bg-yellow-100 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3">
                        <CheckCircle className="w-6 h-6 text-yellow-600" />
                      </div>
                      <h5 className="font-semibold text-gray-900 mb-2">Account Under Review</h5>
                      <p className="text-gray-600 text-sm">Your account will be verified within 24-48 hours</p>
                    </div>
                    <div className="text-center">
                      <div className="bg-blue-100 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3">
                        <Plus className="w-6 h-6 text-blue-600" />
                      </div>
                      <h5 className="font-semibold text-gray-900 mb-2">Add Services</h5>
                      <p className="text-gray-600 text-sm">
                        List your {registrationData?.role === 'vehicle_owner' ? 'vehicles' : 'materials'} to start earning
                      </p>
                    </div>
                    <div className="text-center">
                      <div className="bg-green-100 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3">
                        <TrendingUp className="w-6 h-6 text-green-600" />
                      </div>
                      <h5 className="font-semibold text-gray-900 mb-2">Start Earning</h5>
                      <p className="text-gray-600 text-sm">Receive inquiries and grow your business</p>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center max-w-2xl mx-auto">
              <button
                onClick={() => onAction('dashboard')}
                className="group flex-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 py-4 rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl flex items-center justify-center"
              >
                <LayoutDashboard className="mr-3 w-6 h-6 group-hover:scale-110 transition-transform" />
                {registrationData?.role === 'consumer' ? 'Get Started' : 'Go to Management Dashboard'}
              </button>
              
              <button
                onClick={() => onAction('services')}
                className={`group flex-1 bg-gradient-to-r ${getRoleColor(registrationData?.role)} text-white px-8 py-4 rounded-xl hover:shadow-xl transition-all duration-300 font-semibold text-lg shadow-lg flex items-center justify-center`}
              >
                <LayoutDashboard className="mr-3 w-6 h-6 group-hover:scale-110 transition-transform" />
                {registrationData?.role === 'consumer' ? 'Go to Home' : 'Go to Services'}
              </button>
            </div>

            {/* Additional Info */}
            <div className="mt-12 text-center">
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 max-w-2xl mx-auto">
                <h4 className="font-semibold text-blue-900 mb-2">Need Help Getting Started?</h4>
                <p className="text-blue-700 text-sm mb-4">
                  Our support team is here to help you make the most of Auto X. Contact us anytime for assistance.
                </p>
                <div className="flex justify-center space-x-6 text-sm text-blue-600">
                  <span>📞 +94 76 1098385</span>
                  <span>📧 support@autox.lk</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};