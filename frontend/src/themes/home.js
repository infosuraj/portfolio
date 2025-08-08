import React from "react";

import Preloader from "../components/Miscellaneous/Preloader";
import Header from "../components/Header/Header";
import Hero from "../components/Hero/Hero";
import Portfolio from "../components/Portfolio/PortfolioSection";
import AboutSection from "../components/About/AboutSection";
import Shape from "../components/Shape/Shape";
import Awards from "../components/Awards/AwardsOne";
import Blog from "../components/Blog/BlogSection";
import CTA from "../components/CTA/CTAOne";
import Footer from "../components/Footer/Footer";
import SearchModal from "../components/Miscellaneous/SearchModal";
import OffcanvasMenu from "../components/Miscellaneous/OffcanvasMenu";
import MagicCursor from "../components/Miscellaneous/MagicCursor";
import LenisScroll from "../components/Header/LenisScroll";

const Home = () => {
  return (
    <div>
      <title>INFOSURAJ - Portfolio</title>
      <meta
        name="description"
        content="Discover the latest web development projects, insightful articles, and services from Suraj. Specializing in modern web solutions."
      />
      <MagicCursor />
      <Preloader />
      <LenisScroll />
      <div className="main">
        <Header />
        <div id="main-wrapper" className="main-wrapper">
          <Hero />
          <Portfolio />
          <AboutSection />
          <Shape />
          <Awards />
          <Blog />
          <CTA />
          <Footer />
          <SearchModal />
          <OffcanvasMenu />
        </div>
      </div>
    </div>
  );
};

export default Home;
