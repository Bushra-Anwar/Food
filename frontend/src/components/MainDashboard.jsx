import React, { useState } from 'react';
import './MainDashboard.css';
import SubscriptionDemo from './SubscriptionDemo';
import POSBilling from './POSBilling';

const MainDashboard = ({ setActiveTab, theme, toggleTheme }) => {
  const [activeMenu, setActiveMenu] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // For mobile hamburger
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [billingMode, setBillingMode] = useState('standard'); // 'standard' or 'pos'

  const menuCategories = [
    {
      section: "Main Overview", items: [
        { id: 'dashboard', category: "Home", icon: "📊", isInternal: true }
      ]
    },
    {
      section: "1. Buyer Operations", items: [
        { id: 'CustomerManagement', category: "Buyers", icon: "👥" },
        { id: 'InvoiceManagement', category: "Invoice", icon: "📄" },
        { id: 'QuotationManagement', category: "Quotes", icon: "📝" },
        { id: 'PaymentManagement', category: "Payments", icon: "💳" },
        { id: 'EcommerceIntegration', category: "E-commerce", icon: "🛒" },
        { id: 'NotificationsManagement', category: "Alerts", icon: "🔔" },
        { id: 'DocumentManagement', category: "Print/PDF", icon: "📑" }
      ]
    },
    {
      section: "2. Seller (Client) Shortcuts", items: [
        { id: 'ProductServiceManagement', category: "Product & Services", icon: "📦" },
        { id: 'InventoryManagement', category: "Inventory & Stock", icon: "🏢" },
        { id: 'AccountingManagement', category: "Accounts & Ledger", icon: "📘" },
        { id: 'TaxManagement', category: "GST & Taxes", icon: "🏛️" },
        { id: 'ReportsAnalytics', category: "Business Analytics", icon: "📊" },
        { id: 'AIFeatures', category: "AI Insights", icon: "✨" }
      ]
    },
    {
      section: "3. Admin Capabilities", items: [
        { id: 'AdminPanel', category: "Platform Settings", icon: "⚙️" },
        { id: 'SubscriptionManagement', category: "Client Subscriptions", icon: "🔄" },
        { id: 'UserManagement', category: "Admin Roles & Access", icon: "🔐" },
        { id: 'AdvancedFeatures', category: "Advanced SaaS Controls", icon: "🚀" }
      ]
    }
  ];

  const handleMenuClick = (item) => {
    if (item.isInternal) {
      setActiveMenu(item.id);
      setIsSidebarOpen(false);
    } else {
      setActiveTab(item.id);
    }
  };

  // Billing Form State
  const [invoiceItems, setInvoiceItems] = useState([
    { id: 1, name: '', qty: 1, price: 0, tax: 0, total: 0 }
  ]);

  const handleItemChange = (id, field, value) => {
    setInvoiceItems(prev => prev.map(item => {
      if (item.id === id) {
        const updated = { ...item, [field]: value };
        // Calculate total for this row
        const qty = parseFloat(updated.qty) || 0;
        const price = parseFloat(updated.price) || 0;
        const tax = parseFloat(updated.tax) || 0;
        updated.total = (qty * price) + ((qty * price * tax) / 100);
        return updated;
      }
      return item;
    }));
  };

  const addItemRow = () => {
    const newId = invoiceItems.length > 0 ? invoiceItems[invoiceItems.length - 1].id + 1 : 1;
    setInvoiceItems([...invoiceItems, { id: newId, name: '', qty: 1, price: 0, tax: 0, total: 0 }]);
  };

  const subtotal = invoiceItems.reduce((sum, item) => sum + ((parseFloat(item.qty) || 0) * (parseFloat(item.price) || 0)), 0);
  const taxTotal = invoiceItems.reduce((sum, item) => sum + (((parseFloat(item.qty) || 0) * (parseFloat(item.price) || 0) * (parseFloat(item.tax) || 0)) / 100), 0);

  const [customerName, setCustomerName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [gstin, setGstin] = useState('');
  const [discount, setDiscount] = useState(0);
  const [notes, setNotes] = useState('');

  const discountAmount = parseFloat(discount) || 0;
  const grandTotal = subtotal + taxTotal - discountAmount;

  const handleSaveAndPrint = async () => {
    if (!customerName) {
      alert('Please enter a customer name.');
      return;
    }
    if (grandTotal <= 0) {
      alert('Please add valid items to the invoice.');
      return;
    }

    const payload = {
      invoiceNumber: `INV-${Date.now()}`,
      customer: customerName,
      date: new Date(),
      type: 'Sale Invoice',
      items: invoiceItems.map(item => ({
        name: item.name,
        qty: parseFloat(item.qty),
        rate: parseFloat(item.price),
        tax: parseFloat(item.tax),
        amount: item.total
      })),
      subtotal,
      totalTax: taxTotal,
      discount: discountAmount,
      amount: grandTotal,
      status: 'Paid',
      notes: notes
    };

    try {
      const response = await fetch('http://localhost:5000/api/invoices', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        alert('Invoice successfully saved to Database!');
        window.print();
        setCustomerName('');
        setPhoneNumber('');
        setGstin('');
        setInvoiceItems([{ id: 1, name: '', qty: 1, price: 0, tax: 0, total: 0 }]);
        setDiscount(0);
        setNotes('');
      } else {
        alert('Failed to save invoice.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error saving to database. Is the backend running?');
    }
  };

  const handleWhatsAppShare = () => {
    if (!customerName || grandTotal <= 0) {
      alert('Please fill out the invoice first.');
      return;
    }
    let text = `*SALE INVOICE*\nCustomer: ${customerName}\nDate: ${new Date().toLocaleDateString()}\n\n*Items:*\n`;
    invoiceItems.forEach((item, idx) => {
      if (item.name) {
        text += `${idx + 1}. ${item.name} - Qty: ${item.qty} - ₹${item.total.toFixed(2)}\n`;
      }
    });
    text += `\n*Subtotal:* ₹${subtotal.toFixed(2)}\n*Tax:* ₹${taxTotal.toFixed(2)}\n*Discount:* ₹${discountAmount.toFixed(2)}\n\n*GRAND TOTAL: ₹${grandTotal.toFixed(2)}*\n\nThank you for your business!`;

    const encodedText = encodeURIComponent(text);
    const waUrl = phoneNumber ? `https://wa.me/${phoneNumber.replace(/[^0-9]/g, '')}?text=${encodedText}` : `https://wa.me/?text=${encodedText}`;
    window.open(waUrl, '_blank');
  };

  return (
    <div className="main-dashboard-layout">
      {/* Hamburger Overlay */}
      {isSidebarOpen && <div className="sidebar-overlay" onClick={() => setIsSidebarOpen(false)}></div>}

      {/* Left Sidebar Navigation Menu */}
      <aside className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-brand">
          <span className="rainbow-text logo" onClick={() => setActiveTab('Explore')} style={{ cursor: 'pointer' }}>YourBill</span>
          <button className="close-sidebar-btn" onClick={() => setIsSidebarOpen(false)}>✕</button>
        </div>
        <div className="sidebar-menu">
          {menuCategories.map((group, index) => (
            <div key={index} className="menu-section">
              <div className="menu-section-title">{group.section}</div>
              {group.items.map((item) => (
                <div
                  key={item.id}
                  className={`menu-item ${activeMenu === item.id ? 'active' : ''}`}
                  onClick={() => handleMenuClick(item)}
                >
                  <span className="icon">{item.icon}</span> {item.category}
                </div>
              ))}
            </div>
          ))}
          <div className="menu-section" style={{ marginTop: 'auto', borderTop: '1px solid var(--glass-border)', paddingTop: '1rem' }}>
            <div className="menu-item" onClick={toggleTheme} style={{ display: 'flex', alignItems: 'center' }}>
              <span className="icon">{theme === 'light' ? '🌙' : '☀️'}</span>
              <span>{theme === 'light' ? 'Dark Mode' : 'Light Mode'}</span>
            </div>
          </div>
        </div>
      </aside>

      <div className="main-content-area">
        {/* Main Top Header Bar */}
        <header className="top-header">
          <div className="header-left">
            <div className="company-branding">
              <button className="hamburger-btn" onClick={() => setIsSidebarOpen(true)}>
                ≡
              </button>
              <span className="logo-icon">🏢</span>
              <select className="company-select">
                <option>Nexus Business Profile</option>
                <option>Secondary Branch</option>
              </select>
              <button
                className="header-btn"
                onClick={() => setActiveTab('Home')}
                style={{ marginLeft: '10px', background: 'transparent', border: '1px solid var(--glass-border)', padding: '0.4rem 0.8rem', borderRadius: '8px', cursor: 'pointer', color: 'var(--text-main)', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '5px' }}
              >
                🏠 Main Site
              </button>
            </div>
          </div>
          <div className="header-center">
            <div className="search-bar-container">
              <span className="search-icon">🔍</span>
              <input type="text" placeholder="Search Parties, Items, Invoices..." className="universal-search" />
            </div>
          </div>
          <div className="header-right">
            <button className="upgrade-btn header-btn" onClick={() => setActiveMenu('subscription-demo')} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', background: 'linear-gradient(45deg, #FFD700, #FDB931)', color: '#000', padding: '0.5rem 1rem', borderRadius: '8px', fontWeight: 'bold', border: 'none', cursor: 'pointer', fontSize: '0.9rem' }}>
              👑 Subscription
            </button>
            <button className="create-new-btn rainbow-bg" onClick={() => setActiveMenu('sale-invoice')}>
              + Create New
            </button>
            <div className="header-actions">
              <div className="notification-wrapper">
                <div className="notification-bell header-btn" onClick={() => setShowNotifications(!showNotifications)}>
                  🔔 <span className="badge">3</span>
                </div>
                {showNotifications && (
                  <div className="dropdown-menu fade-in">
                    <div className="dropdown-header">Notifications</div>
                    <div className="dropdown-item"><strong>System:</strong> New update available</div>
                    <div className="dropdown-item"><strong>Billing:</strong> Payment received for INV-001</div>
                    <div className="dropdown-item"><strong>Inventory:</strong> Low stock on 'Wireless Mouse'</div>
                  </div>
                )}
              </div>

              <div className="profile-wrapper">
                <div className="profile-avatar" onClick={() => setShowProfile(!showProfile)}>👤</div>
                {showProfile && (
                  <div className="dropdown-menu fade-in" style={{ right: 0 }}>
                    <div className="dropdown-header">My Profile</div>
                    <div className="dropdown-item">Settings</div>
                    <div className="dropdown-item">Billing Plan</div>
                    <div className="dropdown-divider"></div>
                    <div className="dropdown-item text-red">Log Out</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Dynamic Content */}
        <div className="dynamic-content fade-in">
          {activeMenu === 'dashboard' && (
            <div className="dashboard-content dropship-style">

              <div className="hero-section text-center">
                <span className="hero-badge">⚡ Next-Gen Billing SaaS is live!</span>
                <h1 className="hero-title">
                  Discover intelligent <br />
                  <span className="gradient-text">workflows</span> to scale your business
                </h1>
                <p className="hero-subtitle">
                  Streamline operations, manage inventory, and gain real-time insights into your revenue, sales, and customers in one unified platform.
                </p>
                <div className="hero-actions">
                  <button className="btn-primary rainbow-bg pulse-btn" onClick={() => setActiveMenu('sale-invoice')}>Start Billing</button>
                  <button className="btn-secondary glass-btn" onClick={() => setActiveTab('ReportsAnalytics')}>View Reports</button>
                </div>
              </div>


              <div className="floating-modules-container">
                <img src="/hero_billing.png" alt="Billing Software Hero" className="center-hero-img" />

                <div className="floating-card pos-2" onClick={() => setActiveTab('ProductServiceManagement')}>
                  <div className="fc-icon theme-icon">📦</div>
                  <div className="fc-info">
                    <strong>Products</strong>
                    <span>Manage Catalog</span>
                  </div>
                </div>

                <div className="floating-card pos-3" onClick={() => setActiveTab('InventoryManagement')}>
                  <div className="fc-icon theme-icon">🏢</div>
                  <div className="fc-info">
                    <strong>Inventory</strong>
                    <span>Stock & Tracking</span>
                  </div>
                </div>

                <div className="floating-card pos-4" onClick={() => setActiveTab('CustomerManagement')}>
                  <div className="fc-icon theme-icon">👥</div>
                  <div className="fc-info">
                    <strong>Customers</strong>
                    <span>Client Profiles</span>
                  </div>
                </div>

                <div className="floating-card pos-5 featured-float" onClick={() => setActiveMenu('sale-invoice')}>
                  <div className="fc-icon theme-icon">🧾</div>
                  <div className="fc-info">
                    <strong>Billing / POS</strong>
                    <span>Fast Checkout</span>
                  </div>
                </div>

                <div className="floating-card pos-6" onClick={() => setActiveTab('PaymentManagement')}>
                  <div className="fc-icon theme-icon">💳</div>
                  <div className="fc-info">
                    <strong>Payments</strong>
                    <span>Receivables</span>
                  </div>
                </div>

                <div className="floating-card pos-7" onClick={() => setActiveTab('ReportsAnalytics')}>
                  <div className="fc-icon theme-icon">📈</div>
                  <div className="fc-info">
                    <strong>Sales History</strong>
                    <span>Past Transactions</span>
                  </div>
                </div>

                <div className="floating-card pos-8" onClick={() => setActiveTab('ReportsAnalytics')}>
                  <div className="fc-icon theme-icon">📊</div>
                  <div className="fc-info">
                    <strong>Reports</strong>
                    <span>Tax & Growth</span>
                  </div>
                </div>

                <div className="floating-card pos-9" onClick={() => setActiveTab('AccountingManagement')}>
                  <div className="fc-icon theme-icon">💸</div>
                  <div className="fc-info">
                    <strong>Expenses</strong>
                    <span>Cost Management</span>
                  </div>
                </div>

                <div className="floating-card pos-10" onClick={() => setActiveTab('AdminPanel')}>
                  <div className="fc-icon theme-icon">⚙️</div>
                  <div className="fc-info">
                    <strong>Settings</strong>
                    <span>App Configuration</span>
                  </div>
                </div>

              </div>

              {/* 3D Isometric Priority Workflow Section */}
              <div className="priority-workflow-container">
                <h3 className="workflow-title">Priority Setup <span className="gradient-text">Workflow</span></h3>

                <div className="workflow-3d-wrapper">
                  <div className="workflow-bg-line">
                    <div className="bg-diamond" style={{ left: '12%' }}></div>
                    <div className="bg-diamond" style={{ left: '37%' }}></div>
                    <div className="bg-diamond" style={{ left: '62%' }}></div>
                  </div>

                  <div className="workflow-nodes-3d">

                    <div className="w-node-3d" onClick={() => setActiveTab('CustomerManagement')}>
                      <div className="node-platform-3d"></div>
                      <div className="node-content-3d">
                        <div className="node-number-badge">1</div>
                        <div className="node-icon-img">👥</div>
                        <div className="node-label-3d">Add Parties</div>
                      </div>
                    </div>

                    <div className="w-node-3d" onClick={() => setActiveTab('ProductServiceManagement')}>
                      <div className="node-platform-3d"></div>
                      <div className="node-content-3d">
                        <div className="node-number-badge">2</div>
                        <div className="node-icon-img">📦</div>
                        <div className="node-label-3d">Add Items</div>
                      </div>
                    </div>

                    <div className="w-node-3d" onClick={() => setActiveMenu('sale-invoice')}>
                      <div className="node-platform-3d"></div>
                      <div className="node-content-3d">
                        <div className="node-number-badge">3</div>
                        <div className="node-icon-img">🧾</div>
                        <div className="node-label-3d">Create Invoice</div>
                      </div>
                    </div>

                    <div className="w-node-3d" onClick={() => setActiveTab('PaymentManagement')}>
                      <div className="node-platform-3d"></div>
                      <div className="node-content-3d">
                        <div className="node-number-badge">4</div>
                        <div className="node-icon-img">💳</div>
                        <div className="node-label-3d">Collect Payment</div>
                      </div>
                    </div>

                  </div>
                </div>

                <button className="workflow-explore-btn pulse-btn rainbow-bg" onClick={() => setActiveTab('AdminPanel')}>EXPLORE THE MENU.</button>
              </div>

            </div>
          )}

          {activeMenu === 'sale-invoice' && billingMode === 'standard' && (
            <div className="billing-screen-content fade-in">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <button className="back-btn" onClick={() => setActiveMenu('dashboard')} style={{ background: 'transparent', color: 'var(--text-main)', border: '1px solid var(--glass-border)', padding: '0.5rem 1rem', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  ← Back to Dashboard
                </button>
                <button className="upgrade-btn rainbow-bg" onClick={() => setBillingMode('pos')} style={{ padding: '0.5rem 1rem', borderRadius: '8px', cursor: 'pointer', border: 'none', color: '#fff', fontWeight: 'bold' }}>
                  Switch to POS Mode ⚡
                </button>
              </div>
              <div className="billing-header">
                <h2>Create Sale Invoice</h2>
                <span className="invoice-date">Date: {new Date().toLocaleDateString('en-IN')}</span>
              </div>

              {/* Party Details Section */}
              <div className="party-details-section panel">
                <h3>Party Details</h3>
                <div className="form-row">
                  <div className="input-group">
                    <label>Customer Name</label>
                    <input
                      type="text"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="Type Customer Name..."
                      className="autocomplete-combobox"
                      style={{ padding: '0.8rem', borderRadius: '8px', border: '1px solid var(--glass-border)', background: 'var(--glass-bg)', color: 'var(--text-main)' }}
                    />
                  </div>
                  <div className="input-group">
                    <label>Phone Number</label>
                    <input
                      type="text"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      placeholder="e.g. 9876543210"
                      style={{ padding: '0.8rem', borderRadius: '8px', border: '1px solid var(--glass-border)', background: 'var(--glass-bg)', color: 'var(--text-main)' }}
                    />
                  </div>
                  <div className="input-group">
                    <label>GSTIN</label>
                    <input
                      type="text"
                      value={gstin}
                      onChange={(e) => setGstin(e.target.value)}
                      placeholder="Enter GST Number"
                      style={{ padding: '0.8rem', borderRadius: '8px', border: '1px solid var(--glass-border)', background: 'var(--glass-bg)', color: 'var(--text-main)' }}
                    />
                  </div>
                </div>
              </div>

              {/* Itemized Dynamic Table */}
              <div className="itemized-table-section panel">
                <h3>Invoice Items</h3>
                <div className="table-responsive">
                  <table className="billing-table">
                    <thead>
                      <tr>
                        <th>S.No.</th>
                        <th style={{ width: '35%' }}>Item Name</th>
                        <th>Quantity</th>
                        <th>Unit Price (₹)</th>
                        <th>Tax (%)</th>
                        <th>Total (₹)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {invoiceItems.map((item, index) => (
                        <tr key={item.id}>
                          <td>{index + 1}</td>
                          <td>
                            <input
                              type="text"
                              placeholder="Type Item Name..."
                              value={item.name}
                              onChange={(e) => handleItemChange(item.id, 'name', e.target.value)}
                              className="item-select"
                              style={{ width: '100%', padding: '0.5rem', background: 'transparent', color: 'var(--text-main)', border: '1px solid var(--glass-border)', borderRadius: '4px' }}
                            />
                          </td>
                          <td>
                            <input
                              type="number"
                              min="1"
                              value={item.qty}
                              onChange={(e) => handleItemChange(item.id, 'qty', e.target.value)}
                              className="qty-input"
                            />
                          </td>
                          <td>
                            <input
                              type="number"
                              value={item.price}
                              onChange={(e) => handleItemChange(item.id, 'price', e.target.value)}
                              className="price-input"
                            />
                          </td>
                          <td>
                            <select
                              value={item.tax}
                              onChange={(e) => handleItemChange(item.id, 'tax', e.target.value)}
                              className="tax-select"
                            >
                              <option value="0">0%</option>
                              <option value="5">5%</option>
                              <option value="12">12%</option>
                              <option value="18">18%</option>
                              <option value="28">28%</option>
                            </select>
                          </td>
                          <td className="row-total">₹ {item.total.toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <button className="add-row-btn" onClick={addItemRow}>+ Add Row</button>
              </div>

              {/* Total Billing Summary & Checkout */}
              <div className="billing-footer">
                <div className="billing-notes">
                  <label>Notes / Terms</label>
                  <textarea
                    placeholder="Enter terms and conditions..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                  ></textarea>
                </div>
                <div className="billing-summary panel">
                  <div className="summary-row">
                    <span>Subtotal:</span>
                    <span>₹ {subtotal.toFixed(2)}</span>
                  </div>
                  <div className="summary-row">
                    <span>Tax (GST):</span>
                    <span>₹ {taxTotal.toFixed(2)}</span>
                  </div>
                  <div className="summary-row discount-row">
                    <span>Discount (₹):</span>
                    <input
                      type="number"
                      placeholder="0.00"
                      className="discount-input"
                      value={discount}
                      onChange={(e) => setDiscount(e.target.value)}
                    />
                  </div>
                  <div className="summary-row grand-total">
                    <span>Grand Total:</span>
                    <span>₹ {grandTotal.toFixed(2)}</span>
                  </div>
                  <div className="checkout-actions">
                    <button className="btn-primary rainbow-bg full-width" onClick={handleSaveAndPrint}>Save & Print</button>
                    <button className="whatsapp-share-btn full-width" onClick={handleWhatsAppShare} style={{ background: '#25D366', color: '#fff', border: 'none' }}>Share on WhatsApp</button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeMenu === 'sale-invoice' && billingMode === 'pos' && (
            <POSBilling onBack={() => setBillingMode('standard')} />
          )}

          {activeMenu === 'subscription-demo' && (
            <SubscriptionDemo onBack={() => setActiveMenu('dashboard')} />
          )}

          {(activeMenu !== 'dashboard' && activeMenu !== 'sale-invoice' && activeMenu !== 'subscription-demo') && (
            <div className="placeholder-content fade-in">
              <h2>{activeMenu.charAt(0).toUpperCase() + activeMenu.slice(1).replace('-', ' ')}</h2>
              <p>This module is under construction.</p>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="mobile-bottom-nav mobile-only">
        <div className={`nav-item ${activeMenu === 'dashboard' ? 'active' : ''}`} onClick={() => setActiveMenu('dashboard')}>
          <span className="icon">📊</span>
          <span>Home</span>
        </div>
        <div className={`nav-item ${activeMenu === 'parties' ? 'active' : ''}`} onClick={() => setActiveMenu('parties')}>
          <span className="icon">👥</span>
          <span>Parties</span>
        </div>
        <div className="nav-item action-btn" onClick={() => setActiveMenu('sale-invoice')}>
          <div className="floating-btn rainbow-bg">+</div>
          <span>Sale</span>
        </div>
        <div className={`nav-item ${activeMenu === 'items' ? 'active' : ''}`} onClick={() => setActiveMenu('items')}>
          <span className="icon">📦</span>
          <span>Items</span>
        </div>
        <div className={`nav-item ${activeMenu === 'settings' ? 'active' : ''}`} onClick={() => setIsSidebarOpen(true)}>
          <span className="icon">≡</span>
          <span>Menu</span>
        </div>
      </div>
    </div>
  );
};

export default MainDashboard;
