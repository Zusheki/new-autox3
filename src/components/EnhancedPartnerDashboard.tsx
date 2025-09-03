import React, { useState } from 'react';
import { Plus, Edit, Eye, Star, Bell, Settings, User, MapPin, Phone, Camera, Upload, Trash2, MessageSquare, BarChart3, LogOut } from 'lucide-react';
import { Partner, PartnerVehicle, PartnerMaterial, Notification } from '../types';

interface EnhancedPartnerDashboardProps {
  partner: Partner;
  vehicles?: PartnerVehicle[];
  materials?: PartnerMaterial[];
  onLogout: () => void;
}

export const EnhancedPartnerDashboard: React.FC<EnhancedPartnerDashboardProps> = ({ 
  partner, 
  vehicles = [], 
  materials = [],
  onLogout 
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'listings' | 'notifications' | 'profile'>('overview');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  
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
  const items = partner.type === 'vehicle_owner' ? vehicles : materials;
  const activeItems = items.filter(item => item.status === 'active');

  const stats = {
    totalListings: items.length,
    activeListings: activeItems.length,
    totalInquiries: notifications.length,
    responseRate: 98,
    totalEarnings: partner.type === 'vehicle_owner' ? 'Rs. 450,000' : 'Rs. 320,000',
    avgRating: 4.8
  };

  const formatTimeAgo = (timestamp: string) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInHours = Math.floor((now.getTime() - time.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return `${Math.floor(diffInHours / 24)}d ago`;
  };

  const AddListingModal = () => {
    const [formData, setFormData] = useState({
      name: '',
      description: '',
      price: '',
      category: '',
      image: null as File | null
    });

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      // Handle form submission
      console.log('Adding new listing:', formData);
      setShowAddModal(false);
      setFormData({ name: '', description: '', price: '', category: '', image: null });
    };

    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl max-w-2xl w-full p-8 max-h-[90vh] overflow-y-auto shadow-2xl">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Add New {partner.type === 'vehicle_owner' ? 'Vehicle' : 'Material'}
            </h2>
            <button
              onClick={() => setShowAddModal(false)}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              ✕
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                {partner.type === 'vehicle_owner' ? 'Vehicle' : 'Material'} Name *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                required
                placeholder={partner.type === 'vehicle_owner' ? 'e.g., JCB 3CX Backhoe Loader' : 'e.g., Premium River Sand'}
                className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-yellow-500 transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Category *</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
                required
                className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-yellow-500 transition-colors"
              >
                <option value="">Select Category</option>
                {partner.type === 'vehicle_owner' ? (
                  <>
                    <option value="jcb">JCB</option>
                    <option value="excavator">Excavator</option>
                    <option value="tipper">Tipper</option>
                    <option value="lorry">Lorry</option>
                    <option value="bowser">Water Bowser</option>
                    <option value="crane">Crane</option>
                  </>
                ) : (
                  <>
                    <option value="sand">Sand</option>
                    <option value="soil">Soil</option>
                    <option value="gravel">Gravel</option>
                    <option value="metal">Metal</option>
                    <option value="bricks">Bricks</option>
                  </>
                )}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Description *</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                required
                rows={4}
                placeholder="Describe your item, its condition, and any special features..."
                className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-yellow-500 transition-colors resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Price (Rs.) *
              </label>
              <input
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({...formData, price: e.target.value})}
                required
                placeholder={partner.type === 'vehicle_owner' ? 'Price per hour' : 'Price per unit'}
                className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-yellow-500 transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Image *</label>
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-yellow-500 transition-colors">
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setFormData({...formData, image: e.target.files?.[0] || null})}
                  className="hidden"
                  id="itemImage"
                />
                <label
                  htmlFor="itemImage"
                  className="bg-yellow-400 text-black px-4 py-2 rounded-lg cursor-pointer hover:bg-yellow-500 transition-colors"
                >
                  Choose Image
                </label>
                {formData.image && (
                  <p className="text-sm text-green-600 mt-2">✓ {formData.image.name}</p>
                )}
              </div>
            </div>

            <div className="flex space-x-4 pt-6">
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="flex-1 border-2 border-gray-300 text-gray-700 py-3 px-6 rounded-xl hover:bg-gray-50 transition-colors font-semibold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black py-3 px-6 rounded-xl hover:from-yellow-500 hover:to-yellow-600 transition-all duration-300 font-semibold shadow-lg"
              >
                Add Listing
              </button>
            </div>
          </form>
        </div>
      </div>
    );
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
                <span className="ml-1 font-semibold">{stats.avgRating}</span>
              </div>
              <button
                onClick={onLogout}
                className="flex items-center space-x-2 text-red-600 hover:text-red-700 transition-colors"
              >
                <LogOut size={20} />
                <span>Logout</span>
              </button>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex space-x-8">
            {[
              { id: 'overview', label: 'Overview', icon: BarChart3 },
              { id: 'listings', label: `My ${partner.type === 'vehicle_owner' ? 'Vehicles' : 'Materials'}`, icon: partner.type === 'vehicle_owner' ? Truck : Package },
              { id: 'notifications', label: 'Notifications', badge: unreadCount, icon: Bell },
              { id: 'profile', label: 'Profile', icon: User }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors relative flex items-center ${
                  activeTab === tab.id
                    ? 'border-yellow-500 text-yellow-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <tab.icon size={16} className="mr-2" />
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
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
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
                    <p className="text-gray-600 text-sm">Monthly Earnings</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.totalEarnings}</p>
                  </div>
                  <div className="bg-purple-100 p-3 rounded-xl">
                    <Star className="w-6 h-6 text-purple-600" />
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Quick Actions</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <button
                  onClick={() => setShowAddModal(true)}
                  className="flex items-center justify-center bg-gradient-to-r from-yellow-400 to-yellow-500 text-black py-4 px-6 rounded-xl hover:from-yellow-500 hover:to-yellow-600 transition-all duration-300 font-semibold shadow-lg"
                >
                  <Plus className="w-5 h-5 mr-2" />
                  Add New {partner.type === 'vehicle_owner' ? 'Vehicle' : 'Material'}
                </button>
                
                <button
                  onClick={() => setActiveTab('notifications')}
                  className="flex items-center justify-center bg-blue-500 text-white py-4 px-6 rounded-xl hover:bg-blue-600 transition-colors font-semibold shadow-lg"
                >
                  <Bell className="w-5 h-5 mr-2" />
                  View Notifications ({unreadCount})
                </button>
                
                <button
                  onClick={() => setActiveTab('profile')}
                  className="flex items-center justify-center bg-gray-500 text-white py-4 px-6 rounded-xl hover:bg-gray-600 transition-colors font-semibold shadow-lg"
                >
                  <Settings className="w-5 h-5 mr-2" />
                  Profile Settings
                </button>
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
              <button 
                onClick={() => setShowAddModal(true)}
                className="bg-yellow-400 text-black px-6 py-3 rounded-xl hover:bg-yellow-500 transition-colors flex items-center font-semibold shadow-lg"
              >
                <Plus className="w-5 h-5 mr-2" />
                Add New {partner.type === 'vehicle_owner' ? 'Vehicle' : 'Material'}
              </button>
            </div>

            {items.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 shadow-lg text-center">
                <Upload className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">No Listings Yet</h3>
                <p className="text-gray-600 mb-6">
                  Start by adding your first {partner.type === 'vehicle_owner' ? 'vehicle' : 'material'} to attract customers
                </p>
                <button 
                  onClick={() => setShowAddModal(true)}
                  className="bg-yellow-400 text-black px-6 py-3 rounded-xl hover:bg-yellow-500 transition-colors font-semibold"
                >
                  Create First Listing
                </button>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {items.map((item) => (
                  <div key={item.id} className="bg-white rounded-2xl shadow-lg overflow-hidden">
                    <div className="relative">
                      <img
                        src={item.images?.[0] || 'https://images.pexels.com/photos/1216589/pexels-photo-1216589.jpeg?auto=compress&cs=tinysrgb&w=800'}
                        alt={item.name}
                        className="w-full h-48 object-cover"
                      />
                      <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-sm font-medium ${
                        item.status === 'active' 
                          ? 'bg-green-500 text-white' 
                          : 'bg-red-500 text-white'
                      }`}>
                        {item.status}
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <h3 className="text-lg font-bold text-gray-900 mb-2">{item.name}</h3>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">{item.description}</p>
                      
                      <div className="bg-gray-50 rounded-lg p-3 mb-4">
                        <div className="text-xl font-bold text-yellow-600">
                          Rs. {partner.type === 'vehicle_owner' 
                            ? (item as PartnerVehicle).pricePerHour?.toLocaleString() 
                            : (item as PartnerMaterial).pricePerUnit?.toLocaleString()
                          }
                        </div>
                        <div className="text-sm text-gray-600">
                          per {partner.type === 'vehicle_owner' ? 'hour' : (item as PartnerMaterial).unit}
                        </div>
                      </div>

                      <div className="flex space-x-2">
                        <button
                          onClick={() => setEditingItem(item)}
                          className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center"
                        >
                          <Edit className="w-4 h-4 mr-1" />
                          Edit
                        </button>
                        <button className="flex-1 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-colors flex items-center justify-center">
                          <Trash2 className="w-4 h-4 mr-1" />
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
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
                      <MessageSquare className="w-4 h-4 mr-2" />
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
            <h2 className="text-2xl font-bold text-gray-900">Profile Settings</h2>
            
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Business Information</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-semibold text-gray-700">Business Name</label>
                      <input 
                        type="text" 
                        value={partner.businessName}
                        className="w-full bg-gray-50 rounded-lg px-4 py-3 text-gray-900 border-2 border-gray-200 focus:border-yellow-500 focus:outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-semibold text-gray-700">Owner Name</label>
                      <input 
                        type="text" 
                        value={partner.ownerName}
                        className="w-full bg-gray-50 rounded-lg px-4 py-3 text-gray-900 border-2 border-gray-200 focus:border-yellow-500 focus:outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-semibold text-gray-700">Email</label>
                      <input 
                        type="email" 
                        value={partner.email}
                        className="w-full bg-gray-50 rounded-lg px-4 py-3 text-gray-900 border-2 border-gray-200 focus:border-yellow-500 focus:outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-semibold text-gray-700">Phone</label>
                      <input 
                        type="tel" 
                        value={partner.phone}
                        className="w-full bg-gray-50 rounded-lg px-4 py-3 text-gray-900 border-2 border-gray-200 focus:border-yellow-500 focus:outline-none transition-colors"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Location & Services</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-semibold text-gray-700">Address</label>
                      <textarea 
                        value={partner.address}
                        rows={3}
                        className="w-full bg-gray-50 rounded-lg px-4 py-3 text-gray-900 border-2 border-gray-200 focus:border-yellow-500 focus:outline-none transition-colors resize-none"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-semibold text-gray-700">District</label>
                      <select className="w-full bg-gray-50 rounded-lg px-4 py-3 text-gray-900 border-2 border-gray-200 focus:border-yellow-500 focus:outline-none transition-colors">
                        <option value={partner.district}>{partner.district}</option>
                      </select>
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

              <div className="mt-8 pt-8 border-t border-gray-200 flex space-x-4">
                <button className="bg-yellow-400 text-black px-6 py-3 rounded-xl hover:bg-yellow-500 transition-colors flex items-center font-semibold">
                  <Edit className="w-5 h-5 mr-2" />
                  Save Changes
                </button>
                <button className="bg-gray-500 text-white px-6 py-3 rounded-xl hover:bg-gray-600 transition-colors flex items-center font-semibold">
                  <Settings className="w-5 h-5 mr-2" />
                  Change Password
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Add Listing Modal */}
      {showAddModal && <AddListingModal />}
    </div>
  );
};