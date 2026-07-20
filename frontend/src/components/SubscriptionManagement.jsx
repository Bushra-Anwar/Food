import React, { useState } from 'react';
import { 
  RefreshCw, Users, CreditCard, Activity, Calendar, 
  TrendingUp, TrendingDown, Tag, Clock, CheckCircle, 
  AlertCircle, Search, Filter, Plus, Edit, Settings
} from 'lucide-react';
import './SubscriptionManagement.css';

export default function SubscriptionManagement({ onBack }) {
  const [activeTab, setActiveTab] = useState('dashboard'); 

  const renderDashboard = () => (
    <div className="sm-view fade-in">
      <div className="sm-header">
        <div>
          <button className="back-btn" onClick={onBack}>← Back to Home</button>
          <h2 className="sm-title">Subscription Billing (SaaS)</h2>
          <p className="sm-subtitle">Manage recurring revenue, plans, renewals, and churn</p>
        </div>
        <button className="btn-primary rainbow-bg"><Plus size={16} /> New Subscription</button>
      </div>

      <div className="grid-4">
        <div className="metric-card">
          <div className="metric-icon bg-blue"><RefreshCw size={24}/></div>
          <div className="metric-info">
            <h4>MRR (Monthly)</h4>
            <div className="metric-value">₹8,45,000</div>
            <div className="metric-trend positive">ARR: ₹1.01 Cr</div>
          </div>
        </div>
        <div className="metric-card">
          <div className="metric-icon bg-green"><Users size={24}/></div>
          <div className="metric-info">
            <h4>Active Subscribers</h4>
            <div className="metric-value">1,240</div>
            <div className="metric-trend positive">+45 this month</div>
          </div>
        </div>
        <div className="metric-card">
          <div className="metric-icon" style={{background:'rgba(239, 68, 68, 0.1)', color:'#ef4444'}}><TrendingDown size={24}/></div>
          <div className="metric-info">
            <h4>Churn Rate</h4>
            <div className="metric-value text-orange">2.4%</div>
            <div className="metric-trend negative">-12 Subscriptions</div>
          </div>
        </div>
        <div className="metric-card">
          <div className="metric-icon bg-purple"><CreditCard size={24}/></div>
          <div className="metric-info">
            <h4>ARPU</h4>
            <div className="metric-value">₹681</div>
            <div className="metric-trend positive">Avg Revenue Per User</div>
          </div>
        </div>
      </div>

      <div className="grid-2">
        <div className="sm-section">
          <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'1.5rem'}}>
            <h3>Upcoming Renewals</h3>
            <button className="btn-secondary" style={{padding:'0.2rem 0.5rem', fontSize:'0.85rem'}}>Next 7 Days</button>
          </div>
          <table className="sm-table">
            <thead>
              <tr>
                <th>Customer</th>
                <th>Plan</th>
                <th>Renewal Date</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Global Tech</strong></td>
                <td>Pro (Annual)</td>
                <td><span style={{color:'#f59e0b'}}>Tomorrow</span></td>
                <td>₹ 29,999</td>
              </tr>
              <tr>
                <td><strong>Acme Corp</strong></td>
                <td>Enterprise</td>
                <td>Jan 05, 2026</td>
                <td>₹ 9,999</td>
              </tr>
              <tr>
                <td><strong>Sarah Jenkins</strong></td>
                <td>Starter</td>
                <td>Jan 06, 2026</td>
                <td>₹ 999</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="sm-section">
          <h3>Subscription Events & Dunning</h3>
          <div style={{marginTop:'1.5rem', display:'flex', flexDirection:'column', gap:'1rem'}}>
            <div style={{background:'var(--bg-color)', padding:'1rem', borderRadius:'8px', border:'1px solid var(--border-color)', display:'flex', alignItems:'center', gap:'1rem'}}>
              <div style={{color:'#10b981'}}><CheckCircle size={20}/></div>
              <div style={{flex:1}}>
                <strong>Upgrade (Prorated)</strong>
                <div className="sub-text">ABC Traders upgraded to Pro. Billed ₹1,500.</div>
              </div>
              <span className="sub-text" style={{fontSize:'0.8rem'}}>1 hr ago</span>
            </div>
            <div style={{background:'var(--bg-color)', padding:'1rem', borderRadius:'8px', border:'1px solid var(--border-color)', display:'flex', alignItems:'center', gap:'1rem'}}>
              <div style={{color:'#ef4444'}}><AlertCircle size={20}/></div>
              <div style={{flex:1}}>
                <strong>Payment Failed (Retry 1)</strong>
                <div className="sub-text">XYZ Ltd (Starter). Auto-retry in 3 days.</div>
              </div>
              <span className="sub-text" style={{fontSize:'0.8rem'}}>3 hrs ago</span>
            </div>
            <div style={{background:'var(--bg-color)', padding:'1rem', borderRadius:'8px', border:'1px solid var(--border-color)', display:'flex', alignItems:'center', gap:'1rem'}}>
              <div style={{color:'#3b82f6'}}><Activity size={20}/></div>
              <div style={{flex:1}}>
                <strong>Trial Conversion</strong>
                <div className="sub-text">Jane Doe converted to Starter Plan.</div>
              </div>
              <span className="sub-text" style={{fontSize:'0.8rem'}}>5 hrs ago</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSubscriptions = () => (
    <div className="sm-view fade-in">
       <div className="sm-header">
        <div>
          <h2 className="sm-title">Manage Subscriptions</h2>
          <p className="sm-subtitle">View lifecycle, active plans, trials, and past due accounts</p>
        </div>
        <button className="btn-primary rainbow-bg"><Plus size={16}/> Add Customer</button>
      </div>

      <div className="sm-section">
        <div style={{display:'flex', gap:'1rem', marginBottom:'1.5rem'}}>
          <div className="search-box" style={{background:'var(--bg-color)', border:'1px solid var(--border-color)', display:'flex', alignItems:'center', padding:'0.5rem 1rem', borderRadius:'8px', flex:1}}>
            <Search size={16} style={{marginRight:'0.5rem', color:'var(--text-secondary)'}}/>
            <input type="text" placeholder="Search customer, plan, or subscription ID..." style={{background:'transparent', border:'none', outline:'none', color:'var(--text-primary)', width:'100%'}} />
          </div>
          <select style={{padding:'0.8rem', borderRadius:'8px', border:'1px solid var(--border-color)', background:'var(--bg-color)', color:'var(--text-primary)'}}>
            <option>All Statuses</option>
            <option>Active</option>
            <option>Trial</option>
            <option>Past Due</option>
            <option>Cancelled</option>
          </select>
          <button className="btn-secondary" style={{padding:'0.8rem'}}><Filter size={16}/> Filter</button>
        </div>

        <table className="sm-table">
          <thead>
            <tr>
              <th>Customer</th>
              <th>Plan (Cycle)</th>
              <th>Status</th>
              <th>Next Billing</th>
              <th>MRR</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Acme Corp</strong><br/><span className="sub-text">SUB-9012</span></td>
              <td>Enterprise<br/><span className="sub-text">Monthly</span></td>
              <td><span className="status-badge active">Active</span></td>
              <td>Jan 05, 2026</td>
              <td>₹ 9,999</td>
              <td><button className="btn-secondary" style={{padding:'0.3rem 0.5rem'}}>Manage</button></td>
            </tr>
            <tr>
              <td><strong>Global Tech</strong><br/><span className="sub-text">SUB-8812</span></td>
              <td>Professional<br/><span className="sub-text">Annual</span></td>
              <td><span className="status-badge active">Active</span></td>
              <td>Jan 04, 2026</td>
              <td>₹ 2,500 <span className="sub-text" style={{fontSize:'0.7rem'}}>(Eqv)</span></td>
              <td><button className="btn-secondary" style={{padding:'0.3rem 0.5rem'}}>Manage</button></td>
            </tr>
            <tr>
              <td><strong>TechVision Ltd</strong><br/><span className="sub-text">SUB-7761</span></td>
              <td>Starter<br/><span className="sub-text">Monthly</span></td>
              <td><span className="status-badge pastdue">Past Due</span></td>
              <td>Dec 30, 2025</td>
              <td>₹ 999</td>
              <td><button className="btn-secondary" style={{padding:'0.3rem 0.5rem'}}>Retry</button></td>
            </tr>
            <tr>
              <td><strong>Jane Doe</strong><br/><span className="sub-text">SUB-9921</span></td>
              <td>Pro Trial<br/><span className="sub-text">14 Days</span></td>
              <td><span className="status-badge trial">Trial (3 days left)</span></td>
              <td>Jan 06, 2026</td>
              <td>-</td>
              <td><button className="btn-secondary" style={{padding:'0.3rem 0.5rem'}}>Manage</button></td>
            </tr>
            <tr>
              <td><strong>Old Client Co</strong><br/><span className="sub-text">SUB-4412</span></td>
              <td>Starter<br/><span className="sub-text">Monthly</span></td>
              <td><span className="status-badge cancelled">Cancelled</span></td>
              <td>-</td>
              <td>-</td>
              <td><button className="btn-secondary" style={{padding:'0.3rem 0.5rem'}}>Reactivate</button></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderPlans = () => (
    <div className="sm-view fade-in">
       <div className="sm-header">
        <div>
          <h2 className="sm-title">Subscription Plans</h2>
          <p className="sm-subtitle">Configure pricing tiers, limits, and billing cycles</p>
        </div>
        <button className="btn-primary rainbow-bg"><Plus size={16}/> Create Plan</button>
      </div>

      <div className="grid-3">
        <div className="plan-card">
          <div>
            <h3 style={{fontSize:'1.5rem'}}>Starter</h3>
            <div className="plan-price">₹999<span> / mo</span></div>
            <p className="sub-text" style={{marginBottom:'1rem'}}>Perfect for small businesses starting out.</p>
          </div>
          <ul className="plan-features">
            <li><CheckCircle size={16} color="#10b981"/> Up to 5 Users</li>
            <li><CheckCircle size={16} color="#10b981"/> 100 Invoices/mo</li>
            <li><CheckCircle size={16} color="#10b981"/> Basic Reports</li>
            <li><CheckCircle size={16} color="#10b981"/> Email Support</li>
          </ul>
          <div style={{display:'flex', gap:'0.5rem', marginTop:'1rem'}}>
            <button className="btn-secondary" style={{flex:1}}><Edit size={16}/></button>
            <button className="btn-primary" style={{flex:3}}>Manage Plan</button>
          </div>
        </div>

        <div className="plan-card" style={{borderColor:'#8b5cf6', boxShadow:'0 0 0 2px rgba(139, 92, 246, 0.2)'}}>
          <div style={{position:'absolute', top:'-12px', left:'50%', transform:'translateX(-50%)', background:'var(--rainbow-gradient)', color:'white', padding:'4px 12px', borderRadius:'12px', fontSize:'0.8rem', fontWeight:'bold'}}>MOST POPULAR</div>
          <div>
            <h3 style={{fontSize:'1.5rem'}}>Professional</h3>
            <div className="plan-price">₹2,999<span> / mo</span></div>
            <p className="sub-text" style={{marginBottom:'1rem'}}>Advanced features for growing teams.</p>
          </div>
          <ul className="plan-features">
            <li><CheckCircle size={16} color="#10b981"/> Up to 25 Users</li>
            <li><CheckCircle size={16} color="#10b981"/> Unlimited Invoices</li>
            <li><CheckCircle size={16} color="#10b981"/> Advanced Analytics</li>
            <li><CheckCircle size={16} color="#10b981"/> Automation Workflows</li>
            <li><CheckCircle size={16} color="#10b981"/> 24/7 Priority Support</li>
          </ul>
          <div style={{display:'flex', gap:'0.5rem', marginTop:'1rem'}}>
            <button className="btn-secondary" style={{flex:1}}><Edit size={16}/></button>
            <button className="btn-primary rainbow-bg" style={{flex:3}}>Manage Plan</button>
          </div>
        </div>

        <div className="plan-card">
          <div>
            <h3 style={{fontSize:'1.5rem'}}>Enterprise</h3>
            <div className="plan-price">₹9,999<span> / mo</span></div>
            <p className="sub-text" style={{marginBottom:'1rem'}}>Custom limits for large scale operations.</p>
          </div>
          <ul className="plan-features">
            <li><CheckCircle size={16} color="#10b981"/> Unlimited Users</li>
            <li><CheckCircle size={16} color="#10b981"/> Unlimited Everything</li>
            <li><CheckCircle size={16} color="#10b981"/> Dedicated Account Manager</li>
            <li><CheckCircle size={16} color="#10b981"/> Custom API Integrations</li>
            <li><CheckCircle size={16} color="#10b981"/> SSO & Advanced Security</li>
          </ul>
          <div style={{display:'flex', gap:'0.5rem', marginTop:'1rem'}}>
            <button className="btn-secondary" style={{flex:1}}><Edit size={16}/></button>
            <button className="btn-primary" style={{flex:3}}>Manage Plan</button>
          </div>
        </div>
      </div>
      
      <div className="sm-section" style={{marginTop:'1rem'}}>
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
          <div>
            <h3>Annual Billing Discount</h3>
            <p className="sub-text">Offer a global discount for yearly subscriptions.</p>
          </div>
          <div style={{display:'flex', alignItems:'center', gap:'1rem'}}>
            <span style={{fontWeight:'bold'}}>15% Off</span>
            <div className="toggle-switch on"></div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderCoupons = () => (
    <div className="sm-view fade-in">
       <div className="sm-header">
        <div>
          <h2 className="sm-title">Coupons & Promotions</h2>
          <p className="sm-subtitle">Manage discount codes, free months, and campaigns</p>
        </div>
        <button className="btn-primary rainbow-bg"><Plus size={16}/> Create Coupon</button>
      </div>

      <div className="grid-3">
        <div className="sm-section" style={{borderLeft:'4px solid #8b5cf6'}}>
          <div style={{display:'flex', justifyContent:'space-between'}}>
            <h3>SAVE20</h3>
            <span className="status-badge active">Active</span>
          </div>
          <p className="sub-text" style={{margin:'0.5rem 0'}}>20% Off (Duration: Forever)</p>
          <div style={{display:'flex', justifyContent:'space-between', marginTop:'1rem', fontSize:'0.9rem'}}>
            <span>Redemptions: <strong>142</strong> / ∞</span>
            <span>Applies to: <strong>All Plans</strong></span>
          </div>
        </div>

        <div className="sm-section" style={{borderLeft:'4px solid #10b981'}}>
          <div style={{display:'flex', justifyContent:'space-between'}}>
            <h3>WELCOME500</h3>
            <span className="status-badge active">Active</span>
          </div>
          <p className="sub-text" style={{margin:'0.5rem 0'}}>₹500 Off (Duration: First Month)</p>
          <div style={{display:'flex', justifyContent:'space-between', marginTop:'1rem', fontSize:'0.9rem'}}>
            <span>Redemptions: <strong>89</strong> / 500</span>
            <span>Applies to: <strong>New Users</strong></span>
          </div>
        </div>
        
        <div className="sm-section" style={{borderLeft:'4px solid #ef4444', opacity:0.7}}>
          <div style={{display:'flex', justifyContent:'space-between'}}>
            <h3>BFCM2025</h3>
            <span className="status-badge cancelled">Expired</span>
          </div>
          <p className="sub-text" style={{margin:'0.5rem 0'}}>30% Off (Duration: 6 Months)</p>
          <div style={{display:'flex', justifyContent:'space-between', marginTop:'1rem', fontSize:'0.9rem'}}>
            <span>Redemptions: <strong>412</strong></span>
            <span>Ended: <strong>Dec 01, 2025</strong></span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSettings = () => (
    <div className="sm-view fade-in">
       <div className="sm-header">
        <div>
          <h2 className="sm-title">Subscription Settings</h2>
          <p className="sm-subtitle">Configure auto-renewals, trials, proration, and dunning</p>
        </div>
      </div>

      <div className="grid-2">
        <div className="sm-section">
          <h3>Renewal & Dunning Logic</h3>
          <div style={{marginTop:'1.5rem'}}>
            <div className="setting-row">
              <div>
                <strong>Auto-Renew Subscriptions</strong>
                <div className="sub-text">Attempt payment on renewal date</div>
              </div>
              <div className="toggle-switch on"></div>
            </div>
            <div className="setting-row">
              <div>
                <strong>Smart Retry Logic (Dunning)</strong>
                <div className="sub-text">Retry failed payments on Days 3, 5, 7</div>
              </div>
              <div className="toggle-switch on"></div>
            </div>
            <div className="setting-row">
              <div>
                <strong>Grace Period</strong>
                <div className="sub-text">Days before Past Due suspension</div>
              </div>
              <select style={{padding:'0.4rem', borderRadius:'6px', border:'1px solid var(--border-color)', background:'var(--bg-color)', color:'var(--text-primary)'}}>
                <option>0 Days</option>
                <option>3 Days</option>
                <option selected>7 Days</option>
                <option>14 Days</option>
              </select>
            </div>
          </div>
        </div>

        <div className="sm-section">
          <h3>Proration & Trials</h3>
          <div style={{marginTop:'1.5rem'}}>
            <div className="setting-row">
              <div>
                <strong>Upgrade Proration</strong>
                <div className="sub-text">Charge difference immediately</div>
              </div>
              <div className="toggle-switch on"></div>
            </div>
            <div className="setting-row">
              <div>
                <strong>Downgrade Credit</strong>
                <div className="sub-text">Apply remaining value to next cycle</div>
              </div>
              <div className="toggle-switch on"></div>
            </div>
            <div className="setting-row">
              <div>
                <strong>Enable Free Trials</strong>
                <div className="sub-text">Allow users to test before paying</div>
              </div>
              <div className="toggle-switch on"></div>
            </div>
            <div className="setting-row" style={{borderBottom:'none'}}>
              <div>
                <strong>Default Trial Duration</strong>
              </div>
              <select style={{padding:'0.4rem', borderRadius:'6px', border:'1px solid var(--border-color)', background:'var(--bg-color)', color:'var(--text-primary)'}}>
                <option>7 Days</option>
                <option selected>14 Days</option>
                <option>30 Days</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="subscription-management-wrapper">
      {activeTab === 'dashboard' && (
        <div className="sm-header" style={{paddingBottom:0, borderBottom:'none', marginBottom:'1rem'}}>
          <button className="back-btn" onClick={onBack}>← Back to Home</button>
        </div>
      )}
      
      <div className="tabs-simple">
        <button className={`tab-simple ${activeTab === 'dashboard' ? 'active' : ''}`} onClick={() => setActiveTab('dashboard')}>Analytics & Dashboard</button>
        <button className={`tab-simple ${activeTab === 'subs' ? 'active' : ''}`} onClick={() => setActiveTab('subs')}>Subscriptions</button>
        <button className={`tab-simple ${activeTab === 'plans' ? 'active' : ''}`} onClick={() => setActiveTab('plans')}>Plans & Pricing</button>
        <button className={`tab-simple ${activeTab === 'coupons' ? 'active' : ''}`} onClick={() => setActiveTab('coupons')}>Coupons</button>
        <button className={`tab-simple ${activeTab === 'settings' ? 'active' : ''}`} onClick={() => setActiveTab('settings')}>Settings & Rules</button>
      </div>

      {activeTab === 'dashboard' && renderDashboard()}
      {activeTab === 'subs' && renderSubscriptions()}
      {activeTab === 'plans' && renderPlans()}
      {activeTab === 'coupons' && renderCoupons()}
      {activeTab === 'settings' && renderSettings()}
    </div>
  );
}
