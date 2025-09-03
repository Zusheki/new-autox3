import React, { useState } from 'react';
import { ArrowLeft, User, Mail, Phone, MapPin, Edit, Save, Camera, Eye, Plus, MessageSquare, Menu, X, Star, Award, TrendingUp } from 'lucide-react';
import { Partner } from '../types';

interface BusinessProfilePageProps {
  partner: Partner;
  onUpdateProfile: (partnerData: Partial<Partner>) => void;
  onBack: () => void;
  onAddService: () => void;
  onViewFeedback: () => void;
}

export const BusinessProfilePage: React.FC<BusinessProfilePageProps> = ({ 
  partner, 
  onUpdateProfile, 
  onBack,
  onAddService,
  onViewFeedback
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [profileData, setProfileData] = useState({
    businessName: partner.businessName,
    ownerName: partner.ownerName,
    email: partner.email,
    phone: partner.phone,
    address: partner.address,
    district: partner.district,
    description: partner.description,
    services: partner.services
  });

  const [profileViews] = useState(247); // Mock profile view count

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value
    });
  };

  const handleSaveProfile = () => {
    onUpdateProfile(profileData);
    setIsEditing(false);
  };

  const menuItems = [
    {
      id: 'add-service',
      label: 'Add Service',
      icon: Plus,
      color: 'bg-blue-500 hover:bg-blue-600',
      onClick: onAddService
    },
    {
      id: 'rating-comment',
      label: 'Rating Comment',
      icon: MessageSquare,
      color: 'bg-green-500 hover:bg-green-600',
      onClick: onViewFeedback
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header - No Navigation Bar */}
      <section className={`bg-gradient-to-r ${partner.type === 'vehicle_owner' ? 'from-yellow-400 to-yellow-500' : 'from-green-500 to-green-600'} py-12 relative`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-start">
            <button
              onClick={onBack}
              className="flex items-center text-white hover:text-gray-200 transition-colors bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg"
            >
              <ArrowLeft size={20} className="mr-2" />
              Back to Dashboard
            </button>

            {/* Menu Button */}
            <div className="relative">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="bg-white/20 backdrop-blur-sm text-white p-3 rounded-xl hover:bg-white/30 transition-colors"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>

              {/* Dropdown Menu */}
              {isMenuOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden z-50">
                  <div className="p-4 border-b border-gray-100">
                    <h3 className="font-bold text-gray-900">Quick Actions</h3>
                  </div>
                  <div className="p-2">
                    {menuItems.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => {
                          item.onClick();
                          setIsMenuOpen(false);
                        }}
                        className={`w-full flex items-center space-x-3 ${item.color} text-white p-3 rounded-xl mb-2 transition-colors`}
                      >
                        <item.icon size={20} />
                        <span className="font-semibold">{item.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="mt-8">
            <h1 className="text-4xl font-bold text-white mb-2">Your Profile</h1>
            <p className="text-white/90 text-lg">{getRoleDisplayName(partner.type)}</p>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
            {/* Profile Header */}
            <div className={`bg-gradient-to-r ${partner.type === 'vehicle_owner' ? 'from-yellow-400 to-yellow-500' : 'from-green-500 to-green-600'} p-8`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-6">
                  <div className="relative">
                    <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center">
                      <User size={32} className={partner.type === 'vehicle_owner' ? 'text-yellow-600' : 'text-green-600'} />
                    </div>
                    {isEditing && (
                      <label className="absolute -bottom-2 -right-2 bg-white text-gray-600 p-2 rounded-full cursor-pointer hover:bg-gray-100 transition-colors shadow-lg">
                        <Camera size={16} />
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                        />
                      </label>
                    )}
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-white">{partner.businessName}</h2>
                    <p className="text-white/90 text-lg">{partner.ownerName}</p>
                    <div className="flex items-center mt-2 space-x-4">
                      <div className="flex items-center bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                        <Star className="w-4 h-4 text-white fill-current mr-1" />
                        <span className="text-white font-semibold">{partner.rating.toFixed(1)}</span>
                      </div>
                      <div className="flex items-center bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                        <Eye className="w-4 h-4 text-white mr-1" />
                        <span className="text-white font-semibold">{profileViews} views</span>
                      </div>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => isEditing ? handleSaveProfile() : setIsEditing(true)}
                  className="flex items-center space-x-2 bg-white text-gray-900 px-6 py-3 rounded-xl hover:bg-gray-100 transition-colors font-semibold shadow-lg"
                >
                  {isEditing ? <Save size={20} /> : <Edit size={20} />}
                  <span>{isEditing ? 'Save Changes' : 'Edit Profile'}</span>
                </button>
              </div>
            </div>

            {/* Profile Content */}
            <div className="p-8">
              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Business Information</h3>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="flex items-center text-sm font-semibold text-gray-700 mb-3">
                        <User size={16} className="mr-2" />
                        Business Name
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          name="businessName"
                          value={profileData.businessName}
                          onChange={handleInputChange}
                          className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 transition-colors"
                        />
                      ) : (
                        <div className="bg-gray-50 rounded-xl px-4 py-3 text-gray-900">{profileData.businessName}</div>
                      )}
                    </div>

                    <div>
                      <label className="flex items-center text-sm font-semibold text-gray-700 mb-3">
                        <User size={16} className="mr-2" />
                        Owner Name
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          name="ownerName"
                          value={profileData.ownerName}
                          onChange={handleInputChange}
                          className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 transition-colors"
                        />
                      ) : (
                        <div className="bg-gray-50 rounded-xl px-4 py-3 text-gray-900">{profileData.ownerName}</div>
                      )}
                    </div>

                    <div>
                      <label className="flex items-center text-sm font-semibold text-gray-700 mb-3">
                        <Mail size={16} className="mr-2" />
                        Email Address
                      </label>
                      {isEditing ? (
                        <input
                          type="email"
                          name="email"
                          value={profileData.email}
                          onChange={handleInputChange}
                          className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 transition-colors"
                        />
                      ) : (
                        <div className="bg-gray-50 rounded-xl px-4 py-3 text-gray-900">{profileData.email}</div>
                      )}
                    </div>

                    <div>
                      <label className="flex items-center text-sm font-semibold text-gray-700 mb-3">
                        <Phone size={16} className="mr-2" />
                        Phone Number
                      </label>
                      {isEditing ? (
                        <input
                          type="tel"
                          name="phone"
                          value={profileData.phone}
                          onChange={handleInputChange}
                          className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 transition-colors"
                        />
                      ) : (
                        <div className="bg-gray-50 rounded-xl px-4 py-3 text-gray-900">{profileData.phone}</div>
                      )}
                    </div>

                    <div>
                      <label className="flex items-center text-sm font-semibold text-gray-700 mb-3">
                        <MapPin size={16} className="mr-2" />
                        District
                      </label>
                      {isEditing ? (
                        <select
                          name="district"
                          value={profileData.district}
                          onChange={handleInputChange}
                          className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 transition-colors"
                        >
                          <option value={profileData.district}>{profileData.district}</option>
                        </select>
                      ) : (
                        <div className="bg-gray-50 rounded-xl px-4 py-3 text-gray-900">{profileData.district}</div>
                      )}
                    </div>

                    <div>
                      <label className="flex items-center text-sm font-semibold text-gray-700 mb-3">
                        <MapPin size={16} className="mr-2" />
                        Address
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          name="address"
                          value={profileData.address}
                          onChange={handleInputChange}
                          className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 transition-colors"
                        />
                      ) : (
                        <div className="bg-gray-50 rounded-xl px-4 py-3 text-gray-900">{profileData.address}</div>
                      )}
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Business Description
                  </label>
                  {isEditing ? (
                    <textarea
                      name="description"
                      value={profileData.description}
                      onChange={handleInputChange}
                      rows={4}
                      placeholder="Describe your business..."
                      className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 transition-colors resize-none"
                    />
                  ) : (
                    <div className="bg-gray-50 rounded-xl px-4 py-3 text-gray-900 min-h-[100px]">
                      {profileData.description || 'No description provided'}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Services Offered
                  </label>
                  <div className="bg-gray-50 rounded-xl px-4 py-3">
                    <div className="flex flex-wrap gap-2">
                      {profileData.services.map((service, index) => (
                        <span key={index} className={`${partner.type === 'vehicle_owner' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'} px-3 py-1 rounded-full text-sm font-medium`}>
                          {service}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Stats Section */}
                <div className="bg-gray-50 rounded-xl p-6">
                  <h4 className="font-semibold text-gray-900 mb-4">Account Statistics</h4>
                  <div className="grid md:grid-cols-4 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-900">{partner.rating.toFixed(1)}</div>
                      <div className="text-sm text-gray-600">Average Rating</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-900">{partner.totalJobs}</div>
                      <div className="text-sm text-gray-600">Total Jobs</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-900">{profileViews}</div>
                      <div className="text-sm text-gray-600">Profile Views</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-900">{partner.status === 'approved' ? 'Verified' : 'Pending'}</div>
                      <div className="text-sm text-gray-600">Account Status</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

function getRoleDisplayName(type: string) {
  switch (type) {
    case 'vehicle_owner':
      return 'Vehicle Owner';
    case 'material_supplier':
      return 'Material Supplier';
    default:
      return 'Partner';
  }
}