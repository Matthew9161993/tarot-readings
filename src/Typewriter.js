import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './Typewriter.css';

const Typewriter = ({ text, speedRange, onComplete }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    let index = 0; // Start index at 0
    let isCancelled = false;

    // Reset state when `text` changes
    setDisplayedText(text.charAt(index));
    setIsCompleted(false);

    const typeNextCharacter = () => {
      if (isCancelled) return;

      // Append the current character to the displayed text
      setDisplayedText((prev) => prev + text.charAt(index));

      // Increment the index only after appending the character
      index++;

      if (index < text.length) {
        const [min, max] = speedRange;
        const randomDelay = Math.floor(Math.random() * (max - min + 1)) + min;
        setTimeout(typeNextCharacter, randomDelay);
      } else {
        setIsCompleted(true); // Typing is complete
      }
    };

    // Start the typing effect
    typeNextCharacter();

    // Cleanup timeout on unmount
    return () => {
      isCancelled = true;
    };
  }, [text, speedRange]);

  useEffect(() => {
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
