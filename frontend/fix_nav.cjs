const fs = require('fs');
const files = fs.readdirSync(__dirname).filter(f => f.endsWith('.html'));

const oldNavActions = `<div class="nav-actions">
            <div class="action-item" onclick="window.location.href='login.html'" style="cursor:pointer;">
                <i class="fa-regular fa-user"></i>
                <span>Login</span>
            </div>
            <div class="action-item" onclick="window.location.href='wishlist.html'" style="cursor:pointer;">
                <i class="fa-regular fa-heart"></i>
                <span>Wishlist</span>
            </div>`;

const newNavActions = `<div class="nav-actions">
            <div class="action-item" onclick="window.location.href='menu.html'" style="cursor:pointer;">
                <i class="fa-solid fa-bars"></i>
                <span>Menu</span>
            </div>
            <div class="action-item" onclick="window.location.href='login.html'" style="cursor:pointer;">
                <i class="fa-regular fa-user"></i>
                <span>Login</span>
            </div>
            <div class="action-item" onclick="window.location.href='wishlist.html'" style="cursor:pointer;">
                <i class="fa-regular fa-heart"></i>
                <span>Wishlist</span>
            </div>`;

// Some files might have the older version if they missed the exact string replacement
const fallbackOldNav = `<div class="nav-actions">
            <div class="action-item" onclick="window.location.href='menu.html'" style="cursor:pointer;">
                <i class="fa-regular fa-user"></i>
                <span>Menu</span>
            </div>
            <div class="action-item" onclick="window.location.href='wishlist.html'" style="cursor:pointer;">
                <i class="fa-regular fa-heart"></i>
                <span>Wishlist</span>
            </div>`;


files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let changed = false;
    if (content.includes(oldNavActions)) {
        content = content.replace(oldNavActions, newNavActions);
        changed = true;
    } else if (content.includes(fallbackOldNav)) {
        content = content.replace(fallbackOldNav, newNavActions);
        changed = true;
    }
    
    if (changed) {
        fs.writeFileSync(file, content);
        console.log('Fixed nav in', file);
    }
});
