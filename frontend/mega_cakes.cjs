const fs = require('fs');

let html = fs.readFileSync('cakes.html', 'utf8');

const megaCSS = `
/* MEGA CAKE CSS */
.mega-header {
    background: repeating-linear-gradient(
        90deg,
        #f8b1c4,
        #f8b1c4 40px,
        #f49eb4 40px,
        #f49eb4 80px
    );
    padding: 80px 5%;
    text-align: center;
    color: white;
    border-bottom: 15px solid #fff;
    border-radius: 0 0 40px 40px;
    box-shadow: 0 10px 30px rgba(248,177,196,0.3);
    position: relative;
    margin-bottom: 20px;
}
.mega-header-logo {
    width: 150px;
    margin-bottom: 20px;
    filter: drop-shadow(0 5px 10px rgba(0,0,0,0.2));
}
.mega-header h1 {
    font-family: 'Brush Script MT', cursive, 'Dancing Script', sans-serif;
    font-size: 5.5rem;
    margin-bottom: 10px;
    text-shadow: 2px 2px 4px rgba(0,0,0,0.1);
    color: #fff;
    font-weight: normal;
}
.mega-header p {
    font-size: 1.8rem;
    font-family: 'Times New Roman', serif;
    font-style: italic;
    margin-bottom: 50px;
    color: #fff;
}
.mega-header-img {
    display: flex;
    justify-content: center;
    margin-bottom: -120px;
}
.mega-header-img img {
    width: 250px;
    height: 250px;
    object-fit: cover;
    border-radius: 50%;
    border: 12px solid #fff;
    box-shadow: 0 15px 30px rgba(0,0,0,0.15);
    margin: 0 -20px;
    z-index: 1;
    transition: 0.4s;
    cursor: pointer;
}
.mega-header-img img:hover { transform: translateY(-15px) scale(1.05); z-index: 10; }

.mega-categories {
    padding: 150px 5% 60px;
    display: flex;
    justify-content: center;
    gap: 40px;
    background: #fff;
    flex-wrap: wrap;
}
.mega-cat-banner {
    position: relative;
    width: 350px;
    height: 180px;
    overflow: hidden;
    cursor: pointer;
    box-shadow: 0 10px 20px rgba(0,0,0,0.05);
}
.mega-cat-banner img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: 0.5s;
    opacity: 0.9;
}
.mega-cat-banner:hover img { transform: scale(1.1); opacity: 1; }
.mega-cat-label {
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    background: #fff;
    padding: 12px 40px;
    font-family: 'Times New Roman', serif;
    font-size: 1.3rem;
    color: #444;
    box-shadow: 0 5px 15px rgba(0,0,0,0.1);
    white-space: nowrap;
}

.mega-products-section {
    padding: 80px 5%;
    background: #fdfafb;
    text-align: center;
}
.mega-section-title {
    font-family: 'Times New Roman', serif;
    font-size: 2.5rem;
    color: #7a6e6b;
    margin-bottom: 50px;
    text-transform: uppercase;
    letter-spacing: 3px;
}
.mega-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 40px;
    max-width: 1200px;
    margin: 0 auto;
}
.mega-card {
    background: #fff;
    padding: 20px;
    border-radius: 15px;
    box-shadow: 0 5px 20px rgba(0,0,0,0.04);
    cursor: pointer;
    transition: 0.3s;
    border: 1px solid #f4ecef;
}
.mega-card:hover { transform: translateY(-10px); box-shadow: 0 15px 30px rgba(248,177,196,0.25); border-color: #f8b1c4; }
.mega-card-img-wrap {
    background: #fde8ed;
    padding: 30px;
    margin-bottom: 25px;
    border-radius: 10px;
    height: 250px;
    display: flex;
    align-items: center;
    justify-content: center;
}
.mega-card img {
    width: 180px;
    height: 180px;
    object-fit: cover;
    border-radius: 50%;
    box-shadow: 0 15px 25px rgba(0,0,0,0.15);
}
.mega-card h4 {
    font-family: 'Times New Roman', serif;
    font-size: 1.6rem;
    color: #444;
    margin-bottom: 8px;
    font-weight: normal;
}
.mega-card p {
    color: #888;
    font-size: 1.1rem;
}

.mega-popular {
    padding: 100px 5%;
    background: #fff;
    text-align: center;
}
.mega-popular-title {
    font-family: 'Brush Script MT', cursive, 'Dancing Script', sans-serif;
    font-size: 4.5rem;
    color: #e57390;
    margin-bottom: 60px;
    font-weight: normal;
}
.mega-popular-title::before, .mega-popular-title::after {
    content: " { ";
    color: #f49eb4;
}
.mega-popular-title::after {
    content: " } ";
}
.mega-popular-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 60px;
    max-width: 1200px;
    margin: 0 auto;
}
.mega-pop-item {
    position: relative;
    cursor: pointer;
    transition: 0.3s;
}
.mega-pop-item:hover { transform: translateY(-10px); }
.mega-price-tag {
    position: absolute;
    top: -10px;
    left: 20px;
    background: #e57390;
    color: #fff;
    width: 75px;
    height: 75px;
    border-radius: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    font-size: 1.2rem;
    box-shadow: 0 5px 15px rgba(229,115,144,0.4);
    z-index: 2;
    border: 3px solid #fff;
}
.mega-price-tag span { font-size: 0.8rem; font-weight: normal; }
.mega-pop-item img {
    width: 100%;
    height: 300px;
    object-fit: cover;
    margin-bottom: 25px;
    border-radius: 15px;
    border-bottom: 5px solid #e57390;
}
.mega-pop-item h4 {
    font-family: 'Brush Script MT', cursive, 'Dancing Script', sans-serif;
    font-size: 3rem;
    color: #e57390;
    margin-bottom: 10px;
    font-weight: normal;
}
.mega-pop-item p {
    color: #666;
    font-size: 1rem;
    line-height: 1.5;
}
`;

