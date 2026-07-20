const fs = require('fs');
const path = require('path');

const dir = __dirname;
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

const oldDbRegex = /const productsDB = \[[\s\S]*?\];/;
const newDb = `const productsDB = [
        { name: 'Chocolate Truffle', category: 'cake', price: 499, img: 'cake_category_1777660447849.png' },
        { name: 'Red Velvet Cake', category: 'cake', price: 599, img: 'recommended_cake.png' },
        { name: 'Mango Cake', category: 'cake', price: 399, img: 'cake_category_1777660447849.png' },
        { name: 'Black Forest', category: 'cake', price: 449, img: 'recommended_cake.png' },
        { name: 'Chocolate Donut', category: 'donut', price: 149, img: 'donut_category_1777660467553.png' },
        { name: 'Strawberry Donut', category: 'donut', price: 129, img: 'recommended_donut.png' },
        { name: 'Glazed Donut', category: 'donut', price: 119, img: 'donut_category_1777660467553.png' },
        { name: 'Caramel Donut', category: 'donut', price: 169, img: 'donut_category_1777660467553.png' },
        { name: 'Almond Croissant', category: 'pastry', price: 189, img: 'pastry_category_1777660510169.png' },
        { name: 'Pain au Chocolat', category: 'pastry', price: 199, img: 'recommended_pastry.png' },
        { name: 'Berry Cheesecake', category: 'pastry', price: 249, img: 'recommended_cake.png' },
        { name: 'Chocolate Mousse', category: 'pastry', price: 199, img: 'pastry_category_1777660510169.png' },
        { name: 'Vanilla Bean Cone', category: 'ice cream', price: 199, img: 'icecream_category_1777660485890.png' },
        { name: 'Mango Gelato', category: 'ice cream', price: 229, img: 'recommended_icecream.png' },
        { name: 'Strawberry Delicious', category: 'ice cream', price: 199, img: 'recommended_icecream.png' },
        { name: 'Iced Coffee Splash', category: 'ice cream', price: 249, img: 'icecream_category_1777660485890.png' },
        { name: 'Cupcake Hamper', category: 'gifting', price: 899, img: 'cupcake_deal_1777660591014.png' },
        { name: 'Premium Macarons', category: 'gifting', price: 999, img: 'macaron_deal_1777660573385.png' },
        { name: 'Pistachio Macarons', category: 'gifting', price: 399, img: 'recommended_macaron.png' },
        { name: 'Berry Macarons', category: 'gifting', price: 399, img: 'macaron_deal_1777660573385.png' },
        { name: 'Vanilla Almond', category: 'ice cream', price: 199, img: 'icecream_category_1777660485890.png' },
        { name: 'Tropical Mango', category: 'ice cream', price: 229, img: 'recommended_icecream.png' },
        { name: 'Berry Burst', category: 'ice cream', price: 199, img: 'recommended_icecream.png' },
        { name: 'Aura Espresso Pint', category: 'ice cream', price: 249, img: 'icecream_category_1777660485890.png' },
        { name: 'Sweetest Delights Ice Cream', category: 'ice cream', price: 349, img: 'recommended_icecream.png' }
    ];`;

let modifiedCount = 0;
files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    if (oldDbRegex.test(content)) {
        content = content.replace(oldDbRegex, newDb);
        fs.writeFileSync(file, content, 'utf8');
        modifiedCount++;
        console.log("Expanded search DB in " + file);
    }
});

console.log("Done! Modified " + modifiedCount + " files.");
