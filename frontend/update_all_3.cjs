const fs = require('fs');

// ==========================================
// 1. UPDATE INDEX.HTML HERO (Task 1)
// ==========================================
let indexHtml = fs.readFileSync('index.html', 'utf8');

const newHeroHtml = `
    <!-- LUXURY HERO START -->
    <style>
    .luxury-hero {
        position: relative;
        background: #fdfaf6;
        padding: 100px 5%;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        overflow: hidden;
        border-bottom: 1px solid #eee;
    }
    .luxury-hero::before {
        content: '';
        position: absolute;
        top: 0; left: 0; bottom: 0; width: 45%;
        background: url('cake_category_1777660447849.png') no-repeat center center / cover;
        z-index: 1;
        opacity: 0.9;
        border-radius: 0 300px 300px 0;
        box-shadow: 10px 0 50px rgba(0,0,0,0.1);
    }
    .luxury-hero-text {
        flex: 0 0 55%;
        padding-left: 80px;
        position: relative;
        z-index: 2;
    }
    .luxury-hero-text h1 {
        font-family: 'Times New Roman', serif;
        font-size: 3.5rem;
        color: #2c2925;
        line-height: 1.2;
        margin-bottom: 25px;
        font-weight: normal;
    }
    .luxury-hero-text p {
        font-size: 1.2rem;
        color: #5a544c;
        margin-bottom: 40px;
        line-height: 1.6;
    }
    .btn-discover {
        background: linear-gradient(90deg, #d4af37, #f3e5ab);
        color: #2c2925;
        border: none;
        padding: 15px 40px;
        font-size: 1rem;
        font-weight: bold;
        cursor: pointer;
        border-radius: 3px;
        box-shadow: 0 10px 20px rgba(212,175,55,0.3);
        text-transform: uppercase;
        letter-spacing: 2px;
        transition: 0.3s;
    }
    .btn-discover:hover {
        transform: translateY(-3px);
        box-shadow: 0 15px 25px rgba(212,175,55,0.5);
    }
    </style>
    <section class="luxury-hero">
        <div class="luxury-hero-text">
            <h1>ARTISAN CHOCOLATE,<br>EXQUISITE PASTRIES &<br>MOMENTS OF<br>PURE INDULGENCE.</h1>
            <p>Experience the artistry of luxury desserts,<br>handcrafted with the finest ingredients.</p>
            <button class="btn-discover" onclick="window.location.href='discover.html'">DISCOVER OUR COLLECTIONS</button>
        </div>
    </section>
    <!-- LUXURY HERO END -->
`;

const heroStart = indexHtml.indexOf('<!-- HERO SLIDER -->');
const heroEnd = indexHtml.indexOf('<div class="container">', heroStart);
if (heroStart !== -1 && heroEnd !== -1) {
    indexHtml = indexHtml.substring(0, heroStart) + newHeroHtml + '\n        ' + indexHtml.substring(heroEnd);
    fs.writeFileSync('index.html', indexHtml);
    console.log('index.html updated with luxury hero');
}


