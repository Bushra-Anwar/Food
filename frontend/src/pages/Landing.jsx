import React from 'react';
import { Link } from 'react-router-dom';

export default function Landing() {
  return (
    <div style={{ textAlign: 'center', padding: '5rem 2rem' }}>
      <h1>FOOD BILLING SOFTWARE</h1>
      <p style={{ fontSize: '1.2rem', margin: '2rem 0', opacity: 0.8 }}>
        Simple Billing for Restaurants & Food Shops
      </p>
      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
        <Link to="/register" style={{ background: '#4CAF50', color: 'white', padding: '1rem 2rem', textDecoration: 'none', borderRadius: '8px', fontWeight: 'bold' }}>
          Start Free
        </Link>
        <Link to="/login" style={{ background: 'transparent', border: '1px solid #4CAF50', color: '#4CAF50', padding: '1rem 2rem', textDecoration: 'none', borderRadius: '8px', fontWeight: 'bold' }}>
          Login
        </Link>
      </div>
    </div>
  );
}
