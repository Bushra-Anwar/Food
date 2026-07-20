import React, { useState } from 'react';
import { 
  Globe, Briefcase, Moon, Sun, Terminal, Webhook, Download, 
  Upload, Smartphone, WifiOff, Shield, Database, Plus, CheckCircle, 
  Key, Activity, AlertTriangle, Layers
} from 'lucide-react';
import './AdvancedFeatures.css';

export default function AdvancedFeatures({ onBack }) {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isDark, setIsDark] = useState(true);

  const renderDashboard = () => (
    <div className="af-view fade-in">
      <div className="af-header">
        <div>
          <button className="back-btn" onClick={onBack}>← Back to Home</button>
          <h2 className="af-title">Advanced Enterprise Features</h2>
          <p className="af-subtitle">Multi-company, APIs, PWA offline support, and security</p>
        </div>
      </div>

      <div className="grid-4">
        <div className="metric-card">
          <div className="metric-icon bg-blue"><Briefcase size={24}/></div>
          <div className="metric-info">
            <h4>Active Companies</h4>
            <div className="metric-value">3</div>
            <div className="metric-trend positive">Under one master account</div>
          </div>
        </div>
        <div className="metric-card">
          <div className="metric-icon bg-green"><Terminal size={24}/></div>
          <div className="metric-info">
            <h4>API Requests</h4>
            <div className="metric-value">12.5k</div>
            <div className="metric-trend positive">Last 24 hours</div>
          </div>
        </div>
        <div className="metric-card">
          <div className="metric-icon bg-purple"><Webhook size={24}/></div>
          <div className="metric-info">
            <h4>Webhooks Sent</h4>
            <div className="metric-value">845</div>
            <div className="metric-trend">99.8% delivery success</div>
          </div>
        </div>
        <div className="metric-card">
          <div className="metric-icon bg-orange"><WifiOff size={24}/></div>
          <div className="metric-info">
            <h4>Offline Sync Queue</h4>
            <div className="metric-value text-orange">0</div>
            <div className="metric-trend">All PWA devices synced</div>
          </div>
        </div>
      </div>

      <div className="grid-2">
        <div className="af-section">
          <h3>Recent Webhook Deliveries</h3>
          <table className="af-table" style={{marginTop:'1.5rem'}}>
            <thead>
              <tr>
                <th>Event Type</th>
                <th>Destination</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>invoice.paid</strong><br/><span className="sub-text">10 mins ago</span></td>
                <td>https://api.myapp.com/wh</td>
                <td><span className="status-badge success">200 OK</span></td>
              </tr>
              <tr>
                <td><strong>customer.created</strong><br/><span className="sub-text">1 hour ago</span></td>
                <td>https://crm.external.io/hook</td>
                <td><span className="status-badge success">200 OK</span></td>
              </tr>
              <tr>
                <td><strong>subscription.renewed</strong><br/><span className="sub-text">2 hours ago</span></td>
                <td>https://hooks.slack.com/services/..</td>
                <td><span className="status-badge danger">500 ERR</span></td>
              </tr>
            </tbody>
          </table>
          <button className="btn-secondary" style={{width:'100%', marginTop:'1rem'}} onClick={() => setActiveTab('apis')}>View All Webhooks</button>
        </div>

        <div className="af-section">
          <h3>Enterprise Compliance Status</h3>
          <div style={{marginTop:'1.5rem', display:'flex', flexDirection:'column', gap:'1rem'}}>
            <div style={{background:'var(--bg-color)', padding:'1rem', borderRadius:'8px', border:'1px solid var(--border-color)', display:'flex', alignItems:'center', gap:'1rem'}}>
              <div style={{color:'#10b981'}}><Shield size={20}/></div>
              <div style={{flex:1}}>
                <strong>Single Sign-On (SSO)</strong>
                <div className="sub-text">Active Directory / SAML configured.</div>
              </div>
              <span className="status-badge success">Active</span>
            </div>
            
            <div style={{background:'var(--bg-color)', padding:'1rem', borderRadius:'8px', border:'1px solid var(--border-color)', display:'flex', alignItems:'center', gap:'1rem'}}>
              <div style={{color:'#10b981'}}><Database size={20}/></div>
              <div style={{flex:1}}>
                <strong>Data Encryption</strong>
                <div className="sub-text">AES-256 encryption at rest active.</div>
              </div>
              <span className="status-badge success">Active</span>
            </div>

            <div style={{background:'var(--bg-color)', padding:'1rem', borderRadius:'8px', border:'1px solid var(--border-color)', display:'flex', alignItems:'center', gap:'1rem'}}>
              <div style={{color:'#f59e0b'}}><AlertTriangle size={20}/></div>
              <div style={{flex:1}}>
                <strong>GDPR Data Portability</strong>
                <div className="sub-text">User export requests pending review.</div>
              </div>
              <button className="btn-secondary" style={{padding:'0.3rem 0.5rem'}}>Review</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderMultiCompany = () => (
    <div className="af-view fade-in">
       <div className="af-header">
        <div>
          <h2 className="af-title">Multi-Company Support</h2>
          <p className="af-subtitle">Manage multiple distinct businesses from a single account</p>
        </div>
        <button className="btn-primary rainbow-bg"><Plus size={16}/> Add New Company</button>
      </div>

      <div className="af-section">
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'1.5rem'}}>
          <div>
            <h3>Your Companies</h3>
            <span className="sub-text">Switching companies changes reports, taxes, and branding immediately.</span>
          </div>
        </div>

        <div className="grid-3">
          <div style={{background:'var(--bg-color)', border:'1px solid #8b5cf6', borderRadius:'12px', padding:'1.5rem', position:'relative', boxShadow:'0 0 0 2px rgba(139, 92, 246, 0.2)'}}>
            <div style={{position:'absolute', top:'10px', right:'10px'}}><span className="status-badge success">Current</span></div>
            <h3 style={{marginBottom:'0.5rem'}}>YourBill Tech (India)</h3>
            <p className="sub-text" style={{marginBottom:'1rem'}}>Base: INR | FY: Apr-Mar</p>
            <div style={{display:'flex', gap:'0.5rem'}}>
              <button className="btn-secondary" style={{flex:1}}>Settings</button>
            </div>
          </div>

          <div style={{background:'var(--bg-color)', border:'1px solid var(--border-color)', borderRadius:'12px', padding:'1.5rem'}}>
            <h3 style={{marginBottom:'0.5rem'}}>YourBill LLC (USA)</h3>
            <p className="sub-text" style={{marginBottom:'1rem'}}>Base: USD | FY: Jan-Dec</p>
            <div style={{display:'flex', gap:'0.5rem'}}>
              <button className="btn-primary" style={{flex:1, background:'var(--hover-bg)', color:'var(--text-primary)', border:'1px solid var(--border-color)'}}><RefreshCw size={14} style={{marginRight:'5px'}}/> Switch To</button>
              <button className="btn-secondary">Settings</button>
            </div>
          </div>

          <div style={{background:'var(--bg-color)', border:'1px solid var(--border-color)', borderRadius:'12px', padding:'1.5rem'}}>
            <h3 style={{marginBottom:'0.5rem'}}>YourBill Retail UAE</h3>
            <p className="sub-text" style={{marginBottom:'1rem'}}>Base: AED | FY: Jan-Dec</p>
            <div style={{display:'flex', gap:'0.5rem'}}>
              <button className="btn-primary" style={{flex:1, background:'var(--hover-bg)', color:'var(--text-primary)', border:'1px solid var(--border-color)'}}><RefreshCw size={14} style={{marginRight:'5px'}}/> Switch To</button>
              <button className="btn-secondary">Settings</button>
            </div>
          </div>
        </div>

        <div style={{marginTop:'2rem'}}>
          <h3>Consolidated Reporting</h3>
          <p className="sub-text" style={{marginBottom:'1rem'}}>View combined metrics across all your companies.</p>
          <div className="setting-row" style={{background:'var(--bg-color)', borderRadius:'8px', border:'1px solid var(--border-color)'}}>
            <div>
              <strong>Enable Cross-Company Dashboards</strong>
              <div className="sub-text">Requires common base currency conversion (Default: INR)</div>
            </div>
            <div className="toggle-switch on"></div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderLocalization = () => (
    <div className="af-view fade-in">
       <div className="af-header">
        <div>
          <h2 className="af-title">Localization & Theme Engine</h2>
          <p className="af-subtitle">Multi-language, RTL support, and Dark/Light UI modes</p>
        </div>
      </div>

      <div className="grid-2">
        <div className="af-section">
          <h3>Multi-Language & Region</h3>
          <div style={{marginTop:'1.5rem'}}>
            <div className="form-group">
              <label>System Default Language</label>
              <select defaultValue="en">
                <option value="en">English (US)</option>
                <option value="hi">Hindi (India)</option>
                <option value="es">Spanish</option>
                <option value="ar">Arabic (RTL)</option>
                <option value="fr">French</option>
              </select>
            </div>
            
            <div className="setting-row" style={{padding:'1rem 0'}}>
              <div>
                <strong>Enable Right-to-Left (RTL)</strong>
                <div className="sub-text">Auto-enabled for Arabic, Hebrew, Urdu</div>
              </div>
              <div className="toggle-switch"></div>
            </div>

            <div className="setting-row" style={{padding:'1rem 0'}}>
              <div>
                <strong>Auto-Translate Invoices</strong>
                <div className="sub-text">Translate based on customer's preferred language</div>
              </div>
              <div className="toggle-switch on"></div>
            </div>
          </div>
        </div>

        <div className="af-section">
          <h3>UI Theme Management</h3>
          <div style={{marginTop:'1.5rem'}}>
            <div className="setting-row" style={{padding:'0 0 1rem 0'}}>
              <div>
                <strong>Enforce Dark Mode Globally</strong>
                <div className="sub-text">Override user system preferences</div>
              </div>
              <div className={`toggle-switch ${isDark ? 'on' : ''}`} onClick={() => setIsDark(!isDark)}></div>
            </div>

            <label style={{fontWeight:500, fontSize:'0.9rem', display:'block', marginBottom:'0.5rem'}}>Theme Preview</label>
            <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1rem'}}>
              <div className={`theme-preview-box dark ${isDark ? 'active' : ''}`} onClick={() => setIsDark(true)}>
                <Moon size={24} style={{marginRight:'10px'}}/> Dark Mode (Active)
              </div>
              <div className={`theme-preview-box light ${!isDark ? 'active' : ''}`} onClick={() => setIsDark(false)}>
                <Sun size={24} style={{marginRight:'10px'}}/> Light Mode
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderDeveloperApis = () => (
    <div className="af-view fade-in">
       <div className="af-header">
        <div>
          <h2 className="af-title">Developer APIs & Webhooks</h2>
          <p className="af-subtitle">Generate API keys and configure real-time webhooks</p>
        </div>
        <button className="btn-secondary">View API Docs</button>
      </div>

      <div className="grid-2">
        <div className="af-section">
          <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'1.5rem'}}>
            <h3>API Keys</h3>
            <button className="btn-secondary" style={{padding:'0.2rem 0.5rem'}}><Plus size={16}/> Generate Key</button>
          </div>
          
          <table className="af-table">
            <thead>
              <tr>
                <th>Name / Token</th>
                <th>Permissions</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Production ERP Sync</strong><br/><span className="sub-text">sk_live_9f8d7...</span></td>
                <td><span className="status-badge info">Full Access</span></td>
                <td><button className="btn-secondary" style={{padding:'0.2rem 0.5rem', color:'#ef4444'}}>Revoke</button></td>
              </tr>
              <tr>
                <td><strong>Read-Only Reporting</strong><br/><span className="sub-text">sk_test_1a2b3...</span></td>
                <td><span className="status-badge warning">Read Only</span></td>
                <td><button className="btn-secondary" style={{padding:'0.2rem 0.5rem', color:'#ef4444'}}>Revoke</button></td>
              </tr>
            </tbody>
          </table>

          <div style={{marginTop:'1.5rem'}}>
            <label style={{fontWeight:500, fontSize:'0.9rem', display:'block', marginBottom:'0.5rem'}}>API Rate Limiting</label>
            <select style={{width:'100%', padding:'0.8rem', borderRadius:'8px', border:'1px solid var(--border-color)', background:'var(--bg-color)', color:'var(--text-primary)'}}>
              <option>100 Requests / Minute</option>
              <option>1000 Requests / Hour</option>
              <option>Unlimited (Enterprise Only)</option>
            </select>
          </div>
        </div>

        <div className="af-section">
          <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'1.5rem'}}>
            <h3>Webhooks</h3>
            <button className="btn-secondary" style={{padding:'0.2rem 0.5rem'}}><Plus size={16}/> Add Endpoint</button>
          </div>
          
          <div style={{display:'flex', flexDirection:'column', gap:'1rem'}}>
             <div style={{background:'var(--bg-color)', padding:'1rem', borderRadius:'8px', border:'1px solid var(--border-color)'}}>
              <div style={{display:'flex', justifyContent:'space-between', marginBottom:'0.5rem'}}>
                <strong>https://api.mycompany.com/webhook</strong>
                <span className="status-badge success">Active</span>
              </div>
              <div className="sub-text" style={{marginBottom:'0.5rem'}}>Events: <span style={{color:'var(--text-primary)'}}>invoice.paid, invoice.created</span></div>
              <div className="code-block">
{`{
  "event": "invoice.paid",
  "invoice_id": "INV-2026-001",
  "amount": 25000,
  "status": "paid"
}`}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderDataManagement = () => (
    <div className="af-view fade-in">
       <div className="af-header">
        <div>
          <h2 className="af-title">Data Export & Import</h2>
          <p className="af-subtitle">Bulk data movement, backups, and external migrations</p>
        </div>
      </div>

      <div className="grid-2">
        <div className="af-section">
          <h3>Bulk Import & Migrations</h3>
          <p className="sub-text" style={{marginBottom:'1.5rem'}}>Import CSV/Excel data or migrate directly from legacy software.</p>
          
          <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1rem'}}>
            <div style={{border:'1px dashed var(--border-color)', borderRadius:'8px', padding:'2rem 1rem', textAlign:'center', cursor:'pointer'}}>
              <Upload size={32} style={{margin:'0 auto 1rem auto', color:'#8b5cf6'}}/>
              <strong>Upload CSV / Excel</strong>
              <div className="sub-text" style={{marginTop:'0.5rem'}}>Customers, Invoices, Items</div>
            </div>
            
            <div style={{display:'flex', flexDirection:'column', gap:'0.5rem'}}>
              <button className="btn-secondary" style={{flex:1, justifyContent:'flex-start'}}><Layers size={16} style={{marginRight:'10px'}}/> Import from Tally ERP</button>
              <button className="btn-secondary" style={{flex:1, justifyContent:'flex-start'}}><Layers size={16} style={{marginRight:'10px'}}/> Import from QuickBooks</button>
              <button className="btn-secondary" style={{flex:1, justifyContent:'flex-start'}}><Layers size={16} style={{marginRight:'10px'}}/> Import from Zoho Books</button>
            </div>
          </div>
        </div>

        <div className="af-section">
          <h3>Scheduled Exports</h3>
          <p className="sub-text" style={{marginBottom:'1.5rem'}}>Automatically export reports and data to external servers or email.</p>
          
          <div style={{display:'flex', flexDirection:'column', gap:'1rem'}}>
            <div className="setting-row" style={{background:'var(--bg-color)', borderRadius:'8px', border:'1px solid var(--border-color)'}}>
              <div>
                <strong>Daily Sales CSV to FTP</strong>
                <div className="sub-text">Runs at 23:59 everyday</div>
              </div>
              <div className="toggle-switch on"></div>
            </div>
            <div className="setting-row" style={{background:'var(--bg-color)', borderRadius:'8px', border:'1px solid var(--border-color)'}}>
              <div>
                <strong>Monthly Tax Report (PDF) to Email</strong>
                <div className="sub-text">Sends to admin@yourbill.com on 1st</div>
              </div>
              <div className="toggle-switch on"></div>
            </div>
            <button className="btn-secondary" style={{marginTop:'0.5rem'}}><Plus size={16}/> New Export Rule</button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderEnterprisePWA = () => (
    <div className="af-view fade-in">
       <div className="af-header">
        <div>
          <h2 className="af-title">Enterprise Security & PWA</h2>
          <p className="af-subtitle">Offline capabilities and strict access compliance</p>
        </div>
      </div>

      <div className="grid-2">
        <div className="af-section">
          <h3>Offline Support (PWA)</h3>
          <p className="sub-text" style={{marginBottom:'1.5rem'}}>Allow field agents to create invoices and orders without internet. Data syncs automatically when online.</p>
          
          <div style={{marginTop:'1.5rem', display:'flex', flexDirection:'column', gap:'1rem'}}>
             <div className="setting-row" style={{background:'var(--bg-color)', borderRadius:'8px', border:'1px solid var(--border-color)'}}>
              <div>
                <strong>Enable Offline Mode</strong>
                <div className="sub-text">Caches essential data in browser (IndexedDB)</div>
              </div>
              <div className="toggle-switch on"></div>
            </div>
            
            <div style={{padding:'1rem', background:'rgba(59, 130, 246, 0.1)', border:'1px solid #3b82f6', borderRadius:'8px'}}>
              <h4 style={{color:'#3b82f6', display:'flex', alignItems:'center', gap:'0.5rem'}}><Smartphone size={18}/> Background Sync Status</h4>
              <p style={{fontSize:'0.9rem', margin:'0.5rem 0'}}>All local offline actions have been synced successfully to the master database. Queue is empty.</p>
              <button className="btn-secondary" style={{color:'#3b82f6', borderColor:'#3b82f6', background:'transparent'}}>Force Manual Sync</button>
            </div>
          </div>
        </div>

        <div className="af-section">
          <h3>Enterprise Security (SSO)</h3>
          <p className="sub-text" style={{marginBottom:'1.5rem'}}>Integrate with your organization's identity providers.</p>
          
          <div style={{marginTop:'1.5rem', display:'flex', flexDirection:'column', gap:'1rem'}}>
             <div className="setting-row" style={{background:'var(--bg-color)', borderRadius:'8px', border:'1px solid var(--border-color)'}}>
              <div>
                <strong>Active Directory / LDAP</strong>
                <div className="sub-text">Allow login via Windows credentials</div>
              </div>
              <div className="toggle-switch"></div>
            </div>
             <div className="setting-row" style={{background:'var(--bg-color)', borderRadius:'8px', border:'1px solid var(--border-color)'}}>
              <div>
                <strong>Google Workspace (OAuth2)</strong>
                <div className="sub-text">1-click login for @yourbill.com users</div>
              </div>
              <div className="toggle-switch on"></div>
            </div>
             <div className="setting-row" style={{background:'var(--bg-color)', borderRadius:'8px', border:'1px solid var(--border-color)'}}>
              <div>
                <strong>SAML 2.0 (Okta/Azure)</strong>
                <div className="sub-text">Enterprise identity federation</div>
              </div>
              <button className="btn-secondary" style={{padding:'0.3rem 0.5rem'}}>Configure</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="advanced-features-wrapper">
      {activeTab === 'dashboard' && (
        <div className="af-header" style={{paddingBottom:0, borderBottom:'none', marginBottom:'1rem'}}>
          <button className="back-btn" onClick={onBack}>← Back to Home</button>
        </div>
      )}
      
      <div className="tabs-simple">
        <button className={`tab-simple ${activeTab === 'dashboard' ? 'active' : ''}`} onClick={() => setActiveTab('dashboard')}>Overview</button>
        <button className={`tab-simple ${activeTab === 'multicompany' ? 'active' : ''}`} onClick={() => setActiveTab('multicompany')}>Multi-Company</button>
        <button className={`tab-simple ${activeTab === 'localization' ? 'active' : ''}`} onClick={() => setActiveTab('localization')}>Localization & Theme</button>
        <button className={`tab-simple ${activeTab === 'apis' ? 'active' : ''}`} onClick={() => setActiveTab('apis')}>Developer APIs & Webhooks</button>
        <button className={`tab-simple ${activeTab === 'data' ? 'active' : ''}`} onClick={() => setActiveTab('data')}>Data Management</button>
        <button className={`tab-simple ${activeTab === 'enterprise' ? 'active' : ''}`} onClick={() => setActiveTab('enterprise')}>Enterprise Security & PWA</button>
      </div>

      {activeTab === 'dashboard' && renderDashboard()}
      {activeTab === 'multicompany' && renderMultiCompany()}
      {activeTab === 'localization' && renderLocalization()}
      {activeTab === 'apis' && renderDeveloperApis()}
      {activeTab === 'data' && renderDataManagement()}
      {activeTab === 'enterprise' && renderEnterprisePWA()}
    </div>
  );
}
