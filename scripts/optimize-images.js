const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const imagesDir = path.join(__dirname, '../public/images');
const outputDir = path.join(__dirname, '../public/images-optimized');

// Create output directory if it doesn't exist
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

async function optimizeImage(inputPath, outputPath) {
  try {
    await sharp(inputPath)
      .resize(800, 1200, { 
        fit: 'inside',
        withoutEnlargement: true 
      })
      .png({ 
        quality: 80,
        compressionLevel: 9,
        progressive: true
      })
      .toFile(outputPath);
    
    const originalSize = fs.statSync(inputPath).size;
    const optimizedSize = fs.statSync(outputPath).size;
    const reduction = ((originalSize - optimizedSize) / originalSize * 100).toFixed(1);
    
    console.log(`${path.basename(inputPath)}: ${(originalSize/1024).toFixed(1)}KB → ${(optimizedSize/1024).toFixed(1)}KB (${reduction}% reduction)`);
    
    return { originalSize, optimizedSize, reduction };
  } catch (error) {
    console.error(`Error optimizing ${inputPath}:`, error);
    return null;
  }
}

async function optimizeAllImages() {
  const files = fs.readdirSync(imagesDir);
  const imageFiles = files.filter(file => 
    /\.(png|jpg|jpeg|webp)$/i.test(file)
  );
  
  console.log(`Found ${imageFiles.length} images to optimize...\n`);
  
  let totalOriginalSize = 0;
  let totalOptimizedSize = 0;
  
  for (const file of imageFiles) {
    const inputPath = path.join(imagesDir, file);
    const outputPath = path.join(outputDir, file.replace(/\.(png|jpg|jpeg)$/i, '.png'));
    
    const result = await optimizeImage(inputPath, outputPath);
    if (result) {
      totalOriginalSize += result.originalSize;
      totalOptimizedSize += result.optimizedSize;
    }
  }
  
  const totalReduction = ((totalOriginalSize - totalOptimizedSize) / totalOriginalSize * 100).toFixed(1);
  console.log(`\nTotal optimization: ${(totalOriginalSize/1024/1024).toFixed(2)}MB → ${(totalOptimizedSize/1024/1024).toFixed(2)}MB (${totalReduction}% reduction)`);
  
  // Replace original images with optimized ones
  console.log('\nReplacing original images with optimized versions...');
  for (const file of imageFiles) {
    const originalPath = path.join(imagesDir, file);
    const optimizedPath = path.join(outputDir, file.replace(/\.(png|jpg|jpeg)$/i, '.png'));
    
    if (fs.existsSync(optimizedPath)) {
      fs.copyFileSync(optimizedPath, originalPath);
    }
  }
  
  // Clean up temporary directory
  fs.rmSync(outputDir, { recursive: true, force: true });
  console.log('Optimization complete!');
}

optimizeAllImages().catch(console.error);
