import React from 'react';
import homeTutorImage from '../../assets/home_tutor.jpg'; 
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';


const TutorSection = () => {
  return (
    <div className="tutor-section">
      <div className="tutor-content">
        <div className="tutor-image">
          <img src={homeTutorImage} alt="Tutor" />
        </div>
        <div className="tutor-text">
          <h2>Meet Our Exceptional Tutors</h2>
          <p>Our tutors are industry experts with years of experience and a passion for teaching. They are dedicated to providing you with the highest quality education and guidance, ensuring that you reach your full potential. With their expertise and support, you'll gain the skills and confidence you need to succeed in your career. Take the first step towards success and explore our talented team of tutors today.</p>
          <Button
            component={Link}
            to="/predavaci"
            variant="outlined"
            sx={{ 
              color: 'white',
              '&:hover': {
                backgroundColor: 'transparent',
                color: 'white',
              }
            }}>Meet Our Tutors</Button>
        </div>
      </div>
    </div>
  );
};

export default TutorSection;
