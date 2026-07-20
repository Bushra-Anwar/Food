import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function Reports() {
  const { token } = useAuth();
  const [invoices, setInvoices] = useState([]);
  const [stats, setStats] = useState({ today: 0, yesterday: 0, monthly: 0 });

  useEffect(() => {
    fetch('http://localhost:5000/api/invoices', { headers: { 'Authorization': `Bearer ${token}` } })
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setInvoices(data);
          
          let today = 0, yesterday = 0, monthly = 0;
          const todayDate = new Date();
          const yesterdayDate = new Date(todayDate);
          yesterdayDate.setDate(yesterdayDate.getDate() - 1);
          
          data.forEach(inv => {
            const invDate = new Date(inv.createdAt);
            if (invDate.toDateString() === todayDate.toDateString()) today += inv.amount;
            if (invDate.toDateString() === yesterdayDate.toDateString()) yesterday += inv.amount;
            if (invDate.getMonth() === todayDate.getMonth() && invDate.getFullYear() === todayDate.getFullYear()) {
              monthly += inv.amount;
            }
          });
          
          setStats({ today, yesterday, monthly });
        }
      });
  }, [token]);

  return (
    <div style={{ padding: '2rem' }}>
      <h2 style={{ marginBottom: '2rem' }}>Reports</h2>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
        <div style={{ background: 'var(--glass-bg)', padding: '2rem', borderRadius: '12px', border: '1px solid var(--glass-border)' }}>
          <h3>Today's Sale</h3>
          <p style={{ fontSize: '2rem', color: '#4CAF50', fontWeight: 'bold' }}>₹{stats.today}</p>
        </div>
        <div style={{ background: 'var(--glass-bg)', padding: '2rem', borderRadius: '12px', border: '1px solid var(--glass-border)' }}>
          <h3>Yesterday</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>₹{stats.yesterday}</p>
        </div>
        <div style={{ background: 'var(--glass-bg)', padding: '2rem', borderRadius: '12px', border: '1px solid var(--glass-border)' }}>
          <h3>Monthly</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>₹{stats.monthly}</p>
        </div>
      </div>

      <div style={{ background: 'var(--glass-bg)', padding: '2rem', borderRadius: '12px', border: '1px solid var(--glass-border)' }}>
        <h3>Recent Bills</h3>
        <hr style={{ margin: '1rem 0', borderColor: 'var(--glass-border)' }} />
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
              <th style={{ padding: '1rem 0' }}>Bill No</th>
              <th>Amount</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map(inv => (
              <tr key={inv._id} style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                <td style={{ padding: '1rem 0' }}>{inv.invoiceNumber}</td>
                <td style={{ color: '#4CAF50', fontWeight: 'bold' }}>₹{inv.amount}</td>
                <td>{new Date(inv.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
