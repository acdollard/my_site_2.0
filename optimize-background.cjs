const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const inputImage = path.join(__dirname, "src", "assets", "dusty.jpg");
const outputDir = path.join(__dirname, "public");

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Generate different sizes for different devices
const sizes = [
  { width: 1920, suffix: "", quality: 80 }, // Desktop
  { width: 1024, suffix: "-tablet", quality: 80 }, // Tablet
  { width: 640, suffix: "-mobile", quality: 75 }, // Mobile
];

async function optimizeImage() {
  try {
    for (const size of sizes) {
      await sharp(inputImage)
        .resize(size.width, null, {
          withoutEnlargement: true,
          fit: "cover",
        })
        .webp({
          quality: size.quality,
          effort: 6,
          alphaQuality: 80,
        })
        .toFile(path.join(outputDir, `background1_dust${size.suffix}.webp`));

      console.log(
        `Created optimized image: background1_dust${size.suffix}.webp (${size.width}px)`
      );
    }
  } catch (error) {
    console.error("Error optimizing images:", error);
  }
}

optimizeImage();
