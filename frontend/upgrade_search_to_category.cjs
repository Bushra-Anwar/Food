const fs = require('fs');
const path = require('path');

const dir = __dirname;
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

const replacementScript = `function handleSearchInput(val) {
        const container = document.getElementById('navSearchContainer');
        const dropdown = document.getElementById('searchDropdown');
        const searchStr = val.toLowerCase().trim();
        
        if (searchStr.length === 0) {
            container.classList.remove('active');
            return;
        }
        
        const matches = typeof productsDB !== 'undefined' ? productsDB.filter(p => p.name.toLowerCase().includes(searchStr)) : [];
        
        let html = '';
        
        let catMatch = null;
        if (searchStr.includes('cake')) catMatch = {name: 'Cakes', url: 'cakes.html', icon: 'fa-cake-candles'};
        else if (searchStr.includes('donut')) catMatch = {name: 'Donuts', url: 'donuts.html', icon: 'fa-circle-dot'};
        else if (searchStr.includes('ice')) catMatch = {name: 'Ice Cream', url: 'icecream.html', icon: 'fa-ice-cream'};
        else if (searchStr.includes('pastry') || searchStr.includes('croissant')) catMatch = {name: 'Pastries', url: 'pastries.html', icon: 'fa-cookie'};
        else if (searchStr.includes('gift') || searchStr.includes('macaron') || searchStr.includes('cupcake')) catMatch = {name: 'Gifting & Cupcakes', url: 'gifting.html', icon: 'fa-gift'};
        
        if (catMatch || matches.length > 0) {
            html += '<div class="search-group"><h5>Suggestions</h5>';
            if (catMatch) {
                html += \`<div class="search-item" onclick="window.location.href='\${catMatch.url}'" style="display:flex; justify-content:space-between; align-items:center; cursor:pointer; background:#fff5e6; border-left:4px solid var(--clr-primary);"><span style="display:flex;align-items:center;gap:10px;"><i class="fa-solid \${catMatch.icon}" style="color:var(--clr-primary); width:30px; text-align:center; font-size:1.2rem;"></i> Explore all \${catMatch.name}</span> <i class="fa-solid fa-chevron-right" style="color:#aaa;"></i></div>\`;
            }
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
                e.preventDefault();
                const searchStr = this.value.toLowerCase().trim();
                if (!searchStr) return;
                
                let catUrl = '';
                if (searchStr.includes('cake')) catUrl = 'cakes.html';
                else if (searchStr.includes('donut')) catUrl = 'donuts.html';
                else if (searchStr.includes('ice')) catUrl = 'icecream.html';
                else if (searchStr.includes('pastry') || searchStr.includes('croissant')) catUrl = 'pastries.html';
                else if (searchStr.includes('gift') || searchStr.includes('macaron') || searchStr.includes('cupcake')) catUrl = 'gifting.html';
                
                if (catUrl) {
                    window.location.href = catUrl;
                    return;
                }
                
                const match = typeof productsDB !== 'undefined' ? productsDB.find(p => p.name.toLowerCase().includes(searchStr)) : null;
                
                if (match) {
                    if (typeof openProductModal === 'function') {
                        openProductModal(match.name, 'Our signature dessert crafted perfectly.', match.price, match.img);
                    } else if (typeof addToCart === 'function') {
                        addToCart(match.name, match.price, match.img);
                        if (typeof showToast === 'function') showToast('Added ' + match.name + ' to bag!');
                    }
                } else {
                    if (typeof showToast === 'function') showToast('No exact match found for: ' + this.value);
                }
                
                const container = document.getElementById('navSearchContainer');
                if (container) container.classList.remove('active');
                this.value = '';
            }
        });
    }
</script>`;

const blockRegex = /function handleSearchInput\(val\) \{[\s\S]*?<\/script>/;

let modifiedCount = 0;
files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    if (blockRegex.test(content)) {
        content = content.replace(blockRegex, replacementScript);
        fs.writeFileSync(file, content, 'utf8');
        modifiedCount++;
        console.log("Upgraded search category logic in " + file);
    }
});

console.log("Done! Upgraded " + modifiedCount + " files.");
