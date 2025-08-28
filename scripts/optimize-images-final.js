const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputDir = path.join(__dirname, '../public/images');
const outputDir = path.join(__dirname, '../public/images-final');

// Create output directory if it doesn't exist
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

async function optimizeImage(inputPath, outputPath) {
  try {
    const filename = path.basename(inputPath);
    const ext = path.extname(filename).toLowerCase();
    
    if (ext === '.jpeg' || ext === '.jpg') {
      // Optimize JPEG with maximum compression
      await sharp(inputPath)
        .jpeg({ 
          quality: 60, 
          progressive: true,
          mozjpeg: true
        })
        .resize(500, 350, { 
          fit: 'inside',
          withoutEnlargement: true 
        })
        .toFile(outputPath);
      
      console.log(`✓ ${filename} (JPEG optimized)`);
    } else {
      // Optimize PNG with maximum compression
      await sharp(inputPath)
        .png({ 
          quality: 50, 
          compressionLevel: 9,
          adaptiveFiltering: true,
          palette: true,
          colors: 128
        })
        .resize(500, 350, { 
          fit: 'inside',
          withoutEnlargement: true 
        })
        .toFile(outputPath);
      
      console.log(`✓ ${filename} (PNG optimized)`);
    }
    
    const inputStats = fs.statSync(inputPath);
    const outputStats = fs.statSync(outputPath);
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

  console.log(`Found ${imageFiles.length} images to optimize for maximum compression...\n`);

  for (const file of imageFiles) {
    const inputPath = path.join(inputDir, file);
    const outputPath = path.join(outputDir, file);
    await optimizeImage(inputPath, outputPath);
  }

  console.log('\n✅ Final image optimization complete!');
  console.log(`Optimized images saved to: ${outputDir}`);
  
  // Show total size comparison
  const originalSize = await getDirectorySize(inputDir);
  const optimizedSize = await getDirectorySize(outputDir);
  const totalReduction = ((originalSize - optimizedSize) / originalSize * 100).toFixed(1);
  
  console.log(`\n📊 Total size reduction:`);
  console.log(`Original: ${(originalSize / 1024 / 1024).toFixed(2)}MB`);
  console.log(`Optimized: ${(optimizedSize / 1024 / 1024).toFixed(2)}MB`);
  console.log(`Reduction: ${totalReduction}%`);
  
  // Check if we're under 25MB limit
  const estimatedBuildSize = optimizedSize + (1024 * 1024); // Add ~1MB for other assets
  console.log(`\n🚀 Estimated total build size: ${(estimatedBuildSize / 1024 / 1024).toFixed(2)}MB`);
  
  if (estimatedBuildSize < 25 * 1024 * 1024) {
    console.log(`✅ Well under Cloudflare's 25MB limit!`);
  } else {
    console.log(`⚠️  Still above 25MB limit. Consider removing unused images.`);
  }
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
