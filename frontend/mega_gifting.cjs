const fs = require('fs');

// 1. FIX THE WISHLIST LINKS ACROSS ALL HTML FILES
const files = fs.readdirSync(__dirname).filter(f => f.endsWith('.html'));

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    
    // The original wishlist icon div looks like this:
    // <div class="action-item">
    //     <i class="fa-regular fa-heart"></i>
    //     <span>Wishlist</span>
    // </div>
    // We will replace it with an onclick event if it doesn't already have one.
    
    const targetHtml = '<div class="action-item">\n                <i class="fa-regular fa-heart"></i>\n                <span>Wishlist</span>\n            </div>';
    const replaceHtml = '<div class="action-item" onclick="window.location.href=\'wishlist.html\'" style="cursor:pointer;">\n                <i class="fa-regular fa-heart"></i>\n                <span>Wishlist</span>\n            </div>';
    
    // Alternatively, just use regex to catch variations
    content = content.replace(/<div class="action-item">\s*<i class="fa-regular fa-heart"><\/i>\s*<span>Wishlist<\/span>\s*<\/div>/g, replaceHtml);
    
    // Let's also fix the profile one just in case
    content = content.replace(/<div class="action-item">\s*<i class="fa-regular fa-user"><\/i>\s*<span>Profile<\/span>\s*<\/div>/g, '<div class="action-item" onclick="window.location.href=\'menu.html\'" style="cursor:pointer;">\n                <i class="fa-regular fa-user"></i>\n                <span>Menu</span>\n            </div>');
    
    fs.writeFileSync(file, content);
});
console.log('Fixed Wishlist and Menu links across all files!');

// 2. BUILD MEGA GIFTING PAGE
// Read index.html for base template
let baseHtml = fs.readFileSync('index.html', 'utf8');

const navStart = baseHtml.indexOf('<nav class="navbar"');
const navEnd = baseHtml.indexOf('</nav>') + '</nav>'.length;
const navHtml = baseHtml.substring(navStart, navEnd);

const footerStart = baseHtml.indexOf('<footer>');
const footerEnd = baseHtml.indexOf('</footer>') + '</footer>'.length;
const footerHtml = baseHtml.substring(footerStart, footerEnd);

