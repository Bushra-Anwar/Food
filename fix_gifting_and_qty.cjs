const fs = require('fs');

const files = ['index.html', 'cakes.html', 'donuts.html', 'pastries.html', 'icecream.html', 'gifting.html'];

files.forEach(file => {
    if (fs.existsSync(file)) {
        let content = fs.readFileSync(file, 'utf8');
        
        // 1. Remove the Gifting click override
        content = content.replace(
            /\/\/\s*Make\s*"Gifting"\s*open\s*reservation\s*document\.querySelectorAll\('\.nav-links li'\)\.forEach\(li => \{\s*if \(li\.textContent === 'Gifting'\) li\.onclick = openReservation;\s*\}\);/g,
            '// Gifting link works normally now'
        );

        // 2. Add Quantity Controls to the Product Details Modal
        if (!content.includes('id="modalQtyVal"')) {
            const priceDiv = '<div id="categoryMainPrice" style="font-size: 1.15rem; font-weight: 700; color: var(--clr-primary); margin-bottom: 15px;"></div>';
            const qtyDiv = `
                    <div id="categoryMainPrice" style="font-size: 1.15rem; font-weight: 700; color: var(--clr-primary); margin-bottom: 15px;"></div>
                    <div style="display: flex; align-items: center; gap: 15px; margin-bottom: 15px;">
                        <span style="font-size:0.9rem; font-weight:bold;">Quantity:</span>
                        <div style="display: flex; align-items: center; border: 1px solid var(--clr-border); border-radius: 20px; overflow: hidden; background:#f9f9f9;">
                            <button id="modalQtyMinus" onclick="changeModalQty(-1)" style="padding: 5px 15px; background: transparent; border: none; cursor: pointer; font-weight: bold; font-size:1.2rem;">-</button>
                            <span id="modalQtyVal" style="padding: 5px 15px; font-weight: bold; width:30px; text-align:center;">1</span>
                            <button id="modalQtyPlus" onclick="changeModalQty(1)" style="padding: 5px 15px; background: transparent; border: none; cursor: pointer; font-weight: bold; font-size:1.2rem;">+</button>
                        </div>
                    </div>`;
            content = content.replace(priceDiv, qtyDiv);
        }

        // 3. Update the global modal logic to handle Quantity
        const oldModalLogic = /function openProductModal\([\s\S]*?overlay\.classList\.add\('show'\);\s*\}/;
        const newModalLogic = `
        let currentModalQty = 1;
        
        function changeModalQty(change) {
            currentModalQty += change;
            if (currentModalQty < 1) currentModalQty = 1;
            document.getElementById('modalQtyVal').textContent = currentModalQty;
        }

        function openProductModal(name, desc, price, img) {
            currentModalQty = 1; // Reset qty
            const qtyValEl = document.getElementById('modalQtyVal');
            if (qtyValEl) qtyValEl.textContent = currentModalQty;

            document.getElementById('categoryModalTitle').textContent = 'Product Details';
            document.getElementById('categoryMainName').textContent = name;
            document.getElementById('categoryMainImg').src = img;
            document.getElementById('categoryMainImg').alt = name;
            document.getElementById('categoryMainDesc').textContent = desc || 'A premium selection crafted with the finest ingredients.';
            document.getElementById('categoryMainPrice').textContent = \`₹\${price}\`;
            
            // Set random recommended product
            document.getElementById('categoryRecName').textContent = 'Chef\\'s Special Pairing';
            document.getElementById('categoryRecImg').src = img; 
            document.getElementById('categoryRecPrice').textContent = \`₹\${Math.floor(price * 0.8)}\`;
            
            document.getElementById('categoryAddBagBtn').onclick = () => {
                addToCart(name, price, img, currentModalQty);
            };
            
            document.getElementById('categoryBuyNowBtn').onclick = () => {
                addToCart(name, price, img, currentModalQty);
                closeModals();
                openCheckout();
            };
            
            document.getElementById('categoryRecAddBtn').onclick = () => {
                addToCart('Chef\\'s Special Pairing', Math.floor(price * 0.8), img, 1);
            };
            
            document.getElementById('categoryDetailModal').classList.add('show');
            overlay.classList.add('show');
        }`;
        content = content.replace(oldModalLogic, newModalLogic);

        // 4. Update Cart logic to handle Quantity
        const oldAddToCart = /function addToCart\(name, price, img\)\s*\{\s*cart\.push\(\{ name, price, img \}\);\s*updateCartUI\(\);\s*showToast\(`\$\{name\} added to bag!`\);\s*\}/;
        const newAddToCart = `
        function addToCart(name, price, img, qty = 1) {
            const existingItem = cart.find(item => item.name === name);
            if (existingItem) {
                existingItem.qty += qty;
            } else {
                cart.push({ name, price, img, qty });
            }
            updateCartUI();
            showToast(\`\${qty}x \${name} added to bag!\`);
        }`;
        content = content.replace(oldAddToCart, newAddToCart);

        // Update the total logic inside updateCartUI
        if (content.includes('total += item.price;')) {
            content = content.replace(
                /total \+= item\.price;/g,
                'total += (item.price * (item.qty || 1));'
            );
        }

        // Update UI inside updateCartUI to show Qty and allow modifying from cart
        const oldCartItemHtml = /return `\s*<div class="cart-item">[\s\S]*?<\/div>\s*`;/;
        const newCartItemHtml = `return \`
                    <div class="cart-item" style="display:flex; align-items:center; margin-bottom:15px; border-bottom:1px solid #eee; padding-bottom:10px;">
                        <img src="\${item.img}" class="cart-item-img" style="width:60px; height:60px; border-radius:8px; object-fit:cover; margin-right:15px;">
                        <div class="cart-item-info" style="flex:1;">
                            <h4 class="cart-item-title" style="margin:0 0 5px; font-size:0.95rem;">\${item.name}</h4>
                            <div class="cart-item-price" style="font-weight:bold; color:var(--clr-primary); margin-bottom:5px;">₹\${item.price}</div>
                            
                            <div style="display:flex; align-items:center; justify-content:space-between;">
                                <div style="display:flex; align-items:center; background:#f1f1f1; border-radius:15px; overflow:hidden;">
                                    <button onclick="updateCartItemQty(\${index}, -1)" style="border:none; background:none; padding:2px 8px; cursor:pointer; font-weight:bold;">-</button>
                                    <span style="font-size:0.8rem; font-weight:bold; width:20px; text-align:center;">\${item.qty || 1}</span>
                                    <button onclick="updateCartItemQty(\${index}, 1)" style="border:none; background:none; padding:2px 8px; cursor:pointer; font-weight:bold;">+</button>
                                </div>
                                <button onclick="removeFromCart(\${index})" style="background:none; border:none; color: var(--clr-primary); cursor:pointer; font-size:0.8rem; font-weight:bold;"><i class="fa-solid fa-trash"></i></button>
                            </div>
                        </div>
                    </div>
                \`;`;
        content = content.replace(oldCartItemHtml, newCartItemHtml);

        // Inject the updateCartItemQty function globally if it doesn't exist
        if (!content.includes('function updateCartItemQty')) {
            const removeFromCartRegex = /function removeFromCart\(index\)\s*\{\s*cart\.splice\(index, 1\);\s*updateCartUI\(\);\s*\}/;
            const updateQtyFunc = `
        function removeFromCart(index) {
            cart.splice(index, 1);
            updateCartUI();
        }
        
        function updateCartItemQty(index, change) {
            if (cart[index]) {
                cart[index].qty = (cart[index].qty || 1) + change;
                if (cart[index].qty < 1) {
                    cart.splice(index, 1);
                }
                updateCartUI();
            }
        }`;
            content = content.replace(removeFromCartRegex, updateQtyFunc);
        }

        // Change mega menu "addToCart" to "openProductModal" so clicking anywhere shows the detailed view first!
        // The old code: onclick="addToCart('Chocolate Truffle', 499, 'cake_category_1777660447849.png')"
        // But actually the mega-card buttons have `<button>Add to Cart</button>`.
        // To be safe, any onclick="addToCart(...)" in the mega-menu HTML should just be changed to openProductModal.
        content = content.replace(/onclick="addToCart\('([^']+)',\s*(\d+),\s*'([^']+)'\)"/g, "onclick=\"openProductModal('$1', 'Our signature dessert crafted perfectly.', $2, '$3')\"");

        fs.writeFileSync(file, content);
        
        // Ensure frontend is also synced
        if (fs.existsSync('frontend/' + file)) {
            fs.writeFileSync('frontend/' + file, content);
        }
        console.log('Fixed functionality in ' + file);
    }
});
