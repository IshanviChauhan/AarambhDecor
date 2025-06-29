import { useState } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux"; // Import to access logged-in user data
import { useNavigate } from "react-router-dom";
import QRCode from "react-qr-code";
import Coupon from "./Coupon";
import {
  useFetchCartQuery,
  useClearCartMutation,
} from "../../redux/features/cart/cartApi";
import { getBaseUrl } from "../../../../Frontend/src/utils/baseURL";

const OrderSummary = ({ userId }) => { // Pass userId as a prop
  const navigate = useNavigate();
  const [discount, setDiscount] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState(null);

  // Fetch logged-in user details
  const { user } = useSelector((state) => state.auth); // Replace 'auth' with your slice name
  const userEmail = user?.email; // Get the logged-in user's email

  // Fetch cart data using RTK Query
  const { data: products = [], isLoading, isError } = useFetchCartQuery(userId);

  // Mutation hooks
  const [clearCart] = useClearCartMutation();

  // UPI Payment Details
  const upiId = "6306643695@pthdfc"; // Replace with your UPI ID
  const upiName = "Kshitiz Maurya"; // Replace with your UPI Name

  // Calculate selected items
  const selectedItems = products.reduce((acc, product) => acc + product.quantity, 0);

  // Calculate totals
  const totalPrice = products.reduce(
    (acc, product) => acc + product.price * product.quantity,
    0
  );
  const discountAmount = (totalPrice * discount) / 100;
  const tax = (totalPrice - discountAmount) * 0.1; // Assuming taxRate is 10%
  const grandTotal = totalPrice - discountAmount + tax;

  // Apply Discount Handler
  const handleApplyDiscount = (discountPercentage) => {
    setDiscount(discountPercentage);
  };

  // Clear Cart Handler using RTK Query
  const handleClearCart = async () => {
    try {
      await clearCart(userId).unwrap();
    } catch (error) {
      console.error("Failed to clear cart:", error);
      alert("Failed to clear cart. Please try again.");
    }
  };

  // Place Order Handler
  const handlePlaceOrder = async () => {
    if (!paymentMethod) {
      alert("Please select a payment method.");
      return;
    }

    if (!userEmail) {
      alert("You must be logged in to place an order.");
      return;
    }

    const orderData = {
      products: products.map((product) => ({
        productId: product._id,
        quantity: product.quantity,
      })),
      amount: grandTotal.toFixed(2),
      email: userEmail, // Use the logged-in user's email
      paymentMethod,
    };

    try {
      const response = await fetch(`${getBaseUrl()}/api/orders/create-order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      const data = await response.json();
      if (response.ok) {
        // Clear the cart after successful order placement
        try {
          await clearCart(userId).unwrap();
          console.log("Cart cleared successfully after order placement");
        } catch (clearCartError) {
          console.error("Failed to clear cart after order placement:", clearCartError);
          // Don't show error to user as order was successful
        }
        
        if (paymentMethod === "COD") {
          navigate("/thanks"); // Redirect to COD Success Page
        } else if (paymentMethod === "UPI") {
          navigate(`/payment-success?session_id=${data.order._id}`); // Redirect to Payment Success Page
        }
      } else {
        console.error("Error:", data.error);
        alert("Failed to place the order. Please try again.");
      }
    } catch (error) {
      console.error("Error placing order:", error);
      alert("An error occurred while placing the order.");
    }
  };

  if (isLoading) return (
    <div className="mt-8 bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
      <div className="flex items-center justify-center py-8">
        <div className="text-center">
          <div className="w-8 h-8 border-3 border-gray-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-3"></div>
          <p className="text-gray-600">Loading order summary...</p>
        </div>
      </div>
    </div>
  );
  
  if (isError) return (
    <div className="mt-8 bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
      <div className="text-center py-8">
        <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
          <i className="ri-error-warning-line text-xl text-red-600"></i>
        </div>
        <p className="text-red-600 font-medium">Error loading order data</p>
      </div>
    </div>
  );

  return (
    <div className="mt-8 bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
      {/* Order Summary Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4">
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <i className="ri-file-list-3-line"></i>
          Order Summary
        </h1>
      </div>

      {/* Order Details */}
      <div className="px-6 py-6 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
            <p className="text-sm text-blue-600 font-medium mb-1">Selected Items</p>
            <p className="text-2xl font-bold text-blue-900">{selectedItems}</p>
          </div>
          <div className="bg-green-50 rounded-lg p-4 border border-green-200">
            <p className="text-sm text-green-600 font-medium mb-1">Total Value</p>
            <p className="text-2xl font-bold text-green-900">Rs. {totalPrice.toFixed(2)}</p>
          </div>
        </div>

        {/* Price Breakdown */}
        <div className="bg-gray-50 rounded-lg p-4 space-y-3">
          <div className="flex justify-between items-center text-gray-700">
            <span>Subtotal</span>
            <span className="font-semibold">Rs. {totalPrice.toFixed(2)}</span>
          </div>
          {discount > 0 && (
            <div className="flex justify-between items-center text-green-600">
              <span className="flex items-center gap-1">
                <i className="ri-discount-percent-line"></i>
                Discount ({discount}%)
              </span>
              <span className="font-semibold">-Rs. {discountAmount.toFixed(2)}</span>
            </div>
          )}
          <div className="flex justify-between items-center text-gray-700">
            <span className="flex items-center gap-1">
              <i className="ri-tax-line"></i>
              Tax (10%)
            </span>
            <span className="font-semibold">Rs. {tax.toFixed(2)}</span>
          </div>
          <div className="border-t border-gray-300 pt-3">
            <div className="flex justify-between items-center">
              <span className="text-lg font-bold text-gray-900">Grand Total</span>
              <span className="text-2xl font-bold text-blue-600">Rs. {grandTotal.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 pb-6 space-y-6">
        {/* Clear Cart Button */}
        <button
          onClick={handleClearCart}
          className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
        >
          <i className="ri-delete-bin-7-line"></i>
          Clear Cart
        </button>

        {/* Coupon Component */}
        <Coupon onApplyDiscount={handleApplyDiscount} />

        {/* Payment Method Selection */}
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <i className="ri-bank-card-line"></i>
            Payment Method
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              onClick={() => setPaymentMethod("COD")}
              className={`p-4 rounded-lg border-2 transition-all duration-200 text-left ${
                paymentMethod === "COD" 
                  ? "border-blue-500 bg-blue-50 ring-2 ring-blue-200" 
                  : "border-gray-200 hover:border-blue-300 hover:bg-gray-50"
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-4 h-4 rounded-full border-2 ${
                  paymentMethod === "COD" ? "border-blue-500 bg-blue-500" : "border-gray-300"
                }`}>
                  {paymentMethod === "COD" && <div className="w-2 h-2 bg-white rounded-full m-auto mt-0.5"></div>}
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Cash on Delivery</p>
                  <p className="text-sm text-gray-600">Pay when you receive</p>
                </div>
              </div>
            </button>
            
            <button
              onClick={() => setPaymentMethod("UPI")}
              className={`p-4 rounded-lg border-2 transition-all duration-200 text-left ${
                paymentMethod === "UPI" 
                  ? "border-green-500 bg-green-50 ring-2 ring-green-200" 
                  : "border-gray-200 hover:border-green-300 hover:bg-gray-50"
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-4 h-4 rounded-full border-2 ${
                  paymentMethod === "UPI" ? "border-green-500 bg-green-500" : "border-gray-300"
                }`}>
                  {paymentMethod === "UPI" && <div className="w-2 h-2 bg-white rounded-full m-auto mt-0.5"></div>}
                </div>
                <div>
                  <p className="font-semibold text-gray-900">UPI Payment</p>
                  <p className="text-sm text-gray-600">Instant & secure</p>
                </div>
              </div>
            </button>
          </div>
        </div>

        {/* UPI Payment Section */}
        {paymentMethod === "UPI" && (
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-6 border border-green-200">
            <h3 className="text-xl font-bold text-green-800 mb-4 flex items-center gap-2">
              <i className="ri-qr-code-line"></i>
              Scan QR Code to Pay
            </h3>
            <div className="flex flex-col items-center">
              <div className="bg-white p-4 rounded-lg shadow-md mb-4">
                <QRCode
                  value={`upi://pay?pa=${encodeURIComponent(
                    upiId
                  )}&pn=${encodeURIComponent(
                    upiName
                  )}&am=${grandTotal.toFixed(2)}&cu=INR&tn=${encodeURIComponent(
                    "Order Payment"
                  )}`}
                  size={200}
                />
              </div>
              <div className="text-center space-y-2 mb-4">
                <div className="bg-white rounded-lg p-3 border border-green-200">
                  <p className="text-sm text-gray-600">UPI ID</p>
                  <p className="font-mono font-semibold text-green-700">{upiId}</p>
                </div>
                <div className="bg-white rounded-lg p-3 border border-green-200">
                  <p className="text-sm text-gray-600">Amount to Pay</p>
                  <p className="text-2xl font-bold text-green-800">Rs. {grandTotal.toFixed(2)}</p>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* COD Payment Section */}
        {paymentMethod === "COD" && (
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg p-6 border border-blue-200">
            <div className="text-center mb-4">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <i className="ri-truck-line text-2xl text-blue-600"></i>
              </div>
              <h3 className="text-xl font-bold text-blue-800 mb-2">Cash on Delivery</h3>
              <p className="text-blue-600">Pay when your order arrives at your doorstep</p>
            </div>
            <button
              onClick={handlePlaceOrder}
              className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              <i className="ri-shopping-bag-line"></i>
              Place Order
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

OrderSummary.propTypes = {
  userId: PropTypes.string.isRequired,
};

export default OrderSummary;
