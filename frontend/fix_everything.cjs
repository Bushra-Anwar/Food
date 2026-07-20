const fs = require('fs');
const path = require('path');

// 1. RESTORE CAKES & ICECREAM USING EXISTING SCRIPTS
require('./update_pinterest.cjs');
require('./update_pinterest_more.cjs');

// 2. CREATE PASTRIES.HTML from DONUTS.HTML
let donutsHtml = fs.readFileSync('donuts.html', 'utf8');
let pastriesHtml = donutsHtml.replace(/Donut/g, 'Pastry').replace(/Donuts/g, 'Pastries').replace(/donut/g, 'pastry');
fs.writeFileSync('pastries.html', pastriesHtml);

// 3. INJECT BESPOKE DESIGNS INTO THE RESTORED FILES!

function injectBespokeDesign(filename, css, htmlBlock) {
    let html = fs.readFileSync(filename, 'utf8');
    
    // Inject CSS
    const styleEnd = html.indexOf('</style>');
    if (styleEnd !== -1) {
        html = html.substring(0, styleEnd) + '\\n' + css + '\\n' + html.substring(styleEnd);
    }
    
    // Inject HTML Block right after Nav
    const navEnd = html.indexOf('</nav>') + '</nav>'.length;
    if (navEnd !== -1) {
        html = html.substring(0, navEnd) + '\\n\\n<!-- BESPOKE HERO DESIGN -->\\n' + htmlBlock + '\\n<!-- END BESPOKE HERO -->\\n\\n' + html.substring(navEnd);
    }
    
    fs.writeFileSync(filename, html);
    console.log('Injected bespoke design into ' + filename);
}

// BESPOKE DATA
const iceCreamCSS = `
    .pink-hero { background: #ff758c; color:#fff; display: flex; align-items: center; justify-content: center; padding: 60px 5%; text-align: center; }
    .pink-hero-title { font-family: var(--font-heading); font-size: 4rem; margin-bottom: 20px; line-height: 1.1; text-shadow: 2px 2px 4px rgba(0,0,0,0.1); color: #fff; }
    .pink-hero-img { width: 350px; height: 350px; border-radius: 50%; object-fit: cover; border: 12px solid #fff; box-shadow: 0 20px 40px rgba(0,0,0,0.2); }
    .wavy-container { background: #fdfbfb; padding: 120px 5% 60px; color: #333; position: relative; border-bottom: 5px solid #ff758c; }
    .wavy-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 40px; max-width: 1200px; margin: 0 auto; }
    .ice-card { background: #ffecf0; padding: 120px 20px 30px; border-radius: 20px; text-align: center; position: relative; transition: 0.3s; margin-top: 50px; box-shadow: 0 10px 20px rgba(255,117,140,0.15); cursor: pointer; }
    .ice-card:hover { transform: translateY(-10px); }
    .ice-card img { width: 160px; height: 160px; object-fit: cover; border-radius: 50%; position: absolute; top: -80px; left: 50%; transform: translateX(-50%); filter: drop-shadow(0 10px 10px rgba(0,0,0,0.2)); }
    .ice-card h3 { font-family: var(--font-heading); font-size: 1.8rem; color: #ff4d6d; margin-bottom: 15px; }
    .ice-card p { font-size: 0.9rem; color: #888; }
`;
const iceCreamHTML = `
    <div class="pink-hero">
        <div style="flex:1; text-align:left; max-width:600px;">
            <h1 class="pink-hero-title">Sweetest<br>LOREM IPSUM</h1>
            <p style="font-size:1.1rem; max-width:400px; margin-bottom:30px;">Indulge in our creamy, refreshing strawberry and vanilla treats.</p>
            <button style="background:#fff; color:#ff758c; padding:15px 35px; border-radius:30px; font-weight:bold; border:none; cursor:pointer; font-size:1.1rem; box-shadow:0 10px 20px rgba(0,0,0,0.1);">Order Now</button>
        </div>
        <div style="flex:1; text-align:center;">
            <img src="blueberry_cone_1784385590123.png" class="pink-hero-img" alt="Ice Cream Bowl">
        </div>
    </div>
    <div class="wavy-container">
        <h2 style="text-align:center; font-family:var(--font-heading); font-size:3rem; color:#ff4d6d; margin-bottom:50px;">Featured Flavors</h2>
        <div class="wavy-grid">
            <div class="ice-card">
                <img src="icecream_category_1777660485890.png" alt="Vanilla">
                <h3>Vanilla Almond</h3>
                <p>Classic vanilla bean with roasted almonds in a waffle cone.</p>
            </div>
            <div class="ice-card">
                <img src="recommended_icecream.png" alt="Mango">
                <h3>Tropical Mango</h3>
                <p>Fresh mango gelato bursting with summer flavors.</p>
            </div>
            <div class="ice-card">
                <img src="strawberry_splash_1784385077502.png" alt="Strawberry">
                <h3>Berry Burst</h3>
                <p>Strawberry and raspberry swirl for the ultimate berry lover.</p>
            </div>
        </div>
    </div>
`;
injectBespokeDesign('icecream.html', iceCreamCSS, iceCreamHTML);


