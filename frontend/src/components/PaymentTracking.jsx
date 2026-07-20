import React, { useState } from 'react';
import { 
  AlertTriangle, CheckCircle, Clock, Search, Filter, 
  Download, Mail, MessageSquare, Phone, Bell, 
  BarChart2, RefreshCw, AlertCircle, FileText, UploadCloud
} from 'lucide-react';
import './PaymentTracking.css';

const MOCK_OUTSTANDING = [
  {
    id: 'CUST-001',
    name: 'ABC Traders',
    totalOutstanding: 60000,
    overdueAmount: 15000,
    aging: { '0-30': 45000, '31-60': 15000, '61-90': 0, '90+': 0 },
    score: 85,
    risk: 'Low',
    lastPayment: '2026-02-28',
    status: 'Active'
  },
  {
    id: 'CUST-002',
    name: 'Global Tech Solutions',
    totalOutstanding: 125000,
    overdueAmount: 85000,
    aging: { '0-30': 40000, '31-60': 60000, '61-90': 25000, '90+': 0 },
    score: 62,
    risk: 'High',
    lastPayment: '2025-12-15',
    status: 'Overdue'
  },
  {
    id: 'CUST-003',
    name: 'Sarah Jenkins',
    totalOutstanding: 8500,
    overdueAmount: 0,
    aging: { '0-30': 8500, '31-60': 0, '61-90': 0, '90+': 0 },
    score: 98,
    risk: 'Low',
    lastPayment: '2026-03-01',
    status: 'Good'
  }
];

const MOCK_RECONCILIATION = [
  { id: 'TXN-001', date: '2026-03-02', desc: 'UPI/ABC Traders', amount: 25000, matchStatus: 'Matched', matchConfidence: '100%' },
  { id: 'TXN-002', date: '2026-03-02', desc: 'NEFT/GlobalTech', amount: 125000, matchStatus: 'Partially Matched', matchConfidence: '80%' },
  { id: 'TXN-003', date: '2026-03-03', desc: 'CASH DEPOSIT', amount: 5000, matchStatus: 'Unmatched', matchConfidence: '0%' },
];

