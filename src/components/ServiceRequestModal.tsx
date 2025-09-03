import React, { useState } from 'react';
import { X, MapPin, Calendar, MessageSquare, User, Phone, Mail } from 'lucide-react';
import { MaterialItem, Vehicle, ServiceRequest } from '../types';

interface ServiceRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: MaterialItem | Vehicle | null;
  quantity?: number;
  duration?: number;
  durationType?: 'hours' | 'days';
  onSubmit: (request: Omit<ServiceRequest, 'id' | 'userId' | 'status' | 'requestDate'>) => void;
}

export const ServiceRequestModal: React.FC<ServiceRequestModalProps> = ({
  isOpen,
  onClose,
  item,
  quantity,
  duration,
  durationType,
  onSubmit
}) => {
  const [address, setAddress] = useState('');
  const [requiredDate, setRequiredDate] = useState('');
  const [notes, setNotes] = useState('');
  const [contactName, setContactName] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactEmail, setContactEmail] = useState('');

  if (!isOpen || !item) return null;

  const isVehicle = 'pricePerHour' in item;
  const totalPrice = isVehicle 
    ? (durationType === 'hours' ? item.pricePerHour : item.pricePerDay) * (duration || 1)
    : item.pricePerUnit * (quantity || 1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const request: Omit<ServiceRequest, 'id' | 'userId' | 'status' | 'requestDate'> = {
      type: isVehicle ? 'vehicle' : 'material',
      itemId: item.id,
      quantity: isVehicle ? undefined : quantity,
      duration: isVehicle ? duration : undefined,
      durationType: isVehicle ? durationType : undefined,
      totalPrice,
      requiredDate,
      address,
      notes: notes || undefined
    };

    onSubmit(request);
    onClose();
    
    // Reset form
    setAddress('');
    setRequiredDate('');
    setNotes('');
    setContactName('');
    setContactPhone('');
    setContactEmail('');
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full p-8 max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Service Request</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Service Summary */}
        <div className="mb-8 p-6 bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl border border-gray-200">
          <div className="flex items-start space-x-4">
            <img 
              src={item.image} 
              alt={item.name}
              className="w-20 h-20 rounded-xl object-cover"
            />
            <div className="flex-1">
              <h3 className="font-bold text-xl mb-2 text-gray-900">{item.name}</h3>
              <p className="text-gray-600 mb-4">{item.description}</p>
              
              <div className="grid grid-cols-2 gap-4">
                {isVehicle ? (
                  <>
                    <div className="bg-white rounded-lg p-3">
                      <span className="text-sm text-gray-500">Duration:</span>
                      <div className="font-semibold text-gray-900">{duration} {durationType}</div>
                    </div>
                    <div className="bg-white rounded-lg p-3">
                      <span className="text-sm text-gray-500">Rate:</span>
                      <div className="font-semibold text-gray-900">Rs. {(durationType === 'hours' ? item.pricePerHour : item.pricePerDay).toLocaleString()} per {durationType?.slice(0, -1)}</div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="bg-white rounded-lg p-3">
                      <span className="text-sm text-gray-500">Quantity:</span>
                      <div className="font-semibold text-gray-900">{quantity} {item.unit}</div>
                    </div>
                    <div className="bg-white rounded-lg p-3">
                      <span className="text-sm text-gray-500">Rate:</span>
                      <div className="font-semibold text-gray-900">Rs. {item.pricePerUnit.toLocaleString()} per {item.unit}</div>
                    </div>
                  </>
                )}
              </div>
              
              <div className="mt-4 p-4 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl">
                <div className="flex justify-between items-center text-white">
                  <span className="font-bold text-lg">Total Estimated Cost:</span>
                  <span className="text-2xl font-bold">Rs. {totalPrice.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Contact Information */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="flex items-center text-sm font-semibold text-gray-700 mb-3">
                <User size={16} className="mr-2" />
                Contact Person *
              </label>
              <input
                type="text"
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
                required
                placeholder="Full name of contact person"
                className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-yellow-500 transition-colors"
              />
            </div>
            <div>
              <label className="flex items-center text-sm font-semibold text-gray-700 mb-3">
                <Phone size={16} className="mr-2" />
                Phone Number *
              </label>
              <input
                type="tel"
                value={contactPhone}
                onChange={(e) => setContactPhone(e.target.value)}
                required
                placeholder="Contact phone number"
                className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-yellow-500 transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="flex items-center text-sm font-semibold text-gray-700 mb-3">
              <Mail size={16} className="mr-2" />
              Email Address *
            </label>
            <input
              type="email"
              value={contactEmail}
              onChange={(e) => setContactEmail(e.target.value)}
              required
              placeholder="Contact email address"
              className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-yellow-500 transition-colors"
            />
          </div>

          <div>
            <label className="flex items-center text-sm font-semibold text-gray-700 mb-3">
              <MapPin size={16} className="mr-2" />
              {isVehicle ? 'Service Location' : 'Delivery Address'} *
            </label>
            <textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
              rows={3}
              placeholder={`Enter complete address where ${isVehicle ? 'vehicle service' : 'material delivery'} is required`}
              className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-yellow-500 transition-colors resize-none"
            />
          </div>

          <div>
            <label className="flex items-center text-sm font-semibold text-gray-700 mb-3">
              <Calendar size={16} className="mr-2" />
              Required Date & Time *
            </label>
            <input
              type="datetime-local"
              value={requiredDate}
              onChange={(e) => setRequiredDate(e.target.value)}
              required
              min={new Date().toISOString().slice(0, 16)}
              className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-yellow-500 transition-colors"
            />
          </div>

          <div>
            <label className="flex items-center text-sm font-semibold text-gray-700 mb-3">
              <MessageSquare size={16} className="mr-2" />
              Additional Requirements
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={4}
              placeholder="Any special requirements, access instructions, or additional notes..."
              className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-yellow-500 transition-colors resize-none"
            />
          </div>

          <div className="flex space-x-4 pt-6">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 border-2 border-gray-300 text-gray-700 py-4 px-6 rounded-xl hover:bg-gray-50 transition-colors font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black py-4 px-6 rounded-xl hover:from-yellow-500 hover:to-yellow-600 transition-all duration-300 font-semibold shadow-lg"
            >
              Submit Request
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};