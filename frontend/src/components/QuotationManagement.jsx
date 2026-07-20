import React, { useState } from 'react';
import { 
  FileText, Plus, Search, Filter, Download, MoreVertical, 
  Printer, Mail, Copy, Trash2, Edit, CheckCircle, Clock, AlertCircle,
  RefreshCw, Send, CheckSquare, XCircle, FilePlus
} from 'lucide-react';
import './QuotationManagement.css';

const MOCK_QUOTES = [
  {
    id: 'QT-2026-001',
    customer: 'Acme Corp',
    date: '2026-02-10',
    expiryDate: '2026-03-10',
    amount: 155000,
    status: 'Accepted',
    version: 'V2',
    approver: 'Admin'
  },
  {
    id: 'QT-2026-002',
    customer: 'Global Tech',
    date: '2026-02-15',
    expiryDate: '2026-03-15',
    amount: 450000,
    status: 'Pending Approval',
    version: 'V1',
    approver: 'Manager'
  },
  {
    id: 'QT-2026-003',
    customer: 'Sarah Jenkins',
    date: '2026-01-20',
    expiryDate: '2026-02-20',
    amount: 8500,
    status: 'Expired',
    version: 'V1',
    approver: 'Auto'
  },
  {
    id: 'QT-2026-004',
    customer: 'TechVision Ltd',
    date: '2026-02-28',
    expiryDate: '2026-03-28',
    amount: 72000,
    status: 'Converted',
    version: 'V3',
    approver: 'Auto'
  }
];

