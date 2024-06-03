// src/components/Home.js
import React from 'react';
import { FiArrowRight } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import '../css/landingpage.css';

const Home = () => {
  const navigate = useNavigate();

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (!section) return;

    const startY = window.pageYOffset;
    const endY = section.getBoundingClientRect().top + startY;
    const duration = 1000; // Adjust duration as needed (in milliseconds)

    const startTime = performance.now();

    const scroll = (currentTime) => {
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1);

      const newPos = startY + (endY - startY) * progress;
      window.scrollTo(0, newPos);

      if (progress < 1) {
        requestAnimationFrame(scroll);
      }
    };

    requestAnimationFrame(scroll);
  };

  const handleRecipeButtonClick = () => {
    scrollToSection("featuresSection");
  };

  const handleCardClick = (path) => {
    navigate(path);
  };

  return (
    <div className="home-container">
      <div className="navbar">
        <button className="nav-button" onClick={() => navigate('/about')}>About</button>
        <button className="nav-button" onClick={() => navigate('/Testimonials')}>Testimonials</button>
        <button className="nav-button" onClick={() => navigate('/Contact')}>Contact</button>
        <button className="nav-button" onClick={() => navigate('/Login')}>Login</button>
        <button className="nav-button" onClick={() => navigate('/Signup')}>Signup</button>
      </div>
      <div className="home-banner-container">
        <div className="home-text-section top-centre">
          <h1 className="primary-heading">
            Welcome to Tastebuddy
          </h1>
          <p className="primary-text">
            Cooking is not just about making food. It's about creating a moment that lasts a lifetime.
          </p>
          <br/>
           <br/>
          <button className="secondary-button" onClick={handleRecipeButtonClick}>
            Get Started <FiArrowRight />{" "}
          </button>
        </div>
      </div>
      <br/>
      <br/>
      
       <div className="cards-container">
        <div className="card" onClick={() => handleCardClick('/diet-plans')}>
          <h2>Diet Plans</h2>
        </div>
        <div className="card" onClick={() => handleCardClick('/explore')}>
          <h2>Explore Page</h2>
        </div>
        <div className="card" onClick={() => handleCardClick('/pantry')}>
          <h2>Pantry</h2>
        </div>
      </div>
    </div>
  );
};

export default Home;
