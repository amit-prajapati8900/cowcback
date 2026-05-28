import React from 'react';
import { Link } from 'react-router-dom'; // अगर React Router इस्तेमाल कर रहे हैं

export default function Footer() {
  return (
    <footer style={{ 
      background: 'linear-gradient(180deg, #1e293b 0%, #0f172a 100%)', 
      color: '#cbd5e1', 
      padding: '60px 0 30px 0',
      borderTop: '3px solid #00d4ff',
      fontFamily: '"Poppins", sans-serif'
    }}>
      <div className="container">
        <div className="row g-4">
          
          {/* Column 1: Brand & Socials */}
          <div className="col-12 col-md-4">
            <h5 style={{ color: '#ffffff', fontWeight: '800', letterSpacing: '1px', marginBottom: '20px' }}>
              <span style={{ color: '#00d4ff' }}>WATER</span> CORP
            </h5>
            <p style={{ fontSize: '14px', lineHeight: '1.6', color: '#94a3b8' }}>
              Next-generation smart water supply monitoring, billing, and management system. Ensuring sustainability and efficiency for a better tomorrow.
            </p>
            <div className="d-flex gap-3 mt-4">
              <a href="#" style={{ color: '#94a3b8', transition: '0.3s' }} onMouseOver={(e) => e.target.style.color = '#00d4ff'} onMouseOut={(e) => e.target.style.color = '#94a3b8'}>
                <i className="fab fa-twitter fa-xl"></i>
              </a>
              <a href="#" style={{ color: '#94a3b8', transition: '0.3s' }} onMouseOver={(e) => e.target.style.color = '#3b5998'} onMouseOut={(e) => e.target.style.color = '#94a3b8'}>
                <i className="fab fa-facebook fa-xl"></i>
              </a>
              <a href="#" style={{ color: '#94a3b8', transition: '0.3s' }} onMouseOver={(e) => e.target.style.color = '#0a66c2'} onMouseOut={(e) => e.target.style.color = '#94a3b8'}>
                <i className="fab fa-linkedin fa-xl"></i>
              </a>
              <a href="#" style={{ color: '#94a3b8', transition: '0.3s' }} onMouseOver={(e) => e.target.style.color = '#ac2bac'} onMouseOut={(e) => e.target.style.color = '#94a3b8'}>
                <i className="fab fa-instagram fa-xl"></i>
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="col-6 col-md-2">
            <h6 style={{ color: '#ffffff', fontWeight: '600', marginBottom: '20px', textTransform: 'uppercase', fontSize: '14px', letterSpacing: '0.5px' }}>
              Quick Links
            </h6>
            <ul className="list-unstyled d-flex flex-column gap-2" style={{ fontSize: '14px' }}>
              <li><a href="/dashboard" style={{ color: '#94a3b8', textDecoration: 'none', transition: '0.2s' }} onMouseOver={(e) => e.target.style.color = '#ffffff'} onMouseOut={(e) => e.target.style.color = '#94a3b8'}>Dashboard</a></li>
              <li><a href="/billing" style={{ color: '#94a3b8', textDecoration: 'none', transition: '0.2s' }} onMouseOver={(e) => e.target.style.color = '#ffffff'} onMouseOut={(e) => e.target.style.color = '#94a3b8'}>Billing Details</a></li>
              <li><a href="/customers" style={{ color: '#94a3b8', textDecoration: 'none', transition: '0.2s' }} onMouseOver={(e) => e.target.style.color = '#ffffff'} onMouseOut={(e) => e.target.style.color = '#94a3b8'}>Consumers</a></li>
              <li><a href="/complaints" style={{ color: '#94a3b8', textDecoration: 'none', transition: '0.2s' }} onMouseOver={(e) => e.target.style.color = '#ffffff'} onMouseOut={(e) => e.target.style.color = '#94a3b8'}>File a Complaint</a></li>
            </ul>
          </div>

          {/* Column 3: Services / Features */}
          <div className="col-6 col-md-3">
            <h6 style={{ color: '#ffffff', fontWeight: '600', marginBottom: '20px', textTransform: 'uppercase', fontSize: '14px', letterSpacing: '0.5px' }}>
              Core Services
            </h6>
            <ul className="list-unstyled d-flex flex-column gap-2" style={{ fontSize: '14px', color: '#94a3b8' }}>
              <li><i className="fas fa-check-circle text-info me-2"></i> Real-time Flow Analysis</li>
              <li><i className="fas fa-check-circle text-info me-2"></i> Smart Leakage Detection</li>
              <li><i className="fas fa-check-circle text-info me-2"></i> Automated Digital Invoicing</li>
              <li><i className="fas fa-check-circle text-info me-2"></i> 24/7 Consumer Support</li>
            </ul>
          </div>

          {/* Column 4: Contact Info */}
          <div className="col-12 col-md-3">
            <h6 style={{ color: '#ffffff', fontWeight: '600', marginBottom: '20px', textTransform: 'uppercase', fontSize: '14px', letterSpacing: '0.5px' }}>
              Support & Contact
            </h6>
            <ul className="list-unstyled d-flex flex-column gap-3" style={{ fontSize: '14px', color: '#94a3b8' }}>
              <li className="d-flex align-items-center gap-2">
                <i className="fas fa-headset text-primary fa-lg"></i>
                <span>Toll Free: 1800-123-4567</span>
              </li>
              <li className="d-flex align-items-center gap-2">
                <i className="fas fa-envelope text-primary"></i>
                <span>support@watercorp.in</span>
              </li>
              <li className="d-flex align-items-center gap-2">
                <i className="fas fa-clock text-primary"></i>
                <span>Mon - Sat: 9:00 AM - 6:00 PM</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Horizontal Line Divider */}
        <hr style={{ borderColor: 'rgba(255,255,255,0.1)', margin: '40px 0 20px 0' }} />

        {/* Bottom Section */}
        <div className="row align-items-center" style={{ fontSize: '13px', color: '#64748b' }}>
          <div className="col-12 col-md-6 text-center text-md-start">
            <p className="mb-md-0">© 2026 Water Corporation Management System. All rights reserved.</p>
          </div>
          <div className="col-12 col-md-6 text-center text-md-end">
            <p className="mb-0">
              Designed & Developed with ❤️ by <span style={{ color: '#00d4ff', fontWeight: '600' }}>Amit</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}