import React from "react";

import Preloader from "../components/Miscellaneous/Preloader";
import Header from "../components/Header/Header";
import CTA from "../components/CTA/CTAOne";
import Footer from "../components/Footer/Footer";
import SearchModal from "../components/Miscellaneous/SearchModal";
import OffcanvasMenu from "../components/Miscellaneous/OffcanvasMenu";
import MagicCursor from "../components/Miscellaneous/MagicCursor";
import LenisScroll from "../components/Header/LenisScroll";

const NotFoundPage = () => {
  return (
    <div>
      <title>INFOSURAJ - Page Not Found</title>
      <meta
        name="description"
        content="Oops! This page isn't available. Explore INFOSURAJ for modern web development insights, innovative projects, and tailored digital solutions."
      />
      <MagicCursor />
      <Preloader />
      <LenisScroll />
      <div className="main">
        <Header />
        <div id="main-wrapper" className="main-wrapper"></div>
          <CTA title="Looks Like We Missed a " highlight="Step" link="/" linkText="Go Home"/>
          <Footer />
          <SearchModal />
          <OffcanvasMenu />
        </div>
      </div>
  );
};

export default NotFoundPage;
