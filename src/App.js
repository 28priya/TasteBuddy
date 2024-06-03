// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Components/home.js';
import Login from './Components/Login.js';
import Signup from './Components/Signup.js';
import DietPlan from './Components/DietPlan.js';
import ExplorePage from './Components/ExplorePage.js'; // Correctly import ExplorePage

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/diet-plans" element={<DietPlan />} />
        <Route path="/explore" element={<ExplorePage />} />
      </Routes>
    </Router>
  );
}

export default App;
