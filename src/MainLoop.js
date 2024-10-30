import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from './Button';
import ResponseContainer from './ResponseContainer';
import RandomCards from './RandomCards'
import './MainLoop.css'; // Import for container styling

const MainLoop = () => {
  const [showButton, setShowButton] = useState(true);
  const [fade, setFade] = useState(false);
  const [responseText, setResponseText] = useState('');
  const [loading, setLoading] = useState(false); // For loading state

  useEffect(() => {
    // Trigger fade-in when component mounts
    const fadeInTimeout = setTimeout(() => {
      setFade(true);
    }, 100); // Slight delay to ensure the fade-in effect is noticeable

    return () => clearTimeout(fadeInTimeout);
  }, []);

  const handleClick = async () => {
    setFade(false); // Begin fade-out
    setLoading(true); // Start loading

    // Wait for fade-out to complete before proceeding
    setTimeout(async () => {
      setShowButton(false);

      try {
        const res = await axios.post('http://localhost:5000/api/openai', {
          prompt:
            'Pretend you are an esteemed Psychic. Entice the requester to do a tarot reading in four sentences.',
        });

        setResponseText(res.data.response);
      } catch (error) {
        console.error('Error fetching data from backend:', error.message);
        setResponseText('An error occurred while typing.');
      } finally {
        setFade(true); // Trigger fade-in for the response
        setLoading(false); // End loading
      }
    }, 1000); // Matches the CSS transition duration
  };

  return (
    <div className="MainLoop-container">
      {showButton ? (
        <Button onClick={handleClick} fade={fade}>
          Hello traveler...
        </Button>
      ) : loading ? (
        <div className={`Response-container fade-in`}>
          <p>Loading...</p>
        </div>
      ) : (
      <>
        <ResponseContainer text={responseText} fade={fade} />
        <RandomCards />
      </>
      )}
    </div>
  );
};

export default MainLoop;
