import { useState } from "react";
import PropTypes from "prop-types";
import { useUpdateOrderStatusMutation } from "./../../../redux/features/order/orderApi";

const UpdateOrderModal = ({ order, onClose, isOpen, onUpdated }) => {
  const [status, setStatus] = useState(order?.status || 'pending');
  const [updateOrderStatus, { isLoading, error }] = useUpdateOrderStatusMutation();

  if (!isOpen || !order) return null;

  const handleUpdate = async () => {
    try {
      await updateOrderStatus({ id: order._id, status }).unwrap();
      
      // Call onUpdated to refresh the parent component's data
      onUpdated();
      
      // Close the modal
      onClose();
      
      // Show success feedback
      console.log("Order status updated successfully");
    } catch (err) {
      console.error("Failed to update order status:", err);
      alert("Failed to update status. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="backdrop-blur-xl bg-white/90 border border-white/30 rounded-2xl shadow-2xl w-full max-w-md mx-4 p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Update Order Status
          </h2>
          <button 
            onClick={onClose} 
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100/50 rounded-lg transition-all duration-200"
          >
            <i className="ri-close-line text-2xl"></i>
          </button>
        </div>

        <div className="mb-6 p-4 backdrop-blur-sm bg-blue-50/50 border border-blue-200/30 rounded-xl">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-semibold text-gray-700">Order Information</p>
            <span className="text-xs text-gray-500">ID: {order._id.slice(-8).toUpperCase()}</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
            <div className="bg-white/70 p-3 rounded-lg">
              <p className="text-gray-600">Customer</p>
              <p className="font-semibold text-gray-900">{order.email}</p>
            </div>
            <div className="bg-white/70 p-3 rounded-lg">
              <p className="text-gray-600">Amount</p>
              <p className="font-semibold text-green-700">Rs. {Number(order.amount).toFixed(2)}</p>
            </div>
            <div className="bg-white/70 p-3 rounded-lg">
              <p className="text-gray-600">Payment Method</p>
              <p className="font-semibold text-gray-900">{order.paymentMethod}</p>
            </div>
            <div className="bg-white/70 p-3 rounded-lg">
              <p className="text-gray-600">Items</p>
              <p className="font-semibold text-gray-900">{order.products?.length || 0} items</p>
            </div>
          </div>
          <div className="mt-3 bg-white/70 p-3 rounded-lg">
            <p className="text-gray-600">Current Status</p>
            <span className={`inline-block px-3 py-1 mt-1 text-xs font-semibold rounded-full ${
              status === 'pending' ? 'bg-yellow-100 text-yellow-800 border border-yellow-200' :
              status === 'processing' ? 'bg-blue-100 text-blue-800 border border-blue-200' :
              status === 'shipped' ? 'bg-green-100 text-green-800 border border-green-200' :
              'bg-gray-100 text-gray-800 border border-gray-200'
            }`}>
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </span>
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-3" htmlFor="status">
            <i className="ri-refresh-line mr-2"></i>
            Update Order Status
          </label>
          <div className="grid grid-cols-1 gap-3">
            <select
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="block w-full px-4 py-3 backdrop-blur-sm bg-white/70 border border-gray-200/50 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm font-medium transition-all duration-200"
              disabled={isLoading}
            >
              <option value="pending">🟡 Pending - Order received, awaiting processing</option>
              <option value="processing">🔵 Processing - Order is being prepared</option>
              <option value="shipped">🟢 Shipped - Order has been dispatched</option>
              <option value="completed">⚫ Completed - Order delivered successfully</option>
            </select>
            <div className="text-xs text-gray-600 bg-gray-50/70 p-3 rounded-lg">
              <p className="font-medium mb-1">Status Description:</p>
              <p>
                {status === 'pending' && 'Order has been placed and payment confirmed. Awaiting processing.'}
                {status === 'processing' && 'Order is being prepared and packaged for shipment.'}
                {status === 'shipped' && 'Order has been dispatched and is on its way to the customer.'}
                {status === 'completed' && 'Order has been successfully delivered to the customer.'}
              </p>
            </div>
          </div>
        </div>

        {error && (
          <div className="mb-6 p-4 backdrop-blur-sm bg-red-50/80 border border-red-200/50 rounded-xl">
            <div className="flex items-center">
              <i className="ri-error-warning-line text-red-500 text-lg mr-2"></i>
              <p className="text-red-700 text-sm">
                {error.data?.message || "Failed to update status. Please try again."}
              </p>
            </div>
          </div>
        )}

        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-6 py-3 text-sm font-medium text-gray-700 backdrop-blur-sm bg-gray-100/70 border border-gray-200/50 rounded-xl hover:bg-gray-200/70 focus:outline-none focus:ring-2 focus:ring-gray-400 transition-all duration-200"
          >
            Cancel
          </button>
          <button
            onClick={handleUpdate}
            disabled={isLoading}
            className="px-8 py-3 text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl hover:from-purple-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg"
          >
            {isLoading ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Updating...
              </div>
            ) : (
              "Update Status"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

UpdateOrderModal.propTypes = {
  order: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    amount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    paymentMethod: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    products: PropTypes.array,
  }),
  onClose: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onUpdated: PropTypes.func.isRequired,
};

export default UpdateOrderModal;
