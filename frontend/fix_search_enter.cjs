const fs = require('fs');
const path = require('path');

const dir = __dirname;
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

const oldEnterLogicRegex = /\/\/ Simple search interaction \(Enter key\)[\s\S]*?\}\);/g;

const newEnterLogic = `// Simple search interaction (Enter key)
    const searchInputEl = document.querySelector('#searchInput');
    if (searchInputEl) {
        searchInputEl.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                const searchStr = this.value.toLowerCase().trim();
                if (!searchStr) return;
                
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
                
                // Clear input
                this.value = '';
            }
        });
    }`;

let modifiedCount = 0;
files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    
    // Some files might have the old script without the if(searchInputEl) check from before
    // I need a robust replacement strategy
    // Since I injected the search script into many files in the last turn, I will just replace from '// Simple search interaction' up to '</script>'
    
    const blockRegex = /\/\/ Simple search interaction \(Enter key\)[\s\S]*?<\/script>/;
    const replacement = newEnterLogic + '\n</script>';
    
    if (blockRegex.test(content)) {
        content = content.replace(blockRegex, replacement);
        fs.writeFileSync(file, content, 'utf8');
        modifiedCount++;
        console.log("Fixed Enter logic in " + file);
    }
});

console.log("Done! Modified " + modifiedCount + " files.");
