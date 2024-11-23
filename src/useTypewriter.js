// useTypewriter.js
import { useState, useEffect } from 'react';

const useTypewriter = (text, speedRange = [5, 85]) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    let index = 0;
    let isCancelled = false;

    // Reset states when text or speedRange changes
    setDisplayedText('');
    setIsCompleted(false);

    const typeNextCharacter = () => {
      if (isCancelled) return;

      if (index < text.length) {
        setDisplayedText((prev) => prev + text.charAt(index));
        index++;
        const [min, max] = speedRange;
        const randomDelay = Math.floor(Math.random() * (max - min + 1)) + min;
        setTimeout(typeNextCharacter, randomDelay);
      } else {
        setIsCompleted(true); // Typing is complete
      }
    };

    typeNextCharacter();

    return () => {
      isCancelled = true; // Cleanup to prevent state updates on unmounted component
    };
  }, [text, speedRange]);

  return { displayedText, isCompleted };
};

export default useTypewriter;
