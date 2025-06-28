import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div className="bg-stone-100 text-stone-700">
      <footer className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
        {/* Logo & About Section */}
        <div className="col-span-2 md:col-span-1">
          <Link to="/" className="text-2xl font-bold font-header text-stone-800">Aarambh Decor</Link>
          <p className="mt-4 text-sm">
            Crafting beautiful spaces with unique and elegant home decor pieces.
          </p>
          <div className="mt-6 flex space-x-4">
            <a href="https://chat.whatsapp.com/F7s9qoIos56HiZBbN1H2O3" target="_blank" rel="noopener noreferrer" className="hover:text-primary">
              <i className="ri-whatsapp-line text-xl"></i>
            </a>
            <a href="https://www.instagram.com/_aarambh_decor/" target="_blank" rel="noopener noreferrer" className="hover:text-primary">
              <i className="ri-instagram-line text-xl"></i>
            </a>
          </div>
        </div>

        {/* Useful Links */}
        <div>
          <h4 className="font-semibold font-header text-stone-800 mb-4">Useful Links</h4>
          <div className="space-y-3">
            <Link to="/delivery-information" className="block text-sm hover:text-primary transition-colors">Delivery Information</Link>
            <Link to="/return-exchange" className="block text-sm hover:text-primary transition-colors">Returns & Exchanges</Link>
            <Link to="/legal-policy" className="block text-sm hover:text-primary transition-colors">Legal Policy</Link>
            <Link to="/cancellation-policy" className="block text-sm hover:text-primary transition-colors">Cancellation Policy</Link>
          </div>
        </div>

        {/* Information */}
        <div>
          <h4 className="font-semibold font-header text-stone-800 mb-4">Information</h4>
          <div className="space-y-3">
            <Link to="/about" className="block text-sm hover:text-primary transition-colors">About Us</Link>
            <Link to="/blogs" className="block text-sm hover:text-primary transition-colors">Blog</Link>
            <Link to="/help" className="block text-sm hover:text-primary transition-colors">Help & FAQ</Link>
            <Link to="/contact-us" className="block text-sm hover:text-primary transition-colors">Contact Us</Link>
          </div>
        </div>

        {/* Contact Us */}
        <div>
          <h4 className="font-semibold font-header text-stone-800 mb-4">Contact Us</h4>
          <div className="space-y-3 text-sm">
            <p>+91 9870232231</p>
            <p>aarambhdecor.delhi@gmail.com</p>
            <p>Greater Noida, UP, India</p>
          </div>
        </div>
      </footer>

      {/* Bottom Bar */}
      <div className="border-t border-stone-200">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row justify-between items-center text-xs">
          <p>© {new Date().getFullYear()} Aarambh Decor. All Rights Reserved.</p>
          <p className="mt-2 sm:mt-0">Designed with ♡</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
