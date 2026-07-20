const fs = require('fs');
const path = require('path');

const dir = __dirname;
const dist = path.join(dir, 'dist_static');

if (!fs.existsSync(dist)) {
    fs.mkdirSync(dist, { recursive: true });
}

const files = fs.readdirSync(dir);

for (const file of files) {
    // We only copy the static files needed for the bakery website
    if (file.endsWith('.html') || file.endsWith('.css') || file.endsWith('.js') || file.endsWith('.png') || file.endsWith('.jpg') || file.endsWith('.jpeg') || file.endsWith('.svg')) {
        // Exclude the react source code and config files
        if (file !== 'vite.config.js' && file !== 'dynamic_render.js') {
            fs.copyFileSync(path.join(dir, file), path.join(dist, file));
        }
    }
}

// Ensure dynamic_render.js is copied too (it's essential)
if (fs.existsSync(path.join(dir, 'dynamic_render.js'))) {
    fs.copyFileSync(path.join(dir, 'dynamic_render.js'), path.join(dist, 'dynamic_render.js'));
}

console.log('Successfully prepared static files for Vercel deployment.');
