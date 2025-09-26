import React from "react";
import { useProfile } from "../context/profileContext";
import Preloader from "../components/Miscellaneous/Preloader";
import Header from "../components/Header/Header";
import CTA from "../components/CTA/CTAOne";
import Footer from "../components/Footer/Footer";
import SearchModal from "../components/Miscellaneous/SearchModal";
import OffcanvasMenu from "../components/Miscellaneous/OffcanvasMenu";
import MagicCursor from "../components/Miscellaneous/MagicCursor";
import LenisScroll from "../components/Header/LenisScroll";
import MagneticButton from "../components/Miscellaneous/MagneticButton";
import { Helmet } from "react-helmet";

const ResumeViewer = () => {
  const { profile } = useProfile();
  const pdfUrl = profile?.resume || "";
    const pdfData = {
      button: {
        text: "Download Resume",
        link: pdfUrl,
        icon: "bi bi-arrow-right",
      },
    };
  return (
    <>
      <Helmet>
        <title>Resume - INFOSURAJ</title>
        <meta name="description" content="View and download Suraj's professional resume showcasing skills, experience, and accomplishments in web development and design." />
        <meta property="og:title" content="Resume - INFOSURAJ" />
        <meta property="og:description" content="View and download Suraj's professional resume showcasing skills, experience, and accomplishments in web development and design." />
        <meta property="og:image" content="%PUBLIC_URL%/img/og-resume.jpg" /> {/* Use a representative image */}
        <meta property="og:url" content="https://infosuraj.com/resume" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Resume - INFOSURAJ" />
        <meta name="twitter:description" content="View and download Suraj's professional resume showcasing skills, experience, and accomplishments in web development and design." />
        <meta name="twitter:image" content="%PUBLIC_URL%/img/og-resume.jpg" />
      </Helmet>
      {/* Top-level miscellaneous components */}
      <MagicCursor />
      <Preloader />
      <LenisScroll />

      <div className="main">
        <Header />
        <div id="main-wrapper" className="main-wrapper"></div>

        <section className="resume-section">
          <div className="resume-container">
            {/* --- Call to Action Download Button --- */}
            <div className="cta-container">
            <MagneticButton href={pdfData.button?.link} target="_blank" rel="noopener noreferrer" download="msurajkumar_resume.pdf">
                {pdfData.button?.text}
            </MagneticButton>
            </div>

            {/* --- Responsive PDF Viewer --- */}
            <div className="pdf-viewer-container">
              <iframe
                src={pdfUrl}
                title="Resume Viewer"
                className="pdf-iframe"
              ></iframe>
            </div>
          </div>
        </section>

        {/* Additional Sections */}
        <CTA />
        <Footer />
        <SearchModal />
        <OffcanvasMenu />
      </div>
    </>
  );
};

export default ResumeViewer;
