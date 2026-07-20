import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function Dashboard() {
  const { user, token } = useAuth();
  const [stats, setStats] = useState({
    todaySale: 0,
    billsToday: 0,
    productsCount: 0
  });

  useEffect(() => {
    // Fetch dashboard stats from backend
    // Since backend might not have this specific /dashboard endpoint yet, we just mock or leave it
    const fetchStats = async () => {
      try {
        const invoicesRes = await fetch('http://localhost:5000/api/invoices', { headers: { 'Authorization': `Bearer ${token}` } });
        const productsRes = await fetch('http://localhost:5000/api/products', { headers: { 'Authorization': `Bearer ${token}` } });
        
        const invoices = await invoicesRes.json();
        const products = await productsRes.json();
        
        let todaySale = 0;
        let billsToday = 0;
        
        const today = new Date().toDateString();
        if (Array.isArray(invoices)) {
          invoices.forEach(inv => {
            if (new Date(inv.createdAt).toDateString() === today) {
              todaySale += inv.amount || 0;
              billsToday++;
            }
          });
        }
        
        setStats({
          todaySale,
          billsToday,
          productsCount: Array.isArray(products) ? products.length : 0
        });
      } catch (err) {
        console.error("Error fetching stats", err);
      }
    };
    if (token) fetchStats();
  }, [token]);

  return (
    <div style={{ padding: '2rem' }}>
      <h1 style={{ marginBottom: '2rem' }}>Welcome {user?.companyName || user?.firstName}</h1>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
        <div style={{ background: 'var(--glass-bg)', padding: '2rem', borderRadius: '12px', border: '1px solid var(--glass-border)' }}>
          <h3>Today's Sale</h3>
          <p style={{ fontSize: '2rem', color: 'var(--primary)', fontWeight: 'bold', transition: 'color 0.3s ease' }}>₹{stats.todaySale}</p>
        </div>
        <div style={{ background: 'var(--glass-bg)', padding: '2rem', borderRadius: '12px', border: '1px solid var(--glass-border)' }}>
          <h3>Bills Today</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>{stats.billsToday}</p>
        </div>
        <div style={{ background: 'var(--glass-bg)', padding: '2rem', borderRadius: '12px', border: '1px solid var(--glass-border)' }}>
          <h3>Products</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>{stats.productsCount}</p>
        </div>
        <div style={{ background: 'var(--glass-bg)', padding: '2rem', borderRadius: '12px', border: '1px solid var(--glass-border)' }}>
          <h3>Subscription</h3>
          <p style={{ fontSize: '1.5rem', color: 'var(--primary)', fontWeight: 'bold', transition: 'color 0.3s ease' }}>{user?.subscriptionStatus === 'active' ? 'Active' : 'Inactive'}</p>
        </div>
      </div>

      <div style={{ background: 'var(--glass-bg)', padding: '2rem', borderRadius: '12px', border: '1px solid var(--glass-border)', marginTop: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h2>🏆 Level 8: Billing Master</h2>
          <span style={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'var(--primary)' }}>2,450 XP</span>
        </div>
        
        <div style={{ width: '100%', height: '12px', background: 'rgba(255,255,255,0.1)', borderRadius: '6px', overflow: 'hidden', marginBottom: '1rem' }}>
          <div style={{ width: '80%', height: '100%', background: 'var(--primary)', transition: 'all 0.5s ease' }}></div>
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-main)', opacity: 0.8 }}>
          <span>★★★★★★★★☆☆</span>
          <span>Next Reward: <strong>Free Premium Theme</strong></span>
        </div>
      </div>
    </div>
  );
}
