import React from 'react';
import HeroSection from '../components/Home/HeroSection';
import WorkshopSection from '../components/Home/WorkshopSection';
import TutorSection from '../components/Home/TutorSection';
import OrganizationSection from '../components/Home/OrganizationSection';
import '../style/Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <HeroSection />
      <WorkshopSection />
      <TutorSection />
      <OrganizationSection />
    </div>
  );
};

export default Home;
