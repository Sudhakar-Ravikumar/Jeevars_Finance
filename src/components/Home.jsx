import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="app">  
      <Navbar />
      <h2>Welcome to Jevars Financial Services </h2>
      <h3>Better , Brighter , Banking</h3>
    </div>
  );
};

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-links">
        <Link to="/loan">Loan</Link>
        <Link to="/deposit">Deposit</Link>
        <Link to="/emi">EMI</Link>
        <Link to="/profit">Profit</Link>
      </div>
    </nav>
    
  );
};

export default Home;
