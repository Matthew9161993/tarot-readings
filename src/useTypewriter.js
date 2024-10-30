import { useState, useEffect } from 'react';

const useTypewriter = (text, speedRange = [5, 85]) => {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    let index = 0;
    let isCancelled = false;

    const typeNextCharacter = () => {
      if (isCancelled) return;

      if (index < text.length) {
        setDisplayedText((prev) => prev + text.charAt(index));
        index++;
        const [min, max] = speedRange;
        const randomDelay = Math.floor(Math.random() * (max - min + 1)) + min;
        setTimeout(typeNextCharacter, randomDelay);
      }
    };

    typeNextCharacter();

    return () => {
      isCancelled = true; // Clean up to prevent state updates on unmounted component
    };
  }, [text, speedRange]);

  return displayedText;
};

export default useTypewriter;
