const fs = require('fs');
const path = require('path');

const newModalHtml = `
    <!-- REDESIGNED CATEGORY DETAILS MODAL -->
    <div class="modal" id="categoryDetailModal" style="padding:0; max-width:400px; border-radius:35px; overflow:hidden; background:#fef4e8; box-shadow:0 30px 60px rgba(0,0,0,0.2); border: 8px solid #111;">
        <!-- Top Image with Zigzag mask -->
        <div style="position:relative; width:100%; height:320px; background:#fff;">
            <img id="categoryMainImg" src="" alt="" style="width:100%; height:100%; object-fit:cover; clip-path: polygon(0 0, 100% 0, 100% calc(100% - 25px), 90% 100%, 80% calc(100% - 25px), 70% 100%, 60% calc(100% - 25px), 50% 100%, 40% calc(100% - 25px), 30% 100%, 20% calc(100% - 25px), 10% 100%, 0 calc(100% - 25px));">
            
            <!-- Floating Buttons -->
            <button onclick="closeModals()" style="position:absolute; top:25px; left:20px; width:40px; height:40px; border-radius:12px; border:none; background:#ff9054; color:#fff; cursor:pointer; font-size:1.2rem; box-shadow:0 5px 15px rgba(255,144,84,0.4);"><i class="fa-solid fa-chevron-left"></i></button>
            <button onclick="showToast('Added to Wishlist!')" style="position:absolute; top:25px; right:20px; width:40px; height:40px; border-radius:12px; border:2px solid #ff9054; background:transparent; color:#ff9054; cursor:pointer; font-size:1.2rem;"><i class="fa-regular fa-heart"></i></button>
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
            
            <h4 style="font-size:1.1rem; color:#222; margin-bottom:15px; font-weight:400;">Add Drinks</h4>
            <div style="display:flex; gap:15px; margin-bottom:30px;">
                <div onclick="showToast('Strawberry Splash Added!')" style="width:75px; height:75px; border-radius:16px; background:#fff; padding:6px; box-shadow:0 5px 15px rgba(0,0,0,0.04); cursor:pointer;"><img src="strawberry_splash_1784385077502.png" style="width:100%; height:100%; object-fit:cover; border-radius:10px;"></div>
                <div onclick="showToast('Vanilla Cone Added!')" style="width:75px; height:75px; border-radius:16px; background:#fff; padding:6px; box-shadow:0 5px 15px rgba(0,0,0,0.04); cursor:pointer;"><img src="icecream_category_1777660485890.png" style="width:100%; height:100%; object-fit:cover; border-radius:10px;"></div>
                <div onclick="showToast('Iced Coffee Added!')" style="width:75px; height:75px; border-radius:16px; background:#fff; padding:6px; box-shadow:0 5px 15px rgba(0,0,0,0.04); cursor:pointer;"><img src="iced_coffee_splash_1784385065567.png" style="width:100%; height:100%; object-fit:cover; border-radius:10px;"></div>
            </div>
            
            <button id="categoryAddBagBtn" style="width:100%; background:linear-gradient(90deg, #ff9054, #ff6c2c); border:none; padding:20px 25px; border-radius:35px; color:#fff; font-size:1.1rem; cursor:pointer; display:flex; justify-content:space-between; align-items:center; box-shadow:0 15px 30px rgba(255,108,44,0.3); transition: transform 0.2s;">
                <span style="font-weight:400;">Add to Cart</span>
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
        
        const addBtn = document.getElementById('categoryAddBagBtn');
        if (addBtn) addBtn.onclick = () => { 
            if(typeof addToCart === 'function') addToCart(name, price, img, currentModalQty); 
            closeModals();
        };
        
        const modalEl = document.getElementById('categoryDetailModal');
        if (modalEl) modalEl.classList.add('show');
        
        const overlayEl = document.getElementById('overlay');
        if (overlayEl) overlayEl.classList.add('show');
    }
</script>
`;

const dir = __dirname;
const htmlFiles = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

const oldModalRegex = /<div class="modal" id="categoryDetailModal"[\s\S]*?(?=<!-- AI ASSISTANT -->|<div class="ai-widget")/g;
const oldScriptRegex1 = /<script>\s*let currentModalQty = 1;\s*function changeModalQty[\s\S]*?<\/script>/g;
// older versions of the script might be inside a larger script block. We'll handle it safely.

htmlFiles.forEach(file => {
    let content = fs.readFileSync(path.join(dir, file), 'utf8');
    let modified = false;
    
    if (oldModalRegex.test(content)) {
        content = content.replace(oldModalRegex, newModalHtml + '\n    ');
        modified = true;
    }
    
    if (oldScriptRegex1.test(content)) {
        content = content.replace(oldScriptRegex1, newJs);
        modified = true;
    } else {
        // Fallback for older script injected by me manually in cakes.html etc
        // Just inject at the bottom before </body>
        // But first remove the old function definitions
        const oldDef1 = /function changeModalQty[\s\S]*?\}/g;
        const oldDef2 = /function openProductModal[\s\S]*?overlay\.classList\.add\('show'\);\s*\}/g;
        if (oldDef1.test(content) || oldDef2.test(content)) {
            content = content.replace(oldDef1, '');
            content = content.replace(oldDef2, '');
            content = content.replace('</body>', newJs + '\n</body>');
            modified = true;
        }
    }
    
    if (modified) {
        fs.writeFileSync(path.join(dir, file), content);
        console.log('Updated modal in', file);
    }
});
