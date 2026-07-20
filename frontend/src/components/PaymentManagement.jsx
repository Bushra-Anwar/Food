import React, { useState } from 'react';
import { 
  CreditCard, Plus, Search, Filter, Download, MoreVertical, 
  Printer, Mail, Smartphone, Landmark, Banknote, Wallet, 
  CheckCircle, Clock, AlertCircle, RefreshCw, FileText, ArrowUpRight
} from 'lucide-react';
import './PaymentManagement.css';

const MOCK_PAYMENTS = [
  {
    id: 'REC-2026-00001',
    customer: 'Acme Corp',
    date: '2026-03-01',
    invoiceRef: 'INV-2026-00125',
    method: 'UPI',
    amount: 25000,
    status: 'Successful',
    type: 'Full Payment'
  },
  {
    id: 'REC-2026-00002',
    customer: 'Global Tech',
    date: '2026-03-02',
    invoiceRef: 'Multiple (3)',
    method: 'Bank Transfer',
    amount: 150000,
    status: 'Processing',
    type: 'Multi-Invoice'
  },
  {
    id: 'REC-2026-00003',
    customer: 'Sarah Jenkins',
    date: '2026-03-02',
    invoiceRef: 'INV-2026-00127',
    method: 'Credit Card',
    amount: 5000,
    status: 'Successful',
    type: 'Partial'
  },
  {
    id: 'ADV-2026-00004',
    customer: 'TechVision Ltd',
    date: '2026-03-03',
    invoiceRef: 'N/A',
    method: 'Cash',
    amount: 20000,
    status: 'Successful',
    type: 'Advance'
  }
];

