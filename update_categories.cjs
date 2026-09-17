const fs = require('fs');

let content = fs.readFileSync('src/data/mockData.ts', 'utf8');

const newCategories = `export const categories: Category[] = [
  { id: 'c1', name: 'Premium T-shirts', image: 'https://res.cloudinary.com/dv16a8l1l/image/upload/v1789449448/ChatGPT_Image_Sep_15_2026_10_42_49_AM_ah61ri.png' },
  { id: 'c2', name: 'Oversized T-shirts', image: 'https://res.cloudinary.com/dv16a8l1l/image/upload/v1789449444/ChatGPT_Image_Sep_15_2026_10_47_02_AM_lkv0jq.png' },
  { id: 'c3', name: 'Regular-fit T-shirts', image: 'https://res.cloudinary.com/dv16a8l1l/image/upload/v1789449445/ChatGPT_Image_Sep_15_2026_10_33_29_AM_nguppt.png' },
  { id: 'c4', name: 'Graphic T-shirts', image: 'https://res.cloudinary.com/dv16a8l1l/image/upload/v1789449440/ChatGPT_Image_Sep_15_2026_10_46_56_AM_nty70m.png' },
  { id: 'c5', name: 'Printed T-shirts', image: 'https://res.cloudinary.com/dv16a8l1l/image/upload/v1789449444/ChatGPT_Image_Sep_15_2026_10_46_59_AM_u9lvnt.png' },
  { id: 'c6', name: 'Minimal/basic T-shirts', image: 'https://res.cloudinary.com/dv16a8l1l/image/upload/v1789479550/ChatGPT_Image_Sep_15_2026_07_06_29_PM_grqhin.png' },
  { id: 'c7', name: "Men's T-shirts", image: 'https://res.cloudinary.com/dv16a8l1l/image/upload/v1789449447/ChatGPT_Image_Sep_15_2026_10_46_11_AM_menlkl.png' },
  { id: 'c8', name: 'Unisex T-shirts', image: 'https://res.cloudinary.com/dv16a8l1l/image/upload/v1789479558/ChatGPT_Image_Sep_15_2026_07_06_26_PM_r6upmw.png' },
];`;

content = content.replace(/export const categories: Category\[\] = \[[\s\S]*?\];/, newCategories);

fs.writeFileSync('src/data/mockData.ts', content);
console.log('Categories updated in mockData.ts');
