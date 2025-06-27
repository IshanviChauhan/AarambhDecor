import React from 'react'
import heroimg1 from "../../assets/background1.png"
import heroimg2 from "../../assets/background2.png"
import heroimg3 from "../../assets/background3.png"
import heroimg4 from "../../assets/background4.png"
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules'; // Import necessary modules
import 'swiper/swiper-bundle.css'; 

const cards =[
  {
    id: 1,
    image: heroimg1,
    title: 'Living Room Inspiration'
  },
  {
    id: 2,
    image: heroimg2,
    title: 'Modern Kitchen Decor'
  },
  {
    id: 3,
    image: heroimg3,
    title: 'Cozy Bedroom Finds'
  },
  {
    id: 4,
    image: heroimg4,
    title: 'Outdoor & Patio'
  },
]

const Hero = () => {
  return (
    <section className='section__container'>
      <Swiper 
        modules={[Autoplay, Pagination, Navigation]}
        spaceBetween={30}
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        navigation={true}
        className="hero__swiper"
      >
        {cards.map((card) => (
          <SwiperSlide key={card.id}>
            <div className='hero__card'>
              <img src={card.image} alt={card.title} className='w-full h-auto rounded-lg' />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Hero;
