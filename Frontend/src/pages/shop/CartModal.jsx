import React from "react";
import { useSelector } from "react-redux"; // Import useSelector
import PropTypes from "prop-types";
import OrderSummary from "./OrderSummary";
import {
  useRemoveItemFromCartMutation,
  useUpdateCartItemMutation,
  useFetchCartQuery,
} from "../../redux/features/cart/cartApi";
import { getBaseUrl } from "./../../utils/baseURL";

const CartModal = ({ isOpen, onClose }) => {
  // Fetch user ID from Redux store or localStorage
  const userId = useSelector((state) => state.auth?.user?._id) || localStorage.getItem("userId");

  console.log("CartModal received userId:", userId); // Debugging log

  // Fetch cart data using Redux RTK Query
  const { data: products = [], isLoading, isError } = useFetchCartQuery(userId, {
    skip: !userId, // Skip the query if userId is not available
  });
  const [removeItemFromCart] = useRemoveItemFromCartMutation();
  const [updateCartItem] = useUpdateCartItemMutation();

  const handleQuantity = async (type, id) => {
    await updateCartItem({ id, type });
  };

  const handleRemove = async (e, id) => {
    e.preventDefault();
    await removeItemFromCart(id);
  };

  // If userId is missing, show error state
  if (!userId) {
    return (
      <div
        className={`fixed z-[1000] inset-0 backdrop-blur-sm bg-black/40 transition-all duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className={`fixed right-0 top-0 md:w-1/3 w-full bg-white h-full flex items-center justify-center transition-transform duration-300 ease-out ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="text-center p-6">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="ri-user-line text-2xl text-red-600"></i>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Please Sign In</h3>
            <p className="text-gray-600 mb-4">You need to be logged in to view your cart.</p>
            <button 
              onClick={onClose}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (isLoading) return (
    <div className="fixed z-[1000] inset-0 backdrop-blur-sm bg-black/40">
      <div className="fixed right-0 top-0 md:w-1/3 w-full bg-white h-full flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your cart...</p>
        </div>
      </div>
    </div>
  );
  
  if (isError) return (
    <div className="fixed z-[1000] inset-0 backdrop-blur-sm bg-black/40">
      <div className="fixed right-0 top-0 md:w-1/3 w-full bg-white h-full flex items-center justify-center">
        <div className="text-center p-6">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <i className="ri-error-warning-line text-2xl text-red-600"></i>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Error Loading Cart</h3>
          <p className="text-gray-600 mb-4">Unable to load your cart items. Please try again.</p>
          <button 
            onClick={onClose}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div
      className={`fixed z-[1000] inset-0 backdrop-blur-sm bg-black/40 transition-all duration-300 ${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div
        className={`fixed right-0 top-0 md:w-1/3 w-full bg-gradient-to-br from-white via-gray-50 to-gray-100 h-full overflow-y-auto shadow-2xl transition-transform duration-300 ease-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white/90 backdrop-blur-md border-b border-gray-200 p-6 z-10">
          <div className="flex justify-between items-center">
            <div>
              <h4 className="text-2xl font-bold text-gray-900">Shopping Cart</h4>
              <p className="text-sm text-gray-600 mt-1">{products.length} {products.length === 1 ? 'item' : 'items'}</p>
            </div>
            <button 
              onClick={onClose} 
              className="group relative p-2 rounded-full bg-gray-100 hover:bg-red-50 transition-all duration-200"
            >
              <i className="ri-close-line text-xl text-gray-600 group-hover:text-red-600 transition-colors"></i>
            </button>
          </div>
        </div>

        <div className="p-6">
          {products.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                <i className="ri-shopping-cart-line text-3xl text-gray-400"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Your cart is empty</h3>
              <p className="text-gray-600">Add some items to get started!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {products.map((item) => (
                <div key={item._id} className="group relative bg-white rounded-xl shadow-sm hover:shadow-md border border-gray-100 transition-all duration-200 overflow-hidden">
                  <div className="p-4">
                    <div className="flex items-start gap-4">
                      <div className="relative flex-shrink-0">
                        <img
                          src={
                            item.image
                              ? item.image.startsWith("http")
                                ? item.image
                                : `${getBaseUrl()}${item.image}`
                              : "/path/to/placeholder.jpg"
                          }
                          alt={item.name || "Product image"}
                          className="w-16 h-16 object-cover rounded-lg border border-gray-200"
                        />
                        {item.dealDiscount && (
                          <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                            -{item.dealDiscount}%
                          </div>
                        )}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <h5 className="font-semibold text-gray-900 truncate">{item.name}</h5>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="font-bold text-lg text-gray-900">Rs. {Number(item.price).toFixed(2)}</span>
                          {item.originalPrice && item.originalPrice > item.price && (
                            <span className="text-sm text-gray-500 line-through">Rs. {Number(item.originalPrice).toFixed(2)}</span>
                          )}
                        </div>
                        {item.dealTitle && (
                          <p className="text-xs text-green-600 mt-1 font-medium">{item.dealTitle}</p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center bg-gray-50 rounded-lg border border-gray-200">
                        <button 
                          onClick={() => handleQuantity("decrement", item._id)} 
                          className="p-2 hover:bg-gray-100 text-gray-600 hover:text-gray-900 transition-colors rounded-l-lg"
                          disabled={item.quantity <= 1}
                        >
                          <i className="ri-subtract-line text-sm"></i>
                        </button>
                        <span className="px-4 py-2 font-semibold text-gray-900 min-w-[3rem] text-center">{item.quantity}</span>
                        <button 
                          onClick={() => handleQuantity("increment", item._id)} 
                          className="p-2 hover:bg-gray-100 text-gray-600 hover:text-gray-900 transition-colors rounded-r-lg"
                        >
                          <i className="ri-add-line text-sm"></i>
                        </button>
                      </div>
                      
                      <button 
                        onClick={(e) => handleRemove(e, item._id)} 
                        className="group flex items-center gap-2 px-3 py-2 text-red-600 hover:text-white hover:bg-red-600 rounded-lg transition-all duration-200 text-sm font-medium"
                      >
                        <i className="ri-delete-bin-line text-sm"></i>
                        <span className="hidden sm:inline">Remove</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          {products.length > 0 && <OrderSummary userId={userId} />}
        </div>
      </div>
    </div>
  );
};

CartModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default CartModal;
