import React from 'react';
import PropTypes from 'prop-types';
import './Button.css'; // Import corresponding CSS

const Button = ({ onClick, children, fade }) => {
  return (
    <button
      className={`Welcome-button ${fade ? 'fade-in' : 'fade-out'}`}
      onClick={onClick}
      aria-label="Welcome Button"
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  fade: PropTypes.bool.isRequired,
};

export default Button;
