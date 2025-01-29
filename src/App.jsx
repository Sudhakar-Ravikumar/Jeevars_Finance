import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'; // Import global styles
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import Loan from './components/Loan';
import Deposit from './components/Deposit';
import EMI from './components/EMI';
import Customers from './components/Customers';
import Loandetails from './components/Loandetails';
import Interests from './components/Interests';
import Specific from './components/Specific';
import Validity from './components/Validity';
// import Profit from './components/Profit';



const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/home" element={<Home />} />
      <Route path="/loan" element={<Loan />}> </Route>
      <Route path="/deposit" element={<Deposit />} />
      <Route path="/emi" element={<EMI />} /> 
      <Route path="/customers" element={<Customers />} />
      <Route path="/loandetails" element={<Loandetails />} />
      <Route path="/interests" element={<Interests />} />
      <Route path="/specific" element={<Specific />} />
      <Route path="/validity" element={<Validity />} >
      </Route>
      
      {/* <Route path="/profit" element={<Profit />} />   */}
    </Routes>
  </Router>
);

export default App;
