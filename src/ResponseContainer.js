import React from 'react';
import PropTypes from 'prop-types';
import Typewriter from './Typewriter';
import './ResponseContainer.css'; // Import corresponding CSS

const ResponseContainer = ({ text, fade }) => {
  return (
    <div className={`Response-container ${fade ? 'fade-in' : 'fade-out'}`}>
      <Typewriter text={text} />
    </div>
  );
};

ResponseContainer.propTypes = {
  text: PropTypes.string.isRequired,
  fade: PropTypes.bool.isRequired,
};

export default ResponseContainer;
