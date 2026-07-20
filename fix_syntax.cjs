const fs = require('fs');
const path = require('path');

const directories = [
    'c:\\Users\\boxoffice2\\Desktop\\Food\\',
    'c:\\Users\\boxoffice2\\Desktop\\Food\\frontend\\'
];

directories.forEach(dir => {
    if (!fs.existsSync(dir)) return;
    
    fs.readdirSync(dir).forEach(file => {
        if (file.endsWith('.html')) {
            const filepath = path.join(dir, file);
            let content = fs.readFileSync(filepath, 'utf8');
            
            // Fix literal backslash before backticks and template literals
            content = content.replace(/\\`/g, '`');
            content = content.replace(/\\\$/g, '$');
            
            fs.writeFileSync(filepath, content);
            console.log('Fixed syntax errors in ' + filepath);
        }
    });
});
