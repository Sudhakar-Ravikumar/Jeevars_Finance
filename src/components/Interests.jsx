import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Interests.css";

function Interests() {
  const [entries, setEntries] = useState([]);
  const [loans, setLoans] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [form, setForm] = useState({
    loan_No: "",
    cus_ID: "",
    pay_Date: "",
    pay_Amount: "",
    validity: "",
    pay_Type: "",
    entry_Type: "",
  });
  const [editingEntry, setEditingEntry] = useState(null);

  useEffect(() => {
    fetchEntries();
    fetchLoans();
    fetchCustomers();
  }, []);

  const fetchEntries = async () => {
    const response = await fetch("https://localhost:7292/api/entries");
    const data = await response.json();
    setEntries(data);
    console.log(data);
  };

  const fetchLoans = async () => {
    const response = await fetch("https://localhost:7292/api/loans");
    const data = await response.json();
    setLoans(data);
  };

  const fetchCustomers = async () => {
    const response = await fetch("https://localhost:7292/api/customers");
    const data = await response.json();
    setCustomers(data);
  };

  const handleInput = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = editingEntry
        ? `https://localhost:7292/api/entries/${editingEntry.entry_ID}` // Validate entry_ID is included
        : "https://localhost:7292/api/entries";
      const method = editingEntry ? "PUT" : "POST";
  
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form), // Ensure form contains the correct fields
      });
      console.log(JSON.stringify(form));
      if (response.ok) {
        alert(editingEntry ? "Entry updated successfully!" : "Entry added successfully!");
        resetForm();
        fetchEntries();
      } else {
        const errorText = await response.text(); // Get error details
        console.error("Failed to save entry:", errorText);
        alert("Failed to save entry. Check console for details.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while saving the entry.");
    }
  };
  

  const handleEdit = (entry) => {
    setForm({
      ...entry,
      pay_Date: entry.pay_Date ? new Date(entry.pay_Date).toISOString().split("T")[0] : "", // Format the date
      validity: entry.validity ? new Date(entry.validity).toISOString().split("T")[0] : "", // Format the date
    });
    setEditingEntry(entry);
  };
  

  const handleDelete = async (id) => {
    const response = await fetch(`https://localhost:7292/api/entries/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      alert("Entry deleted successfully!");
      fetchEntries();
    }
  };

  const resetForm = () => {
    setForm({
      loan_No: "",
      cus_ID: "",
      pay_Date: "",
      pay_Amount: "",
      validity: "",
      pay_Type: "",
      entry_Type: "",
    });
    setEditingEntry(null);
  };

  return (
    <div className="int">
      <Navbar />
      <h2>Welcome to Loan's Interests !!</h2>
      <h1>Interests Form</h1>
      <div className="loan-entries-container">
        <form className="loan-entries-form" onSubmit={handleSubmit}>
          {/* Form Fields */}
          <div className="form-group">
            <label htmlFor="customers">Customer</label>
            <select
              className="form-control"
              onChange={handleInput}
              value={form.cus_ID}
              name="cus_ID"
            >
              <option value="">Choose a Customer</option>
              {customers.map((customer) => (
                <option key={customer.cus_ID} value={customer.cus_ID}>
                  {customer.cus_ID} | {customer.firstName} {customer.lastName}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="loans">Loan</label>
            <select
              className="form-control"
              onChange={handleInput}
              value={form.loan_No}
              name="loan_No"
            >
              <option value="">Choose a Loan</option>
              {loans.map((loan) => (
                <option key={loan.loan_No} value={loan.loan_No}>
                  Loan No: {loan.loan_No} | Type: {loan.LoanType} | Amount: ₹{loan.Amount} | Interest: {loan.Interest}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="pay_Date">Payment Date</label>
            <input
              className="form-control"
              type="date"
              name="pay_Date"
              value={form.pay_Date}
              onChange={handleInput}
            />
          </div>

          <div className="form-group">
            <label htmlFor="validity">Validity Date</label>
            <input
              className="form-control"
              type="date"
              name="validity"
              value={form.validity}
              onChange={handleInput}
            />
          </div>

          <div className="form-group">
            <label htmlFor="pay_Amount">Payment Amount</label>
            <input
              className="form-control"
              type="number"
              name="pay_Amount"
              value={form.pay_Amount}
              onChange={handleInput}
            />
          </div>

          <div className="form-group">
            <label htmlFor="pay_Type">Payment Type</label>
            <select
              className="form-control"
              name="pay_Type"
              value={form.pay_Type}
              onChange={handleInput}
            >
              <option value="">Choose Payment Type</option>
              <option value="Cash">Cash</option>
              <option value="UPI">UPI</option>
              <option value="Account Transfer">Account Transfer</option>
              <option value="Others">Others</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="entry_Type">Entry Type</label>
            <select
              className="form-control"
              name="entry_Type"
              value={form.entry_Type}
              onChange={handleInput}
            >
              <option value="">Choose Entry Type</option>
              <option value="Interest">Interest</option>
              <option value="Principal">Principal</option>
            </select>
          </div>

          <button className="submit-button" type="submit">
            {editingEntry ? "Update Entry" : "Add Entry"}
          </button>
          {editingEntry && (
            <button type="button" onClick={resetForm} className="reset-button">
              Cancel Update
            </button>
          )}
        </form>
      </div>

      <div>
        <h3>Existing Entries</h3>
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
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {entries.map((entry) => (
              <tr key={entry.entry_ID}>
                <td>{entry.entry_ID}</td>
                <td>{entry.loan_No}</td>
                <td>{entry.cus_ID}</td>
                <td>₹{entry.pay_Amount}</td>
                <td>{entry.pay_Date}</td>
                <td>{entry.validity}</td>
                <td>{entry.pay_Type}</td>
                <td>{entry.entry_Type}</td>
                <td>
                  <button onClick={() => handleEdit(entry)}>Edit</button>
                  <button onClick={() => handleDelete(entry.entry_ID)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
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

export default Interests;
