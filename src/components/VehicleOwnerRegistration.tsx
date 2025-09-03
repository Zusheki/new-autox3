import React, { useState } from 'react';
import { X, User, MapPin, Truck, DollarSign, Camera, CheckCircle, AlertCircle, Eye, EyeOff, Upload, Trash2 } from 'lucide-react';

interface VehicleOwnerRegistrationProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
}

interface VehicleTypeData {
  type: string;
  modelBrand: string;
  registrationNumber: string;
  minPricePerHour: string;
  maxPricePerHour: string;
  minPricePerDay: string;
  maxPricePerDay: string;
  images: File[];
  description: string;
}

export const VehicleOwnerRegistration: React.FC<VehicleOwnerRegistrationProps> = ({ 
  isOpen, 
  onClose, 
  onSubmit 
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    // Personal Info
    fullName: '',
    nicNumber: '',
    mobileNumber: '',
    email: '',
    password: '',
    confirmPassword: '',
    
    // Location
    district: '',
    cityTown: '',
    address: '',
    
    // Vehicle Info
    vehicleTypes: [] as VehicleTypeData[],
    availabilitySchedule: '',
    
    // Media
    nicLicenseImage: null as File | null,
    
    // Confirmation
    agreeToTerms: false
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const sriLankanDistricts = [
    'Colombo', 'Gampaha', 'Kalutara', 'Kandy', 'Matale', 'Nuwara Eliya',
    'Galle', 'Matara', 'Hambantota', 'Jaffna', 'Kilinochchi', 'Mannar',
    'Vavuniya', 'Mullaitivu', 'Batticaloa', 'Ampara', 'Trincomalee',
    'Kurunegala', 'Puttalam', 'Anuradhapura', 'Polonnaruwa', 'Badulla',
    'Moneragala', 'Ratnapura', 'Kegalle'
  ];

  const availableVehicleTypes = [
    'Tipper',
    'Lorries/Trucks',
    'Excavators',
    'JCB',
    'Boom Truck',
    'Crane Truck',
    'Water Bowser',
    'Concrete Mixer',
    'Low-bed Trailers'
  ];

  if (!isOpen) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const addVehicleType = (vehicleType: string) => {
    if (!formData.vehicleTypes.find(v => v.type === vehicleType)) {
      setFormData(prev => ({
        ...prev,
        vehicleTypes: [...prev.vehicleTypes, {
          type: vehicleType,
          modelBrand: '',
          registrationNumber: '',
          minPricePerHour: '',
          maxPricePerHour: '',
          minPricePerDay: '',
          maxPricePerDay: '',
          images: [],
          description: ''
        }]
      }));
    }
    
    if (errors.vehicleTypes) {
      setErrors(prev => ({ ...prev, vehicleTypes: '' }));
    }
  };

  const removeVehicleType = (vehicleType: string) => {
    setFormData(prev => ({
      ...prev,
      vehicleTypes: prev.vehicleTypes.filter(v => v.type !== vehicleType)
    }));
  };

  const updateVehicleTypeData = (vehicleType: string, field: keyof VehicleTypeData, value: string) => {
    setFormData(prev => ({
      ...prev,
      vehicleTypes: prev.vehicleTypes.map(v => 
        v.type === vehicleType ? { ...v, [field]: value } : v
      )
    }));
  };

  const handleVehicleImageUpload = (vehicleType: string, files: FileList | null) => {
    if (files) {
      const fileArray = Array.from(files);
      setFormData(prev => ({
        ...prev,
        vehicleTypes: prev.vehicleTypes.map(v => 
          v.type === vehicleType ? { ...v, images: [...v.images, ...fileArray] } : v
        )
      }));
    }
  };

  const removeVehicleImage = (vehicleType: string, imageIndex: number) => {
    setFormData(prev => ({
      ...prev,
      vehicleTypes: prev.vehicleTypes.map(v => 
        v.type === vehicleType ? { 
          ...v, 
          images: v.images.filter((_, i) => i !== imageIndex) 
        } : v
      )
    }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, fieldName: string) => {
    const file = e.target.files?.[0] || null;
    setFormData(prev => ({ ...prev, [fieldName]: file }));
    
    if (errors[fieldName]) {
      setErrors(prev => ({ ...prev, [fieldName]: '' }));
    }
  };

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    switch (step) {
      case 1: // Personal Info
        if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
        if (!formData.nicNumber.trim()) newErrors.nicNumber = 'NIC number is required';
        if (!formData.mobileNumber.trim()) newErrors.mobileNumber = 'Mobile number is required';
        if (!formData.email.trim()) newErrors.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
        if (!formData.password) newErrors.password = 'Password is required';
        else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
        if (!formData.confirmPassword) newErrors.confirmPassword = 'Please confirm your password';
        else if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
        break;
        
      case 2: // Location
        if (!formData.district) newErrors.district = 'District is required';
        if (!formData.cityTown.trim()) newErrors.cityTown = 'City/Town is required';
        if (!formData.address.trim()) newErrors.address = 'Address is required';
        break;
        
      case 3: // Vehicle Info
        if (formData.vehicleTypes.length === 0) newErrors.vehicleTypes = 'At least one vehicle type is required';
        
        // Validate each vehicle type
        formData.vehicleTypes.forEach((vehicle, index) => {
          if (!vehicle.modelBrand.trim()) {
            newErrors[`vehicle_${index}_modelBrand`] = `Model/Brand for ${vehicle.type} is required`;
          }
          
          if (!vehicle.description.trim()) {
            newErrors[`vehicle_${index}_description`] = `Description for ${vehicle.type} is required`;
          }
          
          if (!vehicle.minPricePerHour.trim()) {
            newErrors[`vehicle_${index}_minPricePerHour`] = `Minimum hourly price for ${vehicle.type} is required`;
          } else if (isNaN(Number(vehicle.minPricePerHour)) || Number(vehicle.minPricePerHour) <= 0) {
            newErrors[`vehicle_${index}_minPricePerHour`] = `Valid minimum hourly price for ${vehicle.type} is required`;
          }
          
          if (!vehicle.maxPricePerHour.trim()) {
            newErrors[`vehicle_${index}_maxPricePerHour`] = `Maximum hourly price for ${vehicle.type} is required`;
          } else if (isNaN(Number(vehicle.maxPricePerHour)) || Number(vehicle.maxPricePerHour) <= 0) {
            newErrors[`vehicle_${index}_maxPricePerHour`] = `Valid maximum hourly price for ${vehicle.type} is required`;
          }
          
          if (!vehicle.minPricePerDay.trim()) {
            newErrors[`vehicle_${index}_minPricePerDay`] = `Minimum daily price for ${vehicle.type} is required`;
          } else if (isNaN(Number(vehicle.minPricePerDay)) || Number(vehicle.minPricePerDay) <= 0) {
            newErrors[`vehicle_${index}_minPricePerDay`] = `Valid minimum daily price for ${vehicle.type} is required`;
          }
          
          if (!vehicle.maxPricePerDay.trim()) {
            newErrors[`vehicle_${index}_maxPricePerDay`] = `Maximum daily price for ${vehicle.type} is required`;
          } else if (isNaN(Number(vehicle.maxPricePerDay)) || Number(vehicle.maxPricePerDay) <= 0) {
            newErrors[`vehicle_${index}_maxPricePerDay`] = `Valid maximum daily price for ${vehicle.type} is required`;
          }
          
          if (Number(vehicle.minPricePerHour) >= Number(vehicle.maxPricePerHour)) {
            newErrors[`vehicle_${index}_maxPricePerHour`] = `Maximum hourly price must be greater than minimum for ${vehicle.type}`;
          }
          
          if (Number(vehicle.minPricePerDay) >= Number(vehicle.maxPricePerDay)) {
            newErrors[`vehicle_${index}_maxPricePerDay`] = `Maximum daily price must be greater than minimum for ${vehicle.type}`;
          }
          
          if (vehicle.images.length === 0) {
            newErrors[`vehicle_${index}_images`] = `At least one image for ${vehicle.type} is required`;
          }
        });
        break;
        
      case 4: // Media
        if (!formData.nicLicenseImage) newErrors.nicLicenseImage = 'NIC/License image is required';
        break;
        
      case 5: // Confirmation
        if (!formData.agreeToTerms) newErrors.agreeToTerms = 'You must agree to terms and conditions';
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 5));
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep(5)) {
      onSubmit({
        ...formData,
        role: 'vehicle_owner',
        type: 'vehicle_owner'
      });
    }
  };

  const stepTitles = [
    'Personal Information',
    'Location Details',
    'Vehicle Information',
    'Upload Documents',
    'Confirmation'
  ];

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 rounded-t-2xl">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Vehicle Owner Registration</h2>
              <p className="text-gray-600 mt-1">Step {currentStep} of 5: {stepTitles[currentStep - 1]}</p>
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
              <X size={24} />
            </button>
          </div>
          
          {/* Progress Bar */}
          <div className="mt-6">
            <div className="flex items-center justify-between mb-2">
              {[1, 2, 3, 4, 5].map((step) => (
                <div
                  key={step}
                  className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-semibold ${
                    step <= currentStep
                      ? 'bg-yellow-400 text-black'
                      : 'bg-gray-200 text-gray-500'
                  }`}
                >
                  {step < currentStep ? <CheckCircle size={16} /> : step}
                </div>
              ))}
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-yellow-400 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(currentStep / 5) * 100}%` }}
              />
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          {/* Step 1: Personal Information */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <User className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Personal Information</h3>
                <p className="text-gray-600">Tell us about yourself</p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                    className={`w-full border-2 rounded-xl px-4 py-3 focus:outline-none transition-colors ${
                      errors.fullName ? 'border-red-500' : 'border-gray-200 focus:border-yellow-500'
                    }`}
                  />
                  {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    NIC Number *
                  </label>
                  <input
                    type="text"
                    name="nicNumber"
                    value={formData.nicNumber}
                    onChange={handleInputChange}
                    placeholder="123456789V or 200012345678"
                    className={`w-full border-2 rounded-xl px-4 py-3 focus:outline-none transition-colors ${
                      errors.nicNumber ? 'border-red-500' : 'border-gray-200 focus:border-yellow-500'
                    }`}
                  />
                  {errors.nicNumber && <p className="text-red-500 text-sm mt-1">{errors.nicNumber}</p>}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Mobile Number *
                  </label>
                  <input
                    type="tel"
                    name="mobileNumber"
                    value={formData.mobileNumber}
                    onChange={handleInputChange}
                    placeholder="+94 76 1098385"
                    className={`w-full border-2 rounded-xl px-4 py-3 focus:outline-none transition-colors ${
                      errors.mobileNumber ? 'border-red-500' : 'border-gray-200 focus:border-yellow-500'
                    }`}
                  />
                  {errors.mobileNumber && <p className="text-red-500 text-sm mt-1">{errors.mobileNumber}</p>}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="your.email@example.com"
                    className={`w-full border-2 rounded-xl px-4 py-3 focus:outline-none transition-colors ${
                      errors.email ? 'border-red-500' : 'border-gray-200 focus:border-yellow-500'
                    }`}
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Password *
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      placeholder="Create a password"
                      className={`w-full border-2 rounded-xl px-4 py-3 pr-12 focus:outline-none transition-colors ${
                        errors.password ? 'border-red-500' : 'border-gray-200 focus:border-yellow-500'
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                  {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Confirm Password *
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      placeholder="Confirm your password"
                      className={`w-full border-2 rounded-xl px-4 py-3 pr-12 focus:outline-none transition-colors ${
                        errors.confirmPassword ? 'border-red-500' : 'border-gray-200 focus:border-yellow-500'
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                  {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Location */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <MapPin className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Location Details</h3>
                <p className="text-gray-600">Where are your vehicles located?</p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    District *
                  </label>
                  <select
                    name="district"
                    value={formData.district}
                    onChange={handleInputChange}
                    className={`w-full border-2 rounded-xl px-4 py-3 focus:outline-none transition-colors ${
                      errors.district ? 'border-red-500' : 'border-gray-200 focus:border-yellow-500'
                    }`}
                  >
                    <option value="">Select District</option>
                    {sriLankanDistricts.map((district) => (
                      <option key={district} value={district}>{district}</option>
                    ))}
                  </select>
                  {errors.district && <p className="text-red-500 text-sm mt-1">{errors.district}</p>}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    City/Town *
                  </label>
                  <input
                    type="text"
                    name="cityTown"
                    value={formData.cityTown}
                    onChange={handleInputChange}
                    placeholder="Enter city or town"
                    className={`w-full border-2 rounded-xl px-4 py-3 focus:outline-none transition-colors ${
                      errors.cityTown ? 'border-red-500' : 'border-gray-200 focus:border-yellow-500'
                    }`}
                  />
                  {errors.cityTown && <p className="text-red-500 text-sm mt-1">{errors.cityTown}</p>}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Complete Address *
                </label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  rows={3}
                  placeholder="Enter your complete address including street, area, and postal code"
                  className={`w-full border-2 rounded-xl px-4 py-3 focus:outline-none transition-colors resize-none ${
                    errors.address ? 'border-red-500' : 'border-gray-200 focus:border-yellow-500'
                  }`}
                />
                {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Availability Schedule (Optional)
                </label>
                <textarea
                  name="availabilitySchedule"
                  value={formData.availabilitySchedule}
                  onChange={handleInputChange}
                  rows={3}
                  placeholder="e.g., Available Monday to Friday, 8 AM to 6 PM. Advance booking required."
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-yellow-500 transition-colors resize-none"
                />
              </div>
            </div>
          )}

          {/* Step 3: Vehicle Information */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <Truck className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Vehicle Information</h3>
                <p className="text-gray-600">What vehicles do you own?</p>
              </div>

              {/* Vehicle Type Selection */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Select Vehicle Types *
                </label>
                <div className="grid md:grid-cols-3 gap-3 mb-6">
                  {availableVehicleTypes.map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => addVehicleType(type)}
                      disabled={formData.vehicleTypes.find(v => v.type === type) !== undefined}
                      className={`p-3 border-2 rounded-xl transition-colors ${
                        formData.vehicleTypes.find(v => v.type === type)
                          ? 'border-yellow-500 bg-yellow-50 text-yellow-700'
                          : 'border-gray-200 hover:border-yellow-300 text-gray-700'
                      } disabled:opacity-50 disabled:cursor-not-allowed`}
                    >
                      <span className="font-medium">{type}</span>
                    </button>
                  ))}
                </div>
                {errors.vehicleTypes && <p className="text-red-500 text-sm mt-1">{errors.vehicleTypes}</p>}
              </div>

              {/* Dynamic Vehicle Type Forms */}
              {formData.vehicleTypes.length > 0 && (
                <div className="space-y-6">
                  <h4 className="text-xl font-bold text-gray-900">Configure Your Vehicles</h4>
                  {formData.vehicleTypes.map((vehicle, index) => (
                    <div key={vehicle.type} className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
                      <div className="flex items-center justify-between mb-4">
                        <h5 className="text-lg font-bold text-gray-900 flex items-center">
                          <Truck className="w-5 h-5 mr-2 text-yellow-500" />
                          {vehicle.type}
                        </h5>
                        <button
                          type="button"
                          onClick={() => removeVehicleType(vehicle.type)}
                          className="text-red-500 hover:text-red-700 transition-colors"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>

                      {/* Basic Vehicle Info */}
                      <div className="grid md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Model/Brand Name *
                          </label>
                          <input
                            type="text"
                            value={vehicle.modelBrand}
                            onChange={(e) => updateVehicleTypeData(vehicle.type, 'modelBrand', e.target.value)}
                            placeholder="e.g., TATA 1613, JCB 3CX"
                            className={`w-full border-2 rounded-xl px-4 py-3 focus:outline-none transition-colors ${
                              errors[`vehicle_${index}_modelBrand`] ? 'border-red-500' : 'border-gray-200 focus:border-yellow-500'
                            }`}
                          />
                          {errors[`vehicle_${index}_modelBrand`] && (
                            <p className="text-red-500 text-sm mt-1">{errors[`vehicle_${index}_modelBrand`]}</p>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Registration Number (Optional)
                          </label>
                          <input
                            type="text"
                            value={vehicle.registrationNumber}
                            onChange={(e) => updateVehicleTypeData(vehicle.type, 'registrationNumber', e.target.value)}
                            placeholder="e.g., WP CAB-1234"
                            className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-yellow-500 transition-colors"
                          />
                        </div>
                      </div>

                      {/* Description */}
                      <div className="mb-4">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Description *
                        </label>
                        <textarea
                          value={vehicle.description}
                          onChange={(e) => updateVehicleTypeData(vehicle.type, 'description', e.target.value)}
                          rows={3}
                          placeholder="Describe your vehicle, its condition, special features, and any additional services..."
                          className={`w-full border-2 rounded-xl px-4 py-3 focus:outline-none transition-colors resize-none ${
                            errors[`vehicle_${index}_description`] ? 'border-red-500' : 'border-gray-200 focus:border-yellow-500'
                          }`}
                        />
                        {errors[`vehicle_${index}_description`] && (
                          <p className="text-red-500 text-sm mt-1">{errors[`vehicle_${index}_description`]}</p>
                        )}
                      </div>

                      {/* Hourly Price Range */}
                      <div className="grid md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Min Price Per Hour (Rs.) *
                          </label>
                          <input
                            type="number"
                            value={vehicle.minPricePerHour}
                            onChange={(e) => updateVehicleTypeData(vehicle.type, 'minPricePerHour', e.target.value)}
                            placeholder="15000"
                            min="0"
                            step="100"
                            className={`w-full border-2 rounded-xl px-4 py-3 focus:outline-none transition-colors ${
                              errors[`vehicle_${index}_minPricePerHour`] ? 'border-red-500' : 'border-gray-200 focus:border-yellow-500'
                            }`}
                          />
                          {errors[`vehicle_${index}_minPricePerHour`] && (
                            <p className="text-red-500 text-sm mt-1">{errors[`vehicle_${index}_minPricePerHour`]}</p>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Max Price Per Hour (Rs.) *
                          </label>
                          <input
                            type="number"
                            value={vehicle.maxPricePerHour}
                            onChange={(e) => updateVehicleTypeData(vehicle.type, 'maxPricePerHour', e.target.value)}
                            placeholder="25000"
                            min="0"
                            step="100"
                            className={`w-full border-2 rounded-xl px-4 py-3 focus:outline-none transition-colors ${
                              errors[`vehicle_${index}_maxPricePerHour`] ? 'border-red-500' : 'border-gray-200 focus:border-yellow-500'
                            }`}
                          />
                          {errors[`vehicle_${index}_maxPricePerHour`] && (
                            <p className="text-red-500 text-sm mt-1">{errors[`vehicle_${index}_maxPricePerHour`]}</p>
                          )}
                        </div>
                      </div>

                      {/* Daily Price Range */}
                      <div className="grid md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Min Price Per Day (Rs.) *
                          </label>
                          <input
                            type="number"
                            value={vehicle.minPricePerDay}
                            onChange={(e) => updateVehicleTypeData(vehicle.type, 'minPricePerDay', e.target.value)}
                            placeholder="120000"
                            min="0"
                            step="1000"
                            className={`w-full border-2 rounded-xl px-4 py-3 focus:outline-none transition-colors ${
                              errors[`vehicle_${index}_minPricePerDay`] ? 'border-red-500' : 'border-gray-200 focus:border-yellow-500'
                            }`}
                          />
                          {errors[`vehicle_${index}_minPricePerDay`] && (
                            <p className="text-red-500 text-sm mt-1">{errors[`vehicle_${index}_minPricePerDay`]}</p>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Max Price Per Day (Rs.) *
                          </label>
                          <input
                            type="number"
                            value={vehicle.maxPricePerDay}
                            onChange={(e) => updateVehicleTypeData(vehicle.type, 'maxPricePerDay', e.target.value)}
                            placeholder="200000"
                            min="0"
                            step="1000"
                            className={`w-full border-2 rounded-xl px-4 py-3 focus:outline-none transition-colors ${
                              errors[`vehicle_${index}_maxPricePerDay`] ? 'border-red-500' : 'border-gray-200 focus:border-yellow-500'
                            }`}
                          />
                          {errors[`vehicle_${index}_maxPricePerDay`] && (
                            <p className="text-red-500 text-sm mt-1">{errors[`vehicle_${index}_maxPricePerDay`]}</p>
                          )}
                        </div>
                      </div>

                      {/* Price Preview */}
                      {vehicle.minPricePerHour && vehicle.maxPricePerHour && vehicle.minPricePerDay && vehicle.maxPricePerDay && (
                        <div className="mb-4 p-4 bg-white rounded-xl">
                          <p className="text-sm text-gray-600 mb-2">Price ranges for {vehicle.type}:</p>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <p className="text-sm font-medium text-gray-700">Hourly Rate:</p>
                              <p className="text-lg font-bold text-yellow-600">
                                Rs. {Number(vehicle.minPricePerHour).toLocaleString()} - Rs. {Number(vehicle.maxPricePerHour).toLocaleString()}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-700">Daily Rate:</p>
                              <p className="text-lg font-bold text-yellow-600">
                                Rs. {Number(vehicle.minPricePerDay).toLocaleString()} - Rs. {Number(vehicle.maxPricePerDay).toLocaleString()}
                              </p>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Image Upload */}
                      <div className={`border-2 border-dashed rounded-xl p-4 text-center transition-colors ${
                        errors[`vehicle_${index}_images`] ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-yellow-500'
                      }`}>
                        <Camera className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm font-semibold text-gray-900 mb-2">Upload {vehicle.type} Images *</p>
                        <input
                          type="file"
                          accept="image/*"
                          multiple
                          onChange={(e) => handleVehicleImageUpload(vehicle.type, e.target.files)}
                          className="hidden"
                          id={`vehicle-images-${vehicle.type}`}
                        />
                        <label
                          htmlFor={`vehicle-images-${vehicle.type}`}
                          className="bg-yellow-400 text-black px-4 py-2 rounded-lg cursor-pointer hover:bg-yellow-500 transition-colors text-sm"
                        >
                          Choose Images
                        </label>
                        {errors[`vehicle_${index}_images`] && (
                          <p className="text-red-500 text-sm mt-2">{errors[`vehicle_${index}_images`]}</p>
                        )}
                      </div>

                      {/* Image Preview */}
                      {vehicle.images.length > 0 && (
                        <div className="mt-4">
                          <p className="text-sm font-semibold text-gray-900 mb-2">
                            {vehicle.type} Images ({vehicle.images.length})
                          </p>
                          <div className="grid grid-cols-3 gap-2">
                            {vehicle.images.map((image, imageIndex) => (
                              <div key={imageIndex} className="relative">
                                <img
                                  src={URL.createObjectURL(image)}
                                  alt={`${vehicle.type} ${imageIndex + 1}`}
                                  className="w-full h-20 object-cover rounded-lg"
                                />
                                <button
                                  type="button"
                                  onClick={() => removeVehicleImage(vehicle.type, imageIndex)}
                                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-600"
                                >
                                  ×
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Step 4: Upload Documents */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <Upload className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Upload Documents</h3>
                <p className="text-gray-600">Upload required documents for verification</p>
              </div>

              <div className={`border-2 border-dashed rounded-2xl p-6 text-center transition-colors ${
                errors.nicLicenseImage ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-yellow-500'
              }`}>
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h4 className="font-semibold text-gray-900 mb-2">NIC/License Image *</h4>
                <p className="text-sm text-gray-600 mb-4">Upload your NIC or driving license</p>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileUpload(e, 'nicLicenseImage')}
                  className="hidden"
                  id="nicLicenseImage"
                />
                <label
                  htmlFor="nicLicenseImage"
                  className="bg-yellow-400 text-black px-6 py-3 rounded-lg cursor-pointer hover:bg-yellow-500 transition-colors"
                >
                  Choose Image
                </label>
                {formData.nicLicenseImage && (
                  <div className="mt-4">
                    <p className="text-sm text-green-600">✓ {formData.nicLicenseImage.name}</p>
                    <img
                      src={URL.createObjectURL(formData.nicLicenseImage)}
                      alt="NIC/License preview"
                      className="w-full h-32 object-cover rounded-lg mt-2"
                    />
                  </div>
                )}
                {errors.nicLicenseImage && <p className="text-red-500 text-sm mt-2">{errors.nicLicenseImage}</p>}
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                <div className="flex items-start">
                  <AlertCircle className="text-yellow-600 w-5 h-5 mr-3 mt-1" />
                  <div>
                    <h4 className="font-semibold text-yellow-800 mb-1">Image Guidelines:</h4>
                    <ul className="text-yellow-700 text-sm space-y-1">
                      <li>• Use clear, high-quality images</li>
                      <li>• Vehicle photos should show the entire vehicle</li>
                      <li>• NIC/License should be clearly readable</li>
                      <li>• Accepted formats: JPG, JPEG, PNG</li>
                      <li>• Maximum file size: 5MB per image</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 5: Confirmation */}
          {currentStep === 5 && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Review & Confirm</h3>
                <p className="text-gray-600">Please review your information before submitting</p>
              </div>

              {/* Summary */}
              <div className="bg-gray-50 rounded-2xl p-6 space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Personal Info</h4>
                    <p className="text-sm text-gray-600">Name: {formData.fullName}</p>
                    <p className="text-sm text-gray-600">Mobile: {formData.mobileNumber}</p>
                    <p className="text-sm text-gray-600">Email: {formData.email}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Location</h4>
                    <p className="text-sm text-gray-600">{formData.cityTown}, {formData.district}</p>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Vehicles & Pricing</h4>
                  <div className="space-y-2">
                    {formData.vehicleTypes.map((vehicle) => (
                      <div key={vehicle.type} className="bg-white rounded-lg p-3">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <span className="font-medium text-gray-900">{vehicle.type} - {vehicle.modelBrand}</span>
                            {vehicle.registrationNumber && (
                              <p className="text-xs text-gray-500">Reg: {vehicle.registrationNumber}</p>
                            )}
                          </div>
                          <div className="text-right">
                            <p className="text-xs text-yellow-600">
                              Hourly: Rs. {Number(vehicle.minPricePerHour).toLocaleString()} - Rs. {Number(vehicle.maxPricePerHour).toLocaleString()}
                            </p>
                            <p className="text-xs text-yellow-600">
                              Daily: Rs. {Number(vehicle.minPricePerDay).toLocaleString()} - Rs. {Number(vehicle.maxPricePerDay).toLocaleString()}
                            </p>
                          </div>
                        </div>
                        <p className="text-xs text-gray-500">{vehicle.images.length} image(s) uploaded</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Terms and Conditions */}
              <div className="bg-white border-2 border-gray-200 rounded-2xl p-6">
                <label className="flex items-start">
                  <input
                    type="checkbox"
                    name="agreeToTerms"
                    checked={formData.agreeToTerms}
                    onChange={handleInputChange}
                    className={`mr-3 mt-1 w-4 h-4 text-yellow-600 border-gray-300 rounded focus:ring-yellow-500 ${
                      errors.agreeToTerms ? 'border-red-500' : ''
                    }`}
                  />
                  <div className="text-sm text-gray-700">
                    <span className="font-semibold">I agree to the Terms and Conditions *</span>
                    <p className="mt-2">
                      By registering, I confirm that all information provided is accurate and I agree to 
                      Auto X's terms of service, privacy policy, and vehicle rental guidelines. I understand 
                      that my registration will be reviewed and approved before I can start listing my vehicles.
                    </p>
                  </div>
                </label>
                {errors.agreeToTerms && <p className="text-red-500 text-sm mt-2">{errors.agreeToTerms}</p>}
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-8 border-t border-gray-200">
            <button
              type="button"
              onClick={prevStep}
              disabled={currentStep === 1}
              className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>

            {currentStep < 5 ? (
              <button
                type="button"
                onClick={nextStep}
                className="px-6 py-3 bg-yellow-400 text-black rounded-xl hover:bg-yellow-500 transition-colors font-semibold"
              >
                Next Step
              </button>
            ) : (
              <button
                type="submit"
                className="px-8 py-3 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black rounded-xl hover:from-yellow-500 hover:to-yellow-600 transition-all duration-300 font-semibold shadow-lg"
              >
                Submit Registration
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};