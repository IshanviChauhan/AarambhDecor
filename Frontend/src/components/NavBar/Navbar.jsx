import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

// Redux and API hooks
import { logout } from "./../../redux/features/auth/authSlice";
import { useLogoutUserMutation } from "./../../redux/features/auth/authApi";
import { useFetchCartQuery } from "./../../redux/features/cart/cartApi";

// Components
import TopPromotionBar from "./TopPromotionBar";
import MobileNavLinks from "./MobileNavLinks";
import DesktopNavLinks from "./DesktopNavLinks";
import CartModal from "./../../pages/shop/CartModal";
import Search from "./../Search";

// Assets
import avatarImg from "./../../assets/avatar.png";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Auth
  const { user } = useSelector((state) => state.auth);
  const userId = user?._id;

  // Fetch Cart Items
  const { data: products = [] } = useFetchCartQuery(userId);

  // Logout
  const [logoutUser] = useLogoutUserMutation();
  const handleLogout = async () => {
    try {
      await logoutUser().unwrap();
      dispatch(logout());
      navigate("/");
    } catch (err) {
      console.error("Failed to logout:", err);
    }
  };

  // Cart Modal State
  const [isCartOpen, setIsCartOpen] = useState(false);
  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  // Dropdown (Profile) State
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const handleDropDownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Mobile Menu State
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Dropdown menu arrays
  const adminDropdownMenus = [
    { label: "Dashboard", path: "/dashboard/admin" },
    { label: "Manage Items", path: "/dashboard/manage-products" },
    { label: "All Orders", path: "/dashboard/manage-orders" },
    { label: "Add New Product", path: "/dashboard/add-new-post" },
  ];

  const userDropdownMenus = [
    { label: "Dashboard", path: "/dashboard" },
    { label: "Profile", path: "/dashboard/profile" },
    { label: "Payments", path: "/dashboard/payments" },
    { label: "Orders", path: "/dashboard/orders" },
  ];

  const dropdownMenus = user?.role === "admin" ? adminDropdownMenus : userDropdownMenus;

  const forHerCategories = [
    { label: "Mirrors", path: "/shop/category/Mirrors" },
    { label: "Table Decor", path: "/shop/category/Table+Decor" },
    { label: "Tables", path: "/shop/category/Tables" },
    { label: "Wall Accents", path: "/shop/category/Wall+Accents" },
    { label: "Wall Art", path: "/shop/category/Wall+Art" },
    { label: "Wall Shelves", path: "/shop/category/Wall+Shelves" },
  ];
  
  const forHimCategories = [];


  return (
    <>
      <TopPromotionBar />
      <header className="bg-white/90 backdrop-blur-md shadow-sm sticky top-0 z-50 w-full transition-all duration-300">
        <nav className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-20">
          {/* Left Side: Hamburger (Mobile) + Logo */}
          <div className="flex items-center space-x-4">
            <div className="md:hidden">
              <button onClick={handleMobileMenuToggle} className="text-2xl text-gray-700 hover:text-primary">
                <i className={isMobileMenuOpen ? "ri-close-line" : "ri-menu-line"}></i>
              </button>
            </div>
            <Link to="/">
              <img
                src="/nav_logo.png"
                alt="Logo"
                className="h-14 w-auto object-contain"
              />
            </Link>
          </div>

          {/* Center: Desktop Navigation Links */}
          <div className="hidden md:flex md:items-center md:justify-center">
            <DesktopNavLinks forHerCategories={forHerCategories} />
          </div>

          {/* Right Side: Search, Cart, User Profile */}
          <div className="flex items-center space-x-4">
            <div className="hidden md:block">
              <Search />
            </div>
            <button
              onClick={openCart}
              className="hover:text-primary relative text-2xl text-gray-700 transition-colors"
            >
              <i className="ri-shopping-bag-4-line"></i>
              {products.length > 0 && (
                <span className="absolute -top-1 -right-2 flex items-center justify-center h-5 w-5 text-xs font-bold text-white bg-primary rounded-full">
                  {products.length}
                </span>
              )}
            </button>
            {user ? (
              <div className="relative">
                <button onClick={handleDropDownToggle} className="focus:outline-none">
                  <img
                    src={user?.profileImage || avatarImg}
                    alt="User Avatar"
                    className="w-10 h-10 rounded-full cursor-pointer border-2 border-transparent hover:border-primary transition"
                  />
                </button>
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-xl z-50 origin-top-right ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      <div className="px-4 py-2 border-b">
                          <p className="text-sm font-semibold text-gray-800">{user.username}</p>
                          <p className="text-xs text-gray-500">{user.email}</p>
                      </div>
                      <ul className="py-1">
                        {dropdownMenus.map((menu, index) => (
                          <li key={index}>
                            <Link
                              onClick={() => setIsDropdownOpen(false)}
                              to={menu.path}
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-primary"
                            >
                              {menu.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                      <div className="border-t">
                        <button
                          onClick={handleLogout}
                          className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 hover:text-red-800"
                        >
                          Logout
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login" className="text-2xl text-gray-700 hover:text-primary transition-colors">
                <i className="ri-user-line"></i>
              </Link>
            )}
          </div>
        </nav>
        
        <MobileNavLinks
          isMobileMenuOpen={isMobileMenuOpen}
          handleMobileMenuToggle={handleMobileMenuToggle}
          forHerCategories={forHerCategories}
        />

      </header>
        {isCartOpen && (
          <CartModal
            products={products}
            isOpen={isCartOpen}
            onClose={closeCart}
            userId={userId}
          />
        )}
    </>
  );
};

export default Navbar;
