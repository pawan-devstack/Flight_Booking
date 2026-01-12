import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaCalendar, FaArrowLeft, FaCamera, FaCheck } from 'react-icons/fa';

const ProfilePage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('personal');
  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState('');
  const [avatar, setAvatar] = useState('');

  const videoPath = '/Profilebg.mp4'

  const [formData, setFormData] = useState({
    name: '',
    lastName: '',
    email: '',
    phone: '',
    gender: '',
    dob: '',
    country: '',
    city: '',
    address: '',
    pincode: ''
  });

  // Load user data from localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    const savedProfile = localStorage.getItem('userProfile');

    if (savedUser) {
      try {
        const user = JSON.parse(savedUser);
        setFormData(prev => ({
          ...prev,
          name: user.name || '',
          lastName: user.lastname || '',
          email: user.email || '',
          gender: user.gender || ''
        }));
      } catch (e) {
        console.error('Error parsing user data');
      }
    }

    if (savedProfile) {
      try {
        const profile = JSON.parse(savedProfile);
        setFormData(prev => ({ ...prev, ...profile }));
        setAvatar(profile.avatar || '');
      } catch (e) {
        console.error('Error parsing profile data');
      }
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const profileData = { ...formData, avatar };
    localStorage.setItem('userProfile', JSON.stringify(profileData));

    setMessage('✓ Profile updated successfully!');
    setIsEditing(false);
    setTimeout(() => setMessage(''), 3000);
  };

  const getInitials = () => {
    return `${formData.name?.[0] || ''}${formData.lastName?.[0] || ''}`.toUpperCase();
  };

  return (
    <>
      <div className="fixed inset-0 w-screen h-screen overflow-hidden -z-20">
        <video
          src={videoPath}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        />
      </div>
      <div className="relative z-10 min-h-screen bg-black/40 pt-20 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">

          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 text-gray-700 hover:text-orange-500 font-semibold"
            >
              <FaArrowLeft /> Back
            </button>

            <button
              onClick={() => setIsEditing(!isEditing)}
              className="px-6 py-2 bg-gradient-to-r from-orange-500 to-yellow-500 text-white rounded-2xl font-semibold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
            >
              {isEditing ? 'Cancel' : 'Edit Profile'}
            </button>
          </div>

          {/* Success Message */}
          {message && (
            <div className="mb-6 p-4 bg-emerald-100 border-2 border-emerald-400 rounded-2xl text-emerald-800 font-semibold text-center animate-in slide-in-from-top duration-300">
              {message}
            </div>
          )}

          {/* Profile Card */}
          <div className="backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-white/50">

            {/* Cover + Avatar Section */}
            <div className="relative h-40">
              <div className="absolute -bottom-16 left-8 sm:left-12">
                <div className="relative group">
                  <div className="w-32 h-32 rounded-3xl bg-white shadow-2xl flex items-center justify-center overflow-hidden border-4 border-white">
                    {avatar ? (
                      <img src={avatar} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-orange-400 to-yellow-500 flex items-center justify-center text-white text-4xl font-bold">
                        {getInitials() || <FaUser className="w-12 h-12" />}
                      </div>
                    )}
                  </div>

                  {isEditing && (
                    <label className="absolute bottom-2 right-2 w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center cursor-pointer shadow-lg hover:bg-orange-600 transition-all hover:scale-110">
                      <FaCamera className="text-white w-5 h-5" />
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleAvatarChange}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>
              </div>

              <div className="absolute top-6 right-6 bg-white/20 backdrop-blur-md px-4 py-2 rounded-2xl text-white font-semibold">
                Member since 2026
              </div>
            </div>

            {/* User Info Header */}
            <div className="pt-20 px-8 pb-6 border-b">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {formData.name} {formData.lastName}
              </h1>
              <p className="text-black flex items-center gap-2">
                <FaEnvelope className="text-orange-500" />
                {formData.email || 'No email added'}
              </p>
            </div>

            {/* Tabs */}
            <div className="flex border-b px-8">
              <button
                onClick={() => setActiveTab('personal')}
                className={`px-6 py-4 font-semibold transition-all relative ${activeTab === 'personal'
                  ? 'text-orange-600'
                  : 'text-black hover:scale-110'
                  }`}
              >
                Personal Info
                {activeTab === 'personal' && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-400 to-yellow-400 rounded-t-full" />
                )}
              </button>

              <button
                onClick={() => setActiveTab('stats')}
                className={`px-6 py-4 font-semibold transition-all relative ${activeTab === 'stats'
                  ? 'text-orange-600'
                  : 'text-black hover:scale-110'
                  }`}
              >
                Statistics
                {activeTab === 'stats' && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-400 to-yellow-400 rounded-t-full" />
                )}
              </button>
            </div>

            {/* Tab Content */}
            <div className="p-8">
              {activeTab === 'personal' && (
                <form onSubmit={handleSubmit} className="space-y-6">

                  {/* Name Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-black mb-2 flex items-center gap-2">
                        <FaUser className="text-orange-500" /> First Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-orange-400 focus:outline-none focus:ring-4 focus:ring-orange-100 transition-all disabled:bg-gray-50 disabled:cursor-not-allowed text-lg"
                        placeholder="Enter first name"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-black mb-2">
                        Last Name
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-orange-400 focus:outline-none focus:ring-4 focus:ring-orange-100 transition-all disabled:bg-gray-50 disabled:cursor-not-allowed text-lg"
                        placeholder="Enter last name"
                      />
                    </div>
                  </div>

                  {/* Email + Phone */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-black mb-2 flex items-center gap-2">
                        <FaEnvelope className="text-orange-500" /> Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        disabled
                        className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 bg-gray-50 cursor-not-allowed text-lg"
                      />
                      <p className="text-xs text-gray-500 mt-1">Email is linked to your account</p>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-black mb-2 flex items-center gap-2">
                        <FaPhone className="text-orange-500" /> Phone
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-orange-400 focus:outline-none focus:ring-4 focus:ring-orange-100 transition-all disabled:bg-gray-50 disabled:cursor-not-allowed text-lg"
                        placeholder="+91 XXXXX XXXXX"
                      />
                    </div>
                  </div>

                  {/* Gender + DOB */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-black mb-2">Gender</label>
                      <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-orange-400 focus:outline-none focus:ring-4 focus:ring-orange-100 transition-all disabled:bg-gray-50 disabled:cursor-not-allowed text-lg"
                      >
                        <option value="">Select gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-black mb-2 flex items-center gap-2">
                        <FaCalendar className="text-orange-500" /> Date of Birth
                      </label>
                      <input
                        type="date"
                        name="dob"
                        value={formData.dob}
                        onChange={handleChange}
                        disabled={!isEditing}
                        max={new Date().toISOString().split('T')[0]}
                        className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-orange-400 focus:outline-none focus:ring-4 focus:ring-orange-100 transition-all disabled:bg-gray-50 disabled:cursor-not-allowed text-lg"
                      />
                    </div>
                  </div>

                  {/* Country + City */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-black mb-2 flex items-center gap-2">
                        <FaMapMarkerAlt className="text-orange-500" /> Country
                      </label>
                      <input
                        type="text"
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-orange-400 focus:outline-none focus:ring-4 focus:ring-orange-100 transition-all disabled:bg-gray-50 disabled:cursor-not-allowed text-lg"
                        placeholder="India"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-black mb-2">City</label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-orange-400 focus:outline-none focus:ring-4 focus:ring-orange-100 transition-all disabled:bg-gray-50 disabled:cursor-not-allowed text-lg"
                        placeholder="Mumbai, Delhi..."
                      />
                    </div>
                  </div>

                  {/* Address */}
                  <div>
                    <label className="block text-sm font-semibold text-black mb-2">Address</label>
                    <textarea
                      name="address"
                      rows="3"
                      value={formData.address}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-orange-400 focus:outline-none focus:ring-4 focus:ring-orange-100 transition-all disabled:bg-gray-50 disabled:cursor-not-allowed text-lg resize-none"
                      placeholder="Street, Area, Landmark..."
                    />
                  </div>

                  {/* Submit Button */}
                  {isEditing && (
                    <div className="flex justify-end pt-4">
                      <button
                        type="submit"
                        className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white font-bold rounded-2xl shadow-2xl hover:shadow-3xl hover:-translate-y-1 transition-all duration-300 text-lg"
                      >
                        <FaCheck /> Save Changes
                      </button>
                    </div>
                  )}
                </form>
              )}

              {activeTab === 'stats' && (
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 border-2 border-blue-200">
                    <div className="text-4xl font-black text-blue-600 mb-2">12</div>
                    <div className="text-gray-700 font-semibold">Total Bookings</div>
                  </div>

                  <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-2xl p-6 border-2 border-emerald-200">
                    <div className="text-4xl font-black text-emerald-600 mb-2">₹45,890</div>
                    <div className="text-gray-700 font-semibold">Total Spent</div>
                  </div>

                  <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-6 border-2 border-orange-200">
                    <div className="text-4xl font-black text-orange-600 mb-2">5</div>
                    <div className="text-gray-700 font-semibold">Cities Visited</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