const cakesCSS = `
    .dakingo-hero { display: flex; align-items: center; padding: 80px 5%; background: #fff5f5 url('red-circles.png') no-repeat; background-size: cover; border-bottom: 5px solid #d90429; }
    .dakingo-title { font-family: var(--font-heading); font-size: 3.5rem; color: #3d0000; margin-bottom: 20px; line-height: 1.2; }
    .dakingo-hero img { width: 100%; max-width: 450px; border-radius: 50%; box-shadow: 0 30px 60px rgba(100,0,0,0.15); border: 15px solid #fff; }
    .dakingo-btn { background: #d90429; color: #fff; border: none; padding: 15px 35px; border-radius: 30px; font-weight: bold; font-size: 1.1rem; cursor: pointer; transition: 0.3s; }
    .dakingo-btn:hover { background: #ef233c; transform: scale(1.05); }
    .dakingo-section { padding: 60px 5%; text-align: center; background: #fff; }
    .dakingo-section-title { font-family: var(--font-heading); font-size: 2.5rem; color: #3d0000; margin-bottom: 40px; }
    .flavor-circles { display: flex; justify-content: center; gap: 50px; flex-wrap: wrap; }
    .flavor-circle { display: flex; flex-direction: column; align-items: center; cursor: pointer; transition: 0.3s; }
    .flavor-circle:hover { transform: translateY(-10px); }
    .flavor-circle .img-wrap { width: 160px; height: 160px; border-radius: 50%; background: #ffccd5; display: flex; justify-content: center; align-items: center; margin-bottom: 15px; box-shadow: 0 10px 20px rgba(0,0,0,0.05); }
    .flavor-circle img { width: 120px; height: 120px; object-fit: cover; border-radius: 50%; }
    .flavor-circle h4 { font-size: 1.1rem; color: #3d0000; font-weight: bold; }
`;
const cakesHTML = `
    <div class="dakingo-hero">
        <div style="flex:1; padding-right:50px; max-width:600px; margin:0 auto;">
            <h1 class="dakingo-title">Indulge in Dakingo's Decadent Chocolate Delight</h1>
            <p style="font-size:1.1rem; color:#666; margin-bottom:30px; line-height:1.6;">Our signature chocolate masterpiece crafted with premium cocoa and fresh berries. A slice of heaven in every bite.</p>
            <button class="dakingo-btn">Order Here</button>
        </div>
        <div style="flex:1; text-align:center;">
            <img src="cake_category_1777660447849.png" alt="Chocolate Cake">
        </div>
    </div>
    
    <div class="dakingo-section">
        <h2 class="dakingo-section-title">Featured Flavors</h2>
        <div class="flavor-circles">
            <div class="flavor-circle">
                <div class="img-wrap"><img src="recommended_cake.png" alt="Vanilla"></div>
                <h4>Vanilla Bean</h4>
            </div>
            <div class="flavor-circle">
                <div class="img-wrap"><img src="blueberry_cheesecake_1784385282085.png" alt="Strawberry"></div>
                <h4>Strawberry</h4>
            </div>
            <div class="flavor-circle">
                <div class="img-wrap"><img src="cake_category_1777660447849.png" alt="Caramel"></div>
                <h4>Salted Caramel</h4>
            </div>
        </div>
    </div>
`;
injectBespokeDesign('cakes.html', cakesCSS, cakesHTML);


