import React from 'react';
import BlogTwo from './BlogTwo';

const BlogSection = ({ title = "Insights", viewAllLink = "/blog" }) => {
return (
	<section className="blog pt-0">
		<div className="container">
			{/* BlogOne Component */}
			<BlogTwo />
		</div>
	</section>
);
};

export default BlogSection;
