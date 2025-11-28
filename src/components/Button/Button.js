import React from 'react';
import './Button.css';

const Button = ({ 
  children, 
  type = 'button', 
  onClick, 
  isLoading = false, 
  disabled = false,
  variant = 'primary',
  fullWidth = true 
}) => {
  return (
    <button
      type={type}
      className={`button button--${variant} ${fullWidth ? 'button--full-width' : ''} ${isLoading ? 'button--loading' : ''}`}
      onClick={onClick}
      disabled={disabled || isLoading}
    >
      {isLoading && (
        <span className="button__spinner">
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="10" fill="none" strokeWidth="3" />
          </svg>
        </span>
      )}
      <span className={`button__text ${isLoading ? 'button__text--loading' : ''}`}>
        {children}
      </span>
    </button>
  );
};

export default Button;
