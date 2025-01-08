import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Loandetails.css';

const Loandetails = () => {
  const [form, setForm] = useState({
    loan_No: '',
    cus_ID: '',
    loanType: '',
    amount: '',
    interest: '',
    dob: '',
    document: '',
    advancePay: '',
    status: 'Open',
  });

  const [loans, setLoans] = useState([]);
  const [editingLoan, setEditingLoan] = useState(null);

  const loanTypes = ['Personal', 'Home', 'Education', 'Business'];
  const documentTypes = ['Cheque', 'Bond', 'Land document', 'Gold', 'Vehicle'];

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const fetchLoans = async () => {
    try {
      //https://localhost:7292/api/loans
      const response = await fetch('https://localhost:7292/api/loans');

      if (!response.ok) {
        throw new Error('Failed to fetch loans');
      }
      const data = await response.json();
      setLoans(data);
      console.log(data)
    } catch (error) {
      console.error('Error fetching loans:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const loanData = {
      loan_No: editingLoan ? parseInt(form.loan_No, 10) : undefined,
      cus_ID: parseInt(form.cus_ID, 10),
      loanType: form.loanType,
      amount: parseFloat(form.amount),
      interest: parseFloat(form.interest),
      dob: form.dob,
      document: form.document,
      advancePay: form.advancePay,
      status: form.status,
    };

    try {
      const url = editingLoan
        ? `https://localhost:7292/api/loans/${editingLoan.loan_No}`
        : 'https://localhost:7292/api/loans';
      const method = editingLoan ? 'PUT' : 'POST';
      const headers = { 'Content-Type': 'application/json' };

      const response = await fetch(url, {
        method,
        headers,
        body: JSON.stringify(loanData),
      });

      if (!response.ok) {
        throw new Error('Error saving loan');
      }

      alert(editingLoan ? 'Loan updated successfully!' : 'Loan added successfully!');
      fetchLoans();
      resetForm();
    } catch (error) {
      console.error('Error saving loan:', error);
      alert('Error saving loan');
    }
  };

  const resetForm = () => {
    setForm({
      loan_No: '',
      cus_ID: '',
      loanType: '',
      amount: '',
      interest: '',
      dob: '',
      document: '',
      advancePay: '',
      status: 'Open',
    });
    setEditingLoan(null);
  };

  const handleEdit = (loan) => {
    setForm(loan);
    setEditingLoan(loan);
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`https://localhost:7292/api/loans/${id}`, {
        method: 'DELETE',
      });

      // Check the response status to ensure deletion
      if (response.ok) {
        alert('Loan deleted successfully!');
        fetchLoans();
      } else {
        throw new Error('Error deleting loan');
      }
    } catch (error) {
      console.error('Error deleting loan:', error);
      alert('Error deleting loan');
    }
  };

  useEffect(() => {
    fetchLoans();
  }, []);

  return (
    <div className="loan-container">
      <Navbar />
      <h1>Loan Management</h1>
      <h2>{editingLoan ? 'Edit Loan' : 'Add Loan'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Customer ID</label>
          <input
            type="number"
            name="cus_ID"
            value={form.cus_ID}
            onChange={handleInputChange}
            placeholder="Enter Customer ID"
            required
          />
        </div>
        <div className="form-group">
          <label>Loan Type</label>
          <select name="loanType" value={form.loanType} onChange={handleInputChange} required>
            <option value="" disabled>Select Loan Type</option>
            {loanTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>amount</label>
          <input
            type="number"
            name="amount"
            value={form.amount}
            onChange={handleInputChange}
            placeholder="Enter amount"
            required
          />
        </div>
        <div className="form-group">
          <label>interest</label>
          <input
            type="number"
            name="interest"
            value={form.interest}
            onChange={handleInputChange}
            placeholder="Enter interest"
            required
          />
        </div>
        <div className="form-group">
          <label>Date of Borrow</label>
          <input
            type="date"
            name="dob"
            value={form.dob}
            onChange={handleInputChange}
           
          />
        </div>
        <div className="form-group">
          <label>document</label>
          <select name="document" value={form.document} onChange={handleInputChange} required>
            <option value="" disabled>Select document Type</option>
            {documentTypes.map((doc) => (
              <option key={doc} value={doc}>
                {doc}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Advance Pay</label>
          <input
            type="text"
            name="advancePay"
            value={form.advancePay}
            onChange={handleInputChange}
            placeholder="Enter Advance Pay"
            required
          />
        </div>
        <div className="form-group">
          <label>status</label>
          <select name="status" value={form.status} onChange={handleInputChange} required>
            <option value="Open">Open</option>
            <option value="Close">Close</option>
          </select>
        </div>
        <button type="submit">{editingLoan ? 'Update Loan' : 'Add Loan'}</button>
      </form>

      <h2>Loans List</h2>
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
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {loans.map((loan) => (
            <tr key={loan.loan_No}>
              <td>{loan.loan_No}</td>
              <td>{loan.cus_ID}</td>
              <td>{loan.loanType}</td>
              <td>{loan.amount}</td>
              <td>{loan.interest}</td>
              <td>{loan.dob}</td>
              <td>{loan.document}</td>
              <td>{loan.advancePay}</td>
              <td>{loan.status}</td>
              <td>
                <button onClick={() => handleEdit(loan)}>Edit</button>
                <button onClick={() => handleDelete(loan.loan_No)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const Navbar = () => (
  <nav className="navbar">
    <div className="navbar-links">
      <Link to="/loan">Loan</Link>
      <Link to="/deposit">Deposit</Link>
      <Link to="/emi">EMI</Link>
      <Link to="/profit">Profit</Link>
    </div>
  </nav>
);

export default Loandetails;
