import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';

const WorkshopSection = () => {
  return (
    <div className="workshop-section">
      <div className="workshop-content">
        <h2>Explore Our Workshops</h2>
        <p>Unlock your potential and dive into the exciting world of technology with our diverse range of workshops. From mastering web development to delving into the depths of data science, our workshops are designed to equip you with the skills and knowledge needed to thrive in today's digital landscape. Whether you're a beginner eager to learn the basics or an experienced professional looking to stay ahead of the curve, we have something for everyone. Join us and embark on a journey of discovery, innovation, and endless possibilities.</p>
        <Button
          component={Link}
          to="/radionice"
          variant="outlined"
          sx={{ 
            color: 'black',
            '&:hover': {
              backgroundColor: 'transparent',
              color: 'black',
            }
          }}>View Workshops</Button>
      </div>
    </div>
  );
};

export default WorkshopSection;
