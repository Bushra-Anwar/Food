import React, { useState } from 'react';
import { 
  Settings, Database, Shield, Globe, HardDrive, Server, Activity, 
  Users, CheckCircle, AlertTriangle, FileText, Lock, Plus, UploadCloud,
  DollarSign, RefreshCw, LayoutDashboard, Terminal
} from 'lucide-react';
import './AdminPanel.css';

export default function AdminPanel({ onBack }) {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderDashboard = () => (
    <div className="ap-view fade-in">
      <div className="ap-header">
        <div className="ap-title-area">
          <h2 className="ap-title">Admin Control Panel</h2>
          <p className="ap-subtitle">System health, global settings, security, and backup management</p>
        </div>
        <button className="btn-refresh-metrics"><RefreshCw size={16} /> Refresh Metrics</button>
      </div>

      <div className="ap-grid-4">
        <div className="ap-metric-card">
          <div className="ap-metric-icon bg-cyan"><Activity size={24}/></div>
          <div className="ap-metric-info">
            <h4>System Health</h4>
            <div className="ap-metric-value">100%</div>
            <div className="ap-metric-trend text-cyan">All services operational</div>
          </div>
        </div>
        <div className="ap-metric-card">
          <div className="ap-metric-icon bg-light-purple"><Users size={24}/></div>
          <div className="ap-metric-info">
            <h4>Active Sessions</h4>
            <div className="ap-metric-value">42</div>
            <div className="ap-metric-trend">Across 3 branches</div>
          </div>
        </div>
        <div className="ap-metric-card">
          <div className="ap-metric-icon bg-purple"><Server size={24}/></div>
          <div className="ap-metric-info">
            <h4>API Usage</h4>
            <div className="ap-metric-value">4.2k / 10k</div>
            <div className="ap-metric-trend text-cyan">Limits reset in 2 days</div>
          </div>
        </div>
        <div className="ap-metric-card">
          <div className="ap-metric-icon bg-pink"><HardDrive size={24}/></div>
          <div className="ap-metric-info">
            <h4>Storage Used</h4>
            <div className="ap-metric-value">45 GB</div>
            <div className="ap-metric-trend text-red">80% of allocated limit</div>
          </div>
        </div>
      </div>

      <div className="ap-grid-2">
        <div className="ap-card">
          <h3>System Monitoring Logs</h3>
          <table className="ap-table-modern">
            <thead>
              <tr>
                <th>Service</th>
                <th>Status</th>
                <th>Latency</th>
                <th>Uptime</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Database Cluster</strong></td>
                <td><span className="ap-pill online">Online</span></td>
                <td>12ms</td>
                <td>99.99%</td>
              </tr>
              <tr>
                <td><strong>File Storage (S3)</strong></td>
                <td><span className="ap-pill online">Online</span></td>
                <td>45ms</td>
                <td>99.98%</td>
              </tr>
              <tr>
                <td><strong>Background Jobs</strong></td>
                <td><span className="ap-pill warning">Heavy Load</span></td>
                <td>120ms</td>
                <td>99.95%</td>
              </tr>
              <tr>
                <td><strong>Payment Gateway Webhooks</strong></td>
                <td><span className="ap-pill online">Online</span></td>
                <td>25ms</td>
                <td>100%</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="ap-card">
          <h3>Audit Log Summary</h3>
          <div className="ap-audit-list">
            <div className="ap-audit-item">
              <div className="ap-audit-icon text-green"><CheckCircle size={20}/></div>
              <div className="ap-audit-content">
                <strong>Backup Completed</strong>
                <p>System triggered auto-backup to AWS S3.</p>
              </div>
              <div className="ap-audit-time">2 hrs ago</div>
            </div>
            
            <div className="ap-audit-item">
              <div className="ap-audit-icon text-orange"><AlertTriangle size={20}/></div>
              <div className="ap-audit-content">
                <strong>Tax Rate Modified</strong>
                <p>Admin changed IGST rate to 18%.</p>
              </div>
              <div className="ap-audit-time">5 hrs ago</div>
            </div>

            <div className="ap-audit-item">
              <div className="ap-audit-icon text-red"><Lock size={20}/></div>
              <div className="ap-audit-content">
                <strong>Failed Login Attempt</strong>
                <p>Multiple failures for 'sales_user'. Account locked.</p>
              </div>
              <div className="ap-audit-time">1 day ago</div>
            </div>
          </div>
          <a className="ap-link" onClick={() => setActiveTab('security')}>View Full Audit Logs</a>
        </div>
      </div>
    </div>
  );

  const renderSystemSettings = () => (
    <div className="ap-view fade-in">
       <div className="ap-header">
        <div>
          <h2 className="ap-title">System Settings</h2>
          <p className="ap-subtitle">Company profile, localization, and general application configuration</p>
        </div>
        <button className="btn-primary rainbow-bg">Save Settings</button>
      </div>

      <div className="grid-2">
        <div className="ap-section">
          <h3>Company Information</h3>
          <div style={{marginTop:'1.5rem', display:'flex', flexDirection:'column', gap:'1rem'}}>
            <div className="form-group">
              <label>Legal Business Name</label>
              <input type="text" defaultValue="YourBill Technologies Pvt Ltd" />
            </div>
            <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1rem'}}>
              <div className="form-group">
                <label>Company Email</label>
                <input type="email" defaultValue="billing@yourbill.com" />
              </div>
              <div className="form-group">
                <label>Company Phone</label>
                <input type="text" defaultValue="+91 9876543210" />
              </div>
            </div>
            <div className="form-group">
              <label>Address Line 1</label>
              <input type="text" defaultValue="Level 4, Cyber Park" />
            </div>
            <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1rem'}}>
              <div className="form-group">
                <label>City</label>
                <input type="text" defaultValue="Bangalore" />
              </div>
              <div className="form-group">
                <label>State & PIN Code</label>
                <input type="text" defaultValue="Karnataka - 560001" />
              </div>
            </div>
          </div>
        </div>

        <div className="ap-section">
          <h3>Localization & Formats</h3>
          <div style={{marginTop:'1.5rem', display:'flex', flexDirection:'column', gap:'1rem'}}>
            <div className="form-group">
              <label>Financial Year Start</label>
              <select defaultValue="apr">
                <option value="jan">January 1st</option>
                <option value="apr">April 1st (India Standard)</option>
                <option value="jul">July 1st</option>
              </select>
            </div>
            <div className="form-group">
              <label>Time Zone</label>
              <select defaultValue="ist">
                <option value="utc">UTC (Universal Time)</option>
                <option value="ist">Asia/Kolkata (IST)</option>
                <option value="est">America/New_York (EST)</option>
              </select>
            </div>
            <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1rem'}}>
              <div className="form-group">
                <label>Date Format</label>
                <select defaultValue="ddmmyyyy">
                  <option value="ddmmyyyy">DD-MM-YYYY</option>
                  <option value="mmddyyyy">MM/DD/YYYY</option>
                  <option value="yyyymmdd">YYYY-MM-DD</option>
                </select>
              </div>
              <div className="form-group">
                <label>Time Format</label>
                <select defaultValue="12h">
                  <option value="12h">12-Hour (AM/PM)</option>
                  <option value="24h">24-Hour</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderTaxCurrency = () => (
    <div className="ap-view fade-in">
       <div className="ap-header">
        <div>
          <h2 className="ap-title">Tax & Currency Config</h2>
          <p className="ap-subtitle">Manage GST/VAT rates, HSN codes, and multi-currency exchange rates</p>
        </div>
      </div>

      <div className="grid-2">
        <div className="ap-section">
          <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'1.5rem'}}>
            <h3>Tax Configuration (GST)</h3>
            <button className="btn-secondary" style={{padding:'0.2rem 0.5rem'}}><Plus size={16}/> Add Tax</button>
          </div>
          <div className="form-group">
            <label>GSTIN Number</label>
            <input type="text" defaultValue="29ABCDE1234F2Z5" />
          </div>
          
          <table className="ap-table" style={{marginTop:'1.5rem'}}>
            <thead>
              <tr>
                <th>Tax Name</th>
                <th>Rate</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>GST @ 18%</strong><br/><span className="sub-text">CGST 9% + SGST 9%</span></td>
                <td>18%</td>
                <td><div className="toggle-switch on"></div></td>
                <td><button className="btn-secondary" style={{padding:'0.2rem 0.5rem'}}>Edit</button></td>
              </tr>
              <tr>
                <td><strong>IGST @ 18%</strong><br/><span className="sub-text">Inter-state sales</span></td>
                <td>18%</td>
                <td><div className="toggle-switch on"></div></td>
                <td><button className="btn-secondary" style={{padding:'0.2rem 0.5rem'}}>Edit</button></td>
              </tr>
              <tr>
                <td><strong>TDS @ 10%</strong><br/><span className="sub-text">Tax Deducted at Source</span></td>
                <td>10%</td>
                <td><div className="toggle-switch"></div></td>
                <td><button className="btn-secondary" style={{padding:'0.2rem 0.5rem'}}>Edit</button></td>
              </tr>
            </tbody>
          </table>
          
          <div style={{marginTop:'2rem'}}>
             <div className="setting-row" style={{padding:'0', border:'none'}}>
              <div>
                <strong>Auto-Calculate Reverse Charge (RCM)</strong>
                <div className="sub-text">Apply RCM automatically for applicable vendors</div>
              </div>
              <div className="toggle-switch on"></div>
            </div>
          </div>
        </div>

        <div className="ap-section">
          <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'1.5rem'}}>
            <h3>Currency & Exchange Rates</h3>
            <button className="btn-secondary" style={{padding:'0.2rem 0.5rem'}}><RefreshCw size={16}/> Sync Rates</button>
          </div>
          
          <div className="form-group" style={{background:'var(--bg-color)', padding:'1rem', borderRadius:'8px', border:'1px solid var(--border-color)'}}>
            <label>Base Currency</label>
            <div style={{display:'flex', alignItems:'center', gap:'0.5rem', marginTop:'0.5rem'}}>
              <strong style={{fontSize:'1.2rem'}}>INR (₹)</strong>
              <span className="sub-text">- Indian Rupee</span>
            </div>
          </div>

          <table className="ap-table" style={{marginTop:'1.5rem'}}>
            <thead>
              <tr>
                <th>Currency</th>
                <th>Exchange Rate</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>USD ($)</strong><br/><span className="sub-text">US Dollar</span></td>
                <td>1 USD = ₹ 83.50</td>
                <td><div className="toggle-switch on"></div></td>
              </tr>
              <tr>
                <td><strong>EUR (€)</strong><br/><span className="sub-text">Euro</span></td>
                <td>1 EUR = ₹ 90.20</td>
                <td><div className="toggle-switch on"></div></td>
              </tr>
              <tr>
                <td><strong>GBP (£)</strong><br/><span className="sub-text">British Pound</span></td>
                <td>1 GBP = ₹ 105.40</td>
                <td><div className="toggle-switch"></div></td>
              </tr>
            </tbody>
          </table>
          
          <div style={{marginTop:'2rem'}}>
             <div className="setting-row" style={{padding:'0', border:'none'}}>
              <div>
                <strong>Auto-Update Exchange Rates</strong>
                <div className="sub-text">Sync daily from Open Exchange Rates API</div>
              </div>
              <div className="toggle-switch on"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderTemplatesWorkflows = () => (
    <div className="ap-view fade-in">
       <div className="ap-header">
        <div>
          <h2 className="ap-title">Templates & Workflows</h2>
          <p className="ap-subtitle">Invoice templates, custom fields, and approval hierarchies</p>
        </div>
      </div>

      <div className="grid-2">
        <div className="ap-section">
          <h3>Invoice Templates</h3>
          <p className="sub-text" style={{marginBottom:'1.5rem'}}>Assign templates to specific branches or set a global default.</p>
          
          <div style={{display:'flex', flexDirection:'column', gap:'1rem'}}>
             <div className="setting-row" style={{background:'var(--bg-color)', borderRadius:'8px', border:'1px solid var(--border-color)'}}>
              <div style={{display:'flex', alignItems:'center', gap:'1rem'}}>
                <div className="metric-icon" style={{background:'#8b5cf6', color:'white', width:'40px', height:'40px'}}><FileText size={20}/></div>
                <div>
                  <strong>Standard B2B Invoice (Default)</strong>
                  <div className="sub-text">Includes GST breakdown & Bank Details</div>
                </div>
              </div>
              <button className="btn-secondary" style={{padding:'0.4rem 0.8rem'}}>Builder</button>
            </div>
            
             <div className="setting-row" style={{background:'var(--bg-color)', borderRadius:'8px', border:'1px solid var(--border-color)'}}>
              <div style={{display:'flex', alignItems:'center', gap:'1rem'}}>
                <div className="metric-icon" style={{background:'#10b981', color:'white', width:'40px', height:'40px'}}><FileText size={20}/></div>
                <div>
                  <strong>Proforma Template</strong>
                  <div className="sub-text">Clean layout for quotations</div>
                </div>
              </div>
              <button className="btn-secondary" style={{padding:'0.4rem 0.8rem'}}>Builder</button>
            </div>
            
             <div className="setting-row" style={{background:'var(--bg-color)', borderRadius:'8px', border:'1px solid var(--border-color)'}}>
              <div style={{display:'flex', alignItems:'center', gap:'1rem'}}>
                <div className="metric-icon" style={{background:'#ef4444', color:'white', width:'40px', height:'40px'}}><FileText size={20}/></div>
                <div>
                  <strong>Thermal POS Receipt</strong>
                  <div className="sub-text">Assigned to Retail Branch</div>
                </div>
              </div>
              <button className="btn-secondary" style={{padding:'0.4rem 0.8rem'}}>Builder</button>
            </div>
          </div>
        </div>

        <div className="ap-section">
          <h3>Approval Workflows</h3>
          <p className="sub-text" style={{marginBottom:'1.5rem'}}>Enforce multi-level approvals for critical financial actions.</p>
          
          <table className="ap-table">
            <thead>
              <tr>
                <th>Action Module</th>
                <th>Condition</th>
                <th>Approver Role</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Purchase Orders</strong></td>
                <td>Amount &gt; ₹50,000</td>
                <td>Manager / Admin</td>
                <td><div className="toggle-switch on"></div></td>
              </tr>
              <tr>
                <td><strong>Expense Claims</strong></td>
                <td>All Expenses</td>
                <td>Accountant</td>
                <td><div className="toggle-switch on"></div></td>
              </tr>
              <tr>
                <td><strong>Credit Notes</strong></td>
                <td>Amount &gt; ₹10,000</td>
                <td>Admin</td>
                <td><div className="toggle-switch on"></div></td>
              </tr>
              <tr>
                <td><strong>Sales Quotations</strong></td>
                <td>Discount &gt; 15%</td>
                <td>Manager</td>
                <td><div className="toggle-switch on"></div></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderSecurity = () => (
    <div className="ap-view fade-in">
       <div className="ap-header">
        <div>
          <h2 className="ap-title">Security & Permissions</h2>
          <p className="ap-subtitle">Role-Based Access Control (RBAC), policies, and audit logs</p>
        </div>
      </div>

      <div className="grid-2">
        <div className="ap-section">
          <h3>Role-Based Access Control</h3>
          <div style={{marginTop:'1.5rem', display:'flex', flexDirection:'column', gap:'1rem'}}>
             <div className="setting-row" style={{background:'var(--bg-color)', borderRadius:'8px', border:'1px solid var(--border-color)'}}>
              <div>
                <strong>Administrator</strong>
                <div className="sub-text">Full system access. Manage all settings.</div>
              </div>
              <button className="btn-secondary" style={{padding:'0.3rem 0.5rem'}} disabled>System</button>
            </div>
             <div className="setting-row" style={{background:'var(--bg-color)', borderRadius:'8px', border:'1px solid var(--border-color)'}}>
              <div>
                <strong>Manager</strong>
                <div className="sub-text">View reports, approve transactions, operations.</div>
              </div>
              <button className="btn-secondary" style={{padding:'0.3rem 0.5rem'}}>Edit Matrix</button>
            </div>
             <div className="setting-row" style={{background:'var(--bg-color)', borderRadius:'8px', border:'1px solid var(--border-color)'}}>
              <div>
                <strong>Accountant</strong>
                <div className="sub-text">Invoices, ledgers, taxes, journals.</div>
              </div>
              <button className="btn-secondary" style={{padding:'0.3rem 0.5rem'}}>Edit Matrix</button>
            </div>
             <div className="setting-row" style={{background:'var(--bg-color)', borderRadius:'8px', border:'1px solid var(--border-color)'}}>
              <div>
                <strong>Salesperson</strong>
                <div className="sub-text">Customers, quotations, collections.</div>
              </div>
              <button className="btn-secondary" style={{padding:'0.3rem 0.5rem'}}>Edit Matrix</button>
            </div>
            <button className="btn-secondary" style={{marginTop:'0.5rem'}}><Plus size={16}/> Create Custom Role</button>
          </div>
        </div>

        <div className="ap-section">
          <h3>Security Policies</h3>
          <div style={{marginTop:'1.5rem', display:'flex', flexDirection:'column', gap:'1rem'}}>
            <div className="setting-row" style={{padding:'0.5rem 0'}}>
              <div>
                <strong>Enforce 2FA for all users</strong>
                <div className="sub-text">Requires Google Authenticator or SMS OTP</div>
              </div>
              <div className="toggle-switch on"></div>
            </div>
            <div className="setting-row" style={{padding:'0.5rem 0'}}>
              <div>
                <strong>Session Timeout</strong>
                <div className="sub-text">Auto-logout inactive users</div>
              </div>
              <select style={{padding:'0.4rem', borderRadius:'6px', border:'1px solid var(--border-color)', background:'var(--bg-color)', color:'var(--text-primary)'}}>
                <option>15 Minutes</option>
                <option selected>30 Minutes</option>
                <option>1 Hour</option>
              </select>
            </div>
            <div className="setting-row" style={{padding:'0.5rem 0'}}>
              <div>
                <strong>Account Lockout</strong>
                <div className="sub-text">Lock after 5 failed login attempts</div>
              </div>
              <div className="toggle-switch on"></div>
            </div>
            <div className="setting-row" style={{padding:'0.5rem 0', borderBottom:'none'}}>
              <div>
                <strong>IP Whitelisting</strong>
                <div className="sub-text">Restrict admin access to specific office IPs</div>
              </div>
              <div className="toggle-switch"></div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="ap-section">
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'1.5rem'}}>
          <h3>Comprehensive Audit Log</h3>
          <button className="btn-secondary" style={{padding:'0.3rem 0.8rem'}}><Download size={16}/> Export CSV</button>
        </div>
        <table className="ap-table">
          <thead>
            <tr>
              <th>Timestamp</th>
              <th>User</th>
              <th>Module</th>
              <th>Action</th>
              <th>IP Address</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Today, 14:32:10</td>
              <td>admin_system</td>
              <td>Tax Config</td>
              <td>Changed IGST Rate from 0 to 18%</td>
              <td>192.168.1.45</td>
            </tr>
            <tr>
              <td>Today, 11:15:00</td>
              <td>priya_accounts</td>
              <td>Journal Entry</td>
              <td>Created manual journal JRN-091</td>
              <td>103.44.21.11</td>
            </tr>
            <tr>
              <td>Yesterday, 09:00:12</td>
              <td>rahul_sales</td>
              <td>Invoice</td>
              <td>Deleted Draft Invoice DRAFT-004</td>
              <td>103.44.21.55</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderBackups = () => (
    <div className="ap-view fade-in">
       <div className="ap-header">
        <div>
          <h2 className="ap-title">Backup Management</h2>
          <p className="ap-subtitle">Protect system data, configure S3 storage, and manage recovery</p>
        </div>
        <button className="btn-primary rainbow-bg"><UploadCloud size={16}/> Run Manual Backup</button>
      </div>

      <div className="grid-2">
        <div className="ap-section">
          <h3>Storage & Schedules</h3>
          <div style={{marginTop:'1.5rem'}}>
            <div className="form-group">
              <label>Backup Storage Destination</label>
              <select defaultValue="s3">
                <option value="local">Local Server Storage</option>
                <option value="s3">Amazon S3 (Recommended)</option>
                <option value="gcp">Google Cloud Storage</option>
                <option value="ftp">External FTP Server</option>
              </select>
            </div>
            
            <div style={{background:'var(--bg-color)', padding:'1rem', borderRadius:'8px', border:'1px solid var(--border-color)', margin:'1rem 0'}}>
              <h4 style={{marginBottom:'0.5rem'}}>AWS S3 Configuration</h4>
              <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1rem'}}>
                <input type="text" placeholder="Bucket Name" defaultValue="yourbill-prod-backups" style={{padding:'0.5rem', borderRadius:'6px', border:'1px solid var(--border-color)', background:'var(--bg-secondary)', color:'var(--text-primary)'}}/>
                <input type="text" placeholder="Region" defaultValue="ap-south-1" style={{padding:'0.5rem', borderRadius:'6px', border:'1px solid var(--border-color)', background:'var(--bg-secondary)', color:'var(--text-primary)'}}/>
              </div>
              <button className="btn-secondary" style={{width:'100%', marginTop:'0.5rem'}}>Test Connection</button>
            </div>

            <div className="setting-row" style={{padding:'1rem 0'}}>
              <div>
                <strong>Automated Database Backup</strong>
                <div className="sub-text">Runs Daily at 02:00 AM</div>
              </div>
              <div className="toggle-switch on"></div>
            </div>
            <div className="setting-row" style={{padding:'1rem 0'}}>
              <div>
                <strong>Automated File Backup (Attachments)</strong>
                <div className="sub-text">Runs Weekly on Sunday</div>
              </div>
              <div className="toggle-switch on"></div>
            </div>
          </div>
        </div>

        <div className="ap-section">
          <h3>Backup History & Recovery</h3>
          <p className="sub-text" style={{marginBottom:'1.5rem'}}>View recent backup snapshots and initiate point-in-time recovery.</p>
          
          <table className="ap-table">
            <thead>
              <tr>
                <th>Date / Time</th>
                <th>Type</th>
                <th>Size</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Today, 02:00 AM</strong><br/><span className="sub-text">Auto</span></td>
                <td>Database Full</td>
                <td>1.2 GB</td>
                <td><button className="btn-secondary" style={{padding:'0.2rem 0.5rem'}}>Restore</button></td>
              </tr>
              <tr>
                <td><strong>Yesterday, 02:00 AM</strong><br/><span className="sub-text">Auto</span></td>
                <td>Database Full</td>
                <td>1.2 GB</td>
                <td><button className="btn-secondary" style={{padding:'0.2rem 0.5rem'}}>Restore</button></td>
              </tr>
              <tr>
                <td><strong>Jan 01, 00:00 AM</strong><br/><span className="sub-text">Manual</span></td>
                <td>System Full (DB+Files)</td>
                <td>14.5 GB</td>
                <td><button className="btn-secondary" style={{padding:'0.2rem 0.5rem'}}>Restore</button></td>
              </tr>
            </tbody>
          </table>
          
          <div style={{marginTop:'2rem', padding:'1rem', background:'rgba(239, 68, 68, 0.1)', border:'1px solid #ef4444', borderRadius:'8px'}}>
            <h4 style={{color:'#ef4444', display:'flex', alignItems:'center', gap:'0.5rem'}}><AlertTriangle size={18}/> Danger Zone</h4>
            <p style={{fontSize:'0.9rem', margin:'0.5rem 0'}}>Performing a full restore will overwrite all current system data with the snapshot. This cannot be undone.</p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="admin-panel-wrapper">
      <div className="ap-tabs-top">
        <button className={`ap-tab ${activeTab === 'dashboard' ? 'active' : ''}`} onClick={() => setActiveTab('dashboard')}>Monitoring</button>
        <button className={`ap-tab ${activeTab === 'settings' ? 'active' : ''}`} onClick={() => setActiveTab('settings')}>System Settings</button>
        <button className={`ap-tab ${activeTab === 'tax' ? 'active' : ''}`} onClick={() => setActiveTab('tax')}>Tax & Currency</button>
        <button className={`ap-tab ${activeTab === 'templates' ? 'active' : ''}`} onClick={() => setActiveTab('templates')}>Templates & Workflows</button>
        <button className={`ap-tab ${activeTab === 'security' ? 'active' : ''}`} onClick={() => setActiveTab('security')}>Security & Audit</button>
        <button className={`ap-tab ${activeTab === 'backups' ? 'active' : ''}`} onClick={() => setActiveTab('backups')}>Backups</button>
      </div>

      <button className="back-btn-top" onClick={onBack}>← Back to Home</button>

      {activeTab === 'dashboard' && renderDashboard()}
      {activeTab === 'settings' && renderSystemSettings()}
      {activeTab === 'tax' && renderTaxCurrency()}
      {activeTab === 'templates' && renderTemplatesWorkflows()}
      {activeTab === 'security' && renderSecurity()}
      {activeTab === 'backups' && renderBackups()}
    </div>
  );
}
