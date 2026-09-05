const fs = require("fs");
const path = require("path");

function getBrandColorsFromLogo() {
  const defaultColors = {
    primaryBrandBlue: { light: "#4A90E2", dark: "#5D9CEC" },
    neutralCoreSlate: { light: "#1A2B49", dark: "#FFFFFF" },
    supportingMetallicGray: { light: "#94A3B8", dark: "#CBD5E1" }
  };
  
  try {
    const logoPath = path.resolve(__dirname, "./src/components/Logo.tsx");
    if (!fs.existsSync(logoPath)) return defaultColors;
    const content = fs.readFileSync(logoPath, "utf8");
    
    // Regex matching export const BRAND_LOGO_COLORS = { ... }
    const match = content.match(/export\s+const\s+BRAND_LOGO_COLORS\s*=\s*({[\s\S]*?});/);
    if (!match) return defaultColors;
    
    // Clean and parse the JS object string
    const objStr = match[1]
      .replace(/\/\/.*$/gm, "") // remove comments
      .replace(/'/g, '"') // replace single quotes
      .replace(/(\w+):/g, '"$1":') // add quotes to keys
      .replace(/,\s*}/g, "}") // trailing commas
      .replace(/,\s*]/g, "]"); // trailing commas
    
    return JSON.parse(objStr);
  } catch (e) {
    console.error("Failed to parse BRAND_LOGO_COLORS from Logo.tsx:", e);
    return defaultColors;
  }
}

const brandColors = getBrandColorsFromLogo();

// Sync colors to globals.css CSS variables
function syncGlobalsCss(colors) {
  try {
    const cssPath = path.resolve(__dirname, "./src/app/globals.css");
    if (!fs.existsSync(cssPath)) return;
    
    let content = fs.readFileSync(cssPath, "utf8");
    let changed = false;
    
    // Helper to replace or add a variable under a selector
    const updateVariable = (selector, variable, value) => {
      // Find the selector block
      const blockRegex = new RegExp(`(${selector}\\s*{[\\s\\S]*?})`);
      content = content.replace(blockRegex, (match, block) => {
        const varEscaped = variable.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
        const varRegex = new RegExp(`(${varEscaped}\\s*:\\s*)([^;]+)(;)`);
        
        let newBlock = block;
        if (varRegex.test(block)) {
          newBlock = block.replace(varRegex, (m, prefix, oldVal, suffix) => {
            if (oldVal.trim() !== value.trim()) {
              changed = true;
              return `${prefix}${value}${suffix}`;
            }
            return m;
          });
        }
        return newBlock;
      });
    };

    // Update :root block variables
    updateVariable(":root", "--primary", colors.primaryBrandBlue.light);
    updateVariable(":root", "--accent", colors.primaryBrandBlue.light);
    updateVariable(":root", "--neutral-core", colors.neutralCoreSlate.light);
    updateVariable(":root", "--foreground", colors.neutralCoreSlate.light);
    updateVariable(":root", "--supporting-subtle", colors.supportingMetallicGray.light);
    updateVariable(":root", "--border", colors.supportingMetallicGray.light);

    if (changed) {
      fs.writeFileSync(cssPath, content, "utf8");
      console.log("[Antigravity Sync] Successfully synced globals.css with Logo brand colors.");
    }
  } catch (e) {
    console.error("Failed to sync globals.css:", e);
  }
}

syncGlobalsCss(brandColors);

function copyAndCleanLogos() {
  try {
    const artifactDir = "C:/Users/sansk/.gemini/antigravity-ide/brain/5cfd865e-a6d9-427b-b74a-0216319cda30";
    const logoMap = [
      ["media__1785591124292.png", "captain_sales.png"],
      ["media__1785591177956.png", "healic.png"],
      ["media__1785591234084.png", "designwell_pdc.png"],
      ["media__1785591262622.png", "casa_derma.png"],
      ["media__1788611421894.jpg", "great_asset_logo.jpg"]
    ];

    logoMap.forEach(([srcFile, destFile]) => {
      const srcPath = path.join(artifactDir, srcFile);
      const destPath = path.resolve(__dirname, "./public", destFile);
      if (fs.existsSync(srcPath)) {
        fs.copyFileSync(srcPath, destPath);
        console.log(`[Logo Sync] Copied ${srcFile} to ${destFile}`);
      }
    });

    // Trim white border padding on great_asset_logo for maximum crispness
    try {
      const sharp = require("sharp");
      const mainLogoPath = path.resolve(__dirname, "./public/great_asset_logo.jpg");
      if (fs.existsSync(mainLogoPath)) {
        const buffer = fs.readFileSync(mainLogoPath);
        sharp(buffer)
          .trim()
          .toBuffer()
          .then((trimmed) => {
            fs.writeFileSync(path.resolve(__dirname, "./public/great_asset_logo.png"), trimmed);
            console.log("[Sharp] Successfully trimmed great_asset_logo.png");
          })
          .catch((err) => {
            console.log("[Sharp Trim Error]", err);
          });
      }
    } catch (sharpErr) {
      console.log("[Sharp] Sharp not active:", sharpErr);
    }
  } catch (err) {
    console.error("[Logo Sync Error]", err);
  }
}

copyAndCleanLogos();

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: brandColors.primaryBrandBlue.light,
          foreground: "#FFFFFF"
        },
        accent: {
          DEFAULT: brandColors.primaryBrandBlue.light,
          foreground: "#FFFFFF"
        },
        "neutral-core": {
          DEFAULT: brandColors.neutralCoreSlate.light,
          foreground: brandColors.neutralCoreSlate.dark
        },
        "supporting-subtle": {
          DEFAULT: brandColors.supportingMetallicGray.light,
          foreground: brandColors.supportingMetallicGray.dark
        }
      },
      fontFamily: {
        sans: ["var(--font-sans)", "Inter", "sans-serif"],
        display: ["var(--font-display)", "Outfit", "sans-serif"]
      }
    },
  },
  plugins: [],
};

