// src/components/Home.js
import React from 'react';
import { FiArrowRight } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../css/home.css';

const Home = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (!section) return;

    const startY = window.pageYOffset;
    const endY = section.getBoundingClientRect().top + startY;
    const duration = 1000;

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
    if (user) {
      navigate(path);
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="home-container">
   
       <nav> 
        <div className="navbar-right">
          <button className="nav-button" onClick={() => navigate('/about')}>About</button>
          <button className="nav-button" onClick={() => navigate('/contact')}>Contact</button>
          {!user && (
            <>
              <button className="nav-button" onClick={() => navigate('/login')}>Login</button>
              <button className="nav-button" onClick={() => navigate('/signup')}>Signup</button>
            </>
          )}
          {user && (
            <button className="nav-button" onClick={() => navigate('/profile')}>Profile</button>
          )}
        </div>
      </nav>
      <header className="home-banner-container">
        <div className="home-text-section">
          <h1 className="primary-heading">
            Welcome to Tastebuddy
          </h1>
          <p className="primary-text">
            Cooking is not just about making food. It's about creating a moment that lasts a lifetime.
          </p>
          <button className="secondary-button" onClick={handleRecipeButtonClick}>
            Get Started <FiArrowRight />{" "}
          </button>
        </div>
      </header>
      <main className="cards-container">
        <div className="card" onClick={() => handleCardClick('/diet-plans')}>
          <h2>Diet Plans</h2>
        </div>
        <div className="card" onClick={() => handleCardClick('/explore')}>
          <h2>Explore Page</h2>
        </div>
        <div className="card" onClick={() => handleCardClick('/pantry')}>
          <h2>Pantry</h2>
        </div>
      </main>
    </div>
  );
};

export default Home;
