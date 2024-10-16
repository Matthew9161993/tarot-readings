import logo from './logo.svg';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';


function WelcomeButton() {
  const [showButton, setShowButton] = useState(true);
  const [fade, setFade] = useState(false);
  const [typedText, setTypedText] = useState(''); // State for the typed text

  useEffect(() => {
    // Trigger fade-in when component mounts
    setTimeout(() => {
      setFade(true);
    }, 100); // Slight delay to ensure the fade-in effect is noticeable
  }, []);

  const handleClick = async () => {
    setFade(false); // Begin fade out
    
    setTimeout(async () => {
      setShowButton(false);

      try {
        const res = await axios.post('http://localhost:5000/api/openai', {
          prompt: 'Pretend you are an esteemed Psychic. Try to entice the requester to do a tarot reading in four sentences.',
        });

        typeWriterEffect(res.data.response);
        setFade(true);
      } catch (error) {
        console.error('Error fetching data from backend:', error.message);
        typeWriterEffect('An error occurred while typing.');
      }
    }, 1000); // Wait on fade out completion
  };

  // Function to simulate typing effect
  const typeWriterEffect = (text) => {
    let index = -1;

    const typeNextCharacter = () => {
      if (index < text.length-1) {
        setTypedText((prev) => prev + text[index]); // Add one character at a time
        index++;

        // Generate a random delay between 40ms and 90ms
        const randomDelay = Math.floor(Math.random() * 50) + 40;

        // Recursively call the function with a new delay
        setTimeout(typeNextCharacter, randomDelay);
      }
    };

    // Start typing the first character
    typeNextCharacter();
  };

  return (
    <div className="Button-container">
      {showButton ? (
        <button className={`Welcome-button ${fade ? 'fade-in' : 'fade-out'}`} 
                onClick={handleClick}
        >
        Hello traveler...
        </button>
      ) : (
        <div className={`Response-container ${fade ? 'fade-in' : 'fade-out'}`}>
          <p className={fade ? 'fade-in' : 'fade-out'}>{typedText}</p>
        </div>
      )}
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <WelcomeButton />
      </header>
      <footer className="App-footer">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </footer>
    </div>
  );
}

export default App;
