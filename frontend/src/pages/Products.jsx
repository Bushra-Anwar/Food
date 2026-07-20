import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

export default function Products() {
  const { token } = useAuth();
  const [products, setProducts] = useState([]);
  const [showAdd, setShowAdd] = useState(false);
  const [newProduct, setNewProduct] = useState({ name: '', price: '', category: '' });

  const fetchProducts = async () => {
    const res = await fetch('http://localhost:5000/api/products', { headers: { 'Authorization': `Bearer ${token}` } });
    const data = await res.json();
    if (Array.isArray(data)) setProducts(data);
  };

  useEffect(() => {
    fetchProducts();
  }, [token]);

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ ...newProduct, type: 'Physical Product' })
      });
      if (res.ok) {
        alert('Product Added');
        setShowAdd(false);
        setNewProduct({ name: '', price: '', category: '' });
        fetchProducts();
      }
    } catch (err) {
      alert('Error adding product');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure?')) return;
    try {
      await fetch(`http://localhost:5000/api/products/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      fetchProducts();
    } catch (err) {
      alert('Error deleting');
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
        <h2>Products</h2>
        <button onClick={() => setShowAdd(!showAdd)} style={{ background: '#4CAF50', color: 'white', padding: '0.8rem 1.5rem', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          {showAdd ? 'Close' : 'Add Product'}
        </button>
      </div>

      {showAdd && (
        <div style={{ background: 'var(--glass-bg)', padding: '2rem', borderRadius: '12px', marginBottom: '2rem', border: '1px solid var(--glass-border)' }}>
          <h3>Add Product</h3>
          <form onSubmit={handleAdd} style={{ display: 'flex', gap: '1rem', marginTop: '1rem', alignItems: 'flex-end' }}>
            <div style={{ flex: 1 }}>
              <label>Product Name</label>
              <input type="text" value={newProduct.name} onChange={e => setNewProduct({...newProduct, name: e.target.value})} required style={{ width: '100%', padding: '0.8rem', marginTop: '0.5rem', borderRadius: '4px' }} />
            </div>
            <div style={{ flex: 1 }}>
              <label>Price (₹)</label>
              <input type="number" value={newProduct.price} onChange={e => setNewProduct({...newProduct, price: e.target.value})} required style={{ width: '100%', padding: '0.8rem', marginTop: '0.5rem', borderRadius: '4px' }} />
            </div>
            <div style={{ flex: 1 }}>
              <label>Category</label>
              <input type="text" value={newProduct.category} onChange={e => setNewProduct({...newProduct, category: e.target.value})} required style={{ width: '100%', padding: '0.8rem', marginTop: '0.5rem', borderRadius: '4px' }} />
            </div>
            <button type="submit" style={{ background: '#4CAF50', color: 'white', padding: '0.8rem 2rem', border: 'none', borderRadius: '4px', cursor: 'pointer', height: '42px' }}>Save</button>
          </form>
        </div>
      )}

      <div style={{ background: 'var(--glass-bg)', padding: '2rem', borderRadius: '12px', border: '1px solid var(--glass-border)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--glass-border)' }}>
              <th style={{ padding: '1rem 0' }}>Product Name</th>
              <th>Price</th>
              <th>Category</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map(p => (
              <tr key={p._id} style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                <td style={{ padding: '1rem 0' }}>{p.name}</td>
                <td>₹{p.price}</td>
                <td>{p.category}</td>
                <td>
                  <button style={{ background: 'transparent', color: '#4CAF50', border: '1px solid #4CAF50', padding: '0.3rem 0.8rem', borderRadius: '4px', cursor: 'pointer', marginRight: '0.5rem' }}>Edit</button>
                  <button onClick={() => handleDelete(p._id)} style={{ background: '#ff4d4d', color: 'white', border: 'none', padding: '0.4rem 0.8rem', borderRadius: '4px', cursor: 'pointer' }}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
