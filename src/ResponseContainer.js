// ResponseContainer.js
import React from 'react';
import Typewriter from './Typewriter';
import './ResponseContainer.css'; // Import corresponding CSS

const SPEED_RANGE = [50, 150];

const ResponseContainer = ({ text, fade, onTypingComplete }) => {
  return (
    <div className={`Response-container ${fade ? 'fade-in' : 'fade-out'}`}>
      <Typewriter 
        text={text}
        speedRange={SPEED_RANGE}
        onComplete={onTypingComplete} // Pass callback to Typewriter
        fade={fade} // Pass fade prop to Typewriter
      />
    </div>
  );
};

export default ResponseContainer;
