import React from "react";
import MagneticButton from '../Miscellaneous/MagneticButton';

const staticCtaData = {
  "sub_title": "Want to collaborate?",
  "title": "Let's Create Something",
  "highlight": "Together",
  "button": {
    "text": "Get In Touch!",
    "link": "contact",
    "icon": "bi bi-arrow-right"
  }
};

const CTATwo = () => {
	const ctaData = staticCtaData;

	return (
		<section className="cta layout-2 primary-bg">
			<div className="container">
				<div className="row justify-content-between">
					<div className="col-12 col-md-8 col-lg-7">
						<div className="cta-text">
							<span className="sub-title">{ctaData.sub_title}</span>
							<h2 className="title mt-3 mb-0">
								{ctaData.title} <span>{ctaData.highlight}</span>
							</h2>
						</div>
					</div>
					<div className="col-12 col-md-4 col-lg-5 text-md-end mt-3 mt-md-0">
						<MagneticButton 
							href={ctaData.button?.link}
							>
							{ctaData.button?.text}
						</MagneticButton>
					</div>
				</div>
			</div>
		</section>
	);
};

export default CTATwo;
