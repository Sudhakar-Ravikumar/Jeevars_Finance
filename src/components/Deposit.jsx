import React from 'react';
import { Link } from 'react-router-dom';
import './Deposit.css';

const Deposit = () => {
  const categories = [
    { id: 1, name: "Customers", page: "customers.jsx" },
    { id: 2, name: "Loan Details", page: "loans.jsx" },
    { id: 3, name: "Interest Entries", page: "interests.jsx" },
    { id: 4, name: "Specific Customer", page: "details.jsx" },
    { id: 5, name: "Validity Over", page: "validity.jsx" },
  ];

  return (
    <div className="app">
      <Navbar />
      <h2>Welcome to Deposits !!</h2>
      <div className="categories-container">
        {categories.map((item, index) => (
          <Link to={item.page} key={index} className="category-box">
            <h3>{item.name}</h3>
          </Link>
        ))}
      </div>
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



export default Deposit;
