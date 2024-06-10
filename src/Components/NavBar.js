// src/components/NavBar.js
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../css/NavBar.css';

const NavBar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar">
      <div className="container">
        <Link to="/" className="nav-link"></Link>
        <div className="nav-links">
          {user ? (
            <>
              <span className="nav-user">Welcome, {user.email}</span>
              <button onClick={logout} className="nav-logout">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link">Login</Link>
              <Link to="/signup" className="nav-link">Signup</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
