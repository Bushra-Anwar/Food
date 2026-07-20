const fs = require('fs');
const path = require('path');

const newModalHtml = `
    <!-- REDESIGNED CATEGORY DETAILS MODAL -->
    <div class="modal" id="categoryDetailModal" style="padding:0; max-width:400px; border-radius:35px; overflow:hidden; background:#fef4e8; box-shadow:0 30px 60px rgba(0,0,0,0.2); border: 8px solid #111;">
        <!-- Top Image with Zigzag mask -->
        <div style="position:relative; width:100%; height:320px; background:#fff;">
            <img id="categoryMainImg" src="" alt="" style="width:100%; height:100%; object-fit:cover; clip-path: polygon(0 0, 100% 0, 100% calc(100% - 25px), 90% 100%, 80% calc(100% - 25px), 70% 100%, 60% calc(100% - 25px), 50% 100%, 40% calc(100% - 25px), 30% 100%, 20% calc(100% - 25px), 10% 100%, 0 calc(100% - 25px));">
            
            <!-- Floating Buttons -->
            <button onclick="document.getElementById('categoryDetailModal').classList.remove('show'); document.getElementById('overlay').classList.remove('show');" style="position:absolute; top:25px; left:20px; width:40px; height:40px; border-radius:12px; border:none; background:#ff9054; color:#fff; cursor:pointer; font-size:1.2rem; box-shadow:0 5px 15px rgba(255,144,84,0.4); z-index:10;"><i class="fa-solid fa-chevron-left"></i></button>
            <button id="modalWishlistBtn" onclick="toggleWishlist(this)" style="position:absolute; top:25px; right:20px; width:40px; height:40px; border-radius:12px; border:2px solid #ff9054; background:transparent; color:#ff9054; cursor:pointer; font-size:1.2rem; z-index:10; transition:0.3s;"><i class="fa-regular fa-heart"></i></button>
        </div>
        
        <!-- Content Body -->
        <div style="padding:30px 25px;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:15px;">
                <h3 id="categoryMainName" style="font-family:var(--font-heading); font-size:1.6rem; color:#222; margin:0; line-height:1.2; max-width:70%;"></h3>
                <span id="categoryMainPrice" style="font-size:1.4rem; font-weight:400; color:#222;"></span>
            </div>
            
            <p id="categoryMainDesc" style="color:#888; font-size:0.85rem; line-height:1.6; margin-bottom:25px;"></p>
            
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:20px;">
                <span style="color:#222; font-size:1.05rem;">Flavour</span>
                <span style="color:#222; font-weight:600;">Signature</span>
            </div>
            
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:30px;">
                <span style="color:#222; font-size:1.05rem;">Quantity</span>
                <div style="display:flex; align-items:center; background:#fff; border-radius:20px; padding:5px 15px; box-shadow:0 2px 10px rgba(0,0,0,0.03);">
                    <button onclick="changeModalQty(-1)" style="border:none; background:none; cursor:pointer; font-weight:bold; font-size:1.2rem; color:#555; width:20px;">-</button>
                    <span id="modalQtyVal" style="margin:0 15px; font-weight:bold; font-size:1.1rem; color:#222; width:20px; text-align:center;">1</span>
                    <button onclick="changeModalQty(1)" style="border:none; background:none; cursor:pointer; font-weight:bold; font-size:1.2rem; color:#555; width:20px;">+</button>
                </div>
            </div>
            
            <h4 id="suggestionsTitle" style="font-size:1.1rem; color:#222; margin-bottom:15px; font-weight:400;">Add Extras</h4>
            <div id="modalSuggestions" style="display:flex; gap:15px; margin-bottom:30px; overflow-x:auto; padding-bottom:5px;">
                <!-- Dynamically injected -->
            </div>
            
            <button id="categoryAddBagBtn" style="width:100%; background:linear-gradient(90deg, #ff9054, #ff6c2c); border:none; padding:20px 25px; border-radius:35px; color:#fff; font-size:1.1rem; cursor:pointer; display:flex; justify-content:space-between; align-items:center; box-shadow:0 15px 30px rgba(255,108,44,0.3); transition: transform 0.2s;">
                <span id="categoryAddBagText" style="font-weight:400;">Add to Cart</span>
                <span id="modalTotalPrice" style="font-weight:bold;"></span>
            </button>
        </div>
    </div>
`;

