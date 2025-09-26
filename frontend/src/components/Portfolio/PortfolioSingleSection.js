import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { transformImageKitUrl } from "../../utils/ImageKitUrlModify";
import "./portfolio.css";

// Import react-slick and its styles
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Custom Next Arrow Component
const NextArrow = ({ className, style, onClick, isDarkMode }) => {
  return (
    <div
      className={className}
      style={{
        ...style,
        right: "25px",
        zIndex: 1,
        background: "var(--arrow-bg-color)", // background variable
        borderRadius: "50%",
        height: "40px",
        width: "40px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      onClick={onClick}
    >
      <i
        className="bi bi-arrow-right-short"
        style={{ color: "var(--arrow-icon-color)" }} // ✅ use arrow icon variable
      ></i>
    </div>
  );
};

// Custom Previous Arrow Component
const PrevArrow = ({ className, style, onClick, isDarkMode }) => {
  return (
    <div
      className={className}
      style={{
        ...style,
        left: "25px",
        zIndex: 1,
        background: "var(--arrow-bg-color)", // background variable
        borderRadius: "50%",
        height: "40px",
        width: "40px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      onClick={onClick}
    >
      <i
        className="bi bi-arrow-left-short"
        style={{ color: "var(--arrow-icon-color)" }} // ✅ use arrow icon variable
      ></i>
    </div>
  );
};

const PortfolioSingleSection = () => {
  const [portfolio, setPortfolio] = useState(null);
  const { projectId } = useParams();

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
    variableWidth: true, // default (desktop/tablet)
    responsive: [
      {
        breakpoint: 768, // Mobile breakpoint
        settings: {
          slidesToShow: 1,
          centerMode: false,
          variableWidth: false, // disable variable width on mobile
        },
      },
    ],
  };


  return (
    <section className="content">
      <div className="container">
        <div className="portfolio-meta d-flex align-items-center">
          {portfolio.categories?.length > 0 && (
            <div className="portfolio-terms">
              {portfolio.categories.map((cat, idx) => (
                <label key={idx} className="terms">
                  {cat.toUpperCase()}
                </label>
              ))}
            </div>
          )}
          {portfolio.date && <span className="date">{portfolio.date}</span>}
        </div>
        {/* Portfolio Gallery */}
        <div className="portfolio-gallery mt-4" style={{padding: "20px" }}>
          
          <Slider {...sliderSettings}>
            {galleryItems.map((item, idx) => (
              <div key={idx}>
                <div className="gallery-item-style">
                  {item.isVideo ? (
                    <video
                      src={item.url}
                      controls
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
                </div>
              </div>
            ))}
          </Slider>
        </div>
        {/* ... Portfolio Info section remains unchanged ... */}
        <div className="row justify-content-between">
          <h2>{portfolio.title}</h2>
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
                      <label key={idx} className="terms">
                        {role}
                      </label>
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
            {portfolio.liveSite && portfolio.liveSite !== "#" && (
              <div className="socials item">
                <a
                  className="nav-link d-inline-flex swap-icon ms-0"
                  href={portfolio.liveSite}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Live Site <i className="icon bi bi-arrow-right-short"></i>
                </a>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* View All Button */}
      <div className="align-items-center mt-5 justify-content-center d-flex">
        <a className="btn btn-outline content-btn swap-icon" href="/portfolio">
          View All <i className="icon bi bi-arrow-right-short"></i>
        </a>
      </div>
    </section>
  );
};

export default PortfolioSingleSection;