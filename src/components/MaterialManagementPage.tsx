import React, { useState } from 'react';
import { ArrowLeft, Plus, Edit, Trash2, Star, User, MapPin, Phone, Eye, Save, X, Camera, MessageSquare, Award, TrendingUp, LogOut, Package, Upload } from 'lucide-react';
import { Partner, PartnerMaterial } from '../types';

interface MaterialManagementPageProps {
  partner: Partner;
  onUpdatePartner: (partnerData: Partial<Partner>) => void;
  onLogout: () => void;
  onNavigate: (page: 'home' | 'materials' | 'feedback' | 'about' | 'profile') => void;
}

interface MaterialFormData {
  name: string;
  category: string;
  description: string;
  pricePerUnit: string;
  unit: string;
  minimumOrder: string;
  availableQuantity: string;
  images: File[];
  available: boolean;
}

interface CustomerFeedback {
  id: string;
  customerName: string;
  materialName: string;
  rating: number;
  comment: string;
  date: string;
  verified: boolean;
}

const materialCategories = [
  'Sand', 'Soil', 'Gravel', 'Metal', 'Bricks', 'Concrete', 'Timber', 'Cement'
];

const materialUnits = [
  'cubic meter', 'ton', 'kg', 'per 1000 pieces', 'square meter', 'linear meter', 'bag', 'piece'
];