const bakeryCSS = `
    .bakery-hero { display: flex; align-items: center; padding: 60px 5%; background: linear-gradient(135deg, #fffcf5 0%, #ffe9cc 100%); border-bottom: 5px solid #f39c12; }
    .bakery-title { font-family: var(--font-heading); font-size: 4.5rem; color: #222; margin-bottom: 20px; line-height: 1; }
    .bakery-title span { color: #f39c12; font-style: italic; font-weight: normal; }
    .bakery-hero img { width: 100%; max-width: 500px; border-radius: 20px; box-shadow: 0 20px 40px rgba(0,0,0,0.1); }
    .bakery-btn { background: #222; color: #fff; padding: 12px 30px; border-radius: 30px; text-transform: uppercase; font-weight: bold; border: none; cursor: pointer; margin-right: 15px; }
    .bakery-btn.outline { background: transparent; color: #222; border: 2px solid #222; }
    .bakery-section { padding: 80px 5%; background: #fff; }
    .bakery-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 30px; margin-top: 40px; max-width: 1200px; margin-left: auto; margin-right: auto; }
    .bake-card { background: #fff; border-radius: 15px; overflow: hidden; box-shadow: 0 5px 15px rgba(0,0,0,0.05); transition: 0.3s; border: 1px solid #eee; }
    .bake-card:hover { transform: translateY(-5px); box-shadow: 0 15px 30px rgba(0,0,0,0.1); }
    .bake-card img { width: 100%; height: 250px; object-fit: cover; }
    .bake-card-body { padding: 25px; }
    .bake-card h4 { font-size: 1.3rem; margin-bottom: 10px; color: #222; font-family: var(--font-heading); }
    .bake-card p { font-size: 0.9rem; color: #666; margin-bottom: 15px; }
    .bake-price { font-weight: bold; color: #222; font-size: 1.1rem; }
`;
const bakeryHTML = `
    <div class="bakery-hero">
        <div style="flex:1; padding-right:40px; max-width:600px; margin:0 auto;">
            <p style="font-size:0.9rem; text-transform:uppercase; letter-spacing:2px; color:#666; margin-bottom:15px; font-weight:bold;">Fresh today &middot; Sourdough &middot; Butter</p>
            <h1 class="bakery-title">Bake the<br><span>Goodness</span></h1>
            <p style="font-size:1.1rem; color:#555; margin-bottom:30px; line-height:1.6;">Premium breads, croissants and cookies made from scratch. Slow 18-hour fermentation. No additives - just honest ingredients.</p>
            <div>
                <button class="bakery-btn">See full menu</button>
                <button class="bakery-btn outline">Baking blog</button>
            </div>
        </div>
        <div style="flex:1; text-align:center;">
            <img src="fresh_bread_basket_1784385258109.png" alt="Fresh Bread">
        </div>
    </div>
    <div class="bakery-section">
        <h2 style="font-family:var(--font-heading); font-size:2.5rem; text-align:center; color:#222;">Products we <i style="color:#f39c12;">bake</i> daily</h2>
        <div class="bakery-grid">
            <div class="bake-card">
                <img src="croissant_splash_1784385246079.png" alt="Croissant">
                <div class="bake-card-body">
                    <h4>Golden Croissant</h4>
                    <p>Buttery layers, crispy outside, soft inside.</p>
                    <div class="bake-price">₹120</div>
                </div>
            </div>
            <div class="bake-card">
                <img src="elegant_croissant_1784385566982.png" alt="French Croissant">
                <div class="bake-card-body">
                    <h4>French Croissant</h4>
                    <p>Authentic Parisian style baked fresh.</p>
                    <div class="bake-price">₹149</div>
                </div>
            </div>
            <div class="bake-card">
                <img src="pastry_category_1777660510169.png" alt="Almond Pastry">
                <div class="bake-card-body">
                    <h4>Almond Pastry</h4>
                    <p>Filled with rich almond frangipane.</p>
                    <div class="bake-price">₹189</div>
                </div>
            </div>
        </div>
    </div>
`;
injectBespokeDesign('pastries.html', bakeryCSS, bakeryHTML);


// COFFEE IS A NEW FILE (keep it as is, but make sure it has the right nav structure from index)
// I will just let the previous coffee.html stay since it was a brand new category anyway.

console.log('Restored all functionality and injected premium bespoke designs safely!');
