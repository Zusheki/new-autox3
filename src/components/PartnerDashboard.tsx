import React, { useState } from 'react';
import { Plus, Edit, Eye, Star, Bell, Settings, User, MapPin, Phone, Camera, Upload } from 'lucide-react';
import { Partner, PartnerVehicle, PartnerMaterial, Notification } from '../types';

interface PartnerDashboardProps {
  partner: Partner;
  vehicles?: PartnerVehicle[];
  materials?: PartnerMaterial[];
}

export const PartnerDashboard: React.FC<PartnerDashboardProps> = ({ partner, vehicles = [], materials = [] }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'listings' | 'notifications' | 'profile'>('overview');
  const [notifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'contact_request',
      from: {
        name: 'Saman Perera',
        phone: '+94 77 1234567',
        email: 'saman@example.lk',
        profileImage: ''
      },
      message: 'Hi, I need your JCB for a construction project in Colombo. Can you provide availability and rates?',
      itemName: 'JCB 3CX Backhoe Loader',
      itemType: 'vehicle',
      timestamp: '2024-01-15T10:30:00Z',
      read: false
    },
    {
      id: '2',
      type: 'inquiry',
      from: {
        name: 'Nimal Silva',
        phone: '+94 76 9876543',
        email: 'nimal@construction.lk'
      },
      message: 'I need 10 cubic meters of river sand for my project. What is your best price?',
      itemName: 'Premium River Sand',
      itemType: 'material',
      timestamp: '2024-01-15T09:15:00Z',
      read: false
    },
    {
      id: '3',
      type: 'contact_request',
      from: {
        name: 'Kamala Fernando',
        phone: '+94 75 5555555',
        email: 'kamala@builders.lk'
      },
      message: 'Looking for a reliable tipper truck for material transportation. Are you available next week?',
      itemName: 'TATA 1613 Tipper',
      itemType: 'vehicle',
      timestamp: '2024-01-14T16:45:00Z',
      read: true
    }
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const stats = {
    totalListings: partner.type === 'vehicle_owner' ? vehicles.length : materials.length,
    activeListings: partner.type === 'vehicle_owner' 
      ? vehicles.filter(v => v.status === 'active').length 
      : materials.filter(m => m.status === 'active').length,
    totalInquiries: notifications.length,
    responseRate: 98
  };

  const formatTimeAgo = (timestamp: string) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInHours = Math.floor((now.getTime() - time.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return `${Math.floor(diffInHours / 24)}d ago`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Partner Dashboard</h1>
              <p className="text-gray-600 mt-1">Welcome back, {partner.businessName}</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                partner.status === 'approved' 
                  ? 'bg-green-100 text-green-800' 
                  : partner.status === 'pending'
                  ? 'bg-yellow-100 text-yellow-800'
                  : 'bg-red-100 text-red-800'
              }`}>
                {partner.status.charAt(0).toUpperCase() + partner.status.slice(1)}
              </div>
              <div className="flex items-center">
                <Star className="w-5 h-5 text-yellow-400 fill-current" />
                <span className="ml-1 font-semibold">{partner.rating.toFixed(1)}</span>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex space-x-8">
            {[
              { id: 'overview', label: 'Overview' },
              { id: 'listings', label: partner.type === 'vehicle_owner' ? 'My Vehicles' : 'My Materials' },
              { id: 'notifications', label: 'Notifications', badge: unreadCount },
              { id: 'profile', label: 'Profile' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors relative ${
                  activeTab === tab.id
                    ? 'border-yellow-500 text-yellow-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label}
                {tab.badge && tab.badge > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {tab.badge}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Stats Cards */}
            <div className="grid md:grid-cols-4 gap-6">
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm">Total Listings</p>
                    <p className="text-3xl font-bold text-gray-900">{stats.totalListings}</p>
                  </div>
                  <div className="bg-blue-100 p-3 rounded-xl">
                    <Plus className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm">Active Listings</p>
                    <p className="text-3xl font-bold text-gray-900">{stats.activeListings}</p>
                  </div>
                  <div className="bg-green-100 p-3 rounded-xl">
                    <Eye className="w-6 h-6 text-green-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm">Total Inquiries</p>
                    <p className="text-3xl font-bold text-gray-900">{stats.totalInquiries}</p>
                  </div>
                  <div className="bg-orange-100 p-3 rounded-xl">
                    <Bell className="w-6 h-6 text-orange-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm">Response Rate</p>
                    <p className="text-3xl font-bold text-gray-900">{stats.responseRate}%</p>
                  </div>
                  <div className="bg-purple-100 p-3 rounded-xl">
                    <Star className="w-6 h-6 text-purple-600" />
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Inquiries */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Recent Customer Inquiries</h3>
              <div className="space-y-4">
                {notifications.slice(0, 3).map((notification) => (
                  <div key={notification.id} className="flex items-start p-4 bg-gray-50 rounded-xl">
                    <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mr-4">
                      <User className="w-6 h-6 text-yellow-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-gray-900">{notification.from.name}</h4>
                        <span className="text-sm text-gray-500">{formatTimeAgo(notification.timestamp)}</span>
                      </div>
                      <p className="text-gray-600 text-sm mb-2">{notification.message}</p>
                      <div className="flex items-center text-xs text-gray-500">
                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full mr-2">
                          {notification.itemName}
                        </span>
                        <span>{notification.from.phone}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Listings Tab */}
        {activeTab === 'listings' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">
                My {partner.type === 'vehicle_owner' ? 'Vehicles' : 'Materials'}
              </h2>
              <button className="bg-yellow-400 text-black px-6 py-3 rounded-xl hover:bg-yellow-500 transition-colors flex items-center">
                <Plus className="w-5 h-5 mr-2" />
                Add New {partner.type === 'vehicle_owner' ? 'Vehicle' : 'Material'}
              </button>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
              <Upload className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Manage Your Listings</h3>
              <p className="text-gray-600 mb-6">
                Add photos and details of your {partner.type === 'vehicle_owner' ? 'vehicles' : 'materials'} to attract more customers
              </p>
              <button className="bg-yellow-400 text-black px-6 py-3 rounded-xl hover:bg-yellow-500 transition-colors">
                Create First Listing
              </button>
            </div>
          </div>
        )}

        {/* Notifications Tab */}
        {activeTab === 'notifications' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Customer Inquiries</h2>
              <span className="text-sm text-gray-600">{unreadCount} unread</span>
            </div>

            <div className="space-y-4">
              {notifications.map((notification) => (
                <div 
                  key={notification.id} 
                  className={`bg-white rounded-2xl p-6 shadow-lg border-l-4 ${
                    notification.read ? 'border-gray-200' : 'border-yellow-400'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                        <User className="w-6 h-6 text-yellow-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h4 className="font-bold text-gray-900">{notification.from.name}</h4>
                          {!notification.read && (
                            <span className="bg-yellow-400 text-black text-xs px-2 py-1 rounded-full">New</span>
                          )}
                        </div>
                        <div className="space-y-2 mb-4">
                          <div className="flex items-center text-sm text-gray-600">
                            <Phone className="w-4 h-4 mr-2" />
                            {notification.from.phone}
                          </div>
                          <div className="flex items-center text-sm text-gray-600">
                            <MapPin className="w-4 h-4 mr-2" />
                            Interested in: {notification.itemName}
                          </div>
                        </div>
                        <p className="text-gray-700 bg-gray-50 p-3 rounded-lg">{notification.message}</p>
                      </div>
                    </div>
                    <span className="text-sm text-gray-500">{formatTimeAgo(notification.timestamp)}</span>
                  </div>
                  
                  <div className="mt-4 flex space-x-3">
                    <button 
                      onClick={() => window.open(`tel:${notification.from.phone}`, '_self')}
                      className="flex-1 bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-colors flex items-center justify-center"
                    >
                      <Phone className="w-4 h-4 mr-2" />
                      Call Customer
                    </button>
                    <button 
                      onClick={() => {
                        const message = `Hi ${notification.from.name}, thank you for your inquiry about ${notification.itemName}. I'd be happy to help you.`;
                        const whatsappUrl = `https://wa.me/${notification.from.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`;
                        window.open(whatsappUrl, '_blank');
                      }}
                      className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center"
                    >
                      <Bell className="w-4 h-4 mr-2" />
                      Send Message
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Business Profile</h2>
            
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Business Information</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-semibold text-gray-700">Business Name</label>
                      <div className="bg-gray-50 rounded-lg px-4 py-3 text-gray-900">{partner.businessName}</div>
                    </div>
                    <div>
                      <label className="text-sm font-semibold text-gray-700">Owner Name</label>
                      <div className="bg-gray-50 rounded-lg px-4 py-3 text-gray-900">{partner.ownerName}</div>
                    </div>
                    <div>
                      <label className="text-sm font-semibold text-gray-700">Email</label>
                      <div className="bg-gray-50 rounded-lg px-4 py-3 text-gray-900">{partner.email}</div>
                    </div>
                    <div>
                      <label className="text-sm font-semibold text-gray-700">Phone</label>
                      <div className="bg-gray-50 rounded-lg px-4 py-3 text-gray-900">{partner.phone}</div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Location & Services</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-semibold text-gray-700">Address</label>
                      <div className="bg-gray-50 rounded-lg px-4 py-3 text-gray-900">{partner.address}</div>
                    </div>
                    <div>
                      <label className="text-sm font-semibold text-gray-700">District</label>
                      <div className="bg-gray-50 rounded-lg px-4 py-3 text-gray-900">{partner.district}</div>
                    </div>
                    <div>
                      <label className="text-sm font-semibold text-gray-700">Services</label>
                      <div className="bg-gray-50 rounded-lg px-4 py-3">
                        <div className="flex flex-wrap gap-2">
                          {partner.services.map((service, index) => (
                            <span key={index} className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-sm">
                              {service}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-gray-200">
                <button className="bg-yellow-400 text-black px-6 py-3 rounded-xl hover:bg-yellow-500 transition-colors flex items-center">
                  <Edit className="w-5 h-5 mr-2" />
                  Edit Profile
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};