import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import BrowseByCategory from "../components/home/BrowseByCategory";
import HotCollections from "../components/home/HotCollections";
import Landing from "../components/home/Landing";
import LandingIntro from "../components/home/LandingIntro";
import NewItems from "../components/home/NewItems";
import TopSellers from "../components/home/TopSellers";

const Home = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 }); 
    window.scrollTo(0, 0);
  }, []);

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
          <Landing />
        <div data-aos="fade-down">
          <LandingIntro />
        </div>
        <div data-aos="fade-down">
          <HotCollections />
        </div>
        <div data-aos="fade-down">
          <NewItems />
        </div>
        <div data-aos="fade-down">
          <TopSellers />
        </div>
        <div data-aos="fade-left">
          <BrowseByCategory />
        </div>
      </div>
    </div>
  );
};

export default Home;
