import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Customers.css";

function Customers() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    fatherName: "",
    motherName: "",
    mobileNo: "",
    address: "",
  });

  const handleInput = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="Vid">
      {/* Navbar Section */}
      <nav className="navbar">
        <div className="navbar-links">
          <Link to="/loan">Loan</Link>
          <Link to="/deposit">Deposit</Link>
          <Link to="/emi">EMI</Link>
          <Link to="/profit">Profit</Link>
        </div>
      </nav>

      {/* Page Content */}
      <h2>Welcome to Loan Customers</h2>
      <h1 className="page-title">Customer Details Form</h1>
      <form >
        <div className="form-group">
          <label>First Name</label>
          <input
            type="text"
            name="firstName"
            onChange={handleInput}
            placeholder="Enter your first name"
            required
          />
        </div>
        <div className="form-group">
          <label>Last Name</label>
          <input
            type="text"
            name="lastName"
            onChange={handleInput}
            placeholder="Enter your last name"
            required
          />
        </div>
        <div className="form-group">
          <label>Father Name</label>
          <input
            type="text"
            name="fatherName"
            onChange={handleInput}
            placeholder="Enter your father's name"
            required
          />
        </div>
        <div className="form-group">
          <label>Mother Name</label>
          <input
            type="text"
            name="motherName"
            onChange={handleInput}
            placeholder="Enter your mother's name"
            required
          />
        </div>
        <div className="form-group">
          <label>Phone Number</label>
          <input
            type="tel"
            name="mobileNo"
            pattern="[0-9]{10}"
            onChange={handleInput}
            placeholder="Enter your phone number"
            required
          />
        </div>
        <div className="form-group">
          <label>Address</label>
          <textarea
            name="address"
            rows="4"
            onChange={handleInput}
            placeholder="Enter your address"
            required
          ></textarea>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Customers;
