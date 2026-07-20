const fs = require('fs');
const path = require('path');

const dir = __dirname;
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

const openCheckoutLogic = `
// GLOBAL CHECKOUT REDIRECT
if (typeof window !== 'undefined' && !window.location.pathname.includes('cart.html')) {
    window.openCheckout = function() {
        window.location.href = 'cart.html';
    };
}
`;

const dynamicRenderPath = path.join(dir, 'dynamic_render.js');
if (fs.existsSync(dynamicRenderPath)) {
    let content = fs.readFileSync(dynamicRenderPath, 'utf8');
    if (!content.includes('window.openCheckout = function()')) {
        fs.writeFileSync(dynamicRenderPath, content + '\n' + openCheckoutLogic);
        console.log('Added global openCheckout to dynamic_render.js');
    }
}

for (const file of files) {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');

    // Replace openProductModal logic
    // We want to inject a check for existing cart item
    
    if (content.includes('function openProductModal(name, desc, price, img) {')) {
        // Find the start of addBtn logic
        const addBtnStart = content.indexOf('const addBtn = document.getElementById(\'categoryAddBagBtn\');');
        if (addBtnStart !== -1) {
            // Find the end of addBtn logic (where generateSuggestions is called)
            const addBtnEnd = content.indexOf('generateSuggestions(name);', addBtnStart);
            if (addBtnEnd !== -1) {
                const newAddBtnLogic = `
        const addBtn = document.getElementById('categoryAddBagBtn');
        const textBtn = document.getElementById('categoryAddBagText');
        
        // CHECK IF IN CART
        let cartItems = [];
        try { cartItems = JSON.parse(localStorage.getItem('st_cart')) || []; } catch(e){}
        const existing = cartItems.find(i => i.name === name);
        
        if (addBtn) {
            if (existing) {
                addBtn.style.background = '#4CAF50';
                if(textBtn) textBtn.textContent = 'Added to Cart ✓ (' + existing.qty + ' in bag)';
            } else {
                addBtn.style.background = 'linear-gradient(90deg, #ff9054, #ff6c2c)';
                if(textBtn) textBtn.textContent = 'Add to Cart';
            }
            
            addBtn.onclick = () => { 
                if(typeof addToCart === 'function') addToCart(name, price, img, currentModalQty); 
                if(typeof showToast === 'function') showToast('Added ' + currentModalQty + 'x ' + name + ' to bag!');
                
                // Color change logic
                addBtn.style.background = '#4CAF50';
                if(textBtn) textBtn.textContent = 'Added to Cart ✓';
                
                setTimeout(() => {
                    document.getElementById('categoryDetailModal').classList.remove('show');
                    document.getElementById('overlay').classList.remove('show');
                    
                    const sidebar = document.getElementById('cartSidebar');
                    const over = document.getElementById('overlay');
                    if(sidebar) sidebar.classList.add('open');
                    if(over) over.classList.add('show');
                }, 800);
            };
        }
        
        `;
                const before = content.substring(0, addBtnStart);
                const after = content.substring(addBtnEnd);
                content = before + newAddBtnLogic + after;
                fs.writeFileSync(filePath, content);
                console.log('Updated openProductModal in', file);
            }
        }
    }
}
