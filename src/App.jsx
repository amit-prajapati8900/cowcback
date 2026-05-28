import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Components
import Navbar from './pages/Navbar';
import Footer from "./pages/Footer";
import ProtectedRoute from './assets/ProtectedRoute'; // ← ProtectedRoute Import kiya

// Pages
import HomePage from './pages/Home/HomePage';
import BillingPage from './pages/Billing/BillingPage';
import CompalintPage from './pages/Complaint/CompalintPage';
import CustomerPage from './pages/Customer/CustomerPage';
import ReportPage from './pages/Reports/ReportPage';
import Dashboard from './pages/Dashboards/Dashboard';
import SencerPage from './pages/Sencer/SencerPage';
import Login from './pages/Login/Login.jsx'; // ← Naya Login Page

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./App.css";
import "./index.css";


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* ===================== PUBLIC ROUTES ===================== */}
        <Route path="/" element={<HomePage />} />
        <Route path="/Login" element={<Login />} />

        {/* ===================== PROTECTED ROUTES ===================== */}
        {/* Kisi bhi page ko access karne ke liye valid token zaroori hai */}
        <Route path="/billing" element={<ProtectedRoute><BillingPage /></ProtectedRoute>} />
        <Route path="/complaints" element={<ProtectedRoute><CompalintPage /></ProtectedRoute>} />
        <Route path="/customers" element={<ProtectedRoute><CustomerPage /></ProtectedRoute>} />
        <Route path="/reports" element={<ProtectedRoute><ReportPage /></ProtectedRoute>} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/sensors" element={<ProtectedRoute><SencerPage /></ProtectedRoute>} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;