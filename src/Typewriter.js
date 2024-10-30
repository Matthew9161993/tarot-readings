import React from 'react';
import PropTypes from 'prop-types';
import useTypewriter from './useTypewriter'; // Custom Hook
import './Typewriter.css'; // Optional: Add styles if needed

const Typewriter = ({ text, speedRange }) => {
  const displayedText = useTypewriter(text, speedRange);

  return <p className="Typewriter-text">{displayedText}</p>;
};

Typewriter.propTypes = {
  text: PropTypes.string.isRequired,
  speedRange: PropTypes.arrayOf(PropTypes.number),
};

Typewriter.defaultProps = {
  speedRange: [5, 85],
};

export default Typewriter;
