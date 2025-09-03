import React from 'react';
import { User } from '../types';

interface ServiceDashboardProps {
  user: User;
  onVehicleService: () => void;
  onMaterialService: () => void;
}

export const ServiceDashboard: React.FC<ServiceDashboardProps> = ({ 
  user, 
  onVehicleService, 
  onMaterialService 
}) => {
  const getDashboardTitle = () => {
    switch (user.role) {
      case 'consumer':
        return `Welcome, ${user.name}!`;
      case 'vehicle_owner':
        return `Vehicle Owner Dashboard`;
      case 'material_supplier':
        return `Material Supplier Dashboard`;
      case 'admin':
        return `Admin Dashboard`;
      default:
        return `Welcome, ${user.name}!`;
    }
  };

  const getDashboardSubtitle = () => {
    switch (user.role) {
      case 'consumer':
        return 'What would you like to find today? Choose from our comprehensive range of construction services.';
      case 'vehicle_owner':
        return 'Manage your vehicle rentals and connect with customers across Sri Lanka.';
      case 'material_supplier':
        return 'Manage your material supply business and reach more customers.';
      case 'admin':
        return 'Manage the platform, users, and oversee all operations.';
      default:
        return 'What would you like to find today?';
    }
  };

  const getHeaderColor = () => {
    switch (user.role) {
      case 'consumer':
        return 'from-blue-600 to-blue-700';
      case 'vehicle_owner':
        return 'from-yellow-400 to-yellow-500';
      case 'material_supplier':
        return 'from-green-500 to-green-600';
      case 'admin':
        return 'from-purple-600 to-purple-700';
      default:
        return 'from-blue-600 to-blue-700';
    }
  };
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className={`bg-gradient-to-r ${getHeaderColor()} py-20`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center ${user.role === 'vehicle_owner' ? 'text-black' : 'text-white'}`}>
            <h1 className="text-5xl lg:text-6xl font-bold mb-6">
              {getDashboardTitle()}
            </h1>
            <p className={`text-xl max-w-3xl mx-auto mb-8 ${
              user.role === 'vehicle_owner' ? 'text-gray-700' : 
              user.role === 'consumer' ? 'text-blue-100' :
              user.role === 'material_supplier' ? 'text-green-100' :
              'text-purple-100'
            }`}>
              {getDashboardSubtitle()}
            </p>
            
            <div className="grid md:grid-cols-3 gap-6 mt-12">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <span className={`text-2xl mx-auto mb-3 block ${user.role === 'vehicle_owner' ? 'text-black' : 'text-white'}`}>⭐</span>
                <h3 className="font-bold text-lg mb-2">Quality Assured</h3>
                <p className={`text-sm ${
                  user.role === 'vehicle_owner' ? 'text-gray-700' : 
                  user.role === 'consumer' ? 'text-blue-100' :
                  user.role === 'material_supplier' ? 'text-green-100' :
                  'text-purple-100'
                }`}>
                  {user.role === 'consumer' ? 'Verified suppliers and vehicle owners' : 'Quality service guarantee'}
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <span className={`text-2xl mx-auto mb-3 block ${user.role === 'vehicle_owner' ? 'text-black' : 'text-white'}`}>👥</span>
                <h3 className="font-bold text-lg mb-2">Direct Contact</h3>
                <p className={`text-sm ${
                  user.role === 'vehicle_owner' ? 'text-gray-700' : 
                  user.role === 'consumer' ? 'text-blue-100' :
                  user.role === 'material_supplier' ? 'text-green-100' :
                  'text-purple-100'
                }`}>
                  {user.role === 'consumer' ? 'Connect directly with service providers' : 'Direct customer connections'}
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <span className={`text-2xl mx-auto mb-3 block ${user.role === 'vehicle_owner' ? 'text-black' : 'text-white'}`}>🏆</span>
                <h3 className="font-bold text-lg mb-2">Best Prices</h3>
                <p className={`text-sm ${
                  user.role === 'vehicle_owner' ? 'text-gray-700' : 
                  user.role === 'consumer' ? 'text-blue-100' :
                  user.role === 'material_supplier' ? 'text-green-100' :
                  'text-purple-100'
                }`}>
                  {user.role === 'consumer' ? 'Competitive rates across Sri Lanka' : 'Set your own competitive rates'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Options */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {user.role === 'consumer' && (
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Choose Your Service
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Select from our comprehensive range of construction services
              </p>
            </div>
          )}

          {(user.role === 'vehicle_owner' || user.role === 'material_supplier') && (
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Quick Actions
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Manage your business and explore services
              </p>
            </div>
          )}

          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Service Vehicles */}
            <div 
              onClick={onVehicleService}
              className={`group rounded-3xl p-10 cursor-pointer hover:shadow-2xl transition-all duration-500 border ${
                user.role === 'consumer' 
                  ? 'bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200 hover:border-yellow-300'
                  : user.role === 'vehicle_owner'
                  ? 'bg-gradient-to-br from-yellow-100 to-yellow-200 border-yellow-300 hover:border-yellow-400'
                  : 'bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 hover:border-blue-300'
              }`}
            >
              <div className="text-center">
                <div className={`p-6 rounded-2xl mx-auto mb-6 w-24 h-24 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 ${
                  user.role === 'vehicle_owner' ? 'bg-yellow-500' : 'bg-yellow-400'
                }`}>
                  <Truck className="text-white w-12 h-12" />
                </div>
                <h3 className="text-4xl font-bold text-gray-900 mb-4">
                  {user.role === 'consumer' ? 'Service Vehicles' : user.role === 'vehicle_owner' ? 'Manage Vehicles' : 'Browse Vehicles'}
                </h3>
                <p className="text-gray-700 text-lg leading-relaxed mb-6">
                  {user.role === 'consumer' 
                    ? 'Browse and rent heavy vehicles like JCBs, excavators, lorries, and more from verified owners across Sri Lanka.'
                    : user.role === 'vehicle_owner'
                    ? 'Manage your vehicle listings, track bookings, and connect with customers looking for construction vehicles.'
                    : 'Browse available vehicles for your material transportation and construction needs.'
                  }
                </p>
                
                <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 mb-6">
                  <div className="text-sm text-gray-600 mb-2">Available Categories:</div>
                  <div className="flex justify-center space-x-4">
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      user.role === 'vehicle_owner' ? 'bg-yellow-300 text-yellow-900' : 'bg-yellow-200 text-yellow-800'
                    }`}>Agricultural</span>
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      user.role === 'vehicle_owner' ? 'bg-yellow-300 text-yellow-900' : 'bg-yellow-200 text-yellow-800'
                    }`}>Construction</span>
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      user.role === 'vehicle_owner' ? 'bg-yellow-300 text-yellow-900' : 'bg-yellow-200 text-yellow-800'
                    }`}>Water Supply</span>
                  </div>
                </div>
                
                <div className={`flex items-center justify-center font-semibold text-lg ${
                  user.role === 'vehicle_owner' ? 'text-yellow-700 group-hover:text-yellow-800' : 'text-yellow-600 group-hover:text-yellow-700'
                }`}>
                  {user.role === 'consumer' ? 'Browse Vehicles' : user.role === 'vehicle_owner' ? 'Manage Vehicles' : 'Browse Vehicles'}
                  <span className="ml-2 group-hover:translate-x-2 transition-transform">→</span>
                </div>
              </div>
            </div>

            {/* Construction Materials */}
            <div 
              onClick={onMaterialService}
              className={`group rounded-3xl p-10 cursor-pointer hover:shadow-2xl transition-all duration-500 border ${
                user.role === 'consumer' 
                  ? 'bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 hover:border-blue-300'
                  : user.role === 'material_supplier'
                  ? 'bg-gradient-to-br from-green-100 to-green-200 border-green-300 hover:border-green-400'
                  : 'bg-gradient-to-br from-green-50 to-green-100 border-green-200 hover:border-green-300'
              }`}
            >
              <div className="text-center">
                <div className={`p-6 rounded-2xl mx-auto mb-6 w-24 h-24 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 ${
                  user.role === 'material_supplier' ? 'bg-green-600' : 'bg-blue-500'
                }`}>
                  <Package className="text-white w-12 h-12" />
                </div>
                <h3 className="text-4xl font-bold text-gray-900 mb-4">
                  {user.role === 'consumer' ? 'Construction Materials' : user.role === 'material_supplier' ? 'Manage Materials' : 'Browse Materials'}
                </h3>
                <p className="text-gray-700 text-lg leading-relaxed mb-6">
                  {user.role === 'consumer' 
                    ? 'Source quality construction materials like sand, soil, bricks, and gravel from verified suppliers.'
                    : user.role === 'material_supplier'
                    ? 'Manage your material listings, track orders, and connect with customers needing construction materials.'
                    : 'Browse available construction materials for your projects and business needs.'
                  }
                </p>
                
                <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 mb-6">
                  <div className="text-sm text-gray-600 mb-2">Available Materials:</div>
                  <div className="flex justify-center space-x-2 flex-wrap gap-2">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      user.role === 'material_supplier' ? 'bg-green-300 text-green-900' : 'bg-blue-200 text-blue-800'
                    }`}>Sand</span>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      user.role === 'material_supplier' ? 'bg-green-300 text-green-900' : 'bg-blue-200 text-blue-800'
                    }`}>Soil</span>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      user.role === 'material_supplier' ? 'bg-green-300 text-green-900' : 'bg-blue-200 text-blue-800'
                    }`}>Bricks</span>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      user.role === 'material_supplier' ? 'bg-green-300 text-green-900' : 'bg-blue-200 text-blue-800'
                    }`}>Gravel</span>
                  </div>
                </div>
                
                <div className={`flex items-center justify-center font-semibold text-lg ${
                  user.role === 'material_supplier' ? 'text-green-700 group-hover:text-green-800' : 'text-blue-600 group-hover:text-blue-700'
                }`}>
                  {user.role === 'consumer' ? 'Browse Materials' : user.role === 'material_supplier' ? 'Manage Materials' : 'Browse Materials'}
                  <span className="ml-2 group-hover:translate-x-2 transition-transform">→</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Platform Statistics</h2>
            <p className="text-gray-600">
              {user.role === 'consumer' ? 'Join thousands of satisfied customers' : 'Be part of our growing network'}
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className={`text-3xl font-bold mb-2 ${
                user.role === 'vehicle_owner' ? 'text-yellow-600' : 
                user.role === 'material_supplier' ? 'text-green-600' : 'text-blue-600'
              }`}>500+</div>
              <div className="text-gray-600">
                {user.role === 'consumer' ? 'Active Suppliers' : 'Platform Users'}
              </div>
            </div>
            <div>
              <div className={`text-3xl font-bold mb-2 ${
                user.role === 'vehicle_owner' ? 'text-yellow-600' : 
                user.role === 'material_supplier' ? 'text-green-600' : 'text-yellow-600'
              }`}>25</div>
              <div className="text-gray-600">Districts Covered</div>
            </div>
            <div>
              <div className={`text-3xl font-bold mb-2 ${
                user.role === 'vehicle_owner' ? 'text-yellow-600' : 
                user.role === 'material_supplier' ? 'text-green-600' : 'text-green-600'
              }`}>1000+</div>
              <div className="text-gray-600">
                {user.role === 'consumer' ? 'Successful Projects' : 'Successful Transactions'}
              </div>
            </div>
            <div>
              <div className={`text-3xl font-bold mb-2 ${
                user.role === 'vehicle_owner' ? 'text-yellow-600' : 
                user.role === 'material_supplier' ? 'text-green-600' : 'text-purple-600'
              }`}>4.9/5</div>
              <div className="text-gray-600">
                {user.role === 'consumer' ? 'User Rating' : 'Average Rating'}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};