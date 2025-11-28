import React from 'react';
import './Logo.css';
import logoImage from './logo.png';

const Logo = () => {
  return (
    <div className="logo">
      <div className="logo__container">
        <img src={logoImage} alt="UEB Logo" className="logo__image" />
      </div>
    </div>
  );
};

export default Logo;
