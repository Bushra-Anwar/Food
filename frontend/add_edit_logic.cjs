const fs = require('fs');
let html = fs.readFileSync('admin_panel.html', 'utf8');

const formRegex = /<form onsubmit="handleAddProduct\(event\)">[\s\S]*?<\/form>/;
const newForm = `
            <form onsubmit="handleAddProduct(event)">
                <input type="hidden" id="editProdIndex" value="-1">
                <div style="margin-bottom:15px;">
                    <label style="display:block; margin-bottom:5px; font-weight:bold;">Product Name</label>
                    <input type="text" id="newProdName" required style="width:100%; padding:10px; border:1px solid #ddd; border-radius:8px;">
                </div>
                <div style="display:flex; gap:15px; margin-bottom:15px;">
                    <div style="flex:1;">
                        <label style="display:block; margin-bottom:5px; font-weight:bold;">Category</label>
                        <select id="newProdCategory" onchange="updateSubCategory()" style="width:100%; padding:10px; border:1px solid #ddd; border-radius:8px;">
                            <option value="Cakes">Cakes</option>
                            <option value="Donuts">Donuts</option>
                            <option value="Pastries">Pastries</option>
                            <option value="Ice Cream">Ice Cream</option>
                            <option value="Cupcakes">Cupcakes</option>
                            <option value="Gifting">Gifting</option>
                        </select>
                    </div>
                    <div style="flex:1;">
                        <label style="display:block; margin-bottom:5px; font-weight:bold;">Sub-Category</label>
                        <select id="newProdSubCategory" style="width:100%; padding:10px; border:1px solid #ddd; border-radius:8px;">
                        </select>
                    </div>
                    <div style="flex:1;">
                        <label style="display:block; margin-bottom:5px; font-weight:bold;">Product Label / Tag</label>
                        <select id="newProdLabel" style="width:100%; padding:10px; border:1px solid #ddd; border-radius:8px;">
                            <option value="Normal">Normal</option>
                            <option value="Premium">Premium</option>
                            <option value="Special">Special</option>
                            <option value="Discounted">Discounted</option>
                            <option value="Seasonal">Seasonal</option>
                            <option value="Festival">Festival</option>
                            <option value="Occasion">Occasion</option>
                            <option value="Party">Party</option>
                        </select>
                    </div>
                </div>
                <div style="display:flex; gap:15px; margin-bottom:15px;">
                    <div style="flex:1;">
                        <label style="display:block; margin-bottom:5px; font-weight:bold;">Price (₹)</label>
                        <input type="number" id="newProdPrice" required style="width:100%; padding:10px; border:1px solid #ddd; border-radius:8px;">
                    </div>
                    <div style="flex:1;">
                        <label style="display:block; margin-bottom:5px; font-weight:bold;">Stock Quantity</label>
                        <input type="number" id="newProdStock" required style="width:100%; padding:10px; border:1px solid #ddd; border-radius:8px;">
                    </div>
                </div>
                <div style="margin-bottom:15px;">
                    <label style="display:block; margin-bottom:5px; font-weight:bold;">Product Photo URL / File (Optional)</label>
                    <input type="file" id="newProdImg" accept="image/*" style="width:100%; padding:8px; border:1px solid #ddd; border-radius:8px;">
                </div>
                <div style="margin-bottom:20px;">
                    <label style="display:block; margin-bottom:5px; font-weight:bold;">Description</label>
                    <textarea id="newProdDesc" rows="3" style="width:100%; padding:10px; border:1px solid #ddd; border-radius:8px;"></textarea>
                </div>
                <button type="submit" style="width:100%; background:#8b5a33; color:#fff; padding:12px; border:none; border-radius:8px; font-weight:bold; cursor:pointer;">Save Product</button>
            </form>`;
html = html.replace(formRegex, newForm);

html = html.replace('<i class="fa-solid fa-pen-to-square"></i>', '<i class="fa-solid fa-pen-to-square" onclick="editProduct(${idx})"></i>');

let editFunc = `
        function editProduct(idx) {
            const prod = customProducts[idx];
            document.getElementById('editProdIndex').value = idx;
            document.getElementById('newProdName').value = prod.name;
            document.getElementById('newProdCategory').value = prod.category;
            updateSubCategory(); // trigger subcat update
            setTimeout(() => {
                document.getElementById('newProdSubCategory').value = prod.subCategory || '';
            }, 10);
            document.getElementById('newProdLabel').value = prod.label || 'Normal';
            document.getElementById('newProdPrice').value = prod.price;
            document.getElementById('newProdStock').value = prod.stock;
            document.getElementById('newProdDesc').value = prod.desc || '';
            
            document.getElementById('addProductModal').style.display = 'flex';
        }
`;

let addLogic = `
        function handleAddProduct(e) {
            e.preventDefault();
            const idx = parseInt(document.getElementById('editProdIndex').value);
            const name = document.getElementById('newProdName').value;
            const mainCat = document.getElementById('newProdCategory').value;
            const subCat = document.getElementById('newProdSubCategory').value;
            const label = document.getElementById('newProdLabel').value;
            const price = parseFloat(document.getElementById('newProdPrice').value);
            const stock = parseInt(document.getElementById('newProdStock').value);
            const desc = document.getElementById('newProdDesc').value;
            const imgFile = document.getElementById('newProdImg').files[0];
            
            let imgName = 'cake_category_1777660447849.png'; 
            if (idx >= 0 && customProducts[idx].img) {
                imgName = customProducts[idx].img; // retain existing
            }
            if(imgFile) {
                imgName = URL.createObjectURL(imgFile);
            }

            const newProd = {
                id: (idx >= 0) ? customProducts[idx].id : Date.now(),
                name: name,
                category: mainCat,
                subCategory: subCat,
                label: label,
                price: price,
                stock: stock,
                desc: desc,
                img: imgName
            };
            
            if (idx >= 0) {
                customProducts[idx] = newProd;
            } else {
                customProducts.push(newProd);
            }
            
            localStorage.setItem('st_custom_products', JSON.stringify(customProducts));
            
            closeAddProductModal();
            renderProducts();
            renderDashboard();
            e.target.reset();
            document.getElementById('editProdIndex').value = '-1';
        }
`;

html = html.replace(/function handleAddProduct\(e\) \{[\s\S]*?\n        \}/, addLogic);

html = html.replace('function closeAddProductModal() {', editFunc + '\n        function closeAddProductModal() {\n            document.getElementById(\'editProdIndex\').value = \'-1\';\n            document.getElementById(\'addProductModal\').querySelector(\'form\').reset();\n');

let renderProdString = `
                                <div>
                                    <span style="display:block;">\${prod.name} <span style="font-size:0.7rem; background:#eee; padding:2px 6px; border-radius:4px; color:#555; margin-left:5px;">\${prod.label || 'Normal'}</span></span>
                                    <span style="font-size:0.75rem; color:#888;">\${prod.subCategory || ''}</span>
                                </div>`;
html = html.replace(/<div>\s*<span style="display:block;">\$\{prod\.name\}<\/span>[\s\S]*?<\/div>/, renderProdString);

fs.writeFileSync('admin_panel.html', html);
