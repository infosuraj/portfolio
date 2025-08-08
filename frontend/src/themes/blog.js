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

const Blog = () => {
    return (
        <div>
			<title>Latest Blog Posts & Articles - INFOSURAJ</title>
            <meta name="description" content="Explore a wide range of articles and insights on web development, technology, design, and more from Suraj." />
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
    );
};

export default Blog;