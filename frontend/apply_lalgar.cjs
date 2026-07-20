const fs = require('fs');

let html = fs.readFileSync('pastries.html', 'utf8');

const css = `
    .lalgar-hero { background: #e1cfb9; padding: 80px 8%; display: flex; align-items: center; justify-content: space-between; }
    .lalgar-hero-text { flex: 1; }
    .lalgar-hero-text h1 { font-family: 'Times New Roman', serif; font-size: 5rem; font-weight: normal; color: #4a443b; line-height: 1; margin-bottom: 20px; }
    .lalgar-hero-text h1 span { font-family: 'Brush Script MT', cursive, 'Dancing Script', sans-serif; font-size: 4.5rem; color: #7b6f61; }
    .lalgar-hero-text p { color: #7b6f61; font-size: 1.1rem; max-width: 400px; margin-bottom: 30px; line-height: 1.6; }
    .lalgar-hero-btn { background: #d4c4b1; color: #4a443b; border: none; padding: 12px 30px; border-radius: 30px; font-weight: bold; font-size: 1.1rem; cursor: pointer; box-shadow: 0 4px 10px rgba(0,0,0,0.1); }
    .lalgar-hero-btn:hover { background: #c2b19e; }
    .lalgar-hero-img { flex: 1; text-align: right; }
    .lalgar-hero-img img { width: 100%; max-width: 550px; border-radius: 50%; box-shadow: 0 20px 40px rgba(0,0,0,0.15); object-fit: cover; aspect-ratio: 1; border: 20px solid #fff; }

    .lalgar-section-2 { background: #f7f3ee; padding: 80px 8%; text-align: center; }
    .lalgar-section-2 h2 { font-family: 'Times New Roman', serif; font-size: 3rem; color: #4a443b; margin-bottom: 50px; font-weight: normal; }
    .lalgar-plates { display: flex; justify-content: center; gap: 80px; }
    .lalgar-plate-item { cursor: pointer; transition: 0.3s; }
    .lalgar-plate-item:hover { transform: translateY(-10px); }
    .lalgar-plate-item img { width: 160px; height: 160px; object-fit: cover; border-radius: 50%; border: 15px solid #fff; box-shadow: 0 15px 30px rgba(0,0,0,0.05); }

    .lalgar-section-3 { background: #fdfbf8; padding: 80px 8%; display: flex; align-items: center; justify-content: space-between; }
    .lalgar-section-3-text { flex: 1; padding-right: 50px; }
    .lalgar-section-3-text h2 { font-family: 'Times New Roman', serif; font-size: 3.5rem; color: #4a443b; line-height: 1.1; margin-bottom: 20px; font-weight: normal; max-width: 500px; }
    .lalgar-section-3-text p { color: #7b6f61; font-size: 1rem; margin-bottom: 30px; max-width: 500px; line-height: 1.6; }
    .lalgar-section-3-img { flex: 1; text-align: center; }
    .oval-bg { background: #ebdccb; border-radius: 200px 200px 200px 200px / 100px 100px 100px 100px; padding: 40px; display: inline-block; box-shadow: 0 20px 40px rgba(0,0,0,0.05); }
    .oval-bg img { width: 350px; border-radius: 20px; }

    .lalgar-section-4 { background: #e1cfb9; padding: 80px 8%; text-align: center; }
    .lalgar-section-4 h2 { font-family: 'Brush Script MT', cursive, 'Dancing Script', sans-serif; font-size: 4rem; color: #7b6f61; margin-bottom: 10px; font-weight: normal; }
    .lalgar-section-4 p { color: #7b6f61; letter-spacing: 2px; text-transform: uppercase; font-size: 0.8rem; font-weight: bold; }
    .lalgar-cards { display: flex; justify-content: center; gap: 40px; margin-top: 50px; flex-wrap: wrap; }
    .lalgar-card { background: #fff; padding: 20px; width: 250px; text-align: center; border: 2px solid #d4c4b1; box-shadow: 0 10px 20px rgba(0,0,0,0.05); cursor: pointer; transition: 0.3s; }
    .lalgar-card:hover { transform: translateY(-10px); }
    .lalgar-card h4 { font-family: 'Times New Roman', serif; font-size: 1.3rem; color: #4a443b; margin-bottom: 20px; font-weight: normal; border-bottom: 1px solid #d4c4b1; padding-bottom: 10px; }
    .lalgar-card img { width: 100%; height: 180px; object-fit: cover; border-radius: 50%; border: 5px solid #f7f3ee; }
`;

