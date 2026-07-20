const fs = require('fs');

let html = fs.readFileSync('pastries.html', 'utf8');

// The script accidentally injected the literal string "\n" instead of actual newlines.
// We need to replace all literal '\n' sequences that are standing on their own.
// Let's just fix the CSS part specifically, or any literal "\n" strings.
html = html.replace(/\\n/g, '\n');

fs.writeFileSync('pastries.html', html);
console.log('Fixed syntax error in pastries.html!');
