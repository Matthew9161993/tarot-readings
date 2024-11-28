// src/components/ClassicSpread/ClassicSpread.js

import React, { useState, useEffect } from 'react';
import './ClassicSpread.css'; // Import corresponding CSS
import cardsData from './cards.json';
import axios from 'axios';

const TOTAL_CARDS = 78; // Total number of cards in the deck
const CARDS_TO_DISPLAY = 3; // Number of cards to display

const ClassicSpread = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedCards, setSelectedCards] = useState([]);
  const [responseText, setResponseText] = useState('');

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
    setResponseText(''); // Clear previous response when reshuffling
  };

  useEffect(() => {
    // Trigger fade-in after the component mounts
    const fadeInTimeout = setTimeout(() => {
      setIsVisible(true);
    }, 100); // Delay to ensure the transition occurs

    selectRandomCards(); // Select initial cards

    return () => clearTimeout(fadeInTimeout);
  }, []);

  // Helper function to get card data by number
  const getCardData = (cardNumber) => {
    return cardsData.find((card) => card.number === cardNumber);
  };

  // Function to generate spread interpretation
  const generateSpreadInterpretation = async () => {
    if (selectedCards.length < CARDS_TO_DISPLAY) {
      setResponseText('Please wait while we generate your spread.');
      return;
    }
  
    const pastCard = getCardData(selectedCards[0]);
    const presentCard = getCardData(selectedCards[1]);
    const futureCard = getCardData(selectedCards[2]);

    try {
      const res = await axios.post('http://localhost:5001/api/openai', {
        prompt:
          `You are an esteemed psychic that performs a reading from a spread of tarot cards.
           The spread sits before you on a table with three cards in three positions.
           The first position is labeled The Past, and the card occupying it is "${pastCard.name}".
           The second position is labeled The Present, and the card occupying it is "${presentCard.name}".
           The third position is labeled The Future, and the card occupying it is "${futureCard.name}".
           You know that the requester is seeking something.
          `
      });
      setResponseText(res.data.response);
    } catch (error) {
      console.error('Error fetching data from backend:', error.message);
      setResponseText('An error occurred while discussing the spread.');
    }
  };

  // Use useEffect to generate interpretation once selectedCards are set
  useEffect(() => {
    if (selectedCards.length === CARDS_TO_DISPLAY) {
      generateSpreadInterpretation();
    }
  }, [selectedCards]);

  return (
    <div className={`classic-spread-container ${isVisible ? 'fade-in' : 'fade-out'}`}>
      {/* Classic Spread Header */}
      <h2>Classic Spread</h2>

      {/* Spread Cards */}
      <div className="spread-cards">
        {/* Card 1: The Past */}
        <div className="spread-card">
          <h3>Card 1: The Past</h3>
          {selectedCards[0] && (
            <img
              src={`/waite-deck/card${selectedCards[0]}.jpg`}
              alt={`${getCardData(selectedCards[0])?.name || 'Unknown Card'}: ${getCardData(selectedCards[0])?.description || ''}`}
              className="card-image"
            />
          )}
        </div>

        {/* Card 2: The Present */}
        <div className="spread-card">
          <h3>Card 2: The Present</h3>
          {selectedCards[1] && (
            <img
              src={`/waite-deck/card${selectedCards[1]}.jpg`}
              alt={`${getCardData(selectedCards[1])?.name || 'Unknown Card'}: ${getCardData(selectedCards[1])?.description || ''}`}
              className="card-image"
            />
          )}
        </div>

        {/* Card 3: The Future */}
        <div className="spread-card">
          <h3>Card 3: The Future</h3>
          {selectedCards[2] && (
            <img
              src={`/waite-deck/card${selectedCards[2]}.jpg`}
              alt={`${getCardData(selectedCards[2])?.name || 'Unknown Card'}: ${getCardData(selectedCards[2])?.description || ''}`}
              className="card-image"
            />
          )}
        </div>
      </div>

      {/* Spread Response */}
      <div className="spread-response">
        <p>{responseText || 'Generating your spread interpretation...'}</p>
      </div>
    </div>
  );
};

export default ClassicSpread;
