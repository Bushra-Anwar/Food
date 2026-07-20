import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Registration = ({ setActiveTab }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    companyName: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        login(data.shop, data.token);
        setActiveTab('SubscriptionDemo'); // Proceed to subscription step
      } else {
        setError(data.message || 'Registration failed');
      }
    } catch (err) {
      setError('Network error');
    }
  };

  return (
    <div className="auth-view fade-in">
      <div className="auth-card">
        <div className="auth-header">
          <h2>Create Account</h2>
          <p>Join <span className="rainbow-text">YourBill</span> today</p>
        </div>
        {error && <div style={{color: 'red', marginBottom: '1rem', textAlign: 'center'}}>{error}</div>}
        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="input-group">
              <label>First Name</label>
              <input type="text" name="firstName" placeholder="John" value={formData.firstName} onChange={handleChange} required />
            </div>
            <div className="input-group">
              <label>Last Name</label>
              <input type="text" name="lastName" placeholder="Doe" value={formData.lastName} onChange={handleChange} required />
            </div>
          </div>
          <div className="input-group">
            <label>Company Name</label>
            <input type="text" name="companyName" placeholder="Acme Inc." value={formData.companyName} onChange={handleChange} required />
          </div>
          <div className="input-group">
            <label>Email Address</label>
            <input type="email" name="email" placeholder="name@company.com" value={formData.email} onChange={handleChange} required />
          </div>
          <div className="input-group">
            <label>Password</label>
            <input type="password" name="password" placeholder="Create a strong password" value={formData.password} onChange={handleChange} required />
          </div>
          <button className="btn-primary rainbow-bg full-width" type="submit">Continue to Plans</button>
        </form>
        <p className="auth-footer">
          Already have an account? <a href="#" onClick={() => setActiveTab('Login')} className="rainbow-text">Login here</a>
        </p>
      </div>
    </div>
  );
};

export default Registration;
