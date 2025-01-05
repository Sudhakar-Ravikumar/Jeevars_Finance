import React, { useState } from "react";
import { Link } from 'react-router-dom';
import "./Interests.css";

function LoanEntries() {
  const [entries, setEntries] = useState([]);
  const [loans, setLoans] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [current, setCurrent] = useState({});
  const [currentLoan, setCurrentLoan] = useState({});
  const [selectedCustomerId, setSelectedCustomerId] = useState("");
  const [selectedLoanNo, setSelectedLoanNo] = useState("");
  const [form, setForm] = useState({
    Loan_No: "",
    Cus_ID: "",
    validity: "",
    payDate: "",
    payAmount: "",
    payType: "",
    entryType: "",
  });

  const handleInput = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleClick = (e) => {
    e.preventDefault();
    console.log("Form submitted:", form);
  };

  const handleCustomerChange = (event) => {
    const selectedCustomerId = event.target.value;
    setSelectedCustomerId(selectedCustomerId);
    setForm({ ...form, Cus_ID: selectedCustomerId });
  };

  const handleLoanChange = (event) => {
    const selectedLoanNo = event.target.value;
    setSelectedLoanNo(selectedLoanNo);
    setForm({ ...form, Loan_No: selectedLoanNo });
  };

  return (
    <div className="int">
    <Navbar />
    <h2>Welcome to Loan Interests!!</h2>
    <h1>Interests Form</h1>
    <div className="loan-entries-container">
      <form className="loan-entries-form" onSubmit={handleClick}>
        <div className="form-group">
          <label htmlFor="customers">Customer</label>
          <select
            className="form-control"
            onChange={handleCustomerChange}
            value={selectedCustomerId}
            id="customers"
          >
            <option value="">Choose a Customer</option>
            {customers.map((customer) => (
              <option key={customer.Cus_ID} value={customer.Cus_ID}>
                {customer.Cus_ID} | {customer.FirstName} {customer.LastName}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="loans">Loan</label>
          <select
            className="form-control"
            onChange={handleLoanChange}
            value={selectedLoanNo}
            id="loans"
          >
            <option value="">Choose a Loan</option>
            {loans.map((loan) => (
              <option key={loan.Loan_No} value={loan.Loan_No}>
                Loan No: {loan.Loan_No} | Loan Type: {loan.LoanType} | Amount: ₹
                {loan.Amount} | Interest: {loan.Interest}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="payDate">Date of Payment</label>
          <input
            className="form-control"
            type="date"
            name="payDate"
            id="payDate"
            onChange={handleInput}
          />
        </div>

        <div className="form-group">
          <label htmlFor="validity">Date of Validity</label>
          <input
            className="form-control"
            type="date"
            name="validity"
            id="validity"
            onChange={handleInput}
          />
        </div>

        <div className="form-group">
          <label htmlFor="payAmount">Payment Amount</label>
          <input
            className="form-control"
            type="number"
            name="payAmount"
            id="payAmount"
            onChange={handleInput}
            min="0.00"
            step="1"
          />
        </div>

        <div className="form-group">
          <label htmlFor="payType">Payment Type</label>
          <select
            className="form-control"
            name="payType"
            id="payType"
            onChange={handleInput}
          >
            <option value="">Choose a Payment Type</option>
            <option value="Cash">Cash</option>
            <option value="UPI">UPI</option>
            <option value="Account Transfer">Account Transfer</option>
            <option value="Others">Others</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="entryType">Entry Type</label>
          <select
            className="form-control"
            name="entryType"
            id="entryType"
            onChange={handleInput}
          >
            <option value="">Choose an Entry Type</option>
            <option value="Interest">Interest</option>
            <option value="Principal">Principal</option>
          </select>
        </div>

        <button className="submit-button" type="submit">
          Add
        </button>
      </form>
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
  


export default LoanEntries;
