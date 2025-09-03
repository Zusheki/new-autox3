import React, { useState } from 'react';
import { User, Edit, Plus, Trash2, Eye, LogOut, Camera, Save, X, Truck, Package, Star, Award, TrendingUp, Home } from 'lucide-react';
import { Partner, PartnerVehicle } from '../types';

interface VirtualDashboardProps {
  partner: Partner;
  onUpdatePartner: (updatedData: Partial<Partner>) => void;
  onLogout: () => void;
  onGoHome: () => void;
}

export const VirtualDashboard: React.FC<VirtualDashboardProps> = ({ 
  partner, 
  onUpdatePartner, 
  onLogout,
  onGoHome 
}) => {
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isAddingVehicle, setIsAddingVehicle] = useState(false);
  const [profileData, setProfileData] = useState({
    businessName: partner.businessName,
    ownerName: partner.ownerName,
    email: partner.email,
    phone: partner.phone,
    address: partner.address,
    district: partner.district,
    description: partner.description
  });
  const [vehicleData, setVehicleData] = useState({
    type: '',
    plateNumber: '',
    model: '',
    description: ''
  });

  const profileViews = partner.profileViews || Math.floor(Math.random() * 100) + 20;
  const vehicles = partner.vehicles || [];

  const handleProfileSave = () => {
    onUpdatePartner({
      ...profileData,
      hasEditedProfile: true,
      profileViews: profileViews + 1
    });
    setIsEditingProfile(false);
  };

  const handleAddVehicle = () => {
    const newVehicle: PartnerVehicle = {
      id: Date.now().toString(),
      partnerId: partner.id,
      name: `${vehicleData.model} ${vehicleData.type}`,
      type: vehicleData.type,
      model: vehicleData.model,
      year: new Date().getFullYear(),
      description: vehicleData.description,
      pricePerHour: 0,
      pricePerDay: 0,
      specifications: [],
      images: [],
      available: true,
      location: partner.address,
      insuranceDetails: {
        provider: '',
        policyNumber: '',
        expiryDate: ''
      },
      maintenanceRecords: {
        lastService: '',
        nextService: '',
        certifications: []
      },
      status: 'active'
    };

    onUpdatePartner({
      hasAddedVehicle: true,
      vehicles: [...vehicles, newVehicle]
    });
    setIsAddingVehicle(false);
    setVehicleData({ type: '', plateNumber: '', model: '', description: '' });
  };

  const handleDeleteVehicle = (vehicleId: string) => {
    if (window.confirm('Are you sure you want to delete this vehicle?')) {
      onUpdatePartner({
        hasDeletedVehicle: true,
        vehicles: vehicles.filter(v => v.id !== vehicleId)
      });
    }
  };

  const vehicleTypes = [
    'JCB', 'Excavator', 'Tipper', 'Lorry', 'Water Bowser', 'Crane', 'Concrete Mixer', 'Road Roller'
  ];

  const materialTypes = [
    'Sand', 'Soil', 'Gravel', 'Metal', 'Bricks', 'Concrete', 'Timber', 'Cement'
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className={`bg-gradient-to-r ${partner.type === 'vehicle_owner' ? 'from-yellow-400 to-yellow-500' : 'from-green-500 to-green-600'} py-16 relative overflow-hidden`}>
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
          <div className="absolute bottom-20 right-20 w-48 h-48 bg-white/10 rounded-full blur-xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="flex justify-between items-start mb-8">
            <button
              onClick={onGoHome}
              className="flex items-center text-white hover:text-gray-200 transition-colors bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg"
            >
              <Home size={20} className="mr-2" />
              {partner.type === 'vehicle_owner' || partner.type === 'material_supplier' ? 'Go to Management' : 'Back to Home'}
            </button>
            
            <button
              onClick={onLogout}
              className="flex items-center text-white hover:text-gray-200 transition-colors bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg"
            >
              <LogOut size={20} className="mr-2" />
              Logout
            </button>
          </div>

          <div className="text-center text-white">
            <h1 className="text-5xl lg:text-6xl font-bold mb-6">
              Welcome to Your Dashboard
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8">
              Manage your {partner.type === 'vehicle_owner' ? 'vehicle rental' : 'material supply'} business from one central location.
            </p>
            
            <div className="grid md:grid-cols-3 gap-6 mt-12">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <Eye className="w-8 h-8 text-white mx-auto mb-3" />
                <h3 className="font-bold text-lg mb-2">Profile Views</h3>
                <p className="text-white text-2xl font-bold">{profileViews}</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <Star className="w-8 h-8 text-white mx-auto mb-3" />
                <h3 className="font-bold text-lg mb-2">Rating</h3>
                <p className="text-white text-2xl font-bold">{partner.rating.toFixed(1)}</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <Award className="w-8 h-8 text-white mx-auto mb-3" />
                <h3 className="font-bold text-lg mb-2">Status</h3>
                <p className="text-white text-lg font-bold capitalize">{partner.status}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dashboard Content */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Profile Section */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                    <User className="mr-3 w-6 h-6" />
                    Personal Information
                  </h2>
                  {!partner.hasEditedProfile && (
                    <button
                      onClick={() => setIsEditingProfile(true)}
                      className={`flex items-center space-x-2 ${partner.type === 'vehicle_owner' ? 'bg-yellow-400 text-black' : 'bg-green-500 text-white'} px-4 py-2 rounded-xl hover:opacity-90 transition-colors font-semibold`}
                    >
                      <Edit size={16} />
                      <span>Edit Profile</span>
                    </button>
                  )}
                </div>

                {isEditingProfile ? (
                  <div className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Business Name</label>
                        <input
                          type="text"
                          value={profileData.businessName}
                          onChange={(e) => setProfileData({...profileData, businessName: e.target.value})}
                          className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Owner Name</label>
                        <input
                          type="text"
                          value={profileData.ownerName}
                          onChange={(e) => setProfileData({...profileData, ownerName: e.target.value})}
                          className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                        <input
                          type="email"
                          value={profileData.email}
                          onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                          className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Phone</label>
                        <input
                          type="tel"
                          value={profileData.phone}
                          onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                          className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 transition-colors"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Address</label>
                      <input
                        type="text"
                        value={profileData.address}
                        onChange={(e) => setProfileData({...profileData, address: e.target.value})}
                        className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                      <textarea
                        value={profileData.description}
                        onChange={(e) => setProfileData({...profileData, description: e.target.value})}
                        rows={4}
                        className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 transition-colors resize-none"
                      />
                    </div>
                    <div className="flex space-x-4">
                      <button
                        onClick={handleProfileSave}
                        className="flex items-center space-x-2 bg-green-500 text-white px-6 py-3 rounded-xl hover:bg-green-600 transition-colors font-semibold"
                      >
                        <Save size={16} />
                        <span>Save Changes</span>
                      </button>
                      <button
                        onClick={() => setIsEditingProfile(false)}
                        className="flex items-center space-x-2 bg-gray-500 text-white px-6 py-3 rounded-xl hover:bg-gray-600 transition-colors font-semibold"
                      >
                        <X size={16} />
                        <span>Cancel</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Business Name</label>
                      <div className="bg-gray-50 rounded-xl px-4 py-3 text-gray-900">{partner.businessName}</div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Owner Name</label>
                      <div className="bg-gray-50 rounded-xl px-4 py-3 text-gray-900">{partner.ownerName}</div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                      <div className="bg-gray-50 rounded-xl px-4 py-3 text-gray-900">{partner.email}</div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Phone</label>
                      <div className="bg-gray-50 rounded-xl px-4 py-3 text-gray-900">{partner.phone}</div>
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Address</label>
                      <div className="bg-gray-50 rounded-xl px-4 py-3 text-gray-900">{partner.address}</div>
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                      <div className="bg-gray-50 rounded-xl px-4 py-3 text-gray-900 min-h-[100px]">{partner.description}</div>
                    </div>
                  </div>
                )}

                {partner.hasEditedProfile && (
                  <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-xl">
                    <p className="text-green-700 font-medium">✓ Profile has been updated successfully!</p>
                  </div>
                )}
              </div>

              {/* Vehicle/Material Information Section */}
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                    {partner.type === 'vehicle_owner' ? (
                      <Truck className="mr-3 w-6 h-6" />
                    ) : (
                      <Package className="mr-3 w-6 h-6" />
                    )}
                    {partner.type === 'vehicle_owner' ? 'Vehicle Information' : 'Material Information'}
                  </h2>
                  {!partner.hasAddedVehicle && (
                    <button
                      onClick={() => setIsAddingVehicle(true)}
                      className={`flex items-center space-x-2 ${partner.type === 'vehicle_owner' ? 'bg-yellow-400 text-black' : 'bg-green-500 text-white'} px-4 py-2 rounded-xl hover:opacity-90 transition-colors font-semibold`}
                    >
                      <Plus size={16} />
                      <span>Add {partner.type === 'vehicle_owner' ? 'Vehicle' : 'Material'}</span>
                    </button>
                  )}
                </div>

                {isAddingVehicle ? (
                  <div className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          {partner.type === 'vehicle_owner' ? 'Vehicle Type' : 'Material Type'}
                        </label>
                        <select
                          value={vehicleData.type}
                          onChange={(e) => setVehicleData({...vehicleData, type: e.target.value})}
                          className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 transition-colors"
                        >
                          <option value="">Select Type</option>
                          {(partner.type === 'vehicle_owner' ? vehicleTypes : materialTypes).map((type) => (
                            <option key={type} value={type}>{type}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          {partner.type === 'vehicle_owner' ? 'Plate Number' : 'Brand/Grade'}
                        </label>
                        <input
                          type="text"
                          value={vehicleData.plateNumber}
                          onChange={(e) => setVehicleData({...vehicleData, plateNumber: e.target.value})}
                          placeholder={partner.type === 'vehicle_owner' ? 'e.g., WP CAB-1234' : 'e.g., Premium Grade'}
                          className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          {partner.type === 'vehicle_owner' ? 'Model/Brand' : 'Specification'}
                        </label>
                        <input
                          type="text"
                          value={vehicleData.model}
                          onChange={(e) => setVehicleData({...vehicleData, model: e.target.value})}
                          placeholder={partner.type === 'vehicle_owner' ? 'e.g., TATA 1613' : 'e.g., Fine Grade'}
                          className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 transition-colors"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                      <textarea
                        value={vehicleData.description}
                        onChange={(e) => setVehicleData({...vehicleData, description: e.target.value})}
                        rows={4}
                        placeholder={`Describe your ${partner.type === 'vehicle_owner' ? 'vehicle' : 'material'}...`}
                        className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 transition-colors resize-none"
                      />
                    </div>
                    <div className="flex space-x-4">
                      <button
                        onClick={handleAddVehicle}
                        className="flex items-center space-x-2 bg-green-500 text-white px-6 py-3 rounded-xl hover:bg-green-600 transition-colors font-semibold"
                      >
                        <Plus size={16} />
                        <span>Add {partner.type === 'vehicle_owner' ? 'Vehicle' : 'Material'}</span>
                      </button>
                      <button
                        onClick={() => setIsAddingVehicle(false)}
                        className="flex items-center space-x-2 bg-gray-500 text-white px-6 py-3 rounded-xl hover:bg-gray-600 transition-colors font-semibold"
                      >
                        <X size={16} />
                        <span>Cancel</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    {vehicles.length > 0 ? (
                      <div className="space-y-4">
                        {vehicles.map((vehicle) => (
                          <div key={vehicle.id} className="bg-gray-50 rounded-xl p-6 flex items-center justify-between">
                            <div>
                              <h3 className="font-bold text-gray-900 text-lg">{vehicle.name}</h3>
                              <p className="text-gray-600">{vehicle.description}</p>
                              <div className="flex items-center mt-2 space-x-4">
                                <span className="text-sm text-gray-500">Type: {vehicle.type}</span>
                                <span className="text-sm text-gray-500">Model: {vehicle.model}</span>
                              </div>
                            </div>
                            {!partner.hasDeletedVehicle && (
                              <button
                                onClick={() => handleDeleteVehicle(vehicle.id)}
                                className="flex items-center space-x-2 bg-red-500 text-white px-4 py-2 rounded-xl hover:bg-red-600 transition-colors font-semibold"
                              >
                                <Trash2 size={16} />
                                <span>Delete</span>
                              </button>
                            )}
                          </div>
                        ))}
                        {partner.hasDeletedVehicle && (
                          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl">
                            <p className="text-red-700 font-medium">✓ Vehicle deletion completed!</p>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        {partner.type === 'vehicle_owner' ? (
                          <Truck className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                        ) : (
                          <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                        )}
                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                          No {partner.type === 'vehicle_owner' ? 'vehicles' : 'materials'} added yet
                        </h3>
                        <p className="text-gray-600">
                          Add your first {partner.type === 'vehicle_owner' ? 'vehicle' : 'material'} to get started
                        </p>
                      </div>
                    )}

                    {partner.hasAddedVehicle && (
                      <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-xl">
                        <p className="text-green-700 font-medium">✓ {partner.type === 'vehicle_owner' ? 'Vehicle' : 'Material'} has been added successfully!</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Statistics Sidebar */}
            <div className="space-y-6">
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Dashboard Statistics</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-blue-50 rounded-xl">
                    <div className="flex items-center">
                      <Eye className="w-6 h-6 text-blue-600 mr-3" />
                      <span className="font-semibold text-gray-900">Profile Views</span>
                    </div>
                    <span className="text-2xl font-bold text-blue-600">{profileViews}</span>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-xl">
                    <div className="flex items-center">
                      <Star className="w-6 h-6 text-yellow-600 mr-3" />
                      <span className="font-semibold text-gray-900">Rating</span>
                    </div>
                    <span className="text-2xl font-bold text-yellow-600">{partner.rating.toFixed(1)}</span>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-green-50 rounded-xl">
                    <div className="flex items-center">
                      <Award className="w-6 h-6 text-green-600 mr-3" />
                      <span className="font-semibold text-gray-900">Total Jobs</span>
                    </div>
                    <span className="text-2xl font-bold text-green-600">{partner.totalJobs}</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Account Status</h3>
                <div className="space-y-4">
                  <div className={`p-4 rounded-xl ${
                    partner.status === 'approved' 
                      ? 'bg-green-50 border border-green-200' 
                      : 'bg-yellow-50 border border-yellow-200'
                  }`}>
                    <div className="flex items-center">
                      <div className={`w-3 h-3 rounded-full mr-3 ${
                        partner.status === 'approved' ? 'bg-green-500' : 'bg-yellow-500'
                      }`}></div>
                      <span className="font-semibold text-gray-900 capitalize">{partner.status}</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-2">
                      {partner.status === 'approved' 
                        ? 'Your account is verified and active' 
                        : 'Your account is under review'
                      }
                    </p>
                  </div>
                  
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <div className="text-sm text-gray-600">Member Since</div>
                    <div className="font-semibold text-gray-900">
                      {new Date(partner.registrationDate).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h3>
                <div className="space-y-3">
                  <button
                    onClick={onGoHome}
                    className="w-full flex items-center justify-center space-x-2 bg-blue-500 text-white py-3 px-4 rounded-xl hover:bg-blue-600 transition-colors font-semibold"
                  >
                    <Home size={20} />
                    <span>{partner.type === 'vehicle_owner' || partner.type === 'material_supplier' ? 'Go to Management' : 'Find Services'}</span>
                  </button>
                  
                  <button
                    onClick={() => window.location.href = '#vehicle-management'}
                    className={`w-full flex items-center justify-center space-x-2 ${partner.type === 'vehicle_owner' ? 'bg-yellow-400 text-black' : 'bg-green-500 text-white'} py-3 px-4 rounded-xl hover:opacity-90 transition-colors font-semibold`}
                  >
                    {partner.type === 'vehicle_owner' ? <Truck size={20} /> : <Package size={20} />}
                    <span>Manage {partner.type === 'vehicle_owner' ? 'Vehicles' : 'Materials'}</span>
                  </button>
                  
                  <button
                    onClick={onLogout}
                    className="w-full flex items-center justify-center space-x-2 bg-red-500 text-white py-3 px-4 rounded-xl hover:bg-red-600 transition-colors font-semibold"
                  >
                    <LogOut size={20} />
                    <span>Logout</span>
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