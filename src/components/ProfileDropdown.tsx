import React, { useState } from 'react';
import { User, Settings, LogOut, ChevronDown, Edit, Save, Camera, Mail, Phone, MapPin } from 'lucide-react';
import { User as UserType } from '../types';

interface ProfileDropdownProps {
  user: UserType;
  onLogout: () => void;
  onUpdateProfile: (userData: Partial<UserType>) => void;
}

export const ProfileDropdown: React.FC<ProfileDropdownProps> = ({ user, onLogout, onUpdateProfile }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'profile' | 'settings'>('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone,
    address: user.address || '',
    bio: user.bio || '',
    profileImage: user.profileImage || ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value
    });
  };

  const handleSaveProfile = () => {
    onUpdateProfile(profileData);
    setIsEditing(false);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const imageUrl = event.target?.result as string;
        setProfileData({
          ...profileData,
          profileImage: imageUrl
        });
      };
      reader.readAsDataURL(file);
    }
  };

  if (!isOpen) {
    return (
      <div className="relative">
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center space-x-2 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black px-6 py-3 rounded-xl hover:from-yellow-500 hover:to-yellow-600 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl"
        >
          <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
            {profileData.profileImage ? (
              <img 
                src={profileData.profileImage} 
                alt="Profile" 
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <User size={16} className="text-yellow-600" />
            )}
          </div>
          <span>{user.name.split(' ')[0]}</span>
          <ChevronDown size={16} />
        </button>
      </div>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(false)}
        className="flex items-center space-x-2 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black px-6 py-3 rounded-xl hover:from-yellow-500 hover:to-yellow-600 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl"
      >
        <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
          {profileData.profileImage ? (
            <img 
              src={profileData.profileImage} 
              alt="Profile" 
              className="w-full h-full rounded-full object-cover"
            />
          ) : (
            <User size={16} className="text-yellow-600" />
          )}
        </div>
        <span>{user.name.split(' ')[0]}</span>
        <ChevronDown size={16} className="rotate-180" />
      </button>

      {/* Dropdown Modal */}
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
          {/* Header */}
          <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 p-6 rounded-t-2xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                    {profileData.profileImage ? (
                      <img 
                        src={profileData.profileImage} 
                        alt="Profile" 
                        className="w-full h-full rounded-full object-cover"
                      />
                    ) : (
                      <User size={24} className="text-yellow-600" />
                    )}
                  </div>
                  {isEditing && (
                    <label className="absolute -bottom-1 -right-1 bg-yellow-600 text-white p-1 rounded-full cursor-pointer hover:bg-yellow-700 transition-colors">
                      <Camera size={12} />
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-black">{user.name}</h2>
                  <p className="text-gray-700">{user.email}</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-black hover:text-gray-700 transition-colors"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab('profile')}
              className={`flex-1 py-4 px-6 font-semibold transition-colors ${
                activeTab === 'profile'
                  ? 'text-yellow-600 border-b-2 border-yellow-500'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <User size={20} className="inline mr-2" />
              Profile
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`flex-1 py-4 px-6 font-semibold transition-colors ${
                activeTab === 'settings'
                  ? 'text-yellow-600 border-b-2 border-yellow-500'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <Settings size={20} className="inline mr-2" />
              Settings
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            {activeTab === 'profile' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-bold text-gray-900">Profile Information</h3>
                  <button
                    onClick={() => isEditing ? handleSaveProfile() : setIsEditing(true)}
                    className="flex items-center space-x-2 bg-yellow-400 text-black px-4 py-2 rounded-lg hover:bg-yellow-500 transition-colors"
                  >
                    {isEditing ? <Save size={16} /> : <Edit size={16} />}
                    <span>{isEditing ? 'Save' : 'Edit'}</span>
                  </button>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                      <User size={16} className="mr-2" />
                      Full Name
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="name"
                        value={profileData.name}
                        onChange={handleInputChange}
                        className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-yellow-500 transition-colors"
                      />
                    ) : (
                      <div className="bg-gray-50 rounded-lg px-4 py-3 text-gray-900">{profileData.name}</div>
                    )}
                  </div>

                  <div>
                    <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                      <Mail size={16} className="mr-2" />
                      Email Address
                    </label>
                    {isEditing ? (
                      <input
                        type="email"
                        name="email"
                        value={profileData.email}
                        onChange={handleInputChange}
                        className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-yellow-500 transition-colors"
                      />
                    ) : (
                      <div className="bg-gray-50 rounded-lg px-4 py-3 text-gray-900">{profileData.email}</div>
                    )}
                  </div>

                  <div>
                    <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                      <Phone size={16} className="mr-2" />
                      Phone Number
                    </label>
                    {isEditing ? (
                      <input
                        type="tel"
                        name="phone"
                        value={profileData.phone}
                        onChange={handleInputChange}
                        className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-yellow-500 transition-colors"
                      />
                    ) : (
                      <div className="bg-gray-50 rounded-lg px-4 py-3 text-gray-900">{profileData.phone}</div>
                    )}
                  </div>

                  <div>
                    <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                      <MapPin size={16} className="mr-2" />
                      Address
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="address"
                        value={profileData.address}
                        onChange={handleInputChange}
                        placeholder="Enter your address"
                        className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-yellow-500 transition-colors"
                      />
                    ) : (
                      <div className="bg-gray-50 rounded-lg px-4 py-3 text-gray-900">
                        {profileData.address || 'No address provided'}
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Bio
                  </label>
                  {isEditing ? (
                    <textarea
                      name="bio"
                      value={profileData.bio}
                      onChange={handleInputChange}
                      rows={4}
                      placeholder="Tell us about yourself..."
                      className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-yellow-500 transition-colors resize-none"
                    />
                  ) : (
                    <div className="bg-gray-50 rounded-lg px-4 py-3 text-gray-900 min-h-[100px]">
                      {profileData.bio || 'No bio provided'}
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-gray-900">Account Settings</h3>
                
                <div className="space-y-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Notifications</h4>
                    <div className="space-y-2">
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-3" defaultChecked />
                        <span className="text-gray-700">Email notifications</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-3" />
                        <span className="text-gray-700">SMS notifications</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-3" defaultChecked />
                        <span className="text-gray-700">Order updates</span>
                      </label>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Privacy</h4>
                    <div className="space-y-2">
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-3" defaultChecked />
                        <span className="text-gray-700">Make profile public</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-3" />
                        <span className="text-gray-700">Allow marketing emails</span>
                      </label>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Account Actions</h4>
                    <div className="space-y-3">
                      <button className="w-full text-left bg-white border border-gray-200 rounded-lg px-4 py-3 hover:bg-gray-50 transition-colors">
                        Change Password
                      </button>
                      <button className="w-full text-left bg-white border border-gray-200 rounded-lg px-4 py-3 hover:bg-gray-50 transition-colors">
                        Download My Data
                      </button>
                      <button className="w-full text-left bg-red-50 border border-red-200 text-red-600 rounded-lg px-4 py-3 hover:bg-red-100 transition-colors">
                        Delete Account
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="border-t border-gray-200 p-6">
            <button
              onClick={onLogout}
              className="w-full flex items-center justify-center space-x-2 bg-red-500 text-white py-3 px-4 rounded-xl hover:bg-red-600 transition-colors font-semibold"
            >
              <LogOut size={20} />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};