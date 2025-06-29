import { useState } from "react";
import PropTypes from "prop-types";
import { useValidateCouponMutation } from "./../../redux/features/coupon/couponApi";

const Coupon = ({ onApplyDiscount }) => {
  const [couponCode, setCouponCode] = useState("");
  const [validateCoupon] = useValidateCouponMutation();
  const [message, setMessage] = useState("");

  const handleApplyCoupon = async () => {
    try {
      const response = await validateCoupon(couponCode).unwrap();
      onApplyDiscount(response.discountPercentage);
      setMessage(`Coupon applied! ${response.discountPercentage}% discount.`);
    } catch (err) {
      setMessage("Invalid or expired coupon code.");
      console.error(err);
    }
  };

  return (
    <div className="bg-white rounded-lg p-4 border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
        <i className="ri-discount-percent-line text-orange-500"></i>
        Apply Coupon
      </h3>
      <div className="flex gap-3">
        <div className="flex-1 relative">
          <input
            type="text"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
            placeholder="Enter coupon code"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 text-gray-900 placeholder-gray-500"
          />
          <i className="ri-coupon-3-line absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
        </div>
        <button
          onClick={handleApplyCoupon}
          className="px-6 py-3 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-semibold rounded-lg transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 flex items-center gap-2"
        >
          <i className="ri-check-line"></i>
          <span className="hidden sm:inline">Apply</span>
        </button>
      </div>
      {message && (
        <div className={`mt-3 p-3 rounded-lg flex items-center gap-2 ${
          message.includes('applied') || message.includes('discount')
            ? 'bg-green-50 text-green-700 border border-green-200'
            : 'bg-red-50 text-red-700 border border-red-200'
        }`}>
          <i className={`${
            message.includes('applied') || message.includes('discount')
              ? 'ri-check-circle-line text-green-500'
              : 'ri-error-warning-line text-red-500'
          }`}></i>
          <p className="font-medium">{message}</p>
        </div>
      )}
    </div>
  );
};

Coupon.propTypes = {
  onApplyDiscount: PropTypes.func.isRequired,
};

export default Coupon;

