const fs = require('fs');

let html = fs.readFileSync('gifting.html', 'utf8');

const newStyles = `
    /* THEME 6: TAUPE CUSTOM */
    .g-taupe { background: #e6dfd8; color: #222; }
    .g-taupe .g-title { font-family: 'Arial Black', sans-serif; font-size: 4rem; text-transform: uppercase; letter-spacing: -2px; line-height: 1; }
    .g-taupe .g-subtitle { font-family: 'Times New Roman', serif; font-style: italic; font-size: 2.5rem; margin-bottom: 30px; display: block; }
    .g-taupe-box { background: #b8aba0; border-radius: 5px; padding: 40px; position: relative; overflow: hidden; box-shadow: 0 20px 40px rgba(0,0,0,0.1); }
    .g-taupe-box::before { content: ''; position: absolute; top:0; left:0; right:0; bottom:0; background: url('data:image/svg+xml;utf8,<svg width="20" height="20" xmlns="http://www.w3.org/2000/svg"><circle cx="2" cy="2" r="1" fill="rgba(0,0,0,0.05)"/></svg>'); z-index: 0; }
    .g-taupe-box * { position: relative; z-index: 1; }
    .g-taupe-circle { position: absolute; top: 20px; right: 20px; width: 80px; height: 80px; border-radius: 50%; border: 2px solid #e6dfd8; display: flex; align-items: center; justify-content: center; color: #e6dfd8; font-family: 'Times New Roman'; font-size: 0.9rem; text-align: center; }
    .g-taupe .g-btn { background: #222; color: #e6dfd8; }

    /* THEME 7: CURVED ROLLS */
    .g-curved { background: #fdfaf5; color: #5a4b41; flex-direction: row-reverse; }
    .g-curved .g-title { font-family: 'Georgia', serif; font-size: 3.5rem; font-style: italic; margin-bottom: 30px; }
    .g-curved-items { display: flex; flex-direction: column; gap: 40px; }
    .g-curved-item { background: #fff; border-radius: 20px 20px 0 0; padding: 20px; border: 1px solid #eee; box-shadow: 0 10px 30px rgba(0,0,0,0.05); display: flex; align-items: center; gap: 20px; position: relative; }
    .g-curved-handle { width: 60px; height: 20px; border-radius: 15px 15px 0 0; background: #8b997c; position: absolute; top: -20px; left: 50%; transform: translateX(-50%); }
    .g-curved-item:nth-child(2) .g-curved-handle { background: #7a3b3b; }
    .g-curved .g-btn { background: #5a4b41; color: #fdfaf5; }

    /* THEME 8: MAROON & BLUE PATISSERIE */
    .g-maroon { background: #f4f5f7; color: #6a1a2f; }
    .g-maroon-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
    .g-maroon-card { padding: 40px 20px; text-align: center; border-radius: 5px; box-shadow: 0 15px 40px rgba(0,0,0,0.08); display: flex; flex-direction: column; align-items: center; justify-content: center; }
    .g-maroon-card.blue { background: #b4c5d6; color: #6a1a2f; }
    .g-maroon-card.red { background: #6a1a2f; color: #f4f5f7; }
    .g-maroon .g-title { font-family: 'Times New Roman', serif; font-size: 3.5rem; text-transform: uppercase; letter-spacing: 2px; }
    .g-maroon-logo { font-family: 'Dancing Script', cursive; font-size: 2rem; margin-bottom: 10px; }
    .g-maroon .g-btn { background: #6a1a2f; color: #f4f5f7; }

    /* THEME 9: BABY BLUE */
    .g-baby { background: #dceaf5; color: #5b2c3a; flex-direction: row-reverse; }
    .g-baby .g-title { font-family: 'Courier New', monospace; font-size: 3rem; font-weight: bold; letter-spacing: -1px; margin-bottom: 20px; }
    .g-baby-box { background: repeating-linear-gradient(0deg, #b0cce3, #b0cce3 2px, #c3d9ec 2px, #c3d9ec 4px); padding: 40px; border-radius: 5px; box-shadow: 0 20px 50px rgba(91, 44, 58, 0.15); border: 2px solid #a3c4df; }
    .g-baby-badge { background: #dceaf5; border: 2px solid #5b2c3a; border-radius: 10px; padding: 15px 30px; text-align: center; margin: 0 auto 30px; width: fit-content; font-family: 'Courier New'; font-weight: bold; color: #5b2c3a; }
    .g-baby .g-btn { background: #5b2c3a; color: #dceaf5; border: none; }

    /* THEME 10: GREEN IDENTITY */
    .g-identity { background: #4a5c50; color: #e6dcc3; text-align: center; display: block; padding-bottom: 120px; }
    .g-id-container { max-width: 1000px; margin: 0 auto; }
    .g-identity .g-title { font-family: 'Georgia', serif; font-size: 4rem; margin-bottom: 50px; border-bottom: 1px solid rgba(230,220,195,0.3); padding-bottom: 20px; }
    .g-id-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
    .g-id-card { background: #5c6b5f; padding: 25px; border-radius: 5px; border: 1px solid #7a8a7d; text-align: left; }
    .g-id-card img { width: 100%; height: 160px; object-fit: cover; margin-bottom: 15px; border-radius: 5px; }
    .g-identity .g-btn { background: #e6dcc3; color: #4a5c50; margin-top: 50px; font-size: 1.2rem; }
`;

