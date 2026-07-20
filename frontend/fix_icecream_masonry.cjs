const fs = require('fs');
const file = 'icecream.html';

if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    
    const startTag = '<div class="masonry-container">';
    const endTagStr = '<!-- OVERLAYS -->';
    const startIdx = content.indexOf(startTag);
    const endIdx = content.indexOf(endTagStr);
    
    if (startIdx !== -1 && endIdx !== -1) {
        const newMasonry = `<div class="masonry-container">
        
        <div class="masonry-item" onclick="openProductModal('Chocolate Fudge Scoop', 'Rich dark chocolate fudge ice cream.', 149, 'icecream_category_1777660485890.png')">
            <img src="icecream_category_1777660485890.png" alt="Chocolate Ice Cream" style="height: 250px;">
            <div class="masonry-overlay">
                <div class="masonry-title">Choco Fudge Scoop</div>
                <div class="masonry-price">₹149</div>
            </div>
        </div>

        <div class="masonry-item" onclick="openProductModal('Strawberry Swirl', 'Fresh strawberry ice cream swirl.', 129, 'recommended_icecream.png')">
            <img src="recommended_icecream.png" alt="Strawberry Ice Cream" style="height: 350px;">
            <div class="masonry-overlay">
                <div class="masonry-title">Strawberry Swirl</div>
                <div class="masonry-price">₹129</div>
            </div>
        </div>

        <div class="masonry-item masonry-banner" style="height: 300px; background: linear-gradient(135deg, #fbc2eb 0%, #a6c1ee 100%);" onclick="window.location.href='icecream.html'">
            <h2>Ice Cream Tubs</h2>
            <p>Buy 2 Get 1 Free</p>
            <button style="margin-top: 15px; padding: 10px 20px; border-radius: 20px; border:none; cursor: pointer; font-weight: bold; color: #333;">Shop Now</button>
        </div>

        <div class="masonry-item" onclick="openProductModal('Salted Caramel Cone', 'Salted caramel infused vanilla.', 169, 'icecream_category_1777660485890.png')">
            <img src="icecream_category_1777660485890.png" alt="Caramel Ice Cream" style="height: 400px;">
            <div class="masonry-overlay">
                <div class="masonry-title">Salted Caramel Cone</div>
                <div class="masonry-price">₹169</div>
            </div>
        </div>
        
        <div class="masonry-item" onclick="openProductModal('Mango Sorbet', 'Refreshing mango fruit sorbet.', 119, 'recommended_icecream.png')">
            <img src="recommended_icecream.png" alt="Mango Sorbet" style="height: 280px;">
            <div class="masonry-overlay">
                <div class="masonry-title">Mango Sorbet</div>
                <div class="masonry-price">₹119</div>
            </div>
        </div>

    </div>
    
`;
        content = content.substring(0, startIdx) + newMasonry + content.substring(endIdx);
        fs.writeFileSync(file, content, 'utf8');
        console.log("Updated masonry in icecream.html");
    }
}
