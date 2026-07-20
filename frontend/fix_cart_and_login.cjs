const fs = require('fs');

const files = fs.readdirSync(__dirname).filter(f => f.endsWith('.html'));

// 1. We need to grab the navbar from index.html to inject into cart.html
let indexHtml = fs.readFileSync('index.html', 'utf8');
const navStart = indexHtml.indexOf('<nav class="navbar"');
const navEnd = indexHtml.indexOf('</nav>') + '</nav>'.length;
let navHtml = indexHtml.substring(navStart, navEnd);

// Replace "Menu" with "Login" in the navHtml itself so cart.html gets the updated one
navHtml = navHtml.replace(/<div class="action-item" onclick="window\.location\.href='menu\.html'" style="cursor:pointer;">\s*<i class="fa-regular fa-user"><\/i>\s*<span>Menu<\/span>\s*<\/div>/g, '<div class="action-item" onclick="window.location.href=\'login.html\'" style="cursor:pointer;">\n                <i class="fa-regular fa-user"></i>\n                <span>Login</span>\n            </div>');

// The localStorage override script to inject into all pages
const localStoreOverrideScript = `
<script>
    // INTERCEPT CART LOGIC FOR LOCALSTORAGE
    (function() {
        if(typeof cart !== 'undefined' && typeof addToCart === 'function') {
            // Load saved cart
            const savedCart = JSON.parse(localStorage.getItem('st_cart'));
            if(savedCart) {
                cart.length = 0; // clear existing
                savedCart.forEach(i => cart.push(i));
            }
            
            function _save() { localStorage.setItem('st_cart', JSON.stringify(cart)); }
            
            const _origAdd = addToCart;
            window.addToCart = function(name, price, img, qty=1) {
                _origAdd(name, price, img, qty);
                _save();
            };
            
            const _origRemove = removeFromCart;
            window.removeFromCart = function(index) {
                _origRemove(index);
                _save();
            };
            
            const _origUpdate = updateCartItemQty;
            window.updateCartItemQty = function(index, change) {
                _origUpdate(index, change);
                _save();
            };
            
            // Re-render UI after a short delay to ensure DOM is ready
            setTimeout(() => { if(typeof updateCartUI === 'function') updateCartUI(); }, 100);
        }
    })();
</script>
`;

// 2. Loop through all HTML files to update navbar & inject local storage script
files.forEach(file => {
    // Skip cart.html because we will completely overwrite it
    // Skip login.html if it exists
    if (file === 'cart.html' || file === 'login.html') return;
    
    let content = fs.readFileSync(file, 'utf8');
    
    // Update Menu to Login
    content = content.replace(/<div class="action-item" onclick="window\.location\.href='menu\.html'" style="cursor:pointer;">\s*<i class="fa-regular fa-user"><\/i>\s*<span>Menu<\/span>\s*<\/div>/g, '<div class="action-item" onclick="window.location.href=\'login.html\'" style="cursor:pointer;">\n                <i class="fa-regular fa-user"></i>\n                <span>Login</span>\n            </div>');
    
    // Prevent double injection
    if (!content.includes('INTERCEPT CART LOGIC FOR LOCALSTORAGE')) {
        const bodyEnd = content.lastIndexOf('</body>');
        if (bodyEnd !== -1) {
            content = content.substring(0, bodyEnd) + localStoreOverrideScript + '\n' + content.substring(bodyEnd);
            fs.writeFileSync(file, content);
        }
    } else {
        fs.writeFileSync(file, content);
    }
});
console.log('Updated navs and injected localStorage logic into all files.');

