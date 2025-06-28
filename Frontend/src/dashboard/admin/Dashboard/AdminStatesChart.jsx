import React from 'react';
import { Pie, Line } from 'react-chartjs-2';
import 'chart.js/auto';

const ChartContainer = ({ title, children }) => (
  <div className="bg-white p-6 rounded-xl shadow-lg">
    <h3 className="text-lg font-semibold text-gray-700 mb-4">{title}</h3>
    <div className="h-80">{children}</div>
  </div>
);

const AdminStatsChart = ({ stats }) => {
  // Data for Pie Chart
  const pieData = {
    labels: ['Total Orders', 'Total Products', 'Total Reviews', 'Total Users'],
    datasets: [
      {
        label: 'Admin Stats',
        data: [
          stats.totalOrders,
          stats.totalProducts,
          stats.totalReviews,
          stats.totalUsers,
        ],
        backgroundColor: [
          '#3b82f6', // blue-500
          '#14b8a6', // teal-500
          '#f97316', // orange-500
          '#8b5cf6', // violet-500
        ],
        hoverOffset: 4,
        borderWidth: 0,
      },
    ],
  };

  const data = new Array(12).fill(0);
  stats?.monthlyEarnings.forEach(entry => {
    data[entry.month - 1] = entry.earnings;
  });

  const lineData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Monthly Earnings',
        data,
        fill: true,
        backgroundColor: 'rgba(59, 130, 246, 0.2)',
        borderColor: '#3b82f6', // blue-500
        tension: 0.4,
        pointBackgroundColor: '#3b82f6',
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
        x: {
            grid: {
                display: false
            }
        },
        y: {
            beginAtZero: true
        }
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Analytics Overview</h2>
      <div className="space-y-6">
        <div>
          <ChartContainer title="Monthly Earnings">
            <Line data={lineData} options={options} />
          </ChartContainer>
        </div>
        <div>
          <ChartContainer title="Statistics Breakdown">
            <Pie data={pieData} options={{ ...options, plugins: { legend: { position: 'right' }}}} />
          </ChartContainer>
        </div>
      </div>
    </div>
  );
};

export default AdminStatsChart;
