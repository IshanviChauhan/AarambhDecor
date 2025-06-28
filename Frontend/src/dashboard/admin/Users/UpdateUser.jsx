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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md mx-4">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-gray-800">Edit User Role</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                        <i className="ri-close-line text-2xl"></i>
                    </button>
                </div>
                
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-500">Email</label>
                        <p className="text-gray-800 font-semibold mt-1">{user.email}</p>
                    </div>
                    <div>
                        <label htmlFor="role" className="block text-sm font-medium text-gray-700">Role</label>
                        <select
                            id="role"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                        >
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>
                </div>

                <div className="flex justify-end gap-3 mt-6">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleUpdateRole}
                        disabled={isLoading}
                        className="px-6 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary-dark focus:outline-none disabled:bg-opacity-50"
                    >
                        {isLoading ? 'Saving...' : 'Save'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UpdateUserModal;
