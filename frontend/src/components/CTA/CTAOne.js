import React from "react";
import MagneticButton from "../Miscellaneous/MagneticButton";

const CTAOne = ({title = "Let's Create Something", highlight = "Together", link = "contact", linkText = "Get In Touch!"}) => {
  const ctaData = {
    sub_title: "Want to collaborate?",
    title: title,
    highlight: highlight,
    button: {
      text: linkText,
      link: link,
      icon: "bi bi-arrow-right",
    },
  };

  return (
    <section className="cta border-top border-light-subtle">
      <div className="container">
        <div className="row justify-content-center text-center">
          <div className="col-12 col-md-10 col-lg-7">
            {/* Subtitle can be added here if needed, based on ctaData.sub_title */}
            {/* For instance: <h3 className="sub-title">{ctaData.sub_title}</h3> */}
            <h2 className="title mb-0 mb-md-2">{ctaData.title}</h2>
            <div className="cta-text">
              <span className="line-item">{ctaData.highlight}</span>
              <span className="line"></span>
              <MagneticButton href={ctaData.button?.link}>
                {ctaData.button?.text}
              </MagneticButton>
            </div>
            {/* If ctaData.socials is empty or null, nothing will be rendered for this block */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTAOne;
