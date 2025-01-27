import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "./Specific.css";

const Specific = () => {
  const [customers, setCustomers] = useState([]);
  const [selectedCustomerId, setSelectedCustomerId] = useState(null);
  const [customerDetails, setCustomerDetails] = useState(null);
  const [loanDetails, setLoanDetails] = useState([]);
  const [entryDetails, setEntryDetails] = useState([]);

  // Fetch all customers for the dropdown
  useEffect(() => {
    fetch("https://localhost:7292/api/customers")
      .then((response) => response.json())
      .then((data) => setCustomers(data))
      .catch((error) => console.error("Error fetching customers:", error));
  }, []);

  // Fetch details when a customer is selected
  useEffect(() => {
    if (selectedCustomerId) {
      // Fetch customer details
      fetch(`https://localhost:7292/api/customers/${selectedCustomerId}`)
        .then((response) => response.json())
        .then((data) => {
          console.log("Customer Details:", data);
          setCustomerDetails(data);
        })
        .catch((error) => console.error("Error fetching customer details:", error));
  
      // Fetch loans for the selected customer
      fetch(`https://localhost:7292/api/loans/customer?cusId=${selectedCustomerId}`)
        .then((response) => response.json())
        .then((data) => {
          console.log("Loan Details:", data);
          setLoanDetails(data);
        })
        .catch((error) => console.error("Error fetching loan details:", error));
  
      // Fetch entries for the selected customer
      fetch(`https://localhost:7292/api/entries/customer?cusId=${selectedCustomerId}`)
        .then((response) => response.json())
        .then((data) => {
          console.log("Entry Details:", data);
          setEntryDetails(data);
        })
        .catch((error) => console.error("Error fetching entry details:", error));
    }
  }, [selectedCustomerId]);
  

  return (
    <div className="specific">
      <Navbar />
      <h1>Customer Details</h1>
      <label htmlFor="customerDropdown">Select Customer: </label>
      <select
        id="customerDropdown"
        onChange={(e) => setSelectedCustomerId(e.target.value)}
      >
        <option value="">-- Select a Customer --</option>
        {customers.map((customer) => (
          <option key={customer.cus_ID} value={customer.cus_ID}>
            {customer.firstName} {customer.lastName} {customer.address}
          </option>
        ))}
      </select>

      {customerDetails && (
        <div>
          <h2>Customer Information</h2>
          <table border="1">
            <tbody>
              <tr>
                <th>Name</th>
                <td>{customerDetails.firstName} {customerDetails.lastName}</td>
              </tr>
              <tr>
                <th>Father's Name</th>
                <td>{customerDetails.fatherName}</td>
              </tr>
              <tr>
                <th>Mother's Name</th>
                <td>{customerDetails.motherName}</td>
              </tr>
              <tr>
                <th>Mobile</th>
                <td>{customerDetails.mobileNo}</td>
              </tr>
              <tr>
                <th>Address</th>
                <td>{customerDetails.address}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {loanDetails.length > 0 && (
        <div>
          <h2>Loan Details</h2>
          <table>
        <thead>
          <tr>
            <th>Loan No</th>
            <th>Customer ID</th>
            <th>Loan Type</th>
            <th>amount</th>
            <th>interest</th>
            <th>Date of Borrow</th>
            <th>document</th>
            <th>Advance Pay</th>
            <th>status</th>
           
          </tr>
        </thead>
        <tbody>
          {loanDetails.map((loanDetails) => (
            <tr key={loanDetails.loan_No}>
              <td>{loanDetails.loan_No}</td>
              <td>{loanDetails.cus_ID}</td>
              <td>{loanDetails.loanType}</td>
              <td>{loanDetails.amount}</td>
              <td>{loanDetails.interest}</td>
              <td>{loanDetails.dob}</td>
              <td>{loanDetails.document}</td>
              <td>{loanDetails.advancePay}</td>
              <td>{loanDetails.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
        </div>
      )}

      {entryDetails.length > 0 && (
        <div>
          <h2>Entry Details</h2>
          <table className="entries-table">
          <thead>
            <tr>
              <th>Entry ID</th>
              <th>Loan No</th>
              <th>Customer ID</th>
              <th>Amount</th>
              <th>Payment Date</th>
              <th>Validity</th>
              <th>Payment Type</th>
              <th>Entry Type</th>
             
            </tr>
          </thead>
          <tbody>
            {entryDetails.map((entryDetails) => (
              <tr key={entryDetails.entry_ID}>
                <td>{entryDetails.entry_ID}</td>
                <td>{entryDetails.loan_No}</td>
                <td>{entryDetails.cus_ID}</td>
                <td>₹{entryDetails.pay_Amount}</td>
                <td>{entryDetails.pay_Date}</td>
                <td>{entryDetails.validity}</td>
                <td>{entryDetails.pay_Type}</td>
                <td>{entryDetails.entry_Type}</td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      )}
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

export default Specific;
