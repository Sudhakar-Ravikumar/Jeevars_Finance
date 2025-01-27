import React from 'react';
import { Link } from 'react-router-dom';
import './Loan.css';

const Loan = () => {
  const categories = [
    { id: 1, name: "Customers", page: "/customers" },
    { id: 2, name: "Loan Details", page: "/loandetails" },
    { id: 3, name: "Interest Entries", page: "/interests" },
    { id: 4, name: "Specific Customer", page: "/specific" },
    { id: 5, name: "Validity Over", page: "/validity" },
  ];

  return (
    <div className="app">
      <Navbar />
      <h2 >Welcome to Loans !!</h2>
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



export default Loan;