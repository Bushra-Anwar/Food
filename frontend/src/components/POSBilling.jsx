import React, { useState, useEffect } from 'react';
import { Search, ChevronDown, Share, FileText, Trash2, Save } from 'lucide-react';
import './POSBilling.css';

export default function POSBilling({ onBack }) {
  const [cartItems, setCartItems] = useState([]);
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currency, setCurrency] = useState('₹');
  
  const getExchangeRate = (curr) => {
    switch(curr) {
      case '₹': return 83.0; // 1 USD = 83 INR
      case '€': return 0.92; // 1 USD = 0.92 EUR
      case '£': return 0.79; // 1 USD = 0.79 GBP
      default: return 1.0;   // USD base
    }
  };

  const formatPrice = (amount) => {
    const rate = getExchangeRate(currency);
    const converted = amount * rate;
    return `${currency}${converted.toFixed(2)}`;
  };
  
  useEffect(() => {
    fetch('http://localhost:5000/api/products')
      .then(res => res.json())
      .then(data => {
        if (data.length > 0) {
          setProducts(data);
        } else {
          // Fallback dummy products if database is empty so UI is fully usable
          setProducts([
            { _id: '1', name: 'Amarnade AD', productId: 'Code-18', price: 38.00, stock: 20, status: 'Active', taxRate: '18%' },
            { _id: '2', name: 'Eagle Motor LEC', productId: 'Code-19', price: 12.00, stock: 5, status: 'Low Stock', taxRate: '12%' },
            { _id: '3', name: 'Producter 8Ba', productId: 'Code-20', price: 1.60, stock: 100, status: 'Active', taxRate: 'Tax Exempt' },
            { _id: '4', name: 'Bread Moner', productId: 'Code-21', price: 3.60, stock: 50, status: 'Active', taxRate: '5%' },
            { _id: '5', name: 'Premium Service', productId: 'SRV-01', price: 99.00, stock: 999, status: 'Active', taxRate: '18%' }
          ]);
        }
      })
      .catch(err => {
        console.error("Error fetching products:", err);
        // Fallback on error too
        setProducts([
          { _id: '1', name: 'Amarnade AD', productId: 'Code-18', price: 38.00, stock: 20, status: 'Active' },
          { _id: '2', name: 'Eagle Motor LEC', productId: 'Code-19', price: 12.00, stock: 5, status: 'Low Stock' },
          { _id: '3', name: 'Producter 8Ba', productId: 'Code-20', price: 1.60, stock: 100, status: 'Active' }
        ]);
      });
  }, []);

  const [fastAmount, setFastAmount] = useState(235.00);

  const calculateTotal = () => {
    return cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);
  };

  const handleReset = () => {
    setCartItems([]);
  };

  const addItemToCart = (product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item._id === product._id);
      if (existing) {
        return prev.map(item => item._id === product._id ? { ...item, qty: item.qty + 1 } : item);
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const totalAmount = calculateTotal();
  const charges = cartItems.length > 0 ? 2.00 : 0; 
  const finalTotal = totalAmount + charges;

  const handleCompleteSale = async () => {
    if (cartItems.length === 0) return alert('Cart is empty!');
    try {
      const res = await fetch('http://localhost:5000/api/invoices', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          invoiceNumber: `POS-${Date.now()}`,
          clientName: 'Walk-in Customer (POS)',
          amount: finalTotal,
          status: 'Paid',
          dueDate: new Date()
        })
      });
      if (res.ok) {
        alert('Sale Completed successfully! Invoice created in backend.');
        setCartItems([]);
      } else {
        alert('Failed to complete sale.');
      }
    } catch (error) {
      console.error(error);
      alert('Error connecting to backend.');
    }
  };

  const filteredProducts = products.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="pos-wrapper fade-in">
      <div className="pos-top-bar">
        <div style={{display: 'flex', alignItems: 'center', gap: '1rem'}}>
            <button className="pos-back-btn" onClick={onBack}>← Back</button>
            <h2 className="pos-main-title">Billing / POS</h2>
        </div>
        <div className="pos-top-actions">
          <select 
            value={currency} 
            onChange={(e) => setCurrency(e.target.value)}
            style={{ padding: '0.5rem', borderRadius: '8px', border: '1px solid #e0e5f2', background: 'white', color: '#1b2559', fontWeight: '600', cursor: 'pointer' }}
          >
            <option value="$">USD ($)</option>
            <option value="₹">INR (₹)</option>
            <option value="€">EUR (€)</option>
            <option value="£">GBP (£)</option>
          </select>
          <div className="pos-search-box">
            <span className="search-text">Search items</span>
            <ChevronDown size={16} />
          </div>
          <button className="pos-btn-share" onClick={() => alert('Sharing Invoice...')}>
            <Share size={16} /> Share All
          </button>
        </div>
      </div>

      <div className="pos-grid">
        {/* Left Column: Fast Checkout Controls */}
        <div className="pos-col pos-left-col">
          <div className="pos-left-header">
            <div>
              <p className="pos-label">Fast</p>
              <h3>{formatPrice(fastAmount)}</h3>
            </div>
            <div style={{textAlign: 'right'}}>
              <p className="pos-label">Checkout</p>
              <h3>{formatPrice(3.43)}</h3>
            </div>
          </div>

          <div className="pos-left-search">
            <Search size={16} className="search-icon" />
            <input type="text" placeholder="Search Products" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
            <ChevronDown size={16} className="dropdown-icon" />
          </div>

          <div className="pos-item-summary">
            <div>
              <p className="pos-label">Items Loaded</p>
              <h4>{products.length}</h4>
            </div>
            <div>
              <p className="pos-label">In Cart</p>
              <h4>{cartItems.reduce((sum, item) => sum + item.qty, 0)}</h4>
            </div>
            <div style={{textAlign: 'right'}}>
              <p className="pos-label">Value</p>
              <h4>{formatPrice(finalTotal)}</h4>
            </div>
          </div>

          <div className="pos-products-grid">
            {filteredProducts.slice(0, 8).map(product => (
              <button key={product._id} className="pos-grid-btn" onClick={() => addItemToCart(product)}>
                <span className="btn-lbl">{product.name.substring(0, 12)}</span>
                <span className="btn-val">{formatPrice(product.price || 0)}</span>
              </button>
            ))}
            {filteredProducts.length === 0 && <p style={{gridColumn:'1/-1', textAlign:'center', color:'#a3aed0'}}>No products found. Please add products in backend.</p>}
          </div>

          <div className="pos-bottom-actions">
            <div className="pos-action-row-1">
              <button className="pos-btn-large bg-gray" onClick={() => alert('Get: Retrieving Held Ticket...')}>Get</button>
              <button className="pos-btn-large bg-green text-white" onClick={handleReset}>Reset</button>
            </div>
            <div className="pos-action-row-2">
              <button className="pos-btn-small" onClick={() => alert('Next: Preparing for Next Customer...')}>
                <FileText size={14} /> Next
              </button>
              <button className="pos-btn-small bg-light-purple" onClick={handleReset}>
                <Trash2 size={14} /> Cancel
              </button>
              <button className="pos-btn-small bg-light-green" onClick={() => { alert('Sale Saved to Drafts!'); handleReset(); }}>
                <Save size={14} /> Save
              </button>
            </div>
          </div>
        </div>

        {/* Middle Column: Cart Items */}
        <div className="pos-col pos-mid-col">
          <div className="pos-mid-header">
            <div>
              <p className="pos-label">Final Items</p>
              <h3>{formatPrice(finalTotal)}</h3>
            </div>
            <div style={{textAlign: 'right'}}>
              <p className="pos-label">Current Total</p>
              <h3>{formatPrice(finalTotal)}</h3>
            </div>
          </div>

          <div className="pos-cart-header">
            <span>Name</span>
            <div className="pos-cart-header-right">
              <span>%</span>
              <span>Qty</span>
              <span>Amount</span>
            </div>
          </div>

          <div className="pos-cart-list">
            {cartItems.map(item => (
              <div key={item._id} className="pos-cart-item">
                <div className="pos-item-img-placeholder" style={{display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1.5rem'}}>{item.image || '📦'}</div>
                <div className="pos-item-details">
                  <h4>{item.name}</h4>
                  <p>{item.productId}</p>
                  <span className={`pos-stock-badge ${item.stock === 'Out of Stock' ? 'low' : 'in'}`}>{item.status || 'Active'}</span>
                </div>
                <div className="pos-item-stats">
                  <span>{(item.taxRate && item.taxRate !== 'Tax Exempt') ? 'Taxed' : '0%'}</span>
                  <span>{item.qty}</span>
                  <span>{formatPrice(item.price * item.qty)}</span>
                </div>
              </div>
            ))}
            {cartItems.length === 0 && <div style={{textAlign:'center', padding:'2rem', color:'#888'}}>Cart is empty</div>}
          </div>

          <div className="pos-mid-footer">
            <div className="pos-summary-row">
              <span>Subtotal</span>
              <strong>{formatPrice(totalAmount)}</strong>
            </div>
            <div className="pos-summary-row text-green">
              <span>Charges/Taxes</span>
              <strong>{formatPrice(charges)}</strong>
            </div>
            <div className="pos-summary-row">
              <span>Grand Total</span>
              <strong>{formatPrice(finalTotal)}</strong>
            </div>
            <button className="pos-btn-complete" onClick={handleCompleteSale}>
              Complete Sale
            </button>
          </div>
        </div>

        {/* Right Column: Receipt Preview */}
        <div className="pos-col pos-right-col">
          <div className="pos-receipt">
            <div className="receipt-header">
              <h3>RECEIPT</h3>
              <p>{new Date().toLocaleString('en-GB', { weekday: 'short', day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit', second: '2-digit', year: '2-digit' })}</p>
            </div>
            <div className="receipt-body">
              {cartItems.map(item => (
                <div key={item._id} className="receipt-row">
                  <span>{item.name} (x{item.qty})</span>
                  <span>{formatPrice(item.price * item.qty)}</span>
                </div>
              ))}
              
              <div className="receipt-divider"></div>
              
              <div className="receipt-row">
                <span>Total Items</span>
                <span>{cartItems.reduce((sum, item) => sum + item.qty, 0)}</span>
              </div>
              <div className="receipt-row">
                <span>Charges</span>
                <span>{formatPrice(charges)}</span>
              </div>

              <div className="receipt-divider"></div>
              
              <div className="receipt-total-row">
                <span>Subtotal</span>
                <span>{formatPrice(totalAmount)}</span>
              </div>
              <div className="receipt-grand-total">
                <span>Total</span>
                <span>{formatPrice(finalTotal)}</span>
              </div>

              <div className="receipt-barcode">
                {/* SVG Barcode mock */}
                <svg width="100%" height="40" preserveAspectRatio="none">
                  <rect x="10" y="0" width="4" height="40" fill="#000" />
                  <rect x="18" y="0" width="2" height="40" fill="#000" />
                  <rect x="24" y="0" width="6" height="40" fill="#000" />
                  <rect x="34" y="0" width="2" height="40" fill="#000" />
                  <rect x="40" y="0" width="8" height="40" fill="#000" />
                  <rect x="52" y="0" width="2" height="40" fill="#000" />
                  <rect x="58" y="0" width="4" height="40" fill="#000" />
                  <rect x="66" y="0" width="2" height="40" fill="#000" />
                  <rect x="72" y="0" width="6" height="40" fill="#000" />
                  <rect x="82" y="0" width="4" height="40" fill="#000" />
                  <rect x="90" y="0" width="2" height="40" fill="#000" />
                  <rect x="96" y="0" width="6" height="40" fill="#000" />
                  <rect x="106" y="0" width="4" height="40" fill="#000" />
                  <rect x="114" y="0" width="2" height="40" fill="#000" />
                  <rect x="120" y="0" width="8" height="40" fill="#000" />
                  <rect x="132" y="0" width="4" height="40" fill="#000" />
                  <rect x="140" y="0" width="2" height="40" fill="#000" />
                  <rect x="146" y="0" width="6" height="40" fill="#000" />
                  <rect x="156" y="0" width="2" height="40" fill="#000" />
                  <rect x="162" y="0" width="8" height="40" fill="#000" />
                  <rect x="174" y="0" width="4" height="40" fill="#000" />
                  <rect x="182" y="0" width="2" height="40" fill="#000" />
                  <rect x="188" y="0" width="4" height="40" fill="#000" />
                </svg>
                <p>Code: 2400938394</p>
              </div>
            </div>
            <div className="receipt-footer">
              <p>Professional UX/UI</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
