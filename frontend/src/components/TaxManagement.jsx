import React, { useState } from 'react';
import { 
  Percent, FileText, Download, Plus, Filter, Search, 
  Settings, CheckCircle, AlertTriangle, ShieldCheck, PieChart,
  Briefcase
} from 'lucide-react';
import './TaxManagement.css';

const MOCK_TAX_RATES = [
  { id: 'TX-001', name: 'GST 18%', type: 'GST', rate: 18, breakdown: 'CGST 9% + SGST 9%', status: 'Active' },
  { id: 'TX-002', name: 'IGST 18%', type: 'IGST', rate: 18, breakdown: 'IGST 18%', status: 'Active' },
  { id: 'TX-003', name: 'GST 12%', type: 'GST', rate: 12, breakdown: 'CGST 6% + SGST 6%', status: 'Active' },
  { id: 'TX-004', name: 'GST 5%', type: 'GST', rate: 5, breakdown: 'CGST 2.5% + SGST 2.5%', status: 'Active' },
  { id: 'TX-005', name: 'VAT 10%', type: 'VAT', rate: 10, breakdown: 'VAT 10%', status: 'Inactive' },
  { id: 'TX-006', name: 'Exempt', type: 'Exempt', rate: 0, breakdown: '0%', status: 'Active' },
];

const MOCK_HSN_CODES = [
  { code: '998311', desc: 'IT Services', type: 'SAC', defaultRate: 'GST 18%' },
  { code: '851830', desc: 'Headphones/Earphones', type: 'HSN', defaultRate: 'GST 18%' },
  { code: '940330', desc: 'Wooden Furniture', type: 'HSN', defaultRate: 'GST 12%' },
];