const newJs = `
<script>
    let currentModalQty = 1;
    let currentModalBasePrice = 0;
    
    function changeModalQty(change) {
        currentModalQty += change;
        if (currentModalQty < 1) currentModalQty = 1;
        const qtyValEl = document.getElementById('modalQtyVal');
        if (qtyValEl) qtyValEl.textContent = currentModalQty;
        
        const totalEl = document.getElementById('modalTotalPrice');
        if (totalEl && currentModalBasePrice) {
            totalEl.textContent = '₹' + (currentModalBasePrice * currentModalQty);
        }
    }

    function toggleWishlist(btn) {
        const icon = btn.querySelector('i');
        if (icon.classList.contains('fa-regular')) {
            icon.classList.remove('fa-regular');
            icon.classList.add('fa-solid');
            btn.style.background = '#ff9054';
            btn.style.color = '#fff';
            if(typeof showToast === 'function') showToast('Added to Wishlist!');
        } else {
            icon.classList.remove('fa-solid');
            icon.classList.add('fa-regular');
            btn.style.background = 'transparent';
            btn.style.color = '#ff9054';
            if(typeof showToast === 'function') showToast('Removed from Wishlist');
        }
    }

    function generateSuggestions(name) {
        const n = name.toLowerCase();
        let html = '';
        let title = 'Add Drinks';
        
        if (n.includes('cake') || n.includes('cupcake')) {
            title = 'Add Party Essentials';
            html = \`
                <div onclick="showToast('Magic Candles Added!')" style="width:75px; flex-shrink:0; height:75px; border-radius:16px; background:#fff; padding:6px; box-shadow:0 5px 15px rgba(0,0,0,0.04); cursor:pointer;"><img src="https://images.unsplash.com/photo-1532054944983-6c820061e860?w=150" style="width:100%; height:100%; object-fit:cover; border-radius:10px;"></div>
                <div onclick="showToast('Party Popper Added!')" style="width:75px; flex-shrink:0; height:75px; border-radius:16px; background:#fff; padding:6px; box-shadow:0 5px 15px rgba(0,0,0,0.04); cursor:pointer;"><img src="https://images.unsplash.com/photo-1530103862676-de8892b12a1f?w=150" style="width:100%; height:100%; object-fit:cover; border-radius:10px;"></div>
                <div onclick="showToast('Happy Birthday Tag Added!')" style="width:75px; flex-shrink:0; height:75px; border-radius:16px; background:#fff; padding:6px; box-shadow:0 5px 15px rgba(0,0,0,0.04); cursor:pointer;"><img src="https://images.unsplash.com/photo-1614088636402-40f41334c9c1?w=150" style="width:100%; height:100%; object-fit:cover; border-radius:10px;"></div>
            \`;
        } else if (n.includes('ice cream') || n.includes('gelato')) {
            title = 'Add Toppings';
            html = \`
                <div onclick="showToast('Choco Chips Added!')" style="width:75px; flex-shrink:0; height:75px; border-radius:16px; background:#fff; padding:6px; box-shadow:0 5px 15px rgba(0,0,0,0.04); cursor:pointer;"><img src="https://images.unsplash.com/photo-1622329241951-40995085d7b5?w=150" style="width:100%; height:100%; object-fit:cover; border-radius:10px;"></div>
                <div onclick="showToast('Caramel Syrup Added!')" style="width:75px; flex-shrink:0; height:75px; border-radius:16px; background:#fff; padding:6px; box-shadow:0 5px 15px rgba(0,0,0,0.04); cursor:pointer;"><img src="https://images.unsplash.com/photo-1596700816912-ee98274719c8?w=150" style="width:100%; height:100%; object-fit:cover; border-radius:10px;"></div>
                <div onclick="showToast('Waffle Cone Added!')" style="width:75px; flex-shrink:0; height:75px; border-radius:16px; background:#fff; padding:6px; box-shadow:0 5px 15px rgba(0,0,0,0.04); cursor:pointer;"><img src="https://images.unsplash.com/photo-1559182582-77eb93108ee8?w=150" style="width:100%; height:100%; object-fit:cover; border-radius:10px;"></div>
            \`;
        } else if (n.includes('macaron') || n.includes('pastry') || n.includes('donut')) {
            title = 'Add Beverages';
            html = \`
                <div onclick="showToast('Hot Coffee Added!')" style="width:75px; flex-shrink:0; height:75px; border-radius:16px; background:#fff; padding:6px; box-shadow:0 5px 15px rgba(0,0,0,0.04); cursor:pointer;"><img src="https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=150" style="width:100%; height:100%; object-fit:cover; border-radius:10px;"></div>
                <div onclick="showToast('Iced Latte Added!')" style="width:75px; flex-shrink:0; height:75px; border-radius:16px; background:#fff; padding:6px; box-shadow:0 5px 15px rgba(0,0,0,0.04); cursor:pointer;"><img src="iced_coffee_splash_1784385065567.png" style="width:100%; height:100%; object-fit:cover; border-radius:10px;"></div>
                <div onclick="showToast('Berry Shake Added!')" style="width:75px; flex-shrink:0; height:75px; border-radius:16px; background:#fff; padding:6px; box-shadow:0 5px 15px rgba(0,0,0,0.04); cursor:pointer;"><img src="strawberry_splash_1784385077502.png" style="width:100%; height:100%; object-fit:cover; border-radius:10px;"></div>
            \`;
        } else {
            title = 'Add Drinks';
            html = \`
                <div onclick="showToast('Strawberry Splash Added!')" style="width:75px; flex-shrink:0; height:75px; border-radius:16px; background:#fff; padding:6px; box-shadow:0 5px 15px rgba(0,0,0,0.04); cursor:pointer;"><img src="strawberry_splash_1784385077502.png" style="width:100%; height:100%; object-fit:cover; border-radius:10px;"></div>
                <div onclick="showToast('Iced Coffee Added!')" style="width:75px; flex-shrink:0; height:75px; border-radius:16px; background:#fff; padding:6px; box-shadow:0 5px 15px rgba(0,0,0,0.04); cursor:pointer;"><img src="iced_coffee_splash_1784385065567.png" style="width:100%; height:100%; object-fit:cover; border-radius:10px;"></div>
            \`;
        }
        
        const titleEl = document.getElementById('suggestionsTitle');
        if (titleEl) titleEl.textContent = title;
        
        const suggEl = document.getElementById('modalSuggestions');
        if (suggEl) suggEl.innerHTML = html;
    }

    function openProductModal(name, desc, price, img) {
        currentModalQty = 1;
        currentModalBasePrice = price;
        
        const qtyValEl = document.getElementById('modalQtyVal');
        if (qtyValEl) qtyValEl.textContent = currentModalQty;

        const mainNameEl = document.getElementById('categoryMainName');
        if (mainNameEl) mainNameEl.textContent = name;
        
        const mainImgEl = document.getElementById('categoryMainImg');
        if (mainImgEl) {
            mainImgEl.src = img;
            mainImgEl.alt = name;
        }
        
        const mainDescEl = document.getElementById('categoryMainDesc');
        if (mainDescEl) mainDescEl.textContent = desc || 'A classic delight marvel of pastry craftsmanship. Handcrafted with perfection for any celebration, big or small.';
        
        const mainPriceEl = document.getElementById('categoryMainPrice');
        if (mainPriceEl) mainPriceEl.textContent = '₹' + price;
        
        const totalEl = document.getElementById('modalTotalPrice');
        if (totalEl) totalEl.textContent = '₹' + price;
        
        // Reset wishlist button
        const wBtn = document.getElementById('modalWishlistBtn');
        if (wBtn) {
            wBtn.innerHTML = '<i class="fa-regular fa-heart"></i>';
            wBtn.style.background = 'transparent';
            wBtn.style.color = '#ff9054';
        }
        
        // Reset add to cart button
        const addBtn = document.getElementById('categoryAddBagBtn');
        const textBtn = document.getElementById('categoryAddBagText');
        if (addBtn) {
            addBtn.style.background = 'linear-gradient(90deg, #ff9054, #ff6c2c)';
            if(textBtn) textBtn.textContent = 'Add to Cart';
            
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
                }, 800); // close after 0.8s
            };
        }
        
        generateSuggestions(name);
        
        const modalEl = document.getElementById('categoryDetailModal');
        if (modalEl) modalEl.classList.add('show');
        
        const overlayEl = document.getElementById('overlay');
        if (overlayEl) overlayEl.classList.add('show');
    }
</script>
`;