const megaHTML = `
    <!-- HEADER SECTION (Sweets Cupcake Theme) -->
    <div class="mega-header">
        <h1>Premium Sweets</h1>
        <p>We Implement Your Delicious Dreams...</p>
        
        <div class="mega-header-img">
            <img src="cake_category_1777660447849.png" alt="Chocolate Truffle" onclick="openProductModal('Chocolate Truffle', 'Rich dark chocolate layers.', 899, 'cake_category_1777660447849.png')">
            <img src="blueberry_cheesecake_1784385282085.png" alt="Berry Cake" onclick="openProductModal('Berry Cheesecake', 'Sweet and tangy berry delight.', 1299, 'blueberry_cheesecake_1784385282085.png')" style="width:280px; height:280px; z-index:2; margin-top:-15px;">
            <img src="recommended_cake.png" alt="Red Velvet" onclick="openProductModal('Red Velvet', 'Classic red velvet perfection.', 999, 'recommended_cake.png')">
        </div>
    </div>

    <!-- CATEGORIES SECTION (Sweet Jane Theme) -->
    <div class="mega-categories">
        <div class="mega-cat-banner" onclick="openProductModal('Party Cupcake Box', 'A box of 6 assorted party cupcakes.', 599, 'cupcake_deal_1777660591014.png')">
            <img src="cupcake_deal_1777660591014.png" alt="Party Cupcakes">
            <div class="mega-cat-label">Party Cupcakes</div>
        </div>
        <div class="mega-cat-banner" onclick="openProductModal('Choco Cake Deluxe', 'Triple chocolate layered cake.', 1499, 'cake_category_1777660447849.png')">
            <img src="cake_category_1777660447849.png" alt="Choco Cakes">
            <div class="mega-cat-label">Choco Cakes</div>
        </div>
        <div class="mega-cat-banner" onclick="openProductModal('Wedding Tier Cake', 'Elegant white wedding cake.', 2999, 'recommended_cake.png')">
            <img src="recommended_cake.png" alt="Wedding Cakes">
            <div class="mega-cat-label">Wedding Cakes</div>
        </div>
    </div>

    <!-- PRODUCTS GRID (Bakery Nam Theme) -->
    <div class="mega-products-section">
        <h2 class="mega-section-title">Product</h2>
        <div class="mega-grid">
            <div class="mega-card" onclick="openProductModal('Raspberry Biscuit', 'Sweet raspberry filled biscuit.', 149, 'strawberry_splash_1784385077502.png')">
                <div class="mega-card-img-wrap">
                    <img src="strawberry_splash_1784385077502.png" alt="Raspherry">
                </div>
                <h4>Raspherry</h4>
                <p>₹149</p>
            </div>
            <div class="mega-card" onclick="openProductModal('Boakuir Tart', 'Crispy fruit tart.', 199, 'blueberry_cheesecake_1784385282085.png')">
                <div class="mega-card-img-wrap">
                    <img src="blueberry_cheesecake_1784385282085.png" alt="Boakuir">
                </div>
                <h4>Boakuir</h4>
                <p>₹199</p>
            </div>
            <div class="mega-card" onclick="openProductModal('Borinss Cookie', 'Almond topped cookie.', 129, 'pastry_category_1777660510169.png')">
                <div class="mega-card-img-wrap">
                    <img src="pastry_category_1777660510169.png" alt="Borinss">
                </div>
                <h4>Borinss</h4>
                <p>₹129</p>
            </div>
            <div class="mega-card" onclick="openProductModal('Yagont Pastry', 'Creamy vanilla filled pastry.', 159, 'elegant_croissant_1784385566982.png')">
                <div class="mega-card-img-wrap">
                    <img src="elegant_croissant_1784385566982.png" alt="Yagont">
                </div>
                <h4>Yagont</h4>
                <p>₹159</p>
            </div>
            <div class="mega-card" onclick="openProductModal('Suplots Roll', 'Cinnamon sugar roll.', 139, 'croissant_splash_1784385246079.png')">
                <div class="mega-card-img-wrap">
                    <img src="croissant_splash_1784385246079.png" alt="Suplots">
                </div>
                <h4>Suplots</h4>
                <p>₹139</p>
            </div>
            <div class="mega-card" onclick="openProductModal('Brants Chocolate', 'Thick chocolate biscuit.', 179, 'donut_category_1777660467553.png')">
                <div class="mega-card-img-wrap">
                    <img src="donut_category_1777660467553.png" alt="Brants">
                </div>
                <h4>Brants</h4>
                <p>₹179</p>
            </div>
        </div>
    </div>

    <!-- POPULAR SECTION (Sweets Cupcake Theme) -->
    <div class="mega-popular">
        <h2 class="mega-popular-title">Most Popular Cupcakes</h2>
        <div class="mega-popular-grid">
            <div class="mega-pop-item" onclick="openProductModal('Kimi Cupcake', 'Kiwi and melon infused cream.', 249, 'recommended_donut.png')">
                <div class="mega-price-tag">₹249</div>
                <img src="recommended_donut.png" alt="Kimi Cupcake">
                <h4>Kimi Cupcake</h4>
                <p>Cupcake nhân kiwi thơm mát.</p>
            </div>
            <div class="mega-pop-item" onclick="openProductModal('Red Velvet', 'Classic red velvet with cream cheese.', 299, 'recommended_cake.png')">
                <div class="mega-price-tag">₹299</div>
                <img src="recommended_cake.png" alt="Red Velvet">
                <h4>Red Velvet</h4>
                <p>Red Velvet mềm mại với kem cream cheese đậm đà khó quên.</p>
            </div>
            <div class="mega-pop-item" onclick="openProductModal('Mango Yogurt', 'Fresh mango and yogurt frosting.', 279, 'cake_category_1777660447849.png')">
                <div class="mega-price-tag">₹279</div>
                <img src="cake_category_1777660447849.png" alt="Mango Yogurt">
                <h4>Mango Yogurt</h4>
                <p>Cupcake vanilla xoài và cream cheese.</p>
            </div>
        </div>
    </div>
`;

// Replace CSS
const cssStart = html.indexOf('/* BESPOKE CATEGORY CSS */');
const cssEnd = html.indexOf('</style>');
if (cssStart !== -1 && cssEnd !== -1) {
    html = html.substring(0, cssStart + '/* BESPOKE CATEGORY CSS */'.length) + '\\n' + megaCSS + '\\n' + html.substring(cssEnd);
}

// Replace HTML
const htmlStart = html.indexOf('<!-- BESPOKE HERO SECTION -->');
const htmlEnd = html.indexOf('<!-- END BESPOKE HERO SECTION -->');
if (htmlStart !== -1 && htmlEnd !== -1) {
    html = html.substring(0, htmlStart + '<!-- BESPOKE HERO SECTION -->'.length) + '\\n' + megaHTML + '\\n' + html.substring(htmlEnd);
}

fs.writeFileSync('cakes.html', html);
console.log('Mega Cake page applied!');
