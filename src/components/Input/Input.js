import React, { useState } from 'react';
import './Input.css';

const Input = ({ 
  type = 'text', 
  name, 
  label, 
  placeholder, 
  value, 
  onChange, 
  error, 
  disabled,
  icon 
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const handleChange = (e) => {
    onChange(e.target.value);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const inputType = type === 'password' && showPassword ? 'text' : type;

  const getIcon = () => {
    if (icon === 'email') {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
          <polyline points="22,6 12,13 2,6" />
        </svg>
      );
    }
    if (icon === 'lock') {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
      );
    }
    return null;
  };

  return (
    <div className={`input-group ${error ? 'input-group--error' : ''} ${isFocused ? 'input-group--focused' : ''}`}>
      {label && (
        <label htmlFor={name} className="input-group__label">
          {label}
        </label>
      )}
      
      <div className="input-group__wrapper">
        {icon && (
          <span className="input-group__icon">
            {getIcon()}
          </span>
        )}
        
        <input
          type={inputType}
          id={name}
          name={name}
          className={`input-group__input ${icon ? 'input-group__input--with-icon' : ''}`}
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          disabled={disabled}
          autoComplete={type === 'password' ? 'current-password' : 'email'}
        />

        {type === 'password' && (
          <button
            type="button"
            className="input-group__toggle-password"
            onClick={togglePasswordVisibility}
            disabled={disabled}
            tabIndex="-1"
          >
            {showPassword ? (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                <line x1="1" y1="1" x2="23" y2="23" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            )}
          </button>
        )}
      </div>

      {error && (
        <span className="input-group__error">
          {error}
        </span>
      )}
    </div>
  );
};

export default Input;
