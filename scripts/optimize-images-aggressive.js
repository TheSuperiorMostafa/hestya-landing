const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputDir = path.join(__dirname, '../public/images');
const outputDir = path.join(__dirname, '../public/images-ultra-optimized');

// Create output directory if it doesn't exist
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

async function optimizeImage(inputPath, outputPath) {
  try {
    const filename = path.basename(inputPath);
    const ext = path.extname(filename).toLowerCase();
    
    // Convert JPEG to WebP for better compression
    if (ext === '.jpeg' || ext === '.jpg') {
      await sharp(inputPath)
        .webp({ quality: 70, effort: 6 })
        .resize(600, 400, { 
          fit: 'inside',
          withoutEnlargement: true 
        })
        .toFile(outputPath.replace(ext, '.webp'));
      
      console.log(`✓ ${filename} → ${path.basename(outputPath).replace(ext, '.webp')} (WebP conversion)`);
    } else {
      // Optimize PNG files more aggressively
      await sharp(inputPath)
        .png({ 
          quality: 60, 
          compressionLevel: 9,
          adaptiveFiltering: true,
          palette: true
        })
        .resize(600, 400, { 
          fit: 'inside',
          withoutEnlargement: true 
        })
        .toFile(outputPath);
      
      console.log(`✓ ${filename} (PNG optimized)`);
    }
    
    const inputStats = fs.statSync(inputPath);
    const outputFile = ext === '.jpeg' || ext === '.jpg' ? 
      outputPath.replace(ext, '.webp') : outputPath;
    const outputStats = fs.statSync(outputFile);
    const reduction = ((inputStats.size - outputStats.size) / inputStats.size * 100).toFixed(1);
    
    console.log(`  ${(inputStats.size / 1024).toFixed(1)}KB → ${(outputStats.size / 1024).toFixed(1)}KB (${reduction}% reduction)`);
  } catch (error) {
    console.error(`✗ Error optimizing ${inputPath}:`, error.message);
  }
}

async function optimizeAllImages() {
  const files = fs.readdirSync(inputDir);
  const imageFiles = files.filter(file => 
    file.toLowerCase().endsWith('.png') || 
    file.toLowerCase().endsWith('.jpg') || 
    file.toLowerCase().endsWith('.jpeg')
  );

  console.log(`Found ${imageFiles.length} images to optimize aggressively...\n`);

  for (const file of imageFiles) {
    const inputPath = path.join(inputDir, file);
    const outputPath = path.join(outputDir, file);
    await optimizeImage(inputPath, outputPath);
  }

  console.log('\n✅ Ultra-aggressive image optimization complete!');
  console.log(`Optimized images saved to: ${outputDir}`);
  
  // Show total size comparison
  const originalSize = await getDirectorySize(inputDir);
  const optimizedSize = await getDirectorySize(outputDir);
  const totalReduction = ((originalSize - optimizedSize) / originalSize * 100).toFixed(1);
  
  console.log(`\n📊 Total size reduction:`);
  console.log(`Original: ${(originalSize / 1024 / 1024).toFixed(2)}MB`);
  console.log(`Optimized: ${(optimizedSize / 1024 / 1024).toFixed(2)}MB`);
  console.log(`Reduction: ${totalReduction}%`);
}

async function getDirectorySize(dirPath) {
  const files = fs.readdirSync(dirPath);
  let totalSize = 0;
  
  for (const file of files) {
    const filePath = path.join(dirPath, file);
    const stats = fs.statSync(filePath);
    totalSize += stats.size;
  }
  
  return totalSize;
}

optimizeAllImages().catch(console.error);
