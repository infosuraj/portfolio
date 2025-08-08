// src/components/ScrollToTop.jsx
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // "document.documentElement.scrollTo" is the modern way to scroll to top
    // "window.scrollTo(0, 0)" also works but can sometimes be less reliable
    // for complex layouts or when body has overflow hidden.
    document.documentElement.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant' // 'instant' or 'smooth'
    });
    // For older browsers or if documentElement doesn't work consistently:
    // window.scrollTo(0, 0);
  }, [pathname]); // Re-run this effect whenever the pathname changes

  return null; // This component doesn't render anything, it just performs a side effect
}

export default ScrollToTop;