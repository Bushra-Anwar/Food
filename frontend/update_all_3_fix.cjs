const fs = require('fs');
let coffeeHtml = fs.readFileSync('donuts.html', 'utf8'); // Just grab the base template structure

const coffeeCss = `
/* COFFEE DESIGN */
body { background: #e0d5cd; }
.coffee-wrapper {
    background: linear-gradient(180deg, #e0d5cd 0%, #b8a69b 40%, #7d655a 70%, #3e2820 100%);
    padding: 100px 5% 50px;
    font-family: 'Helvetica Neue', Arial, sans-serif;
    color: #3e2820;
    overflow: hidden;
    position: relative;
    border-radius: 40px;
    margin: 20px;
    box-shadow: 0 20px 50px rgba(0,0,0,0.2);
}
.coffee-nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 80px;
}
.coffee-logo { font-size: 1.5rem; font-weight: bold; display: flex; align-items: center; gap: 10px; color: #3e2820; }
.coffee-menu { display: flex; gap: 30px; font-weight: 600; font-size: 0.9rem; color: #3e2820; }
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
.c-price-tag { position: absolute; top: 30px; right: 0; background: #fff; color: #3e2820; padding: 15px; border-radius: 15px; font-weight: bold; font-size: 1.2rem; z-index: 10;}
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
            <img src="iced_coffee_splash_1784385065567.png" alt="Americano" style="object-fit:cover;">
            <h4>Americano</h4>
            <p>100% Natural Arabica or Robusta, 30 ml cup</p>
            <div class="c-card-footer">
                <div class="c-price">$2.50</div>
                <div class="c-icons"><i class="fa-solid fa-cart-plus"></i> <i class="fa-regular fa-heart"></i></div>
            </div>
        </div>
        <div class="c-card" onclick="openProductModal('Cappuccino', 'Coffee 50%, milk 50%, 280 ml', 3.50, 'croissant_coffee_1784385270265.png')">
            <img src="croissant_coffee_1784385270265.png" alt="Cappuccino" style="object-fit:cover;">
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
            <img src="croissant_coffee_1784385270265.png" alt="Coffee Cup" style="object-fit:cover; width:350px; height:350px;">
        </div>
    </div>
</div>
`;

// Inject into coffee.html
const navEndCoffee = coffeeHtml.indexOf('</nav>') + '</nav>'.length;
const footerStartCoffee = coffeeHtml.indexOf('<!-- OVERLAYS -->'); // using OVERLAYS since donuts.html might not have footer

if (navEndCoffee !== -1 && footerStartCoffee !== -1) {
    let newCoffee = coffeeHtml.substring(0, navEndCoffee) + '\n<style>' + coffeeCss + '</style>\n' + bespokeCoffeeHtml + '\n' + coffeeHtml.substring(footerStartCoffee);
    fs.writeFileSync('coffee.html', newCoffee);
    console.log('coffee.html completely replaced with Photo 4 design');
} else {
    console.log('Failed to find markers', navEndCoffee, footerStartCoffee);
}
