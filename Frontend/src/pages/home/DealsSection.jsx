import React, { useState, useEffect } from "react";
import axios from "axios";

const DealsSection = () => {
  const BASE_URL = "http://localhost:4000";

  const [deal, setDeal] = useState({
    title: "",
    description: "",
    discount: 0,
    imageUrl: "",
    endDate: "",
    categories: [], // Array of category objects or strings
    applicableProducts: 0, // Number of products this deal applies to
  });
  const [countdown, setCountdown] = useState({});
  const [intervalId, setIntervalId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [error, setError] = useState(null);

  const startCountdown = (endDate) => {
    clearInterval(intervalId);
    const targetDate = new Date(endDate);

    const id = setInterval(() => {
      const now = new Date();
      const difference = targetDate - now;

      if (difference <= 0) {
        clearInterval(id);
        setCountdown({});
      } else {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / (1000 * 60)) % 60);
        const seconds = Math.floor((difference / 1000) % 60);
        setCountdown({ days, hours, minutes, seconds });
      }
    }, 1000);

    setIntervalId(id);
  };

  const fetchDeal = async (isManualRefresh = false) => {
    try {
      if (isManualRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }
      setError(null);
      
      const response = await axios.get(`${BASE_URL}/api/deal?t=${Date.now()}`); // Add timestamp to prevent caching
      if (!response.data) {
        console.warn("No deal data received");
        return;
      }
      
      // Always update deal data to ensure fresh content
      const newDeal = response.data;
      setDeal(newDeal);
      setLastUpdated(new Date());
      
      // Restart countdown if end date exists
      if (newDeal.endDate) {
        startCountdown(newDeal.endDate);
      } else {
        // Clear countdown if no end date
        setCountdown({});
        if (intervalId) {
          clearInterval(intervalId);
        }
      }
    } catch (error) {
      console.error("Error fetching deal:", error);
      setError("Failed to load deal. Please try again.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    // Immediately fetch deal when component mounts
    fetchDeal();

    // Set up periodic refresh every 10 seconds for continuous updates
    const refreshInterval = setInterval(() => {
      fetchDeal();
    }, 10000);

    // Listen for when the page becomes visible (user switches back to tab)
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        console.log("Page became visible, refreshing deals...");
        fetchDeal();
      }
    };

    // Add event listener for visibility changes
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Listen for page focus events
    const handleFocus = () => {
      console.log("Page gained focus, refreshing deals...");
      fetchDeal();
    };

    window.addEventListener('focus', handleFocus);

    // Cleanup intervals and listeners on component unmount
    return () => {
      clearInterval(refreshInterval);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('focus', handleFocus);
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (loading) {
    return (
      <section className="max-w-[1600px] mx-auto px-2 py-3 xs:px-3 xs:py-4 sm:px-4 sm:py-5 md:px-8 md:py-6">
        <div className="relative overflow-hidden rounded-lg xs:rounded-xl sm:rounded-2xl shadow-md xs:shadow-lg sm:shadow-xl bg-gradient-to-r from-white via-primary-light-light/50 to-white border border-primary/10 min-h-[180px] xs:min-h-[200px] sm:min-h-[220px] flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-6 w-6 xs:h-8 xs:w-8 sm:h-10 sm:w-10 border-b-2 border-primary mx-auto mb-2 xs:mb-3"></div>
            <p className="text-sm xs:text-base sm:text-lg font-medium text-gray-600">Loading amazing deals...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full max-w-[1600px] mx-auto px-2 py-3 xs:px-3 xs:py-4 sm:px-4 sm:py-5 md:px-6 md:py-6 lg:px-8 lg:py-8">
      <div 
        className="relative overflow-hidden rounded-lg xs:rounded-xl sm:rounded-2xl shadow-md xs:shadow-lg sm:shadow-xl border border-primary/10 min-h-[200px] xs:min-h-[220px] sm:min-h-[240px] md:min-h-[260px]"
        style={{
          background: deal.imageUrl 
            ? `linear-gradient(rgba(255, 255, 255, 0.85), rgba(245, 225, 215, 0.85)), url(${deal.imageUrl})`
            : 'linear-gradient(to right, white, rgba(245, 225, 215, 0.5), white)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        {/* Enhanced Pattern Overlay */}
        <div className="absolute inset-0 opacity-5 sm:opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23E5989B' fill-opacity='0.3'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '40px 40px',
          }}></div>
        </div>

        {/* Refresh Button */}
        {!loading && (
          <button
            onClick={() => fetchDeal(true)}
            disabled={refreshing}
            className="absolute top-2 right-2 xs:top-3 xs:right-3 sm:top-4 sm:right-4 z-20 p-1 xs:p-1.5 sm:p-2 bg-white/90 backdrop-blur-sm border border-primary/20 rounded-lg xs:rounded-xl text-primary hover:bg-primary hover:text-white hover:scale-110 transition-all duration-300 disabled:opacity-50 shadow-lg"
            title="Refresh Deal"
          >
            <i className={`ri-refresh-line text-sm xs:text-base ${refreshing ? 'animate-spin' : ''}`}></i>
          </button>
        )}

        {/* Error Message */}
        {error && (
          <div className="absolute top-10 right-2 xs:top-12 xs:right-3 sm:top-14 sm:right-4 z-20 p-2 xs:p-2.5 sm:p-3 bg-red-50/95 backdrop-blur-sm border border-red-200 rounded-lg xs:rounded-xl text-red-700 text-xs xs:text-sm max-w-[150px] xs:max-w-[200px] sm:max-w-xs shadow-lg">
            <i className="ri-error-warning-line mr-1 xs:mr-1.5 sm:mr-2"></i>
            {error}
          </div>
        )}

        {/* Main Content - Horizontal Layout (except very small screens) */}
        <div className="relative z-10 p-2 xs:p-3 sm:p-4 md:p-5 lg:p-6">
          <div className="grid grid-cols-1 xs:grid-cols-12 gap-2 xs:gap-3 sm:gap-4 md:gap-6 lg:gap-8 items-center">
            
            {/* Text Section - Responsive */}
            <div className="xs:col-span-8 sm:col-span-7 md:col-span-8 text-center xs:text-left space-y-1 xs:space-y-2 sm:space-y-3">
              {/* Deal Badge */}
              <div className="inline-flex items-center px-2 py-0.5 xs:px-2.5 xs:py-1 sm:px-3 sm:py-1.5 bg-gradient-to-r from-primary to-primary-dark text-white rounded-full text-xs font-bold shadow-md transform hover:scale-105 transition-all duration-300">
                <i className="ri-fire-line mr-1 xs:mr-1.5 animate-pulse text-xs"></i>
                <span className="hidden xs:inline">LIMITED TIME OFFER</span>
                <span className="xs:hidden">LIMITED</span>
              </div>
              
              {/* Deal Title */}
              <div className="max-w-full overflow-hidden">
                <h2 
                  className="text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-gray-800 leading-tight break-words"
                  style={{ 
                    fontFamily: 'var(--header-font)',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }}
                >
                  {deal.title || "Special Deal"}
                </h2>
              </div>
              
              {/* Discount Display */}
              <div className="inline-flex items-center justify-center bg-white/90 backdrop-blur-sm border-2 border-primary/30 rounded-lg xs:rounded-xl px-2.5 py-1 xs:px-3 xs:py-1.5 sm:px-4 sm:py-2 shadow-lg transform hover:scale-105 transition-all duration-300">
                <span className="text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-primary font-numeric">
                  {deal.discount || 25}
                </span>
                <span className="text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-primary ml-1">% OFF</span>
              </div>

              {/* Categories Display */}
              {deal.categories && deal.categories.length > 0 && (
                <div className="flex flex-wrap gap-1 xs:gap-2 justify-center xs:justify-start">
                  {deal.categories.slice(0, 3).map((category, index) => (
                    <span 
                      key={index}
                      className="inline-flex items-center px-2 py-1 xs:px-2.5 xs:py-1 bg-primary/10 text-primary rounded-full text-xs xs:text-sm font-medium border border-primary/20"
                    >
                      <i className="ri-price-tag-3-line mr-1 text-xs"></i>
                      {typeof category === 'string' ? category : category.name || category.title}
                    </span>
                  ))}
                  {deal.categories.length > 3 && (
                    <span className="inline-flex items-center px-2 py-1 xs:px-2.5 xs:py-1 bg-gray-100 text-gray-600 rounded-full text-xs xs:text-sm font-medium">
                      +{deal.categories.length - 3} more
                    </span>
                  )}
                </div>
              )}

              {/* Applicable Products Count */}
              {deal.applicableProducts && deal.applicableProducts > 0 && (
                <div className="inline-flex items-center px-2 py-1 xs:px-2.5 xs:py-1 bg-green-50 text-green-700 rounded-full text-xs xs:text-sm font-medium border border-green-200">
                  <i className="ri-shopping-bag-line mr-1 text-xs"></i>
                  <span className="hidden xs:inline">Valid on {deal.applicableProducts} products</span>
                  <span className="xs:hidden">{deal.applicableProducts} products</span>
                </div>
              )}
              
              {/* Description */}
              <div className="max-w-full xs:max-w-sm sm:max-w-md lg:max-w-lg mx-auto xs:mx-0">
                <p className="text-xs xs:text-sm sm:text-base text-gray-700 leading-relaxed bg-white/70 backdrop-blur-sm rounded-lg p-2 xs:p-2.5 sm:p-3 shadow-md">
                  {deal.description || "Transform your space with premium home decor at unbeatable prices!"}
                </p>
              </div>
              
              {/* CTA Button */}
              <div className="flex justify-center xs:justify-start pt-1 xs:pt-1.5 sm:pt-2">
                <button className="group inline-flex items-center px-2.5 py-1.5 xs:px-3 xs:py-2 sm:px-4 sm:py-2.5 md:px-6 md:py-3 bg-gradient-to-r from-primary to-primary-dark text-white font-bold text-xs xs:text-sm sm:text-base rounded-lg hover:from-primary-dark hover:to-primary shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
                  <span className="mr-1 xs:mr-1.5">Shop Now</span>
                  <i className="ri-arrow-right-line group-hover:translate-x-2 transition-transform duration-300 text-xs xs:text-sm"></i>
                </button>
              </div>

              {/* Status Indicators */}
              <div className="flex flex-col items-center xs:items-start space-y-1 pt-1 xs:pt-1.5">
                {lastUpdated && (
                  <div className="flex items-center text-xs text-gray-600 bg-white/70 backdrop-blur-sm rounded-full px-2 py-0.5 xs:px-2.5 xs:py-1">
                    <div className="w-1 h-1 xs:w-1.5 xs:h-1.5 bg-green-500 rounded-full mr-1 xs:mr-1.5 animate-pulse"></div>
                    <i className="ri-check-line mr-0.5 xs:mr-1 text-xs"></i>
                    <span className="hidden sm:inline">Updated: {lastUpdated.toLocaleTimeString()}</span>
                    <span className="sm:hidden">Updated {lastUpdated.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</span>
                  </div>
                )}

                {refreshing && (
                  <div className="flex items-center text-xs text-primary bg-white/70 backdrop-blur-sm rounded-full px-2 py-0.5 xs:px-2.5 xs:py-1">
                    <div className="animate-spin rounded-full h-2 w-2 xs:h-2.5 xs:w-2.5 border-b border-primary mr-1 xs:mr-1.5"></div>
                    <span className="hidden sm:inline">Checking for updates...</span>
                    <span className="sm:hidden">Updating...</span>
                  </div>
                )}
              </div>
            </div>

            {/* Countdown Section - Compact & Horizontal */}
            <div className="xs:col-span-4 sm:col-span-5 md:col-span-4">
              <div className="bg-white/90 backdrop-blur-sm border border-primary/20 rounded-lg xs:rounded-xl p-2 xs:p-2.5 sm:p-3 md:p-4 shadow-lg max-w-xs mx-auto xs:max-w-none">
                <div className="text-center mb-2 xs:mb-2.5 sm:mb-3">
                  <h3 className="text-xs xs:text-sm sm:text-base md:text-lg font-bold text-gray-800 mb-1 xs:mb-1.5" style={{ fontFamily: 'var(--header-font)' }}>
                    Deal Ends In
                  </h3>
                  <div className="w-6 xs:w-8 sm:w-10 h-0.5 bg-gradient-to-r from-primary to-primary-dark mx-auto rounded-full"></div>
                </div>
                
                <div className="grid grid-cols-2 gap-1 xs:gap-1.5 sm:gap-2">
                  <div className="bg-gradient-to-br from-primary-light-light to-white border border-primary/15 rounded-md xs:rounded-lg p-1 xs:p-1.5 sm:p-2 md:p-2.5 text-center shadow-md hover:shadow-lg transition-all duration-300 group">
                    <div className="text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-primary font-numeric group-hover:scale-110 transition-transform duration-300">
                      {countdown.days || "0"}
                    </div>
                    <div className="text-xs text-gray-600 mt-0.5 font-medium uppercase">Days</div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-primary-light-light to-white border border-primary/15 rounded-md xs:rounded-lg p-1 xs:p-1.5 sm:p-2 md:p-2.5 text-center shadow-md hover:shadow-lg transition-all duration-300 group">
                    <div className="text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-primary font-numeric group-hover:scale-110 transition-transform duration-300">
                      {countdown.hours || "0"}
                    </div>
                    <div className="text-xs text-gray-600 mt-0.5 font-medium uppercase">Hours</div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-primary-light-light to-white border border-primary/15 rounded-md xs:rounded-lg p-1 xs:p-1.5 sm:p-2 md:p-2.5 text-center shadow-md hover:shadow-lg transition-all duration-300 group">
                    <div className="text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-primary font-numeric group-hover:scale-110 transition-transform duration-300">
                      {countdown.minutes || "0"}
                    </div>
                    <div className="text-xs text-gray-600 mt-0.5 font-medium uppercase">Min</div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-orange-50 to-red-50 border border-orange-200/50 rounded-md xs:rounded-lg p-1 xs:p-1.5 sm:p-2 md:p-2.5 text-center shadow-md hover:shadow-lg transition-all duration-300 group">
                    <div className="text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-orange-600 font-numeric group-hover:scale-110 transition-transform duration-300">
                      {countdown.seconds || "0"}
                    </div>
                    <div className="text-xs text-gray-600 mt-0.5 font-medium uppercase">Sec</div>
                  </div>
                </div>
                
                <div className="mt-2 xs:mt-2.5 text-center">
                  <div className="inline-flex items-center px-2 py-0.5 xs:px-2.5 xs:py-1 bg-orange-50 border border-orange-200/50 rounded-full text-orange-700 text-xs font-medium">
                    <i className="ri-time-line mr-0.5 xs:mr-1 text-xs"></i>
                    <span className="hidden sm:inline">Limited stock</span>
                    <span className="sm:hidden">Limited</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Compact Decorative Elements */}
        <div className="absolute top-2 left-2 xs:top-3 xs:left-3 sm:top-4 sm:left-4 w-4 h-4 xs:w-6 xs:h-6 sm:w-8 sm:h-8 bg-primary/5 rounded-full blur-lg animate-pulse"></div>
        <div className="absolute bottom-2 right-2 xs:bottom-3 xs:right-3 sm:bottom-4 sm:right-4 w-6 h-6 xs:w-8 xs:h-8 sm:w-10 sm:h-10 bg-primary-dark/5 rounded-full blur-lg animate-pulse delay-1000"></div>
      </div>
    </section>
  );
};

export default DealsSection;
