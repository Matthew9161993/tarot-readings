// src/components/RandomCards/RandomCards.js

import React, { useState, useEffect } from 'react';
import './RandomCardsPrompt.css';

const TOTAL_CARDS = 78; // Total number of cards in the deck
const CARDS_TO_DISPLAY = 3; // Number of cards to display

function RandomCardsPrompt({ fade, startTheSpread }) { // Accept fade prop
  const [selectedCards, setSelectedCards] = useState([]);

  // Function to generate three unique random numbers between 1 and TOTAL_CARDS
  const generateUniqueRandomNumbers = () => {
    const numbers = new Set();
    while (numbers.size < CARDS_TO_DISPLAY) {
      const randomNum = Math.floor(Math.random() * TOTAL_CARDS) + 1;
      numbers.add(randomNum);
    }
    return Array.from(numbers);
  };

  // Function to select three random cards
  const selectRandomCards = () => {
    const randomNumbers = generateUniqueRandomNumbers();
    setSelectedCards(randomNumbers);
  };

  // Select random cards on component mount
  useEffect(() => {
    selectRandomCards();
  }, []);

  return (
    <div className={`random-cards-container ${fade ? 'fade-in' : 'fade-out'}`}>
      <div className="cards-display">
        {selectedCards.map((cardNumber) => (
          <img
            key={cardNumber}
            src={`/waite-deck/card${cardNumber}.jpg`}
            alt={`Card ${cardNumber}`}
            className="card-image"
          />
        ))}
      </div>
      {/* Optional: Button to refresh the cards */}
      <button className="refresh-button" onClick={selectRandomCards}>
        Shuffle Cards
      </button>
      <button className="refresh-button" onClick={startTheSpread}>
        Perform the Ceremony
      </button>
    </div>
  );
}

export default RandomCardsPrompt;
