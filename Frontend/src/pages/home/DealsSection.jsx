import React, { useState, useEffect } from "react";
import axios from "axios";
import { getBaseUrl } from "../../utils/baseURL";
import { Link } from "react-router-dom";

const DealsSection = () => {
  const [deal, setDeal] = useState(null);
  const [countdown, setCountdown] = useState({});
  const [intervalId, setIntervalId] = useState(null);

  useEffect(() => {
    const fetchDeal = async () => {
      try {
        const response = await axios.get(`${getBaseUrl()}/api/deal`);
        if(response.data) {
            setDeal(response.data);
            startCountdown(response.data.endDate);
        }
      } catch (error) {
        console.error("Error fetching deal:", error);
      }
    };
    fetchDeal();
    
    // Cleanup interval on component unmount
    return () => {
        if (intervalId) {
            clearInterval(intervalId);
        }
    };
  }, []);

  const startCountdown = (endDate) => {
    if (intervalId) clearInterval(intervalId);
    
    const targetDate = new Date(endDate);

    const id = setInterval(() => {
      const now = new Date();
      const difference = targetDate - now;

      if (difference <= 0) {
        clearInterval(id);
        setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 });
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

  if (!deal) {
    return null; // Don't render anything if there's no deal
  }

  return (
    <section className="section__container">
      <div className="grid md:grid-cols-2 gap-8 items-center bg-primary-color-light p-8 rounded-lg">
        {/* Image Section */}
        <div className="w-full h-auto rounded-lg overflow-hidden">
          {deal.imageUrl ? (
            <img
              src={deal.imageUrl}
              alt="Deal Banner"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-64 bg-gray-200 flex items-center justify-center">
                <p className="text-center text-gray-500">No image available</p>
            </div>
          )}
        </div>

        {/* Content Section */}
        <div className="text-center md:text-left">
          <h4 className="text-3xl md:text-4xl font-bold font-header text-primary mb-4">{deal.title}</h4>
          <p className="text-gray-600 mb-6">{deal.description}</p>
        
          {/* Countdown Section */}
          <div className="grid grid-cols-4 gap-2 md:gap-4 text-center mb-6">
            <div className="bg-white p-3 rounded-lg shadow-sm">
                <h4 className="text-xl md:text-2xl font-bold text-gray-800">{countdown.days || "0"}</h4>
                <p className="text-xs text-gray-500">Days</p>
            </div>
            <div className="bg-white p-3 rounded-lg shadow-sm">
                <h4 className="text-xl md:text-2xl font-bold text-gray-800">{countdown.hours || "0"}</h4>
                <p className="text-xs text-gray-500">Hours</p>
            </div>
            <div className="bg-white p-3 rounded-lg shadow-sm">
                <h4 className="text-xl md:text-2xl font-bold text-gray-800">{countdown.minutes || "0"}</h4>
                <p className="text-xs text-gray-500">Mins</p>
            </div>
            <div className="bg-white p-3 rounded-lg shadow-sm">
                <h4 className="text-xl md:text-2xl font-bold text-gray-800">{countdown.seconds || "0"}</h4>
                <p className="text-xs text-gray-500">Secs</p>
            </div>
          </div>
          
          <Link to="/shop">
            <button className="btn">Shop Now</button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default DealsSection;
