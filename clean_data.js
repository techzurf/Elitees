const fs = require('fs');

let content = fs.readFileSync('src/data/mockData.ts', 'utf8');

// The products array starts at "export const products: Product[] = ["
// and ends at "];" before "export const reels:"
const productsStartIndex = content.indexOf('export const products: Product[] = [');
const productsEndIndex = content.indexOf('];\n\nexport const reels:');

const beforeProducts = content.substring(0, productsStartIndex);
const afterProducts = content.substring(productsEndIndex + 2); // keep the \n\nexport const reels

const productsStr = content.substring(productsStartIndex + 'export const products: Product[] = ['.length, productsEndIndex);

// Split by "  }," or "  }"
const productBlocks = productsStr.split(/  \},?\n/).filter(p => p.trim().length > 0);

let newProducts = [];
let idCounter = 1;

for (let block of productBlocks) {
    if (block.includes('res.cloudinary.com')) {
        let cleanBlock = block.trim();
        if (cleanBlock.startsWith('{')) cleanBlock = cleanBlock.substring(1).trim();
        
        // Replace id: 'p...', with a clean unique id
        cleanBlock = cleanBlock.replace(/id:\s*'p\d+',/, `id: 'p${idCounter}',`);
        
        newProducts.push(`  {\n    ${cleanBlock}\n  }`);
        idCounter++;
    }
}

const finalProductsStr = `export const products: Product[] = [\n${newProducts.join(',\n')}\n];`;

const newContent = beforeProducts + finalProductsStr + afterProducts;
fs.writeFileSync('src/data/mockData.ts', newContent);
console.log('Cleaned mockData.ts');
