import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import ReactPlayer from 'react-player'
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import { transformImageKitUrl } from "../../utils/ImageKitUrlModify"; // Import the utility function

// Optional: Add some basic CSS for the aspect ratio container
// You'd typically put this in a CSS file, e.g., styles.css
/*

*/

const PortfolioSingleSection = () => {
    const [portfolio, setPortfolio] = useState(null);
    const { projectId } = useParams();

    useEffect(() => {
        const baseUrl = process.env.REACT_APP_API_BASE_URL; // Using REACT_APP_API_API_URL as per original code context
        axios
            .get(`${baseUrl}/projects/${projectId}`)
            .then((response) => {
                setPortfolio(response.data);
            })
            .catch((error) => console.error("Error fetching portfolio data:", error));
    }, [projectId]);

    const galleryItems = useMemo(() => {
        if (!portfolio?.gallery || portfolio.gallery.length === 0) {
            return [];
        }

        return portfolio.gallery.map((url) => {
            const isVideo = url.endsWith(".mp4") || url.includes("video");

            return isVideo
                ? {
                      original: url,
                      embedUrl: url,
                      thumbnail: transformImageKitUrl(url, { width: 600, quality: 80, format: "auto", isThumbnail: true }),
                      renderItem: () => (
                        <ReactPlayer src={url} width="100%" height='100%' style={{maxHeight: 'calc(100vh - 80px)'}} autoPlay={true} controls={true} loop={true} muted={true}/>
                          // <video controls width="100%" height="auto"> {/* Added height="auto" */}
                          //     <source src={url} type="video/mp4" />
                          //     Your browser does not support the video tag.
                          // </video>
                      ),
                  }
                : {
                      original: transformImageKitUrl(url, {width: 1000, quality: 80, format: "auto"}),
                      thumbnail: transformImageKitUrl(url, {width: 600, quality: 80, format: "auto"})
                  };
        });
    }, [portfolio]);

    if (!portfolio) {
        return <p>Loading...</p>;
    }

    return (
        <section className="content">
            <div className="container">
                <div className="row justify-content-between">
                    <div className="col-12 col-lg-5">
                        <div className="heading">
                            <div className="portfolio-meta d-flex align-items-center">
                                {portfolio.categories && portfolio.categories.length > 0 && (
                                    <div className="portfolio-terms">
                                        {portfolio.categories.map((category, index) => (
                                            <label key={index} className="terms">
                                                {category.toUpperCase()}
                                            </label>
                                        ))}
                                    </div>
                                )}
                                {portfolio.date && (
                                    <span className="date">{portfolio.date}</span>
                                )}
                            </div>
                            <h2>{portfolio.title}</h2>
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
                            {portfolio.role && portfolio.role.length > 0 && (
                                <div className="role">
                                    <h6 className="title mt-0 mb-1 mb-md-3">Role/Services</h6>
                                    <div className="portfolio-terms">
                                        {portfolio.role.map((role, index) => (
                                            <label key={index} className="terms">
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
                                    <h6 className="title mt-0 mb-1 mb-md-3">
                                        Category &amp; Year
                                    </h6>
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
                <div className="row portfolio-content items">
                    <div className="col-12">
                        {/* Wrapper for ImageGallery to provide a stable initial size */}
                        {galleryItems.length > 0 && (
                            <div className="image-gallery-wrapper"> {/* Adjust minHeight as needed */}
                                <ImageGallery
                                  items={galleryItems}
                                  showPlayButton={false} // You already had this, keeping it
                                  infinite={true}       // You already had this, keeping it
                                  lazyLoad={true}       // You already had this, keeping it
                                  showThumbnails={true}           // Display thumbnails below the main image
                                  thumbnailPosition="bottom"      // Position thumbnails at the bottom (can be 'top', 'left', 'right')
                                  showFullscreenButton={true}     // Allow users to view images in fullscreen
                                  useBrowserFullscreen={true}     // Use browser's native fullscreen API for a smoother experience
                                  showNavigation={true}           // Show left/right navigation arrows
                                  autoPlay={false}                // Set to true if you want the gallery to auto-advance
                                  slideInterval={3000}            // Time in milliseconds for auto-advance (e.g., 3 seconds)
                                  slideDuration={450}             // Duration of the slide transition in milliseconds
                                  isRTL={false}                   // Set to true for Right-To-Left language support
                                  flickThreshold={0.4}            // Speed needed to trigger a flick navigation
                                  stopPropagation={false}         // Prevent event bubbling on certain interactions
                                />
                            </div>
                        )}
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