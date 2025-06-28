import React from 'react';
import { useDispatch } from 'react-redux';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useLogoutUserMutation } from '../../src/redux/features/auth/authApi';
import { logout } from '../../src/redux/features/auth/authSlice';

const navLinks = [
  { to: '/dashboard/admin', icon: 'ri-dashboard-line', text: 'Dashboard' },
  { to: '/dashboard/add-new-post', icon: 'ri-add-box-line', text: 'Add Product' },
  { to: '/dashboard/manage-products', icon: 'ri-list-check-2', text: 'Manage Products' },
  { to: '/dashboard/users', icon: 'ri-group-line', text: 'Users' },
  { to: '/dashboard/manage-orders', icon: 'ri-shopping-cart-line', text: 'Manage Orders' },
  { to: '/dashboard/add-coupon', icon: 'ri-coupon-3-line', text: 'Add Coupon' },
  { to: '/dashboard/deals-banners', icon: 'ri-price-tag-3-line', text: 'Deals & Banners' },
];

const AdminDashboard = () => {
  const [logoutUser] = useLogoutUserMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logoutUser().unwrap();
      dispatch(logout());
      navigate('/');
    } catch (err) {
      console.error("Failed to logout:", err);
    }
  };

  return (
    <div className="bg-gray-50 text-gray-800 p-4 md:h-screen flex flex-col justify-between rounded-lg shadow-sm">
      <div>
        <div className="flex items-center gap-3 p-2 mb-6">
          <Link to="/" className="nav__logo text-2xl">
            Aarambh Decor<span className="text-primary">.</span>
          </Link>
        </div>
        <ul className="space-y-2">
          {navLinks.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                end
                className={({ isActive }) =>
                  `flex items-center gap-3 p-3 rounded-lg transition-colors duration-200 ${
                    isActive ? 'bg-primary-light text-primary-dark font-semibold' : 'hover:bg-gray-200'
                  }`
                }
              >
                <i className={`${link.icon} text-xl`}></i>
                <span>{link.text}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-6 border-t pt-4">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full p-3 rounded-lg text-red-500 hover:bg-red-100 transition-colors duration-200"
        >
          <i className="ri-logout-box-r-line text-xl"></i>
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default AdminDashboard;
