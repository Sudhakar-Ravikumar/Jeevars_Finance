import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Loandetails.css"; // Assuming you will create a separate CSS file

function Loandetails() {
  const [form, setForm] = useState({
    loanType: "",
    amount: "",
    interest: "",
    dob: "",
    document: "",
    advancePay: "",
  });

  const handleInput = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Form submitted!");
    console.log(form);
  };

  return (
    
    <div className="Loandetails">
       <nav className="navbar">
        <div className="navbar-links">
          <Link to="/loan">Loan</Link>
          <Link to="/deposit">Deposit</Link>
          <Link to="/emi">EMI</Link>
          <Link to="/profit">Profit</Link>
        </div>
      </nav> 
    <h2>Welcome to Loan Loan Details !!</h2>
    <h1>Loan Details Form</h1>
    <div className="container">
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label htmlFor="loanType">Loan Type</label>
          <select
            id="loanType"
            name="loanType"
            onChange={handleInput}
            className="input"
          >
            <option value="">Choose a Type</option>
            <option value="Educational">Education</option>
            <option value="Personal">Personal</option>
            <option value="Gold">Gold</option>
            <option value="Others">Others</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="advancePay">Advance Payment</label>
          <select
            name="advancePay"
            onChange={handleInput}
            id="advancePay"
            className="input"
          >
            <option value="">Choose an option</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="amount">Amount ₹</label>
          <input
            type="number"
            min="0.00"
            step="1"
            name="amount"
            onChange={handleInput}
            id="amount"
            className="input"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="interest">Interest %</label>
          <input
            type="number"
            name="interest"
            onChange={handleInput}
            id="interest"
            className="input"
            required
            step="0.01"
          />
        </div>
        <div className="form-group">
          <label htmlFor="document">Document</label>
          <select
            name="document"
            onChange={handleInput}
            id="document"
            className="input"
          >
            <option value="">Choose an option</option>
            <option value="cheque">Cheque</option>
            <option value="1 bond">1 Bond</option>
            <option value="multiple bonds">Multiple Bonds</option>
            <option value="gold">Gold</option>
            <option value="vehicle">Vehicle</option>
            <option value="others">Others</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="dob">Date of borrow</label>
          <input
            type="date"
            onChange={handleInput}
            name="dob"
            className="input"
          />
        </div>
        <div className="form-group">
          <button type="submit" className="btn">
            Submit
          </button>
        </div>
      </form>
    </div>
    </div>
  );
}

export default Loandetails;
