import React, { useState } from 'react';
import { ArrowLeft, User, Mail, Phone, MapPin, Edit, Save, Camera } from 'lucide-react';
import { User as UserType } from '../types';

interface ProfilePageProps {
  user: UserType;
  onUpdateProfile: (userData: Partial<UserType>) => void;
  onBack: () => void;
}

export const ProfilePage: React.FC<ProfilePageProps> = ({ user, onUpdateProfile, onBack }) => {
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

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-gradient-to-r from-yellow-400 to-yellow-500 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={onBack}
            className="flex items-center text-black hover:text-gray-700 transition-colors mb-6 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg"
          >
            <ArrowLeft size={20} className="mr-2" />
            Back to Dashboard
          </button>
          <h1 className="text-4xl font-bold text-black">My Profile</h1>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 p-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-6">
                  <div className="relative">
                    <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center">
                      {profileData.profileImage ? (
                        <img 
                          src={profileData.profileImage} 
                          alt="Profile" 
                          className="w-full h-full rounded-full object-cover"
                        />
                      ) : (
                        <User size={32} className="text-yellow-600" />
                      )}
                    </div>
                    {isEditing && (
                      <label className="absolute -bottom-2 -right-2 bg-yellow-600 text-white p-2 rounded-full cursor-pointer hover:bg-yellow-700 transition-colors">
                        <Camera size={16} />
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
                    <h2 className="text-3xl font-bold text-black">{user.name}</h2>
                    <p className="text-gray-700 capitalize">
                      {user.role === 'consumer' && 'Service Consumer'}
                      {user.role === 'vehicle_owner' && 'Vehicle Owner'}
                      {user.role === 'material_supplier' && 'Material Supplier'}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => isEditing ? handleSaveProfile() : setIsEditing(true)}
                  className="flex items-center space-x-2 bg-black text-yellow-400 px-6 py-3 rounded-xl hover:bg-gray-800 transition-colors font-semibold"
                >
                  {isEditing ? <Save size={20} /> : <Edit size={20} />}
                  <span>{isEditing ? 'Save Changes' : 'Edit Profile'}</span>
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-8">
              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Personal Information</h3>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="flex items-center text-sm font-semibold text-gray-700 mb-3">
                        <User size={16} className="mr-2" />
                        Full Name
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          name="name"
                          value={profileData.name}
                          onChange={handleInputChange}
                          className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-yellow-500 transition-colors"
                        />
                      ) : (
                        <div className="bg-gray-50 rounded-xl px-4 py-3 text-gray-900">{profileData.name}</div>
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
                          className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-yellow-500 transition-colors"
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
                          className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-yellow-500 transition-colors"
                        />
                      ) : (
                        <div className="bg-gray-50 rounded-xl px-4 py-3 text-gray-900">{profileData.phone}</div>
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
                          placeholder="Enter your address"
                          className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-yellow-500 transition-colors"
                        />
                      ) : (
                        <div className="bg-gray-50 rounded-xl px-4 py-3 text-gray-900">
                          {profileData.address || 'No address provided'}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Bio
                  </label>
                  {isEditing ? (
                    <textarea
                      name="bio"
                      value={profileData.bio}
                      onChange={handleInputChange}
                      rows={4}
                      placeholder="Tell us about yourself..."
                      className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-yellow-500 transition-colors resize-none"
                    />
                  ) : (
                    <div className="bg-gray-50 rounded-xl px-4 py-3 text-gray-900 min-h-[100px]">
                      {profileData.bio || 'No bio provided'}
                    </div>
                  )}
                </div>

                <div className="bg-gray-50 rounded-xl p-6">
                  <h4 className="font-semibold text-gray-900 mb-4">Account Information</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <span className="text-sm text-gray-600">Account Type:</span>
                      <div className="font-medium text-gray-900 capitalize">
                        {user.role === 'consumer' && 'Service Consumer'}
                        {user.role === 'vehicle_owner' && 'Vehicle Owner'}
                        {user.role === 'material_supplier' && 'Material Supplier'}
                      </div>
                    </div>
                    <div>
                      <span className="text-sm text-gray-600">Member Since:</span>
                      <div className="font-medium text-gray-900">January 2024</div>
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