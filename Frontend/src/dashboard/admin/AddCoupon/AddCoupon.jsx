import React, { useState } from "react";
import axios from "axios";

const AddCoupon = () => {
  const [couponData, setCouponData] = useState({
    code: "",
    discountPercentage: "",
    expiryDate: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCouponData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!couponData.code.trim()) newErrors.code = "Coupon code is required.";
    if (!couponData.discountPercentage || couponData.discountPercentage <= 0)
      newErrors.discountPercentage = "Discount must be greater than 0.";
    if (!couponData.expiryDate) newErrors.expiryDate = "Expiry date is required.";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    setErrors({});
    setLoading(true);
    setMessage("");

    try {
      const response = await axios.post("http://localhost:4000/api/coupon/add", couponData);
      setMessage(response.data.message || "Coupon added successfully!");
      setCouponData({ code: "", discountPercentage: "", expiryDate: "" });
    } catch (err) {
      console.error("Failed to add coupon:", err);
      setMessage(err.response?.data?.message || "Failed to create coupon.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Header */}
        <div className="backdrop-blur-xl bg-white/20 border border-white/30 rounded-2xl p-6 shadow-xl">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Add New Coupon
          </h2>
          <p className="text-gray-600 mt-2">Create promotional discount coupons for customers</p>
        </div>

        {/* Coupon Form */}
        <div className="backdrop-blur-xl bg-white/20 border border-white/30 rounded-2xl p-8 shadow-xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="code" className="block text-sm font-semibold text-gray-700 mb-2">
                  Coupon Code
                </label>
                <input
                  type="text"
                  id="code"
                  name="code"
                  value={couponData.code}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 backdrop-blur-sm bg-white/70 border ${errors.code ? 'border-red-400/70' : 'border-gray-200/50'} rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm transition-all duration-200 uppercase font-mono`}
                  placeholder="E.g., SUMMER25"
                />
                {errors.code && (
                  <p className="text-red-600 text-xs mt-2 flex items-center">
                    <i className="ri-error-warning-line mr-1"></i>
                    {errors.code}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="discountPercentage" className="block text-sm font-semibold text-gray-700 mb-2">
                  Discount Percentage (%)
                </label>
                <input
                  type="number"
                  id="discountPercentage"
                  name="discountPercentage"
                  value={couponData.discountPercentage}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 backdrop-blur-sm bg-white/70 border ${errors.discountPercentage ? 'border-red-400/70' : 'border-gray-200/50'} rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm font-numeric transition-all duration-200`}
                  placeholder="Enter discount percentage"
                  min="1"
                  max="100"
                />
                {errors.discountPercentage && (
                  <p className="text-red-600 text-xs mt-2 flex items-center">
                    <i className="ri-error-warning-line mr-1"></i>
                    {errors.discountPercentage}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="expiryDate" className="block text-sm font-semibold text-gray-700 mb-2">
                Expiry Date & Time
              </label>
              <input
                type="datetime-local"
                id="expiryDate"
                name="expiryDate"
                value={couponData.expiryDate}
                onChange={handleChange}
                className={`w-full px-4 py-3 backdrop-blur-sm bg-white/70 border ${errors.expiryDate ? 'border-red-400/70' : 'border-gray-200/50'} rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm transition-all duration-200`}
              />
              {errors.expiryDate && (
                <p className="text-red-600 text-xs mt-2 flex items-center">
                  <i className="ri-error-warning-line mr-1"></i>
                  {errors.expiryDate}
                </p>
              )}
            </div>

            <div className="flex justify-end pt-4">
              <button
                type="submit"
                className="px-8 py-3 text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl hover:from-purple-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg"
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Adding Coupon...
                  </div>
                ) : (
                  "Add Coupon"
                )}
              </button>
            </div>
          </form>

          {message && (
            <div className={`mt-6 p-4 backdrop-blur-sm border rounded-xl ${message.includes("Failed") ? "bg-red-50/80 border-red-200/50" : "bg-green-50/80 border-green-200/50"}`}>
              <div className="flex items-center">
                <i className={`text-lg mr-2 ${message.includes("Failed") ? "ri-error-warning-line text-red-500" : "ri-check-line text-green-500"}`}></i>
                <p className={`text-sm font-medium ${message.includes("Failed") ? "text-red-700" : "text-green-700"}`}>
                  {message}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddCoupon;
