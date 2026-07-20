const fs = require('fs');
const path = require('path');

const dir = __dirname;
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

const dynamicRenderPath = path.join(dir, 'dynamic_render.js');
if (fs.existsSync(dynamicRenderPath)) {
    let dynContent = fs.readFileSync(dynamicRenderPath, 'utf8');
    
    // Replace the addToCart definition
    // It currently starts with `if (typeof window.addToCart === 'undefined') {`
    // We want to force override it and add the smart check.
    
    // Find the block
    const blockStart = dynContent.indexOf("if (typeof window.addToCart === 'undefined') {");
    if (blockStart !== -1) {
        const blockEnd = dynContent.indexOf("window.renderGlobalCartSidebar = function() {");
        if (blockEnd !== -1) {
            const newBlock = `
    // GLOBAL CART LOGIC - SMART OVERRIDE
    window.addToCart = function(name, price, img, qty = 1, buttonEl = null) {
        // Prevent duplicate add if button says "Added"
        if (buttonEl && (buttonEl.textContent.includes('Added') || buttonEl.innerText.includes('Added'))) {
            if (typeof window.renderGlobalCartSidebar === 'function') window.renderGlobalCartSidebar();
            const sb = document.getElementById('cartSidebar');
            const ov = document.getElementById('overlay');
            if(sb) sb.classList.add('open');
            if(ov) ov.classList.add('show');
            return; // Stop here, do not add again
        }
        
        let cart = JSON.parse(localStorage.getItem('st_cart')) || [];
        const existing = cart.find(item => item.name === name);
        if (existing) {
            existing.qty += qty;
        } else {
            cart.push({ name, price, img, qty });
        }
        localStorage.setItem('st_cart', JSON.stringify(cart));
        
        if (buttonEl) {
            buttonEl.textContent = 'Added';
            buttonEl.style.background = '#4CAF50';
            buttonEl.style.color = '#fff';
            buttonEl.style.borderColor = '#4CAF50';
        }
        
        if (typeof updateCartHover === 'function') updateCartHover();
        if (typeof renderCartPage === 'function') renderCartPage();
        if (typeof window.updateCartButtons === 'function') window.updateCartButtons(); 
        if (typeof window.renderGlobalCartSidebar === 'function') window.renderGlobalCartSidebar(); 
    };

    `;
            dynContent = dynContent.substring(0, blockStart) + newBlock + dynContent.substring(blockEnd);
            fs.writeFileSync(dynamicRenderPath, dynContent);
            console.log('Updated dynamic_render.js with smart addToCart override.');
        }
    }
}


// Now update openProductModal in all HTML files
for (const file of files) {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');

    if (content.includes('function openProductModal(name, desc, price, img) {')) {
        const addBtnStart = content.indexOf('const addBtn = document.getElementById(\'categoryAddBagBtn\');');
        if (addBtnStart !== -1) {
            const addBtnEnd = content.indexOf('generateSuggestions(name);', addBtnStart);
            if (addBtnEnd !== -1) {
                const newAddBtnLogic = `
        const addBtn = document.getElementById('categoryAddBagBtn');
        const textBtn = document.getElementById('categoryAddBagText');
        
        let cartItems = [];
        try { cartItems = JSON.parse(localStorage.getItem('st_cart')) || []; } catch(e){}
        const existing = cartItems.find(i => i.name === name);
        
        if (addBtn) {
            if (existing) {
                addBtn.style.background = '#4CAF50';
                if(textBtn) textBtn.textContent = 'Added to Cart ✓ (' + existing.qty + ')';
            } else {
                addBtn.style.background = 'linear-gradient(90deg, #ff9054, #ff6c2c)';
                if(textBtn) textBtn.textContent = 'Add to Cart';
            }
            
            addBtn.onclick = () => { 
                let currentCart = [];
                try { currentCart = JSON.parse(localStorage.getItem('st_cart')) || []; } catch(e){}
                const itemInCart = currentCart.find(i => i.name === name);
                
                if (itemInCart) {
                    if (itemInCart.qty === currentModalQty) {
                        // Unchanged, just open cart
                    } else {
                        // User changed quantity via + / -, so UPDATE it!
                        itemInCart.qty = currentModalQty;
                        localStorage.setItem('st_cart', JSON.stringify(currentCart));
                        if(typeof showToast === 'function') showToast('Updated quantity to ' + currentModalQty + '!');
                        if (typeof window.renderGlobalCartSidebar === 'function') window.renderGlobalCartSidebar();
                        if (typeof updateCartUI === 'function') updateCartUI();
                    }
                } else {
                    // Not in cart, add it normally
                    if(typeof addToCart === 'function') addToCart(name, price, img, currentModalQty); 
                    if(typeof showToast === 'function') showToast('Added ' + currentModalQty + 'x ' + name + ' to bag!');
                }
                
                addBtn.style.background = '#4CAF50';
                if(textBtn) textBtn.textContent = 'Added to Cart ✓ (' + currentModalQty + ')';
                
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
                console.log('Updated smart openProductModal in', file);
            }
        }
    }
}
