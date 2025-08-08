import React, { useEffect, useRef } from 'react';
import gsap from "gsap";

const Preloader = () => {
  const svgRef = useRef(null);
  const loadedRef = useRef(null);
  const preloaderRef = useRef(null);

  useEffect(() => {
    const handleLoad = () => {
      const startShape = "M0 502S175 272 500 272s500 230 500 230V0H0Z";
      const endShape = "M0 2S175 1 500 1s500 1 500 1V0H0Z";
      const tl = gsap.timeline();

      // Text fade out animation
      tl.to(loadedRef.current, {
        delay: 1.2,
        y: -50,
        opacity: 0,
        duration: 0.6,
      })

      // SVG morph animation
      .to(svgRef.current, {
        duration: 0.6,
        attr: { d: startShape },
        ease: "power1.easeIn",
      })
      .to(svgRef.current, {
        duration: 0.6,
        attr: { d: endShape },
        ease: "power1.easeOut",
      })

      // Preloader hide animation
      .to(preloaderRef.current, {
        y: -1000,
        duration: 0.8,
      })
      .to(preloaderRef.current, {
        zIndex: -1,
        display: "none",
      });
    };

    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
      return () => window.removeEventListener('load', handleLoad);
    }
  }, []);

  return (
    <div className="preloader" ref={preloaderRef}>
      <svg viewBox="0 0 1000 1000" preserveAspectRatio="none">
        <path 
          id="loader" 
          ref={svgRef}
          d="M0,1005S175,995,500,995s500,5,500,5V0H0Z"
        />
      </svg>

      <div className="loader-container">
        <div className="loaded" ref={loadedRef}>
          <span>L</span>
          <span>O</span>
          <span>A</span>
          <span>D</span>
          <span>I</span>
          <span>N</span>
          <span>G</span>
        </div>
      </div>
    </div>
  );
};

export default Preloader;