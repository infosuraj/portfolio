import React, { useState, useEffect } from "react";
import { transformImageKitUrl } from "../utils/ImageKitUrlModify"; // Import the utility function

import Preloader from "../components/Miscellaneous/Preloader";
import Header from "../components/Header/Header";
import Breadcrumb from "../components/Breadcrumb/BreadcrumbOne";
import Shape from "../components/Shape/Shape";
import Experiences from "../components/Experiences/Experiences";
import AnimatedImage from "../components/AnimatedImage/AnimatedImage";
import Skills from "../components/Skills/Skills";
import FAQ from "../components/FAQ/FAQ";
import CTA from "../components/CTA/CTAOne";
import Footer from "../components/Footer/Footer";
import SearchModal from "../components/Miscellaneous/SearchModal";
import OffcanvasMenu from "../components/Miscellaneous/OffcanvasMenu";
import MagicCursor from "../components/Miscellaneous/MagicCursor";
import LenisScroll from "../components/Header/LenisScroll";
import { useProfile } from "../context/profileContext";

const About = () => {
  const { profile, loading } = useProfile();
  const [imgSrc, setImgSrc] = useState("/img/case-1.jpg");
  useEffect(() => {
    if (profile) {
      setImgSrc(
        transformImageKitUrl(profile?.banner, {width: 1920, height: 1200, crop: false, quality: 80, format: "auto"})
      );
    }
  }, [profile, loading]);
  return (
    <div>
      <title>About - INFOSURAJ</title>
      <meta
        name="description"
        content="Learn more about Suraj, my journey in web development, design philosophy, and what drives my passion for creating engaging digital experiences."
      />
      <MagicCursor />
      <Preloader />
      <LenisScroll />
      <div className="main">
        <Header />
        <div id="main-wrapper" className="main-wrapper">
          <Breadcrumb />
          <Shape />
          <Experiences />
          <AnimatedImage imageSrc={imgSrc} altText="Case Image" />
          <Skills />
          <FAQ />
          <CTA />
          <Footer />
          <SearchModal />
          <OffcanvasMenu />
        </div>
      </div>
    </div>
  );
};

export default About;
