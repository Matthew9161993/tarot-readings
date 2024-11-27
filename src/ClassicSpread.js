// src/components/ClassicSpread/ClassicSpread.js

import React, { useState, useEffect } from 'react';
import './ClassicSpread.css'; // Import corresponding CSS

const ClassicSpread = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger fade-in after the component mounts
    const fadeInTimeout = setTimeout(() => {
      setIsVisible(true);
    }, 100); // Delay to ensure the transition occurs

    return () => clearTimeout(fadeInTimeout);
  }, []);

  return (
    <div className={`classic-spread-container ${isVisible ? 'fade-in' : 'fade-out'}`}>
      {/* Your Classic Spread Content */}
      <h2>Classic Spread</h2>
      <div className="spread-details">
        <div className="spread-card">
          <h3>Card 1: The Past</h3>
          {/* Insert card image and interpretation */}
        </div>
        <div className="spread-card">
          <h3>Card 2: The Present</h3>
          {/* Insert card image and interpretation */}
        </div>
        <div className="spread-card">
          <h3>Card 3: The Future</h3>
          {/* Insert card image and interpretation */}
        </div>
      </div>
    </div>
  );
};

export default ClassicSpread;