// 3. Generate cart.html
const cartHtml = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Cart | SweetTreats</title>
    <link rel="stylesheet" href="styles.css">
    <link rel="stylesheet" href="custom_features.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
        body { font-family: 'Helvetica Neue', sans-serif; margin: 0; padding: 0; }
        .cart-page-body {
            background: linear-gradient(135deg, #fdfbfb 0%, #ebedee 100%);
            min-height: 100vh;
            display: flex;
            flex-direction: column;
        }
        .cart-wrapper {
            max-width: 1000px;
            margin: 60px auto;
            padding: 50px;
            background: #fff;
            border-radius: 30px;
            box-shadow: 0 20px 50px rgba(0,0,0,0.05);
            width: 90%;
        }
        .cart-table { width: 100%; border-collapse: collapse; margin-top: 30px; }
        .cart-table th { text-align: left; padding-bottom: 20px; border-bottom: 2px solid #f1f1f1; color: #888; font-weight: normal; }
        .cart-table td { padding: 20px 0; border-bottom: 1px solid #f1f1f1; vertical-align: middle; }
        .item-info { display: flex; align-items: center; gap: 20px; }
        .item-img { width: 80px; height: 80px; object-fit: cover; border-radius: 15px; }
        .item-title { font-weight: bold; font-size: 1.2rem; color: #333; margin-bottom: 5px; }
        .qty-controls { display: flex; align-items: center; border: 1px solid #ddd; border-radius: 20px; width: fit-content; overflow: hidden; }
        .qty-controls button { background: #f9f9f9; border: none; padding: 8px 15px; cursor: pointer; font-weight: bold; }
        .qty-controls span { padding: 8px 15px; font-weight: bold; }
        .remove-btn { color: #ff6b8b; background: none; border: none; cursor: pointer; font-size: 1.2rem; transition: 0.3s; }
        .remove-btn:hover { color: #d81b60; }
        
        .cart-summary { margin-top: 50px; text-align: right; border-top: 2px solid #f1f1f1; padding-top: 30px; }
        .summary-row { display: flex; justify-content: flex-end; gap: 80px; margin-bottom: 15px; font-size: 1.1rem; }
        .summary-total { font-size: 1.8rem; font-weight: bold; color: var(--clr-primary, #ff4d6d); margin-top: 20px; }
        
        .btn-pay { background: var(--clr-primary, #ff4d6d); color: #fff; padding: 18px 50px; border: none; border-radius: 40px; font-size: 1.2rem; font-weight: bold; cursor: pointer; transition: 0.3s; margin-top: 30px; box-shadow: 0 10px 20px rgba(255, 77, 109, 0.3); }
        .btn-pay:hover { transform: translateY(-3px); box-shadow: 0 15px 25px rgba(255, 77, 109, 0.4); }
        
        /* Empty State */
        .empty-cart { text-align: center; padding: 80px 20px; }
        .empty-cart i { font-size: 5rem; color: #eee; margin-bottom: 30px; }
        .empty-cart h3 { font-size: 2rem; color: #555; margin-bottom: 30px; }
        .empty-cart a { color: #fff; background: var(--clr-primary, #ff4d6d); text-decoration: none; font-weight: bold; padding: 15px 40px; border-radius: 30px; display: inline-block; transition: 0.3s; }
        .empty-cart a:hover { box-shadow: 0 10px 20px rgba(255, 77, 109, 0.3); }
        
        .overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); z-index: 1000; display: none; }
        .overlay.show { display: block; }
        .modal { position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); background: #fff; padding: 40px; border-radius: 20px; z-index: 1001; width: 90%; max-width: 500px; display: none; }
        .modal.show { display: block; }
        .form-group { margin-bottom: 20px; }
        .form-group label { display: block; margin-bottom: 8px; font-weight: bold; color: #555; }
        .form-control { width: 100%; padding: 15px; border: 1px solid #ddd; border-radius: 10px; font-size: 1rem; }
    </style>
</head>
<body class="cart-page-body">

    ${navHtml}

    <div class="cart-wrapper">
        <h1 style="font-family: 'Times New Roman', serif; font-size: 3.5rem; text-align: center; margin-bottom: 10px; color: #333;">Shopping Bag</h1>
        
        <div id="cartContent">
            <!-- Rendered via JS -->
        </div>
    </div>
    
    <!-- CHECKOUT MODAL -->
    <div class="overlay" id="overlay"></div>
    <div class="modal" id="checkoutModal">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px;">
            <h2 style="font-family: 'Times New Roman', serif; font-size: 2.5rem; margin:0;">Checkout</h2>
            <div style="cursor: pointer; font-size: 1.5rem; color: #888;" onclick="closeCheckout()"><i class="fa-solid fa-xmark"></i></div>
        </div>
        <form onsubmit="processPayment(event)">
            <div class="form-group">
                <label>Full Name</label>
                <input type="text" class="form-control" required placeholder="Enter your name">
            </div>
            <div class="form-group">
                <label>Delivery Address</label>
                <textarea class="form-control" required placeholder="Enter delivery address"></textarea>
            </div>
            <div class="form-group">
                <label>Payment Method</label>
                <select class="form-control">
                    <option>Credit / Debit Card</option>
                    <option>UPI / Google Pay</option>
                    <option>Cash on Delivery</option>
                </select>
            </div>
            <button type="submit" style="width: 100%; background: var(--clr-primary, #ff4d6d); padding: 18px; border:none; border-radius:15px; color:#fff; font-weight:bold; font-size:1.2rem; cursor:pointer; margin-top:10px; transition: 0.3s;" onmouseover="this.style.opacity='0.9'" onmouseout="this.style.opacity='1'">Place Order</button>
        </form>
    </div>

<script>
    const cart = JSON.parse(localStorage.getItem('st_cart')) || [];
    
    function saveCart() { localStorage.setItem('st_cart', JSON.stringify(cart)); }
    
    function renderCartPage() {
        const container = document.getElementById('cartContent');
        if (cart.length === 0) {
            container.innerHTML = \`
                <div class="empty-cart">
                    <i class="fa-solid fa-bag-shopping"></i>
                    <h3>Your shopping bag is empty</h3>
                    <a href="index.html">Discover SweetTreats</a>
                </div>
            \`;
            return;
        }
        
        let total = 0;
        let html = \`
            <table class="cart-table">
                <thead>
                    <tr>
                        <th>Product</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th style="text-align: right;">Total</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
        \`;
        
        cart.forEach((item, i) => {
            const itemTotal = item.price * item.qty;
            total += itemTotal;
            html += \`
                <tr>
                    <td>
                        <div class="item-info">
                            <img src="\${item.img}" class="item-img">
                            <div class="item-title">\${item.name}</div>
                        </div>
                    </td>
                    <td style="font-weight: bold; color: #888;">₹\${item.price}</td>
                    <td>
                        <div class="qty-controls">
                            <button onclick="changeQty(\${i}, -1)">-</button>
                            <span>\${item.qty}</span>
                            <button onclick="changeQty(\${i}, 1)">+</button>
                        </div>
                    </td>
                    <td style="text-align: right; font-weight: bold; color: #333; font-size: 1.2rem;">₹\${itemTotal}</td>
                    <td style="text-align: center;"><button class="remove-btn" onclick="removeItem(\${i})"><i class="fa-solid fa-trash"></i></button></td>
                </tr>
            \`;
        });
        
        html += \`
                </tbody>
            </table>
            
            <div class="cart-summary">
                <div class="summary-row"><span>Subtotal:</span> <strong style="color: #333;">₹\${total}</strong></div>
                <div class="summary-row"><span>Delivery:</span> <strong style="color: #333;">₹50</strong></div>
                <div class="summary-row summary-total"><span>Total:</span> <span>₹\${total + 50}</span></div>
                
                <button class="btn-pay" onclick="openCheckout()">Continue to Payment <i class="fa-solid fa-arrow-right" style="margin-left: 10px;"></i></button>
            </div>
        \`;
        
        container.innerHTML = html;
        
        // Also update navbar cart badge if it exists
        const countBadge = document.querySelector('.action-item span.count');
        if (countBadge) countBadge.textContent = cart.length;
    }
    
    function changeQty(index, delta) {
        if (cart[index]) {
            cart[index].qty += delta;
            if (cart[index].qty < 1) cart.splice(index, 1);
            saveCart();
            renderCartPage();
        }
    }
    
    function removeItem(index) {
        cart.splice(index, 1);
        saveCart();
        renderCartPage();
    }
    
    function openCheckout() {
        document.getElementById('checkoutModal').classList.add('show');
        document.getElementById('overlay').classList.add('show');
    }
    
    function closeCheckout() {
        document.getElementById('checkoutModal').classList.remove('show');
        document.getElementById('overlay').classList.remove('show');
    }
    
    function processPayment(e) {
        e.preventDefault();
        alert('Payment successful! Thank you for ordering from SweetTreats.');
        localStorage.removeItem('st_cart');
        window.location.href = 'index.html';
    }
    
    renderCartPage();
</script>
</body>
</html>`;
fs.writeFileSync('cart.html', cartHtml);
console.log('Generated dynamic cart.html');

// 4. Generate login.html
const loginHtml = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Login | SweetTreats</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Montserrat:wght@400;600&display=swap');
        
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { background: #fdfaf5; font-family: 'Montserrat', sans-serif; display: flex; align-items: center; justify-content: center; min-height: 100vh; }
        
        .login-container {
            background: #fff;
            width: 100%;
            max-width: 420px;
            border-radius: 40px;
            box-shadow: 0 20px 50px rgba(74, 59, 50, 0.1);
            overflow: hidden;
            position: relative;
        }
        
        .login-img {
            width: 100%;
            height: 280px;
            background: url('cake_category_1777660447849.png') center/cover;
            border-radius: 0 0 80px 0;
            position: relative;
        }
        
        .login-header-text {
            position: absolute;
            bottom: -60px;
            left: 30px;
            right: 30px;
            text-align: center;
        }
        .login-header-text h2 {
            font-family: 'Playfair Display', serif;
            font-size: 1.8rem;
            color: #4a3b32;
            line-height: 1.2;
        }
        .login-header-text span { color: #8b5a33; }
        
        .login-body {
            padding: 80px 40px 40px;
        }
        
        .tabs {
            display: flex;
            justify-content: center;
            gap: 50px;
            margin-bottom: 40px;
        }
        .tab {
            font-family: 'Playfair Display', serif;
            font-size: 1.4rem;
            color: #4a3b32;
            cursor: pointer;
            opacity: 0.4;
            transition: 0.3s;
            position: relative;
            font-weight: bold;
        }
        .tab.active {
            opacity: 1;
        }
        .tab.active::after {
            content: '';
            position: absolute;
            bottom: -8px;
            left: 0;
            width: 100%;
            height: 3px;
            background: #4a3b32;
            border-radius: 2px;
        }
        
        .input-group {
            display: flex;
            align-items: center;
            border-bottom: 1.5px solid #4a3b32;
            padding: 10px 0;
            margin-bottom: 25px;
        }
        .input-group i {
            color: #8b5a33;
            font-size: 1.2rem;
            width: 35px;
        }
        .input-group input {
            border: none;
            outline: none;
            background: transparent;
            font-family: 'Montserrat', sans-serif;
            font-size: 1rem;
            color: #4a3b32;
            width: 100%;
        }
        .input-group input::placeholder { color: #aaa; }
        
        .btn-submit {
            background: #8b5a33;
            color: #fff;
            border: none;
            width: 100%;
            padding: 15px;
            border-radius: 30px;
            font-size: 1.1rem;
            font-weight: bold;
            cursor: pointer;
            margin-top: 15px;
            transition: 0.3s;
            box-shadow: 0 10px 20px rgba(139, 90, 51, 0.2);
        }
        .btn-submit:hover {
            background: #704728;
            box-shadow: 0 10px 20px rgba(139, 90, 51, 0.4);
            transform: translateY(-2px);
        }
        
        .forgot {
            text-align: center;
            display: block;
            margin-top: 25px;
            color: #4a3b32;
            text-decoration: none;
            font-size: 0.95rem;
            font-weight: 600;
        }
        
        .or-divider {
            text-align: center;
            margin: 30px 0;
            position: relative;
            color: #8b5a33;
            font-weight: 600;
        }
        .or-divider::before, .or-divider::after {
            content: '';
            position: absolute;
            top: 50%;
            width: 35%;
            height: 1.5px;
            background: #8b5a33;
        }
        .or-divider::before { left: 0; }
        .or-divider::after { right: 0; }
        
        .socials {
            display: flex;
            justify-content: center;
            gap: 25px;
        }
        .socials i {
            font-size: 1.8rem;
            color: #8b5a33;
            cursor: pointer;
            transition: 0.3s;
        }
        .socials i:hover { transform: scale(1.1); color: #704728; }
        
        /* Back button */
        .back-btn {
            position: absolute;
            top: 25px;
            left: 25px;
            background: rgba(255,255,255,0.9);
            width: 45px;
            height: 45px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #8b5a33;
            cursor: pointer;
            text-decoration: none;
            z-index: 10;
            box-shadow: 0 5px 15px rgba(0,0,0,0.1);
            transition: 0.3s;
            font-size: 1.2rem;
        }
        .back-btn:hover { background: #fff; transform: scale(1.1); }
    </style>
</head>
<body>

<div class="login-container">
    <a href="index.html" class="back-btn"><i class="fa-solid fa-arrow-left"></i></a>
    <div class="login-img">
        <div class="login-header-text">
            <h2>Welcome to our <span>SweetTreats</span> Bakery Shop</h2>
        </div>
    </div>
    
    <div class="login-body">
        
        <div class="tabs">
            <div class="tab active" onclick="switchTab('signin')">Sign In</div>
            <div class="tab" onclick="switchTab('signup')">Sign Up</div>
        </div>
        
        <form id="authForm" onsubmit="event.preventDefault(); window.location.href='index.html';">
            <div class="input-group">
                <i class="fa-solid fa-envelope"></i>
                <input type="email" placeholder="Email" required>
            </div>
            <div class="input-group">
                <i class="fa-solid fa-lock"></i>
                <input type="password" placeholder="Password" required>
            </div>
            
            <!-- Hidden by default for Sign In -->
            <div class="input-group" id="confirmPassGroup" style="display: none;">
                <i class="fa-solid fa-lock"></i>
                <input type="password" placeholder="Confirm Password">
            </div>
            
            <button type="submit" class="btn-submit" id="submitBtn">Sign In</button>
        </form>
        
        <a href="#" class="forgot" id="forgotLink">Forgot Password?</a>
        
        <div class="or-divider">or</div>
        
        <div class="socials">
            <i class="fa-brands fa-google"></i>
            <i class="fa-brands fa-facebook"></i>
            <i class="fa-brands fa-x-twitter"></i>
        </div>
        
    </div>
</div>

<script>
    function switchTab(tab) {
        const tabs = document.querySelectorAll('.tab');
        const confirmGroup = document.getElementById('confirmPassGroup');
        const submitBtn = document.getElementById('submitBtn');
        const forgotLink = document.getElementById('forgotLink');
        
        if (tab === 'signin') {
            tabs[0].classList.add('active');
            tabs[1].classList.remove('active');
            confirmGroup.style.display = 'none';
            submitBtn.textContent = 'Sign In';
            forgotLink.style.display = 'block';
            document.querySelector('.login-header-text h2').innerHTML = 'Welcome to our <span>SweetTreats</span> Bakery Shop';
        } else {
            tabs[1].classList.add('active');
            tabs[0].classList.remove('active');
            confirmGroup.style.display = 'flex';
            submitBtn.textContent = 'Sign Up';
            forgotLink.style.display = 'none';
            document.querySelector('.login-header-text h2').innerHTML = 'Join our <span>SweetTreats</span> Bakery Family';
        }
    }
</script>
</body>
</html>`;
fs.writeFileSync('login.html', loginHtml);
console.log('Generated login.html');
