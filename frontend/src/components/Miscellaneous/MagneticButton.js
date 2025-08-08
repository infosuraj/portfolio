// MagneticButton.js
import React, { useRef } from 'react';

const MagneticButton = ({
  href = '#',
  children = "Let's Talk!",
  className = '',
  iconClass = 'bi bi-arrow-right ms-1',
  type = 'link',
  onClick,
  disabled,
  target, // Make sure 'target' is destructured here
  rel     // Make sure 'rel' is destructured here
}) => {
  const spanRef = useRef(null);
  const buttonRef = useRef(null);

  const updatePosition = (e) => {
    if (!spanRef.current || !buttonRef.current) return;
    const button = buttonRef.current;
    const rect = button.getBoundingClientRect();
    const relX = e.clientX - rect.left;
    const relY = e.clientY - rect.top;
    spanRef.current.style.top = `${relY}px`;
    spanRef.current.style.left = `${relX}px`;
  };

  const resetPosition = () => {
    // Magnetic effect relies on CSS transitions for reset
  };

  if (type === 'submit') {
    return (
      <button
        ref={buttonRef}
        type="submit"
        className={`btn magnetic-button ${className}`}
        onMouseMove={updatePosition}
        onMouseLeave={resetPosition}
        onClick={onClick}
        disabled={disabled}
      >
        {children}
        <i className={`icon ${iconClass}`} />
        <span ref={spanRef} />
      </button>
    );
  }

  // If type is 'link' (default)
  return (
    <a
      ref={buttonRef}
      href={href}
      className={`btn magnetic-button ${className}`}
      onMouseMove={updatePosition}
      onMouseLeave={resetPosition}
      target={target} // Pass the 'target' prop to the <a> tag
      rel={rel}     // Pass the 'rel' prop to the <a> tag
    >
      {children}
      <i className={`icon ${iconClass}`} />
      <span ref={spanRef} />
    </a>
  );
};

export default MagneticButton;