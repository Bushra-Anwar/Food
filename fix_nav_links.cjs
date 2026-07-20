const fs = require('fs');

const files = ['index.html', 'cakes.html', 'donuts.html', 'pastries.html', 'icecream.html', 'gifting.html'];

files.forEach(file => {
    if (fs.existsSync(file)) {
        let content = fs.readFileSync(file, 'utf8');
        
        // Fix nav-logo to point to home
        content = content.replace(
            '<div class="nav-logo">SWEET TREATS</div>',
            '<div class="nav-logo" onclick="window.location.href=\'index.html\'" style="cursor: pointer;">SWEET TREATS</div>'
        );
        
        // If nav-links doesn't have Home, add it
        if (!content.includes('<a href="index.html">Home</a>')) {
            content = content.replace(
                '<ul class="nav-links">',
                '<ul class="nav-links">\n            <li><a href="index.html" style="font-weight:bold; color:var(--clr-text-main);">Home</a></li>'
            );
        }
        
        // Fix Ice Cream link
        content = content.replace(
            '<a href="#">Ice Cream</a>',
            '<a href="icecream.html">Ice Cream</a>'
        );
        
        // Fix Gifting link
        content = content.replace(
            '<a href="#">Gifting</a>',
            '<a href="gifting.html">Gifting</a>'
        );
        
        // Also fix the banner links inside Gifting megamenu just in case
        content = content.replace(
            '<button>Shop Ice Creams</button>',
            '<button onclick="window.location.href=\'icecream.html\'">Shop Ice Creams</button>'
        );
        content = content.replace(
            '<button>View Gifts</button>',
            '<button onclick="window.location.href=\'gifting.html\'">View Gifts</button>'
        );
        
        fs.writeFileSync(file, content);
        console.log('Fixed navigation in ' + file);
    }
});
