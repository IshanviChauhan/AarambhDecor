import { Outlet, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import AdminDashboard from './AdminDashboard';
import UserDashboard from './UserDashBoard';

const DashboardLayout = () => {
  const { user } = useSelector((state) => state.auth);

  if (!user) {
    console.log("You must be logged in!");
    return <Navigate to="/login" replace />;
  }

  const renderDashboard = () => {
    switch (user?.role) {
      case 'admin':
        return <AdminDashboard />;
      case 'user':
        return <UserDashboard />;
      default:
        return <Navigate to="/login" replace />; 
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-light/30 via-white to-primary-light/30">
      <div className='container mx-auto flex flex-col lg:flex-row gap-6 p-4 max-w-7xl'>
        <aside className='lg:w-1/4 xl:w-1/5 w-full order-2 lg:order-1'>
          {renderDashboard()}
        </aside>
        <main className='flex-1 order-1 lg:order-2'>
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl shadow-xl min-h-[600px]">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
