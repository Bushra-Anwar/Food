const fs = require('fs');

const masonryCss = `
        /* PINTEREST MASONRY LAYOUT */
        .masonry-container {
            column-count: 4;
            column-gap: 20px;
            padding: 40px;
            max-width: 1400px;
            margin: 0 auto;
        }
        @media (max-width: 1200px) { .masonry-container { column-count: 3; } }
        @media (max-width: 900px) { .masonry-container { column-count: 2; } }
        @media (max-width: 600px) { .masonry-container { column-count: 1; } }
        
        .masonry-item {
            break-inside: avoid;
            margin-bottom: 20px;
            border-radius: 16px;
            overflow: hidden;
            position: relative;
            background: #fff;
            box-shadow: 0 4px 15px rgba(0,0,0,0.05);
            transition: transform 0.3s ease;
            cursor: pointer;
        }
        .masonry-item:hover {
            transform: translateY(-5px);
        }
        .masonry-item img {
            width: 100%;
            display: block;
            object-fit: cover;
        }
        .masonry-overlay {
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            padding: 20px;
            background: linear-gradient(transparent, rgba(0,0,0,0.8));
            color: white;
            opacity: 0;
            transition: 0.3s;
            display: flex;
            flex-direction: column;
            justify-content: flex-end;
        }
        .masonry-item:hover .masonry-overlay {
            opacity: 1;
        }
        .masonry-title {
            font-size: 1.2rem;
            font-weight: bold;
            margin-bottom: 5px;
        }
        .masonry-price {
            font-size: 1.1rem;
            color: #ff9a9e;
            font-weight: bold;
        }
        .btn-pin {
            position: absolute;
            top: 15px;
            right: 15px;
            background: #e60023;
            color: white;
            border: none;
            padding: 8px 15px;
            border-radius: 20px;
            font-weight: bold;
            opacity: 0;
            transition: 0.3s;
            cursor: pointer;
        }
        .btn-pin:hover {
            background: #b3001b;
        }
        .masonry-item:hover .btn-pin {
            opacity: 1;
        }
        
        /* Banner inside masonry */
        .masonry-banner {
            background: var(--clr-primary, #ff4d4d);
            color: white;
            padding: 40px 20px;
            text-align: center;
            border-radius: 16px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            min-height: 250px;
        }
`;

const icecreamContent = `
    <div style="text-align: center; padding: 40px 20px 0;">
        <h1 style="font-size: 2.5rem; font-family: var(--font-heading, sans-serif);">Premium Ice Cream</h1>
        <p style="color: #666; margin-top: 10px;">Discover our hand-crafted, Pinterest-worthy frozen delights.</p>
    </div>

    <!-- PINTEREST MASONRY GRID -->
    <div class="masonry-container">
        
        <div class="masonry-item">
            <img src="icecream_category_1777660485890.png" alt="Vanilla Cone" style="height: 350px;">
            <button class="btn-pin">Save</button>
            <div class="masonry-overlay">
                <div class="masonry-title">Classic Vanilla Cone</div>
                <div class="masonry-price">₹199</div>
            </div>
        </div>

        <div class="masonry-item masonry-banner" style="height: 250px; background: linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%); color: #333;">
            <h2>Summer Scoop</h2>
            <p>Buy 1 Get 1 Free</p>
        </div>

        <div class="masonry-item">
            <img src="recommended_icecream.png" alt="Mango Gelato" style="height: 280px;">
            <button class="btn-pin">Save</button>
            <div class="masonry-overlay">
                <div class="masonry-title">Alphonso Mango Gelato</div>
                <div class="masonry-price">₹229</div>
            </div>
        </div>

        <div class="masonry-item">
            <img src="deal_desserts_grid_1777660360923.png" alt="Dessert Bowl" style="height: 400px;">
            <button class="btn-pin">Save</button>
            <div class="masonry-overlay">
                <div class="masonry-title">Mixed Dessert Sundae</div>
                <div class="masonry-price">₹349</div>
            </div>
        </div>

        <div class="masonry-item">
            <img src="category_desserts_group_1777660339198.png" alt="Dessert Group" style="height: 300px;">
            <button class="btn-pin">Save</button>
            <div class="masonry-overlay">
                <div class="masonry-title">Family Pack Premium</div>
                <div class="masonry-price">₹599</div>
            </div>
        </div>
        
        <div class="masonry-item masonry-banner" style="height: 280px; background: #333;">
            <h2>Gelato Fest</h2>
            <p>New Flavors Added</p>
            <button style="margin-top: 15px; padding: 10px 20px; border-radius: 20px; border:none; cursor: pointer; font-weight: bold;">Explore All</button>
        </div>

    </div>
`;

