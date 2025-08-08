import React from "react";

import Preloader from "../components/Miscellaneous/Preloader";
import Header from "../components/Header/Header";
import PortfolioSection from "../components/Portfolio/PortfolioSingleSection";
import CTA from "../components/CTA/CTAOne";
import Footer from "../components/Footer/Footer";
import SearchModal from "../components/Miscellaneous/SearchModal";
import OffcanvasMenu from "../components/Miscellaneous/OffcanvasMenu";
import MagicCursor from "../components/Miscellaneous/MagicCursor";
import LenisScroll from "../components/Header/LenisScroll";

const PortfolioSingle = () => {
  return (
    <div>
      <title>Projects & Work - INFOSURAJ</title>
      <meta
        name="description"
        content="Explore a collection of Suraj's latest web development, design, and software projects. See Suraj's work in action and learn about Suraj's expertise."
      />
      <MagicCursor />
      <Preloader />
      <LenisScroll />
      <div className="main">
        <Header />
        <div id="main-wrapper" className="main-wrapper">
          <PortfolioSection />
          <CTA />
          <Footer />
          <SearchModal />
          <OffcanvasMenu />
        </div>
      </div>
    </div>
  );
};

export default PortfolioSingle;
