import React from "react";
import { Link } from "react-router-dom";

const MobileNavLinks = ({ isMobileMenuOpen, handleMobileMenuToggle, navLinks }) => {
  return (
    <>
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white">
          <ul className="space-y-4 p-4 text-left">
            {navLinks.map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  onClick={handleMobileMenuToggle}
                  className="flex items-center gap-2 text-text-dark hover:text-primary-color transition-colors"
                >
                  <i className={link.icon}></i>
                  <span>{link.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default MobileNavLinks;