const giftingCss = `
    <style>
    .g-body { background: #fafafa; font-family: 'Helvetica Neue', Arial, sans-serif; overflow-x: hidden; }
    .g-section { padding: 100px 5%; display: flex; align-items: center; justify-content: space-between; gap: 50px; }
    .g-text { flex: 1; max-width: 500px; }
    .g-img-container { flex: 1; position: relative; }
    .g-title { font-family: 'Times New Roman', serif; font-size: 3.5rem; margin-bottom: 20px; line-height: 1.1; }
    .g-desc { font-size: 1.1rem; line-height: 1.6; margin-bottom: 30px; }
    .g-btn { padding: 15px 40px; border-radius: 30px; font-weight: bold; cursor: pointer; border: none; font-size: 1.1rem; transition: 0.3s; }
    .g-btn:hover { transform: translateY(-3px); box-shadow: 0 10px 20px rgba(0,0,0,0.2); }
    
    /* THEME 1: CRAVE (Dark Brown & Cream) */
    .g-crave { background: #d0c3b3; color: #432918; }
    .g-crave-title { font-family: 'Brush Script MT', cursive; font-size: 5rem; color: #432918; margin-bottom: 10px; }
    .g-crave-subtitle { text-transform: uppercase; letter-spacing: 4px; font-size: 0.9rem; font-weight: bold; border-top: 1px solid #432918; border-bottom: 1px solid #432918; padding: 5px 0; display: inline-block; margin-bottom: 30px; }
    .g-crave-box { background: #432918; color: #f2e9dc; padding: 40px; border-radius: 20px; box-shadow: 0 20px 50px rgba(67, 41, 24, 0.3); text-align: center; }
    .g-crave-box img { width: 100%; height: 250px; object-fit: cover; border-radius: 10px; margin-bottom: 20px; }
    .g-crave .g-btn { background: #432918; color: #f2e9dc; }

    /* THEME 2: BEANO'S (Forest Green & Gold) */
    .g-beano { background: #1a3c34; color: #e6c88f; flex-direction: row-reverse; }
    .g-beano .g-title { font-family: 'Georgia', serif; font-size: 4rem; text-transform: uppercase; }
    .g-beano .g-subtitle { font-family: 'Dancing Script', cursive; font-size: 3rem; margin-bottom: 30px; display: block; margin-top: -20px; }
    .g-beano-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
    .g-beano-item { background: #234d43; border: 1px solid #e6c88f; border-radius: 10px; padding: 20px; text-align: center; }
    .g-beano-item img { width: 100px; height: 100px; border-radius: 50%; border: 3px solid #e6c88f; margin-bottom: 10px; object-fit: cover; }
    .g-beano .g-btn { background: #e6c88f; color: #1a3c34; }

    /* THEME 3: SWEETORY (Navy Blue & Gold) */
    .g-sweetory { background: #e8e3dc; color: #192a40; text-align: center; display: block; }
    .g-sweetory-container { max-width: 1000px; margin: 0 auto; }
    .g-sweetory .g-title { font-family: 'Arial', sans-serif; font-weight: 800; font-size: 4rem; letter-spacing: -1px; }
    .g-sweetory .g-subtitle { font-size: 2rem; margin-bottom: 50px; color: #192a40; }
    .g-sweetory-cards { display: flex; justify-content: center; gap: 40px; }
    .g-sweet-card { background: #192a40; border-radius: 20px 20px 5px 5px; padding: 30px 20px; position: relative; width: 300px; box-shadow: 0 30px 60px rgba(25, 42, 64, 0.3); color: #e6c88f; }
    .g-sweet-bow { position: absolute; top: -20px; left: 50%; transform: translateX(-50%); font-size: 3rem; color: #d4af37; text-shadow: 0 5px 10px rgba(0,0,0,0.3); }
    .g-sweet-logo { font-size: 2.5rem; font-family: 'Times New Roman', serif; margin-top: 20px; margin-bottom: 5px; }
    .g-sweet-brand { letter-spacing: 3px; font-size: 0.9rem; margin-bottom: 20px; border-bottom: 1px solid rgba(230,200,143,0.3); padding-bottom: 15px; }
    .g-sweet-window { background: rgba(255,255,255,0.1); border-radius: 10px; padding: 20px; border: 1px solid rgba(255,255,255,0.2); }
    .g-sweet-window img { width: 150px; height: 150px; border-radius: 50%; object-fit: cover; }
    .g-sweetory .g-btn { background: #192a40; color: #d4af37; margin-top: 50px; border: 2px solid #d4af37; }

    /* THEME 4: SAGE & GREEN (Eco Minimalist) */
    .g-sage { background: #8b997c; color: #fffcf0; flex-direction: row-reverse; }
    .g-sage .g-title { font-family: 'Courier New', Courier, monospace; font-size: 3.5rem; font-weight: bold; letter-spacing: -2px; }
    .g-sage-boxes { display: flex; flex-wrap: wrap; gap: 20px; }
    .g-sage-box { background: #7c886e; border: 1px solid #a3af94; padding: 20px; border-radius: 5px; width: 220px; position: relative; }
    .g-sage-label { background: #fffcf0; color: #7c886e; position: absolute; top: 0; left: 50%; transform: translateX(-50%); padding: 5px 15px; font-family: 'Courier New', monospace; font-size: 0.7rem; letter-spacing: 1px; font-weight: bold; text-align: center; }
    .g-sage-box img { width: 100%; height: 150px; object-fit: cover; border-radius: 5px; margin-top: 15px; }
    .g-sage .g-btn { background: #fffcf0; color: #7c886e; border-radius: 5px; font-family: 'Courier New', monospace; }

    /* THEME 5: CHAPTERS (Pink Drawer Combo) */
    .g-chapters { background: #fdf5f5; color: #333; }
    .g-chap-box { background: #f4b6c2; border-radius: 10px; width: 350px; height: 400px; position: relative; margin: 0 auto; box-shadow: 0 30px 60px rgba(244, 182, 194, 0.4); border: 2px solid #e29ba9; }
    .g-chap-top { background: #fff; width: 200px; height: 50px; position: absolute; top: -50px; left: 50%; transform: translateX(-50%); border-radius: 5px 5px 0 0; display: flex; align-items: flex-end; justify-content: center; }
    .g-chap-cup { width: 160px; height: 150px; background: #f4b6c2; position: absolute; top: -140px; border-radius: 10px 10px 50px 50px; border: 2px solid #e29ba9; display: flex; align-items: center; justify-content: center; overflow: hidden; }
    .g-chap-cup img { width: 100%; height: 100%; object-fit: cover; opacity: 0.5; mix-blend-mode: multiply; }
    .g-chap-logo { text-align: center; padding-top: 50px; }
    .g-chap-logo i { font-size: 2rem; color: #555; }
    .g-chap-logo h3 { font-family: 'Georgia', serif; font-size: 2.5rem; margin-top: 10px; font-weight: normal; }
    .g-chap-drawer { position: absolute; bottom: -20px; left: 20px; right: 20px; height: 180px; background: #f9cdd5; border-radius: 5px 5px 20px 20px; border: 1px solid #fff; box-shadow: 0 -10px 20px rgba(0,0,0,0.05) inset; display: flex; align-items: center; justify-content: center; padding: 20px; z-index: 2; transition: 0.5s; cursor: pointer; }
    .g-chap-drawer:hover { transform: translateY(30px); }
    .g-chap-drawer img { width: 140px; height: 140px; border-radius: 50%; object-fit: cover; box-shadow: 0 10px 20px rgba(0,0,0,0.2); }
    .g-chapters .g-btn { background: #f4b6c2; color: #fff; }
    </style>
`;

