// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Components/Home';
import Login from './Components/Login';
import Signup from './Components/Signup';
import DietPlan from './Components/DietPlan';
import ExplorePage from './Components/ExplorePage';
import Pantry from './Components/Pantry';
import PasswordReset from './Components/PasswordReset';
import { AuthProvider } from './context/AuthContext';
import NavBar from './Components/NavBar';
import PrivateRoute from './Components/PrivateRoute';

function App() {
  return (
    <Router>
      <AuthProvider>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/password-reset" element={<PasswordReset />} />
          <Route path="/diet-plans" element={<PrivateRoute><DietPlan /></PrivateRoute>} />
          <Route path="/explore" element={<PrivateRoute><ExplorePage /></PrivateRoute>} />
          <Route path="/pantry" element={<PrivateRoute><Pantry /></PrivateRoute>} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
