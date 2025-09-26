import React from "react";

import Preloader from "../components/Miscellaneous/Preloader";
import Header from "../components/Header/Header";
import Breadcrumb from "../components/Breadcrumb/BreadcrumbThree";
import Shape from "../components/Shape/Shape";
import Form from "../components/Form/Form";
import Footer from "../components/Footer/Footer";
import SearchModal from "../components/Miscellaneous/SearchModal";
import OffcanvasMenu from "../components/Miscellaneous/OffcanvasMenu";
import MagicCursor from "../components/Miscellaneous/MagicCursor";
import LenisScroll from "../components/Header/LenisScroll";
import { Helmet } from "react-helmet";

const Contact = () => {
  return (
    <>
    <Helmet>
      <title>Get in Touch - INFOSURAJ</title>
      <meta
        name="description"
        content="Have a project in mind or just want to say hello? Reach out to INFOSURAJ for collaborations, inquiries, or feedback."
      />
      <link rel="canonical" href="https://www.infosuraj.com/contact" />
      <meta property="og:title" content="Get in Touch - INFOSURAJ" />
      <meta property="og:description" content="Have a project in mind or just want to say hello? Reach out to INFOSURAJ for collaborations, inquiries, or feedback." />
      <meta property="og:url" content="https://www.infosuraj.com/contact" />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Get in Touch - INFOSURAJ" />
      <meta name="twitter:description" content="Have a project in mind or just want to say hello? Reach out to INFOSURAJ for collaborations, inquiries, or feedback." />
    </Helmet>
    <div>
      {/* Rest of your Contact page content */}
      <MagicCursor />
      <Preloader />
      <LenisScroll />
      <div className="main">
        <Header />
        <div id="main-wrapper" className="main-wrapper">
          <Breadcrumb />
          <Shape />
          <Form />
          <Footer className="footer-area bg-white" />
          <SearchModal />
          <OffcanvasMenu />
        </div>
      </div>
    </div>
    </>
  );
};

export default Contact;
