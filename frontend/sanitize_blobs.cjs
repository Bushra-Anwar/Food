const fs = require('fs');

// Fix in admin_panel.html
let html = fs.readFileSync('admin_panel.html', 'utf8');

// Inside renderProducts, check for blob:
const sanitizeLogicHtml = `
            const filteredProducts = customProducts.filter(prod => {
                if (currentAdminProductFilter === 'All') return true;
                return prod.category === currentAdminProductFilter;
            }).map(prod => {
                // If it's an old expired blob URL, replace it
                if (prod.img && prod.img.startsWith('blob:')) {
                    prod.img = 'cake_category_1777660447849.png'; // Fallback
                }
                return prod;
            });`;
html = html.replace(/const filteredProducts = customProducts\.filter\(prod => \{[\s\S]*?return prod\.category === currentAdminProductFilter;\n            \}\);/, sanitizeLogicHtml);

// Also update the handleAddProduct to catch quota exceeded errors
const tryCatchLogic = `
                try {
                    localStorage.setItem('st_custom_products', JSON.stringify(customProducts));
                } catch(e) {
                    alert("Error: Storage Limit Exceeded! The image file is too large. Please upload a smaller image.");
                    // Revert the array
                    if (idx >= 0) {
                        // Not handling full revert for edit, but for new push:
                        customProducts.pop();
                    }
                    return;
                }`;
html = html.replace("localStorage.setItem('st_custom_products', JSON.stringify(customProducts));", tryCatchLogic);

fs.writeFileSync('admin_panel.html', html);
console.log('admin_panel sanitized');

// Fix in dynamic_render.js
let js = fs.readFileSync('dynamic_render.js', 'utf8');
const sanitizeLogicJs = `
    const customProducts = (JSON.parse(localStorage.getItem('st_custom_products')) || []).map(prod => {
        if (prod.img && prod.img.startsWith('blob:')) {
            prod.img = 'cake_category_1777660447849.png'; // Fallback for old expired blobs
        }
        return prod;
    });`;
js = js.replace(/const customProducts = JSON\.parse\(localStorage\.getItem\('st_custom_products'\)\) \|\| \[\];/, sanitizeLogicJs);
fs.writeFileSync('dynamic_render.js', js);
console.log('dynamic_render sanitized');
