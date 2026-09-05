const fs = require('fs');
const path = require('path');

const src = 'C:/Users/sansk/.gemini/antigravity-ide/brain/5cfd865e-a6d9-427b-b74a-0216319cda30/media__1788611421894.jpg';
const dest = path.resolve(__dirname, './public/great_asset_logo_original.jpg');

fs.copyFileSync(src, dest);
console.log('Copied logo file to:', dest);

try {
  const sharp = require('sharp');
  sharp(dest)
    .trim()
    .toFile(path.resolve(__dirname, './public/great_asset_logo.png'))
    .then(() => console.log('Trimmed logo saved to public/great_asset_logo.png'))
    .catch((err) => {
      console.log('Sharp trim error:', err);
      // Fallback copy
      fs.copyFileSync(src, path.resolve(__dirname, './public/great_asset_logo.jpg'));
    });
} catch (e) {
  console.log('Sharp not installed, using direct copy');
  fs.copyFileSync(src, path.resolve(__dirname, './public/great_asset_logo.jpg'));
}
