import React, { useState } from 'react';
import { X, Star, MessageSquare, User, Calendar, ThumbsUp, ThumbsDown } from 'lucide-react';
import { Partner } from '../types';

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  partner: Partner;
}

interface Feedback {
  id: string;
  customerName: string;
  rating: number;
  comment: string;
  date: string;
  serviceName: string;
  helpful: number;
  verified: boolean;
}

export const FeedbackModal: React.FC<FeedbackModalProps> = ({ 
  isOpen, 
  onClose, 
  partner 
}) => {
  // Mock feedback data
  const [feedbacks] = useState<Feedback[]>([
    {
      id: '1',
      customerName: 'Saman Perera',
      rating: 5,
      comment: 'Excellent service! The JCB was in perfect condition and the operator was very skilled. Completed our excavation work efficiently.',
      date: '2024-01-10',
      serviceName: 'JCB 3CX Backhoe Loader',
      helpful: 12,
      verified: true
    },
    {
      id: '2',
      customerName: 'Nimal Silva',
      rating: 4,
      comment: 'Good quality sand delivered on time. The delivery team was professional and helpful.',
      date: '2024-01-08',
      serviceName: 'Premium River Sand',
      helpful: 8,
      verified: true
    },
    {
      id: '3',
      customerName: 'Kamala Fernando',
      rating: 5,
      comment: 'Outstanding service! Very reliable and the pricing was competitive. Will definitely use again.',
      date: '2024-01-05',
      serviceName: partner.type === 'vehicle_owner' ? 'TATA Tipper Truck' : 'Construction Bricks',
      helpful: 15,
      verified: true
    },
    {
      id: '4',
      customerName: 'Ravi Wickramasinghe',
      rating: 4,
      comment: 'Professional service with good communication. The equipment was well-maintained.',
      date: '2024-01-02',
      serviceName: partner.type === 'vehicle_owner' ? 'Water Bowser' : 'Garden Soil',
      helpful: 6,
      verified: false
    }
  ]);

  const [filterRating, setFilterRating] = useState<number | null>(null);

  if (!isOpen) return null;

  const filteredFeedbacks = filterRating 
    ? feedbacks.filter(feedback => feedback.rating === filterRating)
    : feedbacks;

  const averageRating = feedbacks.reduce((sum, feedback) => sum + feedback.rating, 0) / feedbacks.length;
  const ratingDistribution = [5, 4, 3, 2, 1].map(rating => ({
    rating,
    count: feedbacks.filter(f => f.rating === rating).length,
    percentage: (feedbacks.filter(f => f.rating === rating).length / feedbacks.length) * 100
  }));

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 rounded-t-2xl">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Customer Feedback</h2>
              <p className="text-gray-600 mt-1">Reviews and ratings from your customers</p>
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
              <X size={24} />
            </button>
          </div>
        </div>

        <div className="p-6">
          {/* Rating Summary */}
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl p-6 mb-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="text-center">
                <div className="text-5xl font-bold text-blue-600 mb-2">{averageRating.toFixed(1)}</div>
                <div className="flex items-center justify-center mb-2">
                  {renderStars(Math.round(averageRating))}
                </div>
                <div className="text-gray-600">Based on {feedbacks.length} reviews</div>
              </div>
              
              <div className="space-y-2">
                {ratingDistribution.map(({ rating, count, percentage }) => (
                  <div key={rating} className="flex items-center space-x-3">
                    <span className="text-sm font-medium w-8">{rating}★</span>
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <span className="text-sm text-gray-600 w-8">{count}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-2 mb-6">
            <button
              onClick={() => setFilterRating(null)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filterRating === null 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All Reviews
            </button>
            {[5, 4, 3, 2, 1].map(rating => (
              <button
                key={rating}
                onClick={() => setFilterRating(rating)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filterRating === rating 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {rating}★
              </button>
            ))}
          </div>

          {/* Feedback List */}
          <div className="space-y-6">
            {filteredFeedbacks.map((feedback) => (
              <div key={feedback.id} className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <User className="w-6 h-6 text-blue-600" />
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
                        <span className="text-sm text-gray-500">{feedback.serviceName}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar className="w-4 h-4 mr-1" />
                        {new Date(feedback.date).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                </div>
                
                <p className="text-gray-700 mb-4 leading-relaxed">{feedback.comment}</p>
                
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center space-x-4">
                    <button className="flex items-center space-x-1 text-gray-500 hover:text-green-600 transition-colors">
                      <ThumbsUp className="w-4 h-4" />
                      <span className="text-sm">Helpful ({feedback.helpful})</span>
                    </button>
                    <button className="flex items-center space-x-1 text-gray-500 hover:text-red-600 transition-colors">
                      <MessageSquare className="w-4 h-4" />
                      <span className="text-sm">Reply</span>
                    </button>
                  </div>
                  <div className="text-sm text-gray-500">
                    {feedback.helpful} people found this helpful
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredFeedbacks.length === 0 && (
            <div className="text-center py-12">
              <MessageSquare className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">No Reviews Found</h3>
              <p className="text-gray-600">
                {filterRating ? `No ${filterRating}-star reviews yet.` : 'No customer reviews yet.'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};