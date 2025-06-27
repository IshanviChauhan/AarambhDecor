import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "./../../redux/features/auth/authSlice";
import { useLogoutUserMutation } from "./../../redux/features/auth/authApi";
import { useFetchCartQuery } from "./../../redux/features/cart/cartApi";
import TopPromotionBar from "./TopPromotionBar";
import MobileNavLinks from "./MobileNavLinks";
import CartModal from "./../../pages/shop/CartModal";
import avatarImg from "./../../assets/avatar.png";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const userId = user?._id;
  const { data: products = [] } = useFetchCartQuery(userId, {
    skip: !userId,
  });
  const [logoutUser] = useLogoutUserMutation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  const handleLogout = async () => {
    try {
      await logoutUser().unwrap();
      dispatch(logout());
      navigate("/");
    } catch (err) {
      console.error("Failed to logout:", err);
    }
  };

  const handleDropDownToggle = () => setIsDropdownOpen(!isDropdownOpen);
  const handleMobileMenuToggle = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const navLinks = [
    { label: "Home", path: "/", icon: "ri-home-line" },
    { label: "Collections", path: "/shop", icon: "ri-layout-grid-line" },
    { label: "AI Advisor", path: "/ai-advisor", icon: "ri-sparkling-2-line" },
  ];

  const adminDropdownMenus = [
    { label: "Dashboard", path: "/dashboard/admin" },
    { label: "Manage Items", path: "/dashboard/manage-products" },
  ];

  const userDropdownMenus = [
    { label: "Dashboard", path: "/dashboard" },
    { label: "Profile", path: "/dashboard/profile" },
  ];

  const dropdownMenus = user?.role === "admin" ? adminDropdownMenus : userDropdownMenus;


  return (
    <>
      <TopPromotionBar />
      <header className="w-full bg-white shadow-sm z-50">
        <nav className="mx-auto px-4 lg:px-8 flex items-center justify-between py-3">
          {/* Left: Logo */}
          <div className="flex-shrink-0">
            <Link to="/">
              <img
                src="/nav_logo.png"
                alt="Logo"
                className="h-10 w-auto"
              />
            </Link>
          </div>

          {/* Center: Desktop Nav */}
          <div className="hidden md:flex flex-grow justify-center">
            <ul className="flex items-center space-x-8">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="flex items-center gap-2 text-text-dark hover:text-primary-color transition-colors"
                  >
                    <i className={link.icon}></i>
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Right: Icons & Profile */}
          <div className="flex items-center space-x-6">
            <Link to="/wishlist" className="text-xl text-text-dark hover:text-primary-color">
              <i className="ri-heart-line"></i>
            </Link>
            
            <button onClick={openCart} className="relative text-xl text-text-dark hover:text-primary-color">
               <i className="ri-shopping-bag-4-line"></i>
               {products.length > 0 && (
                <sup className="text-xs px-1 text-white rounded-full bg-primary-color text-center absolute -top-2 -right-2">
                  {products.length}
                </sup>
              )}
            </button>

            {user ? (
              <div className="relative">
                <img
                  onClick={handleDropDownToggle}
                  src={user?.profileImage || avatarImg}
                  alt="User Avatar"
                  className="w-8 h-8 rounded-full cursor-pointer"
                />
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-3 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                    <ul className="font-medium space-y-2 p-2">
                       {dropdownMenus.map((menu, index) => (
                        <li key={index}>
                          <Link
                            onClick={() => setIsDropdownOpen(false)}
                            to={menu.path}
                            className="block px-3 py-1 hover:bg-gray-100"
                          >
                            {menu.label}
                          </Link>
                        </li>
                      ))}
                       <li><button onClick={handleLogout} className="w-full text-left px-3 py-1 hover:bg-gray-100">Logout</button></li>
                    </ul>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login" className="text-xl text-text-dark hover:text-primary-color">
                <i className="ri-user-line"></i>
              </Link>
            )}

             <div className="md:hidden">
              <button onClick={handleMobileMenuToggle} className="text-2xl">
                <i className={isMobileMenuOpen ? "ri-close-line" : "ri-menu-line"}></i>
              </button>
            </div>
          </div>
        </nav>

        <MobileNavLinks
          isMobileMenuOpen={isMobileMenuOpen}
          handleMobileMenuToggle={handleMobileMenuToggle}
          navLinks={navLinks}
        />
        
        {isCartOpen && (
          <CartModal
            products={products}
            isOpen={isCartOpen}
            onClose={closeCart}
            userId={userId}
          />
        )}
      </header>
    </>
  );
};

export default Navbar;
