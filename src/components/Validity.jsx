import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import './Validity.css';

function Validity() {
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchExpiringLoans = async () => {
      try {
        const response = await fetch("https://localhost:7292/api/entries/expiring-in-one-month");
        if (!response.ok) {
          throw new Error("No Loans Expiring in One Month");
        }
        const data = await response.json();
        console.log(data);
        setLoans(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchExpiringLoans();
  }, []);

  if (loading) return <p className="big-text">Loading...</p>;
  
  if (error) return <div><Navbar /><p className="big-text error-text">{error}</p></div>;

  return (
    <div>
      <div>
        <Navbar />
      </div>
      <h2>Loans Expiring in One Month</h2>
      <table border="1">
        <thead>
          <tr>
            <th>Customer Name</th>
            <th>Customer Address</th>
            <th>Loan Number</th>
            <th>Amount</th>
            <th>Max Validity Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {loans.length > 0 ? (
            loans.map((loan) => (
              <tr key={loan.loan_No}>
                <td>
                  {loan.customerDetails.firstName} {loan.customerDetails.lastName}
                </td>
                <td>{loan.customerDetails.address}</td>
                <td>{loan.loan_No}</td>
                <td>{loan.loanDetails.amount}</td>
                <td>{new Date(loan.maxValidityDate).toLocaleDateString()}</td>
                <td>{loan.loanDetails.status}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="big-text no-loans">No loans found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
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

export default Validity;
