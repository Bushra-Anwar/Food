const fs = require('fs');
const path = require('path');

const dir = __dirname;
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

const oldDrinksRegex = /<h4 style="font-size:1\.1rem; color:#222; margin-bottom:15px; font-weight:400;">Add Drinks<\/h4>[\s\S]*?<\/div>\s*<button id="categoryAddBagBtn"/;

const newDrinksHTML = `<h4 style="font-size:1.1rem; color:#222; margin-bottom:15px; font-weight:400;">Add Drinks</h4>
            <div style="display:flex; gap:15px; margin-bottom:30px;">
                <div onclick="openProductModal('Tropical Mango', 'Fresh mango gelato bursting with summer flavors.', 229, 'recommended_icecream.png')" style="width:75px; height:75px; border-radius:16px; background:#fff; padding:6px; box-shadow:0 5px 15px rgba(0,0,0,0.04); cursor:pointer; transition: 0.2s;" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'"><img src="recommended_icecream.png" style="width:100%; height:100%; object-fit:cover; border-radius:10px;"></div>
                <div onclick="openProductModal('Vanilla Bean Cone', 'Classic vanilla bean in a waffle cone.', 199, 'icecream_category_1777660485890.png')" style="width:75px; height:75px; border-radius:16px; background:#fff; padding:6px; box-shadow:0 5px 15px rgba(0,0,0,0.04); cursor:pointer; transition: 0.2s;" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'"><img src="icecream_category_1777660485890.png" style="width:100%; height:100%; object-fit:cover; border-radius:10px;"></div>
                <div onclick="openProductModal('Iced Coffee Splash', 'Refreshing iced coffee perfect for the summer.', 249, 'icecream_category_1777660485890.png')" style="width:75px; height:75px; border-radius:16px; background:#fff; padding:6px; box-shadow:0 5px 15px rgba(0,0,0,0.04); cursor:pointer; transition: 0.2s;" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'"><img src="icecream_category_1777660485890.png" style="width:100%; height:100%; object-fit:cover; border-radius:10px;"></div>
            </div>
            
            <button id="categoryAddBagBtn"`;


const oldAddBtnLogicRegex = /if\s*\(addBtn\)\s*addBtn\.onclick\s*=\s*\(\)\s*=>\s*\{[\s\S]*?closeModals\(\);\s*\};/;
const newAddBtnLogic = `if (addBtn) addBtn.onclick = () => { 
            if(typeof addToCart === 'function') addToCart(name, price, img, currentModalQty); 
            if(typeof showToast === 'function') showToast('Added ' + currentModalQty + 'x ' + name + ' to bag!');
            closeModals();
            setTimeout(() => {
                const sidebar = document.getElementById('cartSidebar');
                const over = document.getElementById('overlay');
                if(sidebar) sidebar.classList.add('open');
                if(over) over.classList.add('show');
            }, 100);
        };`;


let modifiedCount = 0;
files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let changed = false;
    
    if (oldDrinksRegex.test(content)) {
        content = content.replace(oldDrinksRegex, newDrinksHTML);
        changed = true;
    }
    
    if (oldAddBtnLogicRegex.test(content)) {
        content = content.replace(oldAddBtnLogicRegex, newAddBtnLogic);
        changed = true;
    }
    
    if (changed) {
        fs.writeFileSync(file, content, 'utf8');
        modifiedCount++;
        console.log("Updated " + file);
    }
});

console.log("Done! Modified " + modifiedCount + " files.");
