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
    
    // Update .dark block variables
    updateVariable("\\.dark", "--primary", colors.primaryBrandBlue.dark);
    updateVariable("\\.dark", "--accent", colors.primaryBrandBlue.dark);
    updateVariable("\\.dark", "--neutral-core", colors.neutralCoreSlate.dark);
    updateVariable("\\.dark", "--foreground", colors.neutralCoreSlate.dark);
    updateVariable("\\.dark", "--supporting-subtle", colors.supportingMetallicGray.dark);
    updateVariable("\\.dark", "--border", colors.supportingMetallicGray.dark);

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
    const artifactDir = "C:/Users/sansk/.gemini/antigravity-ide/brain/769f1836-cb13-4e13-b5e4-e144a6a6b6e6";
    const logoMap = [
      ["media__1785591124292.png", "captain_sales.png"],
      ["media__1785591177956.png", "healic.png"],
      ["media__1785591234084.png", "designwell_pdc.png"],
      ["media__1785591262622.png", "casa_derma.png"],
    ];

    logoMap.forEach(([srcFile, destFile]) => {
      const srcPath = path.join(artifactDir, srcFile);
      const destPath = path.resolve(__dirname, "./public", destFile);
      if (fs.existsSync(srcPath)) {
        fs.copyFileSync(srcPath, destPath);
        console.log(`[Logo Sync] Copied ${srcFile} to ${destFile}`);
      }
    });

    // Clean up any black border outlines on remaining logo files using sharp if available
    try {
      const sharp = require("sharp");
      const extraLogos = ["badili.png", "kp_architects.png", "centricity.png", "india_print_n_serve.png"];
      extraLogos.forEach(async (fileName) => {
        const filePath = path.resolve(__dirname, "./public", fileName);
        if (fs.existsSync(filePath)) {
          const buffer = fs.readFileSync(filePath);
          const meta = await sharp(buffer).metadata();
          if (meta.width && meta.height) {
            // Extract inner box to strip 3px border outline
            const trimmed = await sharp(buffer)
              .extract({
                left: Math.min(4, Math.floor(meta.width * 0.03)),
                top: Math.min(4, Math.floor(meta.height * 0.03)),
                width: meta.width - Math.min(8, Math.floor(meta.width * 0.06)),
                height: meta.height - Math.min(8, Math.floor(meta.height * 0.06))
              })
              .toBuffer();
            fs.writeFileSync(filePath, trimmed);
          }
        }
      });
    } catch (sharpErr) {
      console.log("[Sharp] Sharp not active or error:", sharpErr);
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

