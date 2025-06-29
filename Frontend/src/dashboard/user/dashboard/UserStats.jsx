const UserStats = ({stats}) => {
  return (
    <div className="my-6">
      <div className="grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <div className="bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl shadow-lg hover:shadow-xl p-6 cursor-pointer hover:scale-105 transition-all duration-300 group">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            </div>
            <div className="w-2 h-2 bg-primary/50 group-hover:bg-primary rounded-full transition-colors"></div>
          </div>
          <h2 className="text-lg font-heading font-bold text-gray-900 mb-1">Total Payments</h2>
          <p className="text-2xl font-numeric font-bold text-primary">Rs. {stats.totalPayments}</p>
        </div>

        <div className="bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl shadow-lg hover:shadow-xl p-6 cursor-pointer hover:scale-105 transition-all duration-300 group">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>
            <div className="w-2 h-2 bg-primary/50 group-hover:bg-primary rounded-full transition-colors"></div>
          </div>
          <h2 className="text-lg font-heading font-bold text-gray-900 mb-1">Total Reviews</h2>
          <p className="text-2xl font-numeric font-bold text-primary">{stats.totalReviews}</p>
        </div>

        <div className="bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl shadow-lg hover:shadow-xl p-6 cursor-pointer hover:scale-105 transition-all duration-300 group md:col-span-2 lg:col-span-1">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <div className="w-2 h-2 bg-primary/50 group-hover:bg-primary rounded-full transition-colors"></div>
          </div>
          <h2 className="text-lg font-heading font-bold text-gray-900 mb-1">Products Purchased</h2>
          <p className="text-2xl font-numeric font-bold text-primary">{stats.totalPurchasedProducts}</p>
        </div>
      </div>
    </div>
  );
};

export default UserStats;
