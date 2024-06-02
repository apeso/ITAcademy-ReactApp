import React from 'react';
import htImage from '../../assets/ht_logo.png'; 
import fesbImage from '../../assets/fesb-logo.png'; 
import ddImage from '../../assets/dd_logo.png'; 
import stcImage from '../../assets/stc_logo.png'; 

const HeroSection = () => {
  return (
    <div className="organizations-section">
        <h2>Trusted by Leading Organizations for Many Years</h2>
        <div className='organizations-image'>
            <img src={htImage} alt="Background" width="100px"/>
            <img src={fesbImage} alt="Background" width="90px"/>
            <img src={ddImage} alt="Background" width="100px"/>
            <img src={stcImage} alt="Background" width="90px"/>

        </div>
      
    </div>
  );
};

export default HeroSection;
