import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send, MessageSquare, User, Building } from 'lucide-react';
import { InteractiveMap } from './InteractiveMap';

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Contact form submitted:', formData);
    // Handle form submission here
    alert('Thank you for your message! We\'ll get back to you soon.');
    setFormData({
      name: '',
      email: '',
      phone: '',
      company: '',
      subject: '',
      message: ''
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            <h1 className="text-5xl lg:text-6xl font-bold mb-6">
              Contact Auto X
            </h1>
            <p className="text-xl text-black max-w-3xl mx-auto mb-8">
              Get in touch with our team for all your construction material and vehicle rental needs. 
              We're here to help make your project a success.
            </p>
            
            <div className="grid md:grid-cols-3 gap-6 mt-12">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <Phone className="w-8 h-8 text-black mx-auto mb-3" />
                <h3 className="font-bold text-lg mb-2">Call Us</h3>
                <p className="text-black text-sm">24/7 Support Available</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <Mail className="w-8 h-8 text-black mx-auto mb-3" />
                <h3 className="font-bold text-lg mb-2">Email Us</h3>
                <p className="text-black text-sm">Quick Response Guaranteed</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <MapPin className="w-8 h-8 text-black mx-auto mb-3" />
                <h3 className="font-bold text-lg mb-2">Visit Us</h3>
                <p className="text-black text-sm">Multiple Locations</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Information & Form */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Information */}
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-8">Get In Touch</h2>
              <p className="text-lg text-gray-600 mb-10 leading-relaxed">
                Ready to start your project? Our experienced team is here to provide expert guidance 
                and support for all your construction needs. Contact us today for a personalized consultation.
              </p>

              <div className="space-y-8">
                <div className="flex items-start">
                  <div className="bg-yellow-400 p-3 rounded-xl mr-6 mt-1">
                    <Phone className="text-white w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl text-gray-900 mb-2">Phone Support</h3>
                    <p className="text-gray-600 mb-2">+94 76 1098385</p>
                    <p className="text-gray-600 mb-2">+94 76 1098385 (Emergency)</p>
                    <p className="text-sm text-gray-500">Available 24/7 for urgent requests</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-blue-500 p-3 rounded-xl mr-6 mt-1">
                    <Mail className="text-white w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl text-gray-900 mb-2">Email Support</h3>
                    <p className="text-gray-600 mb-2">info@autox.lk</p>
                    <p className="text-gray-600 mb-2">sales@autox.lk</p>
                    <p className="text-gray-600 mb-2">support@autox.lk</p>
                    <p className="text-sm text-gray-500">Response within 2 hours during business hours</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-green-500 p-3 rounded-xl mr-6 mt-1">
                    <MapPin className="text-white w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl text-gray-900 mb-2">Main Office</h3>
                    <p className="text-gray-600 mb-2">No. 245, Lakeview Avenue</p>
                    <p className="text-gray-600 mb-2">Nugegoda, Colombo 10250</p>
                    <p className="text-gray-600 mb-2">Sri Lanka</p>
                    <p className="text-sm text-gray-500">Open Mon-Fri: 6:00 AM - 8:00 PM</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-purple-500 p-3 rounded-xl mr-6 mt-1">
                    <Clock className="text-white w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl text-gray-900 mb-2">Business Hours</h3>
                    <p className="text-gray-600 mb-1">Monday - Friday: 6:00 AM - 8:00 PM</p>
                    <p className="text-gray-600 mb-1">Saturday: 7:00 AM - 6:00 PM</p>
                    <p className="text-gray-600 mb-1">Sunday: 8:00 AM - 4:00 PM</p>
                    <p className="text-sm text-gray-500">Emergency services available 24/7</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white rounded-2xl shadow-2xl p-8">
              <h3 className="text-3xl font-bold text-gray-900 mb-8">Send Us a Message</h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="flex items-center text-sm font-semibold text-gray-700 mb-3">
                      <User size={16} className="mr-2" />
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      placeholder="Your full name"
                      className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-yellow-500 transition-colors"
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
                      placeholder="your.email@example.com"
                      className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-orange-500 transition-colors"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
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
                      <Building size={16} className="mr-2" />
                      Company Name
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      placeholder="Your company name"
                      className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-orange-500 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="flex items-center text-sm font-semibold text-gray-700 mb-3">
                    <MessageSquare size={16} className="mr-2" />
                    Subject *
                  </label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-orange-500 transition-colors"
                  >
                    <option value="">Select a subject</option>
                    <option value="material-inquiry">Material Supply Inquiry</option>
                    <option value="vehicle-rental">Vehicle Rental Request</option>
                    <option value="bulk-order">Bulk Order Quote</option>
                    <option value="partnership">Partnership Opportunity</option>
                    <option value="support">Technical Support</option>
                    <option value="feedback">Feedback & Suggestions</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="flex items-center text-sm font-semibold text-gray-700 mb-3">
                    <MessageSquare size={16} className="mr-2" />
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    placeholder="Please provide details about your project requirements, timeline, and any specific needs..."
                    className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-orange-500 transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-black py-4 px-6 rounded-xl hover:from-yellow-500 hover:to-yellow-600 transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl flex items-center justify-center"
                >
                  <Send size={20} className="mr-2" />
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Find Our Locations</h2>
            <p className="text-xl text-gray-600">Interactive map showing our service centers across Sri Lanka</p>
          </div>

          {/* Interactive Map */}
          <InteractiveMap />
          
          {/* Location Cards */}
          <div className="grid md:grid-cols-3 gap-8 mt-12">
            <div className="bg-gray-50 rounded-2xl p-8 text-center hover:shadow-lg transition-shadow">
              <div className="bg-yellow-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <MapPin className="text-yellow-600 w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Main Warehouse</h3>
              <p className="text-gray-600 mb-2">No. 245, Lakeview Avenue</p>
              <p className="text-gray-600 mb-2">Nugegoda, Colombo 10250</p>
              <p className="text-sm text-gray-500 mb-4">Materials & Vehicle Hub</p>
              <button
                onClick={() => {
                  const url = `https://www.google.com/maps/dir/?api=1&destination=6.8649,79.8997`;
                  window.open(url, '_blank');
                }}
                className="bg-yellow-400 text-black px-4 py-2 rounded-lg hover:bg-yellow-500 transition-colors text-sm font-semibold"
              >
                Get Directions
              </button>
            </div>

            <div className="bg-gray-50 rounded-2xl p-8 text-center hover:shadow-lg transition-shadow">
              <div className="bg-blue-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <MapPin className="text-blue-600 w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">North Branch</h3>
              <p className="text-gray-600 mb-2">No. 156, Industrial Road</p>
              <p className="text-gray-600 mb-2">Kelaniya, Colombo 11500</p>
              <p className="text-sm text-gray-500 mb-4">Vehicle Rental Center</p>
              <button
                onClick={() => {
                  const url = `https://www.google.com/maps/dir/?api=1&destination=6.9553,79.9200`;
                  window.open(url, '_blank');
                }}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors text-sm font-semibold"
              >
                Get Directions
              </button>
            </div>

            <div className="bg-gray-50 rounded-2xl p-8 text-center hover:shadow-lg transition-shadow">
              <div className="bg-green-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <MapPin className="text-green-600 w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">South Depot</h3>
              <p className="text-gray-600 mb-2">No. 89, Supply Chain Road</p>
              <p className="text-gray-600 mb-2">Panadura, Colombo 12500</p>
              <p className="text-sm text-gray-500 mb-4">Materials Distribution</p>
              <button
                onClick={() => {
                  const url = `https://www.google.com/maps/dir/?api=1&destination=6.7132,79.9026`;
                  window.open(url, '_blank');
                }}
                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors text-sm font-semibold"
              >
                Get Directions
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600">
              Quick answers to common questions
            </p>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-4">What are your delivery areas?</h3>
              <p className="text-gray-600 leading-relaxed">
                We provide delivery services within a 50-mile radius of our main locations. 
                For projects outside this area, please contact us to discuss special arrangements.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Do you offer emergency services?</h3>
              <p className="text-gray-600 leading-relaxed">
                Yes, we provide 24/7 emergency services for urgent construction needs. 
                Emergency rates may apply for after-hours and weekend services.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-4">What payment methods do you accept?</h3>
              <p className="text-gray-600 leading-relaxed">
                We accept cash, check, credit cards, and offer net-30 payment terms for 
                established commercial customers with approved credit.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Do you provide operators with vehicle rentals?</h3>
              <p className="text-gray-600 leading-relaxed">
                Yes, all our heavy machinery rentals include experienced, certified operators. 
                We also offer equipment-only rentals for customers with qualified operators.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};