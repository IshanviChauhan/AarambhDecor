import React, { useState } from "react";
import { Link } from "react-router-dom";

const MobileNavLinks = ({ isMobileMenuOpen, handleMobileMenuToggle, forHerCategories }) => {
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);

  const toggleCategory = () => {
    setIsCategoryOpen(!isCategoryOpen);
  };
  
  const closeMenu = () => {
    handleMobileMenuToggle();
    setIsCategoryOpen(false);
  }

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity md:hidden ${
          isMobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={closeMenu}
      ></div>

      {/* Mobile Menu Panel */}
      <div
        className={`fixed top-0 left-0 w-4/5 max-w-sm h-full bg-white shadow-xl z-50 transform transition-transform md:hidden ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-4 border-b">
          <Link to="/" onClick={closeMenu}>
            <img src="/nav_logo.png" alt="Logo" className="h-12 w-auto" />
          </Link>
        </div>
        <ul className="flex flex-col p-4 space-y-2">
          <li>
            <Link onClick={closeMenu} to="/shop" className="block py-2 px-3 rounded-md hover:bg-gray-100 font-medium text-gray-700">
              ALL COLLECTION
            </Link>
          </li>
          <li>
            <button onClick={toggleCategory} className="w-full flex justify-between items-center py-2 px-3 rounded-md hover:bg-gray-100 font-medium text-gray-700">
              <span>CATEGORIES</span>
              <i className={`ri-arrow-down-s-line transition-transform ${isCategoryOpen ? 'rotate-180' : ''}`}></i>
            </button>
            {isCategoryOpen && (
              <ul className="pl-4 mt-1 border-l-2 border-primary-light">
                {forHerCategories.map((item, index) => (
                   <li key={index}>
                    <Link
                      onClick={closeMenu}
                      to={item.path}
                      className="block py-2 px-3 text-sm text-gray-600 hover:bg-gray-100 rounded-md"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        </ul>
      </div>
    </>
  );
};

export default MobileNavLinks;
