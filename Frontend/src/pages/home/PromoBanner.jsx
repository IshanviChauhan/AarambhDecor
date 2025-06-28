import React from 'react';

const PromoBanner = () => {
  const features = [
    {
      icon: <i className="ri-vip-diamond-line text-primary text-3xl"></i>,
      title: "Premium Products",
      description: "Top-notch quality for all your needs."
    },
    {
      icon: <i className="ri-truck-line text-primary text-3xl"></i>,
      title: "Free Delivery",
      description: "Fast and free delivery, always on time!"
    },
    {
      icon: <i className="ri-money-rupee-circle-line text-primary text-3xl"></i>,
      title: "Best Value",
      description: "Unbeatable deals that fit your budget."
    }
  ];

  return (
    <section className='bg-stone-50'>
      <div className='max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8 text-center'>
          {features.map((feature, index) => (
            <div key={index} className='flex flex-col items-center'>
              <div className='mb-4'>
                {feature.icon}
              </div>
              <h4 className='text-xl font-semibold font-header text-stone-800'>{feature.title}</h4>
              <p className='mt-2 text-stone-600'>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PromoBanner;
