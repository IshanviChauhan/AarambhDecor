import React from 'react';

const StatCard = ({ title, value, icon, color }) => (
  <div className={`bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl shadow-xl hover:shadow-2xl p-6 cursor-pointer hover:scale-105 transition-all duration-300 group`}>
    <div className="flex items-center justify-between mb-4">
      <div className={`w-12 h-12 rounded-full flex items-center justify-center bg-gradient-to-br ${color}`}>
        <i className={`${icon} text-xl text-white`}></i>
      </div>
      <div className="w-2 h-2 bg-primary/50 group-hover:bg-primary rounded-full transition-colors"></div>
    </div>
    <h3 className="text-sm font-body font-medium text-gray-600 mb-1">{title}</h3>
    <p className="text-2xl font-numeric font-bold text-gray-900">{value}</p>
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
    <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
      {statCards.map((card, index) => (
        <StatCard key={index} {...card} />
      ))}
    </div>
  );
};

export default AdminStats;
