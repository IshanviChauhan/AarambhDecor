import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-[#F9EBE1] text-gray-700">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <h4 className="text-lg font-bold mb-4 text-gray-800">Himtaj</h4>
            <p className="text-sm leading-relaxed">
              Discover timeless elegance with our exquisite jewelry collection. Crafted with passion and precision for every occasion.
            </p>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="text-gray-600 hover:text-[#E57A44]"><FaFacebookF /></a>
              <a href="#" className="text-gray-600 hover:text-[#E57A44]"><FaTwitter /></a>
              <a href="#" className="text-gray-600 hover:text-[#E57A44]"><FaInstagram /></a>
              <a href="#" className="text-gray-600 hover:text-[#E57A44]"><FaLinkedinIn /></a>
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h4 className="text-lg font-bold mb-4 text-gray-800">Shop</h4>
            <ul>
              <li className="mb-2"><Link to="/shop" className="text-sm hover:underline">All Collections</Link></li>
              <li className="mb-2"><Link to="/gender/female" className="text-sm hover:underline">For Her</Link></li>
              <li className="mb-2"><Link to="/gender/male" className="text-sm hover:underline">For Him</Link></li>
              <li className="mb-2"><Link to="/gifts" className="text-sm hover:underline">Gifting</Link></li>
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h4 className="text-lg font-bold mb-4 text-gray-800">Support</h4>
            <ul>
              <li className="mb-2"><Link to="/contact-us" className="text-sm hover:underline">Contact Us</Link></li>
              <li className="mb-2"><Link to="/help" className="text-sm hover:underline">FAQ</Link></li>
              <li className="mb-2"><Link to="/delivery-information" className="text-sm hover:underline">Shipping & Delivery</Link></li>
              <li className="mb-2"><Link to="/return-exchange" className="text-sm hover:underline">Returns & Exchanges</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-lg font-bold mb-4 text-gray-800">Stay Updated</h4>
            <p className="text-sm mb-4">Subscribe to our newsletter for the latest collections and offers.</p>
            <form>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="w-full px-4 py-2 text-sm text-gray-800 bg-white border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-[#E57A44]"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#E57A44] text-white font-semibold rounded-r-md hover:bg-[#D46A34] transition"
                >
                  Subscribe
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-200">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 text-center text-xs text-gray-600">
            <p>&copy; {new Date().getFullYear()} Himtaj. All Rights Reserved.</p>
            <div className="mt-2">
                <Link to="/legal-policy" className="hover:underline mx-2">Privacy Policy</Link> |
                <Link to="/legal-policy" className="hover:underline mx-2">Terms of Service</Link>
            </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
