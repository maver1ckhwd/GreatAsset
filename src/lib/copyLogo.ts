import fs from "fs";
import path from "path";

if (typeof window === "undefined") {
  try {
    const srcPath = "C:/Users/sansk/.gemini/antigravity-ide/brain/5cfd865e-a6d9-427b-b74a-0216319cda30/media__1788611421894.jpg";
    const destDir = path.resolve(process.cwd(), "public");
    if (!fs.existsSync(destDir)) {
      fs.mkdirSync(destDir, { recursive: true });
    }
    const destJpg = path.join(destDir, "great_asset_logo.jpg");
    const destPng = path.join(destDir, "great_asset_logo.png");
    const destTransparent = path.join(destDir, "great_asset_logo_transparent.png");

    if (fs.existsSync(srcPath)) {
      fs.copyFileSync(srcPath, destJpg);
      
      try {
        const sharp = require("sharp");
        sharp(srcPath)
          .ensureAlpha()
          .raw()
          .toBuffer({ resolveWithObject: true })
          .then(({ data, info }: { data: Buffer; info: { width: number; height: number; channels: number } }) => {
            const { width, height, channels } = info;
            for (let i = 0; i < data.length; i += channels) {
              const r = data[i];
              const g = data[i + 1];
              const b = data[i + 2];
              if (r > 240 && g > 240 && b > 240) {
                data[i + 3] = 0; // Alpha transparent
              }
            }

            sharp(data, { raw: { width, height, channels } })
              .png()
              .trim()
              .toBuffer()
              .then((trimmedBuffer: Buffer) => {
                fs.writeFileSync(destTransparent, trimmedBuffer);
                fs.writeFileSync(destPng, trimmedBuffer);
                console.log("[Logo Processor] Saved transparent logo PNG to public/great_asset_logo.png");
              })
              .catch(() => {
                fs.copyFileSync(srcPath, destPng);
              });
          })
          .catch(() => {
            fs.copyFileSync(srcPath, destPng);
          });
      } catch {
        fs.copyFileSync(srcPath, destPng);
      }
    }
  } catch (e) {
    // Ignore server build errors
  }
}
