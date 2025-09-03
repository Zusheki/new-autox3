import React from 'react';
import { ArrowLeft, Star, MapPin, Phone, MessageCircle, User, Award, Wrench } from 'lucide-react';
import { Vehicle } from '../types';

interface VehicleDetailsProps {
  vehicle: Vehicle;
  onBack: () => void;
}

export const VehicleDetails: React.FC<VehicleDetailsProps> = ({ vehicle, onBack }) => {
  const handleCall = (phone: string) => {
    window.open(`tel:${phone}`, '_self');
  };

  const handleSMS = (phone: string, vehicleName: string, supplierName: string) => {
    const message = `Hi ${supplierName}, I'm interested in renting your ${vehicleName}. Can you provide more details about availability and rates?`;
    const smsUrl = `sms:${phone}?body=${encodeURIComponent(message)}`;
    window.open(smsUrl, '_self');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-gradient-to-r from-yellow-400 to-yellow-500 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={onBack}
            className="flex items-center text-black hover:text-gray-700 transition-colors mb-6 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg"
          >
            <ArrowLeft size={20} className="mr-2" />
            Back to Vehicles
          </button>
          <h1 className="text-4xl font-bold text-black">{vehicle.name}</h1>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <img 
                src={vehicle.image} ||
                alt={vehicle.name}
                className="w-full h-96 object-cover rounded-2xl shadow-lg mb-6"
              />
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Vehicle Details</h2>
                <p className="text-gray-600 mb-6 leading-relaxed">{vehicle.description}</p>
                
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                    <Wrench className="w-4 h-4 mr-2" />
                    Specifications:
                  </h4>
                  <div className="grid grid-cols-1 gap-2">
                    {vehicle.specifications.map((spec, index) => (
                      <div key={index} className="flex items-center text-sm text-gray-600 bg-gray-50 rounded-lg p-3">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></div>
                        {spec}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-yellow-50 rounded-xl p-4">
                    <div className="text-sm text-gray-600">Hourly Rate</div>
                    <div className="text-2xl font-bold text-yellow-600">Rs. {vehicle.pricePerHour.toLocaleString()}</div>
                  </div>
                  <div className="bg-green-50 rounded-xl p-4">
                    <div className="text-sm text-gray-600">Daily Rate</div>
                    <div className="text-2xl font-bold text-green-600">Rs. {vehicle.pricePerDay.toLocaleString()}</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Vehicle Owner</h2>
                  <div className="flex items-center bg-yellow-100 px-3 py-1 rounded-full">
                    <Star className="w-4 h-4 text-yellow-500 fill-current mr-1" />
                    <span className="font-semibold text-yellow-700">{vehicle.supplier.rating}</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="bg-yellow-100 p-2 rounded-lg mr-4">
                      <User className="w-5 h-5 text-yellow-600" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">{vehicle.supplier.name}</div>
                      <div className="text-sm text-gray-600">Vehicle Owner</div>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <div className="bg-green-100 p-2 rounded-lg mr-4">
                      <MapPin className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">Location</div>
                      <div className="text-gray-600">{vehicle.supplier.location}, {vehicle.supplier.district}</div>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <div className="bg-purple-100 p-2 rounded-lg mr-4">
                      <Phone className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">Contact Number</div>
                      <div className="text-gray-600">{vehicle.supplier.phone}</div>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <div className="bg-orange-100 p-2 rounded-lg mr-4">
                      <Award className="w-5 h-5 text-orange-600" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">Total Jobs</div>
                      <div className="text-gray-600">{vehicle.supplier.totalJobs} completed</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Contact Owner</h3>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => handleCall(vehicle.supplier.phone)}
                    className="flex items-center justify-center bg-green-500 text-white py-4 px-6 rounded-xl hover:bg-green-600 transition-colors font-semibold shadow-lg"
                  >
                    <Phone className="w-5 h-5 mr-2" />
                    Call Now
                  </button>
                  <button
                    onClick={() => handleSMS(vehicle.supplier.phone, vehicle.name, vehicle.supplier.name)}
                    className="flex items-center justify-center bg-blue-500 text-white py-4 px-6 rounded-xl hover:bg-blue-600 transition-colors font-semibold shadow-lg"
                  >
                    <MessageCircle className="w-5 h-5 mr-2" />
                    Send SMS
                  </button>
                </div>
                <p className="text-sm text-gray-500 text-center mt-4">
                  Connect directly with the vehicle owner. Negotiate your own terms and rates.
                </p>
              </div>

              <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-2xl p-8 text-black">
                <h3 className="text-xl font-bold mb-4">Quick Contact</h3>
                <p className="mb-6">Need this vehicle urgently? Contact the owner directly for immediate assistance.</p>
                <div className="flex space-x-4">
                  <button
                    onClick={() => handleCall(vehicle.supplier.phone)}
                    className="flex-1 bg-black text-yellow-400 py-3 px-4 rounded-xl hover:bg-gray-800 transition-colors font-semibold"
                  >
                    Call to Book
                  </button>
                  <button
                    onClick={() => handleSMS(vehicle.supplier.phone, vehicle.name, vehicle.supplier.name)}
                    className="flex-1 bg-white text-black py-3 px-4 rounded-xl hover:bg-gray-100 transition-colors font-semibold"
                  >
                    SMS to Book
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};