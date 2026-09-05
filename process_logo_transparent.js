const fs = require('fs');
const path = require('path');

const srcPath = 'C:/Users/sansk/.gemini/antigravity-ide/brain/5cfd865e-a6d9-427b-b74a-0216319cda30/media__1788611421894.jpg';
const publicDir = path.resolve(__dirname, './public');

if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

try {
  const sharp = require('sharp');
  sharp(srcPath)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true })
    .then(({ data, info }) => {
      const { width, height, channels } = info;
      // Loop over pixels and turn white/near-white pixels to transparent
      for (let i = 0; i < data.length; i += channels) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        
        // If pixel is white or near-white (luminance > 245)
        if (r > 240 && g > 240 && b > 240) {
          data[i + 3] = 0; // Alpha = 0 (Transparent)
        }
      }

      sharp(data, { raw: { width, height, channels } })
        .png()
        .trim() // Crop bounding box
        .toBuffer()
        .then((trimmedBuffer) => {
          fs.writeFileSync(path.join(publicDir, 'great_asset_logo_transparent.png'), trimmedBuffer);
          fs.writeFileSync(path.join(publicDir, 'great_asset_logo.png'), trimmedBuffer);
          console.log('[Logo Processor] Successfully created transparent trimmed logo PNG!');
        })
        .catch((err) => console.error('Error trimming transparent logo:', err));
    })
    .catch((err) => console.error('Sharp raw buffer error:', err));
} catch (e) {
  console.error('Sharp error:', e);
}
