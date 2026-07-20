const fs = require('fs');

const ratingHtml = `
                <div class="masonry-stats" style="display:flex; justify-content:space-between; align-items:center; margin-top:5px; font-size:0.9rem;">
                    <div style="color:#ffd700;"><i class="fa-solid fa-star"></i> 4.8 (120)</div>
                    <div style="color:white; cursor:pointer;" onclick="event.stopPropagation(); this.style.color='#ff4d4d';"><i class="fa-solid fa-heart"></i></div>
                </div>`;

const globalModalLogic = `
        function openProductModal(name, desc, price, img) {
            document.getElementById('categoryModalTitle').textContent = 'Product Details';
            document.getElementById('categoryMainName').textContent = name;
            document.getElementById('categoryMainImg').src = img;
            document.getElementById('categoryMainImg').alt = name;
            document.getElementById('categoryMainDesc').textContent = desc || 'A premium selection crafted with the finest ingredients.';
            document.getElementById('categoryMainPrice').textContent = \`₹\${price}\`;
            
            // Set random recommended product
            document.getElementById('categoryRecName').textContent = 'Chef\\'s Special Pairing';
            document.getElementById('categoryRecImg').src = img; 
            document.getElementById('categoryRecPrice').textContent = \`₹\${Math.floor(price * 0.8)}\`;
            
            document.getElementById('categoryAddBagBtn').onclick = () => {
                addToCart(name, price, img);
            };
            
            document.getElementById('categoryBuyNowBtn').onclick = () => {
                addToCart(name, price, img);
                closeModals();
                openCheckout();
            };
            
            document.getElementById('categoryRecAddBtn').onclick = () => {
                addToCart('Chef\\'s Special Pairing', Math.floor(price * 0.8), img);
            };
            
            document.getElementById('categoryDetailModal').classList.add('show');
            overlay.classList.add('show');
        }
`;

