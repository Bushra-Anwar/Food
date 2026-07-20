const fs = require('fs');

const htmlFiles = fs.readdirSync(__dirname).filter(f => f.endsWith('.html'));

// 1. Fix Category Circles
const oldCatScript = `document.querySelectorAll('.category-item').forEach(item => {
            const nameEl = item.querySelector('.category-name');
            if (nameEl) {
                const categoryName = nameEl.textContent.trim();
                item.onclick = () => openCategoryDetails(categoryName);
            }
        });`;

const newCatScript = `document.querySelectorAll('.category-item').forEach(item => {
            const nameEl = item.querySelector('.category-name');
            if (nameEl) {
                const categoryName = nameEl.textContent.trim().toLowerCase();
                item.onclick = () => {
                    if (categoryName.includes('cake')) window.location.href = 'cakes.html';
                    else if (categoryName.includes('donut')) window.location.href = 'donuts.html';
                    else if (categoryName.includes('ice cream')) window.location.href = 'icecream.html';
                    else if (categoryName.includes('pastry') || categoryName.includes('croissant')) window.location.href = 'pastries.html';
                    else window.location.href = 'gifting.html';
                };
                item.style.cursor = 'pointer';
            }
        });`;

htmlFiles.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    if (content.includes(oldCatScript)) {
        content = content.replace(oldCatScript, newCatScript);
        fs.writeFileSync(file, content, 'utf8');
        console.log("Fixed category links in " + file);
    }
});

// 2. Fix icecream.html masonry grid to be ice cream and support modals
if (fs.existsSync('icecream.html')) {
    let iceContent = fs.readFileSync('icecream.html', 'utf8');
    
    // Replace the masonry container completely
    const startIdx = iceContent.indexOf('<div class="masonry-container">');
    const endIdx = iceContent.indexOf('</div>', iceContent.indexOf('</div>', iceContent.indexOf('</div>', startIdx) + 1) + 1); 
    // Actually it's easier with regex or string replacement if we know the exact block.
    // The masonry container has 5 items.
}
