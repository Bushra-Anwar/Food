const fs = require('fs');
const indexHtml = fs.readFileSync('index.html', 'utf8');

// Extract Navbar
const navStart = indexHtml.indexOf('<nav class="navbar"');
const navEnd = indexHtml.indexOf('</nav>') + '</nav>'.length;
const navContent = indexHtml.substring(navStart, navEnd);

// Extract Script
const scriptStart = indexHtml.lastIndexOf('<script>');
const scriptEnd = indexHtml.lastIndexOf('</script>') + '</script>'.length;
const scriptContent = indexHtml.substring(scriptStart, scriptEnd);

const files = ['cakes.html', 'donuts.html', 'pastries.html', 'icecream.html', 'gifting.html'];
files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    
    // Replace Nav
    const fileNavStart = content.indexOf('<nav class="navbar"');
    const fileNavEnd = content.indexOf('</nav>') + '</nav>'.length;
    if (fileNavStart !== -1 && fileNavEnd !== -1) {
        content = content.substring(0, fileNavStart) + navContent + content.substring(fileNavEnd);
    }
    
    // Append script if not exists
    if (!content.includes('<script>')) {
        content = content.replace('</body>', '\n' + scriptContent + '\n</body>');
    }
    
    fs.writeFileSync(file, content);
    console.log('Updated ' + file);
});