export default function PaymentTracking({ onBack }) {
  const [activeView, setActiveView] = useState('dashboard'); // dashboard, outstanding, reconciliation, reminders
  const [customers] = useState(MOCK_OUTSTANDING);
  const [transactions] = useState(MOCK_RECONCILIATION);

  const renderDashboard = () => (
    <div className="track-dashboard fade-in">
      <div className="track-header">
        <div>
          <button className="back-btn" onClick={onBack}>← Back to Home</button>
          <h2 className="track-title">Payment Tracking & Follow-ups</h2>
          <p className="track-subtitle">Monitor outstanding balances, auto-reconcile, and manage collections</p>
        </div>
        <div className="header-actions">
          <button className="btn-secondary" onClick={() => setActiveView('reconciliation')}>
            <RefreshCw size={18} /> Auto-Reconciliation
          </button>
          <button className="btn-primary rainbow-bg" onClick={() => setActiveView('reminders')}>
            <Bell size={18} /> Collection Workflow
          </button>
        </div>
      </div>

      <div className="metrics-grid">
        <div className="metric-card">
          <div className="metric-icon bg-blue"><BarChart2 size={24} /></div>
          <div className="metric-info">
            <h4>Total Outstanding</h4>
            <div className="metric-value">₹1.8M</div>
            <div className="metric-trend">Across 42 customers</div>
          </div>
        </div>
        <div className="metric-card">
          <div className="metric-icon bg-red"><AlertTriangle size={24} /></div>
          <div className="metric-info">
            <h4>Overdue Amount</h4>
            <div className="metric-value text-red">₹320K</div>
            <div className="metric-trend negative">35% &gt; 60 Days</div>
          </div>
        </div>
        <div className="metric-card">
          <div className="metric-icon bg-orange"><Clock size={24} /></div>
          <div className="metric-info">
            <h4>Due This Week</h4>
            <div className="metric-value text-orange">₹145K</div>
            <div className="metric-trend">12 Invoices pending</div>
          </div>
        </div>
        <div className="metric-card">
          <div className="metric-icon bg-green"><CheckCircle size={24} /></div>
          <div className="metric-info">
            <h4>Avg. Collection Time</h4>
            <div className="metric-value">18 Days</div>
            <div className="metric-trend positive">Collection Rate: 92%</div>
          </div>
        </div>
      </div>

      <div className="track-section">
        <div className="section-header-row">
          <div className="tabs-simple">
            <button className={`tab-simple ${activeView === 'dashboard' ? 'active' : ''}`} onClick={() => setActiveView('dashboard')}>Outstanding Ledger</button>
            <button className="tab-simple" onClick={() => setActiveView('reminders')}>Follow-ups & Reminders</button>
          </div>
          <div className="search-filter">
            <div className="search-box">
              <Search size={18} />
              <input type="text" placeholder="Search customer or invoice..." />
            </div>
            <button className="btn-secondary"><Filter size={18} /> Filter</button>
            <button className="btn-secondary"><Download size={18} /></button>
          </div>
        </div>
        
        <div className="table-container">
          <table className="track-table">
            <thead>
              <tr>
                <th>Customer</th>
                <th>Total Outstanding</th>
                <th>Overdue Amount</th>
                <th>Aging (0-30 | 31-60 | 60+)</th>
                <th>Score / Risk</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {customers.map(cust => (
                <tr key={cust.id} className="clickable-row">
                  <td>
                    <div className="customer-cell">
                      <strong>{cust.name}</strong>
                      <span className="sub-text">Last Paid: {cust.lastPayment}</span>
                    </div>
                  </td>
                  <td>
                    <strong>₹{cust.totalOutstanding.toLocaleString()}</strong>
                  </td>
                  <td>
                    <span className={cust.overdueAmount > 0 ? 'text-red font-bold' : ''}>
                      ₹{cust.overdueAmount.toLocaleString()}
                    </span>
                  </td>
                  <td>
                    <div className="aging-bar-container">
                      <div className="aging-text">
                        <span>₹{cust.aging['0-30'].toLocaleString()}</span>
                        <span>₹{cust.aging['31-60'].toLocaleString()}</span>
                        <span>₹{(cust.aging['61-90'] + cust.aging['90+']).toLocaleString()}</span>
                      </div>
                      <div className="aging-bar">
                        <div className="aging-segment bg-green" style={{flex: cust.aging['0-30'] || 0.1}}></div>
                        <div className="aging-segment bg-orange" style={{flex: cust.aging['31-60'] || 0}}></div>
                        <div className="aging-segment bg-red" style={{flex: cust.aging['61-90'] + cust.aging['90+'] || 0}}></div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="score-cell">
                      <div className="score-badge">
                        <span>{cust.score}/100</span>
                      </div>
                      <span className={`risk-label ${cust.risk.toLowerCase()}`}>{cust.risk} Risk</span>
                    </div>
                  </td>
                  <td>
                    <div className="action-group">
                      <button className="action-btn" title="Send Reminder"><Bell size={16} /></button>
                      <button className="action-btn" title="View Statement"><FileText size={16} /></button>
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

  const renderReminders = () => (
    <div className="reminders-view fade-in">
      <div className="track-header">
        <div>
          <button className="back-btn" onClick={() => setActiveView('dashboard')}>← Back to Dashboard</button>
          <h2 className="track-title">Automated Reminders & Follow-ups</h2>
          <p className="track-subtitle">Manage communication workflows for overdue collections</p>
        </div>
        <div className="header-actions">
          <button className="btn-secondary">Settings & Templates</button>
          <button className="btn-primary rainbow-bg"><Mail size={18} /> Bulk Send Reminders</button>
        </div>
      </div>

      <div className="workflow-container">
        <div className="workflow-sidebar">
          <h3>Collection Workflow</h3>
          <ul className="workflow-steps">
            <li className="workflow-step">
              <div className="step-marker bg-green"></div>
              <div>
                <strong>3 Days Before Due</strong>
                <span className="sub-text">Gentle Email Reminder</span>
              </div>
            </li>
            <li className="workflow-step">
              <div className="step-marker bg-blue"></div>
              <div>
                <strong>On Due Date</strong>
                <span className="sub-text">Email + SMS Alert</span>
              </div>
            </li>
            <li className="workflow-step active">
              <div className="step-marker bg-orange"></div>
              <div>
                <strong>7 Days Overdue</strong>
                <span className="sub-text">WhatsApp + Email Warning</span>
              </div>
            </li>
            <li className="workflow-step">
              <div className="step-marker bg-red"></div>
              <div>
                <strong>15+ Days Overdue</strong>
                <span className="sub-text">Escalate to Phone Call</span>
              </div>
            </li>
          </ul>
        </div>

        <div className="reminder-action-area">
          <div className="action-header">
            <h3>Action Required: High Risk Overdue</h3>
            <span className="badge-red">3 Customers</span>
          </div>

          <div className="reminder-card">
            <div className="reminder-header">
              <div className="cust-info">
                <strong>Global Tech Solutions</strong>
                <span className="sub-text">INV-2025-1100 • Due 15 Jan 2026 (45 Days Overdue)</span>
              </div>
              <strong className="text-red">₹85,000</strong>
            </div>
            <div className="reminder-body">
              <p>Customer has ignored 3 automated emails. Score dropped to 62/100.</p>
              <div className="communication-channels">
                <button className="channel-btn"><Mail size={16} /> Send Warning Email</button>
                <button className="channel-btn whatsapp"><MessageSquare size={16} /> WhatsApp Message</button>
                <button className="channel-btn call"><Phone size={16} /> Log Phone Call</button>
              </div>
            </div>
            <div className="followup-notes">
              <input type="text" placeholder="Add follow-up note (e.g. Promised to pay by Friday)..." />
              <button className="btn-secondary">Save Note</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderReconciliation = () => (
    <div className="recon-view fade-in">
      <div className="track-header">
        <div>
          <button className="back-btn" onClick={() => setActiveView('dashboard')}>← Back to Dashboard</button>
          <h2 className="track-title">Auto-Reconciliation</h2>
          <p className="track-subtitle">Match bank statements and gateway payouts with invoices</p>
        </div>
        <div className="header-actions">
          <button className="btn-secondary"><UploadCloud size={18} /> Upload Bank Statement</button>
          <button className="btn-primary rainbow-bg"><RefreshCw size={18} /> Run Auto-Match</button>
        </div>
      </div>

      <div className="metrics-grid">
        <div className="metric-card">
          <div className="metric-info">
            <h4>Pending Review</h4>
            <div className="metric-value text-orange">24</div>
            <div className="metric-trend">Transactions need matching</div>
          </div>
        </div>
        <div className="metric-card">
          <div className="metric-info">
            <h4>Matched Automatically</h4>
            <div className="metric-value text-green">142</div>
            <div className="metric-trend positive">95% Success Rate</div>
          </div>
        </div>
        <div className="metric-card">
          <div className="metric-info">
            <h4>Unmatched Amounts</h4>
            <div className="metric-value text-red">₹45,200</div>
            <div className="metric-trend negative">Require manual allocation</div>
          </div>
        </div>
      </div>

      <div className="table-container mt-4">
        <table className="track-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Bank Txn Description</th>
              <th>Amount Received</th>
              <th>AI Match Confidence</th>
              <th>Status / Suggested Match</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map(txn => (
              <tr key={txn.id}>
                <td>{txn.date}</td>
                <td><strong>{txn.desc}</strong><br/><span className="sub-text">{txn.id}</span></td>
                <td><strong>₹{txn.amount.toLocaleString()}</strong></td>
                <td>
                  <div className="confidence-cell">
                    <div className="progress-bg">
                      <div className={`progress-fill ${parseInt(txn.matchConfidence) > 85 ? 'bg-green' : parseInt(txn.matchConfidence) > 50 ? 'bg-orange' : 'bg-red'}`} style={{width: txn.matchConfidence}}></div>
                    </div>
                    <span>{txn.matchConfidence}</span>
                  </div>
                </td>
                <td>
                  <span className={`status-badge ${txn.matchStatus.toLowerCase().replace(' ', '-')}`}>{txn.matchStatus}</span>
                  {txn.matchStatus === 'Matched' && <div className="sub-text mt-1">INV-2026-001</div>}
                  {txn.matchStatus === 'Partially Matched' && <div className="sub-text mt-1 text-orange">INV-2026-002 (Suggests Multi-Invoice)</div>}
                </td>
                <td>
                  {txn.matchStatus !== 'Matched' ? (
                    <button className="btn-secondary btn-small">Review Match</button>
                  ) : (
                    <CheckCircle size={20} className="text-green" />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className="payment-tracking-wrapper">
      {activeView === 'dashboard' && renderDashboard()}
      {activeView === 'reminders' && renderReminders()}
      {activeView === 'reconciliation' && renderReconciliation()}
    </div>
  );
}
