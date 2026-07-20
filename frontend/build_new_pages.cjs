const fs = require('fs');

// Fetch the base nav from index.html to keep consistency
let indexHtml = '';
try {
    indexHtml = fs.readFileSync('index.html', 'utf8');
} catch (e) {
    console.error("Could not read index.html", e);
}

// Extract Nav
let navHtml = '';
if (indexHtml) {
    const navStart = indexHtml.indexOf('<nav class="navbar"');
    const navEnd = indexHtml.indexOf('</nav>') + '</nav>'.length;
    if (navStart !== -1 && navEnd !== -1) {
        navHtml = indexHtml.substring(navStart, navEnd);
    }
}

// Extract Footer
let footerHtml = '';
if (indexHtml) {
    const footStart = indexHtml.indexOf('<footer>');
    const footEnd = indexHtml.indexOf('</footer>') + '</footer>'.length;
    if (footStart !== -1 && footEnd !== -1) {
        footerHtml = indexHtml.substring(footStart, footEnd);
    }
}

// Ensure local storage JS is added to nav links so they can navigate
const baseHead = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SweetTreats</title>
    <link rel="stylesheet" href="styles.css">
    <link rel="stylesheet" href="custom_features.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
`;

// ==========================================
// 1. WISHLIST.HTML (Image 3, then 1, then 2)
// ==========================================
const wishlistCss = `
    <style>
    /* IMAGE 3: BEAUTY SHOP LAYOUT */
    .w-shop { padding: 50px 5%; display: flex; gap: 40px; background: #fafafa; }
    .w-sidebar { width: 250px; flex-shrink: 0; }
    .w-sidebar h3 { font-size: 1.2rem; margin-bottom: 20px; border-bottom: 1px solid #ddd; padding-bottom: 10px; }
    .w-filter-group { margin-bottom: 30px; }
    .w-filter-group h4 { font-size: 1rem; margin-bottom: 15px; color: #555; }
    .w-checkbox { display: flex; align-items: center; gap: 10px; margin-bottom: 10px; color: #666; cursor: pointer; }
    
    .w-grid-container { flex: 1; }
    .w-grid-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px; }
    .w-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 30px; }
    .w-card { background: #fff; border-radius: 15px; overflow: hidden; box-shadow: 0 5px 15px rgba(0,0,0,0.05); position: relative; transition: 0.3s; cursor: pointer; }
    .w-card:hover { transform: translateY(-5px); box-shadow: 0 15px 30px rgba(0,0,0,0.1); }
    .w-card-img { height: 250px; width: 100%; object-fit: cover; }
    .w-badge { position: absolute; top: 15px; left: 15px; background: #333; color: #fff; padding: 5px 10px; border-radius: 5px; font-size: 0.8rem; font-weight: bold; }
    .w-card-info { padding: 20px; }
    .w-card-cat { font-size: 0.8rem; color: #888; margin-bottom: 5px; }
    .w-card-title { font-size: 1.1rem; font-weight: bold; margin-bottom: 10px; color: #333; }
    .w-card-price { display: flex; gap: 10px; align-items: center; font-weight: bold; }
    .w-price-new { color: #e6b981; font-size: 1.2rem; }
    .w-price-old { color: #aaa; text-decoration: line-through; font-size: 0.9rem; }

    /* IMAGE 1: WARMNESS COLLECTION */
    .w-warmness { background: #fdf5e6; padding: 80px 5%; text-align: center; }
    .w-warm-hero { display: flex; background: repeating-linear-gradient(90deg, #e6f0fa, #e6f0fa 20px, #fff 20px, #fff 40px); border-radius: 20px; padding: 50px; align-items: center; justify-content: space-around; margin-bottom: 60px; box-shadow: 0 10px 30px rgba(0,0,0,0.05); }
    .w-warm-text h2 { font-size: 4rem; color: #ff9a8b; font-family: 'Arial Rounded MT Bold', sans-serif; line-height: 1.1; }
    .w-warm-text span { background: #e0f2cb; padding: 5px 20px; border-radius: 20px; color: #fff; font-size: 1.5rem; display: inline-block; margin-bottom: 20px; }
    .w-warm-img { position: relative; }
    .w-scallop-mask { mask-image: url('data:image/svg+xml;utf8,<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="M50 0 C60 20 80 10 100 30 C90 50 100 70 80 90 C60 80 40 100 20 90 C0 70 10 50 0 30 C20 40 30 10 50 0 Z"/></svg>'); mask-size: contain; mask-repeat: no-repeat; width: 400px; height: 400px; object-fit: cover; }
    
    .w-warm-bestsellers { display: grid; grid-template-columns: repeat(3, 1fr); gap: 30px; }
    .w-warm-card { background: #fff; border-radius: 30px; padding: 20px; text-align: center; position: relative; border: 5px solid #e6f0fa; transition: 0.3s; cursor: pointer; }
    .w-warm-card:hover { transform: scale(1.05); }
    .w-warm-card img { width: 100%; height: 250px; object-fit: cover; border-radius: 20px; margin-bottom: 15px; }
    .w-warm-title { background: #a6c0fe; color: #fff; padding: 10px; border-radius: 20px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px; }

    /* IMAGE 2: TAPLINK BENTO */
    .w-taplink { background: #f4e8e8; padding: 80px 5%; display: flex; justify-content: center; gap: 50px; }
    .w-tap-phone { width: 380px; background: #fdf5f5; border-radius: 40px; border: 15px solid #fff; padding: 30px 20px; box-shadow: 0 20px 50px rgba(0,0,0,0.1); position: relative; }
    .w-tap-header { text-align: center; color: #d46a6a; font-family: 'Times New Roman', serif; font-size: 2rem; margin-bottom: 30px; border-bottom: 2px solid #f0d4d4; padding-bottom: 20px; }
    .w-tap-item { background: #fff; border: 2px solid #f0d4d4; border-radius: 20px; padding: 15px; margin-bottom: 20px; display: flex; align-items: center; gap: 15px; cursor: pointer; transition: 0.3s; }
    .w-tap-item:hover { transform: translateY(-5px); box-shadow: 0 10px 20px rgba(212,106,106,0.1); }
    .w-tap-item img { width: 80px; height: 80px; object-fit: cover; border-radius: 10px; }
    .w-tap-item h4 { color: #d46a6a; font-size: 1.1rem; margin-bottom: 5px; }
    .w-tap-item p { font-size: 0.8rem; color: #888; line-height: 1.4; }
    .w-tap-price-box { background: #e8f0d8; border: 2px solid #c8d8b0; border-radius: 20px; padding: 20px; text-align: center; margin-top: 30px; }
    .w-tap-price-box h4 { color: #6a8c4a; margin-bottom: 10px; font-size: 1.2rem; }
    </style>
`;

const wishlistBody = `
    <!-- SECTION 1: SHOP GRID -->
    <div class="w-shop">
        <div class="w-sidebar">
            <h3>Filter Options</h3>
            <div class="w-filter-group">
                <h4>By Categories</h4>
                <label class="w-checkbox"><input type="checkbox"> Cakes</label>
                <label class="w-checkbox"><input type="checkbox" checked> Donuts</label>
                <label class="w-checkbox"><input type="checkbox"> Pastries</label>
                <label class="w-checkbox"><input type="checkbox"> Ice Cream</label>
            </div>
            <div class="w-filter-group">
                <h4>Price</h4>
                <input type="range" min="10" max="100" style="width:100%;">
                <div style="display:flex; justify-content:space-between; font-size:0.8rem; color:#888;"><span>$10</span><span>$100</span></div>
            </div>
            <div class="w-filter-group">
                <h4>By Promotions</h4>
                <label class="w-checkbox"><input type="checkbox"> New Arrivals</label>
                <label class="w-checkbox"><input type="checkbox" checked> Best Sellers</label>
            </div>
        </div>
        <div class="w-grid-container">
            <div class="w-grid-header">
                <div>Showing 1-12 of 2560 results</div>
                <div>Sort by: <b>Default Sorting</b></div>
            </div>
            <div class="w-grid">
                <!-- Card 1 -->
                <div class="w-card" onclick="openProductModal('Luxury Choco Box', 'Premium chocolate collection', 35, 'cake_category_1777660447849.png')">
                    <div class="w-badge">50% off</div>
                    <img src="cake_category_1777660447849.png" class="w-card-img">
                    <div class="w-card-info">
                        <div class="w-card-cat">Cakes <span style="float:right; color:#ffd700;">★ 4.9</span></div>
                        <div class="w-card-title">Luxury Choco Box</div>
                        <div class="w-card-price"><span class="w-price-new">$35.00</span> <span class="w-price-old">$70.00</span></div>
                    </div>
                </div>
                <!-- Card 2 -->
                <div class="w-card" onclick="openProductModal('Strawberry Delight', 'Fresh strawberry dessert', 48, 'recommended_donut.png')">
                    <div class="w-badge">20% off</div>
                    <img src="recommended_donut.png" class="w-card-img">
                    <div class="w-card-info">
                        <div class="w-card-cat">Donuts <span style="float:right; color:#ffd700;">★ 4.8</span></div>
                        <div class="w-card-title">Strawberry Delight</div>
                        <div class="w-card-price"><span class="w-price-new">$48.00</span> <span class="w-price-old">$60.00</span></div>
                    </div>
                </div>
                <!-- Card 3 -->
                <div class="w-card" onclick="openProductModal('Vanilla Bean Cone', 'Premium Madagascar vanilla', 12, 'icecream_category_1777660485890.png')">
                    <div class="w-badge">30% off</div>
                    <img src="icecream_category_1777660485890.png" class="w-card-img">
                    <div class="w-card-info">
                        <div class="w-card-cat">Ice Cream <span style="float:right; color:#ffd700;">★ 5.0</span></div>
                        <div class="w-card-title">Vanilla Bean Cone</div>
                        <div class="w-card-price"><span class="w-price-new">$12.00</span> <span class="w-price-old">$18.00</span></div>
                    </div>
                </div>
                <!-- Card 4 -->
                <div class="w-card" onclick="openProductModal('Croissant Box', 'Assorted flaky pastries', 25, 'pastry_category_1777660510169.png')">
                    <div class="w-badge">10% off</div>
                    <img src="pastry_category_1777660510169.png" class="w-card-img">
                    <div class="w-card-info">
                        <div class="w-card-cat">Pastries <span style="float:right; color:#ffd700;">★ 4.7</span></div>
                        <div class="w-card-title">Croissant Box</div>
                        <div class="w-card-price"><span class="w-price-new">$25.00</span> <span class="w-price-old">$28.00</span></div>
                    </div>
                </div>
                 <!-- Card 5 -->
                <div class="w-card" onclick="openProductModal('Berry Macarons', 'French style macarons', 30, 'macaron_deal_1777660573385.png')">
                    <div class="w-badge">50% off</div>
                    <img src="macaron_deal_1777660573385.png" class="w-card-img">
                    <div class="w-card-info">
                        <div class="w-card-cat">Gifting <span style="float:right; color:#ffd700;">★ 4.9</span></div>
                        <div class="w-card-title">Berry Macarons</div>
                        <div class="w-card-price"><span class="w-price-new">$30.00</span> <span class="w-price-old">$60.00</span></div>
                    </div>
                </div>
                 <!-- Card 6 -->
                <div class="w-card" onclick="openProductModal('Cupcake Assortment', '6 assorted mini cupcakes', 20, 'cupcake_deal_1777660591014.png')">
                    <div class="w-badge">50% off</div>
                    <img src="cupcake_deal_1777660591014.png" class="w-card-img">
                    <div class="w-card-info">
                        <div class="w-card-cat">Cupcakes <span style="float:right; color:#ffd700;">★ 4.8</span></div>
                        <div class="w-card-title">Cupcake Assortment</div>
                        <div class="w-card-price"><span class="w-price-new">$20.00</span> <span class="w-price-old">$40.00</span></div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- SECTION 2: WARMNESS -->
    <div class="w-warmness">
        <div class="w-warm-hero">
            <div class="w-warm-text">
                <span style="background: #d4f0b3; color: #7cb342;">NEW</span><br>
                <h2>COLLECTION</h2>
            </div>
            <div class="w-warm-img">
                <img src="hero_dessert_banner_1777660313545.png" class="w-scallop-mask">
            </div>
        </div>
        
        <h2 style="text-align: left; color: #ff9a8b; font-family: 'Arial Rounded MT Bold', sans-serif; background: #ffe4e1; display: inline-block; padding: 10px 30px; border-radius: 30px; margin-bottom: 40px;">BESTSELLERS</h2>
        
        <div class="w-warm-bestsellers">
            <div class="w-warm-card" onclick="addToCart('Lucky Cereal', 15, 'donut_category_1777660467553.png', 1); openCheckout();">
                <div style="position: absolute; top: 30px; right: 30px; background: #fff; padding: 5px 15px; border-radius: 20px; font-weight: bold; color: #ff9a8b;">HIT</div>
                <img src="donut_category_1777660467553.png">
                <div class="w-warm-title" style="background: #a6c0fe;">LUCKY CEREAL</div>
            </div>
            <div class="w-warm-card" onclick="addToCart('Birthday Cake', 25, 'cake_category_1777660447849.png', 1); openCheckout();">
                <div style="position: absolute; top: 30px; right: 30px; background: #fff; padding: 5px 15px; border-radius: 20px; font-weight: bold; color: #ff9a8b;">HIT</div>
                <img src="cake_category_1777660447849.png">
                <div class="w-warm-title" style="background: #b4e0ff;">BIRTHDAY CAKE</div>
            </div>
            <div class="w-warm-card" onclick="addToCart('Floral Box', 20, 'macaron_deal_1777660573385.png', 1); openCheckout();">
                <img src="macaron_deal_1777660573385.png">
                <div class="w-warm-title" style="background: #b4e0ff;">FLORAL</div>
            </div>
        </div>
    </div>

    <!-- SECTION 3: TAPLINK -->
    <div class="w-taplink">
        <div class="w-tap-phone">
            <h2 class="w-tap-header">БЕНТО-ТОРТЫ<br>С ДУШОЙ</h2>
            <img src="recommended_cake.png" style="width: 100%; border-radius: 20px; margin-bottom: 20px; object-fit: cover; height: 250px;">
            <button style="width: 100%; background: #b5d89f; color: #fff; border: none; padding: 15px; border-radius: 30px; font-size: 1.1rem; font-weight: bold; cursor: pointer; margin-bottom: 30px;">оформить заказ</button>
            
            <h3 style="text-align: center; color: #d46a6a; margin-bottom: 20px;">• МОИ РАБОТЫ •</h3>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                <img src="cake_category_1777660447849.png" style="width: 100%; height: 120px; object-fit: cover; border-radius: 10px; border: 2px solid #fff; box-shadow: 0 5px 10px rgba(0,0,0,0.1);">
                <img src="recommended_cake.png" style="width: 100%; height: 120px; object-fit: cover; border-radius: 10px; border: 2px solid #fff; box-shadow: 0 5px 10px rgba(0,0,0,0.1);">
            </div>
        </div>
        
        <div class="w-tap-phone">
            <h3 style="text-align: center; color: #d46a6a; margin-bottom: 20px;">• НАЧИНКИ •</h3>
            
            <div class="w-tap-item" onclick="openProductModal('КРАСНЫЙ БАРХАТ', 'Red Velvet with cream cheese', 25, 'recommended_cake.png')">
                <img src="recommended_cake.png">
                <div>
                    <h4>КРАСНЫЙ БАРХАТ</h4>
                    <p>нежный бисквит с творожной прослойкой<br>• клубника • вишня</p>
                </div>
            </div>
            
            <div class="w-tap-item" onclick="openProductModal('СНИКЕРС', 'Chocolate and caramel', 30, 'cake_category_1777660447849.png')">
                <img src="cake_category_1777660447849.png">
                <div>
                    <h4>СНИКЕРС</h4>
                    <p>шоколадный торт с арахисовой прослойкой<br>• арахис • карамель</p>
                </div>
            </div>
            
            <div class="w-tap-price-box">
                <h4>БЕНТО S</h4>
                <p style="color: #666; font-size: 0.9rem; margin-bottom: 10px;">300-500 г / <b>1200 рублей</b></p>
                <p style="font-size: 0.8rem; color: #888;">что входит: бенто-торт, упаковка, лента, ложечка, свечка</p>
            </div>
        </div>
    </div>
`;
fs.writeFileSync('wishlist.html', baseHead + wishlistCss + '</head><body>' + navHtml + wishlistBody + footerHtml + `<script>function openCheckout() { window.location.href = 'cart.html'; } function addToCart() { /* dummy */ }</script></body></html>`);

// ==========================================
// 2. MENU.HTML (Image 4 Dough Daze)
// ==========================================
const menuCss = `
    <style>
    .m-body { background: linear-gradient(135deg, #fff5e6 0%, #ffe4d6 100%); min-height: 100vh; padding: 80px 5%; font-family: 'Georgia', serif; color: #4a3b32; }
    .m-header { text-align: center; margin-bottom: 80px; }
    .m-header i { font-size: 3rem; color: #e6b981; margin-bottom: 10px; }
    .m-header h1 { font-family: 'Brush Script MT', 'Dancing Script', cursive; font-size: 4.5rem; margin-bottom: 5px; color: #3e2820; }
    .m-header p { text-transform: uppercase; letter-spacing: 5px; font-weight: bold; border-top: 2px solid #3e2820; border-bottom: 2px solid #3e2820; display: inline-block; padding: 5px 20px; }
    
    .m-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 60px 100px; max-width: 1000px; margin: 0 auto; }
    .m-cat { margin-bottom: 40px; }
    .m-cat h2 { font-family: 'Brush Script MT', 'Dancing Script', cursive; font-size: 3.5rem; color: #3e2820; margin-bottom: 20px; }
    .m-item { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 10px; font-size: 1.1rem; }
    .m-name { position: relative; flex: 1; }
    .m-name::after { content: ''; position: absolute; bottom: 5px; width: 100%; border-bottom: 1px solid #d4a373; margin-left: 10px; }
    .m-price { font-weight: bold; margin-left: 10px; z-index: 1; background: transparent; padding-left: 10px; }
    
    .m-scallop-img { width: 180px; height: 180px; object-fit: cover; margin: 20px auto; display: block; border-radius: 10%; clip-path: polygon(50% 0%, 61% 10%, 75% 5%, 80% 20%, 95% 25%, 90% 39%, 100% 50%, 90% 61%, 95% 75%, 80% 80%, 75% 95%, 61% 90%, 50% 100%, 39% 90%, 25% 95%, 20% 80%, 5% 75%, 10% 61%, 0% 50%, 10% 39%, 5% 25%, 20% 20%, 25% 5%, 39% 10%); box-shadow: 0 10px 20px rgba(0,0,0,0.1); }
    </style>
`;
const menuBody = `
    <div class="m-body">
        <div class="m-header">
            <i class="fa-solid fa-croissant"></i>
            <h1>Dough Daze</h1>
            <p>PRICE LIST</p>
        </div>
        <div class="m-grid">
            <div class="m-col">
                <div class="m-cat">
                    <h2>Cookies</h2>
                    <div class="m-item"><span class="m-name">Chocolate Chip Cookies</span> <span class="m-price">2 for $3</span></div>
                    <div class="m-item"><span class="m-name">Sugar Cookies</span> <span class="m-price">2 for $3</span></div>
                    <div class="m-item"><span class="m-name">Peanut Butter Cookies</span> <span class="m-price">2 for $3</span></div>
                    <div class="m-item"><span class="m-name">Oatmeal Raisin Cookies</span> <span class="m-price">2 for $3</span></div>
                </div>
                <img src="cupcake_deal_1777660591014.png" class="m-scallop-img">
                <div class="m-cat">
                    <h2>Brownies & Bar</h2>
                    <div class="m-item"><span class="m-name">Chocolate Brownies</span> <span class="m-price">Single $2</span></div>
                    <div class="m-item"><span class="m-name">Lemon Bars</span> <span class="m-price">Single $2.50</span></div>
                    <div class="m-item"><span class="m-name">Blondies</span> <span class="m-price">Single $2</span></div>
                </div>
                <img src="pastry_category_1777660510169.png" class="m-scallop-img">
                <div class="m-cat">
                    <h2>Cakes</h2>
                    <div class="m-item"><span class="m-name">Vanilla Cake</span> <span class="m-price">Slice $3</span></div>
                    <div class="m-item"><span class="m-name">Chocolate Cake</span> <span class="m-price">Slice $3.50</span></div>
                </div>
            </div>
            
            <div class="m-col">
                <img src="macaron_deal_1777660573385.png" class="m-scallop-img">
                <div class="m-cat">
                    <h2 style="text-align: right;">Cupcakes</h2>
                    <div class="m-item"><span class="m-price" style="margin-left:0; margin-right:10px;">Single $2</span> <span class="m-name" style="text-align: right;">Chocolate Chip Cupcakes</span></div>
                    <div class="m-item"><span class="m-price" style="margin-left:0; margin-right:10px;">Single $2</span> <span class="m-name" style="text-align: right;">Sugar Cupcakes</span></div>
                    <div class="m-item"><span class="m-price" style="margin-left:0; margin-right:10px;">Single $2.50</span> <span class="m-name" style="text-align: right;">Peanut Butter Cupcakes</span></div>
                </div>
                <img src="brownie_deal_1777660550780.png" class="m-scallop-img">
                <div class="m-cat">
                    <h2 style="text-align: right;">Pies</h2>
                    <div class="m-item"><span class="m-price" style="margin-left:0; margin-right:10px;">Slice $3</span> <span class="m-name" style="text-align: right;">Apple Pie</span></div>
                    <div class="m-item"><span class="m-price" style="margin-left:0; margin-right:10px;">Slice $3.50</span> <span class="m-name" style="text-align: right;">Pumpkin Pie</span></div>
                    <div class="m-item"><span class="m-price" style="margin-left:0; margin-right:10px;">Slice $4</span> <span class="m-name" style="text-align: right;">Pecan Pie</span></div>
                </div>
                <img src="cake_category_1777660447849.png" class="m-scallop-img">
            </div>
        </div>
    </div>
`;
fs.writeFileSync('menu.html', baseHead + menuCss + '</head><body>' + navHtml + menuBody + footerHtml + '</body></html>');

// ==========================================
// 3. CART.HTML (Image 5 Shopping Cart)
// ==========================================
const cartCss = `
    <style>
    .c-body { background: #fafafa; min-height: 100vh; padding: 50px 5%; font-family: 'Helvetica Neue', Arial, sans-serif; }
    .c-container { max-width: 1000px; margin: 0 auto; background: #fff; border-radius: 20px; padding: 50px; box-shadow: 0 10px 40px rgba(0,0,0,0.03); }
    .c-header { text-align: center; font-size: 2.5rem; margin-bottom: 50px; font-weight: bold; color: #111; }
    
    .c-table { width: 100%; border-collapse: collapse; }
    .c-table th { color: #888; font-weight: normal; text-align: center; padding-bottom: 20px; border-bottom: 1px solid #eee; font-size: 0.9rem; }
    .c-table th:first-child { text-align: left; }
    .c-table td { padding: 30px 0; border-bottom: 1px solid #eee; vertical-align: middle; }
    
    .c-prod-col { display: flex; align-items: center; gap: 20px; }
    .c-prod-col img { width: 80px; height: 80px; object-fit: cover; border-radius: 15px; }
    .c-prod-info h4 { font-size: 1.1rem; color: #111; margin-bottom: 5px; font-weight: bold; }
    .c-prod-info p { color: #888; font-size: 0.9rem; margin-bottom: 5px; }
    .c-prod-info span { color: #5138ed; font-weight: bold; }
    
    .c-delivery { text-align: center; font-weight: bold; color: #111; }
    
    .c-qty-wrap { display: flex; justify-content: center; }
    .c-qty-box { display: flex; align-items: center; border: 1px solid #eee; border-radius: 30px; padding: 5px 15px; width: fit-content; gap: 15px; }
    .c-qty-box button { background: none; border: none; font-size: 1.2rem; color: #888; cursor: pointer; }
    .c-qty-box span { font-weight: bold; }
    
    .c-total-col { text-align: center; font-weight: bold; color: #5138ed; font-size: 1.1rem; }
    
    .c-summary { background: #fdfdfd; padding: 30px; border-radius: 15px; margin-top: 40px; }
    .c-sum-row { display: flex; justify-content: space-between; margin-bottom: 20px; color: #888; }
    .c-sum-row.c-grand { color: #111; font-weight: bold; font-size: 1.2rem; border-top: 1px solid #eee; padding-top: 20px; margin-bottom: 0; }
    .c-grand-val { color: #5138ed; }
    
    .c-actions { display: flex; justify-content: center; gap: 20px; margin-top: 40px; }
    .c-btn-coupon { background: #f0f0ff; color: #5138ed; border: none; padding: 15px 40px; border-radius: 30px; font-weight: bold; cursor: pointer; transition: 0.3s; }
    .c-btn-pay { background: #5138ed; color: #fff; border: none; padding: 15px 40px; border-radius: 30px; font-weight: bold; cursor: pointer; box-shadow: 0 10px 20px rgba(81, 56, 237, 0.3); transition: 0.3s; }
    .c-btn-pay:hover, .c-btn-coupon:hover { transform: translateY(-3px); }
    </style>
`;
const cartBody = `
    <div class="c-body">
        <div class="c-container">
            <h1 class="c-header">Shopping Cart</h1>
            <table class="c-table">
                <thead>
                    <tr>
                        <th>Product</th>
                        <th>Delivery Charge</th>
                        <th>Quantity</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody id="fullCartItems">
                    <!-- Dynamic Items will be rendered here. Showing dummy if empty -->
                    <tr>
                        <td>
                            <div class="c-prod-col">
                                <img src="cake_category_1777660447849.png">
                                <div class="c-prod-info">
                                    <h4>Luxury Truffle Box</h4>
                                    <p>Cakes</p>
                                    <span>$120.00</span>
                                </div>
                            </div>
                        </td>
                        <td class="c-delivery">$15.00</td>
                        <td>
                            <div class="c-qty-wrap">
                                <div class="c-qty-box">
                                    <button>-</button>
                                    <span>1</span>
                                    <button>+</button>
                                </div>
                            </div>
                        </td>
                        <td class="c-total-col">$120.00</td>
                    </tr>
                    <tr>
                        <td>
                            <div class="c-prod-col">
                                <img src="recommended_donut.png">
                                <div class="c-prod-info">
                                    <h4>Strawberry Glaze</h4>
                                    <p>Donuts</p>
                                    <span>$120.00</span>
                                </div>
                            </div>
                        </td>
                        <td class="c-delivery">$15.00</td>
                        <td>
                            <div class="c-qty-wrap">
                                <div class="c-qty-box">
                                    <button>-</button>
                                    <span>1</span>
                                    <button>+</button>
                                </div>
                            </div>
                        </td>
                        <td class="c-total-col">$120.00</td>
                    </tr>
                    <tr>
                        <td>
                            <div class="c-prod-col">
                                <img src="macaron_deal_1777660573385.png">
                                <div class="c-prod-info">
                                    <h4>Macaron Set</h4>
                                    <p>Gifting</p>
                                    <span>$120.00</span>
                                </div>
                            </div>
                        </td>
                        <td class="c-delivery">$15.00</td>
                        <td>
                            <div class="c-qty-wrap">
                                <div class="c-qty-box">
                                    <button>-</button>
                                    <span>1</span>
                                    <button>+</button>
                                </div>
                            </div>
                        </td>
                        <td class="c-total-col">$120.00</td>
                    </tr>
                </tbody>
            </table>
            
            <div class="c-summary">
                <div class="c-sum-row">
                    <span>Subtotal</span>
                    <span style="color:#111; font-weight:bold;">$360.00</span>
                </div>
                <div class="c-sum-row">
                    <span>Delivery Charge</span>
                    <span style="color:#111; font-weight:bold;">$45.00</span>
                </div>
                <div class="c-sum-row c-grand">
                    <span>Total</span>
                    <span class="c-grand-val">$405.00</span>
                </div>
            </div>
            
            <div class="c-actions">
                <button class="c-btn-coupon">Add Coupon Code ></button>
                <button class="c-btn-pay" onclick="alert('Proceeding to payment gateway...');">Continue to Payment ></button>
            </div>
        </div>
    </div>
    
    <script>
    // In a real app we'd load this from localStorage. 
    // The user's cart logic uses in-memory 'cart' array on each page.
    // We override openCheckout to redirect here globally.
    </script>
`;
fs.writeFileSync('cart.html', baseHead + cartCss + '</head><body>' + navHtml + cartBody + footerHtml + '</body></html>');

console.log("wishlist.html, menu.html, cart.html generated successfully!");
