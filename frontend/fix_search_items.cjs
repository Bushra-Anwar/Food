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
        { name: 'Berry Macarons', category: 'gifting', price: 399, img: 'macaron_deal_1777660573385.png' }
    ];`;

const oldFilterRegex = /const matches = typeof productsDB !== 'undefined' \? productsDB\.filter\(p => p\.name\.toLowerCase\(\)\.includes\(searchStr\)\) : \[\];/;
const newFilter = `const matches = typeof productsDB !== 'undefined' ? productsDB.filter(p => p.name.toLowerCase().includes(searchStr) || (p.category && p.category.toLowerCase().includes(searchStr))) : [];`;

const brokenImg1 = /strawberry_splash_1784385077502\.png/g;
const brokenImg2 = /iced_coffee_splash_1784385065567\.png/g;
const brokenImg3 = /blueberry_cheesecake_1784385282085\.png/g;
const brokenImg4 = /floating_macarons_1784385089856\.png/g;

let modifiedCount = 0;
files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let changed = false;
    
    if (oldDbRegex.test(content)) {
        content = content.replace(oldDbRegex, newDb);
        changed = true;
    }
    
    if (oldFilterRegex.test(content)) {
        content = content.replace(oldFilterRegex, newFilter);
        changed = true;
    }
    
    // Also update the Enter keypress logic to search category too
    const oldEnterFilterRegex = /const match = typeof productsDB !== 'undefined' \? productsDB\.find\(p => p\.name\.toLowerCase\(\)\.includes\(searchStr\)\) : null;/;
    const newEnterFilter = `const match = typeof productsDB !== 'undefined' ? productsDB.find(p => p.name.toLowerCase().includes(searchStr) || (p.category && p.category.toLowerCase().includes(searchStr))) : null;`;
    if (oldEnterFilterRegex.test(content)) {
        content = content.replace(oldEnterFilterRegex, newEnterFilter);
        changed = true;
    }
    
    // Fix broken images across the HTML body (like the modal)
    if (brokenImg1.test(content)) { content = content.replace(brokenImg1, 'recommended_icecream.png'); changed = true; }
    if (brokenImg2.test(content)) { content = content.replace(brokenImg2, 'icecream_category_1777660485890.png'); changed = true; }
    if (brokenImg3.test(content)) { content = content.replace(brokenImg3, 'recommended_cake.png'); changed = true; }
    if (brokenImg4.test(content)) { content = content.replace(brokenImg4, 'recommended_macaron.png'); changed = true; }
    
    if (changed) {
        fs.writeFileSync(file, content, 'utf8');
        modifiedCount++;
        console.log("Updated " + file);
    }
});

console.log("Done! Modified " + modifiedCount + " files.");
