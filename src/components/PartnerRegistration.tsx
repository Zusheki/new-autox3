import React, { useState } from 'react';
import { X, User, Building, Phone, Mail, MapPin, FileText, Shield, Upload, CheckCircle, AlertCircle, Camera } from 'lucide-react';
import { Partner } from '../types';
import { sriLankanDistricts } from '../data/services';

interface PartnerRegistrationProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (partner: Omit<Partner, 'id' | 'status' | 'registrationDate' | 'rating' | 'totalJobs' | 'notifications'>) => void;
}

export const PartnerRegistration: React.FC<PartnerRegistrationProps> = ({ isOpen, onClose, onSubmit }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [partnerType, setPartnerType] = useState<'vehicle_owner' | 'material_supplier' | ''>('');
  const [formData, setFormData] = useState({
    businessName: '',
    ownerName: '',
    email: '',
    phone: '',
    address: '',
    district: '',
    businessLicense: '',
    brNumber: '',
    yearsInBusiness: 0,
    description: '',
    services: [] as string[],
    certifications: [] as string[],
    insuranceDetails: {
      provider: '',
      policyNumber: '',
      expiryDate: ''
    },
    documents: {
      businessLicense: null as File | null,
      insurance: null as File | null,
      brCertificate: null as File | null,
      vehiclePhotos: [] as File[]
    }
  });

  if (!isOpen) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent as keyof typeof prev],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, documentType: string) => {
    const files = e.target.files;
    if (documentType === 'vehiclePhotos' && files) {
      const fileArray = Array.from(files);
      setFormData(prev => ({
        ...prev,
        documents: {
          ...prev.documents,
          vehiclePhotos: [...prev.documents.vehiclePhotos, ...fileArray]
        }
      }));
    } else {
      const file = files?.[0] || null;
      setFormData(prev => ({
        ...prev,
        documents: {
          ...prev.documents,
          [documentType]: file
        }
      }));
    }
  };

  const removeVehiclePhoto = (index: number) => {
    setFormData(prev => ({
      ...prev,
      documents: {
        ...prev.documents,
        vehiclePhotos: prev.documents.vehiclePhotos.filter((_, i) => i !== index)
      }
    }));
  };

  const handleServiceToggle = (service: string) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter(s => s !== service)
        : [...prev.services, service]
    }));
  };

  const handleCertificationToggle = (certification: string) => {
    setFormData(prev => ({
      ...prev,
      certifications: prev.certifications.includes(certification)
        ? prev.certifications.filter(c => c !== certification)
        : [...prev.certifications, certification]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const partner: Omit<Partner, 'id' | 'status' | 'registrationDate' | 'rating' | 'totalJobs' | 'notifications'> = {
      type: partnerType as 'vehicle_owner' | 'material_supplier',
      ...formData
    };
    
    onSubmit(partner);
    onClose();
    
    // Reset form
    setCurrentStep(1);
    setPartnerType('');
    setFormData({
      businessName: '',
      ownerName: '',
      email: '',
      phone: '',
      address: '',
      district: '',
      businessLicense: '',
      brNumber: '',
      yearsInBusiness: 0,
      description: '',
      services: [],
      certifications: [],
      insuranceDetails: {
        provider: '',
        policyNumber: '',
        expiryDate: ''
      },
      documents: {
        businessLicense: null,
        insurance: null,
        brCertificate: null,
        vehiclePhotos: []
      }
    });
  };

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, 4));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  const vehicleServices = [
    'Excavation Services', 'Transportation', 'Crane Operations', 'Demolition',
    'Material Handling', 'Site Preparation', 'Road Construction', 'Landscaping'
  ];

  const materialServices = [
    'Sand Supply', 'Gravel Supply', 'Concrete Supply', 'Steel Supply',
    'Brick Supply', 'Timber Supply', 'Roofing Materials', 'Plumbing Supplies'
  ];

  const certificationOptions = [
    'ISO 9001', 'SLSI Certified', 'Construction Industry Certified', 'Quality Assurance Certified',
    'Safety Management Certified', 'Environmental Compliance'
  ];

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 rounded-t-2xl">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Partner Registration</h2>
              <p className="text-gray-600 mt-1">Join Auto X as a service partner in Sri Lanka</p>
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
              <X size={24} />
            </button>
          </div>
          
          {/* Progress Bar */}
          <div className="mt-6">
            <div className="flex items-center justify-between mb-2">
              {[1, 2, 3, 4].map((step) => (
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
                style={{ width: `${(currentStep / 4) * 100}%` }}
              />
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          {/* Step 1: Partner Type Selection */}
          {currentStep === 1 && (
            <div className="space-y-8">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Choose Your Partner Type</h3>
                <p className="text-gray-600">Select the type of services you want to provide in Sri Lanka</p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div
                  onClick={() => setPartnerType('vehicle_owner')}
                  className={`cursor-pointer rounded-2xl p-8 border-2 transition-all duration-300 ${
                    partnerType === 'vehicle_owner'
                      ? 'border-yellow-500 bg-yellow-50'
                      : 'border-gray-200 hover:border-yellow-300'
                  }`}
                >
                  <div className="text-center">
                    <div className="bg-yellow-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Building className="text-yellow-600 w-8 h-8" />
                    </div>
                    <h4 className="text-xl font-bold text-gray-900 mb-3">Vehicle Owner</h4>
                    <p className="text-gray-600 leading-relaxed">
                      Rent out your construction vehicles, heavy machinery, and equipment to contractors across Sri Lanka.
                    </p>
                    <ul className="mt-4 text-sm text-gray-500 space-y-1">
                      <li>• JCBs, Excavators, Cranes</li>
                      <li>• Lorries, Tippers, Bowsers</li>
                      <li>• Specialized Equipment</li>
                    </ul>
                  </div>
                </div>

                <div
                  onClick={() => setPartnerType('material_supplier')}
                  className={`cursor-pointer rounded-2xl p-8 border-2 transition-all duration-300 ${
                    partnerType === 'material_supplier'
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-blue-300'
                  }`}
                >
                  <div className="text-center">
                    <div className="bg-blue-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <FileText className="text-blue-600 w-8 h-8" />
                    </div>
                    <h4 className="text-xl font-bold text-gray-900 mb-3">Material Supplier</h4>
                    <p className="text-gray-600 leading-relaxed">
                      Supply construction materials like sand, gravel, steel, bricks, and other building supplies.
                    </p>
                    <ul className="mt-4 text-sm text-gray-500 space-y-1">
                      <li>• Sand, Gravel, Soil</li>
                      <li>• Steel, Concrete, Bricks</li>
                      <li>• Specialized Materials</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Business Information */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Business Information</h3>
                <p className="text-gray-600">Tell us about your business in Sri Lanka</p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="flex items-center text-sm font-semibold text-gray-700 mb-3">
                    <Building size={16} className="mr-2" />
                    Business Name *
                  </label>
                  <input
                    type="text"
                    name="businessName"
                    value={formData.businessName}
                    onChange={handleInputChange}
                    required
                    placeholder="Your business name"
                    className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-yellow-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="flex items-center text-sm font-semibold text-gray-700 mb-3">
                    <User size={16} className="mr-2" />
                    Owner Name *
                  </label>
                  <input
                    type="text"
                    name="ownerName"
                    value={formData.ownerName}
                    onChange={handleInputChange}
                    required
                    placeholder="Business owner name"
                    className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-orange-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="flex items-center text-sm font-semibold text-gray-700 mb-3">
                    <Mail size={16} className="mr-2" />
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    placeholder="business@example.lk"
                    className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-orange-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="flex items-center text-sm font-semibold text-gray-700 mb-3">
                    <Phone size={16} className="mr-2" />
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    placeholder="+94 76 1098385"
                    className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-orange-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="flex items-center text-sm font-semibold text-gray-700 mb-3">
                    <FileText size={16} className="mr-2" />
                    Business Registration Number *
                  </label>
                  <input
                    type="text"
                    name="brNumber"
                    value={formData.brNumber}
                    onChange={handleInputChange}
                    required
                    placeholder="BR/PV/123456"
                    className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-orange-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="flex items-center text-sm font-semibold text-gray-700 mb-3">
                    <Building size={16} className="mr-2" />
                    Years in Business *
                  </label>
                  <input
                    type="number"
                    name="yearsInBusiness"
                    value={formData.yearsInBusiness}
                    onChange={handleInputChange}
                    required
                    min="0"
                    placeholder="0"
                    className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-orange-500 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="flex items-center text-sm font-semibold text-gray-700 mb-3">
                  <FileText size={16} className="mr-2" />
                  Business Description *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                  rows={4}
                  placeholder="Describe your business, experience, and what makes you unique in Sri Lanka..."
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-orange-500 transition-colors resize-none"
                />
              </div>
            </div>
          )}

          {/* Step 3: Address & Services */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Location & Services</h3>
                <p className="text-gray-600">Where is your business located and what services do you offer?</p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="flex items-center text-sm font-semibold text-gray-700 mb-3">
                    <MapPin size={16} className="mr-2" />
                    Business Address *
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                    placeholder="No. 123, Main Street, City"
                    className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-orange-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="flex items-center text-sm font-semibold text-gray-700 mb-3">
                    <MapPin size={16} className="mr-2" />
                    District *
                  </label>
                  <select
                    name="district"
                    value={formData.district}
                    onChange={handleInputChange}
                    required
                    className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-orange-500 transition-colors"
                  >
                    <option value="">Select District</option>
                    {sriLankanDistricts.map((district) => (
                      <option key={district} value={district}>{district}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Services Selection */}
              <div>
                <label className="flex items-center text-sm font-semibold text-gray-700 mb-3">
                  <Building size={16} className="mr-2" />
                  Services Offered *
                </label>
                <div className="grid md:grid-cols-2 gap-3">
                  {(partnerType === 'vehicle_owner' ? vehicleServices : materialServices).map((service) => (
                    <label key={service} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.services.includes(service)}
                        onChange={() => handleServiceToggle(service)}
                        className="mr-3 w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
                      />
                      <span className="text-gray-700">{service}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Certifications */}
              <div>
                <label className="flex items-center text-sm font-semibold text-gray-700 mb-3">
                  <Shield size={16} className="mr-2" />
                  Certifications (Optional)
                </label>
                <div className="grid md:grid-cols-2 gap-3">
                  {certificationOptions.map((cert) => (
                    <label key={cert} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.certifications.includes(cert)}
                        onChange={() => handleCertificationToggle(cert)}
                        className="mr-3 w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
                      />
                      <span className="text-gray-700">{cert}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Insurance Details */}
              <div className="bg-blue-50 rounded-2xl p-6">
                <h4 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <Shield className="mr-2" />
                  Insurance Information *
                </h4>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Insurance Provider *
                    </label>
                    <input
                      type="text"
                      name="insuranceDetails.provider"
                      value={formData.insuranceDetails.provider}
                      onChange={handleInputChange}
                      required
                      placeholder="Insurance company name"
                      className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Policy Number *
                    </label>
                    <input
                      type="text"
                      name="insuranceDetails.policyNumber"
                      value={formData.insuranceDetails.policyNumber}
                      onChange={handleInputChange}
                      required
                      placeholder="Policy number"
                      className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Policy Expiry Date *
                    </label>
                    <input
                      type="date"
                      name="insuranceDetails.expiryDate"
                      value={formData.insuranceDetails.expiryDate}
                      onChange={handleInputChange}
                      required
                      className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 transition-colors"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Document Upload */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Document Upload</h3>
                <p className="text-gray-600">Upload required documents for verification</p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-orange-500 transition-colors">
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h4 className="font-semibold text-gray-900 mb-2">Business Registration Certificate</h4>
                  <p className="text-sm text-gray-600 mb-4">Upload your BR certificate</p>
                  <input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) => handleFileUpload(e, 'brCertificate')}
                    className="hidden"
                    id="brCertificate"
                  />
                  <label
                    htmlFor="brCertificate"
                    className="bg-yellow-400 text-black px-4 py-2 rounded-lg cursor-pointer hover:bg-yellow-500 transition-colors"
                  >
                    Choose File
                  </label>
                  {formData.documents.brCertificate && (
                    <p className="text-sm text-green-600 mt-2">
                      ✓ {formData.documents.brCertificate.name}
                    </p>
                  )}
                </div>

                <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-blue-500 transition-colors">
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h4 className="font-semibold text-gray-900 mb-2">Insurance Certificate</h4>
                  <p className="text-sm text-gray-600 mb-4">Upload your insurance certificate</p>
                  <input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) => handleFileUpload(e, 'insurance')}
                    className="hidden"
                    id="insurance"
                  />
                  <label
                    htmlFor="insurance"
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-blue-600 transition-colors"
                  >
                    Choose File
                  </label>
                  {formData.documents.insurance && (
                    <p className="text-sm text-green-600 mt-2">
                      ✓ {formData.documents.insurance.name}
                    </p>
                  )}
                </div>
              </div>

              {/* Vehicle Photos Upload for Vehicle Owners */}
              {partnerType === 'vehicle_owner' && (
                <div className="bg-yellow-50 rounded-2xl p-6">
                  <h4 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                    <Camera className="mr-2" />
                    Vehicle Photos
                  </h4>
                  <p className="text-gray-600 mb-4">Upload photos of your vehicles to showcase them to potential customers</p>
                  
                  <div className="border-2 border-dashed border-yellow-300 rounded-xl p-6 text-center">
                    <Camera className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={(e) => handleFileUpload(e, 'vehiclePhotos')}
                      className="hidden"
                      id="vehiclePhotos"
                    />
                    <label
                      htmlFor="vehiclePhotos"
                      className="bg-yellow-400 text-black px-6 py-3 rounded-lg cursor-pointer hover:bg-yellow-500 transition-colors"
                    >
                      Add Vehicle Photos
                    </label>
                  </div>

                  {formData.documents.vehiclePhotos.length > 0 && (
                    <div className="mt-4">
                      <h5 className="font-semibold text-gray-900 mb-3">Uploaded Photos ({formData.documents.vehiclePhotos.length})</h5>
                      <div className="grid grid-cols-3 gap-3">
                        {formData.documents.vehiclePhotos.map((photo, index) => (
                          <div key={index} className="relative">
                            <img
                              src={URL.createObjectURL(photo)}
                              alt={`Vehicle ${index + 1}`}
                              className="w-full h-20 object-cover rounded-lg"
                            />
                            <button
                              type="button"
                              onClick={() => removeVehiclePhoto(index)}
                              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
                            >
                              ×
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
                <div className="flex items-start">
                  <AlertCircle className="text-yellow-600 w-6 h-6 mr-3 mt-1" />
                  <div>
                    <h4 className="font-semibold text-yellow-800 mb-2">Important Notes:</h4>
                    <ul className="text-yellow-700 text-sm space-y-1">
                      <li>• All documents must be clear and legible</li>
                      <li>• Accepted formats: PDF, JPG, JPEG, PNG</li>
                      <li>• Maximum file size: 10MB per document</li>
                      <li>• Documents will be verified within 2-3 business days</li>
                      <li>• Vehicle photos help attract more customers</li>
                    </ul>
                  </div>
                </div>
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

            {currentStep < 4 ? (
              <button
                type="button"
                onClick={nextStep}
                disabled={currentStep === 1 && !partnerType}
                className="px-6 py-3 bg-yellow-400 text-black rounded-xl hover:bg-yellow-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            ) : (
              <button
                type="submit"
                className="px-8 py-3 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black rounded-xl hover:from-yellow-500 hover:to-yellow-600 transition-all duration-300 font-semibold shadow-lg"
              >
                Submit Application
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};