export const MaterialManagementPage: React.FC<MaterialManagementPageProps> = ({
  partner,
  onUpdatePartner,
  onLogout,
  onNavigate
}) => {
  const [activeTab, setActiveTab] = useState<'materials' | 'feedback'>('materials');
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingMaterial, setEditingMaterial] = useState<PartnerMaterial | null>(null);
  
  const [formData, setFormData] = useState<MaterialFormData>({
    name: '',
    category: '',
    description: '',
    pricePerUnit: '',
    unit: 'cubic meter',
    minimumOrder: '1',
    availableQuantity: '',
    images: [],
    available: true
  });

  // Mock materials data
  const [materials, setMaterials] = useState<PartnerMaterial[]>([
    {
      id: '1',
      partnerId: partner.id,
      name: 'Premium River Sand',
      category: 'Sand',
      description: 'High-quality river sand perfect for construction work. Clean, well-graded sand suitable for concrete mixing and masonry work.',
      pricePerUnit: 6500,
      unit: 'cubic meter',
      minimumOrder: 5,
      availableQuantity: 1000,
      images: ['https://i.pinimg.com/1200x/96/a2/56/96a256db3f22c571e3e653ff2017232d.jpg'],
      qualityCertifications: ['ISO 9001', 'Quality Tested'],
      deliveryAreas: ['Colombo', 'Gampaha', 'Kalutara'],
      deliveryTimeframe: 'Same day delivery available',
      status: 'active'
    },
    {
      id: '2',
      partnerId: partner.id,
      name: 'Premium Garden Soil',
      category: 'Soil',
      description: 'Rich, fertile soil ideal for landscaping and gardening projects. Nutrient-rich composition perfect for plant growth.',
      pricePerUnit: 7500,
      unit: 'cubic meter',
      minimumOrder: 3,
      availableQuantity: 500,
      images: ['https://i.pinimg.com/1200x/da/4c/c8/da4cc84e4aba23138da71ae896b78b29.jpg'],
      qualityCertifications: ['Organic Certified', 'Soil Tested'],
      deliveryAreas: ['Colombo', 'Gampaha'],
      deliveryTimeframe: 'Next day delivery',
      status: 'active'
    }
  ]);

  // Mock feedback data
  const [feedbacks] = useState<CustomerFeedback[]>([
    {
      id: '1',
      customerName: 'Saman Perera',
      materialName: 'Premium River Sand',
      rating: 5,
      comment: 'Excellent quality sand! Fast delivery and professional service. The material was exactly what we needed for our concrete work.',
      date: '2024-01-12',
      verified: true
    },
    {
      id: '2',
      customerName: 'Nimal Silva',
      materialName: 'Premium Garden Soil',
      rating: 4,
      comment: 'Good quality soil for landscaping. The delivery was on time and the supplier was helpful.',
      date: '2024-01-09',
      verified: true
    },
    {
      id: '3',
      customerName: 'Kamala Fernando',
      materialName: 'Premium River Sand',
      rating: 5,
      comment: 'Outstanding quality and service! Will definitely order again for future projects.',
      date: '2024-01-06',
      verified: false
    }
  ]);

  const averageRating = feedbacks.length > 0 
    ? feedbacks.reduce((sum, feedback) => sum + feedback.rating, 0) / feedbacks.length 
    : 0;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newMaterial: PartnerMaterial = {
      id: Date.now().toString(),
      partnerId: partner.id,
      name: formData.name,
      category: formData.category,
      description: formData.description,
      pricePerUnit: Number(formData.pricePerUnit),
      unit: formData.unit,
      minimumOrder: Number(formData.minimumOrder),
      availableQuantity: Number(formData.availableQuantity),
      images: formData.images.map(file => URL.createObjectURL(file)),
      qualityCertifications: ['Quality Tested'],
      deliveryAreas: [partner.district],
      deliveryTimeframe: '1-2 business days',
      status: 'active'
    };

    if (editingMaterial) {
      setMaterials(prev => prev.map(m => m.id === editingMaterial.id ? { ...newMaterial, id: editingMaterial.id } : m));
      setEditingMaterial(null);
    } else {
      setMaterials(prev => [...prev, newMaterial]);
    }

    // Reset form
    setFormData({
      name: '',
      category: '',
      description: '',
      pricePerUnit: '',
      unit: 'cubic meter',
      minimumOrder: '1',
      availableQuantity: '',
      images: [],
      available: true
    });
    setShowAddForm(false);
  };

  const handleEdit = (material: PartnerMaterial) => {
    setFormData({
      name: material.name,
      category: material.category,
      description: material.description,
      pricePerUnit: material.pricePerUnit.toString(),
      unit: material.unit,
      minimumOrder: material.minimumOrder.toString(),
      availableQuantity: material.availableQuantity.toString(),
      images: [],
      available: material.status === 'active'
    });
    setEditingMaterial(material);
    setShowAddForm(true);
  };

  const handleDelete = (materialId: string) => {
    if (window.confirm('Are you sure you want to delete this material?')) {
      setMaterials(prev => prev.filter(m => m.id !== materialId));
    }
  };

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Material Management</h1>
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
                <span className="ml-1 font-semibold">{averageRating.toFixed(1)}</span>
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
              { id: 'materials', label: 'My Materials' },
              { id: 'feedback', label: 'Customer Feedback', badge: feedbacks.length }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors relative ${
                  activeTab === tab.id
                    ? 'border-green-500 text-green-600'
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

      {/* Header Section */}
      <section className="bg-gradient-to-r from-green-500 to-green-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            <h1 className="text-5xl font-bold mb-4">Material Supply Management</h1>
            <p className="text-xl text-green-100 max-w-3xl mx-auto mb-8">
              Manage your construction materials inventory and track customer feedback
            </p>
            
            <div className="grid md:grid-cols-3 gap-6 mt-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <Package className="w-8 h-8 text-white mx-auto mb-3" />
                <h3 className="font-bold text-lg mb-2">Total Materials</h3>
                <p className="text-white text-2xl font-bold">{materials.length}</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <Star className="w-8 h-8 text-white mx-auto mb-3" />
                <h3 className="font-bold text-lg mb-2">Average Rating</h3>
                <p className="text-white text-2xl font-bold">{averageRating.toFixed(1)}</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <Award className="w-8 h-8 text-white mx-auto mb-3" />
                <h3 className="font-bold text-lg mb-2">Total Reviews</h3>
                <p className="text-white text-2xl font-bold">{feedbacks.length}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {activeTab === 'materials' && (
            <div className="space-y-8">
              {/* Add Material Button */}
              <div className="flex justify-between items-center">
                <h2 className="text-3xl font-bold text-gray-900">My Materials</h2>
                <button
                  onClick={() => setShowAddForm(true)}
                  className="flex items-center space-x-2 bg-green-500 text-white px-6 py-3 rounded-xl hover:bg-green-600 transition-colors font-semibold shadow-lg"
                >
                  <Plus size={20} />
                  <span>Add New Material</span>
                </button>
              </div>

              {/* Materials Grid */}
              {materials.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {materials.map((material) => (
                    <div key={material.id} className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">
                      <div className="relative">
                        <img
                          src={material.images[0] || 'https://i.pinimg.com/1200x/96/a2/56/96a256db3f22c571e3e653ff2017232d.jpg'}
                          alt={material.name}
                          className="w-full h-48 object-cover"
                        />
                        <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-sm font-medium ${
                          material.status === 'active' 
                            ? 'bg-green-500 text-white' 
                            : 'bg-red-500 text-white'
                        }`}>
                          {material.status === 'active' ? 'Available' : 'Out of Stock'}
                        </div>
                      </div>
                      
                      <div className="p-6">
                        <h3 className="text-xl font-bold text-gray-900 mb-2">{material.name}</h3>
                        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{material.description}</p>
                        
                        <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                          <div className="grid grid-cols-2 gap-2 text-sm">
                            <div>
                              <span className="text-gray-500">Category:</span>
                              <div className="font-medium">{material.category}</div>
                            </div>
                            <div>
                              <span className="text-gray-500">Unit:</span>
                              <div className="font-medium">{material.unit}</div>
                            </div>
                            <div>
                              <span className="text-gray-500">Min Order:</span>
                              <div className="font-medium">{material.minimumOrder} {material.unit}</div>
                            </div>
                            <div>
                              <span className="text-gray-500">Available:</span>
                              <div className="font-medium">{material.availableQuantity} {material.unit}</div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-xl p-4 mb-4">
                          <div className="text-center">
                            <div className="text-2xl font-bold text-green-600">
                              Rs. {material.pricePerUnit.toLocaleString()}
                            </div>
                            <div className="text-sm text-gray-600">per {material.unit}</div>
                          </div>
                        </div>

                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleEdit(material)}
                            className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center"
                          >
                            <Edit className="w-4 h-4 mr-1" />
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(material.id)}
                            className="flex-1 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-colors flex items-center justify-center"
                          >
                            <Trash2 className="w-4 h-4 mr-1" />
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">No Materials Added Yet</h3>
                  <p className="text-gray-600 mb-8">Start by adding your first material to attract customers</p>
                  <button
                    onClick={() => setShowAddForm(true)}
                    className="bg-green-500 text-white px-8 py-4 rounded-xl hover:bg-green-600 transition-colors font-semibold text-lg"
                  >
                    Add Your First Material
                  </button>
                </div>
              )}
            </div>
          )}

          {activeTab === 'feedback' && (
            <div className="space-y-8">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Customer Feedback</h2>
                <p className="text-gray-600 text-lg">See what your customers are saying about your materials</p>
              </div>

              {/* Rating Summary */}
              <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-2xl p-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="text-center">
                    <div className="text-5xl font-bold text-green-600 mb-2">{averageRating.toFixed(1)}</div>
                    <div className="flex items-center justify-center mb-2">
                      {renderStars(Math.round(averageRating))}
                    </div>
                    <div className="text-gray-600">Based on {feedbacks.length} reviews</div>
                  </div>
                  
                  <div className="space-y-2">
                    {[5, 4, 3, 2, 1].map(rating => {
                      const count = feedbacks.filter(f => f.rating === rating).length;
                      const percentage = feedbacks.length > 0 ? (count / feedbacks.length) * 100 : 0;
                      return (
                        <div key={rating} className="flex items-center space-x-3">
                          <span className="text-sm font-medium w-8">{rating}★</span>
                          <div className="flex-1 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-green-500 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                          <span className="text-sm text-gray-600 w-8">{count}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Feedback List */}
              {feedbacks.length > 0 ? (
                <div className="space-y-6">
                  {feedbacks.map((feedback) => (
                    <div key={feedback.id} className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-start space-x-4">
                          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                            <User className="w-6 h-6 text-green-600" />
                          </div>
                          <div>
                            <div className="flex items-center space-x-2 mb-1">
                              <h4 className="font-bold text-gray-900">{feedback.customerName}</h4>
                              {feedback.verified && (
                                <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                                  Verified Customer
                                </span>
                              )}
                            </div>
                            <div className="flex items-center space-x-2 mb-2">
                              <div className="flex items-center">
                                {renderStars(feedback.rating)}
                              </div>
                              <span className="text-sm text-gray-500">•</span>
                              <span className="text-sm text-gray-500">{feedback.materialName}</span>
                            </div>
                            <div className="text-sm text-gray-500">
                              {new Date(feedback.date).toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <p className="text-gray-700 leading-relaxed">{feedback.comment}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <MessageSquare className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">No Feedback Yet</h3>
                  <p className="text-gray-600">Customer reviews will appear here once you start receiving orders</p>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Add/Edit Material Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 rounded-t-2xl">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900">
                    {editingMaterial ? 'Edit Material' : 'Add New Material'}
                  </h2>
                  <p className="text-gray-600 mt-1">
                    {editingMaterial ? 'Update your material information' : 'Add a new material to your listings'}
                  </p>
                </div>
                <button 
                  onClick={() => {
                    setShowAddForm(false);
                    setEditingMaterial(null);
                    setFormData({
                      name: '',
                      category: '',
                      description: '',
                      pricePerUnit: '',
                      unit: 'cubic meter',
                      minimumOrder: '1',
                      availableQuantity: '',
                      images: [],
                      available: true
                    });
                  }} 
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X size={24} />
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* Basic Information */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Material Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    placeholder="e.g., Premium River Sand"
                    className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-green-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Category *</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    required
                    className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-green-500 transition-colors"
                  >
                    <option value="">Select Category</option>
                    {materialCategories.map((category) => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Price Per Unit (Rs.) *
                  </label>
                  <input
                    type="number"
                    name="pricePerUnit"
                    value={formData.pricePerUnit}
                    onChange={handleInputChange}
                    required
                    min="0"
                    step="100"
                    placeholder="6500"
                    className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-green-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Unit *</label>
                  <select
                    name="unit"
                    value={formData.unit}
                    onChange={handleInputChange}
                    required
                    className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-green-500 transition-colors"
                  >
                    {materialUnits.map((unit) => (
                      <option key={unit} value={unit}>{unit}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Minimum Order Quantity *
                  </label>
                  <input
                    type="number"
                    name="minimumOrder"
                    value={formData.minimumOrder}
                    onChange={handleInputChange}
                    required
                    min="1"
                    placeholder="5"
                    className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-green-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Available Quantity *
                  </label>
                  <input
                    type="number"
                    name="availableQuantity"
                    value={formData.availableQuantity}
                    onChange={handleInputChange}
                    required
                    min="0"
                    placeholder="1000"
                    className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-green-500 transition-colors"
                  />
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
                  placeholder="Describe your material, its quality, and any special characteristics..."
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-green-500 transition-colors resize-none"
                />
              </div>

              {/* Image Upload */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Material Images *</label>
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-green-500 transition-colors">
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageUpload}
                    className="hidden"
                    id="materialImages"
                  />
                  <label
                    htmlFor="materialImages"
                    className="bg-green-500 text-white px-6 py-3 rounded-lg cursor-pointer hover:bg-green-600 transition-colors"
                  >
                    Choose Images
                  </label>
                  <p className="text-sm text-gray-500 mt-2">Upload multiple images to showcase your material</p>
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

              <div className="flex items-center">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="available"
                    checked={formData.available}
                    onChange={handleInputChange}
                    className="mr-3 w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                  />
                  <span className="text-sm font-semibold text-gray-700">Material Available for Sale</span>
                </label>
              </div>

              {/* Submit Buttons */}
              <div className="flex space-x-4 pt-6 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => {
                    setShowAddForm(false);
                    setEditingMaterial(null);
                  }}
                  className="flex-1 border-2 border-gray-300 text-gray-700 py-3 px-6 rounded-xl hover:bg-gray-50 transition-colors font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-green-500 text-white py-3 px-6 rounded-xl hover:bg-green-600 transition-colors font-semibold shadow-lg flex items-center justify-center"
                >
                  <Save className="mr-2 w-5 h-5" />
                  {editingMaterial ? 'Update Material' : 'Add Material'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};