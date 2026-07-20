import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Subscription() {
  const [loading, setLoading] = useState(false);
  const { token, user, login } = useAuth();
  const navigate = useNavigate();

  const handlePayment = async () => {
    setLoading(true);
    // Temporary bypass: Directly activate and go to dashboard
    setTimeout(() => {
      login({ ...user, subscriptionStatus: 'active' }, token);
      navigate('/dashboard');
      setLoading(false);
    }, 1000);
  };

  return (
    <div style={{ textAlign: 'center', padding: '5rem 2rem' }}>
      <h1>Choose Your Plan</h1>
      <div style={{ maxWidth: '350px', margin: '3rem auto', background: 'var(--glass-bg)', padding: '2rem', borderRadius: '12px', border: '1px solid #4CAF50' }}>
        <h2>Basic</h2>
        <p style={{ fontSize: '2rem', fontWeight: 'bold', margin: '1rem 0', color: '#4CAF50' }}>₹299 <span style={{fontSize:'1rem', opacity:0.8}}>/ Month</span></p>
        <ul style={{ listStyle: 'none', padding: 0, margin: '2rem 0', textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <li>✔ Unlimited Bills</li>
          <li>✔ Reports</li>
          <li>✔ Products</li>
        </ul>
        <button onClick={handlePayment} disabled={loading} style={{ background: '#4CAF50', color: 'white', padding: '1rem', width: '100%', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', fontSize: '1.1rem' }}>
          {loading ? 'Processing...' : 'Buy Now'}
        </button>
      </div>
    </div>
  );
}
