import React from 'react';

const StatCard = ({ title, value, icon, color }) => (
  <div className={`p-6 rounded-xl shadow-lg flex items-center gap-4 bg-gradient-to-br ${color}`}>
    <div className="p-3 bg-white bg-opacity-30 rounded-full">
      <i className={`${icon} text-2xl text-white`}></i>
    </div>
    <div>
      <h3 className="text-sm font-medium text-white opacity-90">{title}</h3>
      <p className="text-2xl font-bold text-white">{value}</p>
    </div>
  </div>
);

const AdminStats = ({ stats }) => {
  const statCards = [
    { title: 'Total Earning', value: `Rs ${Math.round(stats.totalEarnings)}`, icon: 'ri-wallet-3-line', color: 'from-pink-500 to-orange-400' },
    { title: 'All Orders', value: stats.totalOrders, icon: 'ri-shopping-bag-3-line', color: 'from-blue-500 to-cyan-400' },
    { title: 'All Users', value: stats.totalUsers, icon: 'ri-user-3-line', color: 'from-green-500 to-teal-400' },
    { title: 'Total Products', value: stats.totalProducts, icon: 'ri-archive-line', color: 'from-purple-500 to-indigo-400' },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {statCards.map((card, index) => (
        <StatCard key={index} {...card} />
      ))}
    </div>
  );
};

export default AdminStats;