const itemsData = {
    'gifting.html': `
    <div style="text-align: center; padding: 40px 20px 0;">
        <h1 style="font-size: 2.8rem; font-family: var(--font-heading, sans-serif); color: #d6336c;">Gifting & Hampers</h1>
        <p style="color: #666; margin-top: 10px; font-size: 1.1rem;">Aesthetic Pinterest-style curated hampers for your loved ones.</p>
    </div>

    <!-- PINTEREST MASONRY GRID -->
    <div class="masonry-container">
        
        <div class="masonry-item" onclick="openProductModal('Luxury Silk Hamper', 'A luxurious and aesthetic gift hamper box filled with premium chocolates, macarons, and fresh flowers, tied with a beautiful silk ribbon.', 1999, 'gifting_hamper_luxury_1784314070973.png')">
            <img src="gifting_hamper_luxury_1784314070973.png" alt="Luxury Hamper" style="height: 400px;">
            <div class="masonry-overlay">
                <div class="masonry-title">Luxury Silk Hamper</div>
                <div class="masonry-price">₹1999</div>
                ${ratingHtml}
            </div>
        </div>

        <div class="masonry-item masonry-banner" style="height: 250px; background: linear-gradient(135deg, #fccb90 0%, #d57eeb 100%);">
            <h2>Perfect Surprise</h2>
            <p>Valentine's Collection</p>
        </div>

        <div class="masonry-item" onclick="openProductModal('Minimal Birthday Set', 'A minimal and elegant birthday gift set, featuring a minimalist cake, a handmade greeting card, and aesthetic party decor.', 1499, 'gifting_birthday_set_1784314083029.png')">
            <img src="gifting_birthday_set_1784314083029.png" alt="Birthday Set" style="height: 380px;">
            <div class="masonry-overlay">
                <div class="masonry-title">Minimal Birthday Set</div>
                <div class="masonry-price">₹1499</div>
                ${ratingHtml}
            </div>
        </div>

        <div class="masonry-item" onclick="openProductModal('Romantic Teddy Combo', 'A cozy teddy bear sitting next to a box of artisan chocolates and red roses, romantic vibe.', 1299, 'gifting_teddy_combo_1784314096432.png')">
            <img src="gifting_teddy_combo_1784314096432.png" alt="Teddy Combo" style="height: 300px;">
            <div class="masonry-overlay">
                <div class="masonry-title">Romantic Teddy Combo</div>
                <div class="masonry-price">₹1299</div>
                ${ratingHtml}
            </div>
        </div>

        <div class="masonry-item" onclick="openProductModal('Corporate Executive Box', 'An elegant corporate gift box revealing a premium coffee mug, gourmet coffee beans, and a luxury pen.', 2499, 'gifting_corporate_box_1784314108213.png')">
            <img src="gifting_corporate_box_1784314108213.png" alt="Corporate Box" style="height: 350px;">
            <div class="masonry-overlay">
                <div class="masonry-title">Corporate Executive Box</div>
                <div class="masonry-price">₹2499</div>
                ${ratingHtml}
            </div>
        </div>
        
        <div class="masonry-item" onclick="openProductModal('Macaron Delight Box', 'Premium box of 12 assorted French macarons in delicate pastel hues.', 999, 'macaron_deal_1777660573385.png')">
            <img src="macaron_deal_1777660573385.png" alt="Macaron Box" style="height: 250px;">
            <div class="masonry-overlay">
                <div class="masonry-title">Macaron Delight Box</div>
                <div class="masonry-price">₹999</div>
                ${ratingHtml}
            </div>
        </div>

        <div class="masonry-item" onclick="openProductModal('Classic Chocolate Hamper', 'An indulgent basket of assorted imported chocolates, truffles, and a rich chocolate bar.', 1199, 'brownie_deal_1777660550780.png')">
            <img src="brownie_deal_1777660550780.png" alt="Chocolate Hamper" style="height: 280px;">
            <div class="masonry-overlay">
                <div class="masonry-title">Classic Chocolate Hamper</div>
                <div class="masonry-price">₹1199</div>
                ${ratingHtml}
            </div>
        </div>
        
        <div class="masonry-item masonry-banner" style="height: 280px; background: #222;">
            <h2>Custom Hampers</h2>
            <p>Build Your Own Box</p>
            <button style="margin-top: 15px; padding: 10px 20px; border-radius: 20px; border:none; cursor: pointer; font-weight: bold;">Contact Us</button>
        </div>

    </div>
    `,
    
    'cakes.html': `
    <div style="text-align: center; padding: 40px 20px 0;">
        <h1 style="font-size: 2.5rem; font-family: var(--font-heading, sans-serif);">Bespoke Cakes</h1>
        <p style="color: #666; margin-top: 10px;">Aesthetically pleasing, Pinterest-perfect cakes for every occasion.</p>
    </div>

    <div class="masonry-container">
        
        <div class="masonry-item" onclick="openProductModal('Chocolate Truffle Core', 'Rich chocolate sponge layered with dense chocolate truffle ganache.', 799, 'cake_category_1777660447849.png')">
            <img src="cake_category_1777660447849.png" alt="Chocolate Truffle" style="height: 400px;">
            <div class="masonry-overlay">
                <div class="masonry-title">Chocolate Truffle Core</div>
                <div class="masonry-price">₹799</div>
                ${ratingHtml}
            </div>
        </div>

        <div class="masonry-item masonry-banner" style="height: 200px; background: linear-gradient(135deg, #fbc2eb 0%, #a6c1ee 100%);">
            <h2>Wedding Collection</h2>
            <p>Elegant & Floral</p>
        </div>

        <div class="masonry-item" onclick="openProductModal('Premium Red Velvet', 'Moist red velvet sponge with smooth cream cheese frosting layers.', 899, 'recommended_cake.png')">
            <img src="recommended_cake.png" alt="Red Velvet" style="height: 300px;">
            <div class="masonry-overlay">
                <div class="masonry-title">Premium Red Velvet</div>
                <div class="masonry-price">₹899</div>
                ${ratingHtml}
            </div>
        </div>

        <div class="masonry-item" onclick="openProductModal('Classic Black Forest', 'Traditional German chocolate sponge with cherry compote and whipped cream.', 649, 'cake_category_1777660447849.png')">
            <img src="cake_category_1777660447849.png" alt="Black Forest" style="height: 250px;">
            <div class="masonry-overlay">
                <div class="masonry-title">Classic Black Forest</div>
                <div class="masonry-price">₹649</div>
                ${ratingHtml}
            </div>
        </div>
        
        <div class="masonry-item" onclick="openProductModal('Mango Fresh Cream', 'Vanilla sponge cake with fresh alphonso mango chunks and cream.', 749, 'recommended_cake.png')">
            <img src="recommended_cake.png" alt="Mango Fresh Cream" style="height: 380px;">
            <div class="masonry-overlay">
                <div class="masonry-title">Mango Fresh Cream</div>
                <div class="masonry-price">₹749</div>
                ${ratingHtml}
            </div>
        </div>

        <div class="masonry-item" onclick="openProductModal('Vanilla Buttercream Floral', 'Classic vanilla cake piped with beautiful buttercream flowers.', 999, 'cake_category_1777660447849.png')">
            <img src="cake_category_1777660447849.png" alt="Vanilla Floral" style="height: 320px;">
            <div class="masonry-overlay">
                <div class="masonry-title">Vanilla Floral Cake</div>
                <div class="masonry-price">₹999</div>
                ${ratingHtml}
            </div>
        </div>

        <div class="masonry-item masonry-banner" style="height: 280px; background: #333;">
            <h2>Custom Designs</h2>
            <p>Tell us your vision</p>
            <button style="margin-top: 15px; padding: 10px 20px; border-radius: 20px; border:none; cursor: pointer; font-weight: bold;">Order Now</button>
        </div>

        <div class="masonry-item" onclick="openProductModal('Bento Cake Mini', 'Cute minimalist Korean bento cake in a clamshell box.', 399, 'recommended_cake.png')">
            <img src="recommended_cake.png" alt="Bento Cake" style="height: 260px;">
            <div class="masonry-overlay">
                <div class="masonry-title">Minimalist Bento Cake</div>
                <div class="masonry-price">₹399</div>
                ${ratingHtml}
            </div>
        </div>

    </div>
    `,
    
    'icecream.html': `
    <div style="text-align: center; padding: 40px 20px 0;">
        <h1 style="font-size: 2.5rem; font-family: var(--font-heading, sans-serif);">Premium Ice Cream</h1>
        <p style="color: #666; margin-top: 10px;">Discover our hand-crafted, Pinterest-worthy frozen delights.</p>
    </div>

    <div class="masonry-container">
        
        <div class="masonry-item" onclick="openProductModal('Classic Vanilla Cone', 'Rich and creamy artisanal ice cream made with real Madagascar vanilla beans.', 199, 'icecream_category_1777660485890.png')">
            <img src="icecream_category_1777660485890.png" alt="Vanilla Cone" style="height: 350px;">
            <div class="masonry-overlay">
                <div class="masonry-title">Classic Vanilla Cone</div>
                <div class="masonry-price">₹199</div>
                ${ratingHtml}
            </div>
        </div>

        <div class="masonry-item masonry-banner" style="height: 250px; background: linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%); color: #333;">
            <h2>Summer Scoop</h2>
            <p>Buy 1 Get 1 Free</p>
        </div>

        <div class="masonry-item" onclick="openProductModal('Alphonso Mango Gelato', 'Authentic Italian style gelato infused with real fresh alphonso mangoes.', 229, 'recommended_icecream.png')">
            <img src="recommended_icecream.png" alt="Mango Gelato" style="height: 280px;">
            <div class="masonry-overlay">
                <div class="masonry-title">Alphonso Mango Gelato</div>
                <div class="masonry-price">₹229</div>
                ${ratingHtml}
            </div>
        </div>

        <div class="masonry-item" onclick="openProductModal('Belgian Dark Chocolate', 'Intense dark chocolate ice cream with chocolate shavings.', 249, 'icecream_category_1777660485890.png')">
            <img src="icecream_category_1777660485890.png" alt="Dark Choc" style="height: 320px;">
            <div class="masonry-overlay">
                <div class="masonry-title">Belgian Dark Chocolate</div>
                <div class="masonry-price">₹249</div>
                ${ratingHtml}
            </div>
        </div>

        <div class="masonry-item" onclick="openProductModal('Mixed Dessert Sundae', 'A towering sundae with 3 scoops of ice cream, nuts, chocolate syrup, and cherry.', 349, 'recommended_icecream.png')">
            <img src="recommended_icecream.png" alt="Dessert Bowl" style="height: 400px;">
            <div class="masonry-overlay">
                <div class="masonry-title">Mixed Dessert Sundae</div>
                <div class="masonry-price">₹349</div>
                ${ratingHtml}
            </div>
        </div>
        
        <div class="masonry-item" onclick="openProductModal('Strawberry Cheesecake Scoop', 'Strawberry ice cream swirled with cream cheese and graham cracker bits.', 279, 'icecream_category_1777660485890.png')">
            <img src="icecream_category_1777660485890.png" alt="Strawberry Scoop" style="height: 260px;">
            <div class="masonry-overlay">
                <div class="masonry-title">Strawberry Cheesecake Scoop</div>
                <div class="masonry-price">₹279</div>
                ${ratingHtml}
            </div>
        </div>

        <div class="masonry-item" onclick="openProductModal('Cookies & Cream', 'Vanilla ice cream loaded with crushed chocolate sandwich cookies.', 219, 'recommended_icecream.png')">
            <img src="recommended_icecream.png" alt="Cookies and Cream" style="height: 290px;">
            <div class="masonry-overlay">
                <div class="masonry-title">Cookies & Cream Scoop</div>
                <div class="masonry-price">₹219</div>
                ${ratingHtml}
            </div>
        </div>
        
        <div class="masonry-item masonry-banner" style="height: 280px; background: #333;">
            <h2>Gelato Fest</h2>
            <p>New Flavors Added</p>
            <button style="margin-top: 15px; padding: 10px 20px; border-radius: 20px; border:none; cursor: pointer; font-weight: bold;">Explore All</button>
        </div>
    </div>
    `,
    
    'pastries.html': `
    <div style="text-align: center; padding: 40px 20px 0;">
        <h1 style="font-size: 2.5rem; font-family: var(--font-heading, sans-serif);">Artisanal Pastries</h1>
        <p style="color: #666; margin-top: 10px;">Discover our hand-crafted, Pinterest-worthy pastry collection.</p>
    </div>

    <div class="masonry-container">
        
        <div class="masonry-item" onclick="openProductModal('Butter Croissant', 'Flaky, golden-brown puff pastry baked fresh this morning.', 149, 'pastry_category_1777660510169.png')">
            <img src="pastry_category_1777660510169.png" alt="Croissant" style="height: 300px;">
            <div class="masonry-overlay">
                <div class="masonry-title">Butter Croissant</div>
                <div class="masonry-price">₹149</div>
                ${ratingHtml}
            </div>
        </div>

        <div class="masonry-item masonry-banner" style="height: 200px;">
            <h2>Fresh Pastries</h2>
            <p>Baked daily morning</p>
        </div>

        <div class="masonry-item" onclick="openProductModal('Pain au Chocolat', 'Classic French pastry filled with premium dark chocolate batons.', 189, 'recommended_pastry.png')">
            <img src="recommended_pastry.png" alt="Pain au Chocolat" style="height: 400px;">
            <div class="masonry-overlay">
                <div class="masonry-title">Pain au Chocolat</div>
                <div class="masonry-price">₹189</div>
                ${ratingHtml}
            </div>
        </div>

        <div class="masonry-item" onclick="openProductModal('Truffle Pastry Slice', 'Rich chocolate cake slice frosted with decadent chocolate ganache.', 249, 'cake_category_1777660447849.png')">
            <img src="cake_category_1777660447849.png" alt="Chocolate Slice" style="height: 250px;">
            <div class="masonry-overlay">
                <div class="masonry-title">Truffle Pastry Slice</div>
                <div class="masonry-price">₹249</div>
                ${ratingHtml}
            </div>
        </div>

        <div class="masonry-item" onclick="openProductModal('French Macarons Box', 'An assortment of delicate macarons in pistachio, strawberry, and chocolate flavors.', 399, 'macaron_deal_1777660573385.png')">
            <img src="macaron_deal_1777660573385.png" alt="Macarons" style="height: 350px;">
            <div class="masonry-overlay">
                <div class="masonry-title">French Macarons Box</div>
                <div class="masonry-price">₹399</div>
                ${ratingHtml}
            </div>
        </div>
        
        <div class="masonry-item masonry-banner" style="height: 300px; background: #333;">
            <h2>Premium Collection</h2>
            <p>Min 20% OFF today</p>
            <button style="margin-top: 15px; padding: 10px 20px; border-radius: 20px; border:none; cursor: pointer; font-weight: bold;">Explore All</button>
        </div>

        <div class="masonry-item" onclick="openProductModal('Red Velvet Cupcake', 'A delightful and moist red velvet cupcake crowned with cream cheese frosting.', 129, 'cupcake_deal_1777660591014.png')">
            <img src="cupcake_deal_1777660591014.png" alt="Cupcake" style="height: 280px;">
            <div class="masonry-overlay">
                <div class="masonry-title">Red Velvet Cupcake</div>
                <div class="masonry-price">₹129</div>
                ${ratingHtml}
            </div>
        </div>
        
        <div class="masonry-item" onclick="openProductModal('New York Cheesecake Slice', 'Classic creamy NY style baked cheesecake with a graham crust.', 299, 'recommended_pastry.png')">
            <img src="recommended_pastry.png" alt="Cheesecake" style="height: 320px;">
            <div class="masonry-overlay">
                <div class="masonry-title">NY Cheesecake Slice</div>
                <div class="masonry-price">₹299</div>
                ${ratingHtml}
            </div>
        </div>

    </div>
    `,
    
    'donuts.html': `
    <div style="text-align: center; padding: 40px 20px 0;">
        <h1 style="font-size: 2.5rem; font-family: var(--font-heading, sans-serif);">Gourmet Donuts</h1>
        <p style="color: #666; margin-top: 10px;">Sweet, glazed, and visually stunning Pinterest donuts.</p>
    </div>

    <div class="masonry-container">
        
        <div class="masonry-item" onclick="openProductModal('Belgian Choc Donut', 'Soft fluffy donut dipped in melted Belgian dark chocolate.', 149, 'donut_category_1777660467553.png')">
            <img src="donut_category_1777660467553.png" alt="Chocolate Donut" style="height: 250px;">
            <div class="masonry-overlay">
                <div class="masonry-title">Belgian Choc Donut</div>
                <div class="masonry-price">₹149</div>
                ${ratingHtml}
            </div>
        </div>

        <div class="masonry-item" onclick="openProductModal('Strawberry Glaze', 'Freshly baked donut with sweet pink strawberry glaze.', 129, 'recommended_donut.png')">
            <img src="recommended_donut.png" alt="Strawberry Donut" style="height: 350px;">
            <div class="masonry-overlay">
                <div class="masonry-title">Strawberry Glaze</div>
                <div class="masonry-price">₹129</div>
                ${ratingHtml}
            </div>
        </div>

        <div class="masonry-item masonry-banner" style="height: 300px; background: linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%);">
            <h2>Donut Boxes</h2>
            <p>Buy 2 Get 1 Free</p>
            <button style="margin-top: 15px; padding: 10px 20px; border-radius: 20px; border:none; cursor: pointer; font-weight: bold; color: #333;">Shop Now</button>
        </div>

        <div class="masonry-item" onclick="openProductModal('Salted Caramel Ring', 'Donut topped with sea salt caramel and butterscotch crumbles.', 169, 'donut_category_1777660467553.png')">
            <img src="donut_category_1777660467553.png" alt="Caramel Donut" style="height: 400px;">
            <div class="masonry-overlay">
                <div class="masonry-title">Salted Caramel Ring</div>
                <div class="masonry-price">₹169</div>
                ${ratingHtml}
            </div>
        </div>
        
        <div class="masonry-item" onclick="openProductModal('Rainbow Sprinkles', 'Classic vanilla glaze with colorful rainbow sprinkles.', 119, 'recommended_donut.png')">
            <img src="recommended_donut.png" alt="Sprinkles Donut" style="height: 280px;">
            <div class="masonry-overlay">
                <div class="masonry-title">Rainbow Sprinkles</div>
                <div class="masonry-price">₹119</div>
                ${ratingHtml}
            </div>
        </div>
        
        <div class="masonry-item" onclick="openProductModal('Nutella Filled Donut', 'Sugar-coated donut bursting with creamy Nutella filling.', 189, 'donut_category_1777660467553.png')">
            <img src="donut_category_1777660467553.png" alt="Nutella Donut" style="height: 320px;">
            <div class="masonry-overlay">
                <div class="masonry-title">Nutella Filled Donut</div>
                <div class="masonry-price">₹189</div>
                ${ratingHtml}
            </div>
        </div>
        
        <div class="masonry-item" onclick="openProductModal('Boston Cream', 'Custard filled donut with a rich chocolate glaze topping.', 179, 'recommended_donut.png')">
            <img src="recommended_donut.png" alt="Boston Cream Donut" style="height: 260px;">
            <div class="masonry-overlay">
                <div class="masonry-title">Boston Cream</div>
                <div class="masonry-price">₹179</div>
                ${ratingHtml}
            </div>
        </div>

    </div>
    `
};

for (const [filename, newContent] of Object.entries(itemsData)) {
    if (fs.existsSync(filename)) {
        let html = fs.readFileSync(filename, 'utf8');
        
        // 1. Replace the masonry container completely
        const start = html.indexOf('<div style="text-align: center; padding: 40px 20px 0;">');
        const end = html.indexOf('<!-- OVERLAYS -->');
        
        if (start !== -1 && end !== -1) {
            html = html.substring(0, start) + newContent + '\n\n' + html.substring(end);
        }
        
        // 2. Inject global modal function in script tag
        if (!html.includes('function openProductModal')) {
            html = html.replace('// STATE', globalModalLogic + '\n        // STATE');
        }
        
        fs.writeFileSync(filename, html);
        
        // Also update in frontend folder
        if (fs.existsSync('frontend/' + filename)) {
            fs.writeFileSync('frontend/' + filename, html);
        }
        console.log('Updated ' + filename);
    }
}
