import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import slugify from "../../utils/slungify";
import { transformImageKitUrl } from "../../utils/ImageKitUrlModify"; // Import the utility function

const PortfolioTwo = () => {
  const [portfolioData, setportfolioData] = useState(null);
  const [activeFilter, setActiveFilter] = useState("all");

  useEffect(() => {
    const baseUrl = process.env.REACT_APP_API_BASE_URL;
    axios
      .get(`${baseUrl}/projects`)
      .then((response) => {
        setportfolioData(response.data.reverse());
      })
      .catch((error) => console.error("Error fetching portfolio data:", error));
  }, []);

  const categories = [
    { id: "all", label: "All" },
    { id: "web-development", label: "Web Development" },
    { id: "art", label: "Art" },
    { id: "photography", label: "Photography" },
    { id: "digital-marketing", label: "Digital Marketing" },
  ];

  if (!portfolioData) {
    return <div>Loading portfolio...</div>;
  }

  const handleFilterClick = (id) => {
    setActiveFilter(id);
  };

  const getCategoryCount = (category) => {
    if (!portfolioData) return "00";
    const count =
      category === "all"
        ? portfolioData.length
        : portfolioData.filter((item) => item.categories.includes(category))
            .length;
    // We return the raw number now, padding will be done where it's displayed
    return count;
  };

  const filteredData =
    activeFilter === "all"
      ? portfolioData
      : portfolioData.filter((item) => item.categories.includes(activeFilter));

  // SENSIBLE UPDATE: 1. Create a new list of only the categories that should be visible.
  const visibleCategories = categories.filter(
    (category) => category.id === "all" || getCategoryCount(category.id) > 0
  );

  return (
    <section className="works explore-area portfolio-filter pt-0">
      <div className="container p-0">
        <div className="row justify-content-center text-center">
          <div className="col-12">
            <div
              className="btn-group filter-menu"
              role="group"
              aria-label="Basic radio toggle button group"
            >
              {/* SENSIBLE UPDATE: 2. Map over the new `visibleCategories` array. */}
              {visibleCategories.map(({ id, label }) => (
                <div
                  key={id}
                  className="input-item d-flex"
                  onClick={() => handleFilterClick(id)}
                >
                  <div className="content">
                    <input
                      type="radio"
                      className="btn-check filter-btn"
                      name="shuffle-filter"
                      id={id}
                      value={id}
                      checked={activeFilter === id}
                      onChange={() => handleFilterClick(id)}
                    />
                    <label className="btn" htmlFor={id}>
                      {label}
                    </label>
                  </div>
                  {/* Display the count with padding */}
                  <span className="count">
                    {getCategoryCount(id).toString().padStart(2, "0")}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="row filter-items items inner">
          {filteredData.map((item) => (
            <div
              key={item._id}
              className="col-12 col-lg-4 item filter-item"
              data-groups={JSON.stringify(item.categories)}
            >
              <div className="card portfolio-item layout-2 scale has-shadow">
                <div className="image-holder">
                  {(() => {
                    const mobileThumbnailSrc = (() => {
                    // 1. Prioritize the dedicated smallScreen thumbnail
                    if (item.thumbnail && item.thumbnail.smallScreen) {
                      return transformImageKitUrl(item.thumbnail.smallScreen, {width: 384, height: 512, crop: true, quality: 80, format: "auto"});
                    }else if (item.thumbnail && item.thumbnail.largeScreen){
                        return transformImageKitUrl(item.thumbnail.largeScreen, {width: 384, height: 512, crop: true, quality: 80, format: "auto"});
                    }
                    // 2. Fallback to the first gallery image if available
                    else if (item.gallery && item.gallery.length > 0) {
                      let url = item.gallery[0];
                      if (url.endsWith(".mp4") || url.includes("video")) {
                        url = transformImageKitUrl(url,{ width: 384, height: 512, crop: true, quality: 80, format: "auto", isThumbnail: true });
                      }
                      return transformImageKitUrl(url, {width: 384, height: 512, crop: true, quality: 80, format: "auto"})
                    }
                    // 3. Ultimate fallback if no image sources are found
                    return "/path/to/mobile-placeholder.jpg"; // Provide a default placeholder URL
                  })();
                    return (
                      <a className="card-thumb" href={`/portfolio-project/${item._id}/${slugify(item.title)}`}>
                        <img src={mobileThumbnailSrc} alt={item.title} width='100%'/>
                      </a>
                    );
                  })()}
                </div>
                <div className="card-content p-2">
                  <div className="heading">
                    <h4 className="title mt-2 mt-md-3 mb-3">{item.title}</h4>
                    <div className="show-project">
                      <div className="card-terms">
                        {Array.isArray(item.categories)
                          ? item.categories.map((category, index) => (
                              <a
                                key={index}
                                className="terms badge"
                                href="/portfolio"
                              >
                                {category.replace("-", " ")}
                              </a>
                            ))
                          : null}
                      </div>
                      <div className="project-link">
                        <a href={`/portfolio-project/${item._id}/${slugify(item.title)}`}>Show Project</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PortfolioTwo;