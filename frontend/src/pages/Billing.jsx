import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

export default function Billing() {
  const { token } = useAuth();
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [cart, setCart] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/products', { headers: { 'Authorization': `Bearer ${token}` } })
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setProducts(data);
      });
  }, [token]);

  const filteredProducts = products.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));

  const addToCart = (product) => {
    const existing = cart.find(item => item._id === product._id);
    if (existing) {
      setCart(cart.map(item => item._id === product._id ? { ...item, qty: item.qty + 1 } : item));
    } else {
      setCart([...cart, { ...product, qty: 1 }]);
    }
  };

  const generateBill = async () => {
    if (cart.length === 0) return alert('Cart is empty');
    const totalAmount = cart.reduce((acc, item) => acc + (item.price * item.qty), 0);
    
    try {
      const res = await fetch('http://localhost:5000/api/invoices', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({
          invoiceNumber: `INV-${Date.now()}`,
          clientName: 'Walk-in Customer',
          amount: totalAmount,
          status: 'Paid',
          items: cart
        })
      });
      if (res.ok) {
        alert('Bill Generated Successfully!');
        setCart([]);
      } else {
        alert('Failed to generate bill');
      }
    } catch (err) {
      alert('Error saving bill');
    }
  };

  return (
    <div style={{ padding: '2rem', display: 'flex', gap: '2rem' }}>
      <div style={{ flex: 2, background: 'var(--glass-bg)', padding: '2rem', borderRadius: '12px' }}>
        <h2>Search Product</h2>
        <input 
          type="text" 
          placeholder="Search items..." 
          value={search} 
          onChange={e => setSearch(e.target.value)}
          style={{ width: '100%', padding: '0.8rem', margin: '1rem 0', borderRadius: '4px' }}
        />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '1rem' }}>
          {filteredProducts.map(p => (
            <div key={p._id} style={{ border: '1px solid var(--glass-border)', padding: '1rem', borderRadius: '8px', textAlign: 'center' }}>
              <h4>{p.name}</h4>
              <p>₹{p.price}</p>
              <button onClick={() => addToCart(p)} style={{ background: '#4CAF50', color: 'white', border: 'none', padding: '0.5rem 1rem', borderRadius: '4px', cursor: 'pointer', marginTop: '0.5rem' }}>+</button>
            </div>
          ))}
        </div>
      </div>

      <div style={{ flex: 1, background: 'var(--glass-bg)', padding: '2rem', borderRadius: '12px', height: 'fit-content' }}>
        <h2>Items</h2>
        <hr style={{ margin: '1rem 0', borderColor: 'var(--glass-border)' }} />
        {cart.map(item => (
          <div key={item._id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span>{item.name} x {item.qty}</span>
            <span>₹{item.price * item.qty}</span>
          </div>
        ))}
        <hr style={{ margin: '1rem 0', borderColor: 'var(--glass-border)' }} />
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.2rem', fontWeight: 'bold' }}>
          <span>Total</span>
          <span>₹{cart.reduce((acc, item) => acc + (item.price * item.qty), 0)}</span>
        </div>
        <button onClick={generateBill} style={{ background: '#4CAF50', color: 'white', border: 'none', padding: '1rem', width: '100%', borderRadius: '4px', cursor: 'pointer', marginTop: '2rem', fontWeight: 'bold' }}>
          Generate Bill
        </button>
      </div>
    </div>
  );
}
