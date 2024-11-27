// MainLoop.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from './Button';
import ResponseContainer from './ResponseContainer';
import RandomCardsPrompt from './RandomCardsPrompt'; // Import your new component
import './MainLoop.css'; // Import for container styling

const MainLoop = () => {
  const [scene, setScene] = useState('welcome');
  const [fade, setFade] = useState(false);
  const [spreadFade, setSpreadFade] = useState(false);
  const [responseText, setResponseText] = useState('');

  useEffect(() => {
    // Trigger fade-in when component mounts
    const fadeInTimeout = setTimeout(() => {
      setFade(true);
    }, 100); // Slight delay to ensure the fade-in effect is noticeable

    return () => clearTimeout(fadeInTimeout);
  }, []);
  
  // New useEffect to handle fade-in for RandomCardsPrompt
  useEffect(() => {
    if (scene === 'fan-cards') {
      // Trigger fade-in after a short delay to ensure the component has mounted
      const spreadFadeInTimeout = setTimeout(() => {
        setSpreadFade(true);
      }, 100); // Adjust delay as needed

      return () => clearTimeout(spreadFadeInTimeout);
    } else {
      // Reset spreadFade when not in 'fan-cards' scene
      setSpreadFade(false);
    }
  }, [scene]);

  const handleClick = async () => {
    setFade(false); // Begin fade-out
  
    setTimeout(async () => {
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
        setFade(true);
        setScene('prompt');
      }
    }, 1000);
  };

  const handleFinishTyping = () => {
    setScene('fan-cards');
    console.log('scene is now ' + scene)
  };

  return (
    <div className={`MainLoop-container ${fade ? 'fade-in' : 'fade-out'}`}>
      {scene === 'welcome' &&
       <Button onClick={handleClick} fade={fade} >
        Hello traveler...
      </Button> }
      {
        (scene === 'prompt' || scene === 'fan-cards') && 
        <ResponseContainer 
          text={responseText}
          fade={fade}
          onTypingComplete={handleFinishTyping}
        />
      }
      {
        (scene === 'fan-cards') && 
        <RandomCardsPrompt fade={spreadFade}/>
      }
    </div>
  );
};

export default MainLoop;