export default function QuotationManagement({ onBack }) {
  const [activeView, setActiveView] = useState('dashboard'); // dashboard, create, view, approve
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    fetchQuotes();
  }, []);

  const fetchQuotes = async () => {
    try {
      setLoading(true);
      const res = await fetch('http://localhost:5000/api/quotations');
      if (res.ok) {
        const data = await res.json();
        const formatted = data.map(q => ({
          ...q,
          id: q.quoteNumber
        }));
        setQuotes(formatted);
      }
    } catch (err) {
      console.error('Failed to fetch quotes:', err);
    } finally {
      setLoading(false);
    }
  };
  const [selectedQuote, setSelectedQuote] = useState(null);

  // Real world functional state for creating quotes
  const [newQuote, setNewQuote] = useState({
    id: `QT-${Date.now()}`,
    customer: 'Acme Corp',
    salesperson: 'John Doe',
    date: new Date().toISOString().split('T')[0],
    expiryDate: '',
    items: [{ id: 1, name: '', description: '', qty: 1, rate: 0, discount: 0, amount: 0 }],
    notes: '',
    remarks: ''
  });

  const handleAddItem = () => {
    setNewQuote(prev => ({
      ...prev,
      items: [...prev.items, { id: Date.now(), name: '', description: '', qty: 1, rate: 0, discount: 0, amount: 0 }]
    }));
  };

  const handleRemoveItem = (id) => {
    if (newQuote.items.length === 1) return;
    setNewQuote(prev => ({
      ...prev,
      items: prev.items.filter(item => item.id !== id)
    }));
  };

  const handleItemChange = (id, field, value) => {
    setNewQuote(prev => {
      const updatedItems = prev.items.map(item => {
        if (item.id === id) {
          const updated = { ...item, [field]: value };
          const qty = parseFloat(updated.qty) || 0;
          const rate = parseFloat(updated.rate) || 0;
          const discount = parseFloat(updated.discount) || 0;
          const totalBeforeDisc = qty * rate;
          updated.amount = totalBeforeDisc - ((totalBeforeDisc * discount) / 100);
          return updated;
        }
        return item;
      });
      return { ...prev, items: updatedItems };
    });
  };

  // Calculate totals
  const subtotal = newQuote.items.reduce((sum, item) => sum + ((parseFloat(item.qty) || 0) * (parseFloat(item.rate) || 0)), 0);
  const itemDiscounts = newQuote.items.reduce((sum, item) => {
    const qty = parseFloat(item.qty) || 0;
    const rate = parseFloat(item.rate) || 0;
    const discount = parseFloat(item.discount) || 0;
    return sum + (((qty * rate) * discount) / 100);
  }, 0);
  const totalTax = (subtotal - itemDiscounts) * 0.18; // 18% flat tax for dummy
  const grandTotal = subtotal - itemDiscounts + totalTax;

  const handleSaveQuote = async () => {
    if (grandTotal === 0) {
      alert("Please add items to the quotation before saving.");
      return;
    }

    const payload = {
      quoteNumber: newQuote.id,
      customer: newQuote.customer,
      salesperson: newQuote.salesperson,
      date: newQuote.date,
      expiryDate: newQuote.expiryDate || newQuote.date,
      items: newQuote.items.map(i => ({
        name: i.name,
        qty: parseFloat(i.qty) || 0,
        rate: parseFloat(i.rate) || 0,
        discountPercent: parseFloat(i.discount) || 0,
        amount: i.amount
      })),
      subtotal,
      totalDiscount: itemDiscounts,
      totalTax,
      amount: grandTotal,
      status: 'Pending Approval',
      customerNotes: newQuote.notes,
      internalRemarks: newQuote.remarks
    };

    try {
      const res = await fetch('http://localhost:5000/api/quotations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        alert("Quotation saved successfully!");
        await fetchQuotes();
        setActiveView('dashboard');
        // Reset form
        setNewQuote({
          id: `QT-${Date.now()}`,
          customer: '',
          salesperson: '',
          date: new Date().toISOString().split('T')[0],
          expiryDate: '',
          items: [{ id: 1, name: '', description: '', qty: 1, rate: 0, discount: 0, amount: 0 }],
          notes: '',
          remarks: ''
        });
      } else {
        const contentType = res.headers.get("content-type");
        if (contentType && contentType.indexOf("application/json") !== -1) {
          const errData = await res.json();
          alert("Failed to save quotation: " + errData.message);
        } else {
          const errText = await res.text();
          console.error("Backend Error Response:", errText);
          alert("Backend server returned an error. Please ensure you have restarted the backend server to apply the latest API routes.");
        }
      }
    } catch (err) {
      console.error(err);
      alert("Error saving to database. Did you restart the backend server?");
    }
  };

  const handleWhatsAppShare = () => {
    if (grandTotal === 0) {
      alert("Please add items to the quotation before sharing.");
      return;
    }
    let text = `*QUOTATION*\nQuote No: ${newQuote.id}\nCustomer: ${newQuote.customer}\nDate: ${newQuote.date}\n\n*Items:*\n`;
    newQuote.items.forEach((item, idx) => {
      if(item.name) {
        text += `${idx+1}. ${item.name} - Qty: ${item.qty} - ₹${item.amount.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}\n`;
      }
    });
    text += `\n*Subtotal:* ₹${subtotal.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}\n*Discount:* ₹${itemDiscounts.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}\n*Tax (18%):* ₹${totalTax.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}\n\n*GRAND TOTAL: ₹${grandTotal.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}*\n\nThank you for considering our proposal!`;
    
    const encodedText = encodeURIComponent(text);
    const waUrl = `https://wa.me/?text=${encodedText}`;
    window.open(waUrl, '_blank');
  };

  const renderDashboard = () => (
    <div className="quote-dashboard fade-in">
      <div className="quote-header">
        <div>
          <button className="back-btn" onClick={onBack}>← Back to Home</button>
          <h2 className="quote-title">Quotations & Estimates</h2>
          <p className="quote-subtitle">Manage quotes, approvals, and convert them to invoices</p>
        </div>
        <div className="header-actions">
          <button className="btn-secondary" onClick={() => setActiveView('create')}><FilePlus size={18} /> New Estimate</button>
          <button className="btn-primary rainbow-bg" onClick={() => setActiveView('create')}>
            <Plus size={18} /> Create Quotation
          </button>
        </div>
      </div>

      <div className="metrics-grid">
        <div className="metric-card">
          <div className="metric-icon bg-blue"><FileText size={24} /></div>
          <div className="metric-info">
            <h4>Total Quotes Value</h4>
            <div className="metric-value">₹1.2M</div>
            <div className="metric-trend positive">45 active quotes</div>
          </div>
        </div>
        <div className="metric-card">
          <div className="metric-icon bg-orange"><Clock size={24} /></div>
          <div className="metric-info">
            <h4>Pending Approval</h4>
            <div className="metric-value text-orange">8</div>
            <div className="metric-trend">Needs manager action</div>
          </div>
        </div>
        <div className="metric-card">
          <div className="metric-icon bg-green"><CheckSquare size={24} /></div>
          <div className="metric-info">
            <h4>Conversion Rate</h4>
            <div className="metric-value">68%</div>
            <div className="metric-trend positive">+5% vs last month</div>
          </div>
        </div>
        <div className="metric-card">
          <div className="metric-icon bg-red"><AlertCircle size={24} /></div>
          <div className="metric-info">
            <h4>Expiring Soon</h4>
            <div className="metric-value text-red">3</div>
            <div className="metric-trend negative">Expires in 7 days</div>
          </div>
        </div>
      </div>

      <div className="quote-section">
        <div className="section-header-row">
          <div className="tabs-simple">
            <button className="tab-simple active">All Quotes</button>
            <button className="tab-simple">Pending Approval</button>
            <button className="tab-simple">Accepted</button>
            <button className="tab-simple">Expired</button>
          </div>
          <div className="search-filter">
            <div className="search-box">
              <Search size={18} />
              <input type="text" placeholder="Search by quote # or customer..." />
            </div>
            <button className="btn-secondary"><Filter size={18} /> Filter</button>
          </div>
        </div>
        
        <div className="table-container">
          <table className="quote-table">
            <thead>
              <tr>
                <th>Quote Details</th>
                <th>Customer</th>
                <th>Dates</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {quotes.map(quote => (
                <tr key={quote.id} className="clickable-row" onClick={() => { setSelectedQuote(quote); setActiveView('view'); }}>
                  <td>
                    <div className="quote-cell">
                      <strong>{quote.id}</strong>
                      <span className="version-badge">{quote.version}</span>
                    </div>
                  </td>
                  <td>
                    <div className="customer-cell">
                      <span>{quote.customer}</span>
                    </div>
                  </td>
                  <td>
                    <div className="date-cell">
                      <span>Created: {new Date(quote.date).toLocaleDateString()}</span>
                      <span className="sub-text text-orange">Expires: {new Date(quote.expiryDate).toLocaleDateString()}</span>
                    </div>
                  </td>
                  <td>
                    <strong>₹{quote.amount?.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2}) || '0.00'}</strong>
                  </td>
                  <td>
                    <span className={`status-badge ${quote.status ? quote.status.toLowerCase().replace(' ', '-') : 'draft'}`}>{quote.status || 'Draft'}</span>
                  </td>
                  <td>
                    <div className="action-group">
                      <button className="action-btn" onClick={(e) => e.stopPropagation()} title="Email Quote"><Send size={16} /></button>
                      <button className="action-btn" onClick={(e) => { e.stopPropagation(); setActiveView('approve'); }} title="Convert to Invoice"><RefreshCw size={16} /></button>
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

  const renderCreateQuote = () => (
    <div className="quote-create-view fade-in">
      <div className="quote-header">
        <div>
          <button className="back-btn" onClick={() => setActiveView('dashboard')}>← Back to Quotes</button>
          <h2 className="quote-title">Create Quotation</h2>
          <p className="quote-subtitle">Draft a new proposal or estimate for your customer</p>
        </div>
        <div className="header-actions">
          <button className="btn-secondary" onClick={() => handleWhatsAppShare()} style={{display:'flex', alignItems:'center', gap:'0.5rem', background: '#25D366', color: '#fff', border: 'none'}}>
            Share on WhatsApp
          </button>
          <button className="btn-secondary" onClick={handleSaveQuote}>Save as Draft</button>
          <button className="btn-primary rainbow-bg" onClick={handleSaveQuote}>Request Approval</button>
        </div>
      </div>

      <div className="quote-form-card">
        <div className="quote-form-header">
          <div className="customer-selection">
            <label>Customer *</label>
            <input 
              type="text" 
              className="large-select" 
              value={newQuote.customer} 
              onChange={(e) => setNewQuote({...newQuote, customer: e.target.value})}
              placeholder="Type Customer Name..." 
            />
          </div>
          
          <div className="quote-meta-grid">
            <div className="input-group">
              <label>Quote Number</label>
              <input type="text" value={newQuote.id} onChange={(e) => setNewQuote({...newQuote, id: e.target.value})} />
            </div>
            <div className="input-group">
              <label>Salesperson</label>
              <input 
                type="text" 
                value={newQuote.salesperson} 
                onChange={(e) => setNewQuote({...newQuote, salesperson: e.target.value})} 
                placeholder="Type Salesperson Name..."
              />
            </div>
            <div className="input-group">
              <label>Quote Date</label>
              <input type="date" value={newQuote.date} onChange={(e) => setNewQuote({...newQuote, date: e.target.value})} />
            </div>
            <div className="input-group">
              <label>Validity / Expiry</label>
              <input type="date" value={newQuote.expiryDate} onChange={(e) => setNewQuote({...newQuote, expiryDate: e.target.value})} />
            </div>
          </div>
        </div>

        <div className="quote-items-section">
          <table className="quote-items-table">
            <thead>
              <tr>
                <th width="40%">Product / Service</th>
                <th width="15%">Qty</th>
                <th width="15%">Unit Price (₹)</th>
                <th width="15%">Discount (%)</th>
                <th width="10%">Amount</th>
                <th width="5%"></th>
              </tr>
            </thead>
            <tbody>
              {newQuote.items.map((item) => (
                <tr key={item.id}>
                  <td>
                    <input type="text" placeholder="Select item..." className="item-input" value={item.name} onChange={(e) => handleItemChange(item.id, 'name', e.target.value)} />
                    <input type="text" placeholder="Additional description..." className="item-sub-input" value={item.description} onChange={(e) => handleItemChange(item.id, 'description', e.target.value)} />
                  </td>
                  <td><input type="number" className="num-input" value={item.qty} onChange={(e) => handleItemChange(item.id, 'qty', e.target.value)} /></td>
                  <td><input type="number" className="num-input" value={item.rate} onChange={(e) => handleItemChange(item.id, 'rate', e.target.value)} /></td>
                  <td><input type="number" className="num-input text-orange" value={item.discount} onChange={(e) => handleItemChange(item.id, 'discount', e.target.value)} /></td>
                  <td className="item-amount">₹{item.amount.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</td>
                  <td><button className="action-btn text-red" onClick={() => handleRemoveItem(item.id)}><Trash2 size={16} /></button></td>
                </tr>
              ))}
            </tbody>
          </table>
          <button className="add-row-btn" onClick={handleAddItem}><Plus size={16} /> Add Item</button>
        </div>

        <div className="quote-form-footer">
          <div className="quote-notes">
            <div className="input-group">
              <label>Customer Notes (Visible on Quote)</label>
              <textarea 
                rows="2" 
                placeholder="Thank you for considering our proposal."
                value={newQuote.notes}
                onChange={(e) => setNewQuote({...newQuote, notes: e.target.value})}
              ></textarea>
            </div>
            <div className="input-group">
              <label>Internal Remarks (Hidden)</label>
              <textarea 
                rows="2" 
                placeholder="High priority client. Discount approved by Manager."
                value={newQuote.remarks}
                onChange={(e) => setNewQuote({...newQuote, remarks: e.target.value})}
              ></textarea>
            </div>
            <div className="input-group">
              <label>Approval Workflow Trigger</label>
              <div className="approval-warning">
                <AlertCircle size={16} /> Discount &gt; 5% requires Manager Approval before sending.
              </div>
            </div>
          </div>
          
          <div className="quote-totals">
            <div className="total-row">
              <span>Subtotal:</span>
              <span>₹{subtotal.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
            </div>
            <div className="total-row">
              <span>Item Discounts:</span>
              <span className="text-orange">-₹{itemDiscounts.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
            </div>
            <div className="total-row">
              <span>Tax (18%):</span>
              <span>₹{totalTax.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
            </div>
            <div className="total-row grand-total">
              <span>Grand Total:</span>
              <span className="rainbow-text">₹{grandTotal.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderQuotePreview = () => (
    <div className="quote-preview-view fade-in">
      <div className="quote-header">
        <div>
          <button className="back-btn" onClick={() => setActiveView('dashboard')}>← Back to Quotes</button>
          <div style={{display:'flex', alignItems:'center', gap:'1rem'}}>
            <h2 className="quote-title">{selectedQuote?.id || 'QT-2026-001'}</h2>
            <span className={`status-badge ${selectedQuote?.status?.toLowerCase().replace(' ', '-') || 'accepted'}`}>{selectedQuote?.status || 'Accepted'}</span>
            <span className="version-badge">{selectedQuote?.version || 'V2'}</span>
          </div>
        </div>
        <div className="header-actions">
          <button className="btn-secondary"><FilePlus size={16} /> New Version</button>
          <button className="btn-secondary"><Send size={16} /> Resend Portal Link</button>
          <button className="btn-primary rainbow-bg"><RefreshCw size={16} /> Convert to Invoice</button>
        </div>
      </div>

      <div className="quote-paper-container">
        <div className="quote-sidebar">
          <div className="sidebar-section">
            <h3>Approval Workflow</h3>
            <div className="workflow-timeline">
              <div className="timeline-step completed">
                <div className="step-icon"><CheckCircle size={14}/></div>
                <div>
                  <strong>Created</strong>
                  <span>{selectedQuote?.salesperson || 'Sales Rep'} • {selectedQuote?.date ? new Date(selectedQuote.date).toLocaleDateString() : ''}</span>
                </div>
              </div>
              <div className={`timeline-step ${selectedQuote?.status !== 'Draft' ? 'completed' : ''}`}>
                <div className="step-icon"><CheckCircle size={14}/></div>
                <div>
                  <strong>Pending Approval</strong>
                  <span>Sent for review</span>
                </div>
              </div>
              <div className={`timeline-step ${selectedQuote?.status === 'Accepted' ? 'completed' : ''}`}>
                <div className="step-icon"><CheckSquare size={14}/></div>
                <div>
                  <strong>Customer Accepted</strong>
                  <span>{selectedQuote?.status === 'Accepted' ? 'Accepted' : 'Waiting'}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="sidebar-section">
            <h3>Customer Actions</h3>
            <div className="customer-portal-link">
              <p>Public Secure Link:</p>
              <code>https://yourbill.com/q/X9Y2Z</code>
              <button className="copy-btn"><Copy size={14}/> Copy Link</button>
            </div>
            <div className="conversion-status success">
              <CheckCircle size={16} /> Ready for Invoicing
            </div>
          </div>
        </div>

        <div className="quote-paper">
          <div className="paper-header">
            <div className="company-details">
              <h1 className="rainbow-text logo">YourBill</h1>
              <p>Quotation / Estimate</p>
            </div>
            <div className="quote-title-area">
              <h2>QUOTATION</h2>
              <div className="meta-info">
                <div><strong>Quote #:</strong> {selectedQuote?.id}</div>
                <div><strong>Date:</strong> {selectedQuote?.date ? new Date(selectedQuote.date).toLocaleDateString() : ''}</div>
                <div><strong>Valid Until:</strong> <span className="text-red">{selectedQuote?.expiryDate ? new Date(selectedQuote.expiryDate).toLocaleDateString() : ''}</span></div>
              </div>
            </div>
          </div>

          <div className="billing-details">
            <div className="bill-to">
              <h3>Prepared For:</h3>
              <strong>{selectedQuote?.customer}</strong>
              <p>Pune, Maharashtra</p>
            </div>
          </div>

          <table className="paper-table">
            <thead>
              <tr>
                <th>Item & Description</th>
                <th>Qty</th>
                <th>Rate</th>
                <th>Discount</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {selectedQuote?.items && selectedQuote.items.map((item, idx) => (
                <tr key={idx}>
                  <td><strong>{item.name}</strong></td>
                  <td>{item.qty}</td>
                  <td>₹{item.rate?.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</td>
                  <td>{item.discountPercent || 0}%</td>
                  <td>₹{item.amount?.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="paper-footer">
            <div className="terms-area">
              <h3>Terms & Conditions</h3>
              <p>1. Quotation valid until {selectedQuote?.expiryDate ? new Date(selectedQuote.expiryDate).toLocaleDateString() : 'specified date'}.</p>
              {selectedQuote?.customerNotes && <p><strong>Notes:</strong> {selectedQuote.customerNotes}</p>}
            </div>
            
            <div className="paper-totals">
              <div className="p-total-row">
                <span>Subtotal:</span>
                <span>₹{selectedQuote?.subtotal?.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2}) || '0.00'}</span>
              </div>
              <div className="p-total-row">
                <span>Discount:</span>
                <span className="text-orange">-₹{selectedQuote?.totalDiscount?.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2}) || '0.00'}</span>
              </div>
              <div className="p-total-row">
                <span>Tax:</span>
                <span>₹{selectedQuote?.totalTax?.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2}) || '0.00'}</span>
              </div>
              <div className="p-total-row p-grand-total">
                <span>Total Estimate:</span>
                <span>₹{selectedQuote?.amount?.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2}) || '0.00'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="quote-management-wrapper">
      {activeView === 'dashboard' && renderDashboard()}
      {activeView === 'create' && renderCreateQuote()}
      {activeView === 'view' && renderQuotePreview()}
      {activeView === 'approve' && renderQuotePreview()}
    </div>
  );
}
