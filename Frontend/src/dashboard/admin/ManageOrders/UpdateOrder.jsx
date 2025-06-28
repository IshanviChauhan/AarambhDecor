import React, { useState } from "react";
import { useUpdateOrderStatusMutation } from "./../../../redux/features/order/orderApi";

const UpdateOrderModal = ({ order, onClose, isOpen, onUpdated }) => {
  if (!isOpen || !order) return null;

  const [status, setStatus] = useState(order.status);
  const [updateOrderStatus, { isLoading, error }] = useUpdateOrderStatusMutation();

  const handleUpdate = async () => {
    try {
      await updateOrderStatus({ id: order._id, status }).unwrap();
      onUpdated();
      onClose();
    } catch (err) {
      console.error("Failed to update order status:", err);
      alert("Failed to update status.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md mx-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">Update Order Status</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <i className="ri-close-line text-2xl"></i>
          </button>
        </div>

        <p className="text-sm text-gray-600 mb-4">
          Select a new status for order <span className="font-mono text-primary">{order._id}</span>.
        </p>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="status">
            Status
          </label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
            disabled={isLoading}
          >
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        {error && (
          <p className="text-red-500 text-sm mb-4">
            {error.data?.message || "Failed to update status. Please try again."}
          </p>
        )}

        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none"
          >
            Cancel
          </button>
          <button
            onClick={handleUpdate}
            disabled={isLoading}
            className="px-6 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary-dark focus:outline-none"
          >
            {isLoading ? "Updating..." : "Update"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateOrderModal;
