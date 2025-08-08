import React, { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin with GSAP
gsap.registerPlugin(ScrollTrigger);

const Shape = () => {
  useEffect(() => {
    // GSAP animation for rounded div on scroll
    gsap.to(".rounded-div-wrapper", {
      height: "0px",
      ease: "power1.out",
      scrollTrigger: {
        trigger: ".content-round",
        start: "top 80%",
        end: "bottom top",
        scrub: true,
      },
    });

    // Cleanup ScrollTrigger when component unmounts
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className="content-round">
      <div className="rounded-div-wrapper">
        <div className="rounded-div">
          <div className="rounded-div-background"></div>
        </div>
      </div>
    </div>
  );
};

export default Shape;
