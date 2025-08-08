import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const MagicCursor = () => {
  const cursorRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const hoverElements = document.querySelectorAll('a, .Subscribe-btn, .navbar-toggler, .subscribe-input');

    // Helper function to animate the cursor with GSAP
    const animateCursor = (props) => {
      if (cursor) {
        gsap.to(cursor, {
          ...props,
          duration: 0.3,
          ease: props.ease || 'power2.out',
        });
      }
    };

    // Update cursor position on mouse move
    const handleMouseMove = (e) => {
      animateCursor({ x: e.clientX, y: e.clientY, opacity: 1 });
    };

    // Add hover effects for specified elements
    const addHoverEffects = (element) => {
      element.addEventListener('mouseenter', () => {
        cursor?.classList.add('hovered');
        animateCursor({ scale: 2, opacity: 0, ease: 0.1 });
      });

      element.addEventListener('mouseleave', () => {
        cursor?.classList.remove('hovered');
        animateCursor({ scale: 1, opacity: 1 });
      });
    };

    // Apply hover effects to all elements in hoverElements
    hoverElements.forEach(addHoverEffects);

    // Event listener for mouse movement
    document.addEventListener('mousemove', handleMouseMove);

    // Cleanup function to remove the event listener
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []); // Empty dependency array ensures this effect runs only once

  return (
    <div id="magic-cursor">
      <div id="cursor" ref={cursorRef}></div>
    </div>
  );
};

export default MagicCursor;
