import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div className="bg-white/10 backdrop-blur-md border-t border-white/20 pt-4 mt-4">
      <footer className="section__container bg-white/5 backdrop-blur-sm p-4 lg:p-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {/* Logo Section */}
          <div className="footer__col flex justify-center">
            <img src="/logo4.png" className="w-24 h-24 sm:w-32 sm:h-32 lg:w-44 lg:h-48" alt="Logo" />
          </div>

          {/* Useful Links */}
          <div className="footer__col text-center">
            <h4 className="text-lg font-semibold mb-2">Useful Links</h4>
            <Link to="/delivery-information" className="block text-sm mb-1">Delivery Information</Link>
            <Link to="/return-exchange" className="block text-sm mb-1">Returns</Link>
            <Link to="/delivery-information" className="block text-sm mb-1">Shipping</Link>
            <Link to="/legal-policy" className="block text-sm mb-1">Legal Policy</Link>
            <Link to="/" className="block text-sm">Terms & Conditions</Link>
          </div>

          {/* Information */}
          <div className="footer__col text-center">
            <h4 className="text-lg font-semibold mb-2">Information</h4>
            <Link to="/" className="block text-sm mb-1">About Us</Link>
            <Link to="/" className="block text-sm mb-1">Blog</Link>
            <Link to="/cancellation-policy" className="block text-sm mb-1">Cancellation Policy</Link>
            <Link to="/help" className="block text-sm mb-1">Help & FAQ</Link>
            <Link to="/legal-policy" className="block text-sm">Privacy Policy</Link>
          </div>

          {/* Contact Us */}
          <div className="footer__col text-center">
            <h4 className="text-lg font-semibold mb-2">Contact Us</h4>
            <p className="text-black text-sm mb-1">+91 9870232231</p>
            <Link to="/contact-us" className="block text-sm mb-1">Chat With Us</Link>
            <Link to="https://chat.whatsapp.com/F7s9qoIos56HiZBbN1H2O3" className="block text-sm mb-1">Join our WhatsApp Community</Link>
            <Link to="https://www.instagram.com/_aarambh_decor/" className="block text-sm">Join us on Instagram</Link>
          </div>
        </div>
      </footer>

      {/* Bottom Footer */}
      <footer className="section__container3 bg-white/5 backdrop-blur-sm border-t border-white/10 text-black text-center p-4 lg:flex lg:justify-between flex-col lg:flex-row">
        <p className="text-sm">©2025 Copyright Aarambh Decor. All Rights Reserved.</p>
        {/* <p className="text-sm">By Ishanvi Chauhan</p> */}
      </footer>
    </div>
  );
};

export default Footer;
