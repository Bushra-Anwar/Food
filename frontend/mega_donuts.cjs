const fs = require('fs');

let html = fs.readFileSync('donuts.html', 'utf8');

const newDonutSections = `
<!-- LIGHT BLUE RUSSIAN THEME -->
<div class="dn-blue" style="background: #e0f7fa; color: #333; font-family: 'Arial', sans-serif; padding-top: 80px;">
    <!-- Menu Grid -->
    <div style="max-width: 1200px; margin: 0 auto; padding: 0 20px 80px; text-align: center;">
        <h2 style="font-size: 3rem; margin-bottom: 30px; text-transform: uppercase; font-weight: 900; letter-spacing: 2px;">MENU</h2>
        <div style="display: flex; justify-content: center; gap: 15px; margin-bottom: 50px;">
            <button style="border: 2px solid #4db6ac; background: transparent; color: #4db6ac; padding: 10px 25px; border-radius: 30px; font-weight: bold; font-size: 1rem; cursor: pointer;">Boxes</button>
            <button style="border: 2px solid #4db6ac; background: transparent; color: #4db6ac; padding: 10px 25px; border-radius: 30px; font-weight: bold; font-size: 1rem; cursor: pointer;">Donuts</button>
            <button style="border: 2px solid #4db6ac; background: transparent; color: #4db6ac; padding: 10px 25px; border-radius: 30px; font-weight: bold; font-size: 1rem; cursor: pointer;">Drinks</button>
        </div>
        
        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 30px; text-align: left;">
            <!-- Box 1 -->
            <div style="background: #fff; padding: 25px; border-radius: 20px; box-shadow: 0 15px 30px rgba(0,0,0,0.05); transition: 0.3s; cursor: pointer;" onmouseover="this.style.transform='translateY(-10px)'" onmouseout="this.style.transform='translateY(0)'">
                <img src="donut_category_1777660467553.png" style="width: 100%; height: 200px; object-fit: cover; border-radius: 15px; margin-bottom: 20px; background: #ffebee;">
                <h4 style="font-size: 1.3rem; margin-bottom: 10px; font-weight: 900;">Box "The Top"</h4>
                <p style="font-size: 0.9rem; color: #777; margin-bottom: 25px; line-height: 1.4;">Stardonut, Choco, Raspberry, Nut Crunch.</p>
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <button style="background: #ff6b8b; color: #fff; border: none; padding: 12px 30px; border-radius: 25px; font-weight: bold; cursor: pointer; transition: 0.3s;" onmouseover="this.style.background='#ff476f'" onmouseout="this.style.background='#ff6b8b'" onclick="addToCart('Box The Top', 600, 'donut_category_1777660467553.png', 1); openCheckout();">Buy</button>
                    <span style="font-weight: 900; font-size: 1.3rem;">₹600</span>
                </div>
            </div>
            
            <!-- Box 2 -->
            <div style="background: #fff; padding: 25px; border-radius: 20px; box-shadow: 0 15px 30px rgba(0,0,0,0.05); transition: 0.3s; cursor: pointer;" onmouseover="this.style.transform='translateY(-10px)'" onmouseout="this.style.transform='translateY(0)'">
                <img src="recommended_donut.png" style="width: 100%; height: 200px; object-fit: cover; border-radius: 15px; margin-bottom: 20px; background: #e0f7fa;">
                <h4 style="font-size: 1.3rem; margin-bottom: 10px; font-weight: 900;">Box "Party Bomb"</h4>
                <p style="font-size: 0.9rem; color: #777; margin-bottom: 25px; line-height: 1.4;">2 Choco, 2 Strawberry, 2 Brownies.</p>
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <button style="background: #ff6b8b; color: #fff; border: none; padding: 12px 30px; border-radius: 25px; font-weight: bold; cursor: pointer; transition: 0.3s;" onmouseover="this.style.background='#ff476f'" onmouseout="this.style.background='#ff6b8b'" onclick="addToCart('Box Party Bomb', 620, 'recommended_donut.png', 1); openCheckout();">Buy</button>
                    <span style="font-weight: 900; font-size: 1.3rem;">₹620</span>
                </div>
            </div>
            
            <!-- Box 3 -->
            <div style="background: #fff; padding: 25px; border-radius: 20px; box-shadow: 0 15px 30px rgba(0,0,0,0.05); transition: 0.3s; cursor: pointer;" onmouseover="this.style.transform='translateY(-10px)'" onmouseout="this.style.transform='translateY(0)'">
                <img src="donut_category_1777660467553.png" style="width: 100%; height: 200px; object-fit: cover; border-radius: 15px; margin-bottom: 20px; background: #fff3e0;">
                <h4 style="font-size: 1.3rem; margin-bottom: 10px; font-weight: 900;">Set "Party Box"</h4>
                <p style="font-size: 0.9rem; color: #777; margin-bottom: 25px; line-height: 1.4;">16 donuts of your choice + game.</p>
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <button style="background: #ff6b8b; color: #fff; border: none; padding: 12px 30px; border-radius: 25px; font-weight: bold; cursor: pointer; transition: 0.3s;" onmouseover="this.style.background='#ff476f'" onmouseout="this.style.background='#ff6b8b'" onclick="addToCart('Set Party Box', 1500, 'donut_category_1777660467553.png', 1); openCheckout();">Buy</button>
                    <span style="font-weight: 900; font-size: 1.3rem;">₹1500</span>
                </div>
            </div>
        </div>
        <button style="margin-top: 50px; background: transparent; border: 2px solid #4db6ac; color: #4db6ac; padding: 12px 35px; border-radius: 30px; font-weight: bold; font-size: 1rem; cursor: pointer; transition: 0.3s;" onmouseover="this.style.background='#4db6ac'; this.style.color='#fff';" onmouseout="this.style.background='transparent'; this.style.color='#4db6ac';">Show More</button>
    </div>
    
    <!-- Custom Creator (Teal Background) -->
    <div style="background: linear-gradient(180deg, #4dd0e1 0%, #00acc1 100%); padding: 100px 5%; display: flex; align-items: center; justify-content: center; gap: 80px; position: relative;">
        <!-- Wavy Top Overlay -->
        <svg viewBox="0 0 1440 120" style="position: absolute; top: -1px; left: 0; width: 100%; fill: #e0f7fa;"><path d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"></path></svg>
        
        <img src="recommended_donut.png" style="width: 450px; height: 450px; border-radius: 50%; box-shadow: 0 40px 80px rgba(0,0,0,0.2); object-fit: cover;">
        
        <div style="background: #fff; padding: 50px; border-radius: 30px; width: 450px; box-shadow: 0 30px 60px rgba(0,0,0,0.15);">
            <h3 style="font-size: 1.8rem; font-weight: 900; text-transform: uppercase; margin-bottom: 30px; text-align: center;">CREATE <span style="color: #ff6b8b;">YOUR</span> DONUT</h3>
            
            <label style="font-size: 0.9rem; font-weight: bold; color: #4db6ac; margin-bottom: 8px; display: block;">Shape:</label>
            <select style="width: 100%; padding: 15px; margin-bottom: 20px; border: 2px solid #b2dfdb; border-radius: 15px; outline: none; font-size: 1rem;"><option>Circle</option><option>Heart</option><option>Star</option></select>
            
            <label style="font-size: 0.9rem; font-weight: bold; color: #4db6ac; margin-bottom: 8px; display: block;">Glaze:</label>
            <select style="width: 100%; padding: 15px; margin-bottom: 20px; border: 2px solid #b2dfdb; border-radius: 15px; outline: none; font-size: 1rem;"><option>Belgian Chocolate</option><option>Strawberry Pink</option><option>Vanilla White</option></select>
            
            <label style="font-size: 0.9rem; font-weight: bold; color: #4db6ac; margin-bottom: 8px; display: block;">Filling:</label>
            <select style="width: 100%; padding: 15px; margin-bottom: 20px; border: 2px solid #b2dfdb; border-radius: 15px; outline: none; font-size: 1rem;"><option>Dark Chocolate</option><option>Vanilla Cream</option><option>Mixed Berry</option></select>
            
            <label style="font-size: 0.9rem; font-weight: bold; color: #4db6ac; margin-bottom: 8px; display: block;">Sprinkles:</label>
            <select style="width: 100%; padding: 15px; margin-bottom: 30px; border: 2px solid #b2dfdb; border-radius: 15px; outline: none; font-size: 1rem;"><option>Chocolate Chips</option><option>Rainbow Sprinkles</option></select>
            
            <button style="background: #ff6b8b; color: #fff; border: none; padding: 20px; width: 100%; border-radius: 30px; font-weight: bold; font-size: 1.1rem; cursor: pointer; box-shadow: 0 10px 20px rgba(255, 107, 139, 0.3); transition: 0.3s;" onmouseover="this.style.transform='translateY(-3px)'; this.style.boxShadow='0 15px 25px rgba(255, 107, 139, 0.4)';" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 10px 20px rgba(255, 107, 139, 0.3)';" onclick="addToCart('Custom Masterpiece Donut', 250, 'recommended_donut.png', 1); openCheckout();">Create Order</button>
        </div>
        
        <!-- Wavy Bottom Overlay -->
        <svg viewBox="0 0 1440 120" style="position: absolute; bottom: -1px; left: 0; width: 100%; fill: #fff;"><path d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"></path></svg>
    </div>
    
    <!-- About Us & Contact -->
    <div style="background: #fff; padding: 100px 5% 120px; text-align: center;">
        <h2 style="font-size: 3.5rem; margin-bottom: 60px; text-transform: uppercase; font-weight: 900;">ABOUT US</h2>
        <div style="display: flex; gap: 80px; align-items: center; max-width: 1100px; margin: 0 auto; text-align: left;">
            <div style="flex: 1; text-align: right;">
                <img src="strawberry_splash_1784385077502.png" style="width: 100%; max-width: 450px; border-radius: 20px;">
            </div>
            <div style="flex: 1;">
                <p style="color: #ff6b8b; font-weight: 900; font-size: 1.2rem; margin-bottom: 20px;">SweetTreats Donuts is a large selection of donuts with different fillings and glazes.</p>
                <p style="color: #666; line-height: 1.8; font-size: 1.1rem; margin-bottom: 20px;">For every holiday or event, we release a limited designer batch of donuts. Our technology allows us to prepare donuts with minimal oil usage - our donuts turn out non-greasy and harmless.</p>
                <p style="color: #666; line-height: 1.8; font-size: 1.1rem;">We use only natural ingredients in production, ensuring every bite is a perfect blend of texture and taste.</p>
            </div>
        </div>
        
        <!-- Contact Form Box -->
        <div style="background: linear-gradient(135deg, #e0f7fa 0%, #b2ebf2 100%); padding: 60px; border-radius: 40px; max-width: 800px; margin: 120px auto 0; box-shadow: 0 30px 60px rgba(0,0,0,0.08); position: relative;">
            <img src="donut_category_1777660467553.png" style="position: absolute; right: -50px; bottom: -50px; width: 150px; height: 150px; border-radius: 50%; box-shadow: 0 10px 20px rgba(0,0,0,0.2);">
            
            <h3 style="font-size: 2.5rem; font-weight: 900; margin-bottom: 15px; color: #00838f;">STILL HAVE QUESTIONS?</h3>
            <p style="margin-bottom: 40px; color: #006064; font-size: 1.1rem;">Leave a request and our manager will contact you within 5 minutes</p>
            
            <div style="background: #fff; padding: 50px; border-radius: 30px; box-shadow: 0 15px 30px rgba(0,0,0,0.05);">
                <input type="text" placeholder="Enter your name" style="width: 100%; padding: 18px; margin-bottom: 20px; border: 2px solid #b2dfdb; border-radius: 15px; outline: none; font-size: 1.1rem;">
                <input type="text" placeholder="Email or phone" style="width: 100%; padding: 18px; margin-bottom: 30px; border: 2px solid #b2dfdb; border-radius: 15px; outline: none; font-size: 1.1rem;">
                <button style="background: #ff6b8b; color: #fff; border: none; padding: 20px 50px; border-radius: 30px; font-weight: bold; font-size: 1.1rem; cursor: pointer; box-shadow: 0 10px 20px rgba(255, 107, 139, 0.3);">Leave a Request</button>
            </div>
        </div>
    </div>
</div>

<!-- LILAC PURPLE THEME (Oh CAKE) -->
<div class="dn-lilac" style="background: #f7f4f6; color: #5a4b5d; font-family: 'Helvetica Neue', sans-serif;">
    <!-- Logo Hero -->
    <div style="background: #c3b2c9; padding: 180px 5%; text-align: center; position: relative; overflow: hidden; display: flex; align-items: center; justify-content: center;">
        <img src="donut_category_1777660467553.png" style="position: absolute; top:0; left:0; width:100%; height:100%; object-fit:cover; opacity: 0.15; mix-blend-mode: multiply;">
        <h1 style="font-family: 'Arial Black', sans-serif; font-size: 12rem; color: #fff; position: relative; letter-spacing: -5px; line-height: 1; text-shadow: 0 20px 40px rgba(0,0,0,0.1);">Oh<br>DONUT</h1>
    </div>
    
    <!-- Packaging -->
    <div style="padding: 120px 5%; display: flex; align-items: center; justify-content: center; gap: 80px; background: #fffdfc;">
        <div style="text-align: left; max-width: 450px;">
            <h2 style="font-size: 4rem; color: #8e7b95; font-weight: 900; margin-bottom: 25px; line-height: 1.1; font-family: 'Arial Black'; letter-spacing: -2px;">Lilac<br>Collection</h2>
            <p style="font-size: 1.2rem; color: #666; margin-bottom: 40px; line-height: 1.6;">Beautifully curved handle boxes designed exclusively for our premium 300g donuts and pastries. Treat yourself or a loved one to our signature aesthetic.</p>
            <button style="background: #8e7b95; color: #fff; padding: 20px 50px; border: none; font-weight: bold; border-radius: 40px; font-size: 1.2rem; cursor: pointer; box-shadow: 0 15px 30px rgba(142, 123, 149, 0.3); transition: 0.3s;" onmouseover="this.style.transform='translateY(-5px)'" onmouseout="this.style.transform='translateY(0)'" onclick="addToCart('Oh Donut Lilac Box', 250, 'donut_category_1777660467553.png', 1); openCheckout();">Shop Collection</button>
        </div>
        
        <div style="display: flex; gap: 30px;">
            <!-- Curved box 1 -->
            <div style="background: #d4c5d9; width: 300px; height: 300px; border-radius: 30px 30px 0 0; position: relative; display: flex; align-items: center; justify-content: center; box-shadow: -15px 30px 50px rgba(0,0,0,0.08);">
                <div style="background: transparent; border: 40px solid #f7f4f6; border-bottom: none; border-radius: 60px 60px 0 0; width: 180px; height: 100px; position: absolute; top: -60px;"></div>
                <h3 style="font-family: 'Arial Black'; font-size: 3rem; color: #fff; transform: rotate(-10deg); text-shadow: 0 5px 10px rgba(0,0,0,0.1);">Oh DONUT</h3>
                <span style="position: absolute; bottom: 25px; right: 25px; color: #fff; font-weight: bold; font-size: 1.2rem;">300g</span>
            </div>
            
            <!-- Curved box 2 -->
            <div style="background: #a894b0; width: 300px; height: 300px; border-radius: 30px 30px 0 0; position: relative; display: flex; align-items: center; justify-content: center; box-shadow: 15px 30px 50px rgba(0,0,0,0.1); transform: scale(1.05) translateY(30px);">
                <div style="background: transparent; border: 40px solid #f7f4f6; border-bottom: none; border-radius: 60px 60px 0 0; width: 180px; height: 100px; position: absolute; top: -60px;"></div>
                <h3 style="font-family: 'Arial Black'; font-size: 3rem; color: #fff; transform: rotate(-10deg); text-shadow: 0 5px 10px rgba(0,0,0,0.1);">Oh DONUT</h3>
                <span style="position: absolute; bottom: 25px; right: 25px; color: #fff; font-weight: bold; font-size: 1.2rem;">300g</span>
            </div>
        </div>
    </div>
    
    <!-- Napkin & Details Grid -->
    <div style="display: grid; grid-template-columns: 1fr 1fr; background: #8e7b95;">
        <div style="padding: 120px; display: flex; justify-content: center; align-items: center; background: #ece4ec;">
            <div style="background: #fff; width: 400px; height: 400px; border-radius: 50%; display: flex; justify-content: center; align-items: center; box-shadow: 0 30px 60px rgba(0,0,0,0.1);">
                <div style="background: #9d8aa4; width: 280px; height: 280px; padding: 20px; border-radius: 15px; transform: rotate(8deg); display: flex; justify-content: center; align-items: center; position: relative; overflow: hidden; box-shadow: 0 10px 20px rgba(0,0,0,0.1);">
                    <div style="position: absolute; font-family: 'Arial Black'; font-size: 2.5rem; color: rgba(255,255,255,0.15); line-height: 1; text-align: left; left: 10px; top: 10px;">Oh<br>Oh<br>Oh<br>Oh<br>Oh</div>
                    <img src="recommended_donut.png" style="width: 200px; height: 200px; object-fit: cover; border-radius: 50%; position: relative; z-index: 2; box-shadow: 0 20px 40px rgba(0,0,0,0.3); transform: rotate(-8deg);">
                </div>
            </div>
        </div>
        <div style="padding: 120px; display: flex; justify-content: center; align-items: center; position: relative; overflow: hidden;">
            <img src="donut_category_1777660467553.png" style="position: absolute; top:0; left:0; width:100%; height:100%; object-fit:cover; opacity: 0.25; mix-blend-mode: multiply;">
            <div style="font-family: 'Arial Black'; font-size: 20rem; color: #fff; line-height: 1; position: relative; text-shadow: 0 20px 40px rgba(0,0,0,0.2);">O</div>
        </div>
    </div>
</div>
`;

// Find footer and insert before it
const footerStart = html.lastIndexOf('<footer');
if (footerStart !== -1) {
    html = html.substring(0, footerStart) + newDonutSections + '\n    ' + html.substring(footerStart);
    fs.writeFileSync('donuts.html', html);
    console.log('Successfully appended Blue Theme and Lilac Theme to donuts.html!');
} else {
    // If no footer, just append to end of body
    const bodyEnd = html.lastIndexOf('</body>');
    html = html.substring(0, bodyEnd) + newDonutSections + '\n' + html.substring(bodyEnd);
    fs.writeFileSync('donuts.html', html);
    console.log('Appended to end of body in donuts.html (no footer found)');
}
