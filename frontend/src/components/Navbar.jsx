import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user } = useAuth();
  
  return (
    <nav className="navbar" style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem 2rem', background: 'var(--glass-bg)', borderBottom: '1px solid var(--glass-border)', color: 'var(--text-main)', transition: 'all 0.3s ease' }}>
      <div className="nav-brand">
        <h2 style={{ margin: 0 }}><Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>🍽️ FOOD BILLING APP</Link></h2>
      </div>
      <div className="nav-links" style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
        {user ? (
          <>
            <Link to="/dashboard" style={{ textDecoration: 'none', color: 'inherit' }}>Dashboard</Link>
            <Link to="/billing" style={{ textDecoration: 'none', color: 'inherit' }}>Billing</Link>
            <Link to="/reports" style={{ textDecoration: 'none', color: 'inherit' }}>Reports</Link>
            <Link to="/settings" style={{ textDecoration: 'none', color: 'inherit' }}>Settings</Link>
            <div className="profile-avatar" style={{ background: 'var(--primary)', color: '#fff', padding: '0.5rem', borderRadius: '50%', fontWeight: 'bold' }}>
              {user.firstName ? user.firstName[0].toUpperCase() : 'U'}
            </div>
          </>
        ) : (
          <>
            <Link to="/login" style={{ textDecoration: 'none', color: 'inherit' }}>Login</Link>
            <Link to="/register" style={{ textDecoration: 'none', color: 'inherit' }}>Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}
