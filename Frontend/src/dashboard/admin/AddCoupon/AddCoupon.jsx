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
    <div className="add-coupon-admin">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Add New Coupon</h2>
      <form onSubmit={handleSubmit} className="space-y-6 max-w-lg">
        <div>
          <label htmlFor="code" className="block text-sm font-medium text-gray-700">Coupon Code</label>
          <input
            type="text"
            id="code"
            name="code"
            value={couponData.code}
            onChange={handleChange}
            className={`mt-1 block w-full px-3 py-2 bg-white border ${errors.code ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm`}
            placeholder="E.g., SUMMER25"
          />
          {errors.code && <p className="text-red-500 text-xs mt-1">{errors.code}</p>}
        </div>

        <div>
          <label htmlFor="discountPercentage" className="block text-sm font-medium text-gray-700">Discount (%)</label>
          <input
            type="number"
            id="discountPercentage"
            name="discountPercentage"
            value={couponData.discountPercentage}
            onChange={handleChange}
            className={`mt-1 block w-full px-3 py-2 bg-white border ${errors.discountPercentage ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm`}
            placeholder="Enter discount percentage"
          />
          {errors.discountPercentage && <p className="text-red-500 text-xs mt-1">{errors.discountPercentage}</p>}
        </div>

        <div>
          <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700">Expiry Date</label>
          <input
            type="datetime-local"
            id="expiryDate"
            name="expiryDate"
            value={couponData.expiryDate}
            onChange={handleChange}
            className={`mt-1 block w-full px-3 py-2 bg-white border ${errors.expiryDate ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm`}
          />
          {errors.expiryDate && <p className="text-red-500 text-xs mt-1">{errors.expiryDate}</p>}
        </div>

        <div className="flex justify-end">
            <button
            type="submit"
            className="inline-flex justify-center py-2 px-6 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-dark"
            disabled={loading}
            >
            {loading ? "Adding..." : "Add Coupon"}
            </button>
        </div>
      </form>

      {message && (
        <p className={`mt-4 text-sm ${message.includes("Failed") ? "text-red-600" : "text-green-600"}`}>
          {message}
        </p>
      )}
    </div>
  );
};

export default AddCoupon;
