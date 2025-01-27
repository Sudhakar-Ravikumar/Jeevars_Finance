import React, { useState, useEffect } from "react";
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
    type: "Individual",
  });

  const [customers, setCustomers] = useState([]);
  const [editingCustomer, setEditingCustomer] = useState(null);

  // Handle input changes in the form
  const handleInput = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Submit the form for adding or updating a customer
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = editingCustomer
        ? `https://localhost:7292/api/customers/${editingCustomer.cus_ID}`
        : "https://localhost:7292/api/customers";
      const method = editingCustomer ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
      console.log(JSON.stringify(form));
      if (response.ok) {
        alert(editingCustomer ? "Customer updated successfully!" : "Customer added successfully!");
        setForm({
          firstName: "",
          lastName: "",
          fatherName: "",
          motherName: "",
          mobileNo: "",
          address: "",
          type: "Individual",
        });
        setEditingCustomer(null);
        fetchCustomers();
      } else {
        const errorData = await response.json();
        console.error("Error response:", errorData);
        alert("Failed to save customer.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // Fetch the list of customers from the API
  const fetchCustomers = async () => {
    try {
      const response = await fetch("https://localhost:7292/api/customers");
      const data = await response.json();
      setCustomers(data);
    } catch (error) {
      console.error("Error fetching customers:", error);
    }
  };

  // Handle editing a customer
  const handleEdit = (customer) => {
    setForm(customer);
    setEditingCustomer(customer);
  };

  // Handle deleting a customer
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`https://localhost:7292/api/customers/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        alert("Customer deleted successfully!");
        fetchCustomers();
      } else {
        const errorData = await response.json();
        console.error("Error response:", errorData);
        alert("Failed to delete customer.");
      }
    } catch (error) {
      console.error("Error deleting customer:", error);
    }
  };

  // Fetch customers on component mount
  useEffect(() => {
    fetchCustomers();
  }, []);

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
      <h2>Welcome to Loan's Customers !!</h2>
      <h1 >Customer Details Form</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>First Name</label>
          <input
            type="text"
            name="firstName"
            value={form.firstName}
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
            value={form.lastName}
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
            value={form.fatherName}
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
            value={form.motherName}
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
            value={form.mobileNo}
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
            value={form.address}
            onChange={handleInput}
            placeholder="Enter your address"
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label>Customer Type</label>
          <select
            name="type"
            value={form.type}
            onChange={handleInput}
            required
          >
            <option value="Individual">Individual</option>
            <option value="Business">Business</option>
          </select>
        </div>
        <button type="submit">
          {editingCustomer ? "Update Customer" : "Add Customer"}
        </button>
      </form>
     
      <h3>Existing Customers</h3>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Father Name</th>
            <th>Mother Name</th>
            <th>Phone</th>
            <th>Address</th>
            <th>Type</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr key={customer.cus_ID}>
              <td>{customer.cus_ID}</td>
              <td>{customer.firstName}</td>
              <td>{customer.lastName}</td>
              <td>{customer.fatherName}</td>
              <td>{customer.motherName}</td>
              <td>{customer.mobileNo}</td>
              <td>{customer.address}</td>
              <td>{customer.type}</td>
              <td>
                <button onClick={() => handleEdit(customer)}>Edit</button>
                <button onClick={() => handleDelete(customer.cus_ID)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Customers;
