import React from 'react';
import BlogOne from './BlogOne';

const BlogRelated = ({ title = "Related Posts" }) => {
return (
	<section className="blog">
		<div className="container">
			<div className="row">
				<div className="col-12">
					{/* Intro */}
					<div className="intro d-flex justify-content-between align-items-center">
					<h3 className="title">{title}</h3>
					</div>
				</div>
			</div>
			{/* BlogOne Component */}
			<BlogOne />
		</div>
	</section>
);
};

export default BlogRelated;
