const fs = require('fs');
const path = require('path');

const files = fs.readdirSync(__dirname).filter(f => f.endsWith('.html'));

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    
    // Find the openCheckout function block
    const funcStartStr = 'function openCheckout() {';
    const funcStart = content.indexOf(funcStartStr);
    
    if (funcStart !== -1) {
        // Simple heuristic: find the end of the function by counting braces or just replacing a known block
        // In our templates, it usually looks exactly like:
        /*
        function openCheckout() {
            if (cart.length === 0) return showToast('Your bag is empty!', 'error');
            toggleCart();
            checkoutModal.classList.add('show');
            overlay.classList.add('show');
        }
        */
        // Let's just use regex to replace the body of the function.
        content = content.replace(/function openCheckout\(\) \{[\s\S]*?\n\s*\}/g, 'function openCheckout() {\n            window.location.href = \'cart.html\';\n        }');
        
        fs.writeFileSync(file, content);
        console.log('Updated openCheckout in ' + file);
    }
});
