import React from 'react';

import Preloader from '../components/Miscellaneous/Preloader';
import Header from '../components/Header/Header';
import BlogSingleSection from '../components/Blog/BlogSingle';
import Footer from '../components/Footer/Footer';
import SearchModal from '../components/Miscellaneous/SearchModal';
import OffcanvasMenu from '../components/Miscellaneous/OffcanvasMenu';
import MagicCursor from '../components/Miscellaneous/MagicCursor';
import LenisScroll from '../components/Header/LenisScroll';

const BlogSingle = () => {
    return (
        <div>
			<MagicCursor />
			<Preloader />
			<LenisScroll />
			<div className="main">
				<Header />
				<div id="main-wrapper" className="main-wrapper">
					<BlogSingleSection />
					<Footer className = "footer-area bg-white" />
					<SearchModal />
					<OffcanvasMenu />
				</div>
			</div>
		</div>
    );
};

export default BlogSingle;