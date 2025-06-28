import React from 'react';
import { useSelector } from 'react-redux';
import { useGetAdminStatsQuery } from '../../../../src/redux/features/stats/statsApi';
import AdminStats from './AdminStates';
import AdminStatsChart from './AdminStatesChart';

const AdminDMain = () => {
    const { user } = useSelector((state) => state.auth);
    const { data: stats, error, isLoading } = useGetAdminStatsQuery();

    if (isLoading) {
        return <p className="text-center text-gray-500">Loading admin stats...</p>;
    }

    if (error || !stats) {
        return <p className="text-center text-red-500">Could not load dashboard stats.</p>;
    }

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
                <p className="text-gray-500 mt-1">Hi, {user?.username}! Welcome back.</p>
            </div>
            <AdminStats stats={stats} />
            <AdminStatsChart stats={stats} />
        </div>
    );
};

export default AdminDMain;
