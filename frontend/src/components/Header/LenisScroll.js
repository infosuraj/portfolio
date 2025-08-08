import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';

gsap.registerPlugin(ScrollTrigger);

const LenisScroll = () => {
  useEffect(() => {
    const lenis = new Lenis();

    // Update ScrollTrigger on each scroll event
    lenis.on('scroll', () => ScrollTrigger.update());

    // Raf loop for smooth scroll
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    // Disable lag smoothing to keep smooth animations
    gsap.ticker.lagSmoothing(0);

    // Cleanup the effect when the component unmounts
    return () => {
      gsap.ticker.remove(lenis.raf);
    };
  }, []);

  return null; // You can return a div or any JSX if you need to render UI
};

export default LenisScroll;
