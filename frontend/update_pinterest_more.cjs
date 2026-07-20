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

const cakesContent = `
    <div style="text-align: center; padding: 40px 20px 0;">
        <h1 style="font-size: 2.5rem; font-family: var(--font-heading, sans-serif);">Bespoke Cakes</h1>
        <p style="color: #666; margin-top: 10px;">Aesthetically pleasing, Pinterest-perfect cakes for every occasion.</p>
    </div>

    <!-- PINTEREST MASONRY GRID -->
    <div class="masonry-container">
        
        <div class="masonry-item">
            <img src="cake_category_1777660447849.png" alt="Chocolate Truffle" style="height: 400px;">
            <button class="btn-pin">Save</button>
            <div class="masonry-overlay">
                <div class="masonry-title">Chocolate Truffle</div>
                <div class="masonry-price">₹799</div>
            </div>
        </div>

        <div class="masonry-item masonry-banner" style="height: 200px; background: linear-gradient(135deg, #fbc2eb 0%, #a6c1ee 100%);">
            <h2>Wedding Collection</h2>
            <p>Elegant & Floral</p>
        </div>

        <div class="masonry-item">
            <img src="recommended_cake.png" alt="Red Velvet" style="height: 300px;">
            <button class="btn-pin">Save</button>
            <div class="masonry-overlay">
                <div class="masonry-title">Premium Red Velvet</div>
                <div class="masonry-price">₹899</div>
            </div>
        </div>

        <div class="masonry-item">
            <img src="cake_category_1777660447849.png" alt="Black Forest" style="height: 250px;">
            <button class="btn-pin">Save</button>
            <div class="masonry-overlay">
                <div class="masonry-title">Classic Black Forest</div>
                <div class="masonry-price">₹649</div>
            </div>
        </div>
        
        <div class="masonry-item masonry-banner" style="height: 280px; background: #333;">
            <h2>Custom Designs</h2>
            <p>Tell us your vision</p>
            <button style="margin-top: 15px; padding: 10px 20px; border-radius: 20px; border:none; cursor: pointer; font-weight: bold;">Order Now</button>
        </div>

        <div class="masonry-item">
            <img src="recommended_cake.png" alt="Mango Fresh Cream" style="height: 380px;">
            <button class="btn-pin">Save</button>
            <div class="masonry-overlay">
                <div class="masonry-title">Mango Fresh Cream</div>
                <div class="masonry-price">₹749</div>
            </div>
        </div>

    </div>
`;

const donutsContent = `
    <div style="text-align: center; padding: 40px 20px 0;">
        <h1 style="font-size: 2.5rem; font-family: var(--font-heading, sans-serif);">Gourmet Donuts</h1>
        <p style="color: #666; margin-top: 10px;">Sweet, glazed, and visually stunning Pinterest donuts.</p>
    </div>

    <!-- PINTEREST MASONRY GRID -->
    <div class="masonry-container">
        
        <div class="masonry-item">
            <img src="donut_category_1777660467553.png" alt="Chocolate Donut" style="height: 250px;">
            <button class="btn-pin">Save</button>
            <div class="masonry-overlay">
                <div class="masonry-title">Belgian Choc Donut</div>
                <div class="masonry-price">₹149</div>
            </div>
        </div>

        <div class="masonry-item">
            <img src="recommended_donut.png" alt="Strawberry Donut" style="height: 350px;">
            <button class="btn-pin">Save</button>
            <div class="masonry-overlay">
                <div class="masonry-title">Strawberry Glaze</div>
                <div class="masonry-price">₹129</div>
            </div>
        </div>

        <div class="masonry-item masonry-banner" style="height: 300px; background: linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%);">
            <h2>Donut Boxes</h2>
            <p>Buy 2 Get 1 Free</p>
            <button style="margin-top: 15px; padding: 10px 20px; border-radius: 20px; border:none; cursor: pointer; font-weight: bold; color: #333;">Shop Now</button>
        </div>

        <div class="masonry-item">
            <img src="donut_category_1777660467553.png" alt="Caramel Donut" style="height: 400px;">
            <button class="btn-pin">Save</button>
            <div class="masonry-overlay">
                <div class="masonry-title">Salted Caramel Ring</div>
                <div class="masonry-price">₹169</div>
            </div>
        </div>
        
        <div class="masonry-item">
            <img src="recommended_donut.png" alt="Sprinkles Donut" style="height: 280px;">
            <button class="btn-pin">Save</button>
            <div class="masonry-overlay">
                <div class="masonry-title">Rainbow Sprinkles</div>
                <div class="masonry-price">₹119</div>
            </div>
        </div>

    </div>
`;

function processFile(filename, newContent) {
    let html = fs.readFileSync(filename, 'utf8');
    
    // Inject CSS if not already present
    const styleEnd = html.indexOf('</style>');
    if (styleEnd !== -1 && !html.includes('.masonry-container')) {
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

processFile('cakes.html', cakesContent);
processFile('donuts.html', donutsContent);

