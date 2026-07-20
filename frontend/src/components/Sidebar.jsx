import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Sidebar() {
  const { logout } = useAuth();
  const location = useLocation();

  const menu = [
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Billing', path: '/billing' },
    { name: 'Products', path: '/products' },
    { name: 'Reports', path: '/reports' },
    { name: 'Customers', path: '/customers' },
    { name: 'Subscription', path: '/subscription' },
    { name: 'Settings', path: '/settings' }
  ];

  return (
    <div className="sidebar" style={{ width: '250px', background: 'var(--sidebar-bg, var(--glass-bg))', borderRight: '1px solid var(--glass-border)', padding: '2rem 1rem', display: 'flex', flexDirection: 'column', gap: '1rem', height: '100vh', position: 'sticky', top: 0, transition: 'all 0.3s ease', color: 'var(--text-main)' }}>
      <h3 style={{ marginBottom: '1rem', paddingLeft: '1rem' }}>Menu</h3>
      {menu.map((item, idx) => (
        <Link 
          key={idx} 
          to={item.path} 
          style={{
            textDecoration: 'none', 
            color: location.pathname === item.path ? '#fff' : 'inherit', 
            padding: '0.8rem 1rem', 
            borderRadius: '8px',
            background: location.pathname === item.path ? 'var(--primary)' : 'transparent',
            fontWeight: location.pathname === item.path ? 'bold' : 'normal',
            transition: 'all 0.2s ease'
          }}
        >
          {item.name}
        </Link>
      ))}
      <div style={{ flexGrow: 1 }}></div>
      <button 
        onClick={logout} 
        style={{ 
          background: '#ff4d4d', 
          color: 'white', 
          border: 'none', 
          padding: '0.8rem 1rem', 
          borderRadius: '8px', 
          cursor: 'pointer',
          textAlign: 'left',
          fontWeight: 'bold'
        }}
      >
        Logout
      </button>
    </div>
  );
}
