const fs = require('fs');
const path = require('path');

const directoryPath = __dirname;
const files = fs.readdirSync(directoryPath).filter(f => f.endsWith('.html'));

const replacements = {
    'БЕНТО-ТОРТЫ<br>С ДУШОЙ': 'SOULFUL<br>BENTO CAKES',
    'оформить заказ': 'Place Order',
    '• МОИ РАБОТЫ •': '• OUR CREATIONS •',
    '• НАЧИНКИ •': '• FLAVORS •',
    'КРАСНЫЙ БАРХАТ': 'RED VELVET',
    'нежный бисквит с творожной прослойкой<br>• клубника • вишня': 'tender sponge with cream cheese layer<br>• strawberry • cherry',
    'СНИКЕРС': 'SNICKERS',
    'шоколадный торт с арахисовой прослойкой<br>• арахис • карамель': 'chocolate cake with peanut layer<br>• peanuts • caramel',
    'БЕНТО S': 'BENTO S',
    '300-500 г / <b>1200 рублей</b>': '300-500 g / <b>₹1200</b>',
    'что входит: бенто-торт, упаковка, лента, ложечка, свечка': 'Includes: bento cake, packaging, ribbon, spoon, candle',
    'Тiрамiсу!': 'Tiramisu!',
    'Тiрамiсу': 'Tiramisu',
    '$': '₹'
};

files.forEach(file => {
    const filePath = path.join(directoryPath, file);
    let content = fs.readFileSync(filePath, 'utf8');
    let originalContent = content;

    // Handle string replacements
    for (const [rus, eng] of Object.entries(replacements)) {
        if (rus === '$') {
            // Replace literal $ avoiding replacing inside scripts if possible, but safe enough since no jquery
            content = content.replace(/\$(?=\d+)/g, '₹');
        } else {
            // Global replace for exact strings
            const regex = new RegExp(rus, 'g');
            content = content.replace(regex, eng);
        }
    }

    if (content !== originalContent) {
        fs.writeFileSync(filePath, content);
        console.log(`Translated content in ${file}`);
    }
});