export default function TaxManagement({ onBack }) {
  const [activeView, setActiveView] = useState('dashboard'); // dashboard, rates, hsn, returns
  const [taxRates] = useState(MOCK_TAX_RATES);
  const [hsnCodes] = useState(MOCK_HSN_CODES);

  const renderDashboard = () => (
    <div className="tax-dashboard fade-in">
      <div className="tax-header">
        <div>
          <button className="back-btn" onClick={onBack}>← Back to Home</button>
          <h2 className="tax-title">Tax Management & Reports</h2>
          <p className="tax-subtitle">Manage GST/VAT rates, HSN codes, and file compliance returns</p>
        </div>
        <div className="header-actions">
          <button className="btn-secondary" onClick={() => setActiveView('rates')}><Settings size={18} /> Tax Settings</button>
          <button className="btn-primary rainbow-bg" onClick={() => setActiveView('returns')}>
            <FileText size={18} /> Generate GSTR Report
          </button>
        </div>
      </div>

      <div className="metrics-grid">
        <div className="metric-card">
          <div className="metric-icon bg-green"><Percent size={24} /></div>
          <div className="metric-info">
            <h4>Output Tax (Collected)</h4>
            <div className="metric-value">₹345,000</div>
            <div className="metric-trend positive">From 142 Invoices</div>
          </div>
        </div>
        <div className="metric-card">
          <div className="metric-icon bg-orange"><Briefcase size={24} /></div>
          <div className="metric-info">
            <h4>Input Tax Credit (ITC)</h4>
            <div className="metric-value">₹120,500</div>
            <div className="metric-trend">From 48 Purchases</div>
          </div>
        </div>
        <div className="metric-card">
          <div className="metric-icon bg-blue"><PieChart size={24} /></div>
          <div className="metric-info">
            <h4>Net Tax Payable</h4>
            <div className="metric-value text-blue">₹224,500</div>
            <div className="metric-trend">For Current Month (Mar 2026)</div>
          </div>
        </div>
        <div className="metric-card">
          <div className="metric-icon bg-red"><AlertTriangle size={24} /></div>
          <div className="metric-info">
            <h4>Pending Returns</h4>
            <div className="metric-value text-red">1</div>
            <div className="metric-trend negative">GSTR-3B Due in 3 days</div>
          </div>
        </div>
      </div>

      <div className="tax-section">
        <div className="section-header-row">
          <div className="tabs-simple">
            <button className="tab-simple active">Tax Liability Overview</button>
            <button className="tab-simple">Reverse Charge</button>
          </div>
          <div className="search-filter">
            <select className="period-select">
              <option>March 2026</option>
              <option>February 2026</option>
              <option>January 2026</option>
            </select>
            <button className="btn-secondary"><Download size={18} /> Export JSON</button>
          </div>
        </div>
        
        <div className="table-container">
          <table className="tax-table">
            <thead>
              <tr>
                <th>Tax Head</th>
                <th>Taxable Value</th>
                <th>Collected (Output)</th>
                <th>Paid (Input / ITC)</th>
                <th>Net Payable</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>CGST</strong></td>
                <td>₹950,000</td>
                <td className="text-green">₹85,500</td>
                <td className="text-orange">₹30,125</td>
                <td><strong>₹55,375</strong></td>
              </tr>
              <tr>
                <td><strong>SGST</strong></td>
                <td>₹950,000</td>
                <td className="text-green">₹85,500</td>
                <td className="text-orange">₹30,125</td>
                <td><strong>₹55,375</strong></td>
              </tr>
              <tr>
                <td><strong>IGST</strong></td>
                <td>₹966,666</td>
                <td className="text-green">₹174,000</td>
                <td className="text-orange">₹60,250</td>
                <td><strong>₹113,750</strong></td>
              </tr>
              <tr className="total-row">
                <td><strong>Total</strong></td>
                <td><strong>₹1,916,666</strong></td>
                <td className="text-green"><strong>₹345,000</strong></td>
                <td className="text-orange"><strong>₹120,500</strong></td>
                <td className="rainbow-text"><strong>₹224,500</strong></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderRates = () => (
    <div className="tax-rates-view fade-in">
      <div className="tax-header">
        <div>
          <button className="back-btn" onClick={() => setActiveView('dashboard')}>← Back to Tax Dashboard</button>
          <h2 className="tax-title">Tax Rates & HSN Codes</h2>
          <p className="tax-subtitle">Configure GST/VAT percentages and mapping</p>
        </div>
        <div className="header-actions">
          <button className="btn-secondary" onClick={() => setActiveView('hsn')}><Briefcase size={18} /> Manage HSN/SAC</button>
          <button className="btn-primary rainbow-bg"><Plus size={18} /> Add Tax Rate</button>
        </div>
      </div>

      <div className="tax-form-layout">
        <div className="tax-form-main">
          <div className="table-container">
            <table className="tax-table">
              <thead>
                <tr>
                  <th>Tax Name</th>
                  <th>Type</th>
                  <th>Total Rate (%)</th>
                  <th>Breakdown</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {taxRates.map(rate => (
                  <tr key={rate.id}>
                    <td><strong>{rate.name}</strong></td>
                    <td><span className="type-badge">{rate.type}</span></td>
                    <td>{rate.rate}%</td>
                    <td><span className="sub-text">{rate.breakdown}</span></td>
                    <td>
                      <span className={`status-badge ${rate.status.toLowerCase()}`}>{rate.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="tax-form-sidebar">
          <div className="info-card">
            <h3><ShieldCheck size={18} /> Tax Engine Rules</h3>
            <p className="sub-text mt-2">The system automatically determines if CGST/SGST or IGST should be applied based on:</p>
            <ul className="info-list mt-3">
              <li><strong>Intra-State:</strong> Place of supply matches your business state (Applies CGST + SGST)</li>
              <li><strong>Inter-State:</strong> Place of supply differs from your business state (Applies IGST)</li>
            </ul>
            <button className="btn-secondary w-full mt-4">Edit Business Address</button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderHSN = () => (
    <div className="tax-rates-view fade-in">
      <div className="tax-header">
        <div>
          <button className="back-btn" onClick={() => setActiveView('rates')}>← Back to Tax Rates</button>
          <h2 className="tax-title">HSN / SAC Codes</h2>
          <p className="tax-subtitle">Standardized classification codes for products and services</p>
        </div>
        <div className="header-actions">
          <button className="btn-primary rainbow-bg"><Plus size={18} /> Add Code</button>
        </div>
      </div>

      <div className="table-container">
        <table className="tax-table">
          <thead>
            <tr>
              <th>Code</th>
              <th>Type</th>
              <th>Description</th>
              <th>Default Tax Rate</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {hsnCodes.map(code => (
              <tr key={code.code}>
                <td><strong>{code.code}</strong></td>
                <td><span className="type-badge">{code.type}</span></td>
                <td>{code.desc}</td>
                <td><span className="badge-highlight">{code.defaultRate}</span></td>
                <td><button className="action-btn text-blue">Edit</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderReturns = () => (
    <div className="tax-returns-view fade-in">
      <div className="tax-header">
        <div>
          <button className="back-btn" onClick={() => setActiveView('dashboard')}>← Back to Tax Dashboard</button>
          <h2 className="tax-title">Compliance Reports</h2>
          <p className="tax-subtitle">Generate ready-to-upload GSTR-1 and GSTR-3B JSON/Excel files</p>
        </div>
        <div className="header-actions">
          <select className="large-select" style={{padding: '0.4rem 1rem'}}>
            <option>March 2026</option>
            <option>February 2026</option>
          </select>
        </div>
      </div>

      <div className="reports-grid">
        <div className="report-card">
          <div className="report-icon bg-blue"><FileText size={32} /></div>
          <h3>GSTR-1</h3>
          <p className="sub-text">Details of outward supplies of goods and services (Sales).</p>
          <div className="report-stats">
            <div><span>B2B Invoices:</span> <strong>42</strong></div>
            <div><span>B2C Invoices:</span> <strong>100</strong></div>
            <div><span>Credit Notes:</span> <strong>3</strong></div>
          </div>
          <div className="report-actions">
            <button className="btn-secondary"><Download size={16} /> Excel</button>
            <button className="btn-primary rainbow-bg"><Download size={16} /> JSON for Portal</button>
          </div>
        </div>

        <div className="report-card">
          <div className="report-icon bg-orange"><FileText size={32} /></div>
          <h3>GSTR-3B</h3>
          <p className="sub-text">Monthly self-declaration of outward supplies and ITC availed.</p>
          <div className="report-stats">
            <div><span>Total Tax:</span> <strong>₹345,000</strong></div>
            <div><span>Eligible ITC:</span> <strong>₹120,500</strong></div>
            <div><span>Payable:</span> <strong>₹224,500</strong></div>
          </div>
          <div className="report-actions">
            <button className="btn-secondary"><Download size={16} /> Summary PDF</button>
            <button className="btn-primary rainbow-bg"><CheckCircle size={16} /> Mark as Filed</button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="tax-management-wrapper">
      {/* Liquid Glass Animated Background */}
      <div className="glass-bg-animation">
        <div className="glass-orb orb-1"></div>
        <div className="glass-orb orb-2"></div>
        <div className="glass-orb orb-3"></div>
        <div className="glass-orb orb-4"></div>
      </div>

      <div className="tax-content-layer">
        {activeView === 'dashboard' && renderDashboard()}
        {activeView === 'rates' && renderRates()}
        {activeView === 'hsn' && renderHSN()}
        {activeView === 'returns' && renderReturns()}
      </div>
    </div>
  );
}
