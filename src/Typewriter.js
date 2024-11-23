// Typewriter.js
import React from 'react';
import PropTypes from 'prop-types';
import useTypewriter from './useTypewriter'; // Custom Hook
import './Typewriter.css'; // Optional: Add styles if needed

const Typewriter = ({ text, speedRange, onComplete, fade }) => {
  const { displayedText, isCompleted } = useTypewriter(text, speedRange);

  // Invoke the callback when typing is complete
  React.useEffect(() => {
    if (isCompleted && onComplete) {
      onComplete();
    }
  }, [isCompleted, onComplete]);

  return (
    <div>
      <p className="Typewriter-text">{displayedText}</p>
    </div>
  );
};

Typewriter.propTypes = {
  text: PropTypes.string.isRequired,
  speedRange: PropTypes.arrayOf(PropTypes.number),
  onComplete: PropTypes.func, // Optional callback prop
  fade: PropTypes.bool, // Define fade prop
};

Typewriter.defaultProps = {
  speedRange: [5, 85],
  onComplete: null,
  fade: false, // Default fade to false
};

export default Typewriter;
