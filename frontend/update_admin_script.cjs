const fs = require('fs');
let html = fs.readFileSync('admin_panel.html', 'utf8');

// Modals to insert before <script>
const modals = `
    <!-- Add Product Modal -->
    <div id="addProductModal" style="display:none; position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.5); z-index:100; align-items:center; justify-content:center;">
        <div style="background:#fff; width:500px; padding:30px; border-radius:15px; position:relative;">
            <h2 style="margin-bottom:20px; font-family:'Playfair Display', serif;">Add New Product</h2>
            <i class="fa-solid fa-xmark" onclick="closeAddProductModal()" style="position:absolute; top:20px; right:20px; cursor:pointer; font-size:1.5rem; color:#888;"></i>
            <form onsubmit="handleAddProduct(event)">
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
                <button type="submit" style="width:100%; background:#8b5a33; color:#fff; padding:12px; border:none; border-radius:8px; font-weight:bold; cursor:pointer;">Add Product</button>
            </form>
        </div>
    </div>

    <!-- Order Details Modal -->
    <div id="orderDetailsModal" style="display:none; position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.5); z-index:100; align-items:center; justify-content:center;">
        <div style="background:#fff; width:500px; padding:30px; border-radius:15px; position:relative;">
            <h2 style="margin-bottom:20px; font-family:'Playfair Display', serif;">Order Details</h2>
            <i class="fa-solid fa-xmark" onclick="closeOrderModal()" style="position:absolute; top:20px; right:20px; cursor:pointer; font-size:1.5rem; color:#888;"></i>
            
            <div style="margin-bottom:20px; border-bottom:1px solid #eee; padding-bottom:15px;">
                <p><strong>Order ID:</strong> <span id="modalOrderId"></span></p>
                <p><strong>Customer:</strong> <span id="modalOrderCustomer"></span></p>
                <p><strong>Address:</strong> <span id="modalOrderAddress"></span></p>
                <p><strong>Payment Method:</strong> <span id="modalOrderPayment"></span></p>
            </div>

            <div style="margin-bottom:20px; max-height: 150px; overflow-y: auto;">
                <h4 style="margin-bottom:10px;">Items:</h4>
                <div id="modalOrderItems"></div>
            </div>

            <div style="text-align:right; font-size:1.2rem;">
                <strong>Total: <span id="modalOrderTotal"></span></strong>
            </div>
        </div>
    </div>
`;

// Replace HTML elements to have ID for JS targeting
html = html.replace('<div class="stat-val">₹42,500</div>', '<div class="stat-val" id="dash-revenue">₹0</div>');
html = html.replace('<div class="stat-val">128</div>', '<div class="stat-val" id="dash-orders">0</div>');
html = html.replace('<div class="stat-val">45</div>', '<div class="stat-val" id="dash-products">0</div>');
html = html.replace('<div class="stat-val">84</div>', '<div class="stat-val" id="dash-customers">0</div>');

html = html.replace(/<tbody>[\s\S]*?<\/tbody>/, '<tbody id="dash-recent-orders"></tbody>');
html = html.replace(/<tbody>[\s\S]*?<\/tbody>/, '<tbody id="products-tbody"></tbody>');
html = html.replace(/<tbody>[\s\S]*?<\/tbody>/, '<tbody id="orders-tbody"></tbody>');
html = html.replace(/<tbody>[\s\S]*?<\/tbody>/, '<tbody id="payments-tbody"></tbody>');

html = html.replace('<button class="btn-action"><i class="fa-solid fa-plus"></i> Add New Product</button>', '<button class="btn-action" onclick="openAddProductModal()"><i class="fa-solid fa-plus"></i> Add New Product</button>');
html = html.replace('<button class="btn-action"><i class="fa-solid fa-file-export"></i> Export Orders</button>', '<button class="btn-action" onclick="exportOrders()"><i class="fa-solid fa-file-export"></i> Export Orders</button>');
html = html.replace('<button class="btn-action"><i class="fa-solid fa-download"></i> Download Report</button>', '<button class="btn-action" onclick="downloadReport()"><i class="fa-solid fa-download"></i> Download Report</button>');

