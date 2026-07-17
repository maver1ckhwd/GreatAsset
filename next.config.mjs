import fs from "fs";
import path from "path";

// File Copy Utility Map
const filesToCopy = [
  {
    src: "C:\\Users\\MSI\\.gemini\\antigravity-ide\\brain\\d6b72e94-9a01-42dd-ac80-be479615cacf\\media__1784266712284.png",
    dest: "logo_sheet.png"
  },
  {
    src: "C:\\Users\\MSI\\.gemini\\antigravity-ide\\brain\\d6b72e94-9a01-42dd-ac80-be479615cacf\\media__1784269260174.png",
    dest: "healic.png"
  },
  {
    src: "C:\\Users\\MSI\\.gemini\\antigravity-ide\\brain\\d6b72e94-9a01-42dd-ac80-be479615cacf\\media__1784269276223.png",
    dest: "captain_sales.png"
  },
  {
    src: "C:\\Users\\MSI\\.gemini\\antigravity-ide\\brain\\d6b72e94-9a01-42dd-ac80-be479615cacf\\media__1784269291660.png",
    dest: "designwell_pdc.png"
  },
  {
    src: "C:\\Users\\MSI\\.gemini\\antigravity-ide\\brain\\d6b72e94-9a01-42dd-ac80-be479615cacf\\media__1784269304868.png",
    dest: "casa_derma.png"
  },
  {
    src: "C:\\Users\\MSI\\.gemini\\antigravity-ide\\brain\\d6b72e94-9a01-42dd-ac80-be479615cacf\\media__1784269319428.png",
    dest: "badili.png"
  },
  {
    src: "C:\\Users\\MSI\\.gemini\\antigravity-ide\\brain\\d6b72e94-9a01-42dd-ac80-be479615cacf\\media__1784269941437.png",
    dest: "kp_architects.png"
  },
  {
    src: "C:\\Users\\MSI\\.gemini\\antigravity-ide\\brain\\d6b72e94-9a01-42dd-ac80-be479615cacf\\media__1784269955066.png",
    dest: "centricity.png"
  },
  {
    src: "C:\\Users\\MSI\\.gemini\\antigravity-ide\\brain\\d6b72e94-9a01-42dd-ac80-be479615cacf\\media__1784269974962.png",
    dest: "india_print_n_serve.png"
  }
];

const destDir = path.join(process.cwd(), "public");
if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

filesToCopy.forEach(({ src, dest }) => {
  const destPath = path.join(destDir, dest);
  try {
    if (fs.existsSync(src)) {
      fs.copyFileSync(src, destPath);
      console.log(`[Setup] Copied brand asset: ${dest}`);
    }
  } catch (e) {
    console.error(`[Setup] Failed to copy asset ${dest}:`, e);
  }
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
};

export default nextConfig;
