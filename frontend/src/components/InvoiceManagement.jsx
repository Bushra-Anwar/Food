import React, { useState } from 'react';
import {
  FileText, Plus, Search, Filter, Download, MoreVertical,
  Printer, Mail, Copy, Trash2, Edit, CheckCircle, Clock, AlertCircle
} from 'lucide-react';
import './InvoiceManagement.css';

const MOCK_INVOICES = [
  {
    id: 'INV-2026-001',
    customer: 'Acme Corp',
    date: '2026-01-15',
    dueDate: '2026-01-30',
    amount: 12500,
    status: 'Paid',
    type: 'Tax Invoice'
  },
  {
    id: 'INV-2026-002',
    customer: 'Global Tech',
    date: '2026-01-20',
    dueDate: '2026-02-04',
    amount: 45000,
    status: 'Overdue',
    type: 'Tax Invoice'
  },
  {
    id: 'INV-2026-003',
    customer: 'Sarah Jenkins',
    date: '2026-02-10',
    dueDate: '2026-02-25',
    amount: 8500,
    status: 'Sent',
    type: 'Proforma'
  },
  {
    id: 'DRAFT-004',
    customer: 'TechVision Ltd',
    date: '2026-02-12',
    dueDate: '2026-02-27',
    amount: 0,
    status: 'Draft',
    type: 'Tax Invoice'
  }
];

