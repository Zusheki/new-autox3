import React, { useState } from 'react';
import { X, Upload, Plus, Package, Truck } from 'lucide-react';
import { Partner } from '../types';

interface AddServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  partner: Partner;
  onSubmit: (serviceData: any) => void;
}

export const AddServiceModal: React.FC<AddServiceModalProps> = ({ 
  isOpen, 
  onClose, 
  partner,
  onSubmit 
}) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    price: '',
    priceUnit: partner.type === 'vehicle_owner' ? 'hour' : 'cubic_meter',
    specifications: [] as string[],
    images: [] as File[],
    available: true
  });

  const [newSpecification, setNewSpecification] = useState('');

  if (!isOpen) return null;

  const vehicleCategories = [
    'JCB', 'Excavator', 'Tipper', 'Lorry', 'Water Bowser', 'Crane', 'Concrete Mixer', 'Road Roller'
  ];

  const materialCategories = [
    'Sand', 'Soil', 'Gravel', 'Bricks', 'Steel', 'Concrete', 'Timber', 'Cement'
  ];

  const categories = partner.type === 'vehicle_owner' ? vehicleCategories : materialCategories;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const fileArray = Array.from(files);
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, ...fileArray]
      }));
    }
  };

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const addSpecification = () => {
    if (newSpecification.trim()) {
      setFormData(prev => ({
        ...prev,
        specifications: [...prev.specifications, newSpecification.trim()]
      }));
      setNewSpecification('');
    }
  };

  const removeSpecification = (index: number) => {
    setFormData(prev => ({
      ...prev,
      specifications: prev.specifications.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
    // Reset form
    setFormData({
      name: '',
      description: '',
      category: '',
      price: '',
      priceUnit: partner.type === 'vehicle_owner' ? 'hour' : 'cubic_meter',
      specifications: [],
      images: [],
      available: true
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 rounded-t-2xl">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">
                Add New {partner.type === 'vehicle_owner' ? 'Vehicle' : 'Material'}
              </h2>
              <p className="text-gray-600 mt-1">
                Add a new {partner.type === 'vehicle_owner' ? 'vehicle' : 'material'} to your listings
              </p>
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
              <X size={24} />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Basic Information */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                {partner.type === 'vehicle_owner' ? 'Vehicle' : 'Material'} Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                placeholder={partner.type === 'vehicle_owner' ? 'e.g., JCB 3CX Backhoe Loader' : 'e.g., Premium River Sand'}
                className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Category *</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                required
                className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 transition-colors"
              >
                <option value="">Select Category</option>
                {categories.map((category) => (
                  <option key={category} value={category.toLowerCase()}>{category}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Description *</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              required
              rows={4}
              placeholder="Describe your item, its condition, and any special features..."
              className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 transition-colors resize-none"
            />
          </div>

          {/* Pricing */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Price (Rs.) *
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                required
                min="0"
                step="100"
                placeholder="Enter price"
                className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Price Unit *</label>
              <select
                name="priceUnit"
                value={formData.priceUnit}
                onChange={handleInputChange}
                className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 transition-colors"
              >
                {partner.type === 'vehicle_owner' ? (
                  <>
                    <option value="hour">Per Hour</option>
                    <option value="day">Per Day</option>
                  </>
                ) : (
                  <>
                    <option value="cubic_meter">Per Cubic Meter</option>
                    <option value="ton">Per Ton</option>
                    <option value="kg">Per Kg</option>
                    <option value="per_1000_pieces">Per 1000 Pieces</option>
                  </>
                )}
              </select>
            </div>
          </div>

          {/* Specifications */}
          {partner.type === 'vehicle_owner' && (
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Specifications</label>
              <div className="space-y-3">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={newSpecification}
                    onChange={(e) => setNewSpecification(e.target.value)}
                    placeholder="e.g., Operating Weight: 8.5 tons"
                    className="flex-1 border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 transition-colors"
                  />
                  <button
                    type="button"
                    onClick={addSpecification}
                    className="bg-blue-500 text-white px-4 py-3 rounded-xl hover:bg-blue-600 transition-colors"
                  >
                    <Plus size={20} />
                  </button>
                </div>
                
                {formData.specifications.length > 0 && (
                  <div className="space-y-2">
                    {formData.specifications.map((spec, index) => (
                      <div key={index} className="flex items-center justify-between bg-gray-50 rounded-lg px-4 py-2">
                        <span className="text-gray-700">{spec}</span>
                        <button
                          type="button"
                          onClick={() => removeSpecification(index)}
                          className="text-red-500 hover:text-red-700 transition-colors"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Images *</label>
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-blue-500 transition-colors">
              <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
                className="hidden"
                id="serviceImages"
              />
              <label
                htmlFor="serviceImages"
                className="bg-blue-500 text-white px-6 py-3 rounded-lg cursor-pointer hover:bg-blue-600 transition-colors"
              >
                Choose Images
              </label>
              <p className="text-sm text-gray-500 mt-2">Upload multiple images to showcase your {partner.type === 'vehicle_owner' ? 'vehicle' : 'material'}</p>
            </div>

            {formData.images.length > 0 && (
              <div className="mt-4">
                <h5 className="font-semibold text-gray-900 mb-3">Uploaded Images ({formData.images.length})</h5>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {formData.images.map((image, index) => (
                    <div key={index} className="relative">
                      <img
                        src={URL.createObjectURL(image)}
                        alt={`Upload ${index + 1}`}
                        className="w-full h-24 object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
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

          {/* Submit Buttons */}
          <div className="flex space-x-4 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 border-2 border-gray-300 text-gray-700 py-3 px-6 rounded-xl hover:bg-gray-50 transition-colors font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 px-6 rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-300 font-semibold shadow-lg flex items-center justify-center"
            >
              {partner.type === 'vehicle_owner' ? <Truck className="mr-2 w-5 h-5" /> : <Package className="mr-2 w-5 h-5" />}
              Add {partner.type === 'vehicle_owner' ? 'Vehicle' : 'Material'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};