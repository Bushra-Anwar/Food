const fs = require('fs');
const path = require('path');

const baseHtml = fs.readFileSync('donuts.html', 'utf8');

function buildCategoryPage(filename, categoryName, css, heroHtml) {
    let newHtml = baseHtml;
    newHtml = newHtml.replace('<title>Donuts | SweetTreats</title>', '<title>' + categoryName + ' | SweetTreats</title>');
    newHtml = newHtml.replace('Gourmet Donuts', 'Premium ' + categoryName);
    newHtml = newHtml.replace('Sweet, glazed, and visually stunning Pinterest donuts.', 'Discover our premium, highly curated selection of ' + categoryName.toLowerCase() + '.');

    const styleEndIndex = newHtml.indexOf('</style>');
    if (styleEndIndex !== -1) {
        newHtml = newHtml.substring(0, styleEndIndex) + '\n\n/* BESPOKE CATEGORY CSS */\n' + css + '\n\n' + newHtml.substring(styleEndIndex);
    }

    const navEndIndex = newHtml.indexOf('</nav>') + '</nav>'.length;
    if (navEndIndex !== -1) {
        newHtml = newHtml.substring(0, navEndIndex) + '\n\n<!-- BESPOKE HERO SECTION -->\n' + heroHtml + '\n<!-- END BESPOKE HERO SECTION -->\n\n' + newHtml.substring(navEndIndex);
    }

    fs.writeFileSync(filename, newHtml);
    console.log('Successfully rebuilt: ' + filename);
}

