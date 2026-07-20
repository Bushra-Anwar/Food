import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function SubscriptionStatus() {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div style={{ padding: '2rem' }}>
      <h2 style={{ marginBottom: '2rem' }}>Subscription Details</h2>
      
      <div style={{ background: 'var(--glass-bg)', padding: '2rem', borderRadius: '12px', border: '1px solid var(--glass-border)', maxWidth: '400px' }}>
        <div style={{ marginBottom: '1.5rem' }}>
          <span style={{ opacity: 0.8 }}>Current Plan:</span>
          <h3 style={{ marginTop: '0.5rem', color: '#4CAF50' }}>{user?.plan || 'Basic'}</h3>
        </div>
        
        <div style={{ marginBottom: '1.5rem' }}>
          <span style={{ opacity: 0.8 }}>Status:</span>
          <h3 style={{ marginTop: '0.5rem', textTransform: 'capitalize' }}>{user?.subscriptionStatus || 'Inactive'}</h3>
        </div>

        <button 
          onClick={() => navigate('/checkout')} 
          style={{ background: '#4CAF50', color: 'white', padding: '1rem', width: '100%', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>
          Renew / Upgrade
        </button>
      </div>
    </div>
  );
}
