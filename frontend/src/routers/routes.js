import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Importing all the themes
import Home from "../themes/home";
import Portfolio from "../themes/portfolio";
import PortfolioSingle from "../themes/portfolio-single";
import About from "../themes/about";
import Blog from "../themes/blog";
// import BlogSingle from "../themes/blog-single";
import Contact from "../themes/contact";
import Admin from "../admin/admin";
import Affiliate from "../themes/affiliate";
import SubscribeForm from "../themes/SubscribeForm";
import UnsubscribeForm from "../themes/UnsubscribeForm";
import NotFoundPage from "../themes/NotFoundPage";
import ResumeViewer from "../themes/resume";

const MyRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
		<Route path="/portfolio" element={<Portfolio />} />
    <Route path="/portfolio-project/:projectId/:titleSlug" element={<PortfolioSingle />} />
		<Route path="/portfolio-project/:projectId" element={<PortfolioSingle />} />
		<Route path="/about" element={<About />} />
		<Route path="/blog" element={<Blog />} />
		{/* <Route path="/blog-single" element={<BlogSingle />} /> */}
		<Route path="/contact" element={<Contact />} />
    <Route path="/admin" element={<Admin />} />
    <Route path="/helpful-resources" element={<Affiliate />} />
    <Route path="/subscribe" element={<SubscribeForm />} />
    <Route path="/unsubscribe" element={<UnsubscribeForm />} />
    <Route path="/resume" element={<ResumeViewer />} />
        {/* Add more routes as needed */}
    <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
};

export default MyRoutes;
