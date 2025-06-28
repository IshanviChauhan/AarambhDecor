import React from "react";
import { Link } from "react-router-dom";

const DesktopNavLinks = ({ forHerCategories }) => {
  return (
    <ul className="flex items-center space-x-8">
      <li>
        <Link to="/shop" className="text-gray-700 hover:text-primary font-medium transition-colors duration-300">
          ALL COLLECTION
        </Link>
      </li>

      <li className="relative group">
        <button className="text-gray-700 hover:text-primary font-medium transition-colors duration-300 flex items-center">
          CATEGORIES
          <i className="ri-arrow-down-s-line ml-1"></i>
        </button>
        <ul className="absolute left-0 mt-2 w-56 origin-top-left bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
          <div className="py-1">
            {forHerCategories.map((item, index) => (
              <li key={index}>
                <Link
                  to={item.path}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-primary"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </div>
        </ul>
      </li>
    </ul>
  );
};

export default DesktopNavLinks;