const giftingContent = `
    <div style="text-align: center; padding: 40px 20px 0;">
        <h1 style="font-size: 2.5rem; font-family: var(--font-heading, sans-serif);">Gifting & Hampers</h1>
        <p style="color: #666; margin-top: 10px;">Perfect surprise gifts and hampers, Pinterest-style.</p>
    </div>

    <!-- PINTEREST MASONRY GRID -->
    <div class="masonry-container">
        
        <div class="masonry-item">
            <img src="cupcake_deal_1777660591014.png" alt="Cupcake Hamper" style="height: 300px;">
            <button class="btn-pin">Save</button>
            <div class="masonry-overlay">
                <div class="masonry-title">Red Velvet Hamper</div>
                <div class="masonry-price">₹899</div>
            </div>
        </div>

        <div class="masonry-item masonry-banner" style="height: 220px; background: linear-gradient(135deg, #fccb90 0%, #d57eeb 100%);">
            <h2>Perfect Surprise</h2>
            <p>Valentine's Collection</p>
        </div>

        <div class="masonry-item">
            <img src="macaron_deal_1777660573385.png" alt="Macaron Box" style="height: 380px;">
            <button class="btn-pin">Save</button>
            <div class="masonry-overlay">
                <div class="masonry-title">Luxury Macaron Box</div>
                <div class="masonry-price">₹999</div>
            </div>
        </div>

        <div class="masonry-item">
            <img src="brownie_deal_1777660550780.png" alt="Brownie Box" style="height: 250px;">
            <button class="btn-pin">Save</button>
            <div class="masonry-overlay">
                <div class="masonry-title">The Brownie Box</div>
                <div class="masonry-price">₹699</div>
            </div>
        </div>

        <div class="masonry-item">
            <img src="cake_category_1777660447849.png" alt="Cake Gift" style="height: 350px;">
            <button class="btn-pin">Save</button>
            <div class="masonry-overlay">
                <div class="masonry-title">Birthday Surprise Cake</div>
                <div class="masonry-price">₹1299</div>
            </div>
        </div>
        
        <div class="masonry-item masonry-banner" style="height: 300px; background: #222;">
            <h2>Corporate Gifting</h2>
            <p>Bulk orders available</p>
            <button style="margin-top: 15px; padding: 10px 20px; border-radius: 20px; border:none; cursor: pointer; font-weight: bold;">Contact Us</button>
        </div>

    </div>
`;

function processFile(filename, newContent) {
    let html = fs.readFileSync(filename, 'utf8');
    
    // Inject CSS
    const styleEnd = html.indexOf('</style>');
    if (styleEnd !== -1) {
        html = html.substring(0, styleEnd) + masonryCss + html.substring(styleEnd);
    }
    
    // Replace Content
    const navEnd = html.indexOf('</nav>') + '</nav>'.length;
    const overlaysStart = html.indexOf('<!-- OVERLAYS -->');
    if (navEnd !== -1 && overlaysStart !== -1) {
        html = html.substring(0, navEnd) + '\n\n' + newContent + '\n\n' + html.substring(overlaysStart);
    }
    
    fs.writeFileSync(filename, html);
    console.log('Updated ' + filename);
}

processFile('icecream.html', icecreamContent);
processFile('gifting.html', giftingContent);

// Copy updated index.html back to root to make sure it's the latest
fs.copyFileSync('index.html', '../index.html');
