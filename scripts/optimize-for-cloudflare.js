const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputDir = path.join(__dirname, '../public/images');
const outputDir = path.join(__dirname, '../public/images-cloudflare');

// Create output directory if it doesn't exist
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

async function optimizeForCloudflare(inputPath, outputPath) {
  try {
    const filename = path.basename(inputPath);
    const ext = path.extname(filename).toLowerCase();
    
    if (ext === '.jpeg' || ext === '.jpg') {
      // Optimize JPEG for high quality but reasonable size
      await sharp(inputPath)
        .jpeg({ 
          quality: 85, 
          progressive: true,
          mozjpeg: true, // Enable mozjpeg for better compression
          chromaSubsampling: '4:2:0' // Good balance of quality and size
        })
        .resize(600, 450, { 
          fit: 'inside',
          withoutEnlargement: true,
          kernel: 'lanczos3' // High-quality resampling
        })
        .sharpen(0.5, 0.5, 1) // Light sharpening
        .toFile(outputPath);
      
      console.log(`✓ ${filename} (JPEG optimized for Cloudflare)`);
    } else {
      // Optimize PNG for high quality but reasonable size
      await sharp(inputPath)
        .png({ 
          quality: 90, 
          compressionLevel: 6, // Moderate compression
          adaptiveFiltering: true,
          palette: false // Keep full color palette
        })
        .resize(600, 450, { 
          fit: 'inside',
          withoutEnlargement: true,
          kernel: 'lanczos3'
        })
        .sharpen(0.5, 0.5, 1)
        .toFile(outputPath);
      
      console.log(`✓ ${filename} (PNG optimized for Cloudflare)`);
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

  console.log(`Found ${imageFiles.length} images to optimize for Cloudflare...\n`);

  for (const file of imageFiles) {
    const inputPath = path.join(inputDir, file);
    const outputPath = path.join(outputDir, file);
    await optimizeForCloudflare(inputPath, outputPath);
  }

  console.log('\n✅ Cloudflare optimization complete!');
  console.log(`Optimized images saved to: ${outputDir}`);
  
  // Show total size comparison
  const originalSize = await getDirectorySize(inputDir);
  const optimizedSize = await getDirectorySize(outputDir);
  const totalReduction = ((originalSize - optimizedSize) / originalSize * 100).toFixed(1);
  
  console.log(`\n📊 Cloudflare optimization results:`);
  console.log(`Original: ${(originalSize / 1024 / 1024).toFixed(2)}MB`);
  console.log(`Optimized: ${(optimizedSize / 1024 / 1024).toFixed(2)}MB`);
  console.log(`Reduction: ${totalReduction}%`);
  
  // Check if we're under 15MB limit (safe buffer)
  const estimatedBuildSize = optimizedSize + (1024 * 1024); // Add ~1MB for other assets
  console.log(`\n🚀 Estimated total build size: ${(estimatedBuildSize / 1024 / 1024).toFixed(2)}MB`);
  
  if (estimatedBuildSize < 15 * 1024 * 1024) {
    console.log(`✅ Well under 15MB limit with safe buffer!`);
  } else if (estimatedBuildSize < 25 * 1024 * 1024) {
    console.log(`⚠️  Under 25MB limit but close. Consider further optimization.`);
  } else {
    console.log(`❌ Still above 25MB limit. Need more aggressive optimization.`);
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
