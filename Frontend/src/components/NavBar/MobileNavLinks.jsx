import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const AccordionLink = ({ category, handleMobileMenuToggle }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <li>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center py-2 text-left text-text-dark font-medium"
      >
        <span>{category.label}</span>
        <i className={`ri-arrow-down-s-line transform transition-transform ${isOpen ? 'rotate-180' : ''}`}></i>
      </button>
      {isOpen && (
        <ul className="pl-4 border-l border-gray-200">
          {category.links.map((link) => (
            <li key={link.path}>
              <Link
                to={link.path}
                onClick={handleMobileMenuToggle}
                className="block py-2 text-sm text-gray-600 hover:text-primary"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
};

const MobileNavLinks = ({ isMobileMenuOpen, handleMobileMenuToggle }) => {
  const navCategories = [
    {
      label: 'FOR HER',
      path: '/gender/female',
      links: [
        { label: 'Earrings', path: '/gender/female/category/Earrings' },
        { label: 'Necklaces', path: '/gender/female/category/Necklaces' },
        { label: 'Bracelets', path: '/gender/female/category/Bracelets' },
        { label: 'Rings', path: '/gender/female/category/Rings' },
        { label: 'Studs', path: '/gender/female/category/Studs' },
        { label: 'Ankles', path: '/gender/female/category/Ankles' },
        { label: 'Fashion Jewelry', path: '/gender/female/category/Fashion+Jewelry' },
        { label: 'Gold Jewelry', path: '/gender/female/category/Gold+Jewelry' },
      ],
    },
    {
      label: 'FOR HIM',
      path: '/gender/male',
      links: [
        { label: 'Bracelets', path: '/gender/male/category/Bracelets' },
        { label: 'Studs', path: '/gender/male/category/Studs' },
        { label: 'Chain', path: '/gender/male/category/Chain' },
        { label: 'Rings', path: '/gender/male/category/Rings' },
        { label: 'Gold Jewelry', path: '/gender/male/category/Gold+Jewelry' },
        { label: 'Fashion Jewelry', path: '/gender/male/category/Fashion+Jewelry' },
      ],
    },
  ];

  if (!isMobileMenuOpen) return null;

  return (
    <div className="absolute top-full left-0 w-full bg-white shadow-lg md:hidden z-40">
      <ul className="p-4">
        <li>
          <Link
            to="/shop"
            onClick={handleMobileMenuToggle}
            className="block py-2 text-text-dark font-medium hover:text-primary"
          >
            ALL COLLECTION
          </Link>
        </li>
        {navCategories.map((category) => (
          <AccordionLink key={category.label} category={category} handleMobileMenuToggle={handleMobileMenuToggle} />
        ))}
        <li>
          <Link
            to="/gifts"
            onClick={handleMobileMenuToggle}
            className="block py-2 text-text-dark font-medium hover:text-primary"
          >
            GIFTING
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default MobileNavLinks;
