import React, { useState } from 'react';
import { useUpdateUserRoleMutation } from '../../../../src/redux/features/auth/authApi';

const UpdateUserModal = ({ user, onClose, onRoleUpdate }) => {
    const [role, setRole] = useState(user.role);
    const [updateUserRole, { isLoading }] = useUpdateUserRoleMutation();

    const handleUpdateRole = async () => {
        try {
            await updateUserRole({ userId: user._id, role }).unwrap();
            alert("User role updated successfully");
            onRoleUpdate();
            onClose();
        } catch (error) {
            console.error("Failed to update user role", error);
            alert("Failed to update user role.");
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
            <div className="backdrop-blur-xl bg-white/90 border border-white/30 rounded-2xl shadow-2xl w-full max-w-md mx-4 p-6">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                        Edit User Role
                    </h2>
                    <button 
                        onClick={onClose} 
                        className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100/50 rounded-lg transition-all duration-200"
                    >
                        <i className="ri-close-line text-2xl"></i>
                    </button>
                </div>
                
                <div className="space-y-6">
                    <div className="p-4 backdrop-blur-sm bg-blue-50/50 border border-blue-200/30 rounded-xl">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">User Email</label>
                        <p className="text-gray-800 font-medium break-all">{user.email}</p>
                    </div>
                    
                    <div>
                        <label htmlFor="role" className="block text-sm font-semibold text-gray-700 mb-3">
                            User Role
                        </label>
                        <select
                            id="role"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            className="block w-full px-4 py-3 backdrop-blur-sm bg-white/70 border border-gray-200/50 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm font-medium transition-all duration-200"
                        >
                            <option value="user">👤 User</option>
                            <option value="admin">👑 Admin</option>
                        </select>
                    </div>
                </div>

                <div className="flex justify-end gap-3 mt-8">
                    <button
                        onClick={onClose}
                        className="px-6 py-3 text-sm font-medium text-gray-700 backdrop-blur-sm bg-gray-100/70 border border-gray-200/50 rounded-xl hover:bg-gray-200/70 focus:outline-none focus:ring-2 focus:ring-gray-400 transition-all duration-200"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleUpdateRole}
                        disabled={isLoading}
                        className="px-8 py-3 text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl hover:from-purple-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg"
                    >
                        {isLoading ? (
                            <div className="flex items-center">
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                Saving...
                            </div>
                        ) : (
                            'Save Changes'
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UpdateUserModal;
