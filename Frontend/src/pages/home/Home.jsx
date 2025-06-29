import React from 'react';

// import { Blogs } from "../blogs/Blogs";
// import Trending from "../shop/Trending";
import Banner from "./Banner";
import Categories from "./Categories";
import DealsSection from "./DealsSection";
import Hero from "./Hero";

import PromoBanner from "./PromoBanner";

const Home = () => {
  return (
    <>
      <div className="mb-8 lg:mb-12">
        <Banner />
      </div>
      <div className="my-8 lg:my-12">
        <Categories />
      </div>
      <div className="my-8 lg:my-12">
        <Hero />
      </div>
      {/* <Trending /> */}
      <DealsSection />
      <div className="my-32 lg:my-25">
        <PromoBanner />
      </div>
      {/* <div className="mt-8 lg:mt-12">
        <Blogs />
      </div> */}
    </>
  );
};

export default Home;
