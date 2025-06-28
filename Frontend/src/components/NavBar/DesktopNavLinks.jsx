import React from "react";
import { Link } from "react-router-dom";

const DesktopNavLinks = ({ forHerCategories }) => {
  return (
    <ul className="nav__links hidden md:flex flex-1 justify-center space-x-6">
      {/* All Collection */}
      <li>
        <Link to="/shop" className="text-gray-800 hover:text-primary font-medium">
          ALL COLLECTION
        </Link>
      </li>

      {/* CATEGORIES */}
      <li className="relative group">
        <Link
          to="/shop"
          className="text-gray-800 hover:text-primary font-medium"
        >
          CATEGORIES
        </Link>
        <ul className="absolute left-0 hidden group-hover:flex flex-col bg-white border border-gray-200 rounded-lg shadow-lg w-44 z-50">
          {forHerCategories.map((item, index) => (
            <li key={index} className="px-4 py-1">
              <Link
                to={item.path}
                className="text-sm text-gray-700 hover:text-primary hover:underline"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </li>

      {/* Gifting */}
      <li>
        <Link to="/gifts" className="text-gray-800 hover:text-primary font-medium">
          GIFTING
        </Link>
      </li>
    </ul>
  );
};

export default DesktopNavLinks;
