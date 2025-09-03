import React, { useState } from 'react';
import { User, Truck, Package, ArrowRight, CheckCircle } from 'lucide-react';

interface SignUpPageProps {
  onRegistration: (data: any) => void;
  onVehicleOwnerSignUp: () => void;
  onMaterialSupplierSignUp: () => void;
}

export const SignUpPage: React.FC<SignUpPageProps> = ({ 
  onRegistration, 
  onVehicleOwnerSignUp, 
  onMaterialSupplierSignUp 
}) => {
  const [selectedRole, setSelectedRole] = useState<string>('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    businessName: '',
    address: '',
    district: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    const registrationData = {
      ...formData,
      role: selectedRole
    };

    onRegistration(registrationData);
  };

  const sriLankanDistricts = [
    'Colombo', 'Gampaha', 'Kalutara', 'Kandy', 'Matale', 'Nuwara Eliya',
    'Galle', 'Matara', 'Hambantota', 'Jaffna', 'Kilinochchi', 'Mannar',
    'Vavuniya', 'Mullaitivu', 'Batticaloa', 'Ampara', 'Trincomalee',
    'Kurunegala', 'Puttalam', 'Anuradhapura', 'Polonnaruwa', 'Badulla',
    'Moneragala', 'Ratnapura', 'Kegalle'
  ];

  if (!selectedRole) {
    return (
      <div className="min-h-screen bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Choose Your Role
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Select how you want to use our platform. You can always change this later.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Service Consumer */}
            <div
              onClick={() => setSelectedRole('consumer')}
              className="group bg-gradient-to-br from-blue-50 to-blue-100 rounded-3xl p-8 border border-blue-200 hover:shadow-2xl transition-all duration-500 cursor-pointer"
            >
              <div className="text-center">
                <div className="bg-blue-500 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <User className="text-white w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Service Consumer</h3>
                <p className="text-gray-700 leading-relaxed mb-6">
                  I need to rent vehicles or buy construction materials for my projects.
                </p>
                
                <div className="space-y-3 mb-8">
                  <div className="flex items-center text-gray-700">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    Rent heavy vehicles
                  </div>
                  <div className="flex items-center text-gray-700">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    Buy construction materials
                  </div>
                  <div className="flex items-center text-gray-700">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    Connect with suppliers
                  </div>
                </div>

                <div className="flex items-center text-blue-600 font-semibold group-hover:text-blue-700">
                  Select This Role
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-2 transition-transform" />
                </div>
              </div>
            </div>

            {/* Vehicle Owner */}
            <div
              onClick={() => {
                // Show vehicle owner registration form
                onVehicleOwnerSignUp();
              }}
              className="group bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-3xl p-8 border border-yellow-200 hover:shadow-2xl transition-all duration-500 cursor-pointer"
            >
              <div className="text-center">
                <div className="bg-yellow-500 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Truck className="text-white w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Vehicle Owner</h3>
                <p className="text-gray-700 leading-relaxed mb-6">
                  I own vehicles and want to rent them out to earn income.
                </p>
                
                <div className="space-y-3 mb-8">
                  <div className="flex items-center text-gray-700">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    List vehicles for rent
                  </div>
                  <div className="flex items-center text-gray-700">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    Set your own rates
                  </div>
                  <div className="flex items-center text-gray-700">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    Earn passive income
                  </div>
                </div>

                <div className="flex items-center text-yellow-600 font-semibold group-hover:text-yellow-700">
                  Select This Role
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-2 transition-transform" />
                </div>
              </div>
            </div>

            {/* Material Supplier */}
            <div
              onClick={() => {
                // Show material supplier registration form
                onMaterialSupplierSignUp();
              }}
              className="group bg-gradient-to-br from-green-50 to-green-100 rounded-3xl p-8 border border-green-200 hover:shadow-2xl transition-all duration-500 cursor-pointer"
            >
              <div className="text-center">
                <div className="bg-green-500 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Package className="text-white w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Material Supplier</h3>
                <p className="text-gray-700 leading-relaxed mb-6">
                  I supply construction materials and want to reach more customers.
                </p>
                
                <div className="space-y-3 mb-8">
                  <div className="flex items-center text-gray-700">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    List materials for sale
                  </div>
                  <div className="flex items-center text-gray-700">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    Expand customer base
                  </div>
                  <div className="flex items-center text-gray-700">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    Grow your business
                  </div>
                </div>

                <div className="flex items-center text-green-600 font-semibold group-hover:text-green-700">
                  Select This Role
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-2 transition-transform" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {selectedRole === 'consumer' && 'Service Consumer Registration'}
              {selectedRole === 'vehicle_owner' && 'Vehicle Owner Registration'}
              {selectedRole === 'material_supplier' && 'Material Supplier Registration'}
            </h1>
            <p className="text-gray-600">
              Fill in your details to create your account
            </p>
            <button
              onClick={() => setSelectedRole('')}
              className="text-yellow-600 hover:text-yellow-700 mt-2 text-sm"
            >
              ← Change Role
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-yellow-500 transition-colors"
                  placeholder="Your full name"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-yellow-500 transition-colors"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-yellow-500 transition-colors"
                  placeholder="+94 76 1098385"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  District *
                </label>
                <select
                  name="district"
                  value={formData.district}
                  onChange={handleInputChange}
                  required
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-yellow-500 transition-colors"
                >
                  <option value="">Select District</option>
                  {sriLankanDistricts.map((district) => (
                    <option key={district} value={district}>{district}</option>
                  ))}
                </select>
              </div>
            </div>

            {(selectedRole === 'vehicle_owner' || selectedRole === 'material_supplier') && (
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Business Name *
                </label>
                <input
                  type="text"
                  name="businessName"
                  value={formData.businessName}
                  onChange={handleInputChange}
                  required
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-yellow-500 transition-colors"
                  placeholder="Your business name"
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Address *
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                required
                className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-yellow-500 transition-colors"
                placeholder="Your complete address"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Password *
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-yellow-500 transition-colors"
                  placeholder="Create a password"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Confirm Password *
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  required
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-yellow-500 transition-colors"
                  placeholder="Confirm your password"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-black py-4 px-6 rounded-xl hover:from-yellow-500 hover:to-yellow-600 transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl"
            >
              Create Account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};