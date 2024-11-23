// Typewriter.js
import React from 'react';
import PropTypes from 'prop-types';
import useTypewriter from './useTypewriter'; // Custom Hook
import './Typewriter.css'; // Optional: Add styles if needed
import RandomCardsPrompt from './RandomCardsPrompt';

const Typewriter = ({ text, speedRange, onComplete }) => {
  const { displayedText, isCompleted } = useTypewriter(text, speedRange);

  // Optional: If you want to perform an action when typing is complete
  React.useEffect(() => {
    if (isCompleted && onComplete) {
      onComplete();
    }
  }, [isCompleted, onComplete]);

  return (
    <div>
      <p className="Typewriter-text">{displayedText}</p>
      {isCompleted && <RandomCardsPrompt />}
    </div>
  );
};

Typewriter.propTypes = {
  text: PropTypes.string.isRequired,
  speedRange: PropTypes.arrayOf(PropTypes.number),
  onComplete: PropTypes.func, // Optional callback prop
};

Typewriter.defaultProps = {
  speedRange: [5, 85],
  onComplete: null,
};

export default Typewriter;
