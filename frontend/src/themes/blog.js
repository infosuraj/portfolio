import React from 'react';

import Preloader from '../components/Miscellaneous/Preloader';
import Header from '../components/Header/Header';
import Breadcrumb from '../components/Breadcrumb/BreadcrumbFour';
import BlogSection from '../components/Blog/BlogSectionTwo';
import Footer from '../components/Footer/Footer';
import SearchModal from '../components/Miscellaneous/SearchModal';
import OffcanvasMenu from '../components/Miscellaneous/OffcanvasMenu';
import MagicCursor from '../components/Miscellaneous/MagicCursor';
import LenisScroll from '../components/Header/LenisScroll';
import { Helmet } from 'react-helmet';

const Blog = () => {
    return (
		<>
		<Helmet>
			<title>Latest Blog Posts & Articles - INFOSURAJ</title>
            <meta name="description" content="Explore a wide range of articles and insights on web development, technology, design, and more from Suraj." />
			<meta name="keywords" content="blog, articles, web development, technology, design, programming, tutorials, tips, insights" />
			<meta name="author" content="Suraj" />
			<meta name="viewport" content="width=device-width, initial-scale=1.0" />
			<link rel="canonical" href="https://www.infosuraj.com/blog" />
			<meta property="og:title" content="Latest Blog Posts & Articles - INFOSURAJ" />
			<meta property="og:description" content="Explore a wide range of articles and insights on web development, technology, design, and more from Suraj." />
			<meta property="og:type" content="website" />
			<meta property="og:url" content="https://www.infosuraj.com/blog" />
			<meta name="twitter:card" content="summary_large_image" />
			<meta name="twitter:title" content="Latest Blog Posts & Articles - INFOSURAJ" />
			<meta name="twitter:description" content="Explore a wide range of articles and insights on web development, technology, design, and more from Suraj." />
			<link rel="icon" href="/favicon.ico" />
		</Helmet>
        <div>
			<MagicCursor />
			<Preloader />
			<LenisScroll />
			<div className="main">
				<Header />
				<div id="main-wrapper" className="main-wrapper">
					<Breadcrumb />
					<BlogSection />
					<Footer />
					<SearchModal />
					<OffcanvasMenu />
				</div>
			</div>
		</div>
		</>
    );
};

export default Blog;