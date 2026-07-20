import React, { useState } from 'react';
import { 
  Users, Shield, Key, Activity, Lock, Search, Filter, 
  Plus, Edit, Trash2, MoreVertical, History, UserCheck, 
  UserX, Smartphone, AlertTriangle
} from 'lucide-react';
import './UserManagement.css';

export default function UserManagement({ onBack }) {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderDashboard = () => (
    <div className="um-view fade-in">
      <div className="um-header">
        <div>
          <button className="back-btn" onClick={onBack}>← Back to Home</button>
          <h2 className="um-title">User & Access Management</h2>
          <p className="um-subtitle">Control authentication, authorization, and system security</p>
        </div>
      </div>

      <div className="grid-4">
        <div className="metric-card">
          <div className="metric-icon bg-blue"><Users size={24} /></div>
          <div className="metric-info">
            <h4>Total Users</h4>
            <div className="metric-value">42</div>
            <div className="metric-trend positive">38 Active, 4 Inactive</div>
          </div>
        </div>
        <div className="metric-card">
          <div className="metric-icon bg-green"><Activity size={24} /></div>
          <div className="metric-info">
            <h4>Logins Today</h4>
            <div className="metric-value">124</div>
            <div className="metric-trend positive">Across 5 branches</div>
          </div>
        </div>
        <div className="metric-card">
          <div className="metric-icon bg-purple"><Shield size={24} /></div>
          <div className="metric-info">
            <h4>Active Roles</h4>
            <div className="metric-value">8</div>
            <div className="metric-trend">2 Custom Roles</div>
          </div>
        </div>
        <div className="metric-card" style={{borderLeft: '4px solid #ef4444'}}>
          <div className="metric-icon" style={{background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444'}}><Lock size={24} /></div>
          <div className="metric-info">
            <h4>Locked Accounts</h4>
            <div className="metric-value text-orange">2</div>
            <div className="metric-trend negative">Requires admin unlock</div>
          </div>
        </div>
      </div>

      <div className="grid-2">
        <div className="um-section">
          <h3>Recent Activity Logs</h3>
          <div className="timeline">
            <div className="timeline-event">
              <div className="timeline-time">Today, 10:45 AM</div>
              <div className="timeline-desc"><strong>Rahul Sharma</strong> updated Invoice INV-2026-001</div>
            </div>
            <div className="timeline-event">
              <div className="timeline-time">Today, 10:12 AM</div>
              <div className="timeline-desc"><strong>Priya Singh</strong> recorded Payment #RCV-881</div>
            </div>
            <div className="timeline-event">
              <div className="timeline-time">Today, 09:30 AM</div>
              <div className="timeline-desc"><strong>System Admin</strong> created new user <em>sales_rep2</em></div>
            </div>
            <div className="timeline-event">
              <div className="timeline-time">Today, 09:05 AM</div>
              <div className="timeline-desc" style={{color: '#ef4444'}}>Failed login attempt for <em>manager_mumbai</em> from IP 192.168.1.45</div>
            </div>
          </div>
        </div>
        
        <div className="um-section">
          <h3>Online Users (Real-Time)</h3>
          <table className="um-table" style={{marginTop:'1rem'}}>
            <thead>
              <tr>
                <th>User</th>
                <th>Role</th>
                <th>IP Address</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <div className="user-profile-cell">
                    <div className="user-avatar" style={{width:'32px', height:'32px', fontSize:'0.9rem'}}>R</div>
                    <span>Rahul Sharma</span>
                  </div>
                </td>
                <td><span className="role-badge">Salesperson</span></td>
                <td>103.11.22.45</td>
              </tr>
              <tr>
                <td>
                  <div className="user-profile-cell">
                    <div className="user-avatar" style={{width:'32px', height:'32px', fontSize:'0.9rem', background:'#10b981'}}>P</div>
                    <span>Priya Singh</span>
                  </div>
                </td>
                <td><span className="role-badge">Accountant</span></td>
                <td>103.44.55.12</td>
              </tr>
              <tr>
                <td>
                  <div className="user-profile-cell">
                    <div className="user-avatar" style={{width:'32px', height:'32px', fontSize:'0.9rem', background:'#f59e0b'}}>A</div>
                    <span>Admin</span>
                  </div>
                </td>
                <td><span className="role-badge admin">Admin</span></td>
                <td>192.168.1.100</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderUsers = () => (
    <div className="um-view fade-in">
      <div className="um-header">
        <div>
          <h2 className="um-title">User Directory</h2>
          <p className="um-subtitle">Manage employee accounts, statuses, and profiles</p>
        </div>
        <div style={{display:'flex', gap:'1rem'}}>
          <button className="btn-secondary">Export Users</button>
          <button className="btn-primary rainbow-bg"><Plus size={16} /> Add New User</button>
        </div>
      </div>

      <div className="um-section">
        <div style={{display:'flex', justifyContent:'space-between', marginBottom:'1.5rem'}}>
          <div style={{display:'flex', gap:'0.5rem'}}>
            <div className="search-box" style={{background:'var(--bg-color)', border:'1px solid var(--border-color)', display:'flex', alignItems:'center', padding:'0.5rem 1rem', borderRadius:'8px'}}>
              <Search size={16} style={{marginRight:'0.5rem', color:'var(--text-secondary)'}}/>
              <input type="text" placeholder="Search users..." style={{background:'transparent', border:'none', outline:'none', color:'var(--text-primary)'}} />
            </div>
            <button className="btn-secondary" style={{padding:'0.5rem 1rem'}}><Filter size={16} /> Filter</button>
          </div>
        </div>

        <table className="um-table">
          <thead>
            <tr>
              <th>Employee Info</th>
              <th>Username</th>
              <th>Role / Branch</th>
              <th>Status</th>
              <th>Last Login</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <div className="user-profile-cell">
                  <div className="user-avatar">A</div>
                  <div>
                    <strong>Amit Kumar</strong>
                    <div className="sub-text">amit@company.com</div>
                  </div>
                </div>
              </td>
              <td>amit_admin</td>
              <td>
                <div style={{display:'flex', flexDirection:'column', gap:'0.3rem', alignItems:'flex-start'}}>
                  <span className="role-badge admin">System Admin</span>
                  <span className="sub-text">All Branches</span>
                </div>
              </td>
              <td><span className="status-indicator"><span className="status-dot active"></span> Active</span></td>
              <td>Today, 08:30 AM</td>
              <td>
                <div style={{display:'flex', gap:'0.5rem'}}>
                  <button className="btn-secondary" style={{padding:'0.3rem'}}><Edit size={16}/></button>
                  <button className="btn-secondary" style={{padding:'0.3rem'}}><MoreVertical size={16}/></button>
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <div className="user-profile-cell">
                  <div className="user-avatar" style={{background:'#10b981'}}>P</div>
                  <div>
                    <strong>Priya Singh</strong>
                    <div className="sub-text">priya@company.com</div>
                  </div>
                </div>
              </td>
              <td>priya_accounts</td>
              <td>
                <div style={{display:'flex', flexDirection:'column', gap:'0.3rem', alignItems:'flex-start'}}>
                  <span className="role-badge">Accountant</span>
                  <span className="sub-text">Mumbai Branch</span>
                </div>
              </td>
              <td><span className="status-indicator"><span className="status-dot active"></span> Active</span></td>
              <td>Today, 10:12 AM</td>
              <td>
                <div style={{display:'flex', gap:'0.5rem'}}>
                  <button className="btn-secondary" style={{padding:'0.3rem'}}><Edit size={16}/></button>
                  <button className="btn-secondary" style={{padding:'0.3rem'}}><MoreVertical size={16}/></button>
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <div className="user-profile-cell">
                  <div className="user-avatar" style={{background:'#6b7280'}}>R</div>
                  <div>
                    <strong>Rohan Gupta</strong>
                    <div className="sub-text">rohan@company.com</div>
                  </div>
                </div>
              </td>
              <td>rohan_sales</td>
              <td>
                <div style={{display:'flex', flexDirection:'column', gap:'0.3rem', alignItems:'flex-start'}}>
                  <span className="role-badge">Salesperson</span>
                  <span className="sub-text">Delhi Branch</span>
                </div>
              </td>
              <td><span className="status-indicator"><span className="status-dot locked"></span> Locked</span></td>
              <td>2 days ago</td>
              <td>
                <div style={{display:'flex', gap:'0.5rem'}}>
                  <button className="btn-secondary" style={{padding:'0.3rem'}}><Edit size={16}/></button>
                  <button className="btn-secondary" style={{padding:'0.3rem', color:'#ef4444'}}><Lock size={16}/></button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderRoles = () => (
    <div className="um-view fade-in">
      <div className="um-header">
        <div>
          <h2 className="um-title">Role-Based Access Control (RBAC)</h2>
          <p className="um-subtitle">Define roles and set granular permissions for modules</p>
        </div>
        <button className="btn-primary rainbow-bg"><Plus size={16} /> Create Custom Role</button>
      </div>

      <div className="grid-4" style={{gridTemplateColumns: '250px 1fr'}}>
        <div className="um-section" style={{padding:'1rem'}}>
          <h4 style={{marginBottom:'1rem', paddingBottom:'0.5rem', borderBottom:'1px solid var(--border-color)'}}>Roles</h4>
          <ul style={{listStyle:'none', padding:0, display:'flex', flexDirection:'column', gap:'0.5rem'}}>
            <li style={{padding:'0.8rem', background:'var(--hover-bg)', borderRadius:'8px', cursor:'pointer', fontWeight:'bold'}}>System Admin</li>
            <li style={{padding:'0.8rem', borderRadius:'8px', cursor:'pointer'}}>Manager</li>
            <li style={{padding:'0.8rem', borderRadius:'8px', cursor:'pointer'}}>Accountant</li>
            <li style={{padding:'0.8rem', borderRadius:'8px', cursor:'pointer'}}>Salesperson</li>
            <li style={{padding:'0.8rem', borderRadius:'8px', cursor:'pointer'}}>Inventory Manager <span style={{fontSize:'0.7rem', background:'var(--border-color)', padding:'2px 5px', borderRadius:'4px', marginLeft:'5px'}}>Custom</span></li>
          </ul>
        </div>

        <div className="um-section">
          <div style={{display:'flex', justifyContent:'space-between', marginBottom:'1.5rem', alignItems:'center'}}>
            <h3>Permissions for: <span className="role-badge admin">System Admin</span></h3>
            <span className="sub-text">Full system access. Cannot be modified.</span>
          </div>

          <div style={{background:'var(--bg-color)', borderRadius:'12px', border:'1px solid var(--border-color)', padding:'1rem 1.5rem'}}>
            <div className="permission-grid" style={{fontWeight:'bold', color:'var(--text-secondary)'}}>
              <div>Module</div>
              <div style={{textAlign:'center'}}>View</div>
              <div style={{textAlign:'center'}}>Create</div>
              <div style={{textAlign:'center'}}>Edit</div>
              <div style={{textAlign:'center'}}>Delete</div>
              <div style={{textAlign:'center'}}>Approve</div>
            </div>

            <div className="permission-row">
              <div className="permission-grid">
                <strong>Customer Management</strong>
                <div style={{display:'flex', justifyContent:'center'}}><div className="toggle-switch on"></div></div>
                <div style={{display:'flex', justifyContent:'center'}}><div className="toggle-switch on"></div></div>
                <div style={{display:'flex', justifyContent:'center'}}><div className="toggle-switch on"></div></div>
                <div style={{display:'flex', justifyContent:'center'}}><div className="toggle-switch on"></div></div>
                <div style={{display:'flex', justifyContent:'center'}}><div className="toggle-switch on"></div></div>
              </div>
            </div>

            <div className="permission-row">
              <div className="permission-grid">
                <strong>Invoices & Billing</strong>
                <div style={{display:'flex', justifyContent:'center'}}><div className="toggle-switch on"></div></div>
                <div style={{display:'flex', justifyContent:'center'}}><div className="toggle-switch on"></div></div>
                <div style={{display:'flex', justifyContent:'center'}}><div className="toggle-switch on"></div></div>
                <div style={{display:'flex', justifyContent:'center'}}><div className="toggle-switch on"></div></div>
                <div style={{display:'flex', justifyContent:'center'}}><div className="toggle-switch on"></div></div>
              </div>
            </div>

            <div className="permission-row">
              <div className="permission-grid">
                <strong>Inventory Management</strong>
                <div style={{display:'flex', justifyContent:'center'}}><div className="toggle-switch on"></div></div>
                <div style={{display:'flex', justifyContent:'center'}}><div className="toggle-switch on"></div></div>
                <div style={{display:'flex', justifyContent:'center'}}><div className="toggle-switch on"></div></div>
                <div style={{display:'flex', justifyContent:'center'}}><div className="toggle-switch on"></div></div>
                <div style={{display:'flex', justifyContent:'center'}}><div className="toggle-switch on"></div></div>
              </div>
            </div>
            
             <div className="permission-row">
              <div className="permission-grid">
                <strong>System Settings</strong>
                <div style={{display:'flex', justifyContent:'center'}}><div className="toggle-switch on"></div></div>
                <div style={{display:'flex', justifyContent:'center'}}><div className="toggle-switch on"></div></div>
                <div style={{display:'flex', justifyContent:'center'}}><div className="toggle-switch on"></div></div>
                <div style={{display:'flex', justifyContent:'center'}}><div className="toggle-switch on"></div></div>
                <div style={{display:'flex', justifyContent:'center'}}><span className="sub-text">N/A</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSecurity = () => (
    <div className="um-view fade-in">
       <div className="um-header">
        <div>
          <h2 className="um-title">Security & Compliance</h2>
          <p className="um-subtitle">Manage authentication methods, 2FA, and password policies</p>
        </div>
      </div>

      <div className="grid-2">
        <div className="um-section">
          <h3>Authentication Methods</h3>
          <div style={{display:'flex', flexDirection:'column', gap:'1rem', marginTop:'1.5rem'}}>
            <div className="security-card">
              <div>
                <h4>Email + Password</h4>
                <p className="sub-text" style={{fontSize:'0.85rem'}}>Standard login method for all users</p>
              </div>
              <div className="toggle-switch on"></div>
            </div>
            <div className="security-card">
              <div>
                <h4>Two-Factor Authentication (2FA)</h4>
                <p className="sub-text" style={{fontSize:'0.85rem'}}>Require OTP via Authenticator App or SMS</p>
              </div>
              <div className="toggle-switch on"></div>
            </div>
            <div className="security-card">
              <div>
                <h4>Google Workspace SSO</h4>
                <p className="sub-text" style={{fontSize:'0.85rem'}}>Allow login with company Google accounts</p>
              </div>
              <div className="toggle-switch"></div>
            </div>
          </div>
        </div>

        <div className="um-section">
          <h3>Password & Session Policies</h3>
          <div style={{display:'flex', flexDirection:'column', gap:'1rem', marginTop:'1.5rem'}}>
            <div className="security-card" style={{flexDirection:'column', alignItems:'flex-start', gap:'1rem'}}>
              <div style={{width:'100%'}}>
                <label style={{fontSize:'0.9rem', fontWeight:'bold', display:'block', marginBottom:'0.5rem'}}>Minimum Password Length</label>
                <select style={{width:'100%', padding:'0.6rem', borderRadius:'8px', border:'1px solid var(--border-color)', background:'var(--bg-color)', color:'var(--text-primary)'}}>
                  <option>8 Characters</option>
                  <option selected>12 Characters (Recommended)</option>
                  <option>16 Characters</option>
                </select>
              </div>
              
              <div style={{display:'flex', gap:'1rem', width:'100%', flexWrap:'wrap'}}>
                <label style={{display:'flex', alignItems:'center', gap:'0.5rem', fontSize:'0.85rem'}}><input type="checkbox" checked /> Require Uppercase</label>
                <label style={{display:'flex', alignItems:'center', gap:'0.5rem', fontSize:'0.85rem'}}><input type="checkbox" checked /> Require Numbers</label>
                <label style={{display:'flex', alignItems:'center', gap:'0.5rem', fontSize:'0.85rem'}}><input type="checkbox" checked /> Require Special Chars</label>
              </div>
            </div>

            <div className="security-card">
              <div>
                <h4>Session Timeout</h4>
                <p className="sub-text" style={{fontSize:'0.85rem'}}>Auto-logout after inactivity</p>
              </div>
              <select style={{padding:'0.4rem', borderRadius:'6px', border:'1px solid var(--border-color)', background:'var(--bg-secondary)', color:'var(--text-primary)'}}>
                <option>15 Minutes</option>
                <option selected>30 Minutes</option>
                <option>1 Hour</option>
                <option>Never</option>
              </select>
            </div>
            
            <div className="security-card">
              <div>
                <h4>Account Lockout</h4>
                <p className="sub-text" style={{fontSize:'0.85rem'}}>Lock after 5 failed attempts</p>
              </div>
              <div className="toggle-switch on"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="user-management-wrapper">
      {activeTab === 'dashboard' && (
        <div className="um-header" style={{paddingBottom:0, borderBottom:'none', marginBottom:'1rem'}}>
          <button className="back-btn" onClick={onBack}>← Back to Home</button>
        </div>
      )}
      
      <div className="tabs-simple">
        <button className={`tab-simple ${activeTab === 'dashboard' ? 'active' : ''}`} onClick={() => setActiveTab('dashboard')}>Overview</button>
        <button className={`tab-simple ${activeTab === 'users' ? 'active' : ''}`} onClick={() => setActiveTab('users')}>Users</button>
        <button className={`tab-simple ${activeTab === 'roles' ? 'active' : ''}`} onClick={() => setActiveTab('roles')}>Roles & Permissions</button>
        <button className={`tab-simple ${activeTab === 'security' ? 'active' : ''}`} onClick={() => setActiveTab('security')}>Security & Authentication</button>
      </div>

      {activeTab === 'dashboard' && renderDashboard()}
      {activeTab === 'users' && renderUsers()}
      {activeTab === 'roles' && renderRoles()}
      {activeTab === 'security' && renderSecurity()}
    </div>
  );
}