export default function InvoiceManagement({ onBack }) {
  const [activeView, setActiveView] = useState('dashboard'); // dashboard, create, view
  const [invoices, setInvoices] = useState(MOCK_INVOICES);
  const [activeTemplate, setActiveTemplate] = useState('modern');

  // Real world functional state for creating invoices
  const [newInvoice, setNewInvoice] = useState({
    id: `INV-2026-00${invoices.length + 1}`,
    customer: 'Acme Corp',
    date: new Date().toISOString().split('T')[0],
    dueDate: '',
    type: 'Tax Invoice',
    items: [{ id: 1, name: '', description: '', qty: 1, rate: 12000, tax: 18, amount: 14160 }],
    discount: 0,
    discountType: '%'
  });

  const handleAddItem = () => {
    setNewInvoice(prev => ({
      ...prev,
      items: [...prev.items, { id: Date.now(), name: '', description: '', qty: 1, rate: 0, tax: 18, amount: 0 }]
    }));
  };

  const handleRemoveItem = (id) => {
    if (newInvoice.items.length === 1) return;
    setNewInvoice(prev => ({
      ...prev,
      items: prev.items.filter(item => item.id !== id)
    }));
  };

  const handleItemChange = (id, field, value) => {
    setNewInvoice(prev => {
      const updatedItems = prev.items.map(item => {
        if (item.id === id) {
          const updated = { ...item, [field]: value };
          const qty = parseFloat(updated.qty) || 0;
          const rate = parseFloat(updated.rate) || 0;
          const tax = parseFloat(updated.tax) || 0;
          updated.amount = (qty * rate) + ((qty * rate * tax) / 100);
          return updated;
        }
        return item;
      });
      return { ...prev, items: updatedItems };
    });
  };

  // Calculate totals
  const subtotal = newInvoice.items.reduce((sum, item) => sum + ((parseFloat(item.qty) || 0) * (parseFloat(item.rate) || 0)), 0);
  const totalTax = newInvoice.items.reduce((sum, item) => sum + (((parseFloat(item.qty) || 0) * (parseFloat(item.rate) || 0) * (parseFloat(item.tax) || 0)) / 100), 0);

  let discountAmount = parseFloat(newInvoice.discount) || 0;
  if (newInvoice.discountType === '%') {
    discountAmount = (subtotal * discountAmount) / 100;
  }

  const grandTotal = subtotal + totalTax - discountAmount;

  const handleSaveInvoice = () => {
    if (grandTotal === 0) {
      alert("Please add items to the invoice before saving.");
      return;
    }
    const newInv = {
      id: newInvoice.id,
      customer: newInvoice.customer,
      date: newInvoice.date,
      dueDate: newInvoice.dueDate || newInvoice.date,
      amount: grandTotal,
      status: 'Sent',
      type: newInvoice.type
    };
    setInvoices([newInv, ...invoices]);
    setActiveView('dashboard');
    // Reset form
    setNewInvoice({
      id: `INV-2026-00${invoices.length + 2}`,
      customer: 'Acme Corp',
      date: new Date().toISOString().split('T')[0],
      dueDate: '',
      type: 'Tax Invoice',
      items: [{ id: 1, name: '', description: '', qty: 1, rate: 0, tax: 18, amount: 0 }],
      discount: 0,
      discountType: '%'
    });
  };

  const renderDashboard = () => (
    <div className="inv-dashboard fade-in">
      <div className="inv-header">
        <div>
          <button className="back-btn" onClick={onBack}>← Back to Home</button>
          <h2 className="inv-title">Invoice Management</h2>
          <p className="inv-subtitle">Create, track, and manage all your billing documents</p>
        </div>
        <div className="header-actions">
          <button className="btn-secondary">Settings & Templates</button>
          <button className="btn-primary rainbow-bg" onClick={() => setActiveView('create')}>
            <Plus size={18} /> Create Invoice
          </button>
        </div>
      </div>

      <div className="metrics-grid">
        <div className="metric-card">
          <div className="metric-icon bg-green"><CheckCircle size={24} /></div>
          <div className="metric-info">
            <h4>Paid This Month</h4>
            <div className="metric-value">₹2.4M</div>
            <div className="metric-trend positive">+15% vs last month</div>
          </div>
        </div>
        <div className="metric-card">
          <div className="metric-icon bg-blue"><Clock size={24} /></div>
          <div className="metric-info">
            <h4>Outstanding</h4>
            <div className="metric-value">₹850K</div>
            <div className="metric-trend">Expected within 30 days</div>
          </div>
        </div>
        <div className="metric-card">
          <div className="metric-icon bg-orange"><AlertCircle size={24} /></div>
          <div className="metric-info">
            <h4>Overdue Invoices</h4>
            <div className="metric-value text-orange">12</div>
            <div className="metric-trend negative">₹320K total value</div>
          </div>
        </div>
        <div className="metric-card">
          <div className="metric-icon bg-purple"><FileText size={24} /></div>
          <div className="metric-info">
            <h4>Drafts / Pending</h4>
            <div className="metric-value">5</div>
            <div className="metric-trend">Needs approval</div>
          </div>
        </div>
      </div>

      <div className="inv-section">
        <div className="section-header-row">
          <div className="tabs-simple">
            <button className="tab-simple active">All Invoices</button>
            <button className="tab-simple">Recurring</button>
            <button className="tab-simple">Credit Notes</button>
            <button className="tab-simple">Debit Notes</button>
          </div>
          <div className="search-filter">
            <div className="search-box">
              <Search size={18} />
              <input type="text" placeholder="Search by invoice # or customer..." />
            </div>
            <button className="btn-secondary"><Filter size={18} /> Filter</button>
            <button className="btn-secondary"><Download size={18} /></button>
          </div>
        </div>

        <div className="table-container">
          <table className="inv-table">
            <thead>
              <tr>
                <th>Invoice Details</th>
                <th>Customer</th>
                <th>Date / Due Date</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map(inv => (
                <tr key={inv.id} className="clickable-row" onClick={() => setActiveView('view')}>
                  <td>
                    <div className="invoice-cell">
                      <strong>{inv.id}</strong>
                      <span className="type-badge">{inv.type}</span>
                    </div>
                  </td>
                  <td>
                    <div className="customer-cell">
                      <div className="avatar small">{inv.customer.charAt(0)}</div>
                      <span>{inv.customer}</span>
                    </div>
                  </td>
                  <td>
                    <div className="date-cell">
                      <span>{inv.date}</span>
                      <span className="sub-text text-orange">Due: {inv.dueDate}</span>
                    </div>
                  </td>
                  <td>
                    <strong>₹{inv.amount.toLocaleString()}</strong>
                  </td>
                  <td>
                    <span className={`status-badge ${inv.status.toLowerCase()}`}>{inv.status}</span>
                  </td>
                  <td>
                    <div className="action-group">
                      <button className="action-btn" onClick={(e) => e.stopPropagation()} title="Print"><Printer size={16} /></button>
                      <button className="action-btn" onClick={(e) => e.stopPropagation()} title="Email"><Mail size={16} /></button>
                      <button className="action-btn" onClick={(e) => e.stopPropagation()}><MoreVertical size={18} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderCreateInvoice = () => (
    <div className="inv-create-view fade-in">
      <div className="inv-header">
        <div>
          <button className="back-btn" onClick={() => setActiveView('dashboard')}>← Back to Invoices</button>
          <h2 className="inv-title">Create Invoice</h2>
          <p className="inv-subtitle">Draft a new tax invoice, proforma, or recurring bill</p>
        </div>
        <div className="header-actions">
          <button className="btn-secondary" onClick={() => setActiveView('dashboard')}>Save as Draft</button>
          <button className="btn-primary rainbow-bg" onClick={handleSaveInvoice}>Save & Send</button>
        </div>
      </div>

      <div className="invoice-form-card">
        {/* Invoice Header Details */}
        <div className="inv-form-header">
          <div className="customer-selection">
            <label>Customer *</label>
            <select className="large-select" value={newInvoice.customer} onChange={(e) => setNewInvoice({ ...newInvoice, customer: e.target.value })}>
              <option value="Select Customer...">Select Customer...</option>
              <option value="Acme Corp">Acme Corp</option>
              <option value="Global Tech">Global Tech</option>
              <option value="Sarah Jenkins">Sarah Jenkins</option>
              <option value="+ Add New Customer">+ Add New Customer</option>
            </select>
          </div>

          <div className="inv-meta-grid">
            <div className="input-group">
              <label>Invoice Number</label>
              <input type="text" value={newInvoice.id} onChange={(e) => setNewInvoice({ ...newInvoice, id: e.target.value })} />
            </div>
            <div className="input-group">
              <label>Invoice Type</label>
              <select value={newInvoice.type} onChange={(e) => setNewInvoice({ ...newInvoice, type: e.target.value })}>
                <option value="Tax Invoice">Tax Invoice</option>
                <option value="Proforma Invoice">Proforma Invoice</option>
                <option value="Recurring Invoice">Recurring Invoice</option>
              </select>
            </div>
            <div className="input-group">
              <label>Invoice Date</label>
              <input type="date" value={newInvoice.date} onChange={(e) => setNewInvoice({ ...newInvoice, date: e.target.value })} />
            </div>
            <div className="input-group">
              <label>Due Date</label>
              <input type="date" value={newInvoice.dueDate} onChange={(e) => setNewInvoice({ ...newInvoice, dueDate: e.target.value })} />
            </div>
          </div>
        </div>

        {/* Invoice Items Table */}
        <div className="inv-items-section">
          <table className="inv-items-table">
            <thead>
              <tr>
                <th width="45%">Item Details</th>
                <th width="15%">Qty</th>
                <th width="15%">Rate (₹)</th>
                <th width="15%">Tax (%)</th>
                <th width="10%">Amount</th>
                <th width="5%"></th>
              </tr>
            </thead>
            <tbody>
              {newInvoice.items.map((item) => (
                <tr key={item.id}>
                  <td>
                    <input type="text" placeholder="Select or type item name..." className="item-input" value={item.name} onChange={(e) => handleItemChange(item.id, 'name', e.target.value)} />
                    <input type="text" placeholder="Description / HSN Code" className="item-sub-input" value={item.description} onChange={(e) => handleItemChange(item.id, 'description', e.target.value)} />
                  </td>
                  <td><input type="number" value={item.qty} onChange={(e) => handleItemChange(item.id, 'qty', e.target.value)} className="num-input" /></td>
                  <td><input type="number" value={item.rate} onChange={(e) => handleItemChange(item.id, 'rate', e.target.value)} className="num-input" /></td>
                  <td>
                    <select className="tax-select" value={item.tax} onChange={(e) => handleItemChange(item.id, 'tax', e.target.value)}>
                      <option value="18">GST 18%</option>
                      <option value="12">GST 12%</option>
                      <option value="5">GST 5%</option>
                      <option value="0">Exempt</option>
                    </select>
                  </td>
                  <td className="item-amount">₹{item.amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                  <td><button className="action-btn text-orange" onClick={() => handleRemoveItem(item.id)}><Trash2 size={16} /></button></td>
                </tr>
              ))}
            </tbody>
          </table>
          <button className="add-row-btn" onClick={handleAddItem}><Plus size={16} /> Add New Row</button>
        </div>

        {/* Invoice Footer / Totals */}
        <div className="inv-form-footer">
          <div className="inv-notes">
            <div className="input-group">
              <label>Customer Notes</label>
              <textarea rows="3" placeholder="Thanks for your business."></textarea>
            </div>
            <div className="input-group">
              <label>Terms & Conditions</label>
              <textarea rows="3" placeholder="Payment due within 15 days..."></textarea>
            </div>
          </div>

          <div className="inv-totals">
            <div className="total-row">
              <span>Subtotal:</span>
              <span>₹{subtotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
            </div>
            <div className="total-row">
              <span>Discount:</span>
              <div className="discount-input">
                <input type="number" placeholder="0" value={newInvoice.discount} onChange={(e) => setNewInvoice({ ...newInvoice, discount: e.target.value })} />
                <select value={newInvoice.discountType} onChange={(e) => setNewInvoice({ ...newInvoice, discountType: e.target.value })}>
                  <option value="%">%</option>
                  <option value="₹">₹</option>
                </select>
              </div>
            </div>
            <div className="total-row">
              <span>Total Tax:</span>
              <span>₹{totalTax.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
            </div>
            <div className="total-row grand-total">
              <span>Total Amount:</span>
              <span className="rainbow-text">₹{grandTotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderInvoicePreview = () => (
    <div className="inv-preview-view fade-in">
      <div className="inv-header">
        <div>
          <button className="back-btn" onClick={() => setActiveView('dashboard')}>← Back to Invoices</button>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <h2 className="inv-title">INV-2024-1123</h2>
            <span className="status-badge paid">Paid</span>
          </div>
        </div>
        <div className="header-actions">
          <select
            value={activeTemplate}
            onChange={(e) => setActiveTemplate(e.target.value)}
            className="btn-secondary"
            style={{ padding: '0.6rem', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-secondary)', color: 'var(--text-primary)' }}
          >
            <option value="modern">A4 Professional Modern (Purple)</option>
            <option value="corporate">A4 Corporate Blue (Blue)</option>
            <option value="minimal">A5 Clean Minimal (Teal)</option>
            <option value="thermal">A5 Thermal Receipt (POS)</option>
          </select>
          <button className="btn-secondary"><Edit size={16} /> Edit</button>
          <button className="btn-secondary"><Download size={16} /> PDF</button>
          <button className="btn-primary rainbow-bg"><Mail size={16} /> Send Email</button>
        </div>
      </div>

      <div className={`invoice-paper template-${activeTemplate}`}>
        {activeTemplate === 'thermal' ? (
          // Thermal Template Content
          <>
            <div className="thermal-header">
              <h2>Smart Mart</h2>
              <p>Quality You Can Trust</p>
              <p>123, Market Street, Bangalore - 560001</p>
              <p>Phone: +91 98765 43210</p>
              <h3 style={{ marginTop: '1rem', borderTop: '1px dashed #000', borderBottom: '1px dashed #000', padding: '0.5rem 0' }}>INVOICE</h3>
            </div>
            <div className="thermal-meta">
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Inv No:</span> <span>SM/24/7766</span></div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Date:</span> <span>15-04-2024</span></div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Bill To:</span> <span>Walk-in Customer</span></div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Cashier:</span> <span>Rakesh</span></div>
            </div>
            <table className="thermal-table">
              <thead><tr><th>ITEM</th><th>QTY</th><th>RATE</th><th>AMT</th></tr></thead>
              <tbody>
                <tr><td>Milk (1L)</td><td>1</td><td>50.00</td><td>50.00</td></tr>
                <tr><td>Bread</td><td>1</td><td>40.00</td><td>40.00</td></tr>
                <tr><td>Eggs (6pcs)</td><td>1</td><td>36.00</td><td>36.00</td></tr>
                <tr><td>Sugar (1kg)</td><td>1</td><td>45.00</td><td>45.00</td></tr>
                <tr><td>Tea Pack (250g)</td><td>1</td><td>85.00</td><td>85.00</td></tr>
              </tbody>
            </table>
            <div className="thermal-totals">
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Subtotal</span> <span>₹256.00</span></div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Discount</span> <span>₹0.00</span></div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '1.2rem', marginTop: '0.5rem', borderTop: '1px dashed #000', paddingTop: '0.5rem' }}><span>Total</span> <span>₹256.00</span></div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.5rem' }}><span>Paid (Cash)</span> <span>₹300.00</span></div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Change</span> <span>₹44.00</span></div>
            </div>
            <div className="thermal-footer">
              <p>Thank you for shopping with us!</p>
              <p>Visit Again!</p>
              <div className="barcode-placeholder"></div>
            </div>
          </>
        ) : (
          // A4/A5 Standard Templates (Modern, Corporate, Minimal)
          <>
            <div className="paper-header">
              <div className="company-details" style={{ color: activeTemplate === 'minimal' ? '#0f766e' : 'inherit' }}>
                {activeTemplate === 'modern' && <h1 style={{ color: '#6b21a8', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1.8rem', fontWeight: 'bold', marginBottom: '1rem' }}><div style={{ width: '30px', height: '30px', background: '#6b21a8', clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}></div> HexaSoft Solutions</h1>}
                {activeTemplate === 'corporate' && <h1 style={{ color: '#1e3a8a', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1.8rem', fontWeight: 'bold', marginBottom: '1rem' }}><div style={{ display: 'flex', alignItems: 'flex-end', height: '30px', gap: '3px' }}><div style={{ width: '6px', height: '20px', background: '#1e3a8a' }}></div><div style={{ width: '8px', height: '30px', background: '#3b82f6' }}></div><div style={{ width: '6px', height: '25px', background: '#1e3a8a' }}></div></div> SUMMIT ENTERPRISES</h1>}
                {activeTemplate === 'minimal' && <h1 style={{ color: '#0f766e', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1.8rem', fontWeight: 'bold', marginBottom: '1rem' }}><span style={{ fontSize: '2rem' }}>🌿</span> GreenLeaf Furniture</h1>}

                <p>+91 98765 43210</p>
                <p>info@company.com</p>
                <p>www.company.com</p>
                <p style={{ marginTop: '0.5rem' }}>123, Business Avenue, Tech Park</p>
                <p>Bangalore - 560100</p>
              </div>
              <div className="invoice-title-area">
                <h2 style={{ color: activeTemplate === 'modern' ? '#6b21a8' : activeTemplate === 'corporate' ? '#1e3a8a' : '#0f766e', fontSize: '2.2rem', fontWeight: 'bold' }}>INVOICE</h2>
                <div className="meta-info" style={{ textAlign: 'left', display: 'inline-block', marginTop: '1rem' }}>
                  <div style={{ display: 'flex', gap: '2rem', marginBottom: '0.5rem' }}>
                    <div style={{ minWidth: '80px', color: '#64748b' }}>Invoice No</div>
                    <div style={{ fontWeight: '500' }}>: INV-2024-1123</div>
                  </div>
                  <div style={{ display: 'flex', gap: '2rem', marginBottom: '0.5rem' }}>
                    <div style={{ minWidth: '80px', color: '#64748b' }}>Invoice Date</div>
                    <div style={{ fontWeight: '500' }}>: 15 Apr 2024</div>
                  </div>
                  <div style={{ display: 'flex', gap: '2rem', marginBottom: '0.5rem' }}>
                    <div style={{ minWidth: '80px', color: '#64748b' }}>Customer ID</div>
                    <div style={{ fontWeight: '500' }}>: CUST-4587</div>
                  </div>
                  <div style={{ display: 'flex', gap: '2rem' }}>
                    <div style={{ minWidth: '80px', color: '#64748b' }}>Due Date</div>
                    <div style={{ fontWeight: '500' }}>: 30 Apr 2024</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="billing-details" style={{ border: 'none', padding: '0', display: 'block', marginTop: '1rem' }}>
              <div className="bill-to" style={{ background: activeTemplate === 'modern' ? '#6b21a8' : activeTemplate === 'corporate' ? '#1e3a8a' : '#0f766e', color: 'white', padding: '0.5rem 1rem', display: 'inline-block', borderRadius: '4px 4px 0 0', margin: '0', fontSize: '0.9rem', fontWeight: 'bold' }}>
                BILL TO
              </div>
              <div style={{ border: `1px solid ${activeTemplate === 'modern' ? '#6b21a8' : activeTemplate === 'corporate' ? '#1e3a8a' : '#0f766e'}`, padding: '1.5rem', width: '300px', borderRadius: '0 4px 4px 4px', borderTopColor: 'transparent', marginTop: '-1px' }}>
                <strong style={{ fontSize: '1.1rem', color: '#000' }}>{activeTemplate === 'modern' ? 'John Doe' : activeTemplate === 'corporate' ? 'ABC Corporation' : 'Home Comforts'}</strong>
                <p style={{ color: '#333', margin: '0.5rem 0 0 0' }}>456, Business Park</p>
                <p style={{ color: '#333', margin: '0.2rem 0' }}>Mumbai - 400070</p>
                <p style={{ color: '#333', margin: '0.2rem 0' }}>Phone: +91 90000 12345</p>
              </div>
            </div>

            <table className="paper-table" style={{ marginTop: '2rem' }}>
              <thead>
                <tr>
                  <th style={{ background: activeTemplate === 'modern' ? '#6b21a8' : activeTemplate === 'corporate' ? '#1e3a8a' : '#0f766e', color: 'white' }}>#</th>
                  <th style={{ background: activeTemplate === 'modern' ? '#6b21a8' : activeTemplate === 'corporate' ? '#1e3a8a' : '#0f766e', color: 'white' }}>DESCRIPTION</th>
                  <th style={{ background: activeTemplate === 'modern' ? '#6b21a8' : activeTemplate === 'corporate' ? '#1e3a8a' : '#0f766e', color: 'white' }}>QTY</th>
                  <th style={{ background: activeTemplate === 'modern' ? '#6b21a8' : activeTemplate === 'corporate' ? '#1e3a8a' : '#0f766e', color: 'white' }}>RATE</th>
                  <th style={{ background: activeTemplate === 'modern' ? '#6b21a8' : activeTemplate === 'corporate' ? '#1e3a8a' : '#0f766e', color: 'white' }}>AMOUNT</th>
                </tr>
              </thead>
              <tbody style={{ color: '#000' }}>
                <tr>
                  <td>1</td>
                  <td style={{ fontWeight: '500' }}>{activeTemplate === 'modern' ? 'Website Design' : activeTemplate === 'corporate' ? 'Consulting Services' : 'Wooden Table'}</td>
                  <td>{activeTemplate === 'corporate' ? '10' : '1'}</td>
                  <td>{activeTemplate === 'modern' ? '₹20,000' : activeTemplate === 'corporate' ? '₹2,500' : '₹12,000'}</td>
                  <td>{activeTemplate === 'modern' ? '₹20,000' : activeTemplate === 'corporate' ? '₹25,000' : '₹12,000'}</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td style={{ fontWeight: '500' }}>{activeTemplate === 'modern' ? 'Logo Design' : activeTemplate === 'corporate' ? 'Software Development' : 'Office Chair'}</td>
                  <td>{activeTemplate === 'corporate' ? '15' : activeTemplate === 'minimal' ? '2' : '1'}</td>
                  <td>{activeTemplate === 'modern' ? '₹5,000' : activeTemplate === 'corporate' ? '₹1,800' : '₹5,500'}</td>
                  <td>{activeTemplate === 'modern' ? '₹5,000' : activeTemplate === 'corporate' ? '₹27,000' : '₹11,000'}</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td style={{ fontWeight: '500' }}>{activeTemplate === 'modern' ? 'SEO Optimization' : activeTemplate === 'corporate' ? 'Maintenance (Monthly)' : 'Bookshelf'}</td>
                  <td>1</td>
                  <td>{activeTemplate === 'modern' ? '₹8,000' : activeTemplate === 'corporate' ? '₹5,000' : '₹6,000'}</td>
                  <td>{activeTemplate === 'modern' ? '₹8,000' : activeTemplate === 'corporate' ? '₹5,000' : '₹6,000'}</td>
                </tr>
              </tbody>
            </table>

            <div className="paper-footer" style={{ marginTop: '2rem', display: 'flex', justifyContent: 'space-between' }}>
              <div className="terms-area" style={{ flex: 1, paddingRight: '2rem' }}>
                <h3 style={{ color: activeTemplate === 'modern' ? '#6b21a8' : activeTemplate === 'corporate' ? '#1e3a8a' : '#0f766e', textTransform: 'uppercase', fontSize: '0.85rem', marginBottom: '0.5rem', fontWeight: 'bold' }}>NOTES</h3>
                <ol style={{ paddingLeft: '1rem', color: '#64748b', fontSize: '0.85rem', margin: '0' }}>
                  <li>Please make payment within 15 days.</li>
                  <li>Payment can be made via bank transfer.</li>
                </ol>
                <p style={{ marginTop: '2rem', color: activeTemplate === 'modern' ? '#6b21a8' : activeTemplate === 'corporate' ? '#1e3a8a' : '#0f766e', fontWeight: 'bold', fontSize: '0.9rem', textTransform: 'uppercase' }}>THANK YOU FOR YOUR BUSINESS!</p>
              </div>

              <div className="paper-totals" style={{ width: '320px' }}>
                <div className="p-total-row" style={{ border: 'none', padding: '0.5rem 1rem', color: '#000' }}>
                  <span>Subtotal</span>
                  <span>{activeTemplate === 'modern' ? '₹33,000' : activeTemplate === 'corporate' ? '₹57,000' : '₹29,000'}</span>
                </div>
                <div className="p-total-row" style={{ border: 'none', padding: '0.5rem 1rem', background: activeTemplate === 'corporate' ? '#1e3a8a' : 'transparent', color: activeTemplate === 'corporate' ? 'white' : '#000' }}>
                  <span>GST (18%)</span>
                  <span>{activeTemplate === 'modern' ? '₹5,940' : activeTemplate === 'corporate' ? '₹10,260' : '₹5,220'}</span>
                </div>
                <div className="p-total-row p-grand-total" style={{ background: activeTemplate === 'modern' ? '#6b21a8' : activeTemplate === 'corporate' ? '#1e3a8a' : '#0f766e', color: 'white', padding: '1rem', margin: '0', border: 'none' }}>
                  <span>Total</span>
                  <span>{activeTemplate === 'modern' ? '₹38,940' : activeTemplate === 'corporate' ? '₹67,260' : '₹34,220'}</span>
                </div>

                <div style={{ textAlign: 'right', marginTop: '3rem' }}>
                  <div style={{ display: 'inline-block', borderTop: '1px solid #000', paddingTop: '0.5rem', width: '200px', textAlign: 'center', color: '#000', fontSize: '0.85rem' }}>
                    Authorized Signatory
                  </div>
                </div>
              </div>
            </div>

            {activeTemplate !== 'minimal' && (
              <div style={{ background: activeTemplate === 'modern' ? '#6b21a8' : '#1e3a8a', color: 'white', padding: '1.5rem', marginTop: '3rem', borderRadius: '0 0 12px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div className="bank-details">
                  <p style={{ color: 'white', marginBottom: '0.5rem', fontSize: '0.85rem', fontWeight: 'bold' }}>Bank Details</p>
                  <div style={{ display: 'grid', gridTemplateColumns: '80px 1fr', gap: '0.5rem', fontSize: '0.85rem' }}>
                    <span>Bank Name:</span> <span>HDFC Bank</span>
                    <span>A/C No.:</span> <span>1234 5678 9012</span>
                    <span>IFSC Code:</span> <span>HDFC0001234</span>
                  </div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ background: 'white', width: '60px', height: '60px', padding: '4px', borderRadius: '4px', marginBottom: '0.5rem', display: 'inline-block' }}>
                    <div style={{ width: '100%', height: '100%', background: 'repeating-linear-gradient(45deg, #000 25%, transparent 25%, transparent 75%, #000 75%, #000), repeating-linear-gradient(45deg, #000 25%, #fff 25%, #fff 75%, #000 75%, #000)', backgroundPosition: '0 0, 4px 4px', backgroundSize: '8px 8px' }}></div>
                  </div>
                  <div style={{ fontSize: '0.75rem' }}>Scan to Pay</div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );

  return (
    <div className="invoice-management-wrapper">
      {activeView === 'dashboard' && renderDashboard()}
      {activeView === 'create' && renderCreateInvoice()}
      {activeView === 'view' && renderInvoicePreview()}
    </div>
  );
}
