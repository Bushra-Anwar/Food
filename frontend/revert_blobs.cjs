const fs = require('fs');

// admin_panel.html
let adminHtml = fs.readFileSync('admin_panel.html', 'utf8');
const sanitizeRegexAdmin = /const filteredProducts = customProducts\.filter\(prod => \{[\s\S]*?return prod\.category === currentAdminProductFilter;\n            \}\)\.map\(prod => \{[\s\S]*?if \(prod\.img && prod\.img\.startsWith\('blob:'\)\) \{[\s\S]*?prod\.img = 'cake_category_1777660447849\.png'; \/\/ Fallback[\s\S]*?\}[\s\S]*?return prod;\n            \}\);/;

adminHtml = adminHtml.replace(sanitizeRegexAdmin, `const filteredProducts = customProducts.filter(prod => {
                if (currentAdminProductFilter === 'All') return true;
                return prod.category === currentAdminProductFilter;
            });`);

fs.writeFileSync('admin_panel.html', adminHtml);
console.log('Reverted fallback image in admin_panel');

// dynamic_render.js
let dynJs = fs.readFileSync('dynamic_render.js', 'utf8');
const sanitizeRegexDyn = /const customProducts = \(JSON\.parse\(localStorage\.getItem\('st_custom_products'\)\) \|\| \[\]\)\.map\(prod => \{[\s\S]*?if \(prod\.img && prod\.img\.startsWith\('blob:'\)\) \{[\s\S]*?prod\.img = 'cake_category_1777660447849\.png'; \/\/ Fallback for old expired blobs[\s\S]*?\}[\s\S]*?return prod;\n    \}\);/;

dynJs = dynJs.replace(sanitizeRegexDyn, "const customProducts = JSON.parse(localStorage.getItem('st_custom_products')) || [];");

fs.writeFileSync('dynamic_render.js', dynJs);
console.log('Reverted fallback image in dynamic_render');
