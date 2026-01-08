import React, { useState } from 'react';
import { FaPhone, FaEnvelope, FaClock, FaHeadset, FaMapMarkerAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Customer = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus('Thanks! We\'ll reply within 24 hours.');
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setFormData({ name: '', email: '', message: '' });
    }, 2000);
  };

  const faqs = [
    { q: 'How to cancel booking?', a: 'Go to My Bookings → Select ticket → Cancel (24hr free)' },
    { q: 'Payment failed?', a: 'Check email for refund. Contact support if not credited in 3 days.' },
    { q: '24/7 support?', a: 'Yes! Call/WhatsApp 91 99999 31771 anytime.' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-white">
      {/* Hero Section */}
      <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black bg-gradient-to-r from-orange-500 to-yellow-500 bg-clip-text text-transparent mb-6">
            Customer Support
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 max-w-2xl mx-auto mb-12">
            24/7 Help Center • Fast Response • Happy Customers
          </p>
          
          {/* Quick Contact Cards */}
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-20">
            <div className="group bg-white/70 backdrop-blur-xl rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-2 border border-white/50">
              <FaPhone className="w-16 h-16 text-orange-500 mx-auto mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Call Us</h3>
              <p className="text-3xl font-black bg-gradient-to-r from-orange-500 to-yellow-500 bg-clip-text text-transparent">
                91 99999 31771
              </p>
              <p className="text-sm text-gray-500 mt-2">24/7 Available</p>
            </div>
            
            <div className="group bg-white/70 backdrop-blur-xl rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-2 border border-white/50">
              <FaEnvelope className="w-16 h-16 text-orange-500 mx-auto mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Email</h3>
              <p className="text-lg font-semibold text-gray-700">support@flightbook.com</p>
              <p className="text-sm text-gray-500 mt-2">Reply within 2hrs</p>
            </div>
            
            <div className="group bg-white/70 backdrop-blur-xl rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-2 border border-white/50">
              <FaHeadset className="w-16 h-16 text-orange-500 mx-auto mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Live Chat</h3>
              <p className="text-lg font-semibold text-emerald-600">Chat Now</p>
              <p className="text-sm text-gray-500 mt-2">Instant Help</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          
          {/* Contact Form */}
          <div className="lg:sticky lg:top-20 lg:h-screen lg:overflow-y-auto">
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 lg:p-12 shadow-2xl border border-white/50">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Send Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-orange-400 focus:outline-none focus:ring-4 focus:ring-orange-100 transition-all duration-300 text-lg"
                    placeholder="Your full name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-orange-400 focus:outline-none focus:ring-4 focus:ring-orange-100 transition-all duration-300 text-lg"
                    placeholder="your@email.com"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Message</label>
                  <textarea
                    name="message"
                    rows="6"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-orange-400 focus:outline-none focus:ring-4 focus:ring-orange-100 transition-all duration-300 text-lg resize-vertical"
                    placeholder="Describe your issue..."
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white font-bold py-4 px-8 rounded-2xl text-xl shadow-2xl hover:shadow-3xl hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:translate-y-0"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
                
                {status && (
                  <div className="p-4 bg-emerald-100 border-2 border-emerald-400 rounded-2xl text-emerald-800 font-semibold text-center">
                    {status}
                  </div>
                )}
              </form>
            </div>
          </div>

          {/* FAQ Section */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Frequently Asked Questions</h2>
            
            <div className="space-y-4 mb-12">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 border border-white/50">
                  <div className="flex items-start justify-between cursor-pointer group">
                    <h3 className="text-xl font-semibold text-gray-900 group-hover:text-orange-500 flex-1 pr-4">
                      {faq.q}
                    </h3>
                    <div className="w-6 h-6 flex items-center justify-center rounded-full bg-gray-200 group-hover:bg-orange-500 transition-all duration-300">
                      <svg className="w-3 h-3 text-gray-600 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                  <p className="mt-4 text-gray-700 text-lg leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>

            {/* Office Info */}
            <div className="bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-3xl p-8 shadow-2xl">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <FaMapMarkerAlt className="w-8 h-8" />
                Our Office
              </h3>
              <div className="grid md:grid-cols-2 gap-6 text-lg">
                <div className="flex items-start gap-3">
                  <FaClock className="w-6 h-6 mt-1 flex-shrink-0" />
                  <div>
                    <p>Mon-Sat: 9AM - 10PM</p>
                    <p>Sunday: 10AM - 6PM</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <FaPhone className="w-6 h-6 mt-1 flex-shrink-0" />
                  <div>
                    <p>91 99999 31771</p>
                    <p>support@flightbook.com</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Customer;
