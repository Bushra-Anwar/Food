const fs = require('fs');
const path = require('path');
const dir = '.';

fs.readdirSync(dir).forEach(file => {
    if (file.endsWith('.html') && file !== 'admin_panel.html' && file !== 'order_history.html') {
        let content = fs.readFileSync(file, 'utf8');
        const target = '<div class="action-item" onclick="window.location.href=\'wishlist.html\'" style="cursor:pointer;">';
        const replacement = `<div class="action-item" onclick="window.location.href='order_history.html'" style="cursor:pointer;">
                <i class="fa-solid fa-receipt"></i>
                <span>Orders</span>
            </div>
            <div class="action-item" onclick="window.location.href='wishlist.html'" style="cursor:pointer;">`;
            
        if (content.includes(target) && !content.includes('order_history.html')) {
            content = content.replace(target, replacement);
            fs.writeFileSync(file, content);
            console.log('Updated ' + file);
        }
    }
});
