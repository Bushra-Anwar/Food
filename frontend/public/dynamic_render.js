
    // GLOBAL CART LOGIC
    
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
            return `
                <div class="cart-item" style="display:flex; align-items:center; margin-bottom:15px; border-bottom:1px solid #eee; padding-bottom:10px;">
                    <img src="${item.img}" class="cart-item-img" style="width:60px; height:60px; border-radius:8px; object-fit:cover; margin-right:15px;">
                    <div class="cart-item-info" style="flex:1;">
                        <h4 class="cart-item-title" style="margin:0 0 5px; font-size:0.95rem;">${item.name}</h4>
                        <div class="cart-item-price" style="font-weight:bold; color:var(--clr-primary, #ff4d6d); margin-bottom:5px;">₹${item.price}</div>
                        <div style="display:flex; align-items:center; justify-content:space-between;">
                            <div style="display:flex; align-items:center; background:#f1f1f1; border-radius:15px; overflow:hidden;">
                                <button onclick="window.updateGlobalCartQty(${index}, -1)" style="border:none; background:none; padding:2px 8px; cursor:pointer; font-weight:bold;">-</button>
                                <span style="font-size:0.8rem; font-weight:bold; width:20px; text-align:center;">${item.qty || 1}</span>
                                <button onclick="window.updateGlobalCartQty(${index}, 1)" style="border:none; background:none; padding:2px 8px; cursor:pointer; font-weight:bold;">+</button>
                            </div>
                            <button onclick="window.removeGlobalCartItem(${index})" style="background:none; border:none; color: var(--clr-primary, #ff4d6d); cursor:pointer; font-size:0.8rem; font-weight:bold;"><i class="fa-solid fa-trash"></i></button>
                        </div>
                    </div>
                </div>
            `;
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
    
    if (typeof window.showToast === 'undefined') {
        window.showToast = function(msg) {
            // Check if toast container exists
            let toastBox = document.getElementById('toastBox');
            if(!toastBox) {
                toastBox = document.createElement('div');
                toastBox.id = 'toastBox';
                toastBox.style.position = 'fixed';
                toastBox.style.bottom = '30px';
                toastBox.style.right = '30px';
                toastBox.style.display = 'flex';
                toastBox.style.flexDirection = 'column';
                toastBox.style.alignItems = 'flex-end';
                toastBox.style.zIndex = '9999';
                document.body.appendChild(toastBox);
            }
            const toast = document.createElement('div');
            toast.style.background = '#333';
            toast.style.color = '#fff';
            toast.style.padding = '15px 25px';
            toast.style.marginBottom = '10px';
            toast.style.borderRadius = '8px';
            toast.style.boxShadow = '0 5px 15px rgba(0,0,0,0.2)';
            toast.style.fontWeight = 'bold';
            toast.style.transform = 'translateX(100%)';
            toast.style.transition = '0.3s';
            toast.textContent = msg;
            toastBox.appendChild(toast);
            
            setTimeout(() => { toast.style.transform = 'translateX(0)'; }, 10);
            setTimeout(() => { 
                toast.style.transform = 'translateX(100%)'; 
                setTimeout(() => { toast.remove(); }, 300);
            }, 3000);
        };
    }

    // Function to check all cart buttons and set them to Added if product is in cart
    window.updateCartButtons = function() {
        let cart = JSON.parse(localStorage.getItem('st_cart')) || [];
        const inCartNames = cart.map(c => c.name.toLowerCase());
        
        // Find all buttons that add to cart
        document.querySelectorAll('button').forEach(btn => {
            const onclickText = btn.getAttribute('onclick');
            if (onclickText && onclickText.includes('addToCart')) {
                // Extract name from addToCart('Name', ...)
                const match = onclickText.match(/addToCart\s*\(\s*['"]([^'"]+)['"]/);
                if (match && match[1]) {
                    if (inCartNames.includes(match[1].toLowerCase())) {
                        btn.textContent = 'Added';
                        btn.style.background = 'var(--clr-primary, #ff4d6d)';
                        btn.style.color = '#fff';
                    }
                }
            }
        });
    };
    
    // Call on load
    setTimeout(window.updateCartButtons, 100);


document.addEventListener('DOMContentLoaded', () => {
    
    const customProducts = JSON.parse(localStorage.getItem('st_custom_products')) || [];
    if (customProducts.length === 0) return;

    const path = window.location.pathname.toLowerCase();
    
    // Helper to render badge
    const getBadgeHtml = (label) => {
        if (!label || label === 'Normal' || label === 'Cakes' || label === 'Donuts' || label === 'Pastries' || label === 'Ice Cream' || label === 'Cupcakes' || label === 'Gifting') return '';
        const colors = { 
            'Premium': '#ffd700', 
            'Special': '#ff4d6d', 
            'Discounted': '#00c853', 
            'Seasonal': '#ff9800', 
            'Festival': '#e91e63', 
            'Occasion': '#9c27b0', 
            'Party': '#00bcd4' 
        };
        const bgColor = colors[label] || '#333';
        return `<div style="position:absolute; top:10px; left:10px; background:${bgColor}; color:#fff; padding:4px 12px; border-radius:20px; font-size:0.75rem; font-weight:bold; z-index:10; box-shadow: 0 2px 5px rgba(0,0,0,0.2);">${label}</div>`;
    };

    // Helper to generate a generic product card for mega-grids
    const createMegaCard = (prod) => {
        const div = document.createElement('div');
        div.className = 'mega-card';
        div.style.position = 'relative';
        div.innerHTML = `
            ${getBadgeHtml(prod.category)}
            <div class="mega-card-img-wrap" onclick="if(typeof openProductModal==='function') openProductModal('${prod.name.replace(/'/g, "\\'")}', '${(prod.desc||'').replace(/'/g, "\\'")}', ${prod.price}, '${prod.img}')">
                <img src="${prod.img}" alt="${prod.name}">
            </div>
            <h4>${prod.name}</h4>
            <p>₹${prod.price}</p>
            <button onclick="if(typeof addToCart==='function') {addToCart('${prod.name.replace(/'/g, "\\'")}', ${prod.price}, '${prod.img}', 1, this); showToast('Added to bag!');} else {alert('Added to cart!');}" style="margin-top:10px; padding:8px 15px; border-radius:8px; border:1px solid #ff4d6d; background:transparent; color:#ff4d6d; cursor:pointer; font-weight:bold; transition:0.3s;" onmouseover="this.style.background='#ff4d6d'; this.style.color='#fff';" onmouseout="this.style.background='transparent'; this.style.color='#ff4d6d';">Add to Bag</button>
        `;
        return div;
    };

    // Helper to generate a masonry item (used in cakes.html, donuts.html, etc.)
    const createMasonryItem = (prod) => {
        const div = document.createElement('div');
        div.className = 'masonry-item';
        div.style.position = 'relative';
        div.innerHTML = `
            ${getBadgeHtml(prod.category)}
            <img src="${prod.img}" alt="${prod.name}" style="height: 300px;" onclick="if(typeof openProductModal==='function') openProductModal('${prod.name.replace(/'/g, "\\'")}', '${(prod.desc||'').replace(/'/g, "\\'")}', ${prod.price}, '${prod.img}')">
            <button class="btn-pin" onclick="if(typeof addToCart==='function') {addToCart('${prod.name.replace(/'/g, "\\'")}', ${prod.price}, '${prod.img}', 1, this); showToast('Added to bag!');}">Add to Bag</button>
            <div class="masonry-overlay">
                <div class="masonry-title">${prod.name}</div>
                <div class="masonry-price">₹${prod.price}</div>
            </div>
        `;
        return div;
    };

    // Determine category based on URL
    let pageCat = '';
    if (path.includes('cakes.html')) pageCat = 'Cakes';
    else if (path.includes('donuts.html')) pageCat = 'Donuts';
    else if (path.includes('pastries.html')) pageCat = 'Pastries';
    else if (path.includes('icecream.html')) pageCat = 'Ice Cream';
    else if (path.includes('gifting.html')) pageCat = 'Gifting';
    else if (path.includes('index.html') || path.endsWith('/') || path.endsWith('frontend') || path.endsWith('frontend/')) pageCat = 'All';

    // Inject into Category Pages
    if (pageCat && pageCat !== 'All') {
        const relevantProducts = customProducts.filter(p => p.category === pageCat || p.subCategory === pageCat);
        if (relevantProducts.length > 0) {
            // Find the masonry container for main grid
            const masonry = document.querySelector('.masonry-container');
            if (masonry) {
                relevantProducts.forEach(prod => {
                    masonry.prepend(createMasonryItem(prod));
                });
            } else {
                // Fallback to mega-grid
                const grids = document.querySelectorAll('.mega-grid');
                if (grids.length > 0) {
                    // Usually the last mega-grid on a category page is the main products grid
                    const mainGrid = grids[grids.length - 1];
                    relevantProducts.forEach(prod => {
                        mainGrid.prepend(createMegaCard(prod));
                    });
                }
            }
        }
    }

    // Inject into Home Page (index.html)
    if (pageCat === 'All') {
        const dealsGrid = document.querySelector('.deals-grid');
        if (dealsGrid) {
            const newest = [...customProducts].reverse().slice(0, 4);
            newest.forEach(prod => {
                const card = document.createElement('div');
                card.className = 'deal-card';
                card.style.position = 'relative';
                card.innerHTML = `${getBadgeHtml(prod.label)}
                    <div class="deal-img-wrapper" onclick="if(typeof openProductModal==='function') openProductModal('${prod.name.replace(/'/g, "\\'")}', '${(prod.desc||'').replace(/'/g, "\\'")}', ${prod.price}, '${prod.img}')">
                        <img src="${prod.img}" alt="${prod.name}">
                    </div>
                    <div class="deal-brand">${prod.name}</div>
                    <div class="deal-offer">₹${prod.price}</div>
                    <button onclick="if(typeof addToCart==='function') {addToCart('${prod.name.replace(/'/g, "\\'")}', ${prod.price}, '${prod.img}', 1, this); showToast('Added to bag!');}" style="margin:10px auto 15px; display:block; padding:8px 15px; border-radius:20px; border:1px solid #ff4d6d; background:transparent; color:#ff4d6d; font-weight:bold; cursor:pointer; transition:0.3s;" onmouseover="this.style.background='#ff4d6d'; this.style.color='#fff';" onmouseout="this.style.background='transparent'; this.style.color='#ff4d6d';">Add to Bag</button>
                `;
                dealsGrid.prepend(card);
            });
        }
    }

    // UPDATE SEARCH DATABASE IF IT EXISTS
    if (typeof productsDB !== 'undefined' && Array.isArray(productsDB)) {
        customProducts.forEach(prod => {
            // Add to the global search array so the navbar search works for custom products too!
            productsDB.push({
                name: prod.name,
                price: prod.price,
                img: prod.img
            });
        });
    }
});

// UPGRADED AI CHATBOT LOGIC (CHATGPT STYLE)
window.toggleAIChat = function() {
    const chat = document.getElementById('aiChat');
    if (chat) chat.classList.toggle('open');
};

window.sendAIMessage = function() {
    const input = document.getElementById('aiInput');
    const body = document.getElementById('aiBody');
    if (!input || !body) return;
    
    const text = input.value.trim();
    if (!text) return;

    // User Message
    const userMsg = document.createElement('div');
    userMsg.className = 'ai-msg user';
    userMsg.textContent = text;
    body.appendChild(userMsg);
    input.value = '';
    body.scrollTop = body.scrollHeight;

    // Bot Typing Indicator
    const typingMsg = document.createElement('div');
    typingMsg.className = 'ai-msg bot';
    typingMsg.innerHTML = '<i class="fa-solid fa-ellipsis fa-fade"></i>';
    body.appendChild(typingMsg);
    body.scrollTop = body.scrollHeight;

    // Generate Response
    setTimeout(() => {
        body.removeChild(typingMsg);
        const botMsg = document.createElement('div');
        botMsg.className = 'ai-msg bot';
        
        let response = "";
        const lower = text.toLowerCase().trim();
        
        // 1. Check for specific products first (Product Matching)
        let foundProduct = null;
        if (typeof productsDB !== 'undefined' && lower.length > 3) {
            // Ignore generic single words so we don't just pick the first cake for the word "cake"
            const genericWords = ['cake', 'cakes', 'donut', 'donuts', 'ice cream', 'icecream', 'pastry', 'pastries', 'gift', 'gifting'];
            if (!genericWords.includes(lower)) {
                // Try to find a match
                const matches = productsDB.filter(p => p.name.toLowerCase().includes(lower) || lower.includes(p.name.toLowerCase()));
                if (matches.length > 0) {
                    foundProduct = matches[0]; // Take the first best match
                }
            }
        }
        
        if (foundProduct) {
            response = `I found the perfect match for you! We have the **${foundProduct.name}** available for ₹${foundProduct.price}.<br><br><img src="${foundProduct.img}" style="width:100%; height:120px; object-fit:cover; border-radius:10px; margin-bottom:10px; cursor:pointer;" onclick="if(typeof openProductModal==='function') openProductModal('${foundProduct.name.replace(/'/g, "\\'")}', 'A delightful choice for your cravings.', ${foundProduct.price}, '${foundProduct.img}'); toggleAIChat();"><br> <div style="display:flex; gap:10px;"><button onclick="if(typeof openProductModal==='function') openProductModal('${foundProduct.name.replace(/'/g, "\\'")}', 'A delightful choice for your cravings.', ${foundProduct.price}, '${foundProduct.img}'); toggleAIChat();" style="flex:1; padding:8px 0; background:#f1f1f1; color:#333; border:none; border-radius:20px; cursor:pointer; font-weight:bold;">View Details</button><button onclick="if(typeof addToCart==='function') { addToCart('${foundProduct.name.replace(/'/g, "\\'")}', ${foundProduct.price}, '${foundProduct.img}', 1, this); if(typeof showToast === 'function') showToast('Added to bag!'); } else { alert('Added to bag!'); }" style="flex:1; padding:8px 0; background:var(--clr-primary, #ff4d6d); color:#fff; border:none; border-radius:20px; cursor:pointer; font-weight:bold;">Add to Bag</button></div>`;
        }
        // 2. Intent Matching (if no specific product was found)
        else if (lower.includes('hello') || lower.includes('hi') || lower.includes('hey')) {
            response = "Hello there! 👋 I'm your SweetAssistant, powered by AI. How can I help you satisfy your sweet tooth today? You can ask me about our cakes, pastries, ice creams, or even your order status!";
        } else if (lower.includes('cake')) {
            response = `Sorry, that specific cake is not available right now! 😔 However, I highly recommend our **Red Velvet Cake** for ₹599.<br><br><img src="recommended_cake.png" style="width:100%; height:120px; object-fit:cover; border-radius:10px; margin-bottom:10px; cursor:pointer;" onclick="if(typeof openProductModal==='function') openProductModal('Red Velvet Cake', 'Our signature dessert crafted perfectly.', 599, 'recommended_cake.png'); toggleAIChat();"><br> <div style="display:flex; gap:10px;"><button onclick="if(typeof openProductModal==='function') openProductModal('Red Velvet Cake', 'Our signature dessert crafted perfectly.', 599, 'recommended_cake.png'); toggleAIChat();" style="flex:1; padding:8px 0; background:#f1f1f1; color:#333; border:none; border-radius:20px; cursor:pointer; font-weight:bold;">View Details</button><button onclick="if(typeof addToCart==='function') { addToCart('Red Velvet Cake', 599, 'recommended_cake.png', 1, this); if(typeof showToast === 'function') showToast('Added to bag!'); } else { alert('Added to bag!'); }" style="flex:1; padding:8px 0; background:var(--clr-primary, #ff4d6d); color:#fff; border:none; border-radius:20px; cursor:pointer; font-weight:bold;">Add to Bag</button></div>`;
        } else if (lower.includes('ice cream') || lower.includes('gelato')) {
            response = `Sorry, we don't have that exact flavor right now! But you must try our **Artisanal Mango Gelato** for ₹229.<br><br><img src="recommended_icecream.png" style="width:100%; height:120px; object-fit:cover; border-radius:10px; margin-bottom:10px; cursor:pointer;" onclick="if(typeof openProductModal==='function') openProductModal('Artisanal Mango Gelato', 'Rich and creamy artisanal gelato.', 229, 'recommended_icecream.png'); toggleAIChat();"><br> <div style="display:flex; gap:10px;"><button onclick="if(typeof openProductModal==='function') openProductModal('Artisanal Mango Gelato', 'Rich and creamy artisanal gelato.', 229, 'recommended_icecream.png'); toggleAIChat();" style="flex:1; padding:8px 0; background:#f1f1f1; color:#333; border:none; border-radius:20px; cursor:pointer; font-weight:bold;">View Details</button><button onclick="if(typeof addToCart==='function') { addToCart('Artisanal Mango Gelato', 229, 'recommended_icecream.png', 1, this); if(typeof showToast === 'function') showToast('Added to bag!'); } else { alert('Added to bag!'); }" style="flex:1; padding:8px 0; background:var(--clr-primary, #ff4d6d); color:#fff; border:none; border-radius:20px; cursor:pointer; font-weight:bold;">Add to Bag</button></div>`;
        } else if (lower.includes('donut')) {
            response = `Sorry, that donut isn't available right now. I highly recommend our delicious **Chocolate Donut** for ₹149!<br><br><img src="donut_category_1777660467553.png" style="width:100%; height:120px; object-fit:cover; border-radius:10px; margin-bottom:10px; cursor:pointer;" onclick="if(typeof openProductModal==='function') openProductModal('Chocolate Donut', 'Soft, fluffy, freshly baked donut.', 149, 'donut_category_1777660467553.png'); toggleAIChat();"><br> <div style="display:flex; gap:10px;"><button onclick="if(typeof openProductModal==='function') openProductModal('Chocolate Donut', 'Soft, fluffy, freshly baked donut.', 149, 'donut_category_1777660467553.png'); toggleAIChat();" style="flex:1; padding:8px 0; background:#f1f1f1; color:#333; border:none; border-radius:20px; cursor:pointer; font-weight:bold;">View Details</button><button onclick="if(typeof addToCart==='function') { addToCart('Chocolate Donut', 149, 'donut_category_1777660467553.png', 1, this); if(typeof showToast === 'function') showToast('Added to bag!'); } else { alert('Added to bag!'); }" style="flex:1; padding:8px 0; background:var(--clr-primary, #ff4d6d); color:#fff; border:none; border-radius:20px; cursor:pointer; font-weight:bold;">Add to Bag</button></div>`;
        } else if (lower.includes('vanila') || lower.includes('vanilla') || lower.includes('chocolate') || lower.includes('strawberry')) {
            response = `Sorry, that specific flavor isn't available right now! 😔 However, I highly recommend our **Signature Strawberry Cheesecake** for ₹299.<br><br><img src="cake_category_1777660447849.png" style="width:100%; height:120px; object-fit:cover; border-radius:10px; margin-bottom:10px; cursor:pointer;" onclick="if(typeof openProductModal==='function') openProductModal('Signature Strawberry Cheesecake', 'A slice of pure bliss.', 299, 'cake_category_1777660447849.png'); toggleAIChat();"><br> <div style="display:flex; gap:10px;"><button onclick="if(typeof openProductModal==='function') openProductModal('Signature Strawberry Cheesecake', 'A slice of pure bliss.', 299, 'cake_category_1777660447849.png'); toggleAIChat();" style="flex:1; padding:8px 0; background:#f1f1f1; color:#333; border:none; border-radius:20px; cursor:pointer; font-weight:bold;">View Details</button><button onclick="if(typeof addToCart==='function') { addToCart('Signature Strawberry Cheesecake', 299, 'cake_category_1777660447849.png', 1, this); if(typeof showToast === 'function') showToast('Added to bag!'); } else { alert('Added to bag!'); }" style="flex:1; padding:8px 0; background:var(--clr-primary, #ff4d6d); color:#fff; border:none; border-radius:20px; cursor:pointer; font-weight:bold;">Add to Bag</button></div>`;
        } else if (lower.includes('price') || lower.includes('cost') || lower.includes('how much')) {
            response = "Our prices generally range from ₹120 for our fresh pastries and donuts, up to ₹1,200+ for our luxury signature cakes. Are you looking for something within a specific budget?";
        } else if (lower.includes('order') || lower.includes('track') || lower.includes('status')) {
            response = "You can easily track your order by visiting the 'My Orders' section from your profile. If you need immediate assistance with an ongoing order, our support team is available at 1-800-SWEETS!";
        } else if (lower.includes('vegan') || lower.includes('healthy') || lower.includes('sugar free')) {
            response = "Absolutely! We cater to all dietary needs. We have a delicious **Vegan Banana Bread**, **Sugar-Free Dark Chocolate Truffles**, and several dairy-free fruit sorbets.";
        } else if (lower.includes('recommend') || lower.includes('best') || lower.includes('popular')) {
            response = "Our customers absolutely love the **Tiramisu Magic** and our freshly baked **Almond Croissants**. They pair wonderfully with our hot beverages!";
        } else if (lower.includes('thank')) {
            response = "You're very welcome! Let me know if you need anything else. Have a deliciously wonderful day! 🍰";
        } else if (lower.includes('cart') || lower.includes('bag') || lower.includes('checkout')) {
            response = "To manage your items, simply click the shopping bag icon at the top right of the screen. From there, you can view your total and proceed to checkout securely!";
        } else if (lower.includes('delivery') || lower.includes('shipping')) {
            response = "We offer **Free Shipping** on all orders above ₹999! Standard delivery usually takes about 45-60 minutes for local addresses.";
        } else if (lower.includes('time') || lower.includes('open') || lower.includes('hours')) {
            response = "Our bakery is open every day from **8:00 AM to 10:00 PM**. However, you can place an order online 24/7, and we will prepare it fresh for you the moment we open!";
        } else {
            response = "Sorry, that product is not available right now. But as an AI trained for SweetTreats Bakery, I can help you find other desserts, check prices, or manage your cart! Let me know what you'd like to try!";
        }
        
        botMsg.innerHTML = response;
        body.appendChild(botMsg);
        body.scrollTop = body.scrollHeight;
    }, 1200);
};


// GLOBAL CHECKOUT REDIRECT
if (typeof window !== 'undefined' && !window.location.pathname.includes('cart.html')) {
    window.openCheckout = function() {
        window.location.href = 'cart.html';
    };
}
