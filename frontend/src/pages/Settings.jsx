import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

export default function Settings() {
  const { user } = useAuth();
  const { currentTheme, setCurrentTheme, themes } = useTheme();
  
  return (
    <div style={{ padding: '2rem', maxWidth: '600px' }}>
      <h2 style={{ marginBottom: '2rem' }}>Settings</h2>
      
      <div style={{ background: 'var(--glass-bg)', padding: '2rem', borderRadius: '12px', border: '1px solid var(--glass-border)', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Shop Name</label>
          <input type="text" defaultValue={user?.companyName || ''} style={{ width: '100%', padding: '0.8rem', borderRadius: '4px' }} />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>GST Number</label>
          <input type="text" placeholder="Enter GST Number" style={{ width: '100%', padding: '0.8rem', borderRadius: '4px' }} />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Printer</label>
          <select style={{ width: '100%', padding: '0.8rem', borderRadius: '4px' }}>
            <option>Thermal Printer (58mm)</option>
            <option>Thermal Printer (80mm)</option>
            <option>A4 Printer</option>
          </select>
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Logo</label>
          <input type="file" />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Change Password</label>
          <input type="password" placeholder="New Password" style={{ width: '100%', padding: '0.8rem', borderRadius: '4px' }} />
        </div>
        
        <button style={{ background: 'var(--primary)', color: 'white', padding: '1rem', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', marginTop: '1rem' }}>
          Save Settings
        </button>
      </div>

      <h2 style={{ marginTop: '3rem', marginBottom: '2rem' }}>🎨 Theme Marketplace</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '1rem' }}>
        {Object.entries(themes).map(([key, theme]) => (
          <div 
            key={key}
            onClick={() => setCurrentTheme(key)}
            style={{ 
              background: theme.colors['--bg-color'], 
              border: currentTheme === key ? `3px solid ${theme.colors['--primary']}` : '1px solid var(--glass-border)', 
              borderRadius: '12px', 
              padding: '1rem',
              cursor: 'pointer',
              textAlign: 'center',
              boxShadow: currentTheme === key ? `0 0 15px ${theme.colors['--primary']}80` : 'none',
              transition: 'all 0.3s ease'
            }}
          >
            <div style={{ width: '100%', height: '60px', background: theme.colors['--sidebar-bg'], borderRadius: '8px', marginBottom: '0.5rem' }}></div>
            <span style={{ color: theme.colors['--text-main'], fontWeight: 'bold', fontSize: '0.9rem' }}>{theme.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