const bespokeHtml = `
    <div class="lalgar-hero">
        <div class="lalgar-hero-text">
            <h1>Freshuj<br><span>(Baked Daily)</span></h1>
            <p>Experience the finest organically sourced ingredients meticulously laminated into flaky, buttery perfection.</p>
            <button class="lalgar-hero-btn" onclick="addToCart('Lalgar Signature Pastry', 249, 'croissant_splash_1784385246079.png', 1); openCheckout();">Order Fresh</button>
        </div>
        <div class="lalgar-hero-img">
            <img src="croissant_splash_1784385246079.png" alt="Fresh Pastries">
        </div>
    </div>
    
    <div class="lalgar-section-2">
        <h2>A lere Takey</h2>
        <div class="lalgar-plates">
            <div class="lalgar-plate-item" onclick="openProductModal('Classic Croissant', 'Buttery, flaky, classic.', 149, 'elegant_croissant_1784385566982.png')">
                <img src="elegant_croissant_1784385566982.png" alt="Croissant">
            </div>
            <div class="lalgar-plate-item" onclick="openProductModal('Chocolate Mousse', 'Rich chocolate delight.', 199, 'pastry_category_1777660510169.png')">
                <img src="pastry_category_1777660510169.png" alt="Pastry">
            </div>
            <div class="lalgar-plate-item" onclick="openProductModal('Berry Cheesecake', 'Sweet and tart cheesecake.', 249, 'blueberry_cheesecake_1784385282085.png')">
                <img src="blueberry_cheesecake_1784385282085.png" alt="Cheesecake">
            </div>
        </div>
    </div>

    <div class="lalgar-section-3">
        <div class="lalgar-section-3-text">
            <h2>Hardy to hlo chayeam<br>ened aedesish ādgenarol,<br>cant roommes.</h2>
            <p>Our artisan bakers pour their passion into every dough, creating masterpieces that taste as beautiful as they look. Perfect alongside a hot beverage.</p>
            <button class="lalgar-hero-btn" style="background:#a67b7d; color:#fff;" onclick="openProductModal('Coffee Combo', 'Perfect breakfast pairing.', 349, 'croissant_coffee_1784385270265.png')">Discover</button>
        </div>
        <div class="lalgar-section-3-img">
            <div class="oval-bg">
                <img src="croissant_coffee_1784385270265.png" alt="Coffee and Croissant">
            </div>
        </div>
    </div>

    <div class="lalgar-section-4">
        <h2>I see thruhuealerssniss</h2>
        <p>Curated selections from our master bakers</p>
        <div class="lalgar-cards">
            <div class="lalgar-card" onclick="openProductModal('Almond Pastry', 'Toasted almond topping.', 189, 'pastry_category_1777660510169.png')">
                <h4>Nut & Honey</h4>
                <img src="pastry_category_1777660510169.png" alt="Pastry">
            </div>
            <div class="lalgar-card" onclick="openProductModal('Fruit Tart', 'Seasonal fruits.', 199, 'blueberry_cheesecake_1784385282085.png')">
                <h4>Culinary</h4>
                <img src="blueberry_cheesecake_1784385282085.png" alt="Tart">
            </div>
            <div class="lalgar-card" onclick="openProductModal('Classic Croissant', 'Golden crust.', 159, 'elegant_croissant_1784385566982.png')">
                <h4>Daily Bakes</h4>
                <img src="elegant_croissant_1784385566982.png" alt="Croissant">
            </div>
        </div>
    </div>
`;

// Replace CSS
const cssStart = html.indexOf('/* BESPOKE CATEGORY CSS */');
const cssEnd = html.indexOf('</style>');
if (cssStart !== -1 && cssEnd !== -1) {
    html = html.substring(0, cssStart + '/* BESPOKE CATEGORY CSS */'.length) + '\\n' + css + '\\n' + html.substring(cssEnd);
}

// Replace HTML
const htmlStart = html.indexOf('<!-- BESPOKE HERO SECTION -->');
const htmlEnd = html.indexOf('<!-- END BESPOKE HERO SECTION -->');
if (htmlStart !== -1 && htmlEnd !== -1) {
    html = html.substring(0, htmlStart + '<!-- BESPOKE HERO SECTION -->'.length) + '\\n' + bespokeHtml + '\\n' + html.substring(htmlEnd);
}

fs.writeFileSync('pastries.html', html);
console.log('Lalgar applied to pastries.html');
