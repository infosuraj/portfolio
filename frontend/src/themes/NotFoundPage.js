import React from "react";

import Preloader from "../components/Miscellaneous/Preloader";
import Header from "../components/Header/Header";
import CTA from "../components/CTA/CTAOne";
import Footer from "../components/Footer/Footer";
import SearchModal from "../components/Miscellaneous/SearchModal";
import OffcanvasMenu from "../components/Miscellaneous/OffcanvasMenu";
import MagicCursor from "../components/Miscellaneous/MagicCursor";
import LenisScroll from "../components/Header/LenisScroll";
import { Helmet } from "react-helmet";

const NotFoundPage = () => {
  return (
    <>
      <Helmet>
      <title>404 INFOSURAJ - Page Not Found</title>
      <meta
        name="description"
        content="404 Oops! This page isn't available. Explore INFOSURAJ for modern web development insights, innovative projects, and tailored digital solutions."
      />
      </Helmet>
      <meta name="robots" content="noindex, follow" />
      <meta property="og:title" content="404 INFOSURAJ - Page Not Found" />
      <meta property="og:description" content="This page isn't available. Explore INFOSURAJ for web development insights and innovative projects." />
      <meta property="og:url" content="https://infosuraj.com/404" />
      <meta property="og:type" content="website" />
      <div>
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
      </>
  );
};

export default NotFoundPage;