// ==========================================
// 2. UPDATE DONUTS.HTML DESIGN (Task 2)
// ==========================================
let donutsHtml = fs.readFileSync('donuts.html', 'utf8');
// Replace colors and fonts to match Photo 3 (Peach #f4dfd0, warm brown #6d4c41, quirky serif)
donutsHtml = donutsHtml.replace(/font-family: Arial, sans-serif;/g, "font-family: 'Georgia', 'Times New Roman', serif; letter-spacing: 1px;");
donutsHtml = donutsHtml.replace(/#ffb9cb/g, "#f4dfd0"); // Pink bg -> Peach bg
donutsHtml = donutsHtml.replace(/#ff6b9e/g, "#6d4c41"); // Pink text -> warm brown text
// Update background of products section to match
donutsHtml = donutsHtml.replace(/class="d-products-section"/, 'class="d-products-section" style="background: #f4dfd0;"');
fs.writeFileSync('donuts.html', donutsHtml);
console.log('donuts.html updated with peach/serif design');


// ==========================================
// 3. BUILD COFFEE.HTML (Task 3)
// ==========================================
let coffeeHtml = fs.readFileSync('donuts.html', 'utf8'); // Just grab the base template structure

const coffeeCss = `
/* COFFEE DESIGN */
body { background: #e0d5cd; }
.coffee-wrapper {
    background: linear-gradient(180deg, #e0d5cd 0%, #b8a69b 40%, #7d655a 70%, #3e2820 100%);
    min-height: 100vh;
    padding: 100px 5% 50px;
    font-family: 'Helvetica Neue', Arial, sans-serif;
    color: #3e2820;
    overflow: hidden;
    position: relative;
}
.coffee-nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 80px;
}
.coffee-logo { font-size: 1.5rem; font-weight: bold; display: flex; align-items: center; gap: 10px; }
.coffee-menu { display: flex; gap: 30px; font-weight: 600; font-size: 0.9rem; }
.coffee-btn { background: #3e2820; color: #fff; border: none; padding: 10px 25px; border-radius: 20px; font-weight: bold; cursor: pointer; }

.coffee-hero {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.coffee-hero-text h1 {
    font-size: 5rem;
    line-height: 1.1;
    margin-bottom: 30px;
    font-weight: 800;
}
.coffee-icons {
    display: flex;
    gap: 15px;
    margin-top: 30px;
}
.coffee-icon {
    width: 50px; height: 50px; border-radius: 50%; border: 2px solid #3e2820;
    display: flex; align-items: center; justify-content: center; font-size: 1.2rem;
}
.coffee-hero-img img {
    width: 400px;
    border-radius: 50%;
    box-shadow: 0 30px 60px rgba(0,0,0,0.1);
    background: #fff;
    padding: 10px;
}

.coffee-cards {
    display: flex;
    gap: 40px;
    margin-top: 100px;
}
.c-card {
    background: rgba(255, 255, 255, 0.7);
    backdrop-filter: blur(10px);
    border-radius: 20px;
    padding: 30px;
    width: 250px;
    position: relative;
    padding-top: 80px;
    box-shadow: 0 20px 40px rgba(0,0,0,0.05);
    cursor: pointer;
    transition: 0.3s;
}
.c-card:hover { transform: translateY(-10px); }
.c-card img {
    position: absolute; top: -60px; left: 50%; transform: translateX(-50%);
    width: 130px; height: 130px; border-radius: 50%; border: 5px solid #fff; box-shadow: 0 10px 20px rgba(0,0,0,0.1);
}
.c-card h4 { font-size: 1.4rem; margin-bottom: 10px; }
.c-card p { font-size: 0.8rem; color: #666; margin-bottom: 20px; line-height: 1.4; }
.c-card-footer { display: flex; justify-content: space-between; align-items: center; }
.c-price { background: #3e2820; color: #fff; padding: 8px 15px; border-radius: 15px; font-weight: bold; font-size: 0.9rem; }
.c-icons i { margin-left: 10px; color: #888; font-size: 1.1rem; }

.coffee-section-2 {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 150px;
    color: #fff;
}
.coffee-section-2 h2 { font-size: 3rem; margin-bottom: 20px; font-weight: 800; max-width: 500px; }
.coffee-section-2 p { max-width: 400px; font-size: 1rem; line-height: 1.6; margin-bottom: 30px; color: #ddd; }
.coffee-section-2-img { position: relative; }
.coffee-section-2-img img { width: 350px; border-radius: 50%; border: 15px solid rgba(255,255,255,0.2); }
.c-price-tag { position: absolute; top: 30px; right: 0; background: #fff; color: #3e2820; padding: 15px; border-radius: 15px; font-weight: bold; font-size: 1.2rem; }

.app-section {
    margin-top: 150px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #fff;
}
.app-mockups { display: flex; gap: 20px; }
.mockup { width: 250px; background: rgba(255,255,255,0.9); border-radius: 30px; padding: 20px; color: #3e2820; border: 10px solid #fff; box-shadow: 0 30px 60px rgba(0,0,0,0.3); }
`;

const bespokeCoffeeHtml = `
<div class="coffee-wrapper">
    <div class="coffee-nav">
        <div class="coffee-logo"><i class="fa-solid fa-mug-hot"></i> Flavored</div>
        <div class="coffee-menu">
            <span>Home</span>
            <span>Coffee Menu</span>
            <span>About Us</span>
            <span>Contact us</span>
        </div>
        <button class="coffee-btn">Coffee Shop</button>
    </div>

    <div class="coffee-hero">
        <div class="coffee-hero-text">
            <h1>Coffee<br>The Best For You</h1>
            <button class="coffee-btn" onclick="addToCart('Signature Latte', 4, 'iced_coffee_splash_1784385065567.png', 1); openCheckout();" style="padding: 15px 35px; font-size: 1.1rem;">View Menu</button>
            <div class="coffee-icons">
                <div class="coffee-icon"><i class="fa-solid fa-mug-saucer"></i></div>
                <div class="coffee-icon"><i class="fa-solid fa-ice-cream"></i></div>
                <div class="coffee-icon"><i class="fa-solid fa-martini-glass"></i></div>
                <div class="coffee-icon"><i class="fa-solid fa-seedling"></i></div>
            </div>
        </div>
        <div class="coffee-hero-img">
            <img src="croissant_coffee_1784385270265.png" alt="Latte Art" style="object-position: top; object-fit: cover; width:450px; height:450px;">
        </div>
    </div>

    <div class="coffee-cards">
        <div class="c-card" onclick="openProductModal('Americano', '100% Natural Arabica or Robusta, 30 ml cup', 2.50, 'iced_coffee_splash_1784385065567.png')">
            <img src="iced_coffee_splash_1784385065567.png" alt="Americano">
            <h4>Americano</h4>
            <p>100% Natural Arabica or Robusta, 30 ml cup</p>
            <div class="c-card-footer">
                <div class="c-price">$2.50</div>
                <div class="c-icons"><i class="fa-solid fa-cart-plus"></i> <i class="fa-regular fa-heart"></i></div>
            </div>
        </div>
        <div class="c-card" onclick="openProductModal('Cappuccino', 'Coffee 50%, milk 50%, 280 ml', 3.50, 'croissant_coffee_1784385270265.png')">
            <img src="croissant_coffee_1784385270265.png" alt="Cappuccino">
            <h4>Cappuccino</h4>
            <p>Coffee 50%, milk 50%, 280 ml</p>
            <div class="c-card-footer">
                <div class="c-price">$3.50</div>
                <div class="c-icons"><i class="fa-solid fa-cart-plus"></i> <i class="fa-regular fa-heart"></i></div>
            </div>
        </div>
        <div style="flex:1; display:flex; flex-direction:column; justify-content:center; padding-left: 50px;">
            <h2 style="font-size:2.5rem; font-weight:800; margin-bottom:20px;">Premium Roast<br>is simply the best</h2>
            <p style="color:#555; line-height:1.6; max-width:400px; margin-bottom:20px;">Our artisan coffee is brewed to perfection using the finest sourced beans from around the world.</p>
            <button class="coffee-btn" style="width:fit-content;">Learn More</button>
        </div>
    </div>

    <div class="coffee-section-2">
        <div>
            <h2>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</h2>
            <p>It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</p>
            <button class="coffee-btn" style="background:#fff; color:#3e2820;">Learn More</button>
        </div>
        <div class="coffee-section-2-img">
            <div class="c-price-tag">$2.50</div>
            <img src="croissant_coffee_1784385270265.png" alt="Coffee Cup">
        </div>
    </div>
</div>
`;

// Inject into coffee.html
// First strip everything from </nav> to <footer> and inject bespoke
const navEndCoffee = coffeeHtml.indexOf('</nav>') + '</nav>'.length;
const footerStartCoffee = coffeeHtml.indexOf('<footer>');

if (navEndCoffee !== -1 && footerStartCoffee !== -1) {
    let newCoffee = coffeeHtml.substring(0, navEndCoffee) + '\n<style>' + coffeeCss + '</style>\n' + bespokeCoffeeHtml + '\n' + coffeeHtml.substring(footerStartCoffee);
    fs.writeFileSync('coffee.html', newCoffee);
    console.log('coffee.html completely replaced with Photo 4 design');
}

