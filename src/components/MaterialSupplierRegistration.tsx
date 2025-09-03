import React, { useState } from 'react';
import { X, User, MapPin, Package, DollarSign, Camera, CheckCircle, AlertCircle, Eye, EyeOff, Upload, ToggleLeft, ToggleRight, Trash2 } from 'lucide-react';

interface MaterialSupplierRegistrationProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
}

interface MaterialTypeData {
  type: string;
  minPrice: string;
  maxPrice: string;
  images: File[];
}

export const MaterialSupplierRegistration: React.FC<MaterialSupplierRegistrationProps> = ({ 
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
    
    // Material Info
    materialTypes: [] as MaterialTypeData[],
    businessBrandName: '',
    description: '',
    
    // Delivery
    deliveryIncluded: true,
    availabilitySchedule: '',
    
    // Media
    nicBusinessLicense: null as File | null,
    
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

  const availableMaterialTypes = [
    'Sand',
    'Gravel',
    'Soil',
    'Rocks',
    'Bricks',
    'Concrete',
    'Steel',
    'Timber',
    'Cement'
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

  const addMaterialType = (materialType: string) => {
    if (!formData.materialTypes.find(m => m.type === materialType)) {
      setFormData(prev => ({
        ...prev,
        materialTypes: [...prev.materialTypes, {
          type: materialType,
          minPrice: '',
          maxPrice: '',
          images: []
        }]
      }));
    }
    
    if (errors.materialTypes) {
      setErrors(prev => ({ ...prev, materialTypes: '' }));
    }
  };

  const removeMaterialType = (materialType: string) => {
    setFormData(prev => ({
      ...prev,
      materialTypes: prev.materialTypes.filter(m => m.type !== materialType)
    }));
  };

  const updateMaterialTypeData = (materialType: string, field: 'minPrice' | 'maxPrice', value: string) => {
    setFormData(prev => ({
      ...prev,
      materialTypes: prev.materialTypes.map(m => 
        m.type === materialType ? { ...m, [field]: value } : m
      )
    }));
  };

  const handleMaterialImageUpload = (materialType: string, files: FileList | null) => {
    if (files) {
      const fileArray = Array.from(files);
      setFormData(prev => ({
        ...prev,
        materialTypes: prev.materialTypes.map(m => 
          m.type === materialType ? { ...m, images: [...m.images, ...fileArray] } : m
        )
      }));
    }
  };

  const removeMaterialImage = (materialType: string, imageIndex: number) => {
    setFormData(prev => ({
      ...prev,
      materialTypes: prev.materialTypes.map(m => 
        m.type === materialType ? { 
          ...m, 
          images: m.images.filter((_, i) => i !== imageIndex) 
        } : m
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
        
      case 3: // Material Info
        if (formData.materialTypes.length === 0) newErrors.materialTypes = 'At least one material type is required';
        if (!formData.description.trim()) newErrors.description = 'Description is required';
        
        // Validate each material type
        formData.materialTypes.forEach((material, index) => {
          if (!material.minPrice.trim()) {
            newErrors[`material_${index}_minPrice`] = `Minimum price for ${material.type} is required`;
          } else if (isNaN(Number(material.minPrice)) || Number(material.minPrice) <= 0) {
            newErrors[`material_${index}_minPrice`] = `Valid minimum price for ${material.type} is required`;
          }
          
          if (!material.maxPrice.trim()) {
            newErrors[`material_${index}_maxPrice`] = `Maximum price for ${material.type} is required`;
          } else if (isNaN(Number(material.maxPrice)) || Number(material.maxPrice) <= 0) {
            newErrors[`material_${index}_maxPrice`] = `Valid maximum price for ${material.type} is required`;
          }
          
          if (Number(material.minPrice) >= Number(material.maxPrice)) {
            newErrors[`material_${index}_maxPrice`] = `Maximum price must be greater than minimum price for ${material.type}`;
          }
          
          if (material.images.length === 0) {
            newErrors[`material_${index}_images`] = `At least one image for ${material.type} is required`;
          }
        });
        break;
        
      case 4: // Media
        if (!formData.nicBusinessLicense) newErrors.nicBusinessLicense = 'NIC/Business License is required';
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
        role: 'material_supplier',
        type: 'material_supplier'
      });
    }
  };

  const stepTitles = [
    'Personal Information',
    'Location Details',
    'Material Information',
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
              <h2 className="text-3xl font-bold text-gray-900">Material Supplier Registration</h2>
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
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 text-gray-500'
                  }`}
                >
                  {step < currentStep ? <CheckCircle size={16} /> : step}
                </div>
              ))}
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-500 h-2 rounded-full transition-all duration-300"
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
                <User className="w-16 h-16 text-blue-500 mx-auto mb-4" />
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
                      errors.fullName ? 'border-red-500' : 'border-gray-200 focus:border-blue-500'
                    }`}
                  />
                  {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    NIC Number (Optional)
                  </label>
                  <input
                    type="text"
                    name="nicNumber"
                    value={formData.nicNumber}
                    onChange={handleInputChange}
                    placeholder="123456789V or 200012345678"
                    className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 transition-colors"
                  />
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
                      errors.mobileNumber ? 'border-red-500' : 'border-gray-200 focus:border-blue-500'
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
                      errors.email ? 'border-red-500' : 'border-gray-200 focus:border-blue-500'
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
                        errors.password ? 'border-red-500' : 'border-gray-200 focus:border-blue-500'
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
                        errors.confirmPassword ? 'border-red-500' : 'border-gray-200 focus:border-blue-500'
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
                <MapPin className="w-16 h-16 text-blue-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Location Details</h3>
                <p className="text-gray-600">Where is your business located?</p>
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
                      errors.district ? 'border-red-500' : 'border-gray-200 focus:border-blue-500'
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
                      errors.cityTown ? 'border-red-500' : 'border-gray-200 focus:border-blue-500'
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
                  placeholder="Enter your complete business address including street, area, and postal code"
                  className={`w-full border-2 rounded-xl px-4 py-3 focus:outline-none transition-colors resize-none ${
                    errors.address ? 'border-red-500' : 'border-gray-200 focus:border-blue-500'
                  }`}
                />
                {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Business/Brand Name (Optional)
                </label>
                <input
                  type="text"
                  name="businessBrandName"
                  value={formData.businessBrandName}
                  onChange={handleInputChange}
                  placeholder="e.g., Silva Construction Materials"
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Business Description *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={4}
                  placeholder="e.g., 'Supplying high-quality construction materials to Gampaha area with reliable delivery service'"
                  className={`w-full border-2 rounded-xl px-4 py-3 focus:outline-none transition-colors resize-none ${
                    errors.description ? 'border-red-500' : 'border-gray-200 focus:border-blue-500'
                  }`}
                />
                {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
              </div>

              <div className="bg-green-50 rounded-2xl p-6">
                <h4 className="text-xl font-bold text-gray-900 mb-4">Delivery Options</h4>
                <div className="flex items-center justify-between">
                  <div>
                    <h5 className="font-semibold text-gray-900">Delivery Included?</h5>
                    <p className="text-sm text-gray-600">Do you provide delivery service?</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, deliveryIncluded: !prev.deliveryIncluded }))}
                    className="flex items-center"
                  >
                    {formData.deliveryIncluded ? (
                      <ToggleRight className="w-12 h-6 text-green-500" />
                    ) : (
                      <ToggleLeft className="w-12 h-6 text-gray-400" />
                    )}
                  </button>
                </div>
                <div className="mt-3 p-3 bg-white rounded-lg">
                  <p className="text-sm font-medium">
                    {formData.deliveryIncluded ? (
                      <span className="text-green-600">✓ Delivery service included</span>
                    ) : (
                      <span className="text-gray-600">✗ Customer pickup only</span>
                    )}
                  </p>
                </div>
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
                  placeholder="e.g., Available Monday to Saturday, 7 AM to 5 PM. Advance orders preferred."
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 transition-colors resize-none"
                />
              </div>
            </div>
          )}

          {/* Step 3: Material Information */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <Package className="w-16 h-16 text-blue-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Material Information</h3>
                <p className="text-gray-600">What materials do you supply?</p>
              </div>

              {/* Material Type Selection */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Select Material Types *
                </label>
                <div className="grid md:grid-cols-3 gap-3 mb-6">
                  {availableMaterialTypes.map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => addMaterialType(type)}
                      disabled={formData.materialTypes.find(m => m.type === type) !== undefined}
                      className={`p-3 border-2 rounded-xl transition-colors ${
                        formData.materialTypes.find(m => m.type === type)
                          ? 'border-blue-500 bg-blue-50 text-blue-700'
                          : 'border-gray-200 hover:border-blue-300 text-gray-700'
                      } disabled:opacity-50 disabled:cursor-not-allowed`}
                    >
                      <span className="font-medium">{type}</span>
                    </button>
                  ))}
                </div>
                {errors.materialTypes && <p className="text-red-500 text-sm mt-1">{errors.materialTypes}</p>}
              </div>

              {/* Dynamic Material Type Forms */}
              {formData.materialTypes.length > 0 && (
                <div className="space-y-6">
                  <h4 className="text-xl font-bold text-gray-900">Configure Your Materials</h4>
                  {formData.materialTypes.map((material, index) => (
                    <div key={material.type} className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
                      <div className="flex items-center justify-between mb-4">
                        <h5 className="text-lg font-bold text-gray-900 flex items-center">
                          <Package className="w-5 h-5 mr-2 text-blue-500" />
                          {material.type}
                        </h5>
                        <button
                          type="button"
                          onClick={() => removeMaterialType(material.type)}
                          className="text-red-500 hover:text-red-700 transition-colors"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>

                      {/* Price Range */}
                      <div className="grid md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Minimum Price (Rs.) *
                          </label>
                          <input
                            type="number"
                            value={material.minPrice}
                            onChange={(e) => updateMaterialTypeData(material.type, 'minPrice', e.target.value)}
                            placeholder="5000"
                            min="0"
                            step="100"
                            className={`w-full border-2 rounded-xl px-4 py-3 focus:outline-none transition-colors ${
                              errors[`material_${index}_minPrice`] ? 'border-red-500' : 'border-gray-200 focus:border-blue-500'
                            }`}
                          />
                          {errors[`material_${index}_minPrice`] && (
                            <p className="text-red-500 text-sm mt-1">{errors[`material_${index}_minPrice`]}</p>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Maximum Price (Rs.) *
                          </label>
                          <input
                            type="number"
                            value={material.maxPrice}
                            onChange={(e) => updateMaterialTypeData(material.type, 'maxPrice', e.target.value)}
                            placeholder="10000"
                            min="0"
                            step="100"
                            className={`w-full border-2 rounded-xl px-4 py-3 focus:outline-none transition-colors ${
                              errors[`material_${index}_maxPrice`] ? 'border-red-500' : 'border-gray-200 focus:border-blue-500'
                            }`}
                          />
                          {errors[`material_${index}_maxPrice`] && (
                            <p className="text-red-500 text-sm mt-1">{errors[`material_${index}_maxPrice`]}</p>
                          )}
                        </div>
                      </div>

                      {/* Price Preview */}
                      {material.minPrice && material.maxPrice && (
                        <div className="mb-4 p-3 bg-white rounded-xl">
                          <p className="text-sm text-gray-600">Price range for {material.type}:</p>
                          <p className="text-lg font-bold text-blue-600">
                            Rs. {Number(material.minPrice).toLocaleString()} - Rs. {Number(material.maxPrice).toLocaleString()} per cubic meter
                          </p>
                        </div>
                      )}

                      {/* Image Upload */}
                      <div className={`border-2 border-dashed rounded-xl p-4 text-center transition-colors ${
                        errors[`material_${index}_images`] ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-blue-500'
                      }`}>
                        <Camera className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm font-semibold text-gray-900 mb-2">Upload {material.type} Images *</p>
                        <input
                          type="file"
                          accept="image/*"
                          multiple
                          onChange={(e) => handleMaterialImageUpload(material.type, e.target.files)}
                          className="hidden"
                          id={`material-images-${material.type}`}
                        />
                        <label
                          htmlFor={`material-images-${material.type}`}
                          className="bg-blue-500 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-blue-600 transition-colors text-sm"
                        >
                          Choose Images
                        </label>
                        {errors[`material_${index}_images`] && (
                          <p className="text-red-500 text-sm mt-2">{errors[`material_${index}_images`]}</p>
                        )}
                      </div>

                      {/* Image Preview */}
                      {material.images.length > 0 && (
                        <div className="mt-4">
                          <p className="text-sm font-semibold text-gray-900 mb-2">
                            {material.type} Images ({material.images.length})
                          </p>
                          <div className="grid grid-cols-3 gap-2">
                            {material.images.map((image, imageIndex) => (
                              <div key={imageIndex} className="relative">
                                <img
                                  src={URL.createObjectURL(image)}
                                  alt={`${material.type} ${imageIndex + 1}`}
                                  className="w-full h-20 object-cover rounded-lg"
                                />
                                <button
                                  type="button"
                                  onClick={() => removeMaterialImage(material.type, imageIndex)}
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
                <Upload className="w-16 h-16 text-blue-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Upload Documents</h3>
                <p className="text-gray-600">Upload required documents for verification</p>
              </div>

              {/* NIC/Business License */}
              <div className={`border-2 border-dashed rounded-2xl p-6 text-center transition-colors ${
                errors.nicBusinessLicense ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-green-500'
              }`}>
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h4 className="font-semibold text-gray-900 mb-2">NIC/Business License *</h4>
                <p className="text-sm text-gray-600 mb-4">Upload your NIC or business license</p>
                <input
                  type="file"
                  accept="image/*,.pdf"
                  onChange={(e) => handleFileUpload(e, 'nicBusinessLicense')}
                  className="hidden"
                  id="nicBusinessLicense"
                />
                <label
                  htmlFor="nicBusinessLicense"
                  className="bg-green-500 text-white px-6 py-3 rounded-lg cursor-pointer hover:bg-green-600 transition-colors"
                >
                  Choose File
                </label>
                {formData.nicBusinessLicense && (
                  <div className="mt-4">
                    <p className="text-sm text-green-600">✓ {formData.nicBusinessLicense.name}</p>
                    {formData.nicBusinessLicense.type.startsWith('image/') && (
                      <img
                        src={URL.createObjectURL(formData.nicBusinessLicense)}
                        alt="NIC/License preview"
                        className="w-full max-w-sm h-32 object-cover rounded-lg mt-2 mx-auto"
                      />
                    )}
                  </div>
                )}
                {errors.nicBusinessLicense && <p className="text-red-500 text-sm mt-2">{errors.nicBusinessLicense}</p>}
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                <div className="flex items-start">
                  <AlertCircle className="text-blue-600 w-5 h-5 mr-3 mt-1" />
                  <div>
                    <h4 className="font-semibold text-blue-800 mb-1">Document Guidelines:</h4>
                    <ul className="text-blue-700 text-sm space-y-1">
                      <li>• Use clear, high-quality images</li>
                      <li>• Material photos should show quality and texture</li>
                      <li>• NIC/License should be clearly readable</li>
                      <li>• Accepted formats: JPG, JPEG, PNG, PDF</li>
                      <li>• Maximum file size: 5MB per file</li>
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
                  <h4 className="font-semibold text-gray-900 mb-2">Materials & Pricing</h4>
                  <div className="space-y-2">
                    {formData.materialTypes.map((material) => (
                      <div key={material.type} className="bg-white rounded-lg p-3">
                        <div className="flex justify-between items-center">
                          <span className="font-medium text-gray-900">{material.type}</span>
                          <span className="text-sm text-blue-600">
                            Rs. {Number(material.minPrice).toLocaleString()} - Rs. {Number(material.maxPrice).toLocaleString()}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500">{material.images.length} image(s) uploaded</p>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Delivery</h4>
                  <p className="text-sm text-gray-600">
                    {formData.deliveryIncluded ? 'Delivery service included' : 'Customer pickup only'}
                  </p>
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
                    className={`mr-3 mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 ${
                      errors.agreeToTerms ? 'border-red-500' : ''
                    }`}
                  />
                  <div className="text-sm text-gray-700">
                    <span className="font-semibold">I agree to the Terms and Conditions *</span>
                    <p className="mt-2">
                      By registering, I confirm that all information provided is accurate and I agree to 
                      Auto X's terms of service, privacy policy, and material supply guidelines. I understand 
                      that my registration will be reviewed and approved before I can start listing my materials.
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
                className="px-6 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors font-semibold"
              >
                Next Step
              </button>
            ) : (
              <button
                type="submit"
                className="px-8 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-300 font-semibold shadow-lg"
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