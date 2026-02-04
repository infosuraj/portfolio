import React, { useEffect, useState, useMemo, useRef } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { transformImageKitUrl } from "../../utils/ImageKitUrlModify";
import "./portfolio.css";

// Import react-slick and its styles
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Custom Next Arrow Component for Slider
const NextArrow = ({ className, style, onClick }) => (
  <div
    className={className}
    style={{
      ...style,
      right: "25px",
      zIndex: 1,
      background: "var(--arrow-bg-color)",
      borderRadius: "50%",
      height: "40px",
      width: "40px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}
    onClick={onClick}
  >
    <i className="bi bi-arrow-right-short" style={{ color: "var(--arrow-icon-color)" }}></i>
  </div>
);

// Custom Previous Arrow Component for Slider
const PrevArrow = ({ className, style, onClick }) => (
  <div
    className={className}
    style={{
      ...style,
      left: "25px",
      zIndex: 1,
      background: "var(--arrow-bg-color)",
      borderRadius: "50%",
      height: "40px",
      width: "40px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}
    onClick={onClick}
  >
    <i className="bi bi-arrow-left-short" style={{ color: "var(--arrow-icon-color)" }}></i>
  </div>
);

const PortfolioSingleSection = () => {
  const [portfolio, setPortfolio] = useState(null);
  const { projectId } = useParams();
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const overlaySliderRef = useRef(null);
  const [activeOverlayIndex, setActiveOverlayIndex] = useState(0);

  useEffect(() => {
    const baseUrl = process.env.REACT_APP_API_BASE_URL;
    axios
      .get(`${baseUrl}/projects/${projectId}`)
      .then((res) => setPortfolio(res.data))
      .catch((err) => console.error(err));
  }, [projectId]);

  const galleryItems = useMemo(() => {
    if (!portfolio?.gallery || portfolio.gallery.length === 0) return [];
    return portfolio.gallery.map((item) => ({
      url: item.url,
      thumbnail: item.thumbnail || item.url,
      isVideo: item.url.endsWith(".mp4") || item.url.includes("video"),
    }));
  }, [portfolio]);

  // Handlers for Overlay Navigation
  const openOverlay = (index) => {
  setActiveOverlayIndex(index);
  setIsOverlayOpen(true);
  document.body.style.overflow = "hidden";

  setTimeout(() => {
    overlaySliderRef.current?.slickGoTo(index, true);

    // force play active slide video
    setTimeout(() => {
      const activeVideo = document.querySelector(
        ".overlay-slider-wrapper .slick-slide.slick-active video"
      );
      activeVideo?.play().catch(() => {});
    }, 50);
  }, 50);
};


  const closeOverlay = () => {
    setIsOverlayOpen(false);
    document.body.style.overflow = "auto";
  };

  if (!portfolio) return <p>Loading...</p>;

  const sliderSettings = {
    className: "slider variable-width",
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    centerMode: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    variableWidth: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          centerMode: false,
          variableWidth: false,
        },
      },
    ],
  };
  
  const overlaySliderSettings = {
  dots: true,
  dotsClass: "slick-dots overlay-dots",
  infinite: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  centerMode: false,      // IMPORTANT
  variableWidth: false,
  arrows: true,
  nextArrow: <NextArrow />,
  prevArrow: <PrevArrow />,
  swipeToSlide: true,
  beforeChange: () => {
  document.querySelectorAll(".overlay-slider-wrapper video").forEach(v => {
    v.pause();
    v.currentTime = 0;
  });
},
afterChange: (current) => {
  setActiveOverlayIndex(current);

  // play only the CURRENT visible slide's video
  setTimeout(() => {
    const activeSlide = document.querySelector(
      ".overlay-slider-wrapper .slick-slide.slick-active video"
    );
    activeSlide?.play().catch(() => {});
  }, 50);
},
};

  return (
    <section className="content">
      <div className="container">
        <div className="portfolio-meta d-flex align-items-center">
          {portfolio.categories?.length > 0 && (
            <div className="portfolio-terms">
              {portfolio.categories.map((cat, idx) => (
                <label key={idx} className="terms">{cat.toUpperCase()}</label>
              ))}
            </div>
          )}
          {portfolio.date && <span className="date">{portfolio.date}</span>}
        </div>

        {/* Portfolio Slider Section */}
        <div className="portfolio-gallery mt-4">
           <Slider {...sliderSettings}>
             {galleryItems.map((item, idx) => (
                <div key={idx} style={{ width: 'auto' }}>
                   <div className="gallery-item-style">
                  {item.isVideo ? (
                    <video
                     src={item.url} 
                      className="only-play-pause"
                      controls 
                      controlsList="nodownload nofullscreen noremoteplayback" 
                      autoPlay={false}
                      loop 
                      muted 
                      poster={item.thumbnail}
                    />
                  ) : (
                    <img
                      src={transformImageKitUrl(item.url, { height: 600 })}
                      alt={`slide-${idx}`}
                    />
                  )}
                  {/* Overlay trigger button */}
                  <div className="zoom-trigger" onClick={() => openOverlay(idx)}>
                        <i className="bi bi-arrows-angle-expand"></i>
                      </div>
                   </div>
                </div>
             ))}
           </Slider>
        </div>

        {/* SWIPEABLE OVERLAY */}
        {isOverlayOpen && (
  <div className="portfolio-custom-overlay" onClick={closeOverlay}>
    <div className="overlay-frame" onClick={(e) => e.stopPropagation()}>
      <button className="overlay-close" onClick={closeOverlay}>&times;</button>

      <div className="overlay-slider-wrapper">
        <Slider ref={overlaySliderRef} {...overlaySliderSettings}>
                  {galleryItems.map((item, idx) => {
                    const isActive = activeOverlayIndex === idx;

                    return (
                      <div key={idx} className={`overlay-slide-item ${isActive ? 'active' : ''}`}>
                        <div className="overlay-media-container">
                          {item.isVideo ? (
                            <video
                                src={item.url}
                                controls
                                playsInline
                                autoPlay
                                className="overlay-media"
                              />
                          ) : (
                            <img src={item.url} alt="Full view" className="overlay-media" />
                          )}
                        </div>
                      </div>
                    );
                  })}
                </Slider>
              </div>
            </div>
          </div>
        )}


        {/* Portfolio Description Section */}
        <div className="row justify-content-between mt-5">
          <div className="col-12">
            <h2>{portfolio.title}</h2>
          </div>
          <div className="col-12 col-lg-5">
            <div className="heading">
              {portfolio.description && <p>{portfolio.description}</p>}
            </div>
          </div>
          <div className="col-12 col-lg-6 items portfolio-meta mt-3 mt-md-0">
            {portfolio.task && (
              <div className="task">
                <h6 className="title mb-3">Task</h6>
                <p className="details">{portfolio.task}</p>
              </div>
            )}
            <div className="content item d-flex flex-column flex-md-row justify-content-between">
              {portfolio.role?.length > 0 && (
                <div className="role">
                  <h6 className="title mt-0 mb-1 mb-md-3">Role/Services</h6>
                  <div className="portfolio-terms">
                    {portfolio.role.map((role, idx) => (
                      <label key={idx} className="terms">{role}</label>
                    ))}
                  </div>
                </div>
              )}
              {portfolio.client && (
                <div className="client my-3 my-md-0">
                  <h6 className="title mt-0 mb-1 mb-md-3">Client</h6>
                  <span>{portfolio.client}</span>
                </div>
              )}
              {portfolio.categoryYear && (
                <div className="category">
                  <h6 className="title mt-0 mb-1 mb-md-3">Category & Year</h6>
                  <span>{portfolio.categoryYear}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="align-items-center mt-5 justify-content-center d-flex">
        <a className="btn btn-outline content-btn swap-icon" href="/portfolio">
          View All <i className="icon bi bi-arrow-right-short"></i>
        </a>
      </div>
    </section>
  );
};

export default PortfolioSingleSection;