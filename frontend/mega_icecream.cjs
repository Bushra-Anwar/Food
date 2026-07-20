const fs = require('fs');

let html = fs.readFileSync('icecream.html', 'utf8');

const newIceCreamSections = `
<!-- AURA BRAND IDENTITY SECTION -->
<div class="ic-aura" style="background: #2b2a24; color: #c8a97e; font-family: 'Helvetica Neue', sans-serif; padding: 100px 5%; display: flex; flex-wrap: wrap; gap: 50px; position: relative;">
    <div style="flex: 1; min-width: 300px; padding-right: 50px; border-right: 1px solid rgba(200,169,126,0.3);">
        <h2 style="font-family: 'Georgia', serif; font-size: 4rem; margin-bottom: 20px; color: #f5e6d3; line-height: 1.1;">AURA<br><span style="font-size: 1.2rem; letter-spacing: 5px; color: #c8a97e; text-transform: uppercase; font-family: Arial;">Ice Cream Roasters</span></h2>
        <p style="color: #f5e6d3; line-height: 1.8; margin-bottom: 40px; font-size: 1.1rem;">Introducing our premium dark chocolate and espresso infused ice cream collections. Inspired by the rich tones of roasted coffee beans and elegant minimalist design.</p>
        
        <div style="margin-bottom: 40px;">
            <p style="font-size: 0.9rem; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 15px; border-bottom: 1px solid rgba(200,169,126,0.3); padding-bottom: 10px;">Typography & Color Palette</p>
            <div style="display: flex; gap: 20px;">
                <div style="text-align: center;"><div style="width: 60px; height: 60px; background: #2b2a24; border: 2px solid #c8a97e; border-radius: 50%; margin: 0 auto 10px;"></div><span style="font-size:0.8rem;">Espresso</span></div>
                <div style="text-align: center;"><div style="width: 60px; height: 60px; background: #f5e6d3; border: 2px solid #c8a97e; border-radius: 50%; margin: 0 auto 10px;"></div><span style="font-size:0.8rem;">Cream</span></div>
                <div style="text-align: center;"><div style="width: 60px; height: 60px; background: #111111; border: 2px solid #c8a97e; border-radius: 50%; margin: 0 auto 10px;"></div><span style="font-size:0.8rem;">Matte</span></div>
            </div>
        </div>
        
        <button style="background: #c8a97e; color: #2b2a24; padding: 15px 40px; border: none; font-family: 'Arial'; font-weight: bold; cursor: pointer; border-radius: 3px; font-size: 1.1rem; transition: 0.3s;" onmouseover="this.style.background='#f5e6d3'" onmouseout="this.style.background='#c8a97e'" onclick="addToCart('Aura Espresso Pint', 12, 'icecream_category_1777660485890.png', 1); openCheckout();">Shop Collection</button>
    </div>
    
    <div style="flex: 2; display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
        <div style="background: #f5e6d3; padding: 40px; border-radius: 5px; text-align: center; color: #2b2a24; display: flex; flex-direction: column; align-items: center; justify-content: center; box-shadow: 0 20px 40px rgba(0,0,0,0.2);">
            <img src="icecream_category_1777660485890.png" style="width: 180px; height: 180px; object-fit: cover; border-radius: 50%; margin-bottom: 20px; border: 5px solid #2b2a24;">
            <h4 style="font-family: 'Georgia', serif; font-size: 1.8rem; margin-bottom: 5px;">Matte Black Pint</h4>
            <p style="font-size: 0.9rem; text-transform: uppercase; letter-spacing: 2px; color: #666;">12oz Premium</p>
        </div>
        <div style="background: #f5e6d3; padding: 40px; border-radius: 5px; text-align: center; color: #2b2a24; display: flex; flex-direction: column; align-items: center; justify-content: center; box-shadow: 0 20px 40px rgba(0,0,0,0.2);">
            <img src="recommended_icecream.png" style="width: 180px; height: 180px; object-fit: cover; border-radius: 50%; margin-bottom: 20px; border: 5px solid #2b2a24;">
            <h4 style="font-family: 'Georgia', serif; font-size: 1.8rem; margin-bottom: 5px;">Ceramic Cup</h4>
            <p style="font-size: 0.9rem; text-transform: uppercase; letter-spacing: 2px; color: #666;">Vanilla Affogato</p>
        </div>
        <div style="background: #f5e6d3; padding: 30px 40px; border-radius: 5px; text-align: center; color: #2b2a24; grid-column: span 2; display: flex; align-items: center; justify-content: space-between; box-shadow: 0 20px 40px rgba(0,0,0,0.2);">
            <div style="text-align: left;">
                <p style="font-size: 0.8rem; text-transform: uppercase; letter-spacing: 2px; color: #666; margin-bottom: 5px;">Ultra Realistic</p>
                <h4 style="font-family: 'Georgia', serif; font-size: 2.2rem; margin-bottom: 15px;">Branded Delivery Box</h4>
                <p style="font-size: 1.1rem; max-width: 400px; line-height: 1.5;">Insulated luxury packaging to keep your premium ice cream perfectly frozen during transit.</p>
            </div>
            <img src="macaron_deal_1777660573385.png" style="width: 150px; height: 150px; border-radius: 10px; object-fit: cover; border: 3px solid #2b2a24;">
        </div>
    </div>
</div>

<!-- ARVANO BRAND IDENTITY SECTION -->
<div class="ic-arvano" style="background: #4a5c50; color: #e6dcc3; padding: 100px 5%; font-family: 'Georgia', serif; text-align: center;">
    <div style="display: inline-block; border: 1px solid #e6dcc3; padding: 8px 25px; border-radius: 30px; font-family: Arial; font-size: 0.9rem; letter-spacing: 2px; margin-bottom: 30px; background: rgba(230, 220, 195, 0.1);">★ 4.9 RATED | 100+ BRANDS</div>
    <h2 style="font-size: 4.5rem; margin-bottom: 70px; font-weight: normal;">Ice Cream Brand Identity</h2>
    
    <div style="display: flex; justify-content: center; gap: 40px; margin-bottom: 80px; align-items: center;">
        <img src="donut_category_1777660467553.png" style="width: 250px; height: 350px; object-fit: cover; border-radius: 15px; border: 2px solid #e6dcc3; box-shadow: 0 30px 60px rgba(0,0,0,0.3);">
        <div style="text-align: center; padding: 0 40px;">
            <div style="width: 80px; height: 80px; border: 2px solid #e6dcc3; border-radius: 50%; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center; font-size: 2rem;">A</div>
            <h1 style="font-size: 3.5rem; margin-bottom: 10px; letter-spacing: 2px;">ARVANO</h1>
            <p style="letter-spacing: 6px; font-family: Arial; font-size: 1rem; color: #a6b5ab;">ICE CREAM</p>
        </div>
        <img src="blueberry_cheesecake_1784385282085.png" style="width: 250px; height: 350px; object-fit: cover; border-radius: 15px; border: 2px solid #e6dcc3; box-shadow: 0 30px 60px rgba(0,0,0,0.3);">
    </div>
    
    <h3 style="font-family: Arial; font-size: 1.8rem; letter-spacing: 3px; margin-bottom: 15px; font-weight: bold;">PREMIUM BRANDING THAT SELLS</h3>
    <p style="font-family: Arial; font-size: 1.2rem; color: #a6b5ab; margin-bottom: 60px; letter-spacing: 1px;">Logo • Packaging • Full Brand Identity</p>
    
    <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 25px; max-width: 1100px; margin: 0 auto; text-align: left; font-family: Arial;">
        <div style="background: #5c6b5f; padding: 25px; border-radius: 8px; border: 1px solid #7a8a7d; display: flex; flex-direction: column; transition: 0.3s; cursor: pointer;" onmouseover="this.style.transform='translateY(-10px)'" onmouseout="this.style.transform='translateY(0)'" onclick="addToCart('Takeaway Box Design', 150, 'icecream_category_1777660485890.png', 1); openCheckout();">
            <img src="icecream_category_1777660485890.png" style="width: 100%; height: 200px; object-fit: cover; border-radius: 5px; margin-bottom: 20px; border: 1px solid #7a8a7d;">
            <div style="background: #4a5c50; padding: 20px; text-align: center; border: 1px solid #7a8a7d; border-radius: 5px; font-size: 1.1rem; color: #e6dcc3; letter-spacing: 1px;">Takeaway Box</div>
        </div>
        <div style="background: #5c6b5f; padding: 25px; border-radius: 8px; border: 1px solid #7a8a7d; display: flex; flex-direction: column; transition: 0.3s; cursor: pointer;" onmouseover="this.style.transform='translateY(-10px)'" onmouseout="this.style.transform='translateY(0)'" onclick="addToCart('Carry Holder Design', 150, 'iced_coffee_splash_1784385065567.png', 1); openCheckout();">
            <img src="iced_coffee_splash_1784385065567.png" style="width: 100%; height: 200px; object-fit: cover; border-radius: 5px; margin-bottom: 20px; border: 1px solid #7a8a7d;">
            <div style="background: #4a5c50; padding: 20px; text-align: center; border: 1px solid #7a8a7d; border-radius: 5px; font-size: 1.1rem; color: #e6dcc3; letter-spacing: 1px;">Carry Holder</div>
        </div>
        <div style="background: #5c6b5f; padding: 25px; border-radius: 8px; border: 1px solid #7a8a7d; display: flex; flex-direction: column; transition: 0.3s; cursor: pointer;" onmouseover="this.style.transform='translateY(-10px)'" onmouseout="this.style.transform='translateY(0)'" onclick="addToCart('Premium Tin Container', 150, 'fresh_bread_basket_1784385258109.png', 1); openCheckout();">
            <img src="fresh_bread_basket_1784385258109.png" style="width: 100%; height: 200px; object-fit: cover; border-radius: 5px; margin-bottom: 20px; border: 1px solid #7a8a7d;">
            <div style="background: #4a5c50; padding: 20px; text-align: center; border: 1px solid #7a8a7d; border-radius: 5px; font-size: 1.1rem; color: #e6dcc3; letter-spacing: 1px;">Premium Tin Container</div>
        </div>
    </div>
    
    <div style="margin-top: 80px;">
        <h3 style="font-family: Arial; font-size: 2rem; letter-spacing: 2px; margin-bottom: 10px; font-weight: bold;">GET YOUR BRAND DESIGNED →</h3>
        <p style="font-family: Arial; font-size: 1.2rem; color: #a6b5ab; margin-bottom: 30px;">Stand Out • Look Premium • Attract Clients</p>
        <button style="background: #e6dcc3; color: #4a5c50; border: none; padding: 15px 40px; font-family: Arial; font-weight: bold; font-size: 1.1rem; border-radius: 30px; cursor: pointer; transition: 0.3s;" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'" onclick="addToCart('Full Brand Identity Package', 999, 'donut_category_1777660467553.png', 1); openCheckout();">Limited Slots Available</button>
    </div>
</div>
`;

// Find footer and insert before it
const footerStart = html.lastIndexOf('<footer');
if (footerStart !== -1) {
    html = html.substring(0, footerStart) + newIceCreamSections + '\n    ' + html.substring(footerStart);
    fs.writeFileSync('icecream.html', html);
    console.log('Successfully appended AURA and ARVANO themes to icecream.html!');
} else {
    // If no footer, just append to end of body
    const bodyEnd = html.lastIndexOf('</body>');
    html = html.substring(0, bodyEnd) + newIceCreamSections + '\n' + html.substring(bodyEnd);
    fs.writeFileSync('icecream.html', html);
    console.log('Appended to end of body in icecream.html (no footer found)');
}
