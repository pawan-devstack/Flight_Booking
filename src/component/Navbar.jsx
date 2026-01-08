import React, { useState, useEffect } from 'react';
import { FaUser, FaSignInAlt, FaSearch, FaChevronDown, FaPhone, FaSignOutAlt } from 'react-icons/fa';
import { NavLink, useNavigate } from 'react-router-dom';
import ReactLogo from '../assets/airplane-flying-vector-icon.jpg';
import FlightIcon from '../assets/Flight.webp';
import HotelIcon from '../assets/Hotel.webp';
import BusIcon from '../assets/Bus.webp';
import TrainIcon from '../assets/Train.webp';

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const userdata = localStorage.getItem("userdata");
    const currentUser = localStorage.getItem("currentuser");

    if (userdata) {
      try {
        const user = JSON.parse(userdata);
        setUserName(`${user.name} ${user.lastname}`);
      } catch (e) {
        console.error("userdata parse error:", e);
      }
    } else if (currentUser) {
      try {
        const user = JSON.parse(currentUser);
        setUserName(`${user.name} ${user.lastname}`);
      } catch (e) {
        console.error("current_user parse error:", e);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userdata");
    localStorage.removeItem("currentuser");
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userProfile");
    setUserName("");
    setProfileOpen(false);
    navigate("/");
  };

  const isLoggedIn = !!userName;

  return (
    <nav className="bg-white shadow-xl sticky top-0 z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">

          {/* Logo */}
          <NavLink to="/" className="flex items-center space-x-3 hover:scale-105 transition-transform">
            <img src={ReactLogo} alt="FlightBook" className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl" />
            <span className="text-xl sm:text-2xl lg:text-2xl font-black bg-gradient-to-r from-orange-500 to-yellow-500 bg-clip-text text-transparent">
              FlightBook
            </span>
          </NavLink>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-1">
            {[
              { to: '/flights', icon: FlightIcon, label: 'Flights', alt: 'Flights' },
              { to: '/hotels', icon: HotelIcon, label: 'Hotels', alt: 'Hotels' },
              { to: '/buses', icon: BusIcon, label: 'Buses', alt: 'Buses' },
              { to: '/trains', icon: TrainIcon, label: 'Trains', alt: 'Trains' }
            ].map(({ to, icon, label, alt }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `flex items-center space-x-2 font-semibold px-4 py-3 rounded-2xl transition-all duration-300 group hover:bg-orange-50 hover:shadow-lg hover:-translate-y-1 relative overflow-hidden ${isActive
                    ? 'bg-gradient-to-r from-orange-400 to-yellow-400 scale-x-100 group-hover:scale-x-100 transition-transform origin-left duration-300 text-orange-600 shadow-2xl scale-105'
                    : 'text-gray-700 hover:text-orange-600'
                  }`
                }
              >
                <img src={icon} alt={alt} className="w-8 h-8 sm:w-10 sm:h-10 group-hover:scale-110 transition-all duration-300" />
                <span className="hidden lg:inline">{label}</span>
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-orange-400 to-yellow-400 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
              </NavLink>
            ))}
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-3 relative">

            <NavLink
              to="/customer"
              className="hidden sm:flex items-center px-4 py-2 text-gray-700 font-semibold rounded-xl hover:bg-gray-100 hover:text-orange-600 transition-all duration-200"
            >
              Customer Care
            </NavLink>

            {/* Profile Dropdown */}
            <div className="relative">
              <div className="absolute -top-3 -right-3 bg-green-500 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1 shadow-lg z-20 animate-pulse">
                <div className="w-2 h-2 bg-white rounded-full animate-ping"></div>
                LIVE
              </div>

              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-2 p-2.5 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.05] bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 text-gray-700 border border-slate-200 group"
              >
                <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
                  <FaUser className="w-4 h-4 text-white drop-shadow-sm" />
                </div>

                {/* NAME DISPLAY */}
                {userName ? (
                  <span className="hidden md:block text-xs font-bold text-gray-900 bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text truncate max-w-[85px]">
                    Hi {userName.split(' ')[0]}!
                  </span>
                ) : (
                  <span className="hidden md:block text-xs font-semibold text-gray-700">Account</span>
                )}

                <FaChevronDown className={`w-3.5 h-3.5 ml-auto transition-transform duration-200 ${profileOpen ? 'rotate-180' : ''}`} />
              </button>

              {profileOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setProfileOpen(false)} />
                  <div className="absolute top-full right-0 mt-2 w-60 bg-white/95 backdrop-blur-md border border-gray-100 rounded-2xl shadow-2xl py-3 px-3 z-50 overflow-hidden animate-in slide-in-from-top-2 duration-200">

                    {/* Conditional Dropdown Content */}
                    {isLoggedIn ? (
                      <>
                        {/* Logged In - Welcome + Profile + Logout */}
                        <div className="p-3 text-center border-b border-gray-200 mb-3">
                          <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-blue-500 rounded-2xl mx-auto flex items-center justify-center mb-2 shadow-lg">
                            <FaUser className="w-6 h-6 text-white" />
                          </div>
                          <div className="font-bold text-gray-800 text-sm">{userName}</div>
                          <div className="text-xs text-gray-500">Welcome back!</div>
                        </div>

                        <NavLink to="/profile" className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-all duration-200 group block" onClick={() => setProfileOpen(false)}>
                          <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center group-hover:bg-blue-200">
                            <FaUser className="w-5 h-5 text-blue-600" />
                          </div>
                          <span className="font-medium text-gray-800 group-hover:text-blue-700">My Profile</span>
                        </NavLink>

                        <NavLink to="/bookings" className="flex items-center gap-3 p-3 rounded-xl hover:bg-orange-50 transition-all duration-200 group block" onClick={() => setProfileOpen(false)}>
                          <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center group-hover:bg-orange-200">
                            <FaSearch className="w-5 h-5 text-orange-600" />
                          </div>
                          <span className="font-medium text-gray-800 group-hover:text-orange-700">My Bookings</span>
                        </NavLink>

                        <div className="w-full h-px bg-gradient-to-r from-gray-200 to-transparent my-2 mx-1"></div>

                        <button
                          onClick={handleLogout}
                          className="flex items-center gap-3 w-full p-3 rounded-xl hover:bg-red-50 transition-all duration-200 group text-left"
                        >
                          <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center group-hover:bg-red-200">
                            <FaSignOutAlt className="w-5 h-5 text-red-600" />
                          </div>
                          <span className="font-semibold text-gray-800 group-hover:text-red-700">Logout</span>
                        </button>
                      </>
                    ) : (
                      <>
                        {/* Not Logged In */}
                        <NavLink to="/login" className="flex items-center gap-3 p-3 rounded-xl hover:bg-blue-50 transition-all duration-200 group block" onClick={() => setProfileOpen(false)}>
                          <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center group-hover:bg-blue-200">
                            <FaUser className="w-5 h-5 text-blue-600" />
                          </div>
                          <span className="font-medium text-gray-800 group-hover:text-blue-700">Login</span>
                        </NavLink>

                        <NavLink to="/signup" className="flex items-center gap-3 p-3 mx-1 my-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl hover:from-emerald-600 hover:to-teal-600 hover:shadow-xl transition-all duration-200 block" onClick={() => setProfileOpen(false)}>
                          <div className="w-10 h-10 bg-white/30 rounded-xl flex items-center justify-center">
                            <FaSignInAlt className="w-5 h-5" />
                          </div>
                          <span className="font-semibold">Sign up Free</span>
                        </NavLink>

                        <div className="w-full h-px bg-gradient-to-r from-gray-200 to-transparent my-2 mx-1"></div>

                        <NavLink to="/booking" className="flex items-center gap-3 p-3 rounded-xl hover:bg-orange-50 transition-all duration-200 group block" onClick={() => setProfileOpen(false)}>
                          <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center group-hover:bg-orange-200">
                            <FaSearch className="w-5 h-5 text-orange-600" />
                          </div>
                          <span className="font-medium text-gray-800 group-hover:text-orange-700">Find Booking</span>
                        </NavLink>

                        <a href="tel:+919999931771" className="flex items-center gap-3 p-3 rounded-xl hover:bg-green-50 transition-all duration-200 group block">
                          <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center group-hover:bg-green-200">
                            <FaPhone className="w-5 h-5 text-green-600" />
                          </div>
                          <span className="font-semibold text-gray-800 group-hover:text-green-700">+91 99999 31771</span>
                        </a>
                      </>
                    )}

                    <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-400 via-blue-400 to-orange-400 rounded-b-2xl opacity-40" />
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Mobile hamburger */}
          <div className="md:hidden ml-4">
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="inline-flex items-center justify-center p-2 rounded-xl text-gray-700 hover:bg-orange-50 hover:text-orange-600 hover:shadow-md transition-all duration-200 w-12 h-12"
            >
              {mobileOpen ? (
                <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu - Conditional based on login */}
        {mobileOpen && (
          <div className="md:hidden pb-6 border-t border-gray-200 pt-4 space-y-2">
            {[
              { to: '/flights', icon: FlightIcon, label: 'Flights' },
              { to: '/hotels', icon: HotelIcon, label: 'Hotels' },
              { to: '/buses', icon: BusIcon, label: 'Buses' },
              { to: '/trains', icon: TrainIcon, label: 'Trains' }
            ].map(({ to, icon, label }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `flex items-center space-x-4 p-4 rounded-2xl font-semibold transition-all duration-300 hover:bg-orange-50 hover:shadow-lg ${isActive
                    ? 'bg-gradient-to-r from-orange-500 to-yellow-500 text-white shadow-xl'
                    : 'text-gray-700 hover:text-orange-600'
                  }`
                }
                onClick={() => setMobileOpen(false)}
              >
                {icon && <img src={icon} alt={label} className="w-10 h-10 rounded-xl" />}
                <span className="text-lg">{label}</span>
              </NavLink>
            ))}
            <NavLink to="/customer" className="flex items-center p-4 rounded-2xl font-semibold text-gray-700 hover:bg-orange-50 hover:shadow-lg transition-all" onClick={() => setMobileOpen(false)}>
              Customer Care
            </NavLink>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