const newSections = `
        <!-- THEME 6: TAUPE CUSTOM -->
        <div class="g-section g-taupe">
            <div class="g-text">
                <span class="g-subtitle">Custom</span>
                <div class="g-title">CAKE BOXES</div>
                <p class="g-desc">Personalize your special moments with our bespoke taupe cake boxes. Designed with elegant floral damask patterns and gold-foiled insignia for that perfect premium unboxing experience.</p>
                <button class="g-btn" onclick="addToCart('Custom Taupe Box', 40, 'recommended_cake.png', 1); openCheckout();">Order Custom Box</button>
            </div>
            <div class="g-img-container">
                <div class="g-taupe-box">
                    <div class="g-taupe-circle">Sweet<br>Treats</div>
                    <img src="recommended_cake.png" style="width:100%; border-radius:10px; height: 300px; object-fit:cover;">
                </div>
            </div>
        </div>

        <!-- THEME 7: CURVED ROLLS -->
        <div class="g-section g-curved">
            <div class="g-text">
                <div class="g-title">Signature Rolls</div>
                <p class="g-desc">Soft, freshly baked sponge rolls filled with smooth cream. Packaged delightfully in our custom curved-top handle boxes. Perfect for carrying home or gifting to a friend.</p>
                <button class="g-btn" onclick="addToCart('Matcha Roll Box', 22, 'pastry_category_1777660510169.png', 1); openCheckout();">Gift a Roll</button>
            </div>
            <div class="g-img-container">
                <div class="g-curved-items">
                    <div class="g-curved-item">
                        <div class="g-curved-handle"></div>
                        <img src="pastry_category_1777660510169.png" style="width:100px; height:100px; object-fit:cover; border-radius:50%;">
                        <div>
                            <h4 style="font-family:'Georgia'; font-size:1.2rem; margin-bottom:5px;">Matcha Rolls</h4>
                            <p style="font-size:0.8rem; color:#888;">Soft sponge rolls filled with smooth matcha cream.</p>
                        </div>
                    </div>
                    <div class="g-curved-item">
                        <div class="g-curved-handle"></div>
                        <img src="cupcake_deal_1777660591014.png" style="width:100px; height:100px; object-fit:cover; border-radius:50%;">
                        <div>
                            <h4 style="font-family:'Georgia'; font-size:1.2rem; margin-bottom:5px;">Cherry Rolls</h4>
                            <p style="font-size:0.8rem; color:#888;">Delicate, playful, and freshly baked every morning.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- THEME 8: MAROON & BLUE PATISSERIE -->
        <div class="g-section g-maroon">
            <div class="g-text">
                <div class="g-title">THE SWEET<br>STUDIO</div>
                <p class="g-desc" style="margin-top:20px;">Experience true patisserie luxury. Our bespoke maroon and powder blue gift boxes feature beautiful striped interior linings, perfectly presenting our delicate entremets and gâteaux.</p>
                <button class="g-btn" onclick="addToCart('Studio Patisserie Box', 85, 'macaron_deal_1777660573385.png', 1); openCheckout();">Shop Studio Collection</button>
            </div>
            <div class="g-img-container">
                <div class="g-maroon-grid">
                    <div class="g-maroon-card red">
                        <div class="g-maroon-logo">SweetTreats</div>
                        <img src="blueberry_cheesecake_1784385282085.png" style="width:100px; height:100px; border-radius:50%; margin-top:20px;">
                    </div>
                    <div class="g-maroon-card blue">
                        <div class="g-maroon-logo">SweetTreats</div>
                        <img src="floating_macarons_1784385089856.png" style="width:100px; height:100px; border-radius:50%; margin-top:20px;">
                    </div>
                </div>
            </div>
        </div>

        <!-- THEME 9: BABY BLUE -->
        <div class="g-section g-baby">
            <div class="g-text">
                <div class="g-title">PATISSERIE<br>ASSORTED</div>
                <p class="g-desc">Perfectly organized assortments of your favorite tarts, choux, and pastries. Delivered in our signature baby blue corrugated gift boxes that ensure every delicate piece arrives perfectly intact.</p>
                <button class="g-btn" onclick="addToCart('Assorted Tart Box', 60, 'recommended_pastry.png', 1); openCheckout();">Buy Assortment</button>
            </div>
            <div class="g-img-container">
                <div class="g-baby-box">
                    <div class="g-baby-badge">SWEETTREATS<br><span style="font-size:0.7rem; font-weight:normal;">PATISSERIE</span></div>
                    <div style="display:grid; grid-template-columns: repeat(3, 1fr); gap:10px;">
                        <img src="recommended_pastry.png" style="width:100%; height:80px; object-fit:cover; border-radius:5px;">
                        <img src="cupcake_deal_1777660591014.png" style="width:100%; height:80px; object-fit:cover; border-radius:5px;">
                        <img src="macaron_deal_1777660573385.png" style="width:100%; height:80px; object-fit:cover; border-radius:5px;">
                        <img src="pastry_category_1777660510169.png" style="width:100%; height:80px; object-fit:cover; border-radius:5px;">
                        <img src="blueberry_cheesecake_1784385282085.png" style="width:100%; height:80px; object-fit:cover; border-radius:5px;">
                        <img src="floating_macarons_1784385089856.png" style="width:100%; height:80px; object-fit:cover; border-radius:5px;">
                    </div>
                </div>
            </div>
        </div>

        <!-- THEME 10: GREEN IDENTITY -->
        <div class="g-section g-identity">
            <div class="g-id-container">
                <div class="g-title">SweetTreats Identity</div>
                <div class="g-id-grid">
                    <div class="g-id-card">
                        <img src="croissant_coffee_1784385270265.png">
                        <h4 style="font-family:'Georgia';">Premium Carry Holder</h4>
                        <p style="font-size:0.8rem; color:#a6b5ab; margin-top:5px;">Secure coffee carrying</p>
                    </div>
                    <div class="g-id-card">
                        <img src="iced_coffee_splash_1784385065567.png">
                        <h4 style="font-family:'Georgia';">Coffee Sachets</h4>
                        <p style="font-size:0.8rem; color:#a6b5ab; margin-top:5px;">Instant artisan blend</p>
                    </div>
                    <div class="g-id-card">
                        <img src="fresh_bread_basket_1784385258109.png">
                        <h4 style="font-family:'Georgia';">Premium Tin Container</h4>
                        <p style="font-size:0.8rem; color:#a6b5ab; margin-top:5px;">Airtight freshness seal</p>
                    </div>
                </div>
                <button class="g-btn" onclick="addToCart('Identity Corporate Gift', 120, 'croissant_coffee_1784385270265.png', 1); openCheckout();">GET YOUR BRAND DESIGNED →</button>
            </div>
        </div>
`;

// Insert the new CSS right before </style>
html = html.replace('</style>', newStyles + '\n</style>');

// Insert the new HTML sections right before the closing </div> of <div class="g-body">
// We know that after the sections, there is </div>\n<footer> (or some spacing)
const footerStart = html.lastIndexOf('<footer');
const closingDivStart = html.lastIndexOf('</div>', footerStart);

if (closingDivStart !== -1) {
    html = html.substring(0, closingDivStart) + newSections + '\n    ' + html.substring(closingDivStart);
    fs.writeFileSync('gifting.html', html);
    console.log('Successfully appended 5 new packaging themes to gifting.html!');
} else {
    console.log('Failed to find injection point in gifting.html');
}

