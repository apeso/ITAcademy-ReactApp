import React from 'react';
import homeImage from '../../assets/home_img1.jpg'; 


const HeroSection = () => {
  return (
    <div className="hero-section">
      <img src={homeImage} alt="Background" className="hero-image" />
      <div className="hero-text">
        <h1>Empower Your Future with <br /> Cutting-Edge Tech Education</h1>
      </div>
    </div>
  );
};

export default HeroSection;
