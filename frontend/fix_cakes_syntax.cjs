const fs = require('fs');
let html = fs.readFileSync('cakes.html', 'utf8');
html = html.replace(/\\n/g, '\n');
fs.writeFileSync('cakes.html', html);
console.log('Fixed syntax error in cakes.html!');