const dir = __dirname;
const htmlFiles = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

const oldModalRegex = /<div class="modal" id="categoryDetailModal"[\s\S]*?<\/div>\s*<\/div>/g;

htmlFiles.forEach(file => {
    let content = fs.readFileSync(path.join(dir, file), 'utf8');
    let modified = false;
    
    // Some files might have the modal but it was already replaced by update_product_modal.cjs previously.
    // The safest way is to find `<div class="modal" id="categoryDetailModal"` up to its closing `</div></div>`
    // Actually the previous regex `(?=<!-- AI ASSISTANT -->|<div class="ai-widget")` might not work if those aren't present.
    // Let's use `content.indexOf` parsing.
    
    const startIdx = content.indexOf('<div class="modal" id="categoryDetailModal"');
    if (startIdx !== -1) {
        // find end of modal
        // since it contains nested divs, just finding </div></div> isn't reliable enough, but the old one ended right before `<div class="ai-widget"` or script
        let endIdx = content.indexOf('<div class="ai-widget"', startIdx);
        if (endIdx === -1) endIdx = content.indexOf('<script>', startIdx);
        if (endIdx === -1) endIdx = content.indexOf('</body>', startIdx);
        
        if (endIdx !== -1) {
            content = content.substring(0, startIdx) + newModalHtml + '\n' + content.substring(endIdx);
            modified = true;
        }
    }
    
    // Replace the script
    const scriptStart = content.indexOf('let currentModalQty = 1;');
    if (scriptStart !== -1) {
        const fullScriptStart = content.lastIndexOf('<script>', scriptStart);
        const fullScriptEnd = content.indexOf('</script>', scriptStart) + 9;
        
        if (fullScriptStart !== -1 && fullScriptEnd !== -1) {
            content = content.substring(0, fullScriptStart) + newJs + content.substring(fullScriptEnd);
            modified = true;
        }
    }
    
    if (modified) {
        fs.writeFileSync(path.join(dir, file), content);
        console.log('Fixed modal in', file);
    }
});

