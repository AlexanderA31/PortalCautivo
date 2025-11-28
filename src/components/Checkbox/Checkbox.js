import React from 'react';
import './Checkbox.css';

const Checkbox = ({ 
  name, 
  label, 
  checked, 
  onChange, 
  error, 
  disabled 
}) => {
  const handleChange = (e) => {
    onChange(e.target.checked);
  };

  return (
    <div className={`checkbox-group ${error ? 'checkbox-group--error' : ''}`}>
      <label className="checkbox-group__label">
        <input
          type="checkbox"
          name={name}
          className="checkbox-group__input"
          checked={checked}
          onChange={handleChange}
          disabled={disabled}
        />
        <span className="checkbox-group__custom">
          <svg
            className="checkbox-group__icon"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <polyline
              points="20 6 9 17 4 12"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        <span className="checkbox-group__text">{label}</span>
      </label>
      
      {error && (
        <span className="checkbox-group__error">
          {error}
        </span>
      )}
    </div>
  );
};

export default Checkbox;