export default function PaymentManagement({ onBack }) {
  const [activeView, setActiveView] = useState('dashboard'); // dashboard, record, receipt
  const [payments] = useState(MOCK_PAYMENTS);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('UPI');

  const renderDashboard = () => (
    <div className="pay-dashboard fade-in">
      <div className="pay-header">
        <div>
          <button className="back-btn" onClick={onBack}>← Back to Home</button>
          <h2 className="pay-title">Payment Collections</h2>
          <p className="pay-subtitle">Manage incoming payments, advances, refunds, and reconciliation</p>
        </div>
        <div className="header-actions">
          <button className="btn-secondary"><RefreshCw size={18} /> Reconcile</button>
          <button className="btn-primary rainbow-bg" onClick={() => setActiveView('record')}>
            <Plus size={18} /> Record Payment
          </button>
        </div>
      </div>

      <div className="metrics-grid">
        <div className="metric-card">
          <div className="metric-icon bg-green"><Banknote size={24} /></div>
          <div className="metric-info">
            <h4>Today's Collections</h4>
            <div className="metric-value">₹45,000</div>
            <div className="metric-trend positive">+12% vs yesterday</div>
          </div>
        </div>
        <div className="metric-card">
          <div className="metric-icon bg-blue"><CreditCard size={24} /></div>
          <div className="metric-info">
            <h4>Monthly Collections</h4>
            <div className="metric-value">₹1.8M</div>
            <div className="metric-trend positive">On track for target</div>
          </div>
        </div>
        <div className="metric-card">
          <div className="metric-icon bg-purple"><ArrowUpRight size={24} /></div>
          <div className="metric-info">
            <h4>Advance Received</h4>
            <div className="metric-value">₹120K</div>
            <div className="metric-trend">Unallocated</div>
          </div>
        </div>
        <div className="metric-card">
          <div className="metric-icon bg-orange"><AlertCircle size={24} /></div>
          <div className="metric-info">
            <h4>Outstanding Total</h4>
            <div className="metric-value text-orange">₹850K</div>
            <div className="metric-trend negative">From 42 invoices</div>
          </div>
        </div>
      </div>

      <div className="pay-section">
        <div className="section-header-row">
          <div className="tabs-simple">
            <button className="tab-simple active">All Payments</button>
            <button className="tab-simple">Advances</button>
            <button className="tab-simple">Refunds</button>
            <button className="tab-simple">Reconciliation</button>
          </div>
          <div className="search-filter">
            <div className="search-box">
              <Search size={18} />
              <input type="text" placeholder="Search by receipt #, customer..." />
            </div>
            <button className="btn-secondary"><Filter size={18} /> Filter</button>
          </div>
        </div>
        
        <div className="table-container">
          <table className="pay-table">
            <thead>
              <tr>
                <th>Receipt / Date</th>
                <th>Customer</th>
                <th>Invoice Ref</th>
                <th>Method</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {payments.map(pay => (
                <tr key={pay.id} className="clickable-row" onClick={() => { setSelectedPayment(pay); setActiveView('receipt'); }}>
                  <td>
                    <div className="pay-cell">
                      <strong>{pay.id}</strong>
                      <span className="sub-text">{pay.date}</span>
                    </div>
                  </td>
                  <td>
                    <div className="customer-cell">
                      <span>{pay.customer}</span>
                      <span className="type-badge">{pay.type}</span>
                    </div>
                  </td>
                  <td>{pay.invoiceRef}</td>
                  <td>
                    <div className="method-cell">
                      {pay.method === 'UPI' && <Smartphone size={16} className="text-blue"/>}
                      {pay.method === 'Bank Transfer' && <Landmark size={16} className="text-purple"/>}
                      {pay.method === 'Credit Card' && <CreditCard size={16} className="text-orange"/>}
                      {pay.method === 'Cash' && <Banknote size={16} className="text-green"/>}
                      <span>{pay.method}</span>
                    </div>
                  </td>
                  <td>
                    <strong>₹{pay.amount.toLocaleString()}</strong>
                  </td>
                  <td>
                    <span className={`status-badge ${pay.status.toLowerCase()}`}>{pay.status}</span>
                  </td>
                  <td>
                    <div className="action-group">
                      <button className="action-btn" onClick={(e) => e.stopPropagation()} title="Email Receipt"><Mail size={16} /></button>
                      <button className="action-btn" onClick={(e) => e.stopPropagation()} title="Print"><Printer size={16} /></button>
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

  const renderRecordPayment = () => (
    <div className="pay-record-view fade-in">
      <div className="pay-header">
        <div>
          <button className="back-btn" onClick={() => setActiveView('dashboard')}>← Back to Collections</button>
          <h2 className="pay-title">Record Payment</h2>
          <p className="pay-subtitle">Log an incoming payment, advance, or partial settlement</p>
        </div>
        <div className="header-actions">
          <button className="btn-secondary" onClick={() => setActiveView('dashboard')}>Cancel</button>
          <button className="btn-primary rainbow-bg" onClick={() => setActiveView('dashboard')}>Save Payment</button>
        </div>
      </div>

      <div className="pay-form-layout">
        <div className="pay-form-main">
          <div className="pay-form-card">
            <h3>Payment Details</h3>
            <div className="pay-meta-grid">
              <div className="input-group full-span">
                <label>Customer *</label>
                <select className="large-select">
                  <option>Select Customer...</option>
                  <option>Acme Corp</option>
                  <option>Global Tech</option>
                </select>
              </div>
              <div className="input-group">
                <label>Amount Received (₹) *</label>
                <input type="number" className="large-input" placeholder="0.00" defaultValue="25000" />
              </div>
              <div className="input-group">
                <label>Payment Date</label>
                <input type="date" defaultValue="2026-03-03" />
              </div>
              <div className="input-group">
                <label>Payment Number</label>
                <input type="text" defaultValue="REC-2026-00005" />
              </div>
            </div>

            <h3 className="mt-4">Payment Method</h3>
            <div className="method-selector">
              <div className={`method-card ${paymentMethod === 'UPI' ? 'active' : ''}`} onClick={() => setPaymentMethod('UPI')}>
                <Smartphone size={24} />
                <span>UPI</span>
              </div>
              <div className={`method-card ${paymentMethod === 'Bank Transfer' ? 'active' : ''}`} onClick={() => setPaymentMethod('Bank Transfer')}>
                <Landmark size={24} />
                <span>Bank Transfer</span>
              </div>
              <div className={`method-card ${paymentMethod === 'Credit/Debit Card' ? 'active' : ''}`} onClick={() => setPaymentMethod('Credit/Debit Card')}>
                <CreditCard size={24} />
                <span>Card</span>
              </div>
              <div className={`method-card ${paymentMethod === 'Cash' ? 'active' : ''}`} onClick={() => setPaymentMethod('Cash')}>
                <Banknote size={24} />
                <span>Cash</span>
              </div>
              <div className={`method-card ${paymentMethod === 'Wallet' ? 'active' : ''}`} onClick={() => setPaymentMethod('Wallet')}>
                <Wallet size={24} />
                <span>Wallet</span>
              </div>
            </div>

            {/* Dynamic Method Fields */}
            <div className="method-dynamic-fields">
              {paymentMethod === 'UPI' && (
                <div className="pay-meta-grid">
                  <div className="input-group">
                    <label>UPI Transaction ID</label>
                    <input type="text" placeholder="e.g. 312345678901" />
                  </div>
                  <div className="input-group">
                    <label>UPI App (Optional)</label>
                    <select>
                      <option>Google Pay</option>
                      <option>PhonePe</option>
                      <option>Paytm</option>
                      <option>BHIM</option>
                    </select>
                  </div>
                </div>
              )}
              {paymentMethod === 'Bank Transfer' && (
                <div className="pay-meta-grid">
                  <div className="input-group">
                    <label>UTR / Reference Number</label>
                    <input type="text" placeholder="e.g. SBIN20260001234" />
                  </div>
                  <div className="input-group">
                    <label>Bank Name</label>
                    <input type="text" placeholder="e.g. HDFC Bank" />
                  </div>
                </div>
              )}
              {paymentMethod === 'Cash' && (
                <div className="cash-warning">
                  <AlertCircle size={18} /> Cash payments require end-of-day register closing.
                </div>
              )}
            </div>
            
            <div className="input-group full-span mt-4">
              <label>Internal Notes</label>
              <textarea rows="2" placeholder="Any remarks regarding this payment..."></textarea>
            </div>
          </div>
        </div>

        <div className="pay-form-sidebar">
          <div className="allocation-card">
            <h3>Invoice Allocation</h3>
            <p className="sub-text mb-4">Allocate the received ₹25,000 to outstanding invoices or keep as advance.</p>
            
            <div className="invoice-list-mini">
              <div className="invoice-item-mini selected">
                <div className="inv-mini-header">
                  <strong>INV-2026-00125</strong>
                  <span className="text-orange">Due: ₹45,000</span>
                </div>
                <div className="inv-mini-action">
                  <span>Allocate:</span>
                  <input type="number" defaultValue="25000" className="alloc-input" />
                </div>
              </div>
              <div className="invoice-item-mini">
                <div className="inv-mini-header">
                  <strong>INV-2026-00101</strong>
                  <span className="text-orange">Due: ₹12,000</span>
                </div>
                <div className="inv-mini-action">
                  <span>Allocate:</span>
                  <input type="number" placeholder="0.00" className="alloc-input" />
                </div>
              </div>
            </div>

            <div className="allocation-summary">
              <div className="alloc-row">
                <span>Amount Received:</span>
                <strong>₹25,000</strong>
              </div>
              <div className="alloc-row">
                <span>Amount Allocated:</span>
                <strong className="text-green">₹25,000</strong>
              </div>
              <div className="alloc-row">
                <span>Excess / Advance:</span>
                <strong>₹0</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderReceipt = () => (
    <div className="pay-receipt-view fade-in">
      <div className="pay-header">
        <div>
          <button className="back-btn" onClick={() => setActiveView('dashboard')}>← Back to Collections</button>
          <div style={{display:'flex', alignItems:'center', gap:'1rem'}}>
            <h2 className="pay-title">Payment Receipt</h2>
            <span className="status-badge successful">Successful</span>
          </div>
        </div>
        <div className="header-actions">
          <button className="btn-secondary"><Printer size={16} /> Print</button>
          <button className="btn-secondary"><Download size={16} /> PDF</button>
          <button className="btn-primary rainbow-bg"><Mail size={16} /> Email Receipt</button>
        </div>
      </div>

      <div className="receipt-paper">
        <div className="receipt-header-strip">
          <h2>OFFICIAL RECEIPT</h2>
          <span>Receipt No: {selectedPayment?.id || 'REC-2026-00001'}</span>
        </div>
        
        <div className="receipt-top-content">
          <div className="company-info-receipt">
            <h1 className="rainbow-text logo">YourBill</h1>
            <p>123 Business Avenue, Tech Park</p>
            <p>Mumbai, Maharashtra, 400001</p>
          </div>
          <div className="receipt-date-info">
            <p><strong>Date:</strong> {selectedPayment?.date || '2026-03-01'}</p>
            <p><strong>Method:</strong> {selectedPayment?.method || 'UPI'}</p>
          </div>
        </div>

        <div className="receipt-body">
          <div className="received-from">
            <h3>Received From:</h3>
            <p className="customer-name">{selectedPayment?.customer || 'Acme Corp'}</p>
          </div>
          
          <div className="amount-highlight">
            <div className="amount-box">
              <span className="currency">₹</span>
              <span className="value">{selectedPayment?.amount?.toLocaleString() || '25,000'}</span>
            </div>
            <p className="amount-words text-secondary">Twenty-Five Thousand Rupees Only</p>
          </div>

          <div className="allocation-details">
            <h3>Payment Allocation</h3>
            <table className="alloc-table">
              <thead>
                <tr>
                  <th>Invoice Reference</th>
                  <th>Original Amount</th>
                  <th>Allocated Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{selectedPayment?.invoiceRef || 'INV-2026-00125'}</td>
                  <td>₹45,000.00</td>
                  <td>₹25,000.00</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="receipt-footer">
          <div className="signatures">
            <div className="sig-box">
              <div className="sig-line"></div>
              <span>Authorized Signature</span>
            </div>
          </div>
          <p className="thank-you-note">Thank you for your business!</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="payment-management-wrapper">
      {activeView === 'dashboard' && renderDashboard()}
      {activeView === 'record' && renderRecordPayment()}
      {activeView === 'receipt' && renderReceipt()}
    </div>
  );
}
