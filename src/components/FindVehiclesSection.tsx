import React, { useState } from 'react';
import { ArrowLeft, Star, MapPin, Phone, MessageCircle, User, Award, Filter, Truck, Wrench, Clock, Shield } from 'lucide-react';
import { vehicles, vehicleCategories, sriLankanDistricts } from '../data/services';
import { Vehicle } from '../types';

interface FindVehiclesSectionProps {
  onBack: () => void;
}

export const FindVehiclesSection: React.FC<FindVehiclesSectionProps> = ({ onBack }) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [selectedDistrict, setSelectedDistrict] = useState<string>('');

  const handleCall = (phone: string) => {
    window.open(`tel:${phone}`, '_self');
  };

  const handleMessage = (phone: string, supplierName: string, vehicleName: string) => {
    const message = `Hi ${supplierName}, I'm interested in renting your ${vehicleName}. Can you provide more details about availability and rates?`;
    const whatsappUrl = `https://wa.me/${phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  // Filter vehicles by category and district
  const filteredVehicles = vehicles.filter(vehicle => {
    const categoryMatch = selectedCategory ? vehicle.category === selectedCategory : true;
    const districtMatch = selectedDistrict ? vehicle.supplier.district === selectedDistrict : true;
    return categoryMatch && districtMatch;
  });

  // Vehicle detail view
  if (selectedVehicle) {
    return (
      <div className="min-h-screen bg-gray-50">
        <section className="bg-gradient-to-r from-blue-600 to-blue-700 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <button
              onClick={() => setSelectedVehicle(null)}
              className="flex items-center text-white hover:text-blue-200 transition-colors mb-6 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg"
            >
              <ArrowLeft size={20} className="mr-2" />
              Back to Vehicles
            </button>
            <h1 className="text-4xl font-bold text-white">{selectedVehicle.name}</h1>
          </div>
        </section>

        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12">
              <div>
                <img 
                  src={selectedVehicle.image} 
                  alt={selectedVehicle.name}
                  className="w-full h-96 object-cover rounded-2xl shadow-lg mb-6"
                />
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Vehicle Details</h2>
                  <p className="text-gray-600 mb-6 leading-relaxed">{selectedVehicle.description}</p>
                  
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                      <Wrench className="w-4 h-4 mr-2" />
                      Specifications:
                    </h4>
                    <div className="grid grid-cols-1 gap-2">
                      {selectedVehicle.specifications.map((spec, index) => (
                        <div key={index} className="flex items-center text-sm text-gray-600 bg-gray-50 rounded-lg p-3">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                          {spec}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-blue-50 rounded-xl p-4">
                      <div className="text-sm text-gray-600">Hourly Rate</div>
                      <div className="text-2xl font-bold text-blue-600">Rs. {selectedVehicle.pricePerHour.toLocaleString()}</div>
                    </div>
                    <div className="bg-green-50 rounded-xl p-4">
                      <div className="text-sm text-gray-600">Daily Rate</div>
                      <div className="text-2xl font-bold text-green-600">Rs. {selectedVehicle.pricePerDay.toLocaleString()}</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-white rounded-2xl p-8 shadow-lg">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">Vehicle Owner</h2>
                    <div className="flex items-center bg-blue-100 px-3 py-1 rounded-full">
                      <Star className="w-4 h-4 text-blue-500 fill-current mr-1" />
                      <span className="font-semibold text-blue-700">{selectedVehicle.supplier.rating}</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center">
                      <div className="bg-blue-100 p-2 rounded-lg mr-4">
                        <User className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">{selectedVehicle.supplier.name}</div>
                        <div className="text-sm text-gray-600">Vehicle Owner</div>
                      </div>
                    </div>

                    <div className="flex items-center">
                      <div className="bg-green-100 p-2 rounded-lg mr-4">
                        <MapPin className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">Location</div>
                        <div className="text-gray-600">{selectedVehicle.supplier.location}, {selectedVehicle.supplier.district}</div>
                      </div>
                    </div>

                    <div className="flex items-center">
                      <div className="bg-purple-100 p-2 rounded-lg mr-4">
                        <Phone className="w-5 h-5 text-purple-600" />
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">Contact Number</div>
                        <div className="text-gray-600">{selectedVehicle.supplier.phone}</div>
                      </div>
                    </div>

                    <div className="flex items-center">
                      <div className="bg-orange-100 p-2 rounded-lg mr-4">
                        <Award className="w-5 h-5 text-orange-600" />
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">Total Jobs</div>
                        <div className="text-gray-600">{selectedVehicle.supplier.totalJobs} completed</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-8 shadow-lg">
                  <h3 className="text-xl font-bold text-gray-900 mb-6">Contact Owner</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      onClick={() => handleCall(selectedVehicle.supplier.phone)}
                      className="flex items-center justify-center bg-green-500 text-white py-4 px-6 rounded-xl hover:bg-green-600 transition-colors font-semibold shadow-lg"
                    >
                      <Phone className="w-5 h-5 mr-2" />
                      Call Now
                    </button>
                    <button
                      onClick={() => handleMessage(selectedVehicle.supplier.phone, selectedVehicle.supplier.name, selectedVehicle.name)}
                      className="flex items-center justify-center bg-blue-500 text-white py-4 px-6 rounded-xl hover:bg-blue-600 transition-colors font-semibold shadow-lg"
                    >
                      <MessageCircle className="w-5 h-5 mr-2" />
                      Message
                    </button>
                  </div>
                  <p className="text-sm text-gray-500 text-center mt-4">
                    Connect directly with the vehicle owner. Negotiate your own terms and rates.
                  </p>
                </div>

                <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 text-white">
                  <h3 className="text-xl font-bold mb-4">Quick Rental</h3>
                  <p className="mb-6">Need this vehicle urgently? Contact the owner directly for immediate booking.</p>
                  <div className="flex space-x-4">
                    <button
                      onClick={() => handleCall(selectedVehicle.supplier.phone)}
                      className="flex-1 bg-white text-blue-600 py-3 px-4 rounded-xl hover:bg-gray-100 transition-colors font-semibold"
                    >
                      Call to Book
                    </button>
                    <button
                      onClick={() => handleMessage(selectedVehicle.supplier.phone, selectedVehicle.supplier.name, selectedVehicle.name)}
                      className="flex-1 bg-yellow-400 text-black py-3 px-4 rounded-xl hover:bg-yellow-500 transition-colors font-semibold"
                    >
                      Message to Book
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  // Category listings view
  if (selectedCategory) {
    const categoryInfo = vehicleCategories.find(cat => cat.id === selectedCategory);
    
    return (
      <div className="min-h-screen bg-gray-50">
        <section className="bg-gradient-to-r from-blue-600 to-blue-700 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <button
              onClick={() => setSelectedCategory(null)}
              className="flex items-center text-white hover:text-blue-200 transition-colors mb-8 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg"
            >
              <ArrowLeft size={20} className="mr-2" />
              Back to Vehicle Types
            </button>

            <div className="text-center text-white">
              <h1 className="text-5xl lg:text-6xl font-bold mb-6">
                {categoryInfo?.icon} {categoryInfo?.name} Rental
              </h1>
              <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
                Browse {categoryInfo?.name.toLowerCase()} owners across Sri Lanka. Connect directly with verified vehicle owners.
              </p>
            </div>
          </div>
        </section>

        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Filter Sidebar */}
            <div className="mb-8 bg-white rounded-2xl p-6 shadow-lg">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-gray-900 flex items-center">
                  <Filter className="w-5 h-5 mr-2" />
                  Filter by Location
                </h3>
                <select
                  value={selectedDistrict}
                  onChange={(e) => setSelectedDistrict(e.target.value)}
                  className="border-2 border-gray-200 rounded-xl px-4 py-2 focus:outline-none focus:border-blue-500 transition-colors"
                >
                  <option value="">All Districts</option>
                  {sriLankanDistricts.map((district) => (
                    <option key={district} value={district}>{district}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Results Count */}
            <div className="mb-6">
              <p className="text-gray-600">
                Showing {filteredVehicles.length} {categoryInfo?.name.toLowerCase()} vehicles
                {selectedDistrict && ` in ${selectedDistrict} district`}
              </p>
            </div>

            {/* Vehicles Grid */}
            <div className="grid lg:grid-cols-2 gap-8">
              {filteredVehicles.map((vehicle) => (
                <div
                  key={vehicle.id}
                  onClick={() => setSelectedVehicle(vehicle)}
                  className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-blue-200 cursor-pointer"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={vehicle.image}
                      alt={vehicle.name}
                      className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm font-medium ml-1">{vehicle.supplier.rating}</span>
                      </div>
                    </div>
                    <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-sm font-medium ${
                      vehicle.available 
                        ? 'bg-green-500 text-white' 
                        : 'bg-red-500 text-white'
                    }`}>
                      {vehicle.available ? 'Available' : 'Booked'}
                    </div>
                  </div>
                  
                  <div className="p-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{vehicle.name}</h3>
                    <p className="text-gray-600 mb-4 leading-relaxed line-clamp-2">{vehicle.description}</p>

                    <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold text-gray-900">{vehicle.supplier.name}</span>
                        <span className="text-sm text-gray-500">{vehicle.supplier.totalJobs} jobs</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <MapPin className="w-4 h-4 mr-1" />
                        {vehicle.supplier.location}, {vehicle.supplier.district}
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                        <Wrench className="w-4 h-4 mr-2" />
                        Key Features:
                      </h4>
                      <div className="grid grid-cols-1 gap-2">
                        {vehicle.specifications.slice(0, 2).map((spec, index) => (
                          <div key={index} className="flex items-center text-sm text-gray-600 bg-white rounded-lg p-2">
                            <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                            {spec}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center">
                          <div className="text-xl font-bold text-blue-600">
                            Rs. {vehicle.pricePerHour.toLocaleString()}
                          </div>
                          <div className="text-sm text-gray-600">per hour</div>
                        </div>
                        <div className="text-center">
                          <div className="text-xl font-bold text-blue-600">
                            Rs. {vehicle.pricePerDay.toLocaleString()}
                          </div>
                          <div className="text-sm text-gray-600">per day</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredVehicles.length === 0 && (
              <div className="text-center py-12">
                <Truck className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">No vehicles found</h3>
                <p className="text-gray-600">
                  No {categoryInfo?.name.toLowerCase()} vehicles found
                  {selectedDistrict && ` in ${selectedDistrict} district`}. 
                  Try selecting a different location.
                </p>
              </div>
            )}
          </div>
        </section>
      </div>
    );
  }

  // Main vehicle types view
  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-gradient-to-r from-blue-600 to-blue-700 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={onBack}
            className="flex items-center text-white hover:text-blue-200 transition-colors mb-8 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg"
          >
            <ArrowLeft size={20} className="mr-2" />
            Back to Dashboard
          </button>

          <div className="text-center text-white">
            <h1 className="text-5xl lg:text-6xl font-bold mb-6">
              Find Vehicles
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
              Choose the type of vehicle you need. Browse vehicle owners across Sri Lanka.
            </p>
            
            <div className="grid md:grid-cols-3 gap-6 mt-12">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <Shield className="w-8 h-8 text-white mx-auto mb-3" />
                <h3 className="font-bold text-lg mb-2">Verified Owners</h3>
                <p className="text-blue-100 text-sm">All vehicle owners are verified</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <Clock className="w-8 h-8 text-white mx-auto mb-3" />
                <h3 className="font-bold text-lg mb-2">Instant Contact</h3>
                <p className="text-blue-100 text-sm">Direct contact with owners</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <Award className="w-8 h-8 text-white mx-auto mb-3" />
                <h3 className="font-bold text-lg mb-2">Best Rates</h3>
                <p className="text-blue-100 text-sm">Competitive pricing island-wide</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Vehicle Types</h2>
            <p className="text-gray-600 text-lg">Select a vehicle type to browse available options</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {vehicleCategories.map((category) => (
              <div
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-blue-200 cursor-pointer"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors"></div>
                  <div className="absolute top-4 left-4 text-3xl">{category.icon}</div>
                  <div className="absolute top-4 left-4">
                    <div className="bg-white/20 backdrop-blur-sm p-2 rounded-lg">
                      <Truck className="text-white w-6 h-6" />
                    </div>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="bg-white/90 backdrop-blur-sm rounded-lg p-3">
                      <h3 className="text-lg font-bold text-gray-900">{category.name}</h3>
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">{category.description}</p>
                  
                  <div className="flex items-center text-blue-600 font-semibold group-hover:text-blue-700 text-sm">
                    Browse {category.name}
                    <ArrowLeft className="ml-2 w-4 h-4 rotate-180 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};