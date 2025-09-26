import React from "react";

import Preloader from "../components/Miscellaneous/Preloader";
import Header from "../components/Header/Header";
import Breadcrumb from "../components/Breadcrumb/BreadcrumbTwo";
import PortfolioSection from "../components/Portfolio/PortfolioTwo";
import CTA from "../components/CTA/CTATwo";
import Footer from "../components/Footer/Footer";
import SearchModal from "../components/Miscellaneous/SearchModal";
import OffcanvasMenu from "../components/Miscellaneous/OffcanvasMenu";
import MagicCursor from "../components/Miscellaneous/MagicCursor";
import LenisScroll from "../components/Header/LenisScroll";
import { Helmet } from "react-helmet";

const Portfolio = () => {
  return (
    <>
      <Helmet>
        <title>Projects & Work - INFOSURAJ</title>
        <meta
          name="description"
          content="Explore a collection of Suraj's latest web development, design, and software projects. See Suraj's work in action and learn about Suraj's expertise."
        />
        {/* Open Graph / Facebook */}
        <meta property="og:title" content="Projects & Work - INFOSURAJ" />
        <meta
          property="og:description"
          content="Explore a collection of Suraj's latest web development, design, and software projects. See Suraj's work in action and learn about Suraj's expertise."
        />
        <meta property="og:image" content="%PUBLIC_URL%/img/og-projects.jpg" />{" "}
        {/* Use a representative image */}
        <meta property="og:url" content="https://infosuraj.com/portfolio" />
        <meta property="og:type" content="website" />
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Projects & Work - INFOSURAJ" />
        <meta
          name="twitter:description"
          content="Explore a collection of Suraj's latest web development, design, and software projects. See Suraj's work in action and learn about Suraj's expertise."
        />
        <meta name="twitter:image" content="%PUBLIC_URL%/img/og-projects.jpg" />
      </Helmet>

      <div>
        <MagicCursor />
        <Preloader />
        <LenisScroll />
        <div className="main">
          <Header />
          <div id="main-wrapper" className="main-wrapper">
            <Breadcrumb />
            <PortfolioSection />
            <CTA />
            <Footer className="footer-area bg-white" />
            <SearchModal />
            <OffcanvasMenu />
          </div>
        </div>
      </div>
    </>
  );
};

export default Portfolio;
