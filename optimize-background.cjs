const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const inputImage = path.join(__dirname, "src", "assets", "dusty.jpg");
const outputDir = path.join(__dirname, "public");

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Generate different sizes
const sizes = [
  { width: 1920, suffix: "" }, // Desktop
  { width: 640, suffix: "-mobile" }, // Mobile
];

async function optimizeImage() {
  try {
    for (const size of sizes) {
      await sharp(inputImage)
        .resize(size.width)
        .webp({ quality: 80 })
        .toFile(path.join(outputDir, `background1_dust${size.suffix}.webp`));

      console.log(
        `Created optimized image: background1_dust${size.suffix}.webp`
      );
    }
  } catch (error) {
    console.error("Error optimizing images:", error);
  }
}

optimizeImage();
