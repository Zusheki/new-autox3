import React, { useState } from 'react';
import { ArrowLeft, Filter, Star, MapPin, Phone, MessageCircle, User, Award, Truck, Eye } from 'lucide-react';
import { vehicles, vehicleCategories, sriLankanDistricts } from '../data/services';
import { Vehicle } from '../types';

interface VehicleListingPageProps {
  onBack: () => void;
  onVehicleSelect: (vehicle: Vehicle) => void;
}

export const VehicleListingPage: React.FC<VehicleListingPageProps> = ({ onBack, onVehicleSelect }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('');

  // Filter vehicles based on selected filters
  const filteredVehicles = vehicles.filter(vehicle => {
    const categoryMatch = selectedCategory ? vehicle.category === selectedCategory : true;
    const districtMatch = selectedDistrict ? vehicle.supplier.district === selectedDistrict : true;
    return categoryMatch && districtMatch;
  });

  // Get unique categories for filter
  const availableCategories = [...new Set(vehicles.map(v => v.category))];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-yellow-400 to-yellow-500 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={onBack}
            className="flex items-center text-black hover:text-gray-700 transition-colors mb-8 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg"
          >
            <ArrowLeft size={20} className="mr-2" />
            Back to Dashboard
          </button>

          <div className="text-center text-black">
            <h1 className="text-5xl lg:text-6xl font-bold mb-6">
              Service Vehicles
            </h1>
            <p className="text-xl max-w-3xl mx-auto mb-8">
              Browse construction vehicles and heavy machinery from verified owners across Sri Lanka.
            </p>
          </div>
        </div>
      </section>

      {/* Vehicle Types Overview */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Vehicle Categories</h2>
            <p className="text-gray-600 text-lg">Choose from our comprehensive range of construction vehicles</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-2xl p-8 text-center">
              <div className="bg-yellow-500 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Truck className="text-white w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Agricultural</h3>
              <p className="text-gray-600 text-sm">JCBs, Excavators, Tractors, and farming equipment</p>
            </div>
            
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 text-center">
              <div className="bg-blue-500 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Truck className="text-white w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Construction</h3>
              <p className="text-gray-600 text-sm">Tippers, Lorries, Concrete Mixers, and construction vehicles</p>
            </div>
            
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-8 text-center">
              <div className="bg-green-500 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Package className="text-white w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Water Supply</h3>
              <p className="text-gray-600 text-sm">Water Bowsers, Tankers, and water supply vehicles</p>
            </div>
          </div>
        </div>
      </section>

      {/* Filters and Vehicle Listings */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filters */}
          <div className="bg-white rounded-2xl p-6 shadow-lg mb-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-900 flex items-center">
                <Filter className="w-5 h-5 mr-2" />
                Filter Vehicles
              </h3>
              <button
                onClick={() => {
                  setSelectedCategory('');
                  setSelectedDistrict('');
                }}
                className="text-sm text-blue-600 hover:text-blue-700 transition-colors"
              >
                Clear Filters
              </button>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">District</label>
                <select
                  value={selectedDistrict}
                  onChange={(e) => setSelectedDistrict(e.target.value)}
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-yellow-500 transition-colors"
                >
                  <option value="">All Districts</option>
                  {sriLankanDistricts.map((district) => (
                    <option key={district} value={district}>{district}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Vehicle Type</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-yellow-500 transition-colors"
                >
                  <option value="">All Vehicle Types</option>
                  {availableCategories.map((category) => (
                    <option key={category} value={category}>{category.charAt(0).toUpperCase() + category.slice(1)}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Results Count */}
          <div className="mb-6">
            <p className="text-gray-600">
              Showing {filteredVehicles.length} vehicles
              {selectedDistrict && ` in ${selectedDistrict} district`}
              {selectedCategory && ` in ${selectedCategory} category`}
            </p>
          </div>

          {/* Vehicle Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredVehicles.map((vehicle) => (
              <div
                key={vehicle.id}
                className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-yellow-200 cursor-pointer"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={vehicle.image}
                    alt={vehicle.name}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
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
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{vehicle.name}</h3>
                  <p className="text-gray-600 mb-4 text-sm leading-relaxed line-clamp-2">{vehicle.description}</p>

                  <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-gray-900 text-sm">{vehicle.supplier.name}</span>
                      <span className="text-xs text-gray-500">{vehicle.supplier.totalJobs} jobs</span>
                    </div>
                    <div className="flex items-center text-xs text-gray-600">
                      <MapPin className="w-3 h-3 mr-1" />
                      {vehicle.supplier.location}, {vehicle.supplier.district}
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-xl p-4 mb-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center">
                        <div className="text-lg font-bold text-yellow-600">
                          Rs. {vehicle.pricePerHour.toLocaleString()}
                        </div>
                        <div className="text-xs text-gray-600">per hour</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-yellow-600">
                          Rs. {vehicle.pricePerDay.toLocaleString()}
                        </div>
                        <div className="text-xs text-gray-600">per day</div>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => onVehicleSelect(vehicle)}
                    className="w-full flex items-center justify-center bg-yellow-400 text-black py-3 px-4 rounded-xl hover:bg-yellow-500 transition-colors font-semibold"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredVehicles.length === 0 && (
            <div className="text-center py-12">
              <Truck className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">No vehicles found</h3>
              <p className="text-gray-600">
                Try adjusting your filters to find vehicles that match your requirements.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};