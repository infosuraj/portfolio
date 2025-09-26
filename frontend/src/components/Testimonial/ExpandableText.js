// src/components/Testimonials/ExpandableText.js

import React, { useState } from 'react';
import useWindowSize from './useWindowSize'

const ExpandableText = ({ text }) => { // 2. No need for maxLength prop anymore
  const [isExpanded, setIsExpanded] = useState(false);
  const { width } = useWindowSize(); // 3. Get the screen width

  // 4. Set different limits for mobile and desktop
  // 768px is a common breakpoint for tablets/desktops
  const maxLength = width < 768 ? 90 : 220;

  // If the text is shorter than the max length, just display it without a button.
  if (text.length <= maxLength) {
    return <p>{text}</p>;
  }

  const toggleReadMore = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div>
      <p>
        {isExpanded ? text : `${text.substring(0, maxLength)}...`}
      </p>
      <button onClick={toggleReadMore} className="read-more-btn">
        {isExpanded ? 'Read Less' : 'Read More'}
      </button>
    </div>
  );
};

export default ExpandableText;