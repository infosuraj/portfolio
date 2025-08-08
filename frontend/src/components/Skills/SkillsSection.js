import React, { useEffect, useState, useRef } from "react";
import axios from "axios";

const SkillsSection = () => {
  const [skillsData, setSkillsData] = useState(null);
  const skillsRef = useRef(null);

  useEffect(() => {
    const baseUrl = process.env.REACT_APP_API_BASE_URL;
    axios
      .get(`${baseUrl}/skills`)
      .then((response) => {
        // Assuming response.data is an array and you want the first (or only) document
        setSkillsData(response.data[0]);
      })
      .catch((error) => {
        console.error("Error fetching skills data:", error);
      });
  }, []); // Empty dependency array means this runs once on mount

  useEffect(() => {
    // Only observe if skillsData is available and the ref is set
    if (!skillsData || !skillsRef.current) return;

    // Capture the current value of the ref at the time the effect runs
    const currentSkillsRef = skillsRef.current;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // Find all progress bars within the observed element
            const progressBars = entry.target.querySelectorAll('.progress-bar');
            progressBars.forEach(progressBar => {
              const value = progressBar.getAttribute('data-progress');
              progressBar.style.opacity = 1;
              progressBar.style.width = `${value}%`;
            });
            // Stop observing once animation has triggered
            if (currentSkillsRef) {
              observer.unobserve(currentSkillsRef);
            }
          }
        });
      },
      { threshold: 0.3 } // Trigger when 30% of the element is visible
    );

    if (currentSkillsRef) {
      observer.observe(currentSkillsRef);
    }

    // Cleanup function for the observer
    return () => {
      if (currentSkillsRef) {
        observer.unobserve(currentSkillsRef);
      }
      observer.disconnect(); // Good practice to disconnect the observer in cleanup
    };
  }, [skillsData]); // Re-run effect if skillsData changes

  // If no skillsData or if both items and skillsProgress are empty, render nothing
  if (!skillsData || (skillsData.items?.length === 0 && skillsData.skillsProgress?.length === 0)) {
    return null;
  }

  return (
    <div className="row justify-content-between" ref={skillsRef}>
      {/* Intro Section - remains in col-lg-3 */}
      <div className="col-12 col-lg-3">
        <div className="intro">
          <h3 className="title">Crafting Unique Skills</h3>
        </div>
      </div>

      {/* Main Content Area for Skills and Progress - takes col-lg-8 */}
      <div className="col-12 col-lg-8">
        <div className="row items">
          {skillsData.items && skillsData.items.length > 0 && skillsData.items.map((item, index) => (
            <div key={item._id || index} className="col-12 col-md-6 item">
              <div className="content">
                <div className="heading d-flex align-items-center">
                  <h2 className="title m-0">{item.value}</h2>
                </div>
                <span>{item.label}</span>
                <p className="mt-3">{item.description}</p>
              </div>
            </div>
          ))}

          {/* Skills Progress Categories Section */}
          {skillsData.skillsProgress && skillsData.skillsProgress.length > 0 && skillsData.skillsProgress.map((category, catIndex) => (
            <div key={category._id || catIndex} className="col-12 col-md-6 item">
              <div className="content">
                {/* Category Title */}
                <h3 className="category-title mb-4" style={{marginTop: '20px', marginBottom: '20px'}}>{category.categoryTitle}</h3>

                {/* Individual Skills within this Category */}
                {category.skills && category.skills.length > 0 && category.skills.map((skill, skillIndex) => (
                  <div key={skillIndex} className="progress" style={{marginTop: '50px', marginBottom: '60px'}}>
                    <span className="title">{skill.name}</span> {/* Changed skill.title to skill.name */}
                    <div
                      className="progress-bar"
                      data-progress={skill.progress}
                      style={{ opacity: 0, width: '0%' }}
                    >
                      <span>{skill.progress}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SkillsSection;
