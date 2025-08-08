import React, { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const AnimatedImage = ({ imageSrc, altText }) => {
  useEffect(() => {
    gsap.to(".animated-image", {
      scrollTrigger: {
        trigger: ".animated-image",
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
      transform:
        "translate3d(0px, -19%, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)",
      ease: "none",
    });
  }, []);

  return (
    <section className="animated-image-container primary-bg p-0">
      <a
        href={"/portfolio"}
        className="marquee-item rounded"
        rel={"noopener noreferrer"}
      >
        <img className="animated-image" src={imageSrc} alt={altText} />
      </a>
    </section>
  );
};

export default AnimatedImage;
