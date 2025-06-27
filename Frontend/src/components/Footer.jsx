import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const shopLinks = [
    { name: 'All Collection', path: '/shop' },
    { name: 'For Her', path: '/gender/female' },
    { name: 'For Him', path: '/gender/male' },
    { name: 'Gifting', path: '/gifts' },
  ];

  const supportLinks = [
    { name: 'Contact Us', path: '/contact-us' },
    { name: 'FAQs', path: '/help' },
    { name: 'Shipping & Delivery', path: '/delivery-information' },
    { name: 'Returns & Exchanges', path: '/return-exchange' },
    { name: 'Cancellation Policy', path: '/cancellation-policy' },
    { name: 'Privacy Policy', path: '/legal-policy' },
  ];
  
  const socialLinks = [
    { icon: 'ri-instagram-line', path: '#' },
    { icon: 'ri-facebook-box-line', path: '#' },
    { icon: 'ri-pinterest-line', path: '#' },
    { icon: 'ri-whatsapp-line', path: 'https://wa.me/919773690444' },
  ];

  return (
    <footer className="bg-primary-light-light text-text-dark font-sans">
      <div className="section__container py-12">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Column 1: Logo and About */}
          <div className="space-y-4">
            <Link to="/" className="text-2xl font-serif text-primary">
              Himtaj
            </Link>
            <p className="text-sm text-text-light">
              Crafting timeless pieces of jewelry that tell your story. Discover our exquisite collection of gold, silver, and fashion jewelry.
            </p>
          </div>

          {/* Column 2: Shop Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-text-dark tracking-wider uppercase">Shop</h3>
            <ul className="space-y-2">
              {shopLinks.map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className="text-sm text-text-light hover:text-primary transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Support Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-text-dark tracking-wider uppercase">Support</h3>
            <ul className="space-y-2">
              {supportLinks.map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className="text-sm text-text-light hover:text-primary transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Stay Connected */}
          <div className="space-y-4">
            <h3 className="font-semibold text-text-dark tracking-wider uppercase">Stay Connected</h3>
            <p className="text-sm text-text-light">Be the first to know about new arrivals, exclusive offers, and more.</p>
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="w-full px-4 py-2 text-sm border border-gray-300 rounded-l-md focus:outline-none focus:ring-1 focus:ring-primary"
                />
                <button type="submit" className="px-4 py-2 bg-primary text-white rounded-r-md hover:bg-primary-dark transition-colors">
                  <i className="ri-arrow-right-line"></i>
                </button>
              </div>
            </form>
            <div className="flex space-x-4 mt-4">
                {socialLinks.map((link, index) => (
                    <a key={index} href={link.path} target="_blank" rel="noopener noreferrer" className="text-xl text-text-light hover:text-primary transition-colors">
                        <i className={link.icon}></i>
                    </a>
                ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-200">
        <div className="section__container py-6 flex flex-col md:flex-row justify-between items-center text-center md:text-left">
          <p className="text-xs text-text-light mb-4 md:mb-0">&copy; {new Date().getFullYear()} Himtaj. All Rights Reserved.</p>
          <div className="flex items-center space-x-2">
            <img src="https://cdn-icons-png.flaticon.com/512/349/349221.png" alt="Visa" className="h-6" data-ai-hint="visa logo" />
            <img src="https://cdn-icons-png.flaticon.com/512/349/349228.png" alt="Mastercard" className="h-6" data-ai-hint="mastercard logo" />
            <img src="https://cdn-icons-png.flaticon.com/512/5968/5968382.png" alt="UPI" className="h-6" data-ai-hint="upi logo" />
            <img src="https://cdn-icons-png.flaticon.com/512/6124/6124998.png" alt="COD" className="h-6" data-ai-hint="cash on delivery" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
