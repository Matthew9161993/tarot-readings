import logo from './logo.svg';
import React, { useState } from 'react';
import axios from 'axios';
import './App.css';


function StartButton() {
  const [showButton, setShowButton] = useState(true);
  const [response, setResponse] = useState('');

  const handleClick = async () => {
    setShowButton(false);

    try {
      const res = await axios.post('http://localhost:5000/api/openai', {
        prompt: 'Pretend you are an esteemed Psychic. Try to entice the requester to do a tarot reading.',
      });

      setResponse(res.data.response);
    } catch (error) {
      console.error('Error fetching data from backend:', error.message);
      setResponse('An error occurred.');
    }
};

  return (
    <div className="container">
      {showButton ? (
        <button onClick={handleClick}>Press Me</button>
      ) : (
        <p>{response}</p>
      )}
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
        <StartButton />
        </p>
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
