import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import './SubscriptionDemo.css';

export default function SubscriptionDemo({ onBack }) {
  const [loading, setLoading] = useState(false);
  const { token, user, login } = useContext(AuthContext);

  const handlePayment = async (plan, amount) => {
    if (!user || !token) {
      alert("Please login or register first.");
      onBack();
      return;
    }

    setLoading(true);

    try {
      // Create Order
      const res = await fetch('http://localhost:5000/api/payment/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ amount, plan })
      });

      const orderData = await res.json();

      if (!res.ok) {
        throw new Error(orderData.message || "Failed to create order");
      }

      const options = {
        key: orderData.key_id,
        amount: orderData.order.amount,
        currency: "INR",
        name: "YourBill SaaS",
        description: `Subscription for ${plan} plan`,
        order_id: orderData.order.id,
        handler: async function (response) {
          try {
            const verifyRes = await fetch('http://localhost:5000/api/payment/verify', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
              },
              body: JSON.stringify({
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature
              })
            });

            const verifyData = await verifyRes.json();

            if (verifyRes.ok) {
              alert("Payment successful! Subscription Activated.");
              // Update user context
              login({ ...user, subscriptionStatus: 'active' }, token);
              // Navigate to dashboard automatically ( handled by App.jsx if activeTab was managed, 
              // but we need to trigger it. Let's assume onBack goes to home/dashboard based on state, 
              // but since we don't have setActiveTab here, we should pass it or handle in App.jsx.
              // Actually we just call a global reload or onBack()
              window.location.reload();
            } else {
              alert("Payment verification failed.");
            }
          } catch (err) {
            console.error(err);
            alert("Error verifying payment.");
          }
        },
        prefill: {
          name: user.firstName + ' ' + user.lastName,
          email: user.email,
        },
        theme: {
          color: "#3399cc"
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

    } catch (err) {
      console.error(err);
      alert("Error initiating payment");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="demo-container fade-in">
      <button className="back-btn-absolute" onClick={onBack}>← Back to Main</button>
      <div className="demo-left">
        <h1>Select Your Subscription</h1>
        <p className="demo-subtitle">Choose the plan that fits your business needs.</p>

        <ul className="demo-benefits">
          <li><span>✓</span> Real-time Sync across devices</li>
          <li><span>✓</span> Unlimited Invoices & Quotations</li>
          <li><span>✓</span> Priority Customer Support</li>
        </ul>

        <div className="trust-section">
          <p>Trusted by more than <strong>1 Crore+</strong> businesses</p>
          <div className="trust-badges">
            <div className="badge">Best Tech Brands</div>
            <div className="badge">100% Data Privacy</div>
          </div>
        </div>
      </div>

      <div className="demo-right" style={{ display: 'flex', flexDirection: 'column', gap: '2rem', justifyContent: 'center' }}>

        <div className="plan-card" style={{ background: 'var(--glass-bg)', padding: '2rem', borderRadius: '12px', border: '1px solid var(--glass-border)' }}>
          <h2>Basic Plan</h2>
          <p style={{ fontSize: '2rem', margin: '1rem 0' }}>₹499 <span style={{ fontSize: '1rem', opacity: 0.7 }}>/ month</span></p>
          <ul style={{ listStyle: 'none', padding: 0, marginBottom: '2rem' }}>
            <li>Up to 1000 invoices</li>
            <li>Basic inventory</li>
          </ul>
          <button className="btn-primary rainbow-bg full-width" onClick={() => handlePayment('Basic', 499)} disabled={loading}>
            {loading ? 'Processing...' : 'Subscribe Basic'}
          </button>
        </div>

        <div className="plan-card" style={{ background: 'var(--glass-bg)', padding: '2rem', borderRadius: '12px', border: '1px solid var(--glass-border)', borderColor: '#FFD700' }}>
          <h2>Pro Plan <span style={{ fontSize: '0.8rem', background: '#FFD700', color: '#000', padding: '0.2rem 0.5rem', borderRadius: '10px', marginLeft: '10px' }}>Popular</span></h2>
          <p style={{ fontSize: '2rem', margin: '1rem 0' }}>₹999 <span style={{ fontSize: '1rem', opacity: 0.7 }}>/ month</span></p>
          <ul style={{ listStyle: 'none', padding: 0, marginBottom: '2rem' }}>
            <li>Unlimited invoices</li>
            <li>Advanced Inventory & AI</li>
          </ul>
          <button className="btn-primary rainbow-bg full-width" onClick={() => handlePayment('Pro', 999)} disabled={loading}>
            {loading ? 'Processing...' : 'Subscribe Pro'}
          </button>
        </div>

      </div>
    </div>
  );
}
