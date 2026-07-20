import React, { useState } from 'react';
import { 
  Landmark, BookOpen, PieChart, TrendingDown, TrendingUp,
  DollarSign, FileText, CheckCircle, Search, Plus, Filter,
  RefreshCw, Settings, AlertTriangle, Lock, FileSpreadsheet
} from 'lucide-react';
import './AccountingManagement.css';

export default function AccountingManagement({ onBack }) {
  const [activeTab, setActiveTab] = useState('dashboard'); 

  const renderDashboard = () => (
    <div className="am-view fade-in">
      <div className="am-header">
        <div>
          <button className="back-btn" onClick={onBack}>← Back to Home</button>
          <h2 className="am-title">Accounting & Finance</h2>
          <p className="am-subtitle">Double-entry accounting, ledgers, journals, and reconciliation</p>
        </div>
        <div style={{display:'flex', gap:'1rem'}}>
          <button className="btn-secondary"><FileSpreadsheet size={16}/> Export Reports</button>
          <button className="btn-primary rainbow-bg"><Plus size={16} /> New Journal Entry</button>
        </div>
      </div>

      <div className="grid-4">
        <div className="metric-card">
          <div className="metric-icon bg-blue"><Landmark size={24}/></div>
          <div className="metric-info">
            <h4>Total Assets</h4>
            <div className="metric-value">₹1,24,50,000</div>
            <div className="metric-trend positive">Cash, Bank, AR, Inventory</div>
          </div>
        </div>
        <div className="metric-card">
          <div className="metric-icon" style={{background:'rgba(239, 68, 68, 0.1)', color:'#ef4444'}}><TrendingDown size={24}/></div>
          <div className="metric-info">
            <h4>Total Liabilities</h4>
            <div className="metric-value text-orange">₹34,20,000</div>
            <div className="metric-trend negative">AP, GST Payable, Loans</div>
          </div>
        </div>
        <div className="metric-card">
          <div className="metric-icon bg-purple"><PieChart size={24}/></div>
          <div className="metric-info">
            <h4>Total Equity</h4>
            <div className="metric-value">₹90,30,000</div>
            <div className="metric-trend">Capital + Retained Earnings</div>
          </div>
        </div>
        <div className="metric-card">
          <div className="metric-icon bg-green"><TrendingUp size={24}/></div>
          <div className="metric-info">
            <h4>Net Profit (YTD)</h4>
            <div className="metric-value">₹18,50,000</div>
            <div className="metric-trend positive">Revenue - Expenses</div>
          </div>
        </div>
      </div>

      <div className="grid-2">
        <div className="am-section">
          <h3>Financial Snapshot</h3>
          <table className="am-table" style={{marginTop:'1.5rem'}}>
            <tbody>
              <tr>
                <td><strong>Cash Balance</strong></td>
                <td style={{textAlign:'right'}}>₹ 1,50,000</td>
              </tr>
              <tr>
                <td><strong>Bank Balance (HDFC)</strong></td>
                <td style={{textAlign:'right'}}>₹ 42,00,000</td>
              </tr>
              <tr>
                <td><strong>Accounts Receivable (AR)</strong></td>
                <td style={{textAlign:'right', color:'#10b981'}}>₹ 15,20,000</td>
              </tr>
              <tr>
                <td><strong>Accounts Payable (AP)</strong></td>
                <td style={{textAlign:'right', color:'#ef4444'}}>₹ 8,40,000</td>
              </tr>
              <tr>
                <td><strong>GST Liability (Current Month)</strong></td>
                <td style={{textAlign:'right', color:'#ef4444'}}>₹ 2,15,000</td>
              </tr>
            </tbody>
          </table>
          <button className="btn-secondary" style={{width:'100%', marginTop:'1rem'}} onClick={() => setActiveTab('reports')}>View Detailed Balance Sheet</button>
        </div>

        <div className="am-section">
          <h3>Recent Auto-Journals</h3>
          <div style={{marginTop:'1.5rem', display:'flex', flexDirection:'column', gap:'1rem'}}>
            <div style={{background:'var(--bg-color)', padding:'1rem', borderRadius:'8px', border:'1px solid var(--border-color)'}}>
              <div style={{display:'flex', justifyContent:'space-between', marginBottom:'0.5rem'}}>
                <strong>Sales Invoice #INV-2026-001</strong>
                <span className="sub-text">Today, 10:45 AM</span>
              </div>
              <div style={{display:'flex', justifyContent:'space-between', fontSize:'0.9rem'}}>
                <span className="sub-text">AR (Dr) ₹25,000</span>
                <span className="sub-text">Sales (Cr) ₹25,000</span>
              </div>
            </div>
            
            <div style={{background:'var(--bg-color)', padding:'1rem', borderRadius:'8px', border:'1px solid var(--border-color)'}}>
              <div style={{display:'flex', justifyContent:'space-between', marginBottom:'0.5rem'}}>
                <strong>Payment Received #PAY-881</strong>
                <span className="sub-text">Today, 09:30 AM</span>
              </div>
              <div style={{display:'flex', justifyContent:'space-between', fontSize:'0.9rem'}}>
                <span className="sub-text">Bank (Dr) ₹10,000</span>
                <span className="sub-text">AR (Cr) ₹10,000</span>
              </div>
            </div>

            <div style={{background:'var(--bg-color)', padding:'1rem', borderRadius:'8px', border:'1px solid var(--border-color)'}}>
              <div style={{display:'flex', justifyContent:'space-between', marginBottom:'0.5rem'}}>
                <strong>Expense Recorded #EXP-042</strong>
                <span className="sub-text">Yesterday</span>
              </div>
              <div style={{display:'flex', justifyContent:'space-between', fontSize:'0.9rem'}}>
                <span className="sub-text">Office Supplies (Dr) ₹2,500</span>
                <span className="sub-text">Cash (Cr) ₹2,500</span>
              </div>
            </div>
          </div>
          <button className="btn-secondary" style={{width:'100%', marginTop:'1rem'}} onClick={() => setActiveTab('journals')}>View All Journals</button>
        </div>
      </div>
    </div>
  );

  const renderCOA = () => (
    <div className="am-view fade-in">
       <div className="am-header">
        <div>
          <h2 className="am-title">Chart of Accounts (COA)</h2>
          <p className="am-subtitle">Master list of all financial accounts</p>
        </div>
        <button className="btn-primary rainbow-bg"><Plus size={16}/> Add Account</button>
      </div>

      <div className="am-section">
        <div style={{display:'flex', gap:'1rem', marginBottom:'1.5rem'}}>
          <div className="search-box" style={{background:'var(--bg-color)', border:'1px solid var(--border-color)', display:'flex', alignItems:'center', padding:'0.5rem 1rem', borderRadius:'8px', flex:1}}>
            <Search size={16} style={{marginRight:'0.5rem', color:'var(--text-secondary)'}}/>
            <input type="text" placeholder="Search account name or code..." style={{background:'transparent', border:'none', outline:'none', color:'var(--text-primary)', width:'100%'}} />
          </div>
          <select style={{padding:'0.8rem', borderRadius:'8px', border:'1px solid var(--border-color)', background:'var(--bg-color)', color:'var(--text-primary)'}}>
            <option>All Types</option>
            <option>Asset</option>
            <option>Liability</option>
            <option>Equity</option>
            <option>Income</option>
            <option>Expense</option>
          </select>
        </div>

        <table className="am-table">
          <thead>
            <tr>
              <th>Code</th>
              <th>Account Name</th>
              <th>Type</th>
              <th>Current Balance</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>1001</strong></td>
              <td>Cash on Hand</td>
              <td><span className="account-type-badge asset">Asset</span></td>
              <td>₹ 1,50,000 Dr</td>
              <td><span className="status-badge success">Active</span></td>
              <td><button className="btn-secondary" style={{padding:'0.3rem 0.5rem'}}>Ledger</button></td>
            </tr>
            <tr>
              <td><strong>1002</strong></td>
              <td>HDFC Bank Account</td>
              <td><span className="account-type-badge asset">Asset</span></td>
              <td>₹ 42,00,000 Dr</td>
              <td><span className="status-badge success">Active</span></td>
              <td><button className="btn-secondary" style={{padding:'0.3rem 0.5rem'}}>Ledger</button></td>
            </tr>
            <tr>
              <td><strong>2001</strong></td>
              <td>Accounts Payable</td>
              <td><span className="account-type-badge liability">Liability</span></td>
              <td>₹ 8,40,000 Cr</td>
              <td><span className="status-badge success">Active</span></td>
              <td><button className="btn-secondary" style={{padding:'0.3rem 0.5rem'}}>Ledger</button></td>
            </tr>
            <tr>
              <td><strong>4001</strong></td>
              <td>Sales Revenue</td>
              <td><span className="account-type-badge income">Income</span></td>
              <td>₹ 75,00,000 Cr</td>
              <td><span className="status-badge success">Active</span></td>
              <td><button className="btn-secondary" style={{padding:'0.3rem 0.5rem'}}>Ledger</button></td>
            </tr>
            <tr>
              <td><strong>5001</strong></td>
              <td>Salary Expense</td>
              <td><span className="account-type-badge expense">Expense</span></td>
              <td>₹ 12,00,000 Dr</td>
              <td><span className="status-badge success">Active</span></td>
              <td><button className="btn-secondary" style={{padding:'0.3rem 0.5rem'}}>Ledger</button></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderJournals = () => (
    <div className="am-view fade-in">
       <div className="am-header">
        <div>
          <h2 className="am-title">Journal Entries</h2>
          <p className="am-subtitle">Record and view all accounting transactions (Total Debits = Total Credits)</p>
        </div>
        <button className="btn-primary rainbow-bg"><Plus size={16}/> Manual Entry</button>
      </div>

      <div className="journal-entry-card">
        <div className="journal-entry-header">
          <div>
            <h3 style={{marginBottom:'0.2rem'}}>Sales Invoice #INV-2026-001</h3>
            <span className="sub-text">Jan 03, 2026 | Auto-generated by System</span>
          </div>
          <span className="status-badge success">Posted</span>
        </div>
        <div className="journal-entry-body">
          <table className="journal-table">
            <thead>
              <tr>
                <th>Account</th>
                <th>Narration</th>
                <th style={{textAlign:'right'}}>Debit (Dr)</th>
                <th style={{textAlign:'right'}}>Credit (Cr)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Accounts Receivable (1100)</td>
                <td className="sub-text">Invoice INV-2026-001 - ABC Traders</td>
                <td style={{textAlign:'right'}}>₹ 25,000</td>
                <td style={{textAlign:'right'}}>-</td>
              </tr>
              <tr>
                <td style={{paddingLeft:'2rem'}}>Sales Revenue (4001)</td>
                <td className="sub-text">Product Sales</td>
                <td style={{textAlign:'right'}}>-</td>
                <td style={{textAlign:'right'}}>₹ 21,186</td>
              </tr>
              <tr>
                <td style={{paddingLeft:'2rem'}}>GST Payable (2100)</td>
                <td className="sub-text">18% GST</td>
                <td style={{textAlign:'right'}}>-</td>
                <td style={{textAlign:'right'}}>₹ 3,814</td>
              </tr>
              <tr style={{fontWeight:'bold', background:'var(--hover-bg)'}}>
                <td colSpan="2" style={{textAlign:'right'}}>Total:</td>
                <td style={{textAlign:'right'}}>₹ 25,000</td>
                <td style={{textAlign:'right'}}>₹ 25,000</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="journal-entry-card">
        <div className="journal-entry-header">
          <div>
            <h3 style={{marginBottom:'0.2rem'}}>Rent Payment</h3>
            <span className="sub-text">Jan 01, 2026 | Created by Admin | Ref: CHQ-9912</span>
          </div>
          <span className="status-badge success">Posted</span>
        </div>
        <div className="journal-entry-body">
          <table className="journal-table">
            <thead>
              <tr>
                <th>Account</th>
                <th>Narration</th>
                <th style={{textAlign:'right'}}>Debit (Dr)</th>
                <th style={{textAlign:'right'}}>Credit (Cr)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Rent Expense (5010)</td>
                <td className="sub-text">Office Rent Jan 2026</td>
                <td style={{textAlign:'right'}}>₹ 45,000</td>
                <td style={{textAlign:'right'}}>-</td>
              </tr>
              <tr>
                <td style={{paddingLeft:'2rem'}}>HDFC Bank Account (1002)</td>
                <td className="sub-text">Cheque 9912</td>
                <td style={{textAlign:'right'}}>-</td>
                <td style={{textAlign:'right'}}>₹ 45,000</td>
              </tr>
              <tr style={{fontWeight:'bold', background:'var(--hover-bg)'}}>
                <td colSpan="2" style={{textAlign:'right'}}>Total:</td>
                <td style={{textAlign:'right'}}>₹ 45,000</td>
                <td style={{textAlign:'right'}}>₹ 45,000</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderLedgersReports = () => (
    <div className="am-view fade-in">
       <div className="am-header">
        <div>
          <h2 className="am-title">Ledgers & Reports</h2>
          <p className="am-subtitle">General Ledger and Trial Balance generation</p>
        </div>
      </div>

      <div className="grid-2">
        <div className="am-section">
          <h3>General Ledger Explorer</h3>
          <div style={{marginTop:'1.5rem', display:'flex', flexDirection:'column', gap:'1rem'}}>
            <div className="form-group">
              <label>Select Account</label>
              <select>
                <option>1002 - HDFC Bank Account</option>
                <option>1001 - Cash on Hand</option>
                <option>1100 - Accounts Receivable</option>
                <option>4001 - Sales Revenue</option>
              </select>
            </div>
            <div className="form-group">
              <label>Date Range</label>
              <div style={{display:'flex', gap:'1rem'}}>
                <input type="date" />
                <input type="date" />
              </div>
            </div>
            <button className="btn-primary" style={{marginTop:'0.5rem'}}><Search size={16}/> View Ledger</button>
          </div>
          
          <div style={{marginTop:'2rem', borderTop:'1px solid var(--border-color)', paddingTop:'1rem'}}>
            <h4 style={{marginBottom:'1rem'}}>Preview: HDFC Bank Account</h4>
            <table className="am-table" style={{fontSize:'0.85rem'}}>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Description</th>
                  <th>Debit</th>
                  <th>Credit</th>
                  <th>Balance</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Jan 01</td>
                  <td>Opening Balance</td>
                  <td>-</td>
                  <td>-</td>
                  <td>₹ 41,55,000 Dr</td>
                </tr>
                <tr>
                  <td>Jan 01</td>
                  <td>Rent Exp (CHQ-9912)</td>
                  <td>-</td>
                  <td>₹ 45,000</td>
                  <td>₹ 41,10,000 Dr</td>
                </tr>
                <tr>
                  <td>Jan 03</td>
                  <td>Payment Rcvd (PAY-881)</td>
                  <td>₹ 10,000</td>
                  <td>-</td>
                  <td>₹ 41,20,000 Dr</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="am-section">
          <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
            <h3>Trial Balance</h3>
            <button className="btn-secondary" style={{padding:'0.3rem 0.8rem'}}><FileText size={16}/> Export</button>
          </div>
          <p className="sub-text" style={{marginBottom:'1.5rem'}}>As of Jan 31, 2026. (Σ Debit = Σ Credit)</p>
          
          <table className="am-table" style={{fontSize:'0.85rem'}}>
            <thead>
              <tr>
                <th>Account</th>
                <th style={{textAlign:'right'}}>Debit (₹)</th>
                <th style={{textAlign:'right'}}>Credit (₹)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Cash on Hand</td>
                <td style={{textAlign:'right'}}>1,50,000</td>
                <td style={{textAlign:'right'}}>-</td>
              </tr>
              <tr>
                <td>HDFC Bank Account</td>
                <td style={{textAlign:'right'}}>42,00,000</td>
                <td style={{textAlign:'right'}}>-</td>
              </tr>
              <tr>
                <td>Accounts Receivable</td>
                <td style={{textAlign:'right'}}>15,20,000</td>
                <td style={{textAlign:'right'}}>-</td>
              </tr>
              <tr>
                <td>Inventory</td>
                <td style={{textAlign:'right'}}>65,80,000</td>
                <td style={{textAlign:'right'}}>-</td>
              </tr>
              <tr>
                <td>Accounts Payable</td>
                <td style={{textAlign:'right'}}>-</td>
                <td style={{textAlign:'right'}}>8,40,000</td>
              </tr>
              <tr>
                <td>Sales Revenue</td>
                <td style={{textAlign:'right'}}>-</td>
                <td style={{textAlign:'right'}}>75,00,000</td>
              </tr>
              <tr>
                <td>Owner Capital</td>
                <td style={{textAlign:'right'}}>-</td>
                <td style={{textAlign:'right'}}>71,80,000</td>
              </tr>
              <tr>
                <td>Salary Expense</td>
                <td style={{textAlign:'right'}}>12,00,000</td>
                <td style={{textAlign:'right'}}>-</td>
              </tr>
              <tr>
                <td>Rent Expense</td>
                <td style={{textAlign:'right'}}>1,80,000</td>
                <td style={{textAlign:'right'}}>-</td>
              </tr>
              <tr style={{fontWeight:'bold', background:'rgba(16, 185, 129, 0.1)', color:'#10b981'}}>
                <td>Total</td>
                <td style={{textAlign:'right'}}>1,38,30,000</td>
                <td style={{textAlign:'right'}}>1,38,30,000</td>
              </tr>
            </tbody>
          </table>
          <div style={{textAlign:'center', marginTop:'1rem', color:'#10b981', fontWeight:'bold'}}>
            <CheckCircle size={16} style={{verticalAlign:'middle', marginRight:'5px'}}/> Trial Balance Matches Perfectly
          </div>
        </div>
      </div>
    </div>
  );

  const renderExpenses = () => (
    <div className="am-view fade-in">
       <div className="am-header">
        <div>
          <h2 className="am-title">Expense Tracking</h2>
          <p className="am-subtitle">Record bills, categorize expenses, and manage approvals</p>
        </div>
        <button className="btn-primary rainbow-bg"><Plus size={16}/> Record Expense</button>
      </div>

      <div className="am-section">
        <table className="am-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Expense #</th>
              <th>Category</th>
              <th>Vendor / Payee</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Jan 03, 2026</td>
              <td>EXP-043</td>
              <td><span className="account-type-badge expense">Travel</span></td>
              <td>Uber India</td>
              <td>₹ 1,250</td>
              <td><span className="status-badge warning">Pending Approval</span></td>
              <td><button className="btn-secondary" style={{padding:'0.3rem 0.5rem'}}>Review</button></td>
            </tr>
            <tr>
              <td>Jan 02, 2026</td>
              <td>EXP-042</td>
              <td><span className="account-type-badge expense">Office Supplies</span></td>
              <td>Stationery Mart</td>
              <td>₹ 2,500</td>
              <td><span className="status-badge success">Paid</span></td>
              <td><button className="btn-secondary" style={{padding:'0.3rem 0.5rem'}}>View</button></td>
            </tr>
            <tr>
              <td>Jan 01, 2026</td>
              <td>EXP-041</td>
              <td><span className="account-type-badge expense">Rent</span></td>
              <td>Prime Properties Ltd</td>
              <td>₹ 45,000</td>
              <td><span className="status-badge success">Paid</span></td>
              <td><button className="btn-secondary" style={{padding:'0.3rem 0.5rem'}}>View</button></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderReconciliation = () => (
    <div className="am-view fade-in">
       <div className="am-header">
        <div>
          <h2 className="am-title">Bank Reconciliation</h2>
          <p className="am-subtitle">Match bank statements with system transactions</p>
        </div>
        <button className="btn-primary rainbow-bg">Import Bank Statement (CSV/OFX)</button>
      </div>

      <div className="am-section">
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'1.5rem'}}>
          <div>
            <h3>Reconciling: HDFC Bank Account</h3>
            <span className="sub-text">Statement Date: Jan 01 - Jan 31, 2026</span>
          </div>
          <div style={{display:'flex', gap:'2rem', background:'var(--bg-color)', padding:'1rem', borderRadius:'8px', border:'1px solid var(--border-color)'}}>
            <div>
              <div className="sub-text">System Balance</div>
              <strong style={{fontSize:'1.2rem'}}>₹ 42,00,000</strong>
            </div>
            <div>
              <div className="sub-text">Statement Balance</div>
              <strong style={{fontSize:'1.2rem'}}>₹ 42,00,000</strong>
            </div>
            <div>
              <div className="sub-text">Difference</div>
              <strong style={{fontSize:'1.2rem', color:'#10b981'}}>₹ 0</strong>
            </div>
          </div>
        </div>

        <table className="am-table">
          <thead>
            <tr>
              <th style={{width:'40%'}}>Bank Statement Transaction</th>
              <th style={{width:'20%'}}>Status</th>
              <th style={{width:'40%'}}>System Journal Entry</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <div><strong>DEPOSIT - NEFT (ABC Traders)</strong></div>
                <div className="sub-text">Jan 03 | Ref: N00392811 | ₹ 10,000</div>
              </td>
              <td><span className="status-badge success"><CheckCircle size={12} style={{marginRight:'3px'}}/> Auto-Matched</span></td>
              <td>
                <div><strong>Payment Received #PAY-881</strong></div>
                <div className="sub-text">Jan 03 | ₹ 10,000 (AR Credit)</div>
              </td>
            </tr>
            <tr>
              <td>
                <div><strong>WITHDRAWAL - CHQ 9912</strong></div>
                <div className="sub-text">Jan 02 | Ref: 9912 | ₹ 45,000</div>
              </td>
              <td><span className="status-badge success"><CheckCircle size={12} style={{marginRight:'3px'}}/> Matched</span></td>
              <td>
                <div><strong>Rent Payment (EXP-041)</strong></div>
                <div className="sub-text">Jan 01 | ₹ 45,000 (Rent Dr)</div>
              </td>
            </tr>
            <tr style={{background:'rgba(245, 158, 11, 0.05)'}}>
              <td>
                <div><strong>BANK CHARGES - SMS ALERTS</strong></div>
                <div className="sub-text">Jan 03 | Ref: CHG-12 | ₹ 150</div>
              </td>
              <td><span className="status-badge warning">Unmatched</span></td>
              <td>
                <button className="btn-secondary" style={{width:'100%'}}>Create Journal Entry</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderSettingsPeriod = () => (
    <div className="am-view fade-in">
       <div className="am-header">
        <div>
          <h2 className="am-title">Period Closing & Settings</h2>
          <p className="am-subtitle">Lock financial periods, manage automation rules, and view audit logs</p>
        </div>
      </div>

      <div className="grid-2">
        <div className="am-section">
          <h3>Period Closing</h3>
          <p className="sub-text" style={{marginBottom:'1.5rem'}}>Lock past periods to prevent accidental accounting changes.</p>
          
          <table className="am-table" style={{marginBottom:'1rem'}}>
            <thead>
              <tr>
                <th>Period</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Dec 2025</td>
                <td><span className="status-badge info"><Lock size={12} style={{marginRight:'3px'}}/> Locked</span></td>
                <td><button className="btn-secondary" style={{padding:'0.2rem 0.5rem'}} disabled>Closed</button></td>
              </tr>
              <tr>
                <td>Jan 2026 (Current)</td>
                <td><span className="status-badge success">Open</span></td>
                <td><button className="btn-primary" style={{padding:'0.2rem 0.5rem', background:'#ef4444', color:'white', border:'none'}}>Lock Period</button></td>
              </tr>
            </tbody>
          </table>

          <div style={{background:'rgba(245, 158, 11, 0.1)', border:'1px solid #f59e0b', padding:'1rem', borderRadius:'8px', marginTop:'2rem'}}>
            <h4 style={{color:'#f59e0b', display:'flex', alignItems:'center', gap:'0.5rem', marginBottom:'0.5rem'}}><AlertTriangle size={18}/> Year-End Closing</h4>
            <p style={{fontSize:'0.9rem', marginBottom:'1rem'}}>Run year-end process to close income/expense accounts and transfer net profit to Retained Equity.</p>
            <button className="btn-secondary" style={{color:'#f59e0b', borderColor:'#f59e0b'}}>Run Year-End Wizard</button>
          </div>
        </div>

        <div className="am-section">
          <h3>Automatic Accounting Integration</h3>
          <p className="sub-text" style={{marginBottom:'1.5rem'}}>Configure how other modules generate journal entries automatically.</p>
          
          <div style={{display:'flex', flexDirection:'column', gap:'1rem'}}>
            <div className="setting-row" style={{background:'var(--bg-color)', borderRadius:'8px', border:'1px solid var(--border-color)'}}>
              <div>
                <strong>Sales Invoices</strong>
                <div className="sub-text">Auto-post AR and Sales Revenue</div>
              </div>
              <div className="toggle-switch on"></div>
            </div>
            <div className="setting-row" style={{background:'var(--bg-color)', borderRadius:'8px', border:'1px solid var(--border-color)'}}>
              <div>
                <strong>Payment Received</strong>
                <div className="sub-text">Auto-post Bank and AR Credit</div>
              </div>
              <div className="toggle-switch on"></div>
            </div>
            <div className="setting-row" style={{background:'var(--bg-color)', borderRadius:'8px', border:'1px solid var(--border-color)'}}>
              <div>
                <strong>Inventory Purchases</strong>
                <div className="sub-text">Auto-post Inventory Asset and AP</div>
              </div>
              <div className="toggle-switch on"></div>
            </div>
            
            <h3 style={{marginTop:'1rem', paddingTop:'1rem', borderTop:'1px solid var(--border-color)'}}>Accounting Audit Log</h3>
            <div className="setting-row" style={{padding:'0'}}>
              <span className="sub-text">Track every journal entry creation, edit, or deletion.</span>
              <button className="btn-secondary">View Audit Trail</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="accounting-management-wrapper">
      {activeTab === 'dashboard' && (
        <div className="am-header" style={{paddingBottom:0, borderBottom:'none', marginBottom:'1rem'}}>
          <button className="back-btn" onClick={onBack}>← Back to Home</button>
        </div>
      )}
      
      <div className="tabs-simple">
        <button className={`tab-simple ${activeTab === 'dashboard' ? 'active' : ''}`} onClick={() => setActiveTab('dashboard')}>Overview & Dashboard</button>
        <button className={`tab-simple ${activeTab === 'coa' ? 'active' : ''}`} onClick={() => setActiveTab('coa')}>Chart of Accounts</button>
        <button className={`tab-simple ${activeTab === 'journals' ? 'active' : ''}`} onClick={() => setActiveTab('journals')}>Journal Entries</button>
        <button className={`tab-simple ${activeTab === 'reports' ? 'active' : ''}`} onClick={() => setActiveTab('reports')}>Ledgers & Trial Balance</button>
        <button className={`tab-simple ${activeTab === 'expenses' ? 'active' : ''}`} onClick={() => setActiveTab('expenses')}>Expenses</button>
        <button className={`tab-simple ${activeTab === 'recon' ? 'active' : ''}`} onClick={() => setActiveTab('recon')}>Bank Reconciliation</button>
        <button className={`tab-simple ${activeTab === 'settings' ? 'active' : ''}`} onClick={() => setActiveTab('settings')}>Period & Settings</button>
      </div>

      {activeTab === 'dashboard' && renderDashboard()}
      {activeTab === 'coa' && renderCOA()}
      {activeTab === 'journals' && renderJournals()}
      {activeTab === 'reports' && renderLedgersReports()}
      {activeTab === 'expenses' && renderExpenses()}
      {activeTab === 'recon' && renderReconciliation()}
      {activeTab === 'settings' && renderSettingsPeriod()}
    </div>
  );
}
