const fs = require('fs');
const path = require('path');
const dir = '.';

fs.readdirSync(dir).forEach(file => {
    if (file.endsWith('.html') && file !== 'admin_panel.html') {
        let content = fs.readFileSync(file, 'utf8');
        if (!content.includes('dynamic_render.js')) {
            content = content.replace('</body>', '<script src="dynamic_render.js"></script>\n</body>');
            fs.writeFileSync(file, content);
            console.log('Injected into ' + file);
        }
    }
});
