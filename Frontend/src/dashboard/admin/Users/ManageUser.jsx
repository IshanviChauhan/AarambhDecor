import React, { useState } from 'react';
import { useDeleteUserMutation, useGetUserQuery } from '../../../../src/redux/features/auth/authApi';
import { Link } from "react-router-dom";
import UpdateUserModal from './UpdateUser';

const ManageUser = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const { data: users = [], error, isLoading, refetch } = useGetUserQuery();
  const [deleteUser, { isLoading: isDeleting }] = useDeleteUserMutation();

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await deleteUser(id).unwrap();
        alert("User deleted successfully");
        refetch();
      } catch (error) {
        console.error("Failed to delete user", error);
        alert("Failed to delete user.");
      }
    }
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  // Sort users to put admin accounts at the top
  const sortedUsers = users ? [...users].sort((a, b) => {
    // Admin accounts first
    if (a.role === 'admin' && b.role !== 'admin') return -1;
    if (a.role !== 'admin' && b.role === 'admin') return 1;
    // If both are admin or both are user, sort by email alphabetically
    return a.email.localeCompare(b.email);
  }) : [];

  if (isLoading) return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-white to-primary/5 p-4 sm:p-6">
      <div className="bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl p-8 shadow-xl">
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          <span className="ml-3 text-gray-700 font-medium">Loading users...</span>
        </div>
      </div>
    </div>
  );
  
  if (error) return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-white to-primary/5 p-4 sm:p-6">
      <div className="bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl p-8 shadow-xl">
        <div className="text-center">
          <i className="ri-error-warning-line text-4xl text-red-500 mb-4"></i>
          <h3 className="text-lg font-semibold text-red-800 mb-2">Error Loading Users</h3>
          <p className="text-red-600">Failed to load users. Please try again later.</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-white to-primary/5 p-4 sm:p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl p-6 shadow-xl">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-3xl font-heading font-bold text-gray-900">
                Manage Users
              </h2>
              <p className="text-gray-600 mt-2">View and manage user accounts and roles</p>
            </div>
            <Link 
              to="/dashboard/admin" 
              className="flex items-center px-4 py-2 text-sm font-medium text-primary hover:text-primary-dark bg-primary/10 border border-primary/20 rounded-xl hover:bg-primary/20 transition-all duration-200"
            >
              <i className="ri-arrow-left-line mr-2"></i>
              Back to Dashboard
            </Link>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl shadow-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-primary/10 border-b border-white/20">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    #
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white/10 divide-y divide-white/20">
                {sortedUsers.map((user, index) => {
                  // Check if this is the first regular user (to add a separator)
                  const isFirstRegularUser = user.role === 'user' && 
                    (index === 0 || sortedUsers[index - 1].role === 'admin');
                  
                  return (
                    <React.Fragment key={user._id}>
                      {isFirstRegularUser && (
                        <tr className="bg-gray-50/30">
                          <td colSpan="4" className="px-6 py-2 text-xs font-semibold text-gray-600 uppercase tracking-wider border-t border-gray-200/50">
                            <div className="flex items-center">
                              <div className="flex-1 border-t border-gray-300/50"></div>
                              <span className="px-3 bg-gray-100/50 rounded-full">Regular Users</span>
                              <div className="flex-1 border-t border-gray-300/50"></div>
                            </div>
                          </td>
                        </tr>
                      )}
                      <tr className={`transition-all duration-200 ${user.role === 'admin' ? 'bg-green-50/30 border-green-200/30 border hover:bg-green-50/50' : 'hover:bg-white/20'}`}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium font-numeric text-primary bg-primary/10 rounded-lg mx-2 my-1 text-center w-16">
                          {index + 1}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 font-medium">
                          {user.email}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full backdrop-blur-sm ${user.role === 'admin' ? 'bg-green-100/80 text-green-800 border border-green-200/50' : 'bg-yellow-100/80 text-yellow-800 border border-yellow-200/50'}`}>
                            {user.role === 'admin' ? '👑 Admin' : '👤 User'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                          <div className="flex justify-center space-x-2">
                            <button 
                              onClick={() => handleEdit(user)} 
                              className="p-2 text-indigo-600 hover:text-indigo-800 hover:bg-indigo-100/50 rounded-lg transition-all duration-200 backdrop-blur-sm"
                              title="Edit User"
                            >
                              <i className="ri-edit-2-line text-lg"></i>
                            </button>
                            <button 
                              onClick={() => handleDelete(user._id)} 
                              disabled={isDeleting} 
                              className="p-2 text-red-600 hover:text-red-800 hover:bg-red-100/50 rounded-lg transition-all duration-200 backdrop-blur-sm disabled:opacity-50"
                              title="Delete User"
                            >
                              <i className="ri-delete-bin-6-line text-lg"></i>
                            </button>
                          </div>
                        </td>
                      </tr>
                    </React.Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {isModalOpen && (
          <UpdateUserModal user={selectedUser} onClose={handleCloseModal} onRoleUpdate={refetch} />
        )}
      </div>
    </div>
  );
};

export default ManageUser;
