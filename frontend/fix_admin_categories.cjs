const fs = require('fs');

// 1. Update admin_panel.html
let adminHtml = fs.readFileSync('admin_panel.html', 'utf8');

const oldFormSelects = `<div style="display:flex; gap:15px; margin-bottom:15px;">
                    <div style="flex:1;">
                        <label style="display:block; margin-bottom:5px; font-weight:bold;">Category</label>
                        <select id="newProdCategory" onchange="updateSubCategory()" style="width:100%; padding:10px; border:1px solid #ddd; border-radius:8px;">
                            <option value="Cakes">Cakes</option>
                            <option value="Donuts">Donuts</option>
                            <option value="Pastries">Pastries</option>
                            <option value="Ice Cream">Ice Cream</option>
                            <option value="Cupcakes">Cupcakes</option>
                            <option value="Gifting">Gifting</option>
                        </select>
                    </div>
                    <div style="flex:1;">
                        <label style="display:block; margin-bottom:5px; font-weight:bold;">Sub-Category</label>
                        <select id="newProdSubCategory" style="width:100%; padding:10px; border:1px solid #ddd; border-radius:8px;">
                        </select>
                    </div>
                    <div style="flex:1;">
                        <label style="display:block; margin-bottom:5px; font-weight:bold;">Product Label / Tag</label>
                        <select id="newProdLabel" style="width:100%; padding:10px; border:1px solid #ddd; border-radius:8px;">
                            <option value="Normal">Normal</option>
                            <option value="Premium">Premium</option>
                            <option value="Special">Special</option>
                            <option value="Discounted">Discounted</option>
                            <option value="Seasonal">Seasonal</option>
                            <option value="Festival">Festival</option>
                            <option value="Occasion">Occasion</option>
                            <option value="Party">Party</option>
                        </select>
                    </div>
                </div>`;

const newFormSelects = `<div style="display:flex; gap:15px; margin-bottom:15px;">
                    <div style="flex:1;">
                        <label style="display:block; margin-bottom:5px; font-weight:bold;">Category</label>
                        <select id="newProdCategory" style="width:100%; padding:10px; border:1px solid #ddd; border-radius:8px;">
                            <option value="Normal">Normal</option>
                            <option value="Premium">Premium</option>
                            <option value="Special">Special</option>
                            <option value="Discounted">Discounted</option>
                            <option value="Seasonal">Seasonal</option>
                            <option value="Festival">Festival</option>
                            <option value="Occasion">Occasion</option>
                            <option value="Party">Party</option>
                        </select>
                    </div>
                    <div style="flex:1;">
                        <label style="display:block; margin-bottom:5px; font-weight:bold;">Product Type</label>
                        <select id="newProdSubCategory" style="width:100%; padding:10px; border:1px solid #ddd; border-radius:8px;">
                            <option value="Cakes">Cakes</option>
                            <option value="Donuts">Donuts</option>
                            <option value="Pastries">Pastries</option>
                            <option value="Ice Cream">Ice Cream</option>
                            <option value="Cupcakes">Cupcakes</option>
                            <option value="Gifting">Gifting</option>
                        </select>
                    </div>
                </div>`;

if (adminHtml.includes('id="newProdLabel"')) {
    // We already added newProdLabel in a previous step, so we need to replace the flex container
    const startIdx = adminHtml.indexOf('<div style="display:flex; gap:15px; margin-bottom:15px;">');
    const endIdx = adminHtml.indexOf('</div>', adminHtml.indexOf('id="newProdLabel"')) + 6;
    const block = adminHtml.substring(startIdx, endIdx + 20); // Get enough to see the outer div end
    // Actually regex is safer or string replace on the exact known block
    adminHtml = adminHtml.replace(/<div style="display:flex; gap:15px; margin-bottom:15px;">[\s\S]*?id="newProdLabel"[\s\S]*?<\/select>\s*<\/div>\s*<\/div>/, newFormSelects);
} else {
    // If it wasn't exactly that, just use string replace on oldFormSelects if it matches
    adminHtml = adminHtml.replace(oldFormSelects, newFormSelects);
}

// Remove updateSubCategory logic from editProduct
adminHtml = adminHtml.replace('updateSubCategory();', '');
adminHtml = adminHtml.replace(`setTimeout(() => {
        document.getElementById('newProdSubCategory').value = prod.subCategory;
    }, 10);`, `document.getElementById('newProdSubCategory').value = prod.subCategory;`);
adminHtml = adminHtml.replace("document.getElementById('newProdLabel').value = prod.label || 'Normal';", "");

// Remove updateSubCategory function
adminHtml = adminHtml.replace(/function updateSubCategory\(\) \{[\s\S]*?\}\s*function editProduct/, 'function editProduct');

// Update handleAddProduct saving
adminHtml = adminHtml.replace("const label = document.getElementById('newProdLabel').value;", "const label = category; // fallback");
adminHtml = adminHtml.replace("label: label,", "");

fs.writeFileSync('admin_panel.html', adminHtml, 'utf8');

// 2. Update dynamic_render.js
let dyn = fs.readFileSync('dynamic_render.js', 'utf8');

// Mega card badge logic
dyn = dyn.replace('${getBadgeHtml(prod.label)}', '${getBadgeHtml(prod.category)}');
dyn = dyn.replace('${getBadgeHtml(prod.label)}', '${getBadgeHtml(prod.category)}');

// Category matching logic
dyn = dyn.replace('const relevantProducts = customProducts.filter(p => p.category === pageCat);', 'const relevantProducts = customProducts.filter(p => p.category === pageCat || p.subCategory === pageCat);');
dyn = dyn.replace("if (!label || label === 'Normal') return '';", "if (!label || label === 'Normal' || label === 'Cakes' || label === 'Donuts' || label === 'Pastries' || label === 'Ice Cream' || label === 'Cupcakes' || label === 'Gifting') return '';");

fs.writeFileSync('dynamic_render.js', dyn, 'utf8');
console.log('Admin panel categories updated successfully');
