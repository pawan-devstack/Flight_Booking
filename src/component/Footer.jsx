import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';

const Footer = () => {
  const socialIcons = [
    <FaFacebookF key="fb" />,
    <FaTwitter key="tw" />,
    <FaInstagram key="ig" />,
    <FaYoutube key="yt" />
  ];

  return (
    <footer className="bg-blue-950 text-white py-5 mt-20">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-6 gap-8">
        {/* Company Info */}
        <div className="md:col-span-2">
          <h3 className="text-2xl font-bold mb-4">Important Links</h3>
          <p className="text-gray-300 mb-6">Best Flights at great prices. Book now!</p>
          <div className="flex gap-4">
            {socialIcons.map((icon, index) => (
              <div key={index} className="p-3 bg-gray-800 rounded-full hover:bg-orange-500 transition-all cursor-pointer">
                {icon}
              </div>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-xl font-bold mb-4">Quick Links</h4>
          <ul className="space-y-2">
            <li><NavLink to="/offers" className="text-gray-300 hover:text-white transition">Flight Offers</NavLink></li>
            <li><NavLink to="/flights" className="text-gray-300 hover:text-white transition">Flights</NavLink></li>
            <li><NavLink to="/hotels" className="text-gray-300 hover:text-white transition">Hotels</NavLink></li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h4 className="text-xl font-bold mb-4">Support</h4>
          <ul className="space-y-2">
            <li><NavLink to="/about" className="text-gray-300 hover:text-white transition">About Us</NavLink></li>
            <li><NavLink to="/contact" className="text-gray-300 hover:text-white transition">Contact</NavLink></li>
            <li><NavLink to="/policy" className="text-gray-300 hover:text-white transition">Privacy Policy</NavLink></li>
          </ul>
        </div>
        {/* Packages */}
        <div>
          <h4 className="text-xl font-bold mb-4">Packages</h4>
          <ul className="space-y-2">
            <li><NavLink to="/package" className="text-gray-300 hover:text-white transition">Goa</NavLink></li>
            <li><NavLink to="/package" className="text-gray-300 hover:text-white transition">Manali</NavLink></li>
            <li><NavLink to="/package" className="text-gray-300 hover:text-white transition">Thailand</NavLink></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-gray-800 mt-8 pt-4 text-center items-center">
        <p>&copy; {new Date().getFullYear()} Flight Book. All rights reserved. | Privacy Policy</p>
      </div>
    </footer>
  );
};

export default Footer;
