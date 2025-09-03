import React, { useState } from 'react';
import { MapPin, Phone, Clock, Navigation } from 'lucide-react';

interface Location {
  id: string;
  name: string;
  address: string;
  phone: string;
  hours: string;
  type: string;
  coordinates: { lat: number; lng: number };
}

export const InteractiveMap: React.FC = () => {
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);

  const locations: Location[] = [
    {
      id: 'main',
      name: 'Main Warehouse',
      address: 'No. 245, Lakeview Avenue, Nugegoda, Colombo 10250',
      phone: '+94 76 1098385',
      hours: 'Mon-Fri: 6:00 AM - 8:00 PM',
      type: 'Materials & Vehicle Hub',
      coordinates: { lat: 6.8649, lng: 79.8997 }
    },
    {
      id: 'north',
      name: 'North Branch',
      address: 'No. 156, Industrial Road, Kelaniya, Colombo 11500',
      phone: '+94 76 1098385',
      hours: 'Mon-Sat: 7:00 AM - 6:00 PM',
      type: 'Vehicle Rental Center',
      coordinates: { lat: 6.9553, lng: 79.9200 }
    },
    {
      id: 'south',
      name: 'South Depot',
      address: 'No. 89, Supply Chain Road, Panadura, Colombo 12500',
      phone: '+94 76 1098385',
      hours: 'Mon-Sat: 8:00 AM - 5:00 PM',
      type: 'Materials Distribution',
      coordinates: { lat: 6.7132, lng: 79.9026 }
    }
  ];

  const handleLocationClick = (location: Location) => {
    setSelectedLocation(location);
  };

  const getDirections = (location: Location) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${location.coordinates.lat},${location.coordinates.lng}`;
    window.open(url, '_blank');
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      <div className="grid lg:grid-cols-3 h-96">
        {/* Map Area */}
        <div className="lg:col-span-2 relative bg-gradient-to-br from-blue-100 to-blue-200">
          {/* SVG Map Representation */}
          <svg
            viewBox="0 0 400 300"
            className="w-full h-full"
            style={{ background: 'linear-gradient(135deg, #e0f2fe 0%, #b3e5fc 100%)' }}
          >
            {/* Background elements */}
            <defs>
              <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#90caf9" strokeWidth="0.5" opacity="0.3"/>
              </pattern>
            </defs>
            <rect width="400" height="300" fill="url(#grid)" />
            
            {/* Roads */}
            <path d="M 0 150 Q 200 120 400 150" stroke="#64b5f6" strokeWidth="3" fill="none" opacity="0.6" />
            <path d="M 200 0 Q 180 150 200 300" stroke="#64b5f6" strokeWidth="2" fill="none" opacity="0.6" />
            
            {/* Location markers */}
            {locations.map((location, index) => {
              const x = 80 + (index * 120);
              const y = 100 + (index % 2 * 80);
              const isSelected = selectedLocation?.id === location.id;
              
              return (
                <g key={location.id}>
                  {/* Marker circle */}
                  <circle
                    cx={x}
                    cy={y}
                    r={isSelected ? "12" : "8"}
                    fill={isSelected ? "#f59e0b" : "#ef4444"}
                    stroke="white"
                    strokeWidth="2"
                    className="cursor-pointer transition-all duration-300 hover:r-10"
                    onClick={() => handleLocationClick(location)}
                  />
                  
                  {/* Marker icon */}
                  <text
                    x={x}
                    y={y + 1}
                    textAnchor="middle"
                    fontSize="8"
                    fill="white"
                    className="pointer-events-none font-bold"
                  >
                    •
                  </text>
                  
                  {/* Location label */}
                  <text
                    x={x}
                    y={y + 25}
                    textAnchor="middle"
                    fontSize="10"
                    fill="#1f2937"
                    className="font-semibold pointer-events-none"
                  >
                    {location.name.split(' ')[0]}
                  </text>
                  
                  {/* Pulse animation for selected location */}
                  {isSelected && (
                    <circle
                      cx={x}
                      cy={y}
                      r="15"
                      fill="none"
                      stroke="#f59e0b"
                      strokeWidth="2"
                      opacity="0.6"
                    >
                      <animate
                        attributeName="r"
                        values="12;20;12"
                        dur="2s"
                        repeatCount="indefinite"
                      />
                      <animate
                        attributeName="opacity"
                        values="0.6;0;0.6"
                        dur="2s"
                        repeatCount="indefinite"
                      />
                    </circle>
                  )}
                </g>
              );
            })}
            
            {/* Decorative elements */}
            <circle cx="350" cy="50" r="3" fill="#4fc3f7" opacity="0.7" />
            <circle cx="50" cy="250" r="2" fill="#4fc3f7" opacity="0.7" />
            <circle cx="320" cy="220" r="2.5" fill="#4fc3f7" opacity="0.7" />
          </svg>
          
          {/* Map overlay info */}
          <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg">
            <h4 className="font-bold text-gray-900 mb-1">Auto X Locations</h4>
            <p className="text-sm text-gray-600">Click markers for details</p>
          </div>
          
          {/* Legend */}
          <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg">
            <div className="flex items-center space-x-4 text-xs">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                <span>Locations</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
                <span>Selected</span>
              </div>
            </div>
          </div>
        </div>

        {/* Location Details Panel */}
        <div className="bg-gray-50 p-6 overflow-y-auto">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Our Locations</h3>
          
          {selectedLocation ? (
            <div className="space-y-4">
              <div className="bg-white rounded-xl p-4 border-l-4 border-yellow-400">
                <h4 className="font-bold text-gray-900 mb-2">{selectedLocation.name}</h4>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <MapPin className="w-4 h-4 text-gray-500 mr-2 mt-1" />
                    <div>
                      <p className="text-sm text-gray-700">{selectedLocation.address}</p>
                      <p className="text-xs text-gray-500 mt-1">{selectedLocation.type}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <Phone className="w-4 h-4 text-gray-500 mr-2" />
                    <a 
                      href={`tel:${selectedLocation.phone}`}
                      className="text-sm text-blue-600 hover:text-blue-700 transition-colors"
                    >
                      {selectedLocation.phone}
                    </a>
                  </div>
                  
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 text-gray-500 mr-2" />
                    <p className="text-sm text-gray-700">{selectedLocation.hours}</p>
                  </div>
                </div>
                
                <button
                  onClick={() => getDirections(selectedLocation)}
                  className="w-full mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center"
                >
                  <Navigation className="w-4 h-4 mr-2" />
                  Get Directions
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <p className="text-gray-600 text-sm mb-4">Select a location on the map to view details</p>
              
              {locations.map((location) => (
                <button
                  key={location.id}
                  onClick={() => handleLocationClick(location)}
                  className="w-full text-left bg-white rounded-lg p-3 hover:bg-blue-50 transition-colors border border-gray-200"
                >
                  <h5 className="font-semibold text-gray-900 text-sm">{location.name}</h5>
                  <p className="text-xs text-gray-600 mt-1">{location.type}</p>
                </button>
              ))}
            </div>
          )}
          
          {/* Quick Actions */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <h4 className="font-semibold text-gray-900 mb-3 text-sm">Quick Actions</h4>
            <div className="space-y-2">
              <a
                href="tel:+94761098385"
                className="w-full bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-colors flex items-center justify-center text-sm"
              >
                <Phone className="w-4 h-4 mr-2" />
                Call Main Office
              </a>
              <button
                onClick={() => {
                  const message = "Hi, I'd like to know more about your services.";
                  const whatsappUrl = `https://wa.me/94761098385?text=${encodeURIComponent(message)}`;
                  window.open(whatsappUrl, '_blank');
                }}
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center text-sm"
              >
                WhatsApp Us
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};