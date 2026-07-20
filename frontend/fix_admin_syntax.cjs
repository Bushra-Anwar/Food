const fs = require('fs');
let html = fs.readFileSync('admin_panel.html', 'utf8');

// The exact string in the file (from lines 595-605)
const brokenLogic = `                try {
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

html = html.replace(brokenLogic, "localStorage.setItem('st_custom_products', JSON.stringify(customProducts));");

const finalizeAddRegex = /const finalizeAdd = \(finalImg\) => \{[\s\S]*?localStorage\.setItem\('st_custom_products', JSON\.stringify\(customProducts\)\);[\s\S]*?document\.getElementById\('editProdIndex'\)\.value = '-1';\n            \};/;

html = html.replace(finalizeAddRegex, (match) => {
    return match.replace("localStorage.setItem('st_custom_products', JSON.stringify(customProducts));", `
                try {
                    localStorage.setItem('st_custom_products', JSON.stringify(customProducts));
                } catch(e) {
                    alert("Error: Storage Limit Exceeded! The image file is too large. Please upload a smaller image.");
                    if (idx < 0) customProducts.pop();
                    return;
                }`);
});

fs.writeFileSync('admin_panel.html', html);
console.log('Fixed syntax error in admin_panel');