// Replace script
const scriptRegex = /<script>[\s\S]*?<\/script>/;
const newScript = `
<script>
        // Data loading
        let orders = JSON.parse(localStorage.getItem('st_orders')) || [];
        if (orders.length === 0) {
            orders = [
                { id: '#ORD-8901', date: new Date().toISOString(), items: [{name: 'Signature Chocolate Cake', qty: 1, price: 899}], total: 899, status: 'Pending', customerName: 'Rahul Sharma', customerAddress: '123 Park Street, Mumbai', paymentMethod: 'UPI' },
                { id: '#ORD-8900', date: new Date(Date.now() - 86400000).toISOString(), items: [{name: 'Berry Cupcake Box', qty: 2, price: 450}], total: 900, status: 'Processing', customerName: 'Ayesha Khan', customerAddress: '45 Lake View, Delhi', paymentMethod: 'Credit Card' },
                { id: '#ORD-8899', date: new Date(Date.now() - 172800000).toISOString(), items: [{name: 'Glazed Donut Pack', qty: 1, price: 300}, {name: 'Vanilla Bean Ice Cream', qty: 2, price: 250}], total: 800, status: 'Completed', customerName: 'Vikram Singh', customerAddress: '78 Galaxy Apt, Pune', paymentMethod: 'Debit Card' }
            ];
            localStorage.setItem('st_orders', JSON.stringify(orders));
        }

        let customProducts = JSON.parse(localStorage.getItem('st_custom_products')) || [];
        if (customProducts.length === 0) {
            customProducts = [
                { id: 1, name: 'Signature Chocolate Cake', category: 'Cakes', subCategory: 'Chocolate Cakes', price: 899, stock: 15, img: 'cake_category_1777660447849.png' },
                { id: 2, name: 'Berry Cupcake Box', category: 'Cupcakes', subCategory: 'Vanilla', price: 450, stock: 24, img: 'cupcake_deal_1777660591014.png' },
                { id: 3, name: 'Glazed Donut Pack', category: 'Donuts', subCategory: 'Glazed', price: 300, stock: 30, img: 'donut_category_1777660467553.png' },
                { id: 4, name: 'Vanilla Bean Ice Cream', category: 'Ice Cream', subCategory: 'Vanilla', price: 250, stock: 10, img: 'icecream_category_1777660485890.png' }
            ];
            localStorage.setItem('st_custom_products', JSON.stringify(customProducts));
        }

        function renderDashboard() {
            const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
            const activeProducts = customProducts.length;
            const customers = new Set(orders.map(o => o.customerName));
            
            document.getElementById('dash-revenue').textContent = '₹' + totalRevenue.toLocaleString();
            document.getElementById('dash-orders').textContent = orders.length;
            document.getElementById('dash-products').textContent = activeProducts;
            document.getElementById('dash-customers').textContent = customers.size;

            const recentOrders = [...orders].reverse().slice(0, 5);
            let html = '';
            recentOrders.forEach(order => {
                const badgeClass = order.status.toLowerCase() === 'completed' ? 'status-completed' : (order.status.toLowerCase() === 'processing' ? 'status-processing' : 'status-pending');
                html += \`
                    <tr>
                        <td>\${order.id}</td>
                        <td>\${order.customerName}</td>
                        <td>₹\${order.total.toLocaleString()}</td>
                        <td><span class="status-badge \${badgeClass}">\${order.status}</span></td>
                    </tr>
                \`;
            });
            document.getElementById('dash-recent-orders').innerHTML = html;
        }

        function renderProducts() {
            let html = '';
            customProducts.forEach((prod, idx) => {
                html += \`
                    <tr>
                        <td>
                            <div class="product-img-cell">
                                <img src="\${prod.img || 'default_image.png'}" alt="Product">
                                <div>
                                    <span style="display:block;">\${prod.name}</span>
                                    <span style="font-size:0.75rem; color:#888;">\${prod.subCategory || ''}</span>
                                </div>
                            </div>
                        </td>
                        <td>\${prod.category}</td>
                        <td>₹\${prod.price}</td>
                        <td>\${prod.stock}</td>
                        <td class="action-icons">
                            <i class="fa-solid fa-pen-to-square"></i>
                            <i class="fa-solid fa-trash" style="color: #ef4444;" onclick="deleteProduct(\${idx})"></i>
                        </td>
                    </tr>
                \`;
            });
            document.getElementById('products-tbody').innerHTML = html;
        }

        function deleteProduct(idx) {
            if(confirm("Are you sure you want to delete this product?")) {
                customProducts.splice(idx, 1);
                localStorage.setItem('st_custom_products', JSON.stringify(customProducts));
                renderDashboard();
                renderProducts();
            }
        }

        function renderOrders() {
            let html = '';
            const sortedOrders = [...orders].reverse();
            sortedOrders.forEach((order, idx) => {
                const dateObj = new Date(order.date);
                const dateStr = dateObj.toLocaleDateString('en-IN', {day:'numeric', month:'short', year:'numeric'});
                const itemCount = order.items.reduce((sum, item) => sum + (item.qty || 1), 0);
                
                html += \`
                    <tr>
                        <td>\${order.id}</td>
                        <td>\${dateStr}</td>
                        <td>\${order.customerName}</td>
                        <td>\${itemCount} items</td>
                        <td>₹\${order.total.toLocaleString()}</td>
                        <td>
                            <select onchange="updateOrderStatus('\${order.id}', this.value)" style="border:1px solid #ddd; border-radius:10px; padding:3px 10px; font-size:0.8rem; background:transparent;">
                                <option value="Pending" \${order.status === 'Pending' ? 'selected' : ''}>Pending</option>
                                <option value="Processing" \${order.status === 'Processing' ? 'selected' : ''}>Processing</option>
                                <option value="Completed" \${order.status === 'Completed' ? 'selected' : ''}>Completed</option>
                            </select>
                        </td>
                        <td class="action-icons">
                            <i class="fa-solid fa-eye" onclick="viewOrder('\${order.id}')"></i>
                        </td>
                    </tr>
                \`;
            });
            document.getElementById('orders-tbody').innerHTML = html;
        }

        function updateOrderStatus(id, newStatus) {
            const order = orders.find(o => o.id === id);
            if(order) {
                order.status = newStatus;
                localStorage.setItem('st_orders', JSON.stringify(orders));
                renderDashboard(); 
            }
        }

        function viewOrder(id) {
            const order = orders.find(o => o.id === id);
            if(!order) return;
            
            document.getElementById('modalOrderId').textContent = order.id;
            document.getElementById('modalOrderCustomer').textContent = order.customerName;
            document.getElementById('modalOrderAddress').textContent = order.customerAddress || 'N/A';
            document.getElementById('modalOrderPayment').textContent = order.paymentMethod || 'Credit Card';
            
            let itemsHtml = '';
            order.items.forEach(item => {
                itemsHtml += \`<div style="display:flex; justify-content:space-between; margin-bottom:10px; border-bottom:1px solid #eee; padding-bottom:10px;">
                    <div><b>\${item.name}</b> x \${item.qty || 1}</div>
                    <div>₹\${item.price * (item.qty || 1)}</div>
                </div>\`;
            });
            document.getElementById('modalOrderItems').innerHTML = itemsHtml;
            document.getElementById('modalOrderTotal').textContent = '₹' + order.total.toLocaleString();
            
            document.getElementById('orderDetailsModal').style.display = 'flex';
        }

        function closeOrderModal() {
            document.getElementById('orderDetailsModal').style.display = 'none';
        }

        function renderPayments() {
            let html = '';
            const sortedOrders = [...orders].reverse();
            sortedOrders.forEach((order, idx) => {
                const paymentStatus = (order.status === 'Pending') ? 'Pending' : 'Successful';
                const pBadgeClass = paymentStatus === 'Successful' ? 'status-completed' : 'status-pending';

                const dateObj = new Date(order.date);
                const dateStr = dateObj.toLocaleDateString('en-IN', {day:'numeric', month:'short', year:'numeric', hour:'2-digit', minute:'2-digit'});
                const txnId = 'TXN-' + order.id.replace('#ORD-', '998');

                html += \`
                    <tr>
                        <td>\${txnId}</td>
                        <td>\${order.id}</td>
                        <td>\${order.paymentMethod || 'Credit Card'}</td>
                        <td>\${dateStr}</td>
                        <td>₹\${order.total.toLocaleString()}</td>
                        <td><span class="status-badge \${pBadgeClass}">\${paymentStatus}</span></td>
                    </tr>
                \`;
            });
            document.getElementById('payments-tbody').innerHTML = html;
        }

        function exportOrders() {
            let csvContent = "data:text/csv;charset=utf-8,";
            csvContent += "Order ID,Date,Customer Name,Address,Items,Total,Status,Payment Method\\n";
            
            orders.forEach(order => {
                let itemsStr = order.items.map(i => \`\${i.name} (x\${i.qty||1})\`).join(" | ");
                let row = [
                    order.id,
                    new Date(order.date).toLocaleString(),
                    \`"\${order.customerName}"\`,
                    \`"\${order.customerAddress}"\`,
                    \`"\${itemsStr}"\`,
                    order.total,
                    order.status,
                    order.paymentMethod
                ].join(",");
                csvContent += row + "\\n";
            });
            
            const encodedUri = encodeURI(csvContent);
            const link = document.createElement("a");
            link.setAttribute("href", encodedUri);
            link.setAttribute("download", "orders_export.csv");
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }

        function downloadReport() {
            let csvContent = "data:text/csv;charset=utf-8,";
            csvContent += "Transaction ID,Order ID,Method,Date,Amount,Status\\n";
            
            orders.forEach(order => {
                const txnId = 'TXN-' + order.id.replace('#ORD-', '998');
                const paymentStatus = (order.status === 'Pending') ? 'Pending' : 'Successful';
                let row = [
                    txnId,
                    order.id,
                    order.paymentMethod,
                    new Date(order.date).toLocaleString(),
                    order.total,
                    paymentStatus
                ].join(",");
                csvContent += row + "\\n";
            });
            
            const encodedUri = encodeURI(csvContent);
            const link = document.createElement("a");
            link.setAttribute("href", encodedUri);
            link.setAttribute("download", "payment_report.csv");
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }

        function openAddProductModal() {
            document.getElementById('addProductModal').style.display = 'flex';
        }
        function closeAddProductModal() {
            document.getElementById('addProductModal').style.display = 'none';
        }
        
        function updateSubCategory() {
            const mainCat = document.getElementById('newProdCategory').value;
            const subCatSelect = document.getElementById('newProdSubCategory');
            subCatSelect.innerHTML = '';
            let options = [];
            
            if(mainCat === 'Cakes') options = ['Birthday Cakes', 'Anniversary Cakes', 'Wedding Cakes', 'Eggless Cakes', 'Chocolate Cakes', 'Fruit Cakes'];
            else if(mainCat === 'Donuts') options = ['Chocolate', 'Strawberry', 'Glazed', 'Cookies & Cream', 'Sprinkles', 'Nut Filled'];
            else if(mainCat === 'Pastries') options = ['Chocolate Pastry', 'Strawberry', 'Pineapple', 'Coffee', 'Cheesecake Slice', 'Tiramisu'];
            else if(mainCat === 'Ice Cream') options = ['Chocolate', 'Strawberry', 'Mango', 'Cookies & Cream', 'Sundaes'];
            else if(mainCat === 'Cupcakes') options = ['Vanilla', 'Chocolate', 'Red Velvet'];
            else if(mainCat === 'Gifting') options = ['Cake + Flowers', 'Chocolate Hampers', 'Teddy Combos', 'Greeting Cards'];
            else options = ['General'];
            
            options.forEach(opt => {
                subCatSelect.innerHTML += \`<option value="\${opt}">\${opt}</option>\`;
            });
        }

        function handleAddProduct(e) {
            e.preventDefault();
            const name = document.getElementById('newProdName').value;
            const mainCat = document.getElementById('newProdCategory').value;
            const subCat = document.getElementById('newProdSubCategory').value;
            const price = parseFloat(document.getElementById('newProdPrice').value);
            const stock = parseInt(document.getElementById('newProdStock').value);
            const desc = document.getElementById('newProdDesc').value;
            const imgFile = document.getElementById('newProdImg').files[0];
            
            let imgName = 'cake_category_1777660447849.png'; 
            if(imgFile) {
                imgName = URL.createObjectURL(imgFile);
            }

            const newProd = {
                id: Date.now(),
                name: name,
                category: mainCat,
                subCategory: subCat,
                price: price,
                stock: stock,
                desc: desc,
                img: imgName
            };
            
            customProducts.push(newProd);
            localStorage.setItem('st_custom_products', JSON.stringify(customProducts));
            
            closeAddProductModal();
            renderProducts();
            renderDashboard();
            alert("Product added successfully!");
        }

        // Init
        updateSubCategory();
        renderDashboard();
        renderProducts();
        renderOrders();
        renderPayments();

        function switchPanel(panelId, navElement) {
            document.querySelectorAll('.admin-nav-item').forEach(el => el.classList.remove('active'));
            if(navElement) navElement.classList.add('active');

            document.querySelectorAll('.admin-panel').forEach(panel => panel.classList.remove('active'));
            document.getElementById('panel-' + panelId).classList.add('active');

            const titles = {
                'dashboard': 'Dashboard Overview',
                'products': 'Product Management',
                'orders': 'Order Management',
                'payments': 'Payment History'
            };
            document.getElementById('headerTitle').textContent = titles[panelId];
            
            if(panelId === 'dashboard') renderDashboard();
            if(panelId === 'products') renderProducts();
            if(panelId === 'orders') renderOrders();
            if(panelId === 'payments') renderPayments();
        }
</script>
`;

html = html.replace(scriptRegex, modals + '\n' + newScript);
fs.writeFileSync('admin_panel.html', html);
