import React from 'react'
import heroimg1 from "../../assets/background1.png"
import heroimg2 from "../../assets/background2.png"
import heroimg3 from "../../assets/background3.png"
import heroimg4 from "../../assets/background4.png"
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';

const cards = [
  { id: 1, image: heroimg1, title: 'papple' },
  { id: 2, image: heroimg2, title: 'papple' },
  { id: 3, image: heroimg3, title: 'papple' },
  { id: 4, image: heroimg4, title: 'papple' },
];

const Hero = () => {
  return (
    <section className='max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8'>
      <Swiper
        modules={[Autoplay, Pagination, Navigation, EffectFade]}
        spaceBetween={30}
        slidesPerView={1}
        loop={true}
        effect="fade"
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        navigation={true}
        className="w-full aspect-[16/7] rounded-xl overflow-hidden"
      >
        {cards.map((card) => (
          <SwiperSlide key={card.id}>
            <div className='w-full h-full'>
              <img src={card.image} alt={card.title} className='w-full h-full object-cover' />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Hero;
