import React from 'react';
import { Shield, Award, Users, Clock, CheckCircle, Star, Truck, Package } from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            <h1 className="text-5xl lg:text-6xl font-bold mb-6">
              About Auto X
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Leading the construction industry with premium materials and professional vehicle rental services. 
              Building trust through quality, reliability, and exceptional customer service since 2019.
            </p>
            
            <div className="grid md:grid-cols-4 gap-6 mt-12">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <div className="text-3xl font-bold text-orange-400 mb-2">500+</div>
                <div className="text-gray-300">Happy Customers</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <div className="text-3xl font-bold text-blue-400 mb-2">1000+</div>
                <div className="text-gray-300">Projects Completed</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <div className="text-3xl font-bold text-green-400 mb-2">5+</div>
                <div className="text-gray-300">Years Experience</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <div className="text-3xl font-bold text-purple-400 mb-2">24/7</div>
                <div className="text-gray-300">Support Available</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Story</h2>
              <div className="space-y-6 text-gray-600 leading-relaxed">
                <p className="text-lg">
                  Founded in 2019, Auto X began with a simple mission: to provide construction 
                  professionals with reliable access to premium materials and professional-grade vehicles. 
                  What started as a small local operation has grown into a trusted partner for 
                  construction projects across the region.
                </p>
                <p>
                  Our founders, experienced construction professionals themselves, recognized the 
                  challenges faced by contractors in sourcing quality materials and reliable equipment. 
                  This firsthand understanding drives our commitment to excellence and customer satisfaction.
                </p>
                <p>
                  Today, Auto X stands as a testament to the power of quality service, innovative 
                  solutions, and unwavering dedication to our customers' success. We continue to 
                  evolve and expand our services while maintaining the personal touch that sets us apart.
                </p>
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://i.pinimg.com/1200x/d3/6e/bb/d36ebb93a365786d5bfa118b1c7d8a63.jpg" 
                alt="Construction site with Auto X equipment" 
                className="rounded-2xl shadow-2xl w-full h-[400px] object-cover"
              />
              <div className="absolute -bottom-6 -left-6 bg-yellow-400 text-black p-6 rounded-2xl shadow-lg">
                <div className="text-2xl font-bold mb-1">Quality First</div>
                <div className="text-gray-700">Our core principle</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Mission & Vision
            </h2>
            <p className="text-xl text-gray-600">
              Driving the future of construction through innovation and excellence
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <div className="bg-white rounded-2xl p-10 shadow-lg">
              <div className="bg-yellow-100 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                <Package className="text-yellow-600 w-8 h-8" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h3>
              <p className="text-gray-600 leading-relaxed text-lg mb-6">
                To empower construction professionals with premium materials and reliable equipment, 
                delivered with exceptional service and unwavering commitment to quality.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center text-gray-700">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  Provide superior quality materials and equipment
                </li>
                <li className="flex items-center text-gray-700">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  Deliver exceptional customer service
                </li>
                <li className="flex items-center text-gray-700">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  Support project success through reliability
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl p-10 shadow-lg">
              <div className="bg-blue-100 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                <Truck className="text-blue-600 w-8 h-8" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-6">Our Vision</h3>
              <p className="text-gray-600 leading-relaxed text-lg mb-6">
                To be the leading construction solutions provider, recognized for innovation, 
                sustainability, and transforming how construction projects are executed.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center text-gray-700">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  Lead industry innovation and best practices
                </li>
                <li className="flex items-center text-gray-700">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  Promote sustainable construction solutions
                </li>
                <li className="flex items-center text-gray-700">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  Expand our reach to serve more communities
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Our Core Values
            </h2>
            <p className="text-xl text-gray-600">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="bg-gradient-to-br from-yellow-400 to-yellow-500 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Shield className="text-white w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Quality</h3>
              <p className="text-gray-600 leading-relaxed">
                We never compromise on quality. Every material and vehicle meets our rigorous standards.
              </p>
            </div>

            <div className="text-center group">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Clock className="text-white w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Reliability</h3>
              <p className="text-gray-600 leading-relaxed">
                Dependable service you can count on. We deliver on time, every time.
              </p>
            </div>

            <div className="text-center group">
              <div className="bg-gradient-to-br from-green-500 to-green-600 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Users className="text-white w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Service</h3>
              <p className="text-gray-600 leading-relaxed">
                Customer satisfaction is our priority. We go above and beyond to exceed expectations.
              </p>
            </div>

            <div className="text-center group">
              <div className="bg-gradient-to-br from-purple-500 to-purple-600 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Award className="text-white w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Excellence</h3>
              <p className="text-gray-600 leading-relaxed">
                Continuous improvement and innovation drive us to achieve excellence in all we do.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Meet Our Leadership Team
            </h2>
            <p className="text-xl text-gray-600">
              Experienced professionals dedicated to your success
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 text-center shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-24 h-24 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full mx-auto mb-6 flex items-center justify-center">
                <span className="text-white text-2xl font-bold">DT</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Dilmi Tharushika</h3>
              <p className="text-orange-600 font-semibold mb-4">Project Lead</p>
              <p className="text-gray-600 leading-relaxed">
                Coordinated the development process and contributed to design and implementation with exceptional leadership skills.
              </p>
              <div className="flex justify-center mt-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 text-center shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full mx-auto mb-6 flex items-center justify-center">
                <span className="text-white text-2xl font-bold">RR</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Rukmal Ravindu</h3>
              <p className="text-blue-600 font-semibold mb-4">Frontend Developer</p>
              <p className="text-gray-600 leading-relaxed">
                Developed the user interface and ensured a smooth user experience with modern web technologies.
              </p>
              <div className="flex justify-center mt-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 text-center shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-green-600 rounded-full mx-auto mb-6 flex items-center justify-center">
                <span className="text-white text-2xl font-bold">NR</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Nisala Rukashan</h3>
              <p className="text-green-600 font-semibold mb-4">Backend Developer</p>
              <p className="text-gray-600 leading-relaxed">
                Managed server-side development and database integration ensuring robust and scalable solutions.
              </p>
              <div className="flex justify-center mt-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications & Awards */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Certifications & Recognition
            </h2>
            <p className="text-xl text-gray-600">
              Industry recognition for our commitment to excellence
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-yellow-200 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Award className="text-yellow-700 w-10 h-10" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">ISO 9001:2015</h3>
              <p className="text-gray-600 text-sm">Quality Management System Certified</p>
            </div>

            <div className="text-center">
              <div className="bg-green-100 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Shield className="text-green-600 w-10 h-10" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Safety Excellence</h3>
              <p className="text-gray-600 text-sm">Zero Accident Record 2023</p>
            </div>

            <div className="text-center">
              <div className="bg-blue-100 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Star className="text-blue-600 w-10 h-10" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Best Service Provider</h3>
              <p className="text-gray-600 text-sm">Construction Industry Awards 2023</p>
            </div>

            <div className="text-center">
              <div className="bg-purple-100 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Users className="text-purple-600 w-10 h-10" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Customer Choice</h3>
              <p className="text-gray-600 text-sm">4.9/5 Customer Satisfaction Rating</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};