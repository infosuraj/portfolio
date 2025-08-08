import React from 'react';
import BlogOne from './BlogOne';

const BlogSection = ({ title = "Insights", viewAllLink = "/blog" }) => {
return (
	<section className="blog">
		<div className="container">
			<div className="row">
				<div className="col-12">
					{/* Intro */}
					<div className="intro d-flex justify-content-between align-items-center">
					<h3 className="title">{title}</h3>
					<a className="btn btn-outline content-btn swap-icon" href={viewAllLink}>
						View All <i className="icon bi bi-arrow-right-short"></i>
					</a>
					</div>
				</div>
			</div>
			{/* BlogOne Component */}
			<BlogOne />
		</div>
	</section>
);
};

export default BlogSection;
