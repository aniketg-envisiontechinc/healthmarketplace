const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const ICON_SIZES = [72, 96, 128, 144, 152, 192, 384, 512];
const SPLASH_SIZES = [
  { width: 640, height: 1136 },
  { width: 750, height: 1334 },
  { width: 828, height: 1792 },
  { width: 1125, height: 2436 },
  { width: 1242, height: 2208 },
  { width: 1242, height: 2688 },
  { width: 1536, height: 2048 },
  { width: 1668, height: 2224 },
  { width: 1668, height: 2388 },
  { width: 2048, height: 2732 },
];

async function generateIcons() {
  // Create icons directory if it doesn't exist
  const iconsDir = path.join(process.cwd(), "public", "icons");
  if (!fs.existsSync(iconsDir)) {
    fs.mkdirSync(iconsDir, { recursive: true });
  }

  // Generate icons
  for (const size of ICON_SIZES) {
    await sharp(path.join(process.cwd(), "public", "logo.png"))
      .resize(size, size)
      .toFile(path.join(iconsDir, `icon-${size}x${size}.png`));
  }

  // Generate splash screens
  for (const size of SPLASH_SIZES) {
    await sharp(path.join(process.cwd(), "public", "logo.png"))
      .resize(size.width, size.height)
      .toFile(path.join(iconsDir, `splash-${size.width}x${size.height}.png`));
  }

  console.log("Icons and splash screens generated successfully!");
}

generateIcons().catch(console.error);
