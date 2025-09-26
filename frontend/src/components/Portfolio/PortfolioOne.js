import { useEffect, useState } from "react";
// import { Link } from "react-router-dom"; // No longer needed if using <a> for full refresh
import axios from "axios";
import slugify from "../../utils/slungify";
import { transformImageKitUrl } from "../../utils/ImageKitUrlModify"; // Import the utility function

const PortfolioOne = () => {
  const [portfolioItems, setPortfolioItems] = useState([]);

  useEffect(() => {
    const baseUrl = process.env.REACT_APP_API_BASE_URL;
    // Fetch only the first 4 portfolio items
    axios
      .get(`${baseUrl}/projects?limit=4`) // _limit=4 limits the results to 4 items
      .then((response) => setPortfolioItems(response.data))
      .catch((error) => console.error("Error fetching portfolio data:", error));
  }, []);

  return (
    <div className="row">
      <div className="stack-wrapper">
        {portfolioItems.map((item) => (
          <div className="stack-item" key={item._id}>
            <div className="card portfolio-item layout-2 scale has-shadow">
              {/* Using a standard <a> tag for a full page refresh */}
              <a href={`/portfolio-project/${item._id}/${slugify(item.title)}`}>
                <div className="image-holder">
                  {(() => {
                    let smallScreenSrc;
                    let largeScreenSrc;

                    // --- Determine largeScreenSrc ---
                    if (item.thumbnail && item.thumbnail.largeScreen) {
                      largeScreenSrc = transformImageKitUrl(item.thumbnail.largeScreen, {
                        width: 960,
                        height: 540,
                        crop: true,
                        quality: 80,
                        format: "auto",
                      });
                    } else if (item.thumbnail && item.thumbnail.smallScreen) {
                      // Fallback to smallScreen thumbnail if largeScreen not available
                      largeScreenSrc = transformImageKitUrl(item.thumbnail.smallScreen, {
                        width: 960,
                        height: 540,
                        crop: true,
                        quality: 80,
                        format: "auto",
                      });
                    } else if (item.gallery && item.gallery.length > 0) {
                      // Fallback to first gallery image object
                      const firstGalleryItem = item.gallery[0];
                      const gallerySrc = firstGalleryItem.url;
                      largeScreenSrc = transformImageKitUrl(gallerySrc, {
                        width: 960,
                        height: 540,
                        crop: true,
                        quality: 80,
                        format: "auto",
                      });
                    } else {
                      // Ultimate fallback
                      largeScreenSrc = ""; // optional placeholder
                    }

                    // --- Determine smallScreenSrc ---
                    if (item.thumbnail && item.thumbnail.smallScreen) {
                      smallScreenSrc = transformImageKitUrl(item.thumbnail.smallScreen, {
                        width: 384,
                        height: 512,
                        crop: true,
                        quality: 80,
                        format: "auto",
                      });
                    } else if (item.thumbnail && item.thumbnail.largeScreen) {
                      // Fallback to largeScreen thumbnail if smallScreen not available
                      smallScreenSrc = transformImageKitUrl(item.thumbnail.largeScreen, {
                        width: 384,
                        height: 512,
                        crop: true,
                        quality: 80,
                        format: "auto",
                      });
                    } else if (item.gallery && item.gallery.length > 0) {
                      // Fallback to first gallery image object
                      const firstGalleryItem = item.gallery[0];
                      const gallerySrc = firstGalleryItem.url;
                      smallScreenSrc = transformImageKitUrl(gallerySrc, {
                        width: 384,
                        height: 512,
                        crop: true,
                        quality: 80,
                        format: "auto",
                      });
                    } else {
                      // Ultimate fallback
                      smallScreenSrc = ""; // optional placeholder
                    }

                    // Render the picture element using the determined sources
                    return (
                      <picture>
                        {smallScreenSrc && (
                          <source media="(max-width: 768px)" srcSet={smallScreenSrc} />
                        )}
                        <img
                          src={largeScreenSrc}
                          alt={item.title}
                          width="100%"
                          height="100%"
                        />
                      </picture>
                    );
                                      })()}
                  <div className="card-overlay">
                    <div className="heading">
                      <h4 className="title mt-2 mt-md-3 mb-3">{item.title}</h4>
                      <div className="show-project">
                        <div className="card-terms">
                          {item.categories.map((category, index) => (
                            <span className="terms badge outlined" key={index}>
                              {category}
                            </span>
                          ))}
                        </div>
                        <div className="project-link">
                          Show Project
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PortfolioOne;