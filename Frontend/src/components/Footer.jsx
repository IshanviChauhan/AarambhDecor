
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const collections = [
    { name: 'Mirrors', path: '/shop/category/Mirrors' },
    { name: 'Table Decor', path: '/shop/category/Table Decor' },
    { name: 'Tables', path: '/shop/category/Tables' },
    { name: 'Wall Accents', path: '/shop/category/Wall Accents' },
    { name: 'Wall Art', path: '/shop/category/Wall Art' },
    { name: 'Wall Shelves', path: '/shop/category/Wall Shelves' },
    { name: 'View All', path: '/shop' },
  ];

  const quickLinks = [
    { name: 'About Us', path: '/' },
    { name: 'Contact Us', path: '/contact-us' },
    { name: 'FAQs', path: '/help' },
    { name: 'Shipping & Returns', path: '/return-exchange' },
    { name: 'Privacy Policy', path: '/legal-policy' },
    { name: 'Terms & Conditions', path: '/legal-policy' },
  ];

  return (
    <footer className="bg-[#F9EBE1] text-[#555555] font-light">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {/* Top Section */}
        <div className="text-center mb-12">
          <h2 className="text-2xl font-serif text-[#E57A44]">Aarambh Decor</h2>
          <p className="mt-2 text-sm max-w-2xl mx-auto">
            Celebrating tradition, creativity, and individuality through thoughtfully curated home decor.
          </p>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center md:text-left">
          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">Quick Links</h3>
            <ul className="mt-4 space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className="text-sm hover:text-gray-900">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Collections */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">Collections</h3>
            <ul className="mt-4 space-y-2">
              {collections.map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className="text-sm hover:text-gray-900">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect With Us */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">Connect With Us</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <a href="https://wa.me/919773690444" target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-sm hover:text-gray-900">
                  <i className="ri-whatsapp-line mr-2"></i>
                  Join our WhatsApp Community
                </a>
              </li>
              <li>
                <a href="#" className="inline-flex items-center text-sm hover:text-gray-900">
                  <i className="ri-instagram-line mr-2"></i>
                  Join us on Instagram
                </a>
              </li>
            </ul>
          </div>

          {/* Logo */}
          <div className="flex items-center justify-center lg:justify-end">
             <div className="bg-white p-4 rounded-lg shadow-md">
                <img 
                    src="https://placehold.co/200x150.png" 
                    alt="Aarambh Decor Logo" 
                    data-ai-hint="AD logo"
                    className="h-32 w-48 object-contain"
                />
             </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[#F2E5E9] mt-8">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 text-center text-xs">
          <p>&copy; 2025 Aarambh Decor. All rights reserved.</p>
          <p className="mt-1">
            Designed with <span className="text-red-500">&hearts;</span> by a lover of tradition.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
