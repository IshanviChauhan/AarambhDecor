import { useSelector } from "react-redux";
import { useGetOrdersByEmailQuery } from "./../../redux/features/order/orderApi";
import { Link } from "react-router-dom";

const UserOrders = () => {
    const { user } = useSelector((state) => state.auth);
    const { data: orders, error, isLoading } = useGetOrdersByEmailQuery(user?.email);
  
    if (!user?.email) {
      return (
        <div className="p-4 sm:p-6">
          <div className="bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl shadow-xl p-8 text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h3 className="text-lg font-heading font-semibold text-gray-900 mb-2">Authentication Required</h3>
            <p className="text-gray-600 font-body">Please log in to view your orders</p>
          </div>
        </div>
      );
    }
  
    if (isLoading) {
      return (
        <div className="p-4 sm:p-6">
          <div className="bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl shadow-xl p-8 text-center">
            <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-gray-700 font-body">Loading your orders...</p>
          </div>
        </div>
      );
    }

    if (error) {
      return (
        <div className="p-4 sm:p-6">
          <div className="bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl shadow-xl p-8 text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-heading font-semibold text-gray-900 mb-2">Error Loading Orders</h3>
            <p className="text-gray-600 font-body">Failed to load orders. Please try again later.</p>
          </div>
        </div>
      );
    }
  
    if (!orders || orders.length === 0) {
      return (
        <div className="p-4 sm:p-6">
          <div className="mb-6">
            <h1 className="text-2xl sm:text-3xl font-heading font-bold text-gray-900 mb-2">Your Orders</h1>
            <p className="text-gray-600 font-body">Track and manage your purchase history</p>
          </div>
          
          <div className="bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl shadow-xl p-8 text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <h3 className="text-lg font-heading font-semibold text-gray-900 mb-2">No Orders Yet</h3>
            <p className="text-gray-600 font-body mb-6">Start shopping to place your first order!</p>
            <Link 
              to="/shop"
              className="inline-flex items-center space-x-2 bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-xl font-body font-medium transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <span>Start Shopping</span>
            </Link>
          </div>
        </div>
      );
    }

    const getStatusColor = (status) => {
      switch (status) {
        case "completed":
          return "bg-green-100 text-green-700 border-green-200";
        case "pending":
          return "bg-red-100 text-red-700 border-red-200";
        case "processing":
          return "bg-yellow-100 text-yellow-700 border-yellow-200";
        case "shipped":
          return "bg-blue-100 text-blue-700 border-blue-200";
        default:
          return "bg-gray-100 text-gray-700 border-gray-200";
      }
    };

  return (
    <div className="p-4 sm:p-6">
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-heading font-bold text-gray-900 mb-2">Your Orders</h1>
        <p className="text-gray-600 font-body">Track and manage your purchase history</p>
      </div>

      <div className="bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl shadow-xl overflow-hidden">
        {/* Mobile view - Card layout */}
        <div className="block sm:hidden">
          <div className="p-4 space-y-4">
            {orders.map((order, index) => (
              <div key={order._id} className="bg-white/30 backdrop-blur-sm border border-white/40 rounded-xl p-4 hover:shadow-lg transition-all duration-300">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <p className="font-body font-semibold text-gray-900">Order #{index + 1}</p>
                    <p className="text-xs text-gray-600 font-body">ID: {order._id.slice(-8)}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-body font-medium border ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                </div>
                
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600 font-body">Date:</span>
                    <span className="text-sm text-gray-900 font-body">{new Date(order.createdAt).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600 font-body">Total:</span>
                    <span className="text-sm font-numeric font-semibold text-gray-900">Rs. {order.amount.toFixed(2)}</span>
                  </div>
                </div>
                
                <Link
                  to={`/orders/${order._id}`}
                  className="w-full bg-primary/20 hover:bg-primary/30 text-primary border border-primary/30 hover:border-primary/50 px-4 py-2 rounded-lg font-body font-medium text-center block transition-all duration-300"
                >
                  View Details
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Desktop view - Table layout */}
        <div className="hidden sm:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/20">
                <th className="px-6 py-4 text-left text-xs font-body font-semibold text-gray-700 uppercase tracking-wider">#</th>
                <th className="px-6 py-4 text-left text-xs font-body font-semibold text-gray-700 uppercase tracking-wider">Order ID</th>
                <th className="px-6 py-4 text-left text-xs font-body font-semibold text-gray-700 uppercase tracking-wider">Date</th>
                <th className="px-6 py-4 text-left text-xs font-body font-semibold text-gray-700 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-left text-xs font-body font-semibold text-gray-700 uppercase tracking-wider">Total</th>
                <th className="px-6 py-4 text-left text-xs font-body font-semibold text-gray-700 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {orders.map((order, index) => (
                <tr key={order._id} className="hover:bg-white/10 transition-colors duration-200">
                  <td className="px-6 py-4 text-sm font-body text-gray-900">{index + 1}</td>
                  <td className="px-6 py-4 text-sm font-body text-gray-900 font-medium">{order._id.slice(-8)}</td>
                  <td className="px-6 py-4 text-sm font-body text-gray-900">{new Date(order.createdAt).toLocaleDateString()}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-body font-medium border ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm font-numeric font-semibold text-gray-900">Rs. {order.amount.toFixed(2)}</td>
                  <td className="px-6 py-4">
                    <Link
                      to={`/orders/${order._id}`}
                      className="text-primary hover:text-primary-dark font-body font-medium transition-colors duration-200 flex items-center space-x-1"
                    >
                      <span>View Order</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserOrders;
