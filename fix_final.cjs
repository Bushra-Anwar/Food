const fs = require('fs');
const files = ['index.html', 'cakes.html', 'donuts.html', 'pastries.html', 'icecream.html', 'gifting.html'];

files.forEach(file => {
    if (fs.existsSync(file)) {
        let content = fs.readFileSync(file, 'utf8');

        // Fix Mega Cards to be fully clickable
        // Find: <div class="mega-card"> ... <button onclick="openProductModal(...)">Add</button> </div>
        // And move the onclick to the mega-card.
        content = content.replace(/<div class="mega-card">([\s\S]*?)<button onclick="([^"]+)">[^<]*<\/button>\s*<\/div>/g, 
            '<div class="mega-card" onclick="$2" style="cursor:pointer;">$1<button>Add</button></div>');
        
        // Also fix the case where the button was Add to Cart
        content = content.replace(/<div class="mega-card">([\s\S]*?)<button onclick="addToCart([^"]+)">[^<]*<\/button>\s*<\/div>/g, 
            '<div class="mega-card" onclick="addToCart$2" style="cursor:pointer;">$1<button>Add</button></div>');

        // Fix the Modal HTML to ensure Quantity Controls exist!
        // We will just completely replace the modal HTML body to be safe
        const oldModalRegex = /<div class="modal" id="categoryDetailModal"[\s\S]*?<!-- AI ASSISTANT -->/;
        const newModalHtml = `<div class="modal" id="categoryDetailModal" style="max-width: 650px;">
        <div class="modal-header" style="position: relative;">
            <h2 class="modal-title" id="categoryModalTitle" style="font-size: 1.6rem; text-align: left; padding-right: 30px;">Product Details</h2>
            <div style="position: absolute; right: 0; top: 0; font-size: 1.5rem; cursor: pointer; color: var(--clr-text-muted);" onclick="closeModals()"><i class="fa-solid fa-xmark"></i></div>
        </div>
        <div class="category-detail-body">
            <!-- Main Product Section -->
            <div class="category-main-product" style="display: flex; gap: 20px; margin-bottom: 25px; align-items: flex-start; text-align: left;">
                <img id="categoryMainImg" src="" alt="" style="width: 180px; height: 180px; object-fit: cover; border-radius: var(--radius-md); border: 1px solid var(--clr-border);">
                <div class="category-main-info" style="flex: 1;">
                    <h3 id="categoryMainName" style="font-family: var(--font-heading); font-size: 1.4rem; margin-bottom: 8px; color: var(--clr-text-main);"></h3>
                    <p id="categoryMainDesc" style="color: var(--clr-text-muted); font-size: 0.85rem; margin-bottom: 12px; line-height: 1.4;"></p>
                    
                    <div id="categoryMainPrice" style="font-size: 1.15rem; font-weight: 700; color: var(--clr-primary); margin-bottom: 15px;"></div>
                    
                    <div style="display: flex; align-items: center; gap: 15px; margin-bottom: 15px;">
                        <span style="font-size:0.9rem; font-weight:bold;">Quantity:</span>
                        <div style="display: flex; align-items: center; border: 1px solid var(--clr-border); border-radius: 20px; overflow: hidden; background:#f9f9f9;">
                            <button id="modalQtyMinus" onclick="changeModalQty(-1)" style="padding: 5px 15px; background: transparent; border: none; cursor: pointer; font-weight: bold; font-size:1.2rem;">-</button>
                            <span id="modalQtyVal" style="padding: 5px 15px; font-weight: bold; width:30px; text-align:center;">1</span>
                            <button id="modalQtyPlus" onclick="changeModalQty(1)" style="padding: 5px 15px; background: transparent; border: none; cursor: pointer; font-weight: bold; font-size:1.2rem;">+</button>
                        </div>
                    </div>

                    <div style="display: flex; gap: 10px;">
                        <button class="btn-checkout" id="categoryAddBagBtn" style="padding: 10px 15px; font-size: 0.85rem; flex: 1;">Add to Bag</button>
                        <button class="btn-checkout" id="categoryBuyNowBtn" style="padding: 10px 15px; font-size: 0.85rem; flex: 1; background: var(--clr-text-main);">Buy Now</button>
                    </div>
                </div>
            </div>
            
            <hr style="border: 0; border-top: 1px solid var(--clr-border); margin: 20px 0;">
            
            <!-- Recommended Section -->
            <h4 style="font-size: 0.95rem; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 15px; color: var(--clr-text-main); text-align: left;">Recommended For You</h4>
            <div class="category-recommended-product" style="display: flex; gap: 20px; align-items: center; background: var(--clr-bg-alt); padding: 15px; border-radius: var(--radius-md); text-align: left;">
                <img id="categoryRecImg" src="" alt="" style="width: 90px; height: 90px; object-fit: cover; border-radius: var(--radius-md); border: 1px solid var(--clr-border);">
                <div style="flex: 1;">
                    <h5 id="categoryRecName" style="font-size: 0.9rem; font-weight: 700; margin-bottom: 4px;"></h5>
                    <p style="color: var(--clr-text-muted); font-size: 0.75rem; margin-bottom: 8px;">Curated pairing recommendation</p>
                    <div id="categoryRecPrice" style="font-size: 0.95rem; font-weight: 700; color: var(--clr-primary);"></div>
                </div>
                <button class="btn-checkout" id="categoryRecAddBtn" style="padding: 8px 15px; font-size: 0.8rem; width: auto; background: var(--clr-accent-gold);">Add to Bag</button>
            </div>
        </div>
    </div>

    <!-- AI ASSISTANT -->`;
        
        content = content.replace(oldModalRegex, newModalHtml);
        
        fs.writeFileSync(file, content);
        if (fs.existsSync('frontend/' + file)) {
            fs.writeFileSync('frontend/' + file, content);
        }
        console.log('Fixed Mega Cards and Modal HTML in ' + file);
    }
});