const cakesCSS = `
    .dakingo-hero { display: flex; align-items: center; padding: 80px 5%; background: #fff5f5; border-bottom: 5px solid #d90429; }
    .dakingo-title { font-family: var(--font-heading); font-size: 3.5rem; color: #3d0000; margin-bottom: 20px; line-height: 1.2; }
    .dakingo-hero-img-container { flex: 1; text-align: center; }
    .dakingo-hero-img-container img { width: 100%; max-width: 450px; border-radius: 50%; box-shadow: 0 30px 60px rgba(100,0,0,0.15); border: 15px solid #fff; object-fit: cover; aspect-ratio: 1; }
    .dakingo-btn { background: #d90429; color: #fff; border: none; padding: 15px 35px; border-radius: 30px; font-weight: bold; font-size: 1.1rem; cursor: pointer; transition: 0.3s; }
    .dakingo-btn:hover { background: #ef233c; transform: scale(1.05); }
    .dakingo-section { padding: 60px 5%; text-align: center; background: #fff; }
    .dakingo-section-title { font-family: var(--font-heading); font-size: 2.5rem; color: #3d0000; margin-bottom: 40px; }
    .flavor-circles { display: flex; justify-content: center; gap: 50px; flex-wrap: wrap; }
    .flavor-circle { display: flex; flex-direction: column; align-items: center; cursor: pointer; transition: 0.3s; }
    .flavor-circle:hover { transform: translateY(-10px); }
    .flavor-circle .img-wrap { width: 160px; height: 160px; border-radius: 50%; background: #ffccd5; display: flex; justify-content: center; align-items: center; margin-bottom: 15px; box-shadow: 0 10px 20px rgba(0,0,0,0.05); }
    .flavor-circle img { width: 120px; height: 120px; object-fit: cover; border-radius: 50%; }
    .flavor-circle h4 { font-size: 1.1rem; color: #3d0000; font-weight: bold; margin: 0; }
`;
const cakesHTML = `
    <div class="dakingo-hero">
        <div style="flex:1; padding-right:50px; max-width:600px; margin:0 auto;">
            <h1 class="dakingo-title">Indulge in Dakingo's Decadent Chocolate Delight</h1>
            <p style="font-size:1.1rem; color:#666; margin-bottom:30px; line-height:1.6;">Our signature chocolate masterpiece crafted with premium cocoa and fresh berries. A slice of heaven in every bite.</p>
            <button class="dakingo-btn">Order Here</button>
        </div>
        <div class="dakingo-hero-img-container">
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
buildCategoryPage('cakes.html', 'Cakes', cakesCSS, cakesHTML);

const pastriesCSS = `
    .croissant-hero { background: #b07e81; color: #fff; padding: 100px 8%; display: flex; align-items: center; justify-content: space-between; }
    .croissant-hero-content { max-width: 500px; }
    .croissant-label { font-size: 0.8rem; text-transform: uppercase; letter-spacing: 2px; color: #e8d0d2; margin-bottom: 20px; display: block; font-weight: bold; }
    .croissant-title { font-family: 'Times New Roman', serif; font-size: 4rem; line-height: 1.1; margin-bottom: 25px; font-weight: normal; }
    .croissant-title i { font-style: italic; color: #4a2527; font-weight: bold; }
    .croissant-desc { font-size: 1rem; color: #e8d0d2; margin-bottom: 40px; line-height: 1.6; }
    .croissant-btn { background: #fff; color: #4a2527; padding: 12px 30px; font-size: 0.9rem; font-weight: bold; border: none; cursor: pointer; transition: 0.3s; }
    .croissant-btn:hover { background: #4a2527; color: #fff; }
    .croissant-hero-img { flex: 1; text-align: right; position: relative; }
    .croissant-hero-img img { max-width: 500px; width: 100%; border-radius: 20px; box-shadow: 0 30px 60px rgba(74, 37, 39, 0.4); }
    
    .croissant-specials { background: #fff8f0; padding: 80px 8%; display: flex; align-items: flex-start; gap: 50px; }
    .specials-text { flex: 0 0 250px; }
    .specials-text h3 { font-family: 'Times New Roman', serif; font-size: 2.5rem; color: #222; margin-bottom: 15px; }
    .specials-text p { color: #666; margin-bottom: 25px; line-height: 1.5; font-size: 0.95rem; }
    .specials-btn { background: #a67b7d; color: #fff; padding: 10px 25px; border: none; font-weight: bold; cursor: pointer; }
    
    .specials-grid { flex: 1; display: flex; gap: 30px; }
    .special-card { flex: 1; background: #e8d6ce; padding: 20px; border-radius: 12px; text-align: center; transition: 0.3s; cursor: pointer; }
    .special-card:hover { transform: translateY(-10px); box-shadow: 0 15px 30px rgba(0,0,0,0.1); }
    .special-card img { width: 100px; height: 100px; object-fit: cover; border-radius: 50%; margin-bottom: 20px; box-shadow: 0 10px 20px rgba(0,0,0,0.1); }
    .special-card h4 { font-size: 1rem; color: #222; line-height: 1.4; }
`;
const pastriesHTML = `
    <div class="croissant-hero">
        <div class="croissant-hero-content">
            <span class="croissant-label">Artisan Bakery</span>
            <h1 class="croissant-title">Crisp Layers.<br><i>Juicy Berry Heart.</i></h1>
            <p class="croissant-desc">Meticulously laminated croissants with a molten wild berry core. Light, flaky, and impossibly satisfying — crafted for moments that deserve indulgence.</p>
            <button class="croissant-btn">Order Pickup</button>
        </div>
        <div class="croissant-hero-img">
            <img src="elegant_croissant_1784385566982.png" alt="Stack of Croissants">
        </div>
    </div>
    <div class="croissant-specials">
        <div class="specials-text">
            <span style="color:#a67b7d; font-size:0.8rem; text-transform:uppercase; font-weight:bold;">Seasonal Specials</span>
            <h3>New arrivals</h3>
            <p>More flavor, more pleasure — try something new!</p>
            <button class="specials-btn">View menu</button>
        </div>
        <div class="specials-grid">
            <div class="special-card" style="background: #e8ded6;">
                <img src="croissant_splash_1784385246079.png" alt="Croissant">
                <h4>Golden Classic<br>Croissant</h4>
            </div>
            <div class="special-card" style="background: #dcdbd3;">
                <img src="blueberry_cheesecake_1784385282085.png" alt="Dessert">
                <h4>Berry Cheesecake<br>Delight</h4>
            </div>
            <div class="special-card" style="background: #e0c8b6;">
                <img src="pastry_category_1777660510169.png" alt="Pastry">
                <h4>Caramel Pear<br>Hazelnut Pastry</h4>
            </div>
        </div>
    </div>
`;
buildCategoryPage('pastries.html', 'Pastries', pastriesCSS, pastriesHTML);

const iceCreamCSS = `
    .pink-hero { background: #ff758c; color:#fff; display: flex; align-items: center; justify-content: center; padding: 60px 5%; text-align: center; }
    .pink-hero-title { font-family: var(--font-heading); font-size: 4rem; margin-bottom: 20px; line-height: 1.1; text-shadow: 2px 2px 4px rgba(0,0,0,0.1); color: #fff; }
    .pink-hero-img-container { flex: 1; text-align: center; }
    .pink-hero-img-container img { width: 350px; height: 350px; border-radius: 50%; object-fit: cover; border: 12px solid #fff; box-shadow: 0 20px 40px rgba(0,0,0,0.2); }
    .wavy-container { background: #fdfbfb; padding: 80px 5% 60px; color: #333; position: relative; border-bottom: 5px solid #ff758c; }
    .wavy-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 40px; max-width: 1200px; margin: 0 auto; }
    .ice-card { background: #ffecf0; padding: 120px 20px 30px; border-radius: 20px; text-align: center; position: relative; transition: 0.3s; margin-top: 50px; box-shadow: 0 10px 20px rgba(255,117,140,0.15); cursor: pointer; }
    .ice-card:hover { transform: translateY(-10px); }
    .ice-card img { width: 160px; height: 160px; object-fit: cover; border-radius: 50%; position: absolute; top: -80px; left: 50%; transform: translateX(-50%); filter: drop-shadow(0 10px 10px rgba(0,0,0,0.2)); }
    .ice-card h3 { font-family: var(--font-heading); font-size: 1.8rem; color: #ff4d6d; margin-bottom: 15px; margin-top: 20px; }
    .ice-card p { font-size: 0.9rem; color: #888; }
`;
const iceCreamHTML = `
    <div class="pink-hero">
        <div style="flex:1; text-align:left; max-width:600px; padding-left: 5%;">
            <h1 class="pink-hero-title">Sweetest<br>Delights</h1>
            <p style="font-size:1.1rem; max-width:400px; margin-bottom:30px;">Indulge in our creamy, refreshing strawberry and vanilla treats.</p>
            <button style="background:#fff; color:#ff758c; padding:15px 35px; border-radius:30px; font-weight:bold; border:none; cursor:pointer; font-size:1.1rem; box-shadow:0 10px 20px rgba(0,0,0,0.1);">Order Now</button>
        </div>
        <div class="pink-hero-img-container">
            <img src="blueberry_cone_1784385590123.png" alt="Ice Cream Bowl">
        </div>
    </div>
    <div class="wavy-container">
        <h2 style="text-align:center; font-family:var(--font-heading); font-size:3rem; color:#ff4d6d; margin-bottom:60px;">Featured Flavors</h2>
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
buildCategoryPage('icecream.html', 'Ice Cream', iceCreamCSS, iceCreamHTML);

const drinksCSS = `
    .drinks-hero { background: #fffcf8; display: flex; align-items: center; justify-content: center; padding: 100px 5%; position: relative; overflow: hidden; border-bottom: 5px solid #d4a373; }
    .drinks-hero-text { flex: 1; max-width: 500px; z-index: 2; padding-left: 5%; }
    .drinks-hero-text h1 { font-family: var(--font-heading); font-size: 4rem; color: #4a3b32; margin-bottom: 20px; }
    .drinks-hero-text p { font-size: 1.1rem; color: #8a7b72; margin-bottom: 30px; line-height: 1.6; }
    .drinks-btn { background: #5c4033; color: #fff; border: none; padding: 12px 30px; border-radius: 30px; font-weight: bold; cursor: pointer; transition: 0.3s; }
    .drinks-btn:hover { background: #3d2a21; transform: translateY(-2px); }
    .drinks-hero-img-container { flex: 1; text-align: center; position: relative; z-index: 2; }
    .drinks-hero-img-container img { width: 300px; height: 300px; object-fit: cover; border-radius: 50%; box-shadow: 0 20px 40px rgba(92,64,51,0.2); border: 10px solid #fff; }
    
    .blob-bg { position: absolute; top: 50%; right: 10%; transform: translateY(-50%); width: 600px; height: 600px; background: #ebd5c9; border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%; z-index: 1; animation: morph 8s ease-in-out infinite; }
    @keyframes morph { 0% { border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%; } 50% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; } 100% { border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%; } }
`;
const drinksHTML = `
    <div class="drinks-hero">
        <div class="blob-bg"></div>
        <div class="drinks-hero-text">
            <h1>Signature<br>Beverages</h1>
            <p>Our hand-crafted boba and coffee selections are brewed to absolute perfection every day.</p>
            <button class="drinks-btn">Learn more</button>
        </div>
        <div class="drinks-hero-img-container">
            <img src="iced_coffee_splash_1784385065567.png" alt="Drink">
        </div>
    </div>
`;
buildCategoryPage('coffee.html', 'Beverages', drinksCSS, drinksHTML);
