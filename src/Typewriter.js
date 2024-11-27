// Typewriter.js
import React from 'react';
import PropTypes from 'prop-types';
import useTypewriter from './useTypewriter'; // Custom Hook
import './Typewriter.css'; // Optional: Add styles if needed

const Typewriter = ({ text, speedRange, onComplete }) => {
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

export default Typewriter;
