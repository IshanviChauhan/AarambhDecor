import React from "react";
import { useLogoutUserMutation } from "../../src/redux/features/auth/authApi";
import { useDispatch } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { logout } from "../../src/redux/features/auth/authSlice";

const navItems = [
  { path: "/dashboard", label: "Dashboard" },
  { path: "/dashboard/orders", label: "Orders" },
  { path: "/dashboard/payments", label: "Payments" },
  { path: "/dashboard/profile", label: "Profile" },
  { path: "/dashboard/reviews", label: "Reviews" },
];

const UserDashboard = () => {
  const [logoutUser] = useLogoutUserMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logoutUser().unwrap();
      console.log("User logged out successfully");
      dispatch(logout());
      navigate("/");
    } catch (err) {
      console.error("Failed to logout:", err);
    }
  };

  return (
    <div className="w-full">
      <div className="bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl shadow-xl p-6 lg:p-8 space-y-6">
        {/* Header Section */}
        <div className="text-center">
          <div className="mb-2">
            <Link to="/" className="text-xl lg:text-2xl font-heading font-bold text-gray-900">
              Aarambh<span className="text-primary">Decor</span>
            </Link>
          </div>
          <div className="bg-primary/10 backdrop-blur-sm rounded-full px-4 py-2 inline-block">
            <p className="text-sm font-medium text-primary">User Dashboard</p>
          </div>
        </div>

        {/* Decorative Divider */}
        <div className="flex items-center justify-center">
          <div className="h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent w-full"></div>
          <div className="mx-4">
            <div className="w-2 h-2 bg-primary rounded-full"></div>
          </div>
          <div className="h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent w-full"></div>
        </div>

        {/* Navigation Items */}
        <div className="space-y-3">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end
              className={({ isActive }) =>
                `group relative flex items-center justify-between p-3 lg:p-4 rounded-xl transition-all duration-300 ${
                  isActive 
                    ? "bg-primary text-white shadow-lg transform scale-[1.02]" 
                    : "bg-white/30 hover:bg-white/50 text-gray-700 hover:text-primary hover:scale-[1.01]"
                }`
              }
            >
              <span className="font-medium text-sm lg:text-base">{item.label}</span>
              <div className={`w-2 h-2 rounded-full transition-all duration-300 ${
                ({ isActive }) => isActive ? "bg-white" : "bg-primary/50 group-hover:bg-primary"
              }`}></div>
            </NavLink>
          ))}
        </div>

        {/* Decorative Divider */}
        <div className="flex items-center justify-center">
          <div className="h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent w-full"></div>
          <div className="mx-4">
            <div className="w-2 h-2 bg-primary rounded-full"></div>
          </div>
          <div className="h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent w-full"></div>
        </div>

        {/* Logout Section */}
        <div className="pt-4">
          <button
            onClick={handleLogout}
            className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-medium py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg active:scale-[0.98] flex items-center justify-center space-x-2"
          >
            <svg className="w-4 h-4 lg:w-5 lg:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <span className="text-sm lg:text-base">Logout</span>
          </button>
        </div>
      </div>

      {/* Additional Info Card - Hidden on mobile in layout */}
      <div className="mt-6 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4 text-center hidden lg:block">
        <p className="text-xs lg:text-sm text-gray-600">
          Welcome to your personalized dashboard
        </p>
      </div>
    </div>
  );
};

export default UserDashboard;
