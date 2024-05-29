// src/Components/Home.js
import React from 'react';
import { FiArrowRight } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import '../css/landingpage.css'; // Ensure this file exists and is properly set up

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

  return (
    <div className="home-container">
      <div className="navbar">
        <button className="nav-button" onClick={() => navigate('/login')}>Login</button>
        <button className="nav-button" onClick={() => navigate('/signup')}>Signup</button>
      </div>
      <div className="home-banner-container">
        <div className="home-text-section">
          <h1 className="primary-heading" style={{ marginLeft: '10vh' }}>
            "Life is a combination of magic and pasta."
          </h1>
          <p className="primary-text" style={{ marginLeft: '10vh' }}>
            Cooking is not just about making food. It's about creating a moment that lasts a lifetime.
          </p>
          <button className="secondary-button" onClick={handleRecipeButtonClick} style={{ marginLeft: '10vh' }}>
            Get Started <FiArrowRight />{" "}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
