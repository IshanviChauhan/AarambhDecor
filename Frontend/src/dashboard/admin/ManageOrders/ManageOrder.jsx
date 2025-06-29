import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  useDeleteOrderMutation,
  useGetAllOrdersQuery,
} from "../../../redux/features/order/orderApi";
import { formatDate } from "../../../utils/dataFormer";
import UpdateOrderModal from "./UpdateOrder";

const getStatusColor = (status) => {
  switch (status) {
    case "pending":
      return "bg-yellow-100 text-yellow-800";
    case "processing":
      return "bg-blue-100 text-blue-800";
    case "shipped":
      return "bg-green-100 text-green-800";
    case "completed":
      return "bg-gray-100 text-gray-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const ManageOrders = () => {
  // Real-time data fetching with polling every 30 seconds
  const { data, error, isLoading, refetch, isFetching } = useGetAllOrdersQuery(undefined, {
    pollingInterval: 30000, // Poll every 30 seconds for real-time updates
    refetchOnFocus: true, // Refetch when window regains focus
    refetchOnReconnect: true, // Refetch when network reconnects
  });
  const orders = data?.orders || [];

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [lastFetchTime, setLastFetchTime] = useState(new Date());
  const [showUpdateNotification, setShowUpdateNotification] = useState(false);
  const [statusFilter, setStatusFilter] = useState('all');
  const [deleteOrder, { isLoading: isDeleting }] = useDeleteOrderMutation();

  // Filter orders based on status
  const filteredOrders = statusFilter === 'all' 
    ? orders 
    : orders.filter(order => order.status === statusFilter);

  // Update last fetch time when data changes and show notification
  useState(() => {
    if (data) {
      const now = new Date();
      const timeDiff = now - lastFetchTime;
      
      // Show notification if data updated and it's not the initial load (more than 5 seconds since last update)
      if (timeDiff > 5000) {
        setShowUpdateNotification(true);
        setTimeout(() => setShowUpdateNotification(false), 3000); // Hide after 3 seconds
      }
      
      setLastFetchTime(now);
    }
  }, [data]);

  const handleManualRefresh = async () => {
    try {
      await refetch();
      setLastFetchTime(new Date());
    } catch (error) {
      console.error("Failed to refresh orders:", error);
    }
  };

  const handleEditClick = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
  };

  const handleDeleteClick = async (orderId) => {
    if (window.confirm("Are you sure you want to delete this order?")) {
      try {
        await deleteOrder(orderId).unwrap();
        refetch();
      } catch (err) {
        console.error("Failed to delete order:", err);
        alert("Failed to delete order.");
      }
    }
  };

  if (isLoading && !data) return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      <div className="backdrop-blur-xl bg-white/20 border border-white/30 rounded-2xl p-8 shadow-xl">
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
          <span className="ml-3 text-gray-700 font-medium">Loading orders...</span>
        </div>
      </div>
    </div>
  );
  
  if (error) return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      <div className="backdrop-blur-xl bg-red-50/80 border border-red-200/50 rounded-2xl p-8 shadow-xl">
        <div className="text-center">
          <i className="ri-error-warning-line text-4xl text-red-500 mb-4"></i>
          <h3 className="text-lg font-semibold text-red-800 mb-2">Error Loading Orders</h3>
          <p className="text-red-600">Unable to fetch orders. Please try again later.</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Real-time Update Notification */}
        {showUpdateNotification && (
          <div className="fixed top-4 right-4 z-50 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 transform transition-all duration-300 animate-pulse">
            <i className="ri-refresh-line animate-spin"></i>
            <span>Orders updated automatically!</span>
          </div>
        )}

        {/* Header */}
        <div className="backdrop-blur-xl bg-white/20 border border-white/30 rounded-2xl p-6 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Manage Orders
              </h2>
              <p className="text-gray-600 mt-2">View and manage all customer orders</p>
              <div className="flex items-center gap-4 mt-3">
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <div className={`w-2 h-2 rounded-full ${isFetching ? 'bg-blue-500 animate-pulse' : 'bg-green-500'}`}></div>
                  <span>{isFetching ? 'Updating...' : 'Live'}</span>
                </div>
                <div className="text-xs text-gray-500">
                  Last updated: {lastFetchTime.toLocaleTimeString()}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
                <div className="bg-white/50 backdrop-blur-sm border border-white/30 rounded-lg px-3 py-2 text-center">
                  <div className="font-semibold text-gray-700">Total Orders</div>
                  <div className="font-bold text-purple-600">{orders.length}</div>
                </div>
                <div className="bg-white/50 backdrop-blur-sm border border-white/30 rounded-lg px-3 py-2 text-center">
                  <div className="font-semibold text-gray-700">Pending</div>
                  <div className="font-bold text-yellow-600">{orders.filter(o => o.status === 'pending').length}</div>
                </div>
                <div className="bg-white/50 backdrop-blur-sm border border-white/30 rounded-lg px-3 py-2 text-center">
                  <div className="font-semibold text-gray-700">Processing</div>
                  <div className="font-bold text-blue-600">{orders.filter(o => o.status === 'processing').length}</div>
                </div>
              </div>
              <button 
                onClick={handleManualRefresh}
                disabled={isFetching}
                className={`flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-200 shadow-lg ${
                  isFetching ? 'opacity-75 cursor-not-allowed' : ''
                }`}
              >
                <i className={`ri-refresh-line ${isFetching ? 'animate-spin' : ''}`}></i>
                {isFetching ? 'Refreshing...' : 'Refresh'}
              </button>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="backdrop-blur-xl bg-white/20 border border-white/30 rounded-2xl p-4 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <h3 className="text-lg font-semibold text-gray-900">Filter Orders</h3>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setStatusFilter('all')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  statusFilter === 'all'
                    ? 'bg-purple-600 text-white shadow-lg'
                    : 'bg-white/50 text-gray-700 hover:bg-white/70'
                }`}
              >
                All ({orders.length})
              </button>
              <button
                onClick={() => setStatusFilter('pending')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  statusFilter === 'pending'
                    ? 'bg-yellow-600 text-white shadow-lg'
                    : 'bg-white/50 text-gray-700 hover:bg-white/70'
                }`}
              >
                Pending ({orders.filter(o => o.status === 'pending').length})
              </button>
              <button
                onClick={() => setStatusFilter('processing')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  statusFilter === 'processing'
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-white/50 text-gray-700 hover:bg-white/70'
                }`}
              >
                Processing ({orders.filter(o => o.status === 'processing').length})
              </button>
              <button
                onClick={() => setStatusFilter('shipped')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  statusFilter === 'shipped'
                    ? 'bg-green-600 text-white shadow-lg'
                    : 'bg-white/50 text-gray-700 hover:bg-white/70'
                }`}
              >
                Shipped ({orders.filter(o => o.status === 'shipped').length})
              </button>
              <button
                onClick={() => setStatusFilter('completed')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  statusFilter === 'completed'
                    ? 'bg-gray-600 text-white shadow-lg'
                    : 'bg-white/50 text-gray-700 hover:bg-white/70'
                }`}
              >
                Completed ({orders.filter(o => o.status === 'completed').length})
              </button>
            </div>
          </div>
        </div>

        {/* Orders Table */}
        <div className="backdrop-blur-xl bg-white/20 border border-white/30 rounded-2xl shadow-xl overflow-hidden">
          {filteredOrders.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-20 h-20 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                <i className="ri-shopping-bag-line text-3xl text-gray-400"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {statusFilter === 'all' ? 'No Orders Found' : `No ${statusFilter} Orders`}
              </h3>
              <p className="text-gray-600">
                {statusFilter === 'all' 
                  ? 'No customer orders have been placed yet.' 
                  : `No orders with status "${statusFilter}" found.`
                }
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="backdrop-blur-sm bg-purple-100/50 border-b border-white/20">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Order Details
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Customer
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Payment
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="backdrop-blur-sm bg-white/10 divide-y divide-white/20">
                  {filteredOrders.map((order) => (
                    <tr key={order._id} className="hover:bg-white/20 transition-all duration-200">
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className="text-sm font-mono font-numeric text-purple-700 bg-purple-50/50 px-2 py-1 rounded-lg">
                            #{order._id.slice(-8).toUpperCase()}
                          </span>
                          <span className="text-xs text-gray-600 mt-1">
                            {order.products?.length || 0} {order.products?.length === 1 ? 'item' : 'items'}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className="text-sm font-medium text-gray-900">{order?.email}</span>
                          <span className="text-xs text-gray-600">Customer</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className="text-sm font-bold text-green-700">Rs. {Number(order.amount).toFixed(2)}</span>
                          <span className="text-xs text-gray-600">Total</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span
                          className={`px-3 py-2 inline-flex text-xs leading-5 font-semibold rounded-full backdrop-blur-sm border ${getStatusColor(
                            order.status
                          )}`}
                        >
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className={`text-sm font-medium ${order.paymentMethod === 'COD' ? 'text-orange-600' : 'text-green-600'}`}>
                            {order.paymentMethod}
                          </span>
                          <span className="text-xs text-gray-600">
                            {order.paymentMethod === 'COD' ? 'Cash on Delivery' : 'UPI Payment'}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className="text-sm text-gray-900 font-numeric">{formatDate(order?.createdAt)}</span>
                          <span className="text-xs text-gray-600">Created</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                        <div className="flex justify-center space-x-2">
                          <Link
                            to={`/dashboard/orders/${order._id}`}
                            className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-100/50 rounded-lg transition-all duration-200 backdrop-blur-sm border border-blue-200/30"
                            title="View Order Details"
                          >
                            <i className="ri-eye-line text-lg"></i>
                          </Link>
                          <button
                            onClick={() => handleEditClick(order)}
                            className="p-2 text-indigo-600 hover:text-indigo-800 hover:bg-indigo-100/50 rounded-lg transition-all duration-200 backdrop-blur-sm border border-indigo-200/30"
                            title="Update Order Status"
                          >
                            <i className="ri-edit-2-line text-lg"></i>
                          </button>
                          <button
                            onClick={() => handleDeleteClick(order._id)}
                            disabled={isDeleting}
                            className="p-2 text-red-600 hover:text-red-800 hover:bg-red-100/50 rounded-lg transition-all duration-200 backdrop-blur-sm border border-red-200/30 disabled:opacity-50"
                            title="Delete Order"
                          >
                            <i className="ri-delete-bin-6-line text-lg"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {selectedOrder && (
          <UpdateOrderModal
            order={selectedOrder}
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            onUpdated={refetch}
          />
        )}
      </div>
    </div>
  );
};

export default ManageOrders;
