import React, { useState } from 'react';
import { 
  Sparkles, TrendingUp, AlertTriangle, MessageSquare, 
  FileText, ShieldAlert, Zap, UploadCloud, PieChart, Send, Bot, BrainCircuit, Activity
} from 'lucide-react';
import './AIFeatures.css';

export default function AIFeatures({ onBack }) {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [chatInput, setChatInput] = useState('');
  
  const renderDashboard = () => (
    <div className="ai-view fade-in">
      <div className="ai-header">
        <div>
          <button className="back-btn" onClick={onBack}>← Back to Home</button>
          <h2 className="ai-title">AI Command Center</h2>
          <p className="ai-subtitle">Predictive analytics, forecasting, and automated intelligence</p>
        </div>
      </div>

      <div className="grid-4">
        <div className="metric-card">
          <div className="metric-icon bg-blue"><TrendingUp size={24}/></div>
          <div className="metric-info">
            <h4>Revenue Forecast (Next Mo)</h4>
            <div className="metric-value">₹11.75L</div>
            <div className="metric-trend positive">↑ 17.5% Predicted Growth</div>
          </div>
        </div>
        <div className="metric-card">
          <div className="metric-icon bg-green"><Activity size={24}/></div>
          <div className="metric-info">
            <h4>Cash Flow Prediction</h4>
            <div className="metric-value">Healthy</div>
            <div className="metric-trend positive">₹2.8L collections expected</div>
          </div>
        </div>
        <div className="metric-card">
          <div className="metric-icon bg-orange"><AlertTriangle size={24}/></div>
          <div className="metric-info">
            <h4>Fraud / Risk Alerts</h4>
            <div className="metric-value text-orange">2</div>
            <div className="metric-trend negative">Anomalies detected</div>
          </div>
        </div>
        <div className="metric-card">
          <div className="metric-icon bg-purple"><Sparkles size={24}/></div>
          <div className="metric-info">
            <h4>Auto-Categorized</h4>
            <div className="metric-value">94%</div>
            <div className="metric-trend">Expenses mapped by AI</div>
          </div>
        </div>
      </div>

      <div className="grid-2">
        <div className="ai-section">
          <h3><Sparkles size={18} style={{marginRight:'8px', display:'inline-block', verticalAlign:'middle'}}/> Executive Summary</h3>
          <div style={{marginTop:'1.5rem', display:'flex', flexDirection:'column', gap:'1rem', lineHeight:'1.6', fontSize:'0.95rem'}}>
            <div style={{background:'var(--bg-color)', padding:'1.5rem', borderRadius:'12px', border:'1px solid var(--border-color)'}}>
              <p style={{marginBottom:'1rem'}}><strong>Hello Admin, here is your AI summary for today:</strong></p>
              <ul style={{listStylePosition:'inside', margin:0, padding:0, display:'flex', flexDirection:'column', gap:'0.8rem'}}>
                <li>Revenue increased by <strong>12%</strong> compared to last month. The 'Pro Plan' is the fastest-growing segment.</li>
                <li>You have outstanding invoices totaling <strong>₹3,50,000</strong>. AI predicts ₹2,80,000 will be collected within the next 10 days based on customer payment habits.</li>
                <li><strong>Warning:</strong> Product XYZ is trending high and is forecasted to go out of stock in 7 days. Recommend reordering immediately.</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="ai-section">
          <h3>Smart Payment Reminders</h3>
          <p className="sub-text" style={{marginBottom:'1.5rem'}}>AI optimizes reminder timing based on customer behavior.</p>
          
          <table className="ai-table">
            <thead>
              <tr>
                <th>Customer</th>
                <th>Due Date</th>
                <th>AI Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Global Tech</strong><br/><span className="sub-text">Usually pays 2 days early</span></td>
                <td>Jan 15</td>
                <td><span className="status-badge info">Sent 3 days prior</span></td>
              </tr>
              <tr>
                <td><strong>Sarah Jenkins</strong><br/><span className="sub-text">Often pays late</span></td>
                <td>Jan 10</td>
                <td><span className="status-badge warning">Daily WhatsApp Ping</span></td>
              </tr>
              <tr>
                <td><strong>Acme Corp</strong><br/><span className="sub-text">Strict on-time payer</span></td>
                <td>Jan 20</td>
                <td><span className="status-badge success">Scheduled (Standard)</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderInvoicingOcr = () => (
    <div className="ai-view fade-in">
       <div className="ai-header">
        <div>
          <h2 className="ai-title">AI Invoice Generation & OCR</h2>
          <p className="ai-subtitle">Create invoices via Natural Language or extract data from documents</p>
        </div>
      </div>

      <div className="grid-2">
        <div className="ai-section">
          <h3>Natural Language Invoice</h3>
          <p className="sub-text" style={{marginBottom:'1.5rem'}}>Type or paste text to instantly generate a structured draft.</p>
          
          <div className="form-group">
            <textarea 
              rows="5" 
              defaultValue="Create an invoice for ABC Traders. Product: Laptop. Quantity: 5. Price: 50,000 INR each. Apply 18% GST."
              style={{lineHeight:'1.5'}}
            ></textarea>
          </div>
          <button className="btn-primary rainbow-bg ai-pulse" style={{width:'100%'}}><Sparkles size={16}/> Generate Draft Invoice</button>

          <div style={{marginTop:'2rem', background:'var(--bg-color)', padding:'1.5rem', borderRadius:'8px', border:'1px dashed #10b981'}}>
            <div style={{display:'flex', justifyContent:'space-between', marginBottom:'1rem'}}>
              <strong>AI Output Preview</strong>
              <span className="status-badge success">Generated</span>
            </div>
            <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'0.5rem', fontSize:'0.9rem'}}>
              <div>Customer: <strong>ABC Traders</strong></div>
              <div>Subtotal: <strong>₹2,50,000</strong></div>
              <div>Items: <strong>Laptop (x5)</strong></div>
              <div>GST (18%): <strong>₹45,000</strong></div>
            </div>
            <div style={{marginTop:'1rem', paddingTop:'1rem', borderTop:'1px solid var(--border-color)', textAlign:'right', fontWeight:'bold', fontSize:'1.1rem'}}>
              Total: ₹2,95,000
            </div>
          </div>
        </div>

        <div className="ai-section">
          <h3>Document Intelligence (OCR)</h3>
          <p className="sub-text" style={{marginBottom:'1.5rem'}}>Upload vendor bills or purchase orders to auto-extract data.</p>
          
          <div style={{border:'2px dashed var(--border-color)', borderRadius:'12px', padding:'3rem 1rem', textAlign:'center', cursor:'pointer', background:'var(--bg-color)'}}>
            <UploadCloud size={48} style={{margin:'0 auto 1rem auto', color:'#8b5cf6'}}/>
            <strong style={{fontSize:'1.1rem'}}>Upload PDF, Image, or Email</strong>
            <p className="sub-text" style={{marginTop:'0.5rem'}}>AI will extract Vendor, Items, Amounts, and Taxes</p>
          </div>

          <div style={{marginTop:'1.5rem'}}>
            <h4 style={{marginBottom:'1rem'}}>Recent Extractions</h4>
            <div style={{display:'flex', flexDirection:'column', gap:'1rem'}}>
              <div className="setting-row" style={{padding:'0', border:'none'}}>
                <div style={{display:'flex', alignItems:'center', gap:'1rem'}}>
                  <FileText size={20} color="#3b82f6"/>
                  <div>
                    <strong>AWS_Bill_Jan.pdf</strong>
                    <div className="sub-text">Vendor: Amazon Web Services | Total: $450</div>
                  </div>
                </div>
                <button className="btn-secondary" style={{padding:'0.3rem 0.5rem'}}>Convert to Expense</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderCategorization = () => (
    <div className="ai-view fade-in">
       <div className="ai-header">
        <div>
          <h2 className="ai-title">AI Expense Categorization</h2>
          <p className="ai-subtitle">Machine learning model auto-classifies your expenses</p>
        </div>
      </div>

      <div className="ai-section">
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'1.5rem'}}>
          <h3>Auto-Categorization Queue</h3>
          <div style={{display:'flex', alignItems:'center', gap:'0.5rem'}}>
            <span className="sub-text">Confidence Threshold: 85%</span>
            <div className="toggle-switch on"></div>
          </div>
        </div>

        <table className="ai-table">
          <thead>
            <tr>
              <th>Description / Vendor</th>
              <th>Amount</th>
              <th>AI Predicted Category</th>
              <th>Confidence</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Uber Ride - Airport</strong></td>
              <td>₹ 550</td>
              <td><span className="account-type-badge expense" style={{background:'rgba(59, 130, 246, 0.1)', color:'#3b82f6'}}>Travel Expense</span></td>
              <td><span style={{color:'#10b981'}}>98%</span></td>
              <td><button className="btn-secondary" style={{padding:'0.2rem 0.5rem'}}>Approve</button></td>
            </tr>
            <tr>
              <td><strong>Swiggy Business Lunch</strong></td>
              <td>₹ 1,240</td>
              <td><span className="account-type-badge expense" style={{background:'rgba(245, 158, 11, 0.1)', color:'#f59e0b'}}>Food & Meals</span></td>
              <td><span style={{color:'#10b981'}}>95%</span></td>
              <td><button className="btn-secondary" style={{padding:'0.2rem 0.5rem'}}>Approve</button></td>
            </tr>
            <tr>
              <td><strong>Facebook Ireland Ltd</strong></td>
              <td>₹ 15,000</td>
              <td><span className="account-type-badge expense" style={{background:'rgba(139, 92, 246, 0.1)', color:'#8b5cf6'}}>Marketing</span></td>
              <td><span style={{color:'#10b981'}}>92%</span></td>
              <td><button className="btn-secondary" style={{padding:'0.2rem 0.5rem'}}>Approve</button></td>
            </tr>
            <tr style={{background:'rgba(245, 158, 11, 0.05)'}}>
              <td><strong>Unknown POS Transaction</strong></td>
              <td>₹ 4,500</td>
              <td><span className="account-type-badge expense" style={{background:'rgba(239, 68, 68, 0.1)', color:'#ef4444'}}>Office Supplies?</span></td>
              <td><span style={{color:'#f59e0b'}}>64%</span></td>
              <td><button className="btn-primary" style={{padding:'0.2rem 0.5rem'}}>Manual Map</button></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderFraudRisk = () => (
    <div className="ai-view fade-in">
       <div className="ai-header">
        <div>
          <h2 className="ai-title">Fraud & Anomaly Detection</h2>
          <p className="ai-subtitle">AI monitors transactions to detect suspicious financial activities</p>
        </div>
      </div>

      <div className="grid-2">
        <div className="ai-section">
          <h3>Real-Time Alerts</h3>
          <p className="sub-text" style={{marginBottom:'1.5rem'}}>The system flags unusual patterns based on historical baseline data.</p>
          
          <div style={{display:'flex', flexDirection:'column', gap:'1rem'}}>
             <div style={{background:'var(--bg-color)', padding:'1rem', borderRadius:'8px', border:'1px solid #ef4444', borderLeft:'4px solid #ef4444'}}>
              <div style={{display:'flex', justifyContent:'space-between', marginBottom:'0.5rem'}}>
                <strong style={{display:'flex', alignItems:'center', gap:'0.5rem'}}><ShieldAlert size={16} color="#ef4444"/> Duplicate Invoice Warning</strong>
                <span className="status-badge danger">High Risk</span>
              </div>
              <p className="sub-text" style={{marginBottom:'1rem'}}>Invoice #INV-2026-042 and #INV-2026-043 have identical amounts (₹45,000) for the same customer created within 2 minutes.</p>
              <div style={{display:'flex', gap:'0.5rem'}}>
                <button className="btn-secondary" style={{padding:'0.3rem 0.5rem', flex:1}}>Review</button>
                <button className="btn-secondary" style={{padding:'0.3rem 0.5rem', flex:1}}>Dismiss</button>
              </div>
            </div>

             <div style={{background:'var(--bg-color)', padding:'1rem', borderRadius:'8px', border:'1px solid #f59e0b', borderLeft:'4px solid #f59e0b'}}>
              <div style={{display:'flex', justifyContent:'space-between', marginBottom:'0.5rem'}}>
                <strong style={{display:'flex', alignItems:'center', gap:'0.5rem'}}><AlertTriangle size={16} color="#f59e0b"/> Unusual Expense Amount</strong>
                <span className="status-badge warning">Medium Risk</span>
              </div>
              <p className="sub-text" style={{marginBottom:'1rem'}}>Expense EXP-099 for "Office Supplies" is ₹1.5L. This is 400% higher than your average monthly spend in this category.</p>
              <div style={{display:'flex', gap:'0.5rem'}}>
                <button className="btn-secondary" style={{padding:'0.3rem 0.5rem', flex:1}}>Review</button>
                <button className="btn-secondary" style={{padding:'0.3rem 0.5rem', flex:1}}>Dismiss</button>
              </div>
            </div>
          </div>
        </div>

        <div className="ai-section">
          <h3>Monitoring Settings</h3>
          <div style={{marginTop:'1.5rem', display:'flex', flexDirection:'column', gap:'1rem'}}>
            <div className="setting-row" style={{background:'var(--bg-color)', borderRadius:'8px', border:'1px solid var(--border-color)'}}>
              <div>
                <strong>Duplicate Detection (Invoices/Bills)</strong>
                <div className="sub-text">Scan for matching amounts and dates</div>
              </div>
              <div className="toggle-switch on"></div>
            </div>
            <div className="setting-row" style={{background:'var(--bg-color)', borderRadius:'8px', border:'1px solid var(--border-color)'}}>
              <div>
                <strong>Payment Fraud Checks</strong>
                <div className="sub-text">Flag multiple failed payment attempts</div>
              </div>
              <div className="toggle-switch on"></div>
            </div>
            <div className="setting-row" style={{background:'var(--bg-color)', borderRadius:'8px', border:'1px solid var(--border-color)'}}>
              <div>
                <strong>Vendor Verification</strong>
                <div className="sub-text">Flag payments to newly created, unverified vendors</div>
              </div>
              <div className="toggle-switch on"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderChatbot = () => (
    <div className="ai-view fade-in">
       <div className="ai-header">
        <div>
          <h2 className="ai-title">Business Insights Copilot</h2>
          <p className="ai-subtitle">Ask questions about your data in natural language</p>
        </div>
      </div>

      <div className="grid-2">
        <div className="chat-box">
          <div className="chat-messages">
            <div className="chat-msg ai">
              <div style={{display:'flex', alignItems:'center', gap:'0.5rem', marginBottom:'0.5rem', fontWeight:'bold', color:'#8b5cf6'}}>
                <Bot size={16}/> Copilot
              </div>
              Hello! I'm your AI business assistant. You can ask me about revenue, outstanding invoices, top customers, or inventory levels. How can I help you today?
            </div>
            <div className="chat-msg user">
              What was my total revenue last month, and who were the top 3 customers?
            </div>
            <div className="chat-msg ai">
              <div style={{display:'flex', alignItems:'center', gap:'0.5rem', marginBottom:'0.5rem', fontWeight:'bold', color:'#8b5cf6'}}>
                <Bot size={16}/> Copilot
              </div>
              Your total revenue last month was <strong>₹10,45,000</strong> (up 8% from the previous month).<br/><br/>
              Your top 3 customers were:<br/>
              1. <strong>Acme Corp</strong> (₹3,20,000)<br/>
              2. <strong>Global Tech</strong> (₹2,15,000)<br/>
              3. <strong>TechVision Ltd</strong> (₹1,80,000)<br/><br/>
              Would you like me to generate a detailed PDF report of this?
            </div>
          </div>
          <div className="chat-input-area">
            <input 
              type="text" 
              placeholder="Ask anything (e.g., Show overdue invoices above ₹50k...)" 
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
            />
            <button className="btn-primary rainbow-bg" style={{padding:'0 1rem'}}><Send size={18}/></button>
          </div>
        </div>

        <div className="ai-section">
          <h3>Suggested Queries</h3>
          <p className="sub-text" style={{marginBottom:'1.5rem'}}>Click to ask your Copilot instantly.</p>
          
          <div style={{display:'flex', flexDirection:'column', gap:'0.8rem'}}>
            <button className="btn-secondary" style={{justifyContent:'flex-start', padding:'0.8rem', textAlign:'left'}}>
              <BrainCircuit size={16} style={{marginRight:'10px', color:'#8b5cf6'}}/>
              "Which products are running low on stock?"
            </button>
            <button className="btn-secondary" style={{justifyContent:'flex-start', padding:'0.8rem', textAlign:'left'}}>
              <BrainCircuit size={16} style={{marginRight:'10px', color:'#8b5cf6'}}/>
              "How much GST do I need to pay this month?"
            </button>
            <button className="btn-secondary" style={{justifyContent:'flex-start', padding:'0.8rem', textAlign:'left'}}>
              <BrainCircuit size={16} style={{marginRight:'10px', color:'#8b5cf6'}}/>
              "Show me all overdue invoices for Global Tech."
            </button>
            <button className="btn-secondary" style={{justifyContent:'flex-start', padding:'0.8rem', textAlign:'left'}}>
              <BrainCircuit size={16} style={{marginRight:'10px', color:'#8b5cf6'}}/>
              "What is our projected churn rate for Q1?"
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="ai-features-wrapper">
      {activeTab === 'dashboard' && (
        <div className="ai-header" style={{paddingBottom:0, borderBottom:'none', marginBottom:'1rem'}}>
          <button className="back-btn" onClick={onBack}>← Back to Home</button>
        </div>
      )}
      
      <div className="tabs-simple">
        <button className={`tab-simple ${activeTab === 'dashboard' ? 'active' : ''}`} onClick={() => setActiveTab('dashboard')}>AI Command Center</button>
        <button className={`tab-simple ${activeTab === 'invoicing' ? 'active' : ''}`} onClick={() => setActiveTab('invoicing')}>Invoicing & OCR</button>
        <button className={`tab-simple ${activeTab === 'categorization' ? 'active' : ''}`} onClick={() => setActiveTab('categorization')}>Expense Categorization</button>
        <button className={`tab-simple ${activeTab === 'fraud' ? 'active' : ''}`} onClick={() => setActiveTab('fraud')}>Fraud & Risk Alerts</button>
        <button className={`tab-simple ${activeTab === 'chatbot' ? 'active' : ''}`} onClick={() => setActiveTab('chatbot')}>Business Copilot</button>
      </div>

      {activeTab === 'dashboard' && renderDashboard()}
      {activeTab === 'invoicing' && renderInvoicingOcr()}
      {activeTab === 'categorization' && renderCategorization()}
      {activeTab === 'fraud' && renderFraudRisk()}
      {activeTab === 'chatbot' && renderChatbot()}
    </div>
  );
}
