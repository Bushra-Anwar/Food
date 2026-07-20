const fs = require('fs');
const path = require('path');

const directoryPath = __dirname;
const files = fs.readdirSync(directoryPath).filter(f => f.endsWith('.html'));

const string1 = "document.querySelector('.fa-user').parentElement.onclick = () => showToast('Login Feature coming soon!', 'error');";
const string2 = "document.querySelector('.fa-heart').parentElement.onclick = () => showToast('Added to Wishlist!');";

files.forEach(file => {
    const filePath = path.join(directoryPath, file);
    let content = fs.readFileSync(filePath, 'utf8');
    let changed = false;

    if (content.includes(string1)) {
        content = content.replace(string1, "// Removed legacy Login override");
        changed = true;
    }
    
    if (content.includes(string2)) {
        content = content.replace(string2, "// Removed legacy Wishlist override");
        changed = true;
    }

    if (changed) {
        fs.writeFileSync(filePath, content);
        console.log(`Fixed overrides in ${file}`);
    }
});
