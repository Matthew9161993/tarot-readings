// src/components/ClassicSpread/ClassicSpread.js

import React, { useState, useEffect } from 'react';
import './ClassicSpread.css'; // Import corresponding CSS

const TOTAL_CARDS = 78; // Total number of cards in the deck
const CARDS_TO_DISPLAY = 3; // Number of cards to display

const ClassicSpread = () => {
  const [isVisible, setIsVisible] = useState(false);
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

  useEffect(() => {
    // Trigger fade-in after the component mounts
    const fadeInTimeout = setTimeout(() => {
      setIsVisible(true);
    }, 100); // Delay to ensure the transition occurs
    selectRandomCards();
    return () => clearTimeout(fadeInTimeout);
  }, []);

  return (
    <div className={`classic-spread-container ${isVisible ? 'fade-in' : 'fade-out'}`}>
      {/* Your Classic Spread Content */}
      <h2>Classic Spread</h2>
      <div className="spread-details">
        <div className="spread-card">
          <h3>Card 1: The Past</h3>
          {/* Insert card image and interpretation */}
        </div>
        <div className="spread-card">
          <h3>Card 2: The Present</h3>
          {/* Insert card image and interpretation */}
        </div>
        <div className="spread-card">
          <h3>Card 3: The Future</h3>
          {/* Insert card image and interpretation */}
        </div>
      </div>
    </div>
  );
};

export default ClassicSpread;