const giftingBody = `
    <div class="g-body">
        
        <!-- THEME 1: CRAVE -->
        <div class="g-section g-crave">
            <div class="g-text">
                <div class="g-crave-title">SweetTreats</div>
                <div class="g-crave-subtitle">Artisan Bakes. Timeless Taste.<br>Made with Patience.</div>
                <p class="g-desc">Our premium signature packaging is designed to keep your favorite cakes and pastries fresh, secure, and ready to be gifted to your loved ones. Experience luxury in every bite.</p>
                <button class="g-btn" onclick="addToCart('Signature Dark Box', 45, 'cake_category_1777660447849.png', 1); openCheckout();">Order Premium Box</button>
            </div>
            <div class="g-img-container">
                <div class="g-crave-box">
                    <img src="cake_category_1777660447849.png" alt="Dark Chocolate Cake">
                    <h3 style="font-family: 'Georgia', serif; font-size: 1.5rem; margin-bottom: 10px;">Good things take time.</h3>
                    <p style="font-style: italic; color: #a99684;">So do we.</p>
                </div>
            </div>
        </div>

        <!-- THEME 2: BEANO'S -->
        <div class="g-section g-beano">
            <div class="g-text">
                <div class="g-title">SweetTreats</div>
                <span class="g-subtitle">Coffee & Bakery Hampers</span>
                <p class="g-desc">Embrace the rich, aromatic experience of our freshly roasted coffee paired perfectly with our buttery, flaky pastries. Packaged in our luxurious forest green and gold seal carrier bags.</p>
                <button class="g-btn" onclick="addToCart('Emerald Coffee Hamper', 65, 'croissant_coffee_1784385270265.png', 1); openCheckout();">Explore Hampers</button>
            </div>
            <div class="g-img-container">
                <div class="g-beano-grid">
                    <div class="g-beano-item">
                        <img src="croissant_coffee_1784385270265.png">
                        <h4>Coffee & Croissant</h4>
                    </div>
                    <div class="g-beano-item">
                        <img src="iced_coffee_splash_1784385065567.png">
                        <h4>Cold Brew Set</h4>
                    </div>
                    <div class="g-beano-item" style="grid-column: span 2;">
                        <h3 style="margin-bottom:10px; font-family:'Georgia';">Premium Gift Bag</h3>
                        <p style="font-size:0.9rem; color:#a6c5b5;">Includes 2 cups, 1 pastry box, and our signature roast.</p>
                    </div>
                </div>
            </div>
        </div>

        <!-- THEME 3: SWEETORY -->
        <div class="g-section g-sweetory">
            <div class="g-sweetory-container">
                <div class="g-title">Pop.Pack.</div>
                <div class="g-title" style="margin-bottom: 20px;">Prosper Now</div>
                <div class="g-sweetory-cards">
                    
                    <div class="g-sweet-card" onclick="addToCart('Navy Berry Box', 25, 'blueberry_cheesecake_1784385282085.png', 1); openCheckout();" style="cursor:pointer;">
                        <div class="g-sweet-bow"><i class="fa-solid fa-ribbon"></i></div>
                        <div class="g-sweet-logo">S</div>
                        <div class="g-sweet-brand">SWEETTREATS</div>
                        <div class="g-sweet-window">
                            <img src="blueberry_cheesecake_1784385282085.png" alt="Cheesecake">
                        </div>
                    </div>
                    
                    <div class="g-sweet-card" onclick="addToCart('Navy Berry Box', 25, 'blueberry_cheesecake_1784385282085.png', 1); openCheckout();" style="cursor:pointer; transform: scale(1.1); z-index:2;">
                        <div class="g-sweet-bow"><i class="fa-solid fa-ribbon"></i></div>
                        <div class="g-sweet-logo">S</div>
                        <div class="g-sweet-brand">SWEETTREATS</div>
                        <div class="g-sweet-window" style="background: transparent; border:none;">
                            <img src="blueberry_cheesecake_1784385282085.png" alt="Cheesecake" style="box-shadow: 0 20px 40px rgba(0,0,0,0.5);">
                        </div>
                    </div>
                    
                </div>
                <button class="g-btn" onclick="window.location.href='wishlist.html'">Shop Mini Boxes</button>
            </div>
        </div>

        <!-- THEME 4: SAGE & GREEN -->
        <div class="g-section g-sage">
            <div class="g-text">
                <div class="g-title">SAGE AND GREEN</div>
                <p style="font-family:'Courier New'; margin-bottom:30px;">- RESTAURANT -<br>EST. 2026</p>
                <p class="g-desc" style="font-family:'Arial';">Our eco-friendly, minimalist packaging ensures that your favorite artisan breads, cinnamon rolls, and macarons are delivered safely while caring for the planet.</p>
                <button class="g-btn" onclick="addToCart('Sage Green Hamper', 55, 'floating_macarons_1784385089856.png', 1); openCheckout();">View Eco Packaging</button>
            </div>
            <div class="g-img-container">
                <div class="g-sage-boxes">
                    <div class="g-sage-box">
                        <div class="g-sage-label">SWEETTREATS<br>MACARONS</div>
                        <img src="floating_macarons_1784385089856.png">
                    </div>
                    <div class="g-sage-box">
                        <div class="g-sage-label">SWEETTREATS<br>BAKERY</div>
                        <img src="pastry_category_1777660510169.png">
                    </div>
                    <div class="g-sage-box" style="width: 100%;">
                        <div class="g-sage-label">SWEETTREATS<br>ASSORTED BOX</div>
                        <div style="display:flex; gap:10px; margin-top:20px;">
                            <img src="croissant_splash_1784385246079.png" style="height:100px;">
                            <img src="fresh_bread_basket_1784385258109.png" style="height:100px;">
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- THEME 5: CHAPTERS -->
        <div class="g-section g-chapters">
            <div class="g-text">
                <div class="g-title" style="font-family: 'Georgia';">SweetTreats Combo</div>
                <p class="g-desc">The ultimate morning surprise. A beautiful pink gift box featuring a hot beverage cup holder perfectly integrated on top, with a secret pull-out drawer below holding a freshly baked, warm raspberry cinnamon roll.</p>
                <button class="g-btn" onclick="addToCart('Pink Drawer Combo', 35, 'croissant_coffee_1784385270265.png', 1); openCheckout();">Gift This Combo</button>
            </div>
            <div class="g-img-container">
                <div class="g-chap-box">
                    <div class="g-chap-top"></div>
                    <div class="g-chap-cup">
                        <img src="croissant_coffee_1784385270265.png">
                    </div>
                    <div class="g-chap-logo">
                        <i class="fa-solid fa-book-open"></i>
                        <h3>SweetTreats</h3>
                        <p style="font-size: 0.7rem; letter-spacing: 2px; color: #888; text-transform: uppercase;">Coffee | Bakery | Gifts</p>
                    </div>
                    
                    <div class="g-chap-drawer" onclick="addToCart('Raspberry Roll', 15, 'pastry_category_1777660510169.png', 1); openCheckout();">
                        <img src="pastry_category_1777660510169.png" alt="Roll">
                    </div>
                </div>
            </div>
        </div>

    </div>
`;

// Inject into gifting.html
const headEnd = baseHtml.indexOf('</head>');
let finalHtml = baseHtml.substring(0, headEnd) + giftingCss + '</head><body>' + navHtml + giftingBody + footerHtml + '</body></html>';

fs.writeFileSync('gifting.html', finalHtml);
console.log('gifting.html completely rebuilt with 5 packaging themes!');
