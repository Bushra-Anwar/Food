const fs = require('fs');

const scriptBlock = `
<script>
    let currentModalQty = 1;
    function changeModalQty(change) {
        currentModalQty += change;
        if (currentModalQty < 1) currentModalQty = 1;
        const qtyValEl = document.getElementById('modalQtyVal');
        if (qtyValEl) qtyValEl.textContent = currentModalQty;
    }

    function openProductModal(name, desc, price, img) {
        currentModalQty = 1;
        const qtyValEl = document.getElementById('modalQtyVal');
        if (qtyValEl) qtyValEl.textContent = currentModalQty;

        const titleEl = document.getElementById('categoryModalTitle');
        if (titleEl) titleEl.textContent = 'Product Details';
        
        const mainNameEl = document.getElementById('categoryMainName');
        if (mainNameEl) mainNameEl.textContent = name;
        
        const mainImgEl = document.getElementById('categoryMainImg');
        if (mainImgEl) {
            mainImgEl.src = img;
            mainImgEl.alt = name;
        }
        
        const mainDescEl = document.getElementById('categoryMainDesc');
        if (mainDescEl) mainDescEl.textContent = desc || 'A premium selection crafted with the finest ingredients.';
        
        const mainPriceEl = document.getElementById('categoryMainPrice');
        if (mainPriceEl) mainPriceEl.textContent = '₹' + price;
        
        const recNameEl = document.getElementById('categoryRecName');
        if (recNameEl) recNameEl.textContent = 'Chef\\'s Special Pairing';
        
        const recImgEl = document.getElementById('categoryRecImg');
        if (recImgEl) recImgEl.src = img; 
        
        const recPriceEl = document.getElementById('categoryRecPrice');
        if (recPriceEl) recPriceEl.textContent = '₹' + Math.floor(price * 0.8);
        
        const addBtn = document.getElementById('categoryAddBagBtn');
        if (addBtn) addBtn.onclick = () => { if(typeof addToCart === 'function') addToCart(name, price, img, currentModalQty); };
        
        const buyBtn = document.getElementById('categoryBuyNowBtn');
        if (buyBtn) buyBtn.onclick = () => {
            if(typeof addToCart === 'function') addToCart(name, price, img, currentModalQty);
            if(typeof closeModals === 'function') closeModals();
            if(typeof openCheckout === 'function') openCheckout();
        };
        
        const recBtn = document.getElementById('categoryRecAddBtn');
        if (recBtn) recBtn.onclick = () => { if(typeof addToCart === 'function') addToCart('Chef\\'s Special Pairing', Math.floor(price * 0.8), img, 1); };
        
        const modalEl = document.getElementById('categoryDetailModal');
        if (modalEl) modalEl.classList.add('show');
        
        const overlayEl = document.getElementById('overlay');
        if (overlayEl) overlayEl.classList.add('show');
    }
</script>
`;

const files = fs.readdirSync(__dirname).filter(f => f.endsWith('.html'));

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    // Only inject if it doesn't already have openProductModal
    if (!content.includes('function openProductModal')) {
        content = content.replace('</body>', scriptBlock + '\n</body>');
        fs.writeFileSync(file, content);
        console.log('Injected openProductModal into', file);
    }
});
