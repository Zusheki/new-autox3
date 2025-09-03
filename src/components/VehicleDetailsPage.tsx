import React, { useState } from 'react';
import { ArrowLeft, Star, MapPin, Phone, MessageCircle, User, Award, Wrench, MessageSquare, ThumbsUp, Send } from 'lucide-react';
import { Vehicle } from '../types';

interface VehicleDetailsPageProps {
  vehicle: Vehicle;
  onBack: () => void;
}

interface Comment {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  verified: boolean;
}

export const VehicleDetailsPage: React.FC<VehicleDetailsPageProps> = ({ vehicle, onBack }) => {
  // Mock comments data
  const [comments, setComments] = useState<Comment[]>([
    {
      id: '1',
      userName: 'Saman Perera',
      rating: 5,
      comment: 'Excellent service! The JCB was in perfect condition and the operator was very skilled. Completed our excavation work efficiently.',
      date: '2024-01-10',
      verified: true
    },
    {
      id: '2',
      userName: 'Nimal Silva',
      rating: 4,
      comment: 'Good vehicle and reliable service. The owner was professional and the pricing was fair.',
      date: '2024-01-08',
      verified: true
    },
    {
      id: '3',
      userName: 'Kamala Fernando',
      rating: 5,
      comment: 'Outstanding service! Very reliable and the vehicle was delivered on time. Will definitely use again.',
      date: '2024-01-05',
      verified: false
    }
  ]);

  // New comment form state
  const [newComment, setNewComment] = useState({
    userName: '',
    rating: 5,
    comment: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCall = (phone: string) => {
    window.open(`tel:${phone}`, '_self');
  };

  const handleSMS = (phone: string, vehicleName: string, supplierName: string) => {
    const message = `Hi ${supplierName}, I'm interested in renting your ${vehicleName}. Can you provide more details about availability and rates?`;
    const smsUrl = `sms:${phone}?body=${encodeURIComponent(message)}`;
    window.open(smsUrl, '_self');
  };

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.userName.trim() || !newComment.comment.trim()) {
      alert('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      const comment: Comment = {
        id: Date.now().toString(),
        userName: newComment.userName,
        rating: newComment.rating,
        comment: newComment.comment,
        date: new Date().toISOString().split('T')[0],
        verified: false
      };

      setComments(prev => [comment, ...prev]);
      setNewComment({ userName: '', rating: 5, comment: '' });
      setIsSubmitting(false);
      alert('Thank you for your feedback! Your comment has been submitted.');
    }, 1000);
  };

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  const renderInteractiveStars = (rating: number, onRatingChange: (rating: number) => void) => {
    return [...Array(5)].map((_, i) => (
      <button
        key={i}
        type="button"
        onClick={() => onRatingChange(i + 1)}
        className={`w-6 h-6 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'} hover:text-yellow-400 transition-colors`}
      >
        <Star className="w-full h-full" />
      </button>
    ));
  };

  const averageRating = comments.reduce((sum, comment) => sum + comment.rating, 0) / comments.length;

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-gradient-to-r from-yellow-400 to-yellow-500 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={onBack}
            className="flex items-center text-black hover:text-gray-700 transition-colors mb-6 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg"
          >
            <ArrowLeft size={20} className="mr-2" />
            Back to Vehicles
          </button>
          <h1 className="text-4xl font-bold text-black">{vehicle.name}</h1>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <img 
                src={vehicle.image} 
                alt={vehicle.name}
                className="w-full h-96 object-cover rounded-2xl shadow-lg mb-6"
              />
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Vehicle Details</h2>
                <p className="text-gray-600 mb-6 leading-relaxed">{vehicle.description}</p>
                
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                    <Wrench className="w-4 h-4 mr-2" />
                    Specifications:
                  </h4>
                  <div className="grid grid-cols-1 gap-2">
                    {vehicle.specifications.map((spec, index) => (
                      <div key={index} className="flex items-center text-sm text-gray-600 bg-gray-50 rounded-lg p-3">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></div>
                        {spec}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-yellow-50 rounded-xl p-4">
                    <div className="text-sm text-gray-600">Hourly Rate</div>
                    <div className="text-2xl font-bold text-yellow-600">Rs. {vehicle.pricePerHour.toLocaleString()}</div>
                  </div>
                  <div className="bg-green-50 rounded-xl p-4">
                    <div className="text-sm text-gray-600">Daily Rate</div>
                    <div className="text-2xl font-bold text-green-600">Rs. {vehicle.pricePerDay.toLocaleString()}</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Vehicle Owner</h2>
                  <div className="flex items-center bg-yellow-100 px-3 py-1 rounded-full">
                    <Star className="w-4 h-4 text-yellow-500 fill-current mr-1" />
                    <span className="font-semibold text-yellow-700">{vehicle.supplier.rating}</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="bg-yellow-100 p-2 rounded-lg mr-4">
                      <User className="w-5 h-5 text-yellow-600" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">{vehicle.supplier.name}</div>
                      <div className="text-sm text-gray-600">Vehicle Owner</div>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <div className="bg-green-100 p-2 rounded-lg mr-4">
                      <MapPin className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">Location</div>
                      <div className="text-gray-600">{vehicle.supplier.location}, {vehicle.supplier.district}</div>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <div className="bg-purple-100 p-2 rounded-lg mr-4">
                      <Phone className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">Contact Number</div>
                      <div className="text-gray-600">{vehicle.supplier.phone}</div>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <div className="bg-orange-100 p-2 rounded-lg mr-4">
                      <Award className="w-5 h-5 text-orange-600" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">Total Jobs</div>
                      <div className="text-gray-600">{vehicle.supplier.totalJobs} completed</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Contact Owner</h3>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => handleCall(vehicle.supplier.phone)}
                    className="flex items-center justify-center bg-green-500 text-white py-4 px-6 rounded-xl hover:bg-green-600 transition-colors font-semibold shadow-lg"
                  >
                    <Phone className="w-5 h-5 mr-2" />
                     Call
                  </button>
                  <button
                    onClick={() => handleSMS(vehicle.supplier.phone, vehicle.name, vehicle.supplier.name)}
                    className="flex items-center justify-center bg-blue-500 text-white py-4 px-6 rounded-xl hover:bg-blue-600 transition-colors font-semibold shadow-lg"
                  >
                    <MessageCircle className="w-5 h-5 mr-2" />
                     Text Message
                  </button>
                </div>
                <p className="text-sm text-gray-500 text-center mt-4">
                  Connect directly with the vehicle owner. Negotiate your own terms and rates.
                </p>
              </div>
            </div>
          </div>

          {/* User Comments & Ratings Section */}
          <div className="mt-12 bg-white rounded-2xl p-8 shadow-lg">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-bold text-gray-900 flex items-center">
                <MessageSquare className="w-6 h-6 mr-3" />
                Customer Reviews & Ratings
              </h3>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-600">{averageRating.toFixed(1)}</div>
                <div className="flex items-center justify-center mb-1">
                  {renderStars(Math.round(averageRating))}
                </div>
                <div className="text-sm text-gray-600">{comments.length} reviews</div>
              </div>
            </div>

            {/* Add Comment Form */}
            <div className="mb-8 p-6 bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl border border-blue-200">
              <h4 className="text-xl font-bold text-gray-900 mb-4">Share Your Experience</h4>
              <form onSubmit={handleSubmitComment} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Your Name *</label>
                    <input
                      type="text"
                      value={newComment.userName}
                      onChange={(e) => setNewComment(prev => ({ ...prev, userName: e.target.value }))}
                      placeholder="Enter your name"
                      required
                      className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Your Rating *</label>
                    <div className="flex items-center space-x-1">
                      {renderInteractiveStars(newComment.rating, (rating) => 
                        setNewComment(prev => ({ ...prev, rating }))
                      )}
                      <span className="ml-2 text-sm text-gray-600">({newComment.rating}/5)</span>
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Your Review *</label>
                  <textarea
                    value={newComment.comment}
                    onChange={(e) => setNewComment(prev => ({ ...prev, comment: e.target.value }))}
                    placeholder="Share your experience with this vehicle and service..."
                    required
                    rows={4}
                    className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 transition-colors resize-none"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex items-center space-x-2 bg-blue-500 text-white px-6 py-3 rounded-xl hover:bg-blue-600 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? 'Submitting...' : 'Submit Review'}</span>
                </button>
              </form>
            </div>

            {/* Comments List */}
            <div className="space-y-6">
              {comments.map((comment) => (
                <div key={comment.id} className="border-b border-gray-200 pb-6 last:border-b-0">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-yellow-600" />
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <h4 className="font-bold text-gray-900">{comment.userName}</h4>
                          {comment.verified && (
                            <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                              Verified User
                            </span>
                          )}
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="flex items-center">
                            {renderStars(comment.rating)}
                          </div>
                          <span className="text-sm text-gray-500">•</span>
                          <span className="text-sm text-gray-500">{new Date(comment.date).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-gray-700 mb-3 leading-relaxed">{comment.comment}</p>
                  
                  <div className="flex items-center space-x-4">
                    <button className="flex items-center space-x-1 text-gray-500 hover:text-green-600 transition-colors">
                      <ThumbsUp className="w-4 h-4" />
                      <span className="text-sm">Helpful</span>
                    </button>
                    <button className="flex items-center space-x-1 text-gray-500 hover:text-blue-600 transition-colors">
                      <MessageSquare className="w-4 h-4" />
                      <span className="text-sm">Reply</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-gray-200">
              <p className="text-center text-gray-600">
                These reviews are from previous customers who have used this vehicle.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};