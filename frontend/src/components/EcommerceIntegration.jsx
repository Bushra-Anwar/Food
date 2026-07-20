import React, { useState } from 'react';
import { 
  ShoppingCart, Package, CreditCard, Link2, Download, 
  TrendingUp, Users, Truck, RefreshCw, AlertCircle, Search, Filter, Plus
} from 'lucide-react';
import './EcommerceIntegration.css';

export default function EcommerceIntegration({ onBack }) {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderDashboard = () => (
    <div className="ei-view fade-in">
      <div className="ei-header">
        <div>
          <button className="back-btn" onClick={onBack}>← Back to Home</button>
          <h2 className="ei-title">E-commerce Integration</h2>
          <p className="ei-subtitle">Manage online orders, abandoned carts, payments, and shipments</p>
        </div>
        <button className="btn-primary rainbow-bg"><Plus size={16} /> Create Order</button>
      </div>

      <div className="grid-4">
        <div className="metric-card">
          <div className="metric-icon bg-blue"><ShoppingCart size={24}/></div>
          <div className="metric-info">
            <h4>Total Orders</h4>
            <div className="metric-value">1,425</div>
            <div className="metric-trend positive">+12% this week</div>
          </div>
        </div>
        <div className="metric-card">
          <div className="metric-icon bg-green"><TrendingUp size={24}/></div>
          <div className="metric-info">
            <h4>Sales Revenue</h4>
            <div className="metric-value">₹24.5L</div>
            <div className="metric-trend positive">Avg Order: ₹1,720</div>
          </div>
        </div>
        <div className="metric-card">
          <div className="metric-icon bg-orange"><Truck size={24}/></div>
          <div className="metric-info">
            <h4>Pending Shipments</h4>
            <div className="metric-value text-orange">42</div>
            <div className="metric-trend">Requires fulfillment</div>
          </div>
        </div>
        <div className="metric-card">
          <div className="metric-icon bg-purple"><RefreshCw size={24}/></div>
          <div className="metric-info">
            <h4>Returns / RMA</h4>
            <div className="metric-value">15</div>
            <div className="metric-trend negative">3 pending approval</div>
          </div>
        </div>
      </div>

      <div className="grid-2">
        <div className="ei-section">
          <h3>Recent Online Orders</h3>
          <table className="ei-table" style={{marginTop:'1.5rem'}}>
            <thead>
              <tr>
                <th>Order #</th>
                <th>Platform</th>
                <th>Total</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>#ORD-9021</strong><br/><span className="sub-text">10 mins ago</span></td>
                <td>Shopify</td>
                <td>₹4,500</td>
                <td><span className="status-badge warning">Processing</span></td>
              </tr>
              <tr>
                <td><strong>#ORD-9020</strong><br/><span className="sub-text">1 hour ago</span></td>
                <td>WooCommerce</td>
                <td>₹1,250</td>
                <td><span className="status-badge info">Shipped</span></td>
              </tr>
              <tr>
                <td><strong>#ORD-9019</strong><br/><span className="sub-text">2 hours ago</span></td>
                <td>Amazon</td>
                <td>₹8,990</td>
                <td><span className="status-badge success">Delivered</span></td>
              </tr>
            </tbody>
          </table>
          <button className="btn-secondary" style={{width:'100%', marginTop:'1rem'}} onClick={() => setActiveTab('orders')}>View All Orders</button>
        </div>

        <div className="ei-section">
          <h3>Sync Status & Automation</h3>
          <div style={{marginTop:'1.5rem', display:'flex', flexDirection:'column', gap:'1rem'}}>
            <div style={{background:'var(--bg-color)', padding:'1rem', borderRadius:'8px', border:'1px solid var(--border-color)', display:'flex', alignItems:'center', gap:'1rem'}}>
              <div style={{color:'#10b981'}}><Package size={20}/></div>
              <div style={{flex:1}}>
                <strong>Inventory Sync</strong>
                <div className="sub-text">Last synced 5 mins ago across 3 channels.</div>
              </div>
              <div className="toggle-switch on"></div>
            </div>
            
            <div style={{background:'var(--bg-color)', padding:'1rem', borderRadius:'8px', border:'1px solid var(--border-color)', display:'flex', alignItems:'center', gap:'1rem'}}>
              <div style={{color:'#3b82f6'}}><ShoppingCart size={20}/></div>
              <div style={{flex:1}}>
                <strong>Abandoned Cart Recovery</strong>
                <div className="sub-text">Auto-email sent after 4 hours of inactivity.</div>
              </div>
              <div className="toggle-switch on"></div>
            </div>

            <div style={{background:'var(--bg-color)', padding:'1rem', borderRadius:'8px', border:'1px solid var(--border-color)', display:'flex', alignItems:'center', gap:'1rem'}}>
              <div style={{color:'#ef4444'}}><AlertCircle size={20}/></div>
              <div style={{flex:1}}>
                <strong>Payment Verification</strong>
                <div className="sub-text">2 orders flagged for manual fraud review.</div>
              </div>
              <button className="btn-secondary" style={{padding:'0.3rem 0.5rem'}}>Review</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderOrders = () => (
    <div className="ei-view fade-in">
      <div className="ei-header">
        <div>
          <h2 className="ei-title">Order Management</h2>
          <p className="ei-subtitle">Track complete order lifecycle, generate invoices, and handle shipments</p>
        </div>
        <div style={{display:'flex', gap:'1rem'}}>
          <button className="btn-secondary"><Download size={16}/> Export</button>
          <button className="btn-primary rainbow-bg"><Plus size={16}/> Create Order</button>
        </div>
      </div>

      <div className="ei-section">
        <div style={{display:'flex', gap:'1rem', marginBottom:'1.5rem'}}>
          <div className="search-box" style={{background:'var(--bg-color)', border:'1px solid var(--border-color)', display:'flex', alignItems:'center', padding:'0.5rem 1rem', borderRadius:'8px', flex:1}}>
            <Search size={16} style={{marginRight:'0.5rem', color:'var(--text-secondary)'}}/>
            <input type="text" placeholder="Search Order ID, Customer, or Phone..." style={{background:'transparent', border:'none', outline:'none', color:'var(--text-primary)', width:'100%'}} />
          </div>
          <select style={{padding:'0.8rem', borderRadius:'8px', border:'1px solid var(--border-color)', background:'var(--bg-color)', color:'var(--text-primary)'}}>
            <option>All Statuses</option>
            <option>Processing</option>
            <option>Shipped</option>
            <option>Delivered</option>
            <option>Cancelled</option>
          </select>
        </div>

        <table className="ei-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Date</th>
              <th>Total</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>#ORD-9021</strong><br/><span className="sub-text">Shopify</span></td>
              <td>Jane Doe<br/><span className="sub-text">jane@example.com</span></td>
              <td>Today, 10:45 AM</td>
              <td>₹4,500</td>
              <td><span className="status-badge warning">Processing</span></td>
              <td><button className="btn-secondary" style={{padding:'0.3rem 0.5rem'}}>Fulfill</button></td>
            </tr>
            <tr>
              <td><strong>#ORD-9020</strong><br/><span className="sub-text">WooCommerce</span></td>
              <td>Rahul Sharma<br/><span className="sub-text">+91 9876543210</span></td>
              <td>Today, 09:30 AM</td>
              <td>₹1,250</td>
              <td><span className="status-badge info">Shipped</span></td>
              <td><button className="btn-secondary" style={{padding:'0.3rem 0.5rem'}}>Track</button></td>
            </tr>
            <tr>
              <td><strong>#ORD-9019</strong><br/><span className="sub-text">Amazon</span></td>
              <td>Acme Corp<br/><span className="sub-text">B2B Order</span></td>
              <td>Yesterday</td>
              <td>₹8,990</td>
              <td><span className="status-badge success">Delivered</span></td>
              <td><button className="btn-secondary" style={{padding:'0.3rem 0.5rem'}}>Invoice</button></td>
            </tr>
            <tr>
              <td><strong>#ORD-9018</strong><br/><span className="sub-text">Shopify</span></td>
              <td>Sarah Jenkins<br/><span className="sub-text">Guest</span></td>
              <td>Yesterday</td>
              <td>₹3,400</td>
              <td><span className="status-badge danger">Cancelled</span></td>
              <td><button className="btn-secondary" style={{padding:'0.3rem 0.5rem'}}>View</button></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderCarts = () => (
    <div className="ei-view fade-in">
      <div className="ei-header">
        <div>
          <h2 className="ei-title">Cart & Abandoned Recovery</h2>
          <p className="ei-subtitle">Monitor active shopping carts and automate recovery workflows</p>
        </div>
      </div>

      <div className="grid-2">
        <div className="ei-section">
          <h3>Abandoned Carts</h3>
          <table className="ei-table" style={{marginTop:'1.5rem'}}>
            <thead>
              <tr>
                <th>Customer</th>
                <th>Value</th>
                <th>Time Abandoned</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Amit Kumar</strong><br/><span className="sub-text">amit@abc.com</span></td>
                <td>₹12,500</td>
                <td>4 hours ago</td>
                <td><button className="btn-secondary" style={{padding:'0.2rem 0.5rem'}}>Send Email</button></td>
              </tr>
              <tr>
                <td><strong>Guest User</strong><br/><span className="sub-text">+91 9988776655</span></td>
                <td>₹3,200</td>
                <td>Yesterday</td>
                <td><button className="btn-secondary" style={{padding:'0.2rem 0.5rem'}}>Send SMS</button></td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="ei-section">
          <h3>Recovery Automation Rules</h3>
          <div style={{marginTop:'1.5rem', display:'flex', flexDirection:'column', gap:'1rem'}}>
            <div className="setting-row" style={{background:'var(--bg-color)', borderRadius:'8px', border:'1px solid var(--border-color)'}}>
              <div>
                <strong>Email Reminder 1</strong>
                <div className="sub-text">Send 4 hours after abandonment</div>
              </div>
              <div className="toggle-switch on"></div>
            </div>
            <div className="setting-row" style={{background:'var(--bg-color)', borderRadius:'8px', border:'1px solid var(--border-color)'}}>
              <div>
                <strong>WhatsApp Reminder + Discount</strong>
                <div className="sub-text">Send 24 hours after abandonment (10% OFF code)</div>
              </div>
              <div className="toggle-switch on"></div>
            </div>
            <div className="setting-row" style={{background:'var(--bg-color)', borderRadius:'8px', border:'1px solid var(--border-color)'}}>
              <div>
                <strong>Cross-Device Sync</strong>
                <div className="sub-text">Persist cart across user devices when logged in</div>
              </div>
              <div className="toggle-switch on"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPaymentsRefunds = () => (
    <div className="ei-view fade-in">
      <div className="ei-header">
        <div>
          <h2 className="ei-title">Payments & Refunds</h2>
          <p className="ei-subtitle">Manage payment gateways, transactions, and RMA processes</p>
        </div>
      </div>

      <div className="grid-2">
        <div className="ei-section">
          <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'1.5rem'}}>
            <h3>Payment Gateways</h3>
            <button className="btn-secondary" style={{padding:'0.2rem 0.5rem'}}><Plus size={16}/> Add New</button>
          </div>
          <div style={{display:'flex', flexDirection:'column', gap:'1rem'}}>
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', padding:'1rem', background:'var(--bg-color)', borderRadius:'8px', border:'1px solid var(--border-color)'}}>
              <div style={{display:'flex', alignItems:'center', gap:'1rem'}}>
                <div className="metric-icon" style={{background:'#0c2f54', color:'white', width:'40px', height:'40px', fontSize:'1rem', fontWeight:'bold'}}>R</div>
                <div>
                  <strong>Razorpay</strong>
                  <div className="sub-text">UPI, Cards, NetBanking (Active)</div>
                </div>
              </div>
              <div className="toggle-switch on"></div>
            </div>
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', padding:'1rem', background:'var(--bg-color)', borderRadius:'8px', border:'1px solid var(--border-color)'}}>
              <div style={{display:'flex', alignItems:'center', gap:'1rem'}}>
                <div className="metric-icon" style={{background:'#635bff', color:'white', width:'40px', height:'40px', fontSize:'1rem', fontWeight:'bold'}}>S</div>
                <div>
                  <strong>Stripe</strong>
                  <div className="sub-text">International Cards (Active)</div>
                </div>
              </div>
              <div className="toggle-switch on"></div>
            </div>
          </div>
        </div>

        <div className="ei-section">
          <h3>Refunds & Returns (RMA)</h3>
          <table className="ei-table" style={{marginTop:'1.5rem'}}>
            <thead>
              <tr>
                <th>Order / RMA</th>
                <th>Reason</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>#ORD-8812</strong><br/><span className="sub-text">₹2,500</span></td>
                <td>Damaged Product</td>
                <td><span className="status-badge warning">Requested</span></td>
                <td><button className="btn-secondary" style={{padding:'0.2rem 0.5rem'}}>Approve</button></td>
              </tr>
              <tr>
                <td><strong>#ORD-8799</strong><br/><span className="sub-text">₹1,200</span></td>
                <td>Late Delivery (Cancel)</td>
                <td><span className="status-badge success">Refunded</span></td>
                <td><button className="btn-secondary" style={{padding:'0.2rem 0.5rem'}}>View</button></td>
              </tr>
            </tbody>
          </table>
          
          <div style={{marginTop:'1.5rem', padding:'1rem', background:'var(--bg-color)', borderRadius:'8px', border:'1px solid var(--border-color)'}}>
             <div className="setting-row" style={{padding:'0', border:'none'}}>
              <div>
                <strong>Auto-Refund on Cancellation</strong>
                <div className="sub-text">Issue payment gateway refund instantly</div>
              </div>
              <div className="toggle-switch"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderShipping = () => (
    <div className="ei-view fade-in">
      <div className="ei-header">
        <div>
          <h2 className="ei-title">Shipping Management</h2>
          <p className="ei-subtitle">Courier integrations, tracking updates, and label generation</p>
        </div>
      </div>

      <div className="grid-2">
        <div className="ei-section">
          <h3>Courier Integrations</h3>
          <div style={{marginTop:'1.5rem', display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1rem'}}>
            <div className="integration-card" style={{borderColor:'#8b5cf6'}}>
              <div className="integration-logo" style={{background:'#1e1e1e'}}>SR</div>
              <h4>Shiprocket</h4>
              <p className="sub-text" style={{margin:'0.5rem 0'}}>Aggregator (Connected)</p>
              <button className="btn-secondary" style={{marginTop:'auto'}}>Settings</button>
            </div>
            <div className="integration-card">
              <div className="integration-logo" style={{background:'#e31837'}}>DEL</div>
              <h4>Delhivery</h4>
              <p className="sub-text" style={{margin:'0.5rem 0'}}>Direct API (Not Configured)</p>
              <button className="btn-secondary" style={{marginTop:'auto'}}>Connect</button>
            </div>
          </div>

          <h3 style={{marginTop:'2rem'}}>Shipping Rules</h3>
          <div style={{marginTop:'1rem', display:'flex', flexDirection:'column', gap:'1rem'}}>
             <div className="setting-row" style={{background:'var(--bg-color)', borderRadius:'8px', border:'1px solid var(--border-color)'}}>
              <div>
                <strong>Free Shipping Eligibility</strong>
                <div className="sub-text">Orders over ₹1,000</div>
              </div>
              <button className="btn-secondary" style={{padding:'0.3rem 0.5rem'}}>Edit Rule</button>
            </div>
            <div className="setting-row" style={{background:'var(--bg-color)', borderRadius:'8px', border:'1px solid var(--border-color)'}}>
              <div>
                <strong>Flat Rate (Standard)</strong>
                <div className="sub-text">₹50 across all zones</div>
              </div>
              <button className="btn-secondary" style={{padding:'0.3rem 0.5rem'}}>Edit Rule</button>
            </div>
          </div>
        </div>

        <div className="ei-section">
          <h3>Pending Shipments</h3>
          <table className="ei-table" style={{marginTop:'1.5rem'}}>
            <thead>
              <tr>
                <th>Order</th>
                <th>Method</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>#ORD-9021</strong><br/><span className="sub-text">Delhi, IN (0.5kg)</span></td>
                <td>Standard</td>
                <td>
                  <button className="btn-primary" style={{padding:'0.3rem 0.5rem', fontSize:'0.8rem'}}>Generate Label</button>
                </td>
              </tr>
              <tr>
                <td><strong>#ORD-9022</strong><br/><span className="sub-text">Mumbai, IN (1.2kg)</span></td>
                <td>Express</td>
                <td>
                  <button className="btn-primary" style={{padding:'0.3rem 0.5rem', fontSize:'0.8rem'}}>Generate Label</button>
                </td>
              </tr>
              <tr>
                <td><strong>#ORD-9015</strong><br/><span className="sub-text">Local Pickup</span></td>
                <td>Store Pickup</td>
                <td>
                  <button className="btn-secondary" style={{padding:'0.3rem 0.5rem', fontSize:'0.8rem'}}>Mark Ready</button>
                </td>
              </tr>
            </tbody>
          </table>
          
          <div style={{marginTop:'2rem', padding:'1rem', background:'var(--bg-color)', borderRadius:'8px', border:'1px solid var(--border-color)'}}>
             <div className="setting-row" style={{padding:'0', border:'none'}}>
              <div>
                <strong>Auto-Notify Customers</strong>
                <div className="sub-text">Send SMS/Email when tracking updates</div>
              </div>
              <div className="toggle-switch on"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderMarketplaces = () => (
    <div className="ei-view fade-in">
      <div className="ei-header">
        <div>
          <h2 className="ei-title">Marketplaces & Sync</h2>
          <p className="ei-subtitle">Connect your catalogs and inventory across multiple sales channels</p>
        </div>
      </div>

      <div className="grid-4">
        <div className="integration-card" style={{borderColor:'#8b5cf6'}}>
          <div className="integration-logo" style={{background:'#96bf48'}}>S</div>
          <h4>Shopify</h4>
          <span className="status-badge success" style={{margin:'0.5rem 0'}}>Connected</span>
          <button className="btn-secondary" style={{marginTop:'auto', width:'100%'}}>Manage Sync</button>
        </div>
        <div className="integration-card" style={{borderColor:'#8b5cf6'}}>
          <div className="integration-logo" style={{background:'#7b519d'}}>W</div>
          <h4>WooCommerce</h4>
          <span className="status-badge success" style={{margin:'0.5rem 0'}}>Connected</span>
          <button className="btn-secondary" style={{marginTop:'auto', width:'100%'}}>Manage Sync</button>
        </div>
        <div className="integration-card">
          <div className="integration-logo" style={{background:'#ff9900'}}>A</div>
          <h4>Amazon</h4>
          <span className="status-badge warning" style={{margin:'0.5rem 0'}}>Action Required</span>
          <button className="btn-secondary" style={{marginTop:'auto', width:'100%'}}>Authenticate API</button>
        </div>
        <div className="integration-card">
          <div className="integration-logo" style={{background:'#047bd5'}}>F</div>
          <h4>Flipkart</h4>
          <span className="status-badge info" style={{margin:'0.5rem 0'}}>Not Connected</span>
          <button className="btn-secondary" style={{marginTop:'auto', width:'100%'}}>Connect</button>
        </div>
      </div>

      <div className="ei-section">
        <h3>Global Synchronization Settings</h3>
        <div style={{marginTop:'1.5rem', display:'grid', gridTemplateColumns:'1fr 1fr', gap:'2rem'}}>
          <div style={{display:'flex', flexDirection:'column', gap:'1rem'}}>
             <div className="setting-row" style={{background:'var(--bg-color)', borderRadius:'8px', border:'1px solid var(--border-color)'}}>
              <div>
                <strong>Real-Time Inventory Sync</strong>
                <div className="sub-text">Update stock on all channels instantly</div>
              </div>
              <div className="toggle-switch on"></div>
            </div>
             <div className="setting-row" style={{background:'var(--bg-color)', borderRadius:'8px', border:'1px solid var(--border-color)'}}>
              <div>
                <strong>Price Syncing</strong>
                <div className="sub-text">Push price changes to all channels</div>
              </div>
              <div className="toggle-switch"></div>
            </div>
          </div>
          <div style={{display:'flex', flexDirection:'column', gap:'1rem'}}>
             <div className="setting-row" style={{background:'var(--bg-color)', borderRadius:'8px', border:'1px solid var(--border-color)'}}>
              <div>
                <strong>Order Import Automation</strong>
                <div className="sub-text">Auto-create invoices for marketplace orders</div>
              </div>
              <div className="toggle-switch on"></div>
            </div>
             <div className="setting-row" style={{background:'var(--bg-color)', borderRadius:'8px', border:'1px solid var(--border-color)'}}>
              <div>
                <strong>Stock Reservation</strong>
                <div className="sub-text">Reserve stock when items are added to cart</div>
              </div>
              <div className="toggle-switch on"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="ecommerce-integration-wrapper">
      {activeTab === 'dashboard' && (
        <div className="ei-header" style={{paddingBottom:0, borderBottom:'none', marginBottom:'1rem'}}>
          <button className="back-btn" onClick={onBack}>← Back to Home</button>
        </div>
      )}
      
      <div className="tabs-simple">
        <button className={`tab-simple ${activeTab === 'dashboard' ? 'active' : ''}`} onClick={() => setActiveTab('dashboard')}>Dashboard</button>
        <button className={`tab-simple ${activeTab === 'orders' ? 'active' : ''}`} onClick={() => setActiveTab('orders')}>Orders</button>
        <button className={`tab-simple ${activeTab === 'carts' ? 'active' : ''}`} onClick={() => setActiveTab('carts')}>Cart & Recovery</button>
        <button className={`tab-simple ${activeTab === 'payments' ? 'active' : ''}`} onClick={() => setActiveTab('payments')}>Payments & Refunds</button>
        <button className={`tab-simple ${activeTab === 'shipping' ? 'active' : ''}`} onClick={() => setActiveTab('shipping')}>Shipping</button>
        <button className={`tab-simple ${activeTab === 'marketplaces' ? 'active' : ''}`} onClick={() => setActiveTab('marketplaces')}>Marketplaces</button>
      </div>

      {activeTab === 'dashboard' && renderDashboard()}
      {activeTab === 'orders' && renderOrders()}
      {activeTab === 'carts' && renderCarts()}
      {activeTab === 'payments' && renderPaymentsRefunds()}
      {activeTab === 'shipping' && renderShipping()}
      {activeTab === 'marketplaces' && renderMarketplaces()}
    </div>
  );
}
