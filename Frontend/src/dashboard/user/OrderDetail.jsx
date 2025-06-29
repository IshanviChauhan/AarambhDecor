import { useParams } from "react-router-dom";
import { useGetOrderByIdQuery } from "../../../src/redux/features/order/orderApi";
import TimelineStep from "./TimelineSteps";

const OrderDetails = () => {
  const { orderId } = useParams();
  const { data: order, error, isLoading } = useGetOrderByIdQuery(orderId);

  if (!orderId || orderId === "undefined") {
    return (
      <div className="p-4 sm:p-6">
        <div className="bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl shadow-xl p-8 text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h3 className="text-lg font-heading font-semibold text-gray-900 mb-2">Invalid Order ID</h3>
          <p className="text-gray-600 font-body">Please check the URL and try again</p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="p-4 sm:p-6">
        <div className="bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl shadow-xl p-8 text-center">
          <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-700 font-body">Loading order details...</p>
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
          <h3 className="text-lg font-heading font-semibold text-gray-900 mb-2">Error Loading Order</h3>
          <p className="text-gray-600 font-body">{error?.data?.message || "Something went wrong while fetching the order"}</p>
        </div>
      </div>
    );
  }

  if (!order || Object.keys(order).length === 0) {
    return (
      <div className="p-4 sm:p-6">
        <div className="bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl shadow-xl p-8 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 className="text-lg font-heading font-semibold text-gray-900 mb-2">Order Not Found</h3>
          <p className="text-gray-600 font-body">Please check the order ID and try again</p>
        </div>
      </div>
    );
  }

  // Helper functions for timeline logic
  const isCompleted = (status) => {
    const statuses = ["pending", "processing", "shipped", "completed"];
    return statuses.indexOf(status) < statuses.indexOf(order.status);
  };

  const isCurrent = (status) => order.status === status;

  const steps = [
    {
      status: "pending",
      label: "Pending",
      description: "Your order has been created and is awaiting processing.",
      icon: { iconName: "edit-2-line", bgColor: "red-500", textColor: "gray-800" },
    },
    {
      status: "processing",
      label: "Processing",
      description: "Your order is currently being processed.",
      icon: { iconName: "loader-line", bgColor: "yellow-500", textColor: "yellow-800" },
    },
    {
      status: "shipped",
      label: "Shipped",
      description: "Your order has been shipped.",
      icon: { iconName: "truck-line", bgColor: "blue-800", textColor: "blue-100" },
    },
    {
      status: "completed",
      label: "Completed",
      description: "Your order has been successfully completed.",
      icon: { iconName: "check-line", bgColor: "green-800", textColor: "white" },
    },
  ];

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
        <h1 className="text-2xl sm:text-3xl font-heading font-bold text-gray-900 mb-2">Order Details</h1>
        <p className="text-gray-600 font-body">Track your order status and timeline</p>
      </div>

      <div className="space-y-6">
        {/* Order Summary Card */}
        <div className="bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl shadow-xl p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white/30 backdrop-blur-sm border border-white/40 rounded-xl p-4">
              <h3 className="text-sm font-body font-medium text-gray-600 mb-1">Order ID</h3>
              <p className="text-lg font-heading font-semibold text-gray-900">{order._id.slice(-8)}</p>
            </div>
            
            <div className="bg-white/30 backdrop-blur-sm border border-white/40 rounded-xl p-4">
              <h3 className="text-sm font-body font-medium text-gray-600 mb-1">Status</h3>
              <span className={`inline-flex px-3 py-1 rounded-full text-sm font-body font-medium border ${getStatusColor(order.status)}`}>
                {order.status}
              </span>
            </div>
            
            <div className="bg-white/30 backdrop-blur-sm border border-white/40 rounded-xl p-4">
              <h3 className="text-sm font-body font-medium text-gray-600 mb-1">Total Amount</h3>
              <p className="text-lg font-numeric font-semibold text-gray-900">Rs. {order.amount.toFixed(2)}</p>
            </div>
            
            <div className="bg-white/30 backdrop-blur-sm border border-white/40 rounded-xl p-4">
              <h3 className="text-sm font-body font-medium text-gray-600 mb-1">Order Date</h3>
              <p className="text-lg font-body font-medium text-gray-900">{new Date(order.createdAt).toLocaleDateString()}</p>
            </div>
          </div>
        </div>

        {/* Order Timeline */}
        <div className="bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl shadow-xl p-6">
          <h3 className="text-xl font-heading font-bold text-gray-900 mb-6">Order Progress</h3>
          <ol className="items-center sm:flex relative space-y-6 sm:space-y-0">
            {steps.map((step, index) => (
              <TimelineStep
                key={step.status}
                step={step}
                order={order}
                isCompleted={isCompleted(step.status)}
                isCurrent={isCurrent(step.status)}
                isLastStep={index === steps.length - 1}
                icon={step.icon}
                description={step.description}
              />
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
