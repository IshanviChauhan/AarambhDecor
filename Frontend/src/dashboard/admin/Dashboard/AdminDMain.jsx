import React from 'react';
import { useSelector } from 'react-redux';
import { useGetAdminStatsQuery } from '../../../../src/redux/features/stats/statsApi';
import AdminStats from './AdminStates';
import AdminStatsChart from './AdminStatesChart';

const AdminDMain = () => {
    const { user } = useSelector((state) => state.auth);
    const { data: stats, error, isLoading } = useGetAdminStatsQuery();

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-primary/10 via-white to-primary/5 p-4 sm:p-6 flex items-center justify-center">
                <div className="bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl shadow-xl p-8 text-center">
                    <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
                    <p className="text-gray-700 font-body">Loading admin dashboard...</p>
                </div>
            </div>
        );
    }

    if (error || !stats) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-primary/10 via-white to-primary/5 p-4 sm:p-6 flex items-center justify-center">
                <div className="bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl shadow-xl p-8 text-center">
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <p className="text-red-600 font-body">Could not load dashboard stats.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-primary/10 via-white to-primary/5 p-4 sm:p-6">
            <div className="max-w-7xl mx-auto space-y-8">
                <div className="bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl shadow-xl p-6 sm:p-8">
                    <h1 className="text-3xl sm:text-4xl font-heading font-bold text-gray-900 mb-2">Admin Dashboard</h1>
                    <p className="text-gray-600 font-body text-lg">Hi, {user?.username}! Welcome back to your control center.</p>
                </div>
                <AdminStats stats={stats} />
                <AdminStatsChart stats={stats} />
            </div>
        </div>
    );
};

export default AdminDMain;
