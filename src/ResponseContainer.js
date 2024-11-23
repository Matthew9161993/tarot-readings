// ResponseContainer.js
import React from 'react';
import PropTypes from 'prop-types';
import Typewriter from './Typewriter';
import './ResponseContainer.css'; // Import corresponding CSS

const ResponseContainer = ({ text, fade, onTypingComplete }) => {
  return (
    <div className={`Response-container ${fade ? 'fade-in' : 'fade-out'}`}>
      <Typewriter 
        text={text}
        speedRange={[50, 150]}
        onComplete={onTypingComplete} // Pass callback to Typewriter
        fade={fade} // Pass fade prop to Typewriter
      />
    </div>
  );
};

ResponseContainer.propTypes = {
  text: PropTypes.string.isRequired,
  fade: PropTypes.bool.isRequired,
};

export default ResponseContainer;
