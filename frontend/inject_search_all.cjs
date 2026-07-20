const fs = require('fs');
const path = require('path');

const dir = __dirname;
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

const searchScript = `
<script>
    // SEARCH AUTO-SUGGESTIONS LOGIC
    const productsDB = [
        { name: 'Chocolate Truffle', price: 499, img: 'cake_category_1777660447849.png' },
        { name: 'Red Velvet Cake', price: 599, img: 'recommended_cake.png' },
        { name: 'Mango Cake', price: 399, img: 'cake_category_1777660447849.png' },
        { name: 'Black Forest', price: 449, img: 'recommended_cake.png' },
        { name: 'Chocolate Donut', price: 149, img: 'donut_category_1777660467553.png' },
        { name: 'Strawberry Donut', price: 129, img: 'recommended_donut.png' },
        { name: 'Glazed Donut', price: 119, img: 'donut_category_1777660467553.png' },
        { name: 'Caramel Donut', price: 169, img: 'donut_category_1777660467553.png' },
        { name: 'Almond Croissant', price: 189, img: 'pastry_category_1777660510169.png' },
        { name: 'Pain au Chocolat', price: 199, img: 'recommended_pastry.png' },
        { name: 'Berry Cheesecake', price: 249, img: 'blueberry_cheesecake_1784385282085.png' },
        { name: 'Chocolate Mousse', price: 199, img: 'pastry_category_1777660510169.png' },
        { name: 'Vanilla Bean Cone', price: 199, img: 'icecream_category_1777660485890.png' },
        { name: 'Mango Gelato', price: 229, img: 'recommended_icecream.png' },
        { name: 'Strawberry Delicious', price: 199, img: 'strawberry_splash_1784385077502.png' },
        { name: 'Iced Coffee Splash', price: 249, img: 'iced_coffee_splash_1784385065567.png' },
        { name: 'Cupcake Hamper', price: 899, img: 'cupcake_deal_1777660591014.png' },
        { name: 'Premium Macarons', price: 999, img: 'macaron_deal_1777660573385.png' },
        { name: 'Pistachio Macarons', price: 399, img: 'floating_macarons_1784385089856.png' },
        { name: 'Berry Macarons', price: 399, img: 'macaron_deal_1777660573385.png' }
    ];

    function handleSearchInput(val) {
        const container = document.getElementById('navSearchContainer');
        const dropdown = document.getElementById('searchDropdown');
        const searchStr = val.toLowerCase().trim();
        
        if (searchStr.length === 0) {
            container.classList.remove('active');
            return;
        }
        
        const matches = productsDB.filter(p => p.name.toLowerCase().includes(searchStr));
        
        let html = '';
        if (matches.length > 0) {
            html += '<div class="search-group"><h5>Suggestions</h5>';
            matches.forEach(m => {
                html += \`<div class="search-item" onclick="if(typeof openProductModal === 'function'){openProductModal('\${m.name}', 'Our signature dessert crafted perfectly.', \${m.price}, '\${m.img}'); document.getElementById('navSearchContainer').classList.remove('active');} else {addToCart('\${m.name}', \${m.price}, '\${m.img}'); showToast('Added to bag!'); document.getElementById('navSearchContainer').classList.remove('active');}" style="display:flex; justify-content:space-between; align-items:center; cursor:pointer;"><span style="display:flex;align-items:center;gap:10px;"><img src="\${m.img}" style="width:30px;height:30px;border-radius:5px;object-fit:cover;"> \${m.name}</span> <span style="color:var(--clr-primary);font-weight:bold;">₹\${m.price}</span></div>\`;
            });
            html += '</div>';
        } else {
            html += '<p style="color: #888; font-size: 0.9rem; padding: 10px;">No results found</p>';
        }
        
        dropdown.innerHTML = html;
        container.classList.add('active');
    }

    // Close search dropdown on outside click
    document.addEventListener('click', (e) => {
        const container = document.getElementById('navSearchContainer');
        if (container && !container.contains(e.target)) {
            container.classList.remove('active');
        }
    });

    // Simple search interaction (Enter key)
    const searchInputEl = document.querySelector('#searchInput');
    if (searchInputEl) {
        searchInputEl.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                showToast('Searching for: ' + this.value);
                const container = document.getElementById('navSearchContainer');
                if (container) container.classList.remove('active');
            }
        });
    }
</script>
`;

let injectedCount = 0;

files.forEach(file => {
    const content = fs.readFileSync(file, 'utf8');
    if (content.includes('id="searchInput"') && !content.includes('function handleSearchInput(')) {
        // Find </body> to inject before it
        const newContent = content.replace('</body>', searchScript + '\n</body>');
        fs.writeFileSync(file, newContent, 'utf8');
        injectedCount++;
        console.log("Injected search into " + file);
    } else {
        console.log("Skipped " + file);
    }
});

console.log("Done! Injected into " + injectedCount + " files.");
