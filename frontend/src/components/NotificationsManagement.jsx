import React, { useState } from 'react';
import { 
  Bell, Mail, MessageSquare, Smartphone, Send, Clock, 
  Settings, CheckCircle, XCircle, AlertTriangle, FileText,
  MessageCircle, BarChart2, Edit, Trash2, Zap, ArrowRight, Check
} from 'lucide-react';
import './NotificationsManagement.css';

export default function NotificationsManagement({ onBack }) {
  const [activeTab, setActiveTab] = useState('dashboard'); // dashboard, compose, templates, automation, logs

  const renderDashboard = () => (
    <div className="nm-view fade-in">
      <div className="nm-header">
        <div>
          <button className="back-btn" onClick={onBack}>← Back to Home</button>
          <h2 className="nm-title">Notifications & Communication</h2>
          <p className="nm-subtitle">Multi-channel automated alerts, invoices, and payment reminders</p>
        </div>
        <div style={{display:'flex', gap:'1rem'}}>
          <button className="btn-secondary"><Clock size={16}/> Scheduled</button>
          <button className="btn-primary rainbow-bg" onClick={() => setActiveTab('compose')}><Send size={16} /> Send Broadcast</button>
        </div>
      </div>

      <div className="grid-4">
        <div className="metric-card">
          <div className="metric-icon bg-blue"><Mail size={24}/></div>
          <div className="metric-info">
            <h4>Emails Sent</h4>
            <div className="metric-value">1,240</div>
            <div className="metric-trend positive">98% Delivery Rate</div>
          </div>
        </div>
        <div className="metric-card">
          <div className="metric-icon bg-green"><MessageCircle size={24}/></div>
          <div className="metric-info">
            <h4>WhatsApp Msgs</h4>
            <div className="metric-value">850</div>
            <div className="metric-trend positive">92% Read Rate</div>
          </div>
        </div>
        <div className="metric-card">
          <div className="metric-icon bg-orange"><MessageSquare size={24}/></div>
          <div className="metric-info">
            <h4>SMS Delivered</h4>
            <div className="metric-value">420</div>
            <div className="metric-trend">99% Delivery Rate</div>
          </div>
        </div>
        <div className="metric-card" style={{borderLeft: '4px solid #ef4444'}}>
          <div className="metric-icon" style={{background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444'}}><AlertTriangle size={24}/></div>
          <div className="metric-info">
            <h4>Failed Notifications</h4>
            <div className="metric-value text-orange">12</div>
            <div className="metric-trend negative">Requires attention</div>
          </div>
        </div>
      </div>

      <div className="grid-2">
        <div className="nm-section">
          <h3>Recent Activity Logs</h3>
          <table className="nm-table" style={{marginTop:'1rem'}}>
            <thead>
              <tr>
                <th>Recipient</th>
                <th>Channel</th>
                <th>Type</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>ABC Traders</strong><br/><span className="sub-text">client@abc.com</span></td>
                <td><span className="channel-pill email"><Mail size={12}/> Email</span></td>
                <td>Invoice Sent</td>
                <td><span className="status-badge opened">Opened</span></td>
              </tr>
              <tr>
                <td><strong>XYZ Pvt Ltd</strong><br/><span className="sub-text">+91 9876543210</span></td>
                <td><span className="channel-pill whatsapp"><MessageCircle size={12}/> WhatsApp</span></td>
                <td>Payment Reminder</td>
                <td><span className="status-badge delivered">Delivered</span></td>
              </tr>
              <tr>
                <td><strong>Rahul Sharma</strong><br/><span className="sub-text">In-App</span></td>
                <td><span className="channel-pill push"><Bell size={12}/> System</span></td>
                <td>Low Stock Alert</td>
                <td><span className="status-badge sent">Sent</span></td>
              </tr>
            </tbody>
          </table>
          <button className="btn-secondary" style={{width:'100%', marginTop:'1rem'}} onClick={() => setActiveTab('logs')}>View All Logs</button>
        </div>

        <div className="nm-section">
          <h3>Active Automation Rules</h3>
          <div style={{marginTop:'1.5rem'}}>
            <div className="automation-rule">
              <div className="automation-trigger">Payment Received</div>
              <div className="automation-arrow">→</div>
              <div style={{display:'flex', gap:'0.5rem'}}>
                <div className="automation-action email"><Mail size={16}/> Send Receipt</div>
                <div className="automation-action whatsapp"><MessageCircle size={16}/> Notify on WA</div>
              </div>
            </div>
            
            <div className="automation-rule">
              <div className="automation-trigger">Invoice Created</div>
              <div className="automation-arrow">→</div>
              <div style={{display:'flex', gap:'0.5rem'}}>
                <div className="automation-action email"><Mail size={16}/> Send PDF</div>
              </div>
            </div>

            <div className="automation-rule">
              <div className="automation-trigger">3 Days Before Due</div>
              <div className="automation-arrow">→</div>
              <div style={{display:'flex', gap:'0.5rem'}}>
                <div className="automation-action sms"><MessageSquare size={16}/> SMS Reminder</div>
                <div className="automation-action whatsapp"><MessageCircle size={16}/> WA Alert</div>
              </div>
            </div>
          </div>
          <button className="btn-secondary" style={{width:'100%', marginTop:'0.5rem'}} onClick={() => setActiveTab('automation')}>Manage Rules</button>
        </div>
      </div>
    </div>
  );

  const renderCompose = () => (
    <div className="nm-view fade-in">
       <div className="nm-header">
        <div>
          <h2 className="nm-title">Compose Message</h2>
          <p className="nm-subtitle">Send manual or bulk notifications to customers</p>
        </div>
      </div>

      <div className="grid-2">
        <div className="nm-section">
          <h3>Message Details</h3>
          <div style={{marginTop:'1.5rem'}}>
            <div className="form-group">
              <label>Select Channel *</label>
              <div style={{display:'flex', gap:'1rem', marginTop:'0.5rem'}}>
                <label style={{display:'flex', alignItems:'center', gap:'0.5rem'}}><input type="radio" name="channel" defaultChecked/> Email</label>
                <label style={{display:'flex', alignItems:'center', gap:'0.5rem'}}><input type="radio" name="channel"/> WhatsApp</label>
                <label style={{display:'flex', alignItems:'center', gap:'0.5rem'}}><input type="radio" name="channel"/> SMS</label>
              </div>
            </div>
            
            <div className="form-group">
              <label>Recipient(s) *</label>
              <input type="text" placeholder="Select customer(s) or enter email/phone..." />
            </div>

            <div className="form-group">
              <label>Template (Optional)</label>
              <select>
                <option>None (Custom Message)</option>
                <option>Payment Reminder</option>
                <option>Outstanding Balance Statement</option>
                <option>Festive Greeting</option>
              </select>
            </div>

            <div className="form-group">
              <label>Subject</label>
              <input type="text" placeholder="e.g. Important Update regarding your account" />
            </div>

            <div className="form-group">
              <label>Message Body *</label>
              <textarea placeholder="Type your message here... You can use variables like {{customer_name}}"></textarea>
            </div>
            
            <div className="form-group">
              <label>Attachments (PDFs)</label>
              <div style={{border:'1px dashed var(--border-color)', padding:'1rem', textAlign:'center', borderRadius:'8px', background:'var(--bg-color)', color:'var(--text-secondary)'}}>
                <FileText size={24} style={{marginBottom:'0.5rem'}}/>
                <div>Click to browse or drag & drop files</div>
              </div>
            </div>
          </div>
        </div>

        <div className="nm-section">
          <h3>Preview</h3>
          <div style={{marginTop:'1.5rem', background:'var(--bg-color)', border:'1px solid var(--border-color)', borderRadius:'12px', overflow:'hidden'}}>
            <div style={{background:'var(--bg-secondary)', padding:'1rem', borderBottom:'1px solid var(--border-color)', display:'flex', alignItems:'center', gap:'0.5rem'}}>
              <div style={{width:'12px', height:'12px', borderRadius:'50%', background:'#ef4444'}}></div>
              <div style={{width:'12px', height:'12px', borderRadius:'50%', background:'#f59e0b'}}></div>
              <div style={{width:'12px', height:'12px', borderRadius:'50%', background:'#10b981'}}></div>
              <span style={{marginLeft:'1rem', fontSize:'0.9rem', color:'var(--text-secondary)'}}>New Message</span>
            </div>
            <div style={{padding:'1.5rem'}}>
              <div style={{marginBottom:'1rem'}}>
                <strong>To:</strong> client@example.com<br/>
                <strong>Subject:</strong> Important Update regarding your account
              </div>
              <hr style={{border:'0', borderTop:'1px solid var(--border-color)', margin:'1rem 0'}}/>
              <div style={{whiteSpace:'pre-wrap', lineHeight:'1.5'}}>
                Type your message here... You can use variables like {'{customer_name}'}
              </div>
            </div>
          </div>

          <div style={{marginTop:'2rem', display:'flex', gap:'1rem'}}>
            <button className="btn-secondary" style={{flex:1}}><Clock size={16}/> Schedule Later</button>
            <button className="btn-primary rainbow-bg" style={{flex:2}}><Send size={16}/> Send Now</button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderTemplates = () => (
    <div className="nm-view fade-in">
       <div className="nm-header">
        <div>
          <h2 className="nm-title">Notification Templates</h2>
          <p className="nm-subtitle">Manage dynamic templates for automated and manual messages</p>
        </div>
        <button className="btn-primary rainbow-bg"><Plus size={16}/> Create Template</button>
      </div>

      <div style={{display:'flex', gap:'1rem', marginBottom:'1rem'}}>
        <button className="btn-secondary active">All Templates</button>
        <button className="btn-secondary"><Mail size={16}/> Email</button>
        <button className="btn-secondary"><MessageCircle size={16}/> WhatsApp</button>
        <button className="btn-secondary"><MessageSquare size={16}/> SMS</button>
      </div>

      <div className="grid-3">
        <div className="template-card">
          <div className="template-header">
            <div>
              <span className="channel-pill email"><Mail size={12}/> Email</span>
              <h3 style={{marginTop:'0.5rem'}}>Invoice Sent</h3>
            </div>
            <div style={{display:'flex', gap:'0.5rem'}}>
              <button className="action-btn"><Edit size={16}/></button>
              <button className="action-btn" style={{color:'#ef4444'}}><Trash2 size={16}/></button>
            </div>
          </div>
          <div className="template-preview">
Subject: Invoice <span className="variable-tag">{'{invoice_number}'}</span> from <span className="variable-tag">{'{company_name}'}</span>

Dear <span className="variable-tag">{'{customer_name}'}</span>,

Please find attached Invoice <span className="variable-tag">{'{invoice_number}'}</span>.
Amount: ₹<span className="variable-tag">{'{invoice_amount}'}</span>
Due Date: <span className="variable-tag">{'{due_date}'}</span>

Thank You.
          </div>
        </div>

        <div className="template-card">
          <div className="template-header">
            <div>
              <span className="channel-pill whatsapp"><MessageCircle size={12}/> WhatsApp</span>
              <h3 style={{marginTop:'0.5rem'}}>Payment Reminder</h3>
            </div>
            <div style={{display:'flex', gap:'0.5rem'}}>
              <button className="action-btn"><Edit size={16}/></button>
              <button className="action-btn" style={{color:'#ef4444'}}><Trash2 size={16}/></button>
            </div>
          </div>
          <div className="template-preview">
Hello <span className="variable-tag">{'{customer_name}'}</span>,

Friendly reminder that your Invoice <span className="variable-tag">{'{invoice_number}'}</span> for ₹<span className="variable-tag">{'{invoice_amount}'}</span> is due on <span className="variable-tag">{'{due_date}'}</span>.

Pay securely here: <span className="variable-tag">{'{payment_link}'}</span>

Thank You.
          </div>
        </div>

        <div className="template-card">
          <div className="template-header">
            <div>
              <span className="channel-pill sms"><MessageSquare size={12}/> SMS</span>
              <h3 style={{marginTop:'0.5rem'}}>Payment Confirmed</h3>
            </div>
            <div style={{display:'flex', gap:'0.5rem'}}>
              <button className="action-btn"><Edit size={16}/></button>
              <button className="action-btn" style={{color:'#ef4444'}}><Trash2 size={16}/></button>
            </div>
          </div>
          <div className="template-preview">
Success! Payment of ₹<span className="variable-tag">{'{amount_received}'}</span> received for Inv <span className="variable-tag">{'{invoice_number}'}</span>.
Balance: ₹<span className="variable-tag">{'{balance_amount}'}</span>
- <span className="variable-tag">{'{company_name}'}</span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAutomation = () => (
    <div className="nm-view fade-in">
       <div className="nm-header">
        <div>
          <h2 className="nm-title">Automation & Workflows</h2>
          <p className="nm-subtitle">Set up triggers to automatically send notifications</p>
        </div>
        <button className="btn-primary rainbow-bg"><Zap size={16}/> Create Rule</button>
      </div>

      <div className="nm-section">
        <table className="nm-table">
          <thead>
            <tr>
              <th>Trigger Event</th>
              <th>Conditions</th>
              <th>Actions (Channels)</th>
              <th>Status</th>
              <th>Manage</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Invoice Created</strong></td>
              <td><span className="sub-text">Status = Finalized</span></td>
              <td>
                <div style={{display:'flex', gap:'0.5rem'}}>
                  <span className="channel-pill email"><Mail size={12}/> Email</span>
                  <span className="channel-pill whatsapp"><MessageCircle size={12}/> WA</span>
                </div>
              </td>
              <td><div className="toggle-switch on"></div></td>
              <td><button className="btn-secondary" style={{padding:'0.3rem 0.5rem'}}>Edit</button></td>
            </tr>
            <tr>
              <td><strong>Payment Received</strong></td>
              <td><span className="sub-text">Amount &gt; 0</span></td>
              <td>
                <div style={{display:'flex', gap:'0.5rem'}}>
                  <span className="channel-pill email"><Mail size={12}/> Email</span>
                  <span className="channel-pill sms"><MessageSquare size={12}/> SMS</span>
                </div>
              </td>
              <td><div className="toggle-switch on"></div></td>
              <td><button className="btn-secondary" style={{padding:'0.3rem 0.5rem'}}>Edit</button></td>
            </tr>
            <tr>
              <td><strong>Due Invoice Alert</strong></td>
              <td><span className="sub-text">3 Days Before Due</span></td>
              <td>
                <div style={{display:'flex', gap:'0.5rem'}}>
                  <span className="channel-pill whatsapp"><MessageCircle size={12}/> WA</span>
                  <span className="channel-pill sms"><MessageSquare size={12}/> SMS</span>
                </div>
              </td>
              <td><div className="toggle-switch on"></div></td>
              <td><button className="btn-secondary" style={{padding:'0.3rem 0.5rem'}}>Edit</button></td>
            </tr>
            <tr>
              <td><strong>Overdue Alert</strong></td>
              <td><span className="sub-text">1 Day After Due</span></td>
              <td>
                <div style={{display:'flex', gap:'0.5rem'}}>
                  <span className="channel-pill email"><Mail size={12}/> Email</span>
                  <span className="channel-pill push"><Bell size={12}/> In-App (Sales Rep)</span>
                </div>
              </td>
              <td><div className="toggle-switch on"></div></td>
              <td><button className="btn-secondary" style={{padding:'0.3rem 0.5rem'}}>Edit</button></td>
            </tr>
            <tr>
              <td><strong>Low Stock Alert</strong></td>
              <td><span className="sub-text">Stock &lt; Min Level</span></td>
              <td>
                <div style={{display:'flex', gap:'0.5rem'}}>
                  <span className="channel-pill push"><Bell size={12}/> In-App (Manager)</span>
                </div>
              </td>
              <td><div className="toggle-switch on"></div></td>
              <td><button className="btn-secondary" style={{padding:'0.3rem 0.5rem'}}>Edit</button></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderLogs = () => (
    <div className="nm-view fade-in">
       <div className="nm-header">
        <div>
          <h2 className="nm-title">Notification Logs</h2>
          <p className="nm-subtitle">Track delivery status, open rates, and failures</p>
        </div>
      </div>
      
      <div className="nm-section">
        <div style={{display:'flex', gap:'1rem', marginBottom:'1.5rem'}}>
          <input type="text" placeholder="Search logs by recipient or reference..." style={{flex:1, padding:'0.8rem', borderRadius:'8px', border:'1px solid var(--border-color)', background:'var(--bg-color)', color:'var(--text-primary)'}} />
          <select style={{padding:'0.8rem', borderRadius:'8px', border:'1px solid var(--border-color)', background:'var(--bg-color)', color:'var(--text-primary)'}}>
            <option>All Channels</option>
            <option>Email</option>
            <option>WhatsApp</option>
            <option>SMS</option>
          </select>
          <select style={{padding:'0.8rem', borderRadius:'8px', border:'1px solid var(--border-color)', background:'var(--bg-color)', color:'var(--text-primary)'}}>
            <option>All Statuses</option>
            <option>Delivered</option>
            <option>Opened</option>
            <option>Failed</option>
          </select>
        </div>

        <table className="nm-table">
          <thead>
            <tr>
              <th>Timestamp</th>
              <th>Recipient</th>
              <th>Channel</th>
              <th>Message Type / Ref</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Jan 03, 10:45 AM</td>
              <td><strong>ABC Traders</strong><br/><span className="sub-text">client@abc.com</span></td>
              <td><span className="channel-pill email"><Mail size={12}/> Email</span></td>
              <td>Invoice Sent<br/><span className="sub-text">INV-2026-001</span></td>
              <td><span className="status-badge opened">Opened</span><br/><span className="sub-text" style={{fontSize:'0.75rem'}}>Jan 03, 11:02 AM</span></td>
              <td><button className="btn-secondary" style={{padding:'0.2rem 0.5rem'}}>View</button></td>
            </tr>
            <tr>
              <td>Jan 03, 10:45 AM</td>
              <td><strong>ABC Traders</strong><br/><span className="sub-text">+91 9876543210</span></td>
              <td><span className="channel-pill whatsapp"><MessageCircle size={12}/> WhatsApp</span></td>
              <td>Invoice Sent<br/><span className="sub-text">INV-2026-001</span></td>
              <td><span className="status-badge delivered">Delivered</span><br/><span className="sub-text" style={{fontSize:'0.75rem'}}>Jan 03, 10:46 AM</span></td>
              <td><button className="btn-secondary" style={{padding:'0.2rem 0.5rem'}}>View</button></td>
            </tr>
            <tr>
              <td>Jan 02, 09:00 AM</td>
              <td><strong>XYZ Pvt Ltd</strong><br/><span className="sub-text">+91 9998887776</span></td>
              <td><span className="channel-pill sms"><MessageSquare size={12}/> SMS</span></td>
              <td>Payment Reminder<br/><span className="sub-text">INV-2025-142</span></td>
              <td><span className="status-badge failed">Failed</span><br/><span className="sub-text" style={{fontSize:'0.75rem'}}>Invalid Number</span></td>
              <td><button className="btn-secondary" style={{padding:'0.2rem 0.5rem'}}>Retry</button></td>
            </tr>
            <tr>
              <td>Jan 02, 08:30 AM</td>
              <td><strong>Acme Corp</strong><br/><span className="sub-text">acme@corp.com</span></td>
              <td><span className="channel-pill email"><Mail size={12}/> Email</span></td>
              <td>Payment Receipt<br/><span className="sub-text">PAY-881</span></td>
              <td><span className="status-badge sent">Sent</span><br/><span className="sub-text" style={{fontSize:'0.75rem'}}>Awaiting Read</span></td>
              <td><button className="btn-secondary" style={{padding:'0.2rem 0.5rem'}}>View</button></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className="notifications-management-wrapper">
      {activeTab === 'dashboard' && (
        <div className="nm-header" style={{paddingBottom:0, borderBottom:'none', marginBottom:'1rem'}}>
          <button className="back-btn" onClick={onBack}>← Back to Home</button>
        </div>
      )}
      
      <div className="tabs-simple">
        <button className={`tab-simple ${activeTab === 'dashboard' ? 'active' : ''}`} onClick={() => setActiveTab('dashboard')}>Overview</button>
        <button className={`tab-simple ${activeTab === 'compose' ? 'active' : ''}`} onClick={() => setActiveTab('compose')}>Compose & Send</button>
        <button className={`tab-simple ${activeTab === 'templates' ? 'active' : ''}`} onClick={() => setActiveTab('templates')}>Templates</button>
        <button className={`tab-simple ${activeTab === 'automation' ? 'active' : ''}`} onClick={() => setActiveTab('automation')}>Automation Rules</button>
        <button className={`tab-simple ${activeTab === 'logs' ? 'active' : ''}`} onClick={() => setActiveTab('logs')}>Delivery Logs</button>
      </div>

      {activeTab === 'dashboard' && renderDashboard()}
      {activeTab === 'compose' && renderCompose()}
      {activeTab === 'templates' && renderTemplates()}
      {activeTab === 'automation' && renderAutomation()}
      {activeTab === 'logs' && renderLogs()}
    </div>
  );
}
