// MainLoop.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from './Button';
import ResponseContainer from './ResponseContainer';
import RandomCardsPrompt from './RandomCardsPrompt'; // Import your new component
import './MainLoop.css'; // Import for container styling

const MainLoop = () => {
  const [showButton, setShowButton] = useState(true);
  const [fade, setFade] = useState(false);
  const [responseText, setResponseText] = useState('');
  const [showAfterComponent, setShowAfterComponent] = useState(false); // New state

  useEffect(() => {
    // Trigger fade-in when component mounts
    const fadeInTimeout = setTimeout(() => {
      setFade(true);
    }, 100); // Slight delay to ensure the fade-in effect is noticeable

    return () => clearTimeout(fadeInTimeout);
  }, []);

  const handleTypingComplete = () => {
    setShowAfterComponent(true); // Update state when typing is complete
  };

  const handleClick = async () => {
    setFade(false); // Begin fade-out

    // Wait for fade-out to complete before proceeding
    setTimeout(async () => { // Duration matches CSS transition
      setShowButton(false);

      try {
        const res = await axios.post('http://localhost:5001/api/openai', {
          prompt:
            'Pretend you are an esteemed Psychic. Entice the requester to do a tarot reading in four sentences.',
        });

        setResponseText(res.data.response);
      } catch (error) {
        console.error('Error fetching data from backend:', error.message);
        setResponseText('An error occurred while typing.');
      } finally {
        setFade(true); // Trigger fade-in for the response
      }
    }, 1000); // Matches the CSS transition duration (1s)
  };

  return (
    <div className={`MainLoop-container ${fade ? 'fade-in' : 'fade-out'}`}>
      {showButton ? (
        <Button onClick={handleClick} fade={fade} >
          {'Hello traveler...'}
        </Button>
      ) : (
        <>
          <ResponseContainer 
            text={responseText} 
            fade={fade} 
            onTypingComplete={handleTypingComplete} // Pass callback
          />
          {showAfterComponent ? (
          <RandomCardsPrompt fade={fade} /> // Conditionally render new component
          ) : (
            <>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default MainLoop;
