import React, { useState } from 'react';
import {
  BarChart2, PieChart, TrendingUp, Calendar,
  DollarSign, Users, ShoppingBag, MapPin,
  Download, FileText, FileSpreadsheet, Mail, Share2, Target, Percent
} from 'lucide-react';
import './ReportsAnalytics.css';

export default function ReportsAnalytics({ onBack }) {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [salesView, setSalesView] = useState('monthly'); // daily, weekly, monthly, yearly

  const renderExportActions = () => (
    <div className="export-group">
      <button className="export-btn" title="Export as PDF"><FileText size={16} /> PDF</button>
      <button className="export-btn" title="Export as CSV"><FileSpreadsheet size={16} /> CSV</button>
      <button className="export-btn" title="Email Report"><Mail size={16} /></button>
    </div>
  );

  const renderDashboard = () => (
    <div className="ra-view fade-in">
      <div className="ra-header">
        <div>
          <button className="back-btn" onClick={onBack}>← Back to Home</button>
          <h2 className="ra-title">Dashboard Analytics</h2>
          <p className="ra-subtitle">Real-time overview of your business performance</p>
        </div>
        {renderExportActions()}
      </div>

      <div className="grid-4">
        <div className="metric-card highlight">
          <div className="metric-icon bg-purple"><DollarSign size={24} /></div>
          <div className="metric-info">
            <h4>Today's Sales</h4>
            <div className="metric-value">₹45,200</div>
            <div className="metric-trend positive">↑ 12% vs yesterday</div>
          </div>
        </div>
        <div className="metric-card">
          <div className="metric-icon bg-blue"><Calendar size={24} /></div>
          <div className="metric-info">
            <h4>Monthly Sales</h4>
            <div className="metric-value">₹9,25,000</div>
            <div className="metric-trend positive">↑ 8% vs last month</div>
          </div>
        </div>
        <div className="metric-card">
          <div className="metric-icon bg-green"><TrendingUp size={24} /></div>
          <div className="metric-info">
            <h4>Net Profit (YTD)</h4>
            <div className="metric-value">₹4,12,000</div>
            <div className="metric-trend positive">Margin: 32%</div>
          </div>
        </div>
        <div className="metric-card">
          <div className="metric-icon bg-orange"><Target size={24} /></div>
          <div className="metric-info">
            <h4>Outstanding</h4>
            <div className="metric-value text-orange">₹1,15,000</div>
            <div className="metric-trend negative">From 24 invoices</div>
          </div>
        </div>
      </div>

      <div className="grid-2">
        <div className="ra-section">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3>Sales Trend (Last 6 Months)</h3>
            <button className="btn-secondary" style={{ padding: '0.2rem 0.5rem', fontSize: '0.8rem' }}>View Details</button>
          </div>
          <div className="chart-placeholder">
            <div className="chart-bar" style={{ height: '40%' }} data-value="₹4L"></div>
            <div className="chart-bar" style={{ height: '55%' }} data-value="₹5.5L"></div>
            <div className="chart-bar" style={{ height: '45%' }} data-value="₹4.5L"></div>
            <div className="chart-bar" style={{ height: '70%' }} data-value="₹7L"></div>
            <div className="chart-bar" style={{ height: '85%' }} data-value="₹8.5L"></div>
            <div className="chart-bar" style={{ height: '92%' }} data-value="₹9.2L"></div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.8rem' }}>
            <span>Aug</span><span>Sep</span><span>Oct</span><span>Nov</span><span>Dec</span><span>Jan</span>
          </div>
        </div>

        <div className="ra-section">
          <h3>Real-Time Widgets</h3>
          <div className="grid-2" style={{ marginTop: '1.5rem' }}>
            <div style={{ background: 'var(--bg-color)', padding: '1rem', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
              <h4 style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Today's Orders</h4>
              <div style={{ fontSize: '1.8rem', fontWeight: 'bold' }}>18</div>
              <div style={{ fontSize: '0.85rem', color: '#10b981', marginTop: '0.25rem' }}>+3 since last hour</div>
            </div>
            <div style={{ background: 'var(--bg-color)', padding: '1rem', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
              <h4 style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Recent Invoices</h4>
              <div style={{ fontSize: '1.8rem', fontWeight: 'bold' }}>24</div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>4 pending payment</div>
            </div>
          </div>
          <div style={{ marginTop: '1.5rem' }}>
            <h4 style={{ marginBottom: '1rem' }}>Top Categories (Revenue)</h4>
            <div style={{ marginBottom: '0.8rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                <span>Electronics</span><span>₹35L (60%)</span>
              </div>
              <div className="progress-bar-bg"><div className="progress-bar-fill" style={{ width: '60%' }}></div></div>
            </div>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                <span>Furniture</span><span>₹10L (25%)</span>
              </div>
              <div className="progress-bar-bg"><div className="progress-bar-fill" style={{ width: '25%', background: '#3b82f6' }}></div></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSalesReports = () => (
    <div className="ra-view fade-in">
      <div className="ra-header">
        <div>
          <h2 className="ra-title">Sales Reports</h2>
          <p className="ra-subtitle">Track revenue across different time periods</p>
        </div>
        {renderExportActions()}
      </div>

      <div className="filter-bar">
        <select className="filter-select" value={salesView} onChange={(e) => setSalesView(e.target.value)}>
          <option value="daily">Daily Sales</option>
          <option value="weekly">Weekly Sales</option>
          <option value="monthly">Monthly Sales</option>
          <option value="yearly">Yearly Sales</option>
        </select>
        <select className="filter-select">
          <option>All Branches</option>
          <option>Main Branch</option>
        </select>
        <select className="filter-select">
          <option>All Categories</option>
          <option>Electronics</option>
        </select>
      </div>

      <div className="ra-section">
        {salesView === 'daily' && (
          <table className="ra-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Total Orders</th>
                <th>Tax (GST)</th>
                <th>Discounts</th>
                <th>Net Revenue</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>03-Jan-2026</td>
                <td>18</td>
                <td>₹4,271</td>
                <td>₹1,200</td>
                <td><strong>₹28,000</strong></td>
              </tr>
              <tr>
                <td>02-Jan-2026</td>
                <td>24</td>
                <td>₹4,881</td>
                <td>₹2,500</td>
                <td><strong>₹32,000</strong></td>
              </tr>
              <tr>
                <td>01-Jan-2026</td>
                <td>15</td>
                <td>₹3,813</td>
                <td>₹800</td>
                <td><strong>₹25,000</strong></td>
              </tr>
            </tbody>
          </table>
        )}

        {salesView === 'weekly' && (
          <table className="ra-table">
            <thead>
              <tr>
                <th>Week</th>
                <th>Total Orders</th>
                <th>Avg Order Value</th>
                <th>Profit</th>
                <th>Net Revenue</th>
                <th>Growth</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Week 2 (Jan 08 - Jan 14)</td>
                <td>145</td>
                <td>₹1,241</td>
                <td>₹45,000</td>
                <td><strong>₹1,80,000</strong></td>
                <td><span className="growth-badge positive">↑ 20%</span></td>
              </tr>
              <tr>
                <td>Week 1 (Jan 01 - Jan 07)</td>
                <td>120</td>
                <td>₹1,250</td>
                <td>₹38,000</td>
                <td><strong>₹1,50,000</strong></td>
                <td><span className="growth-badge negative">↓ 5%</span></td>
              </tr>
            </tbody>
          </table>
        )}

        {salesView === 'monthly' && (
          <table className="ra-table">
            <thead>
              <tr>
                <th>Month</th>
                <th>Orders</th>
                <th>Tax Collected</th>
                <th>Refunds</th>
                <th>Net Revenue</th>
                <th>Growth</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>February 2026</td>
                <td>680</td>
                <td>₹1,41,101</td>
                <td>₹12,000</td>
                <td><strong>₹9,25,000</strong></td>
                <td><span className="growth-badge positive">↑ 8.8%</span></td>
              </tr>
              <tr>
                <td>January 2026</td>
                <td>615</td>
                <td>₹1,29,661</td>
                <td>₹8,500</td>
                <td><strong>₹8,50,000</strong></td>
                <td><span className="growth-badge positive">↑ 12%</span></td>
              </tr>
            </tbody>
          </table>
        )}

        {salesView === 'yearly' && (
          <table className="ra-table">
            <thead>
              <tr>
                <th>Year</th>
                <th>Revenue</th>
                <th>Total Tax</th>
                <th>Expenses</th>
                <th>Net Income (Profit)</th>
                <th>Growth</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>2026 (YTD)</td>
                <td>₹1.8 Cr</td>
                <td>₹27.4 L</td>
                <td>₹45 L</td>
                <td><strong>₹1.07 Cr</strong></td>
                <td><span className="growth-badge positive">↑ 50%</span></td>
              </tr>
              <tr>
                <td>2025</td>
                <td>₹1.2 Cr</td>
                <td>₹18.3 L</td>
                <td>₹35 L</td>
                <td><strong>₹66.7 L</strong></td>
                <td><span className="growth-badge positive">↑ 120%</span></td>
              </tr>
            </tbody>
          </table>
        )}
      </div>
    </div>
  );

  const renderProductReports = () => (
    <div className="ra-view fade-in">
      <div className="ra-header">
        <div>
          <h2 className="ra-title">Product & Category Sales</h2>
          <p className="ra-subtitle">Analyze performance by product, category, and ranking</p>
        </div>
        {renderExportActions()}
      </div>

      <div className="grid-2">
        <div className="ra-section">
          <h3>Top Selling Products</h3>
          <table className="ra-table" style={{ marginTop: '1rem' }}>
            <thead>
              <tr>
                <th>Product</th>
                <th>Qty Sold</th>
                <th>Revenue</th>
                <th>Profit</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Laptop Pro X</td>
                <td>120</td>
                <td>₹72,00,000</td>
                <td style={{ color: '#10b981' }}>₹9,50,000</td>
              </tr>
              <tr>
                <td>Office Printer Z</td>
                <td>55</td>
                <td>₹11,00,000</td>
                <td style={{ color: '#10b981' }}>₹2,00,000</td>
              </tr>
              <tr>
                <td>Wireless Mouse</td>
                <td>450</td>
                <td>₹4,50,000</td>
                <td style={{ color: '#10b981' }}>₹1,80,000</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="ra-section">
          <h3>Slow Moving / Dead Stock</h3>
          <table className="ra-table" style={{ marginTop: '1rem' }}>
            <thead>
              <tr>
                <th>Product</th>
                <th>Stock left</th>
                <th>Last Sold</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Legacy VGA Cable</td>
                <td>85</td>
                <td>120 days ago</td>
                <td><button className="btn-secondary" style={{ padding: '0.2rem 0.5rem' }}>Discount</button></td>
              </tr>
              <tr>
                <td>Phone Case (Old Mod)</td>
                <td>120</td>
                <td>95 days ago</td>
                <td><button className="btn-secondary" style={{ padding: '0.2rem 0.5rem' }}>Clearance</button></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderCustomerReports = () => (
    <div className="ra-view fade-in">
      <div className="ra-header">
        <div>
          <h2 className="ra-title">Customer Analytics</h2>
          <p className="ra-subtitle">Analyze buying behavior, lifetime value, and outstanding dues</p>
        </div>
        {renderExportActions()}
      </div>

      <div className="ra-section">
        <h3>Customer-Wise Sales (Top Customers)</h3>
        <table className="ra-table" style={{ marginTop: '1rem' }}>
          <thead>
            <tr>
              <th>Customer Name</th>
              <th>Total Orders</th>
              <th>Avg Order Value</th>
              <th>Total Revenue</th>
              <th>Outstanding</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>ABC Traders</strong></td>
              <td>45</td>
              <td>₹26,666</td>
              <td>₹12,00,000</td>
              <td style={{ color: '#ef4444' }}>₹50,000</td>
            </tr>
            <tr>
              <td><strong>XYZ Pvt Ltd</strong></td>
              <td>25</td>
              <td>₹34,000</td>
              <td>₹8,50,000</td>
              <td style={{ color: '#ef4444' }}>₹20,000</td>
            </tr>
            <tr>
              <td><strong>Acme Corp</strong></td>
              <td>12</td>
              <td>₹45,833</td>
              <td>₹5,50,000</td>
              <td>₹0</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderPerformanceReports = () => (
    <div className="ra-view fade-in">
      <div className="ra-header">
        <div>
          <h2 className="ra-title">Performance Reports</h2>
          <p className="ra-subtitle">Track salesperson and branch-wise performance</p>
        </div>
        {renderExportActions()}
      </div>

      <div className="grid-2">
        <div className="ra-section">
          <h3>Salesperson Performance</h3>
          <table className="ra-table" style={{ marginTop: '1rem' }}>
            <thead>
              <tr>
                <th>Salesperson</th>
                <th>Orders Closed</th>
                <th>Revenue</th>
                <th>Commission</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Rahul Sharma</td>
                <td>42</td>
                <td>₹15,00,000</td>
                <td>₹75,000</td>
              </tr>
              <tr>
                <td>Amit Kumar</td>
                <td>38</td>
                <td>₹10,50,000</td>
                <td>₹52,500</td>
              </tr>
              <tr>
                <td>Priya Singh</td>
                <td>25</td>
                <td>₹8,20,000</td>
                <td>₹41,000</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="ra-section">
          <h3>Branch-Wise Sales</h3>
          <table className="ra-table" style={{ marginTop: '1rem' }}>
            <thead>
              <tr>
                <th>Branch</th>
                <th>Orders</th>
                <th>Revenue</th>
                <th>Profitability</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Main Branch (Delhi)</td>
                <td>450</td>
                <td>₹45,00,000</td>
                <td><span className="growth-badge positive">28% Margin</span></td>
              </tr>
              <tr>
                <td>Mumbai Hub</td>
                <td>280</td>
                <td>₹22,00,000</td>
                <td><span className="growth-badge positive">22% Margin</span></td>
              </tr>
              <tr>
                <td>Bangalore Store</td>
                <td>120</td>
                <td>₹12,00,000</td>
                <td><span className="growth-badge negative">14% Margin</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderTaxProfit = () => (
    <div className="ra-view fade-in">
      <div className="ra-header">
        <div>
          <h2 className="ra-title">Tax & Profitability</h2>
          <p className="ra-subtitle">Financial metrics, tax summaries, and gross/net profit</p>
        </div>
        {renderExportActions()}
      </div>

      <div className="grid-2">
        <div className="ra-section">
          <h3>Profitability Report (YTD)</h3>
          <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.1rem' }}>
              <span>Total Revenue</span>
              <strong>₹1,80,00,000</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
              <span>(-) Cost of Goods Sold (COGS)</span>
              <span>₹1,20,00,000</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.2rem', padding: '1rem 0', borderTop: '1px dashed var(--border-color)', borderBottom: '1px dashed var(--border-color)' }}>
              <span>Gross Profit</span>
              <strong style={{ color: '#10b981' }}>₹60,00,000</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
              <span>(-) Operating Expenses</span>
              <span>₹18,00,000</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.3rem', paddingTop: '1rem', borderTop: '2px solid var(--border-color)' }}>
              <span>Net Profit</span>
              <strong style={{ color: '#10b981' }}>₹42,00,000</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', background: 'var(--bg-color)', padding: '1rem', borderRadius: '8px', marginTop: '0.5rem' }}>
              <span>Net Profit Margin</span>
              <strong style={{ fontSize: '1.2rem' }}>23.3%</strong>
            </div>
          </div>
        </div>

        <div className="ra-section">
          <h3>Tax Sales Report (GST Summary)</h3>
          <table className="ra-table" style={{ marginTop: '1rem' }}>
            <thead>
              <tr>
                <th>Tax Component</th>
                <th>Taxable Value</th>
                <th>Tax Collected</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>CGST</td>
                <td>₹1,40,00,000</td>
                <td>₹12,60,000</td>
              </tr>
              <tr>
                <td>SGST</td>
                <td>₹1,40,00,000</td>
                <td>₹12,60,000</td>
              </tr>
              <tr>
                <td>IGST (Inter-state)</td>
                <td>₹40,00,000</td>
                <td>₹7,20,000</td>
              </tr>
              <tr style={{ background: 'var(--bg-color)', fontWeight: 'bold' }}>
                <td>Total GST Liability</td>
                <td>₹1,80,00,000</td>
                <td>₹32,40,000</td>
              </tr>
            </tbody>
          </table>
          <div style={{ marginTop: '1.5rem', padding: '1rem', background: 'rgba(16, 185, 129, 0.1)', border: '1px solid #10b981', borderRadius: '8px', color: '#10b981' }}>
            <h4 style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Percent size={16} /> Ready for GSTR-1 Filing</h4>
            <p style={{ fontSize: '0.85rem' }}>All B2B and B2C invoices have been verified for HSN/SAC codes.</p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="reports-analytics-wrapper">
      {activeTab === 'dashboard' && (
        <div className="ra-header" style={{ paddingBottom: 0, borderBottom: 'none', marginBottom: '1rem' }}>
          <button className="back-btn" onClick={onBack}>← Back to Home</button>
        </div>
      )}

      <div className="tabs-simple">
        <button className={`tab-simple ${activeTab === 'dashboard' ? 'active' : ''}`} onClick={() => setActiveTab('dashboard')}>Dashboard</button>
        <button className={`tab-simple ${activeTab === 'sales' ? 'active' : ''}`} onClick={() => setActiveTab('sales')}>Sales Reports</button>
        <button className={`tab-simple ${activeTab === 'product' ? 'active' : ''}`} onClick={() => setActiveTab('product')}>Product Sales</button>
        <button className={`tab-simple ${activeTab === 'customer' ? 'active' : ''}`} onClick={() => setActiveTab('customer')}>Customer Sales</button>
        <button className={`tab-simple ${activeTab === 'performance' ? 'active' : ''}`} onClick={() => setActiveTab('performance')}>Performance</button>
        <button className={`tab-simple ${activeTab === 'tax' ? 'active' : ''}`} onClick={() => setActiveTab('tax')}>Tax & Profit</button>
      </div>

      {activeTab === 'dashboard' && renderDashboard()}
      {activeTab === 'sales' && renderSalesReports()}
      {activeTab === 'product' && renderProductReports()}
      {activeTab === 'customer' && renderCustomerReports()}
      {activeTab === 'performance' && renderPerformanceReports()}
      {activeTab === 'tax' && renderTaxProfit()}
    </div>
  );
}
