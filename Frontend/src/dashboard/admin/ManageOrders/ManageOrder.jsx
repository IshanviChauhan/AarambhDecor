import React, { useState } from "react";
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
  // const { data: orders = [], error, isLoading, refetch } = useGetAllOrdersQuery();
  const { data, error, isLoading, refetch } = useGetAllOrdersQuery();
  const orders = data?.orders || [];
  // console.log("orders response", orders);

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteOrder, { isLoading: isDeleting }] = useDeleteOrderMutation();

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

  if (isLoading) return <div>Loading orders...</div>;
  if (error) return <div>Error: Unable to fetch orders.</div>;

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Manage Orders</h2>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Order ID
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Customer
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Status
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Date
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {orders.map((order) => (
                <tr key={order._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-500">
                    {order._id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {order?.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                        order.status
                      )}`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(order?.updatedAt)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium space-x-2">
                    <Link
                      to={`/dashboard/orders/${order._id}`}
                      className="text-blue-600 hover:text-blue-900 p-1 rounded-md hover:bg-blue-100 transition"
                    >
                      <i className="ri-eye-line text-lg"></i>
                    </Link>
                    <button
                      onClick={() => handleEditClick(order)}
                      className="text-indigo-600 hover:text-indigo-900 p-1 rounded-md hover:bg-indigo-100 transition"
                    >
                      <i className="ri-edit-2-line text-lg"></i>
                    </button>
                    <button
                      onClick={() => handleDeleteClick(order._id)}
                      disabled={isDeleting}
                      className="text-red-600 hover:text-red-900 p-1 rounded-md hover:bg-red-100 transition"
                    >
                      <i className="ri-delete-bin-6-line text-lg"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
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
  );
};

export default ManageOrders;
