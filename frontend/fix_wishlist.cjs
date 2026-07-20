const fs = require('fs');

// Read index.html to extract modals and JS
const indexContent = fs.readFileSync('index.html', 'utf8');
const overlayIndex = indexContent.indexOf('<!-- OVERLAYS -->');
let footerEndIndex = indexContent.indexOf('</footer>');

// In case the structure differs
if (overlayIndex === -1) {
    console.error("Could not find overlays in index.html");
    process.exit(1);
}

const stuffToInject = indexContent.substring(overlayIndex);

['wishlist.html', 'menu.html'].forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    
    // Check if it already has overlays
    if (!content.includes('<!-- OVERLAYS -->')) {
        // Find where to inject (after footer)
        const footerIndex = content.indexOf('</footer>');
        if (footerIndex !== -1) {
            const beforeFooterEnd = content.substring(0, footerIndex + 9);
            // We append the stuff from index (which includes overlays and JS)
            // But we need to remove any old scripts at the bottom of wishlist.html first to avoid duplicates
            
            let finalContent = beforeFooterEnd + '\n' + stuffToInject;
            
            // Clean up: remove the old <script>function openCheckout()...</script> block that was there
            finalContent = finalContent.replace("<script>function openCheckout() { window.location.href = 'cart.html'; } function addToCart() { /* dummy */ }</script>", "");
            
            fs.writeFileSync(file, finalContent);
            console.log(`Injected modals and JS into ${file}`);
        }
    } else {
        console.log(`${file} already has overlays.`);
    }
});
