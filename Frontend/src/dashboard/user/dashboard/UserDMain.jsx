import { useSelector } from 'react-redux';
import { useGetUserStatsQuery } from '../../../../src/redux/features/stats/statsApi';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import UserStats from './UserStats';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const UserDMain = () => {
  const { user } = useSelector((state) => state.auth);
  const { data: stats, isLoading } = useGetUserStatsQuery(user?.email);

  if (isLoading) {
    return (
      <div className="p-4 sm:p-6">
        <div className="bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl shadow-xl p-8 text-center">
          <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-700 font-body">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="p-4 sm:p-6">
        <div className="bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl shadow-xl p-8 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <h3 className="text-lg font-heading font-semibold text-gray-900 mb-2">No Stats Available</h3>
          <p className="text-gray-600 font-body">Start shopping to see your activity</p>
        </div>
      </div>
    );
  }

  // Prepare data for the bar chart
  const data = {
    labels: ['Total Payments', 'Total Reviews', 'Total Purchased Products'],
    datasets: [
      {
        label: 'User Stats',
        data: [stats.totalPayments, stats.totalReviews, stats.totalPurchasedProducts],
        backgroundColor: 'rgba(168, 85, 247, 0.2)',
        borderColor: 'rgba(168, 85, 247, 1)',
        borderWidth: 2,
        borderRadius: 8,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: {
            family: 'PT Sans, sans-serif',
            size: 14,
          },
          color: '#374151',
        },
      },
      tooltip: {
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        titleColor: '#374151',
        bodyColor: '#6B7280',
        borderColor: 'rgba(168, 85, 247, 0.3)',
        borderWidth: 1,
        cornerRadius: 12,
        callbacks: {
          label: function (tooltipItem) {
            if (tooltipItem.label === 'Total Payments') {
              return `Total Payments: Rs. ${tooltipItem.raw.toFixed(2)}`;
            }
            return `${tooltipItem.label}: ${tooltipItem.raw}`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(156, 163, 175, 0.2)',
        },
        ticks: {
          color: '#6B7280',
          font: {
            family: 'PT Sans, sans-serif',
          },
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: '#6B7280',
          font: {
            family: 'PT Sans, sans-serif',
          },
        },
      },
    },
  };

  return (
    <div className="p-4 sm:p-6">
      {/* Welcome Header */}
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-heading font-bold text-gray-900 mb-2">
          Welcome back, {user?.username}!
        </h1>
        <p className="text-gray-600 font-body">Here&apos;s an overview of your activity and stats</p>
      </div>

      {/* Stats Cards */}
      <UserStats stats={stats} />

      {/* Chart Section */}
      <div className="bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl shadow-xl p-6">
        <div className="mb-6">
          <h2 className="text-xl font-heading font-bold text-gray-900 mb-2">Activity Overview</h2>
          <p className="text-gray-600 font-body text-sm">Visual representation of your account activity</p>
        </div>
        <div className="h-64 sm:h-80">
          <Bar data={data} options={options} />
        </div>
      </div>
    </div>
  );
};

export default UserDMain;