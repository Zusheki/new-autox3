import React, { useState } from 'react';
import { ArrowLeft, Filter, Search, Star, MapPin, Phone, MessageCircle, User, Award, Truck, Package, Eye } from 'lucide-react';
import { vehicles, materialItems, sriLankanDistricts } from '../data/services';
import { Vehicle, MaterialItem, User as UserType } from '../types';

interface ServicesListingPageProps {
  onBack: () => void;
  user?: UserType | null;
}

export const ServicesListingPage: React.FC<ServicesListingPageProps> = ({ onBack, user }) => {
  const [serviceType, setServiceType] = useState<'vehicles' | 'materials'>('vehicles');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedItem, setSelectedItem] = useState<Vehicle | MaterialItem | null>(null);

  // Get unique categories based on service type
  const getCategories = () => {
    if (serviceType === 'vehicles') {
      return [...new Set(vehicles.map(v => v.category))];
    } else {
      return [...new Set(materialItems.map(m => m.category))];
    }
  };

  // Filter items based on selected filters
  const getFilteredItems = () => {
    const items = serviceType === 'vehicles' ? vehicles : materialItems;
    
    return items.filter(item => {
      const districtMatch = selectedDistrict ? item.supplier.district === selectedDistrict : true;
      const categoryMatch = selectedCategory ? item.category === selectedCategory : true;
      const searchMatch = searchTerm ? 
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.supplier.name.toLowerCase().includes(searchTerm.toLowerCase())
        : true;
      
      return districtMatch && categoryMatch && searchMatch;
    });
  };

  const handleCall = (phone: string) => {
    window.open(`tel:${phone}`, '_self');
  };

  const handleMessage = (phone: string, supplierName: string, itemName: string) => {
    const message = `Hi ${supplierName}, I'm interested in your ${itemName}. Can you provide more details about availability and pricing?`;
    const whatsappUrl = `https://wa.me/${phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const isVehicle = (item: Vehicle | MaterialItem): item is Vehicle => {
    return 'pricePerHour' in item;
  };

  // Item detail view
  if (selectedItem) {
    const isVehicleItem = isVehicle(selectedItem);
    
    return (
      <div className="min-h-screen bg-gray-50">
        <section className={`bg-gradient-to-r ${isVehicleItem ? 'from-blue-600 to-blue-700' : 'from-yellow-400 to-yellow-500'} py-12`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <button
              onClick={() => setSelectedItem(null)}
              className={`flex items-center ${isVehicleItem ? 'text-white hover:text-blue-200' : 'text-black hover:text-gray-700'} transition-colors mb-6 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg`}
            >
              <ArrowLeft size={20} className="mr-2" />
              Back to Listings
            </button>
            <h1 className={`text-4xl font-bold ${isVehicleItem ? 'text-white' : 'text-black'}`}>
              {selectedItem.name}
            </h1>
          </div>
        </section>

        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12">
              <div>
                <img 
                  src={selectedItem.image} 
                  alt={selectedItem.name}
                  className="w-full h-96 object-cover rounded-2xl shadow-lg mb-6"
                />
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    {isVehicleItem ? 'Vehicle' : 'Material'} Details
                  </h2>
                  <p className="text-gray-600 mb-6 leading-relaxed">{selectedItem.description}</p>
                  
                  {isVehicleItem && (
                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-800 mb-3">Specifications:</h4>
                      <div className="grid grid-cols-1 gap-2">
                        {selectedItem.specifications.map((spec, index) => (
                          <div key={index} className="flex items-center text-sm text-gray-600 bg-gray-50 rounded-lg p-3">
                            <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                            {spec}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-4">
                    {isVehicleItem ? (
                      <>
                        <div className="bg-blue-50 rounded-xl p-4">
                          <div className="text-sm text-gray-600">Hourly Rate</div>
                          <div className="text-2xl font-bold text-blue-600">Rs. {selectedItem.pricePerHour.toLocaleString()}</div>
                        </div>
                        <div className="bg-green-50 rounded-xl p-4">
                          <div className="text-sm text-gray-600">Daily Rate</div>
                          <div className="text-2xl font-bold text-green-600">Rs. {selectedItem.pricePerDay.toLocaleString()}</div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="bg-yellow-50 rounded-xl p-4">
                          <div className="text-sm text-gray-600">Price per {selectedItem.unit}</div>
                          <div className="text-2xl font-bold text-yellow-600">Rs. {selectedItem.pricePerUnit.toLocaleString()}</div>
                        </div>
                        <div className="bg-green-50 rounded-xl p-4">
                          <div className="text-sm text-gray-600">Availability</div>
                          <div className="text-lg font-semibold text-green-600">
                            {selectedItem.available ? 'In Stock' : 'Out of Stock'}
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-white rounded-2xl p-8 shadow-lg">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">
                      {isVehicleItem ? 'Vehicle Owner' : 'Material Supplier'}
                    </h2>
                    <div className={`flex items-center ${isVehicleItem ? 'bg-blue-100' : 'bg-yellow-100'} px-3 py-1 rounded-full`}>
                      <Star className={`w-4 h-4 ${isVehicleItem ? 'text-blue-500' : 'text-yellow-500'} fill-current mr-1`} />
                      <span className={`font-semibold ${isVehicleItem ? 'text-blue-700' : 'text-yellow-700'}`}>
                        {selectedItem.supplier.rating}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center">
                      <div className={`${isVehicleItem ? 'bg-blue-100' : 'bg-yellow-100'} p-2 rounded-lg mr-4`}>
                        <User className={`w-5 h-5 ${isVehicleItem ? 'text-blue-600' : 'text-yellow-600'}`} />
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">{selectedItem.supplier.name}</div>
                        <div className="text-sm text-gray-600">
                          {isVehicleItem ? 'Vehicle Owner' : 'Material Supplier'}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center">
                      <div className="bg-green-100 p-2 rounded-lg mr-4">
                        <MapPin className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">Location</div>
                        <div className="text-gray-600">{selectedItem.supplier.location}, {selectedItem.supplier.district}</div>
                      </div>
                    </div>

                    <div className="flex items-center">
                      <div className="bg-purple-100 p-2 rounded-lg mr-4">
                        <Phone className="w-5 h-5 text-purple-600" />
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">Contact Number</div>
                        <div className="text-gray-600">{selectedItem.supplier.phone}</div>
                      </div>
                    </div>

                    <div className="flex items-center">
                      <div className="bg-orange-100 p-2 rounded-lg mr-4">
                        <Award className="w-5 h-5 text-orange-600" />
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">
                          {isVehicleItem ? 'Total Jobs' : 'Total Orders'}
                        </div>
                        <div className="text-gray-600">
                          {isVehicleItem ? selectedItem.supplier.totalJobs : selectedItem.supplier.totalOrders} completed
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-8 shadow-lg">
                  <h3 className="text-xl font-bold text-gray-900 mb-6">Contact {isVehicleItem ? 'Owner' : 'Supplier'}</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      onClick={() => handleCall(selectedItem.supplier.phone)}
                      className="flex items-center justify-center bg-green-500 text-white py-4 px-6 rounded-xl hover:bg-green-600 transition-colors font-semibold shadow-lg"
                    >
                      <Phone className="w-5 h-5 mr-2" />
                      Call Now
                    </button>
                    <button
                      onClick={() => handleMessage(selectedItem.supplier.phone, selectedItem.supplier.name, selectedItem.name)}
                      className="flex items-center justify-center bg-blue-500 text-white py-4 px-6 rounded-xl hover:bg-blue-600 transition-colors font-semibold shadow-lg"
                    >
                      <MessageCircle className="w-5 h-5 mr-2" />
                      Message
                    </button>
                  </div>
                  <p className="text-sm text-gray-500 text-center mt-4">
                    Connect directly with the {isVehicleItem ? 'vehicle owner' : 'material supplier'}. Negotiate your own terms and pricing.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  // Main listing view
  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-gradient-to-r from-yellow-400 to-yellow-500 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {user && (
            <button
              onClick={onBack}
              className="flex items-center text-black hover:text-gray-700 transition-colors mb-8 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg"
            >
              <ArrowLeft size={20} className="mr-2" />
              Back
            </button>
          )}

          <div className="text-center text-black">
            <h1 className="text-5xl lg:text-6xl font-bold mb-6">
              {user ? `Welcome, ${user.name}!` : 'Find Services'}
            </h1>
            <p className="text-xl max-w-3xl mx-auto mb-8">
              {user 
                ? 'What would you like to find today? Choose from vehicles or materials to get started.'
                : 'Browse vehicles and materials from verified suppliers across Sri Lanka.'
              }
            </p>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Service Type Toggle */}
          <div className="bg-white rounded-2xl p-6 shadow-lg mb-8">
            <div className="flex items-center justify-center mb-6">
              <div className="bg-gray-100 rounded-xl p-1 flex">
                <button
                  onClick={() => setServiceType('vehicles')}
                  className={`flex items-center px-6 py-3 rounded-lg font-semibold transition-colors ${
                    serviceType === 'vehicles'
                      ? 'bg-blue-500 text-white shadow-lg'
                      : 'text-gray-600 hover:text-blue-600'
                  }`}
                >
                  <Truck className="w-5 h-5 mr-2" />
                  Vehicles
                </button>
                <button
                  onClick={() => setServiceType('materials')}
                  className={`flex items-center px-6 py-3 rounded-lg font-semibold transition-colors ${
                    serviceType === 'materials'
                      ? 'bg-yellow-400 text-black shadow-lg'
                      : 'text-gray-600 hover:text-yellow-600'
                  }`}
                >
                  <Package className="w-5 h-5 mr-2" />
                  Materials
                </button>
              </div>
            </div>

            {/* Filters */}
            <div className="grid md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <Filter className="w-4 h-4 inline mr-1" />
                  District
                </label>
                <select
                  value={selectedDistrict}
                  onChange={(e) => setSelectedDistrict(e.target.value)}
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 transition-colors"
                >
                  <option value="">All Districts</option>
                  {sriLankanDistricts.map((district) => (
                    <option key={district} value={district}>{district}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 transition-colors"
                >
                  <option value="">All Categories</option>
                  {getCategories().map((category) => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <Search className="w-4 h-4 inline mr-1" />
                  Search
                </label>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search by name, description, or supplier..."
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>
            </div>
          </div>

          {/* Results Count */}
          <div className="mb-6">
            <p className="text-gray-600">
              Showing {getFilteredItems().length} {serviceType}
              {selectedDistrict && ` in ${selectedDistrict} district`}
              {selectedCategory && ` in ${selectedCategory} category`}
            </p>
          </div>

          {/* Items Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {getFilteredItems().map((item) => {
              const isVehicleItem = isVehicle(item);
              
              return (
                <div
                  key={item.id}
                  className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-blue-200 cursor-pointer"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm font-medium ml-1">{item.supplier.rating}</span>
                      </div>
                    </div>
                    <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-sm font-medium ${
                      item.available 
                        ? 'bg-green-500 text-white' 
                        : 'bg-red-500 text-white'
                    }`}>
                      {item.available ? 'Available' : isVehicleItem ? 'Booked' : 'Out of Stock'}
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{item.name}</h3>
                    <p className="text-gray-600 mb-4 text-sm leading-relaxed line-clamp-2">{item.description}</p>
                    
                    <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold text-gray-900 text-sm">{item.supplier.name}</span>
                        <span className="text-xs text-gray-500">
                          {isVehicleItem ? item.supplier.totalJobs : item.supplier.totalOrders} completed
                        </span>
                      </div>
                      <div className="flex items-center text-xs text-gray-600">
                        <MapPin className="w-3 h-3 mr-1" />
                        {item.supplier.location}, {item.supplier.district}
                      </div>
                    </div>
                    
                    <div className={`bg-gradient-to-r ${isVehicleItem ? 'from-blue-50 to-blue-100' : 'from-yellow-50 to-yellow-100'} rounded-xl p-4 mb-4`}>
                      {isVehicleItem ? (
                        <div className="grid grid-cols-2 gap-4">
                          <div className="text-center">
                            <div className="text-lg font-bold text-blue-600">
                              Rs. {item.pricePerHour.toLocaleString()}
                            </div>
                            <div className="text-xs text-gray-600">per hour</div>
                          </div>
                          <div className="text-center">
                            <div className="text-lg font-bold text-blue-600">
                              Rs. {item.pricePerDay.toLocaleString()}
                            </div>
                            <div className="text-xs text-gray-600">per day</div>
                          </div>
                        </div>
                      ) : (
                        <div className="text-center">
                          <div className="text-xl font-bold text-yellow-600">
                            Rs. {item.pricePerUnit.toLocaleString()}
                          </div>
                          <div className="text-sm text-gray-600">per {item.unit}</div>
                        </div>
                      )}
                    </div>

                    <button
                      onClick={() => setSelectedItem(item)}
                      className="w-full flex items-center justify-center bg-gray-100 text-gray-700 py-3 px-4 rounded-xl hover:bg-gray-200 transition-colors font-semibold"
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      View Details
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {getFilteredItems().length === 0 && (
            <div className="text-center py-12">
              {serviceType === 'vehicles' ? (
                <Truck className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              ) : (
                <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              )}
              <h3 className="text-xl font-bold text-gray-900 mb-2">No {serviceType} found</h3>
              <p className="text-gray-600">
                Try adjusting your filters or search terms to find what you're looking for.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};