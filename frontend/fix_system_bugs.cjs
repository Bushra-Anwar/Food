const fs = require('fs');
const path = require('path');

const dir = __dirname;
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

// Old wishlist toggle logic
const oldWishlistToggleRegex = /function toggleWishlist\([^\)]+\)\s*\{[\s\S]*?icon\.classList\.remove\('fa-solid'\);[\s\S]*?\}/;

// New wishlist toggle logic
const newWishlistToggle = `function toggleWishlist(btn) {
        if (btn.getAttribute('data-wished') !== 'true') {
            btn.innerHTML = '<i class="fa-solid fa-heart"></i>';
            btn.style.background = '#ff9054';
            btn.style.color = '#fff';
            btn.setAttribute('data-wished', 'true');
            if(typeof showToast === 'function') showToast('Added to Wishlist!');
        } else {
            btn.innerHTML = '<i class="fa-regular fa-heart"></i>';
            btn.style.background = 'transparent';
            btn.style.color = '#ff9054';
            btn.setAttribute('data-wished', 'false');
            if(typeof showToast === 'function') showToast('Removed from Wishlist');
        }
    }`;

// Fallback image fixes for generateSuggestions
const localIcedCoffee = /iced_coffee_splash_[0-9]+\.png/g;
const localStrawberry = /strawberry_splash_[0-9]+\.png/g;
const unsplashCoffee = "https://images.unsplash.com/photo-1517701550927-30cfcb64db88?w=150";
const unsplashStrawberry = "https://images.unsplash.com/photo-1623065422900-0587b1c3fa4a?w=150";


files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let changed = false;
    
    if (oldWishlistToggleRegex.test(content)) {
        content = content.replace(oldWishlistToggleRegex, newWishlistToggle);
        changed = true;
    }
    
    if (content.includes('iced_coffee_splash_')) {
        content = content.replace(localIcedCoffee, unsplashCoffee);
        changed = true;
    }
    
    if (content.includes('strawberry_splash_')) {
        content = content.replace(localStrawberry, unsplashStrawberry);
        changed = true;
    }
    
    if (changed) {
        fs.writeFileSync(file, content, 'utf8');
        console.log("Fixed bugs in " + file);
    }
});

// Update dynamic_render.js to include global cart UI rendering
const dynPath = path.join(dir, 'dynamic_render.js');
if (fs.existsSync(dynPath)) {
    let dynContent = fs.readFileSync(dynPath, 'utf8');
    
    if (!dynContent.includes('renderGlobalCartSidebar')) {
        const globalCartLogic = `
    // GLOBAL CART UI RENDERER
    window.renderGlobalCartSidebar = function() {
        let cart = JSON.parse(localStorage.getItem('st_cart')) || [];
        const cartItems = document.getElementById('cartItems');
        const cartTotal = document.getElementById('cartTotal');
        if (!cartItems || !cartTotal) return;
        
        if (cart.length === 0) {
            cartItems.innerHTML = '<p style="text-align:center; color: #696b79; margin-top: 50px;">Your bag is empty</p>';
            cartTotal.textContent = '₹0';
            return;
        }

        let total = 0;
        cartItems.innerHTML = cart.map((item, index) => {
            total += (item.price * (item.qty || 1));
            return \`
                <div class="cart-item" style="display:flex; align-items:center; margin-bottom:15px; border-bottom:1px solid #eee; padding-bottom:10px;">
                    <img src="\${item.img}" class="cart-item-img" style="width:60px; height:60px; border-radius:8px; object-fit:cover; margin-right:15px;">
                    <div class="cart-item-info" style="flex:1;">
                        <h4 class="cart-item-title" style="margin:0 0 5px; font-size:0.95rem;">\${item.name}</h4>
                        <div class="cart-item-price" style="font-weight:bold; color:var(--clr-primary, #ff4d6d); margin-bottom:5px;">₹\${item.price}</div>
                        <div style="display:flex; align-items:center; justify-content:space-between;">
                            <div style="display:flex; align-items:center; background:#f1f1f1; border-radius:15px; overflow:hidden;">
                                <button onclick="window.updateGlobalCartQty(\${index}, -1)" style="border:none; background:none; padding:2px 8px; cursor:pointer; font-weight:bold;">-</button>
                                <span style="font-size:0.8rem; font-weight:bold; width:20px; text-align:center;">\${item.qty || 1}</span>
                                <button onclick="window.updateGlobalCartQty(\${index}, 1)" style="border:none; background:none; padding:2px 8px; cursor:pointer; font-weight:bold;">+</button>
                            </div>
                            <button onclick="window.removeGlobalCartItem(\${index})" style="background:none; border:none; color: var(--clr-primary, #ff4d6d); cursor:pointer; font-size:0.8rem; font-weight:bold;"><i class="fa-solid fa-trash"></i></button>
                        </div>
                    </div>
                </div>
            \`;
        }).join('');
        cartTotal.textContent = '₹' + total;
    };

    window.updateGlobalCartQty = function(index, change) {
        let cart = JSON.parse(localStorage.getItem('st_cart')) || [];
        if (cart[index]) {
            cart[index].qty = (cart[index].qty || 1) + change;
            if (cart[index].qty < 1) cart.splice(index, 1);
            localStorage.setItem('st_cart', JSON.stringify(cart));
            window.renderGlobalCartSidebar();
            if (typeof updateCartUI === 'function') updateCartUI();
        }
    };
    
    window.removeGlobalCartItem = function(index) {
        let cart = JSON.parse(localStorage.getItem('st_cart')) || [];
        cart.splice(index, 1);
        localStorage.setItem('st_cart', JSON.stringify(cart));
        window.renderGlobalCartSidebar();
        if (typeof updateCartUI === 'function') updateCartUI();
    };

    // Close button logic for pages where it isn't set
    document.addEventListener('click', e => {
        if (e.target.closest('#closeCart')) {
            const sb = document.getElementById('cartSidebar');
            const ov = document.getElementById('overlay');
            if(sb) sb.classList.remove('open');
            if(ov) ov.classList.remove('show');
        }
        
        // Also allow cart icon opening globally if not set
        if (e.target.closest('.fa-bag-shopping') || e.target.closest('.cart-icon-wrapper')) {
            const sb = document.getElementById('cartSidebar');
            const ov = document.getElementById('overlay');
            if(sb) {
                sb.classList.add('open');
                window.renderGlobalCartSidebar();
            }
            if(ov) ov.classList.add('show');
        }
    });

    // Run once on load
    setTimeout(window.renderGlobalCartSidebar, 200);
`;
        
        // Inject right after addToCart definition
        dynContent = dynContent.replace(/window\.updateCartButtons\(\);\s*};/g, "window.updateCartButtons(); window.renderGlobalCartSidebar(); };" + globalCartLogic);
        fs.writeFileSync(dynPath, dynContent, 'utf8');
        console.log("Injected global cart logic into dynamic_render.js");
    }
}
