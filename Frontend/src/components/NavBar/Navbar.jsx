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
  const { data: products = [] } = useFetchCartQuery(userId, { skip: !userId });

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
    { label: "Add New Post", path: "/dashboard/add-new-post" },
  ];

  const userDropdownMenus = [
    { label: "Dashboard", path: "/dashboard" },
    { label: "Profile", path: "/dashboard/profile" },
    { label: "Payments", path: "/dashboard/payments" },
    { label: "Orders", path: "/dashboard/orders" },
  ];

  const dropdownMenus = user?.role === "admin" ? adminDropdownMenus : userDropdownMenus;

  // For Her Categories
  const forHerCategories = [
    { label: "Earrings", path: "/gender/female/category/Earrings" },
    { label: "Necklaces", path: "/gender/female/category/Necklaces" },
    { label: "Bracelets", path: "/gender/female/category/Bracelets" },
    { label: "Rings", path: "/gender/female/category/Rings" },
    { label: "Studs", path: "/gender/female/category/Studs" },
    { label: "Ankles", path: "/gender/female/category/Ankles" },
    { label: "Fashion Jewelry", path: "/gender/female/category/Fashion+Jewelry" },
    { label: "Gold Jewelry", path: "/gender/female/category/Gold+Jewelry" },
  ];
  
  const forHimCategories = [
    { label: "Bracelets", path: "/gender/male/category/Bracelets" },
    { label: "Studs", path: "/gender/male/category/Studs" },
    { label: "Chain", path: "/gender/male/category/Chain" },
    { label: "Rings", path: "/gender/male/category/Rings" },
    { label: "Gold Jewelry", path: "/gender/male/category/Gold+Jewelry" },
    { label: "Fashion Jewelry", path: "/gender/male/category/Fashion+Jewelry" },
  ];
  

  return (
    <>
      <TopPromotionBar />

      <header className="sticky top-0 z-40 w-full bg-white/80 backdrop-blur-sm shadow-sm">
        <nav className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between py-4">
          {/* Left Side: Hamburger (Mobile) + Logo */}
          <div className="flex items-center space-x-4">
            <div className="md:hidden">
              <button onClick={handleMobileMenuToggle} className="text-2xl text-stone-700">
                <i className={isMobileMenuOpen ? "ri-close-line" : "ri-menu-line"}></i>
              </button>
            </div>
            <Link to="/" className="text-2xl font-bold font-header text-stone-800">Aarambh Decor</Link>
          </div>

          {/* Center: Desktop Navigation Links */}
          <div className="hidden md:flex">
            <DesktopNavLinks
              forHerCategories={forHerCategories}
              forHimCategories={forHimCategories}
            />
          </div>

          {/* Right Side: Search + Cart + User */}
          <div className="flex items-center space-x-4">
            <div className="hidden md:block">
              <Search />
            </div>
            <button onClick={openCart} className="relative text-stone-700 hover:text-primary transition-colors">
              <i className="ri-shopping-bag-4-line text-xl"></i>
              {products.length > 0 && (
                <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-white text-xs font-bold">
                  {products.length}
                </span>
              )}
            </button>

            {user ? (
              <div className="relative">
                <button onClick={handleDropDownToggle}>
                  <img
                    src={user?.profileImage || avatarImg}
                    alt="User Avatar"
                    className="w-8 h-8 rounded-full cursor-pointer object-cover"
                  />
                </button>
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50 border border-stone-200">
                    <ul className="py-1">
                      {dropdownMenus.map((menu, index) => (
                        <li key={index}>
                          <Link
                            onClick={() => setIsDropdownOpen(false)}
                            to={menu.path}
                            className="block px-4 py-2 text-sm text-stone-700 hover:bg-stone-100"
                          >
                            {menu.label}
                          </Link>
                        </li>
                      ))}
                      <li>
                        <button
                          onClick={handleLogout}
                          className="w-full text-left px-4 py-2 text-sm text-stone-700 hover:bg-stone-100"
                        >
                          Logout
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login" className="text-stone-700 hover:text-primary transition-colors">
                <i className="ri-user-line text-xl"></i>
              </Link>
            )}
          </div>
        </nav>

        <MobileNavLinks
          isMobileMenuOpen={isMobileMenuOpen}
          handleMobileMenuToggle={() => setIsMobileMenuOpen(false)}
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