// Fix dynamic_render.js for the .deal-card styling
let dynJs = fs.readFileSync('dynamic_render.js', 'utf8');
const oldCardHtml = /\${getBadgeHtml\(prod\.label\)}[\s\S]*?<\/div>\s*`;/g;
const newCardHtml = `\${getBadgeHtml(prod.label)}
                    <div class="deal-img-wrapper" onclick="if(typeof openProductModal==='function') openProductModal('\${prod.name.replace(/'/g, "\\\\'")}', '\${(prod.desc||'').replace(/'/g, "\\\\'")}', \${prod.price}, '\${prod.img}')">
                        <img src="\${prod.img}" alt="\${prod.name}">
                    </div>
                    <div class="deal-brand">\${prod.name}</div>
                    <div class="deal-offer">₹\${prod.price}</div>
                    <button onclick="if(typeof addToCart==='function') {addToCart('\${prod.name.replace(/'/g, "\\\\'")}', \${prod.price}, '\${prod.img}', 1, this); showToast('Added to bag!');}" style="margin:10px auto 15px; display:block; padding:8px 15px; border-radius:20px; border:1px solid #ff4d6d; background:transparent; color:#ff4d6d; font-weight:bold; cursor:pointer; transition:0.3s;" onmouseover="this.style.background='#ff4d6d'; this.style.color='#fff';" onmouseout="this.style.background='transparent'; this.style.color='#ff4d6d';">Add to Bag</button>
                \`;`;
                
dynJs = dynJs.replace(/const card = document\.createElement\('div'\);\s*card\.className = 'deal-card';\s*card\.style\.position = 'relative';\s*card\.innerHTML = `[\s\S]*?<\/div>\s*`;/g, 
`const card = document.createElement('div');
                card.className = 'deal-card';
                card.style.position = 'relative';
                card.innerHTML = \`${newCardHtml}`);
fs.writeFileSync('dynamic_render.js', dynJs);
console.log('Fixed deal-card in dynamic_render.js');
