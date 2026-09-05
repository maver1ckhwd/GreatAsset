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

    if (fs.existsSync(srcPath)) {
      fs.copyFileSync(srcPath, destJpg);
      fs.copyFileSync(srcPath, destPng);
    }
  } catch (e) {
    // Ignore server build errors
  }
}
