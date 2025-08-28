const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputDir = path.join(__dirname, '../public/images');
const outputDir = path.join(__dirname, '../public/images-enhanced');

// Create output directory if it doesn't exist
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

async function enhanceImage(inputPath, outputPath) {
  try {
    const filename = path.basename(inputPath);
    const ext = path.extname(filename).toLowerCase();
    
    if (ext === '.jpeg' || ext === '.jpg') {
      // Enhance JPEG with maximum quality
      await sharp(inputPath)
        .jpeg({ 
          quality: 95, 
          progressive: true,
          mozjpeg: false, // Disable mozjpeg for better quality
          chromaSubsampling: '4:4:4' // Full color sampling
        })
        .resize(800, 600, { 
          fit: 'inside',
          withoutEnlargement: false, // Allow enlargement for better quality
          kernel: 'lanczos3' // High-quality resampling
        })
        .sharpen(1, 1, 2) // Enhance sharpness
        .toFile(outputPath);
      
      console.log(`✓ ${filename} (JPEG enhanced to maximum quality)`);
    } else {
      // Enhance PNG with maximum quality
      await sharp(inputPath)
        .png({ 
          quality: 100, 
          compressionLevel: 0, // No compression for maximum quality
          adaptiveFiltering: false,
          palette: false // Keep full color palette
        })
        .resize(800, 600, { 
          fit: 'inside',
          withoutEnlargement: false,
          kernel: 'lanczos3'
        })
        .sharpen(1, 1, 2)
        .toFile(outputPath);
      
      console.log(`✓ ${filename} (PNG enhanced to maximum quality)`);
    }
    
    const inputStats = fs.statSync(inputPath);
    const outputStats = fs.statSync(outputPath);
    const change = ((outputStats.size - inputStats.size) / inputStats.size * 100).toFixed(1);
    
    console.log(`  ${(inputStats.size / 1024).toFixed(1)}KB → ${(outputStats.size / 1024).toFixed(1)}KB (${change > 0 ? '+' : ''}${change}% change)`);
  } catch (error) {
    console.error(`✗ Error enhancing ${inputPath}:`, error.message);
  }
}

async function enhanceAllImages() {
  const files = fs.readdirSync(inputDir);
  const imageFiles = files.filter(file => 
    file.toLowerCase().endsWith('.png') || 
    file.toLowerCase().endsWith('.jpg') || 
    file.toLowerCase().endsWith('.jpeg')
  );

  console.log(`Found ${imageFiles.length} images to enhance to maximum quality...\n`);

  for (const file of imageFiles) {
    const inputPath = path.join(inputDir, file);
    const outputPath = path.join(outputDir, file);
    await enhanceImage(inputPath, outputPath);
  }

  console.log('\n✅ Maximum quality enhancement complete!');
  console.log(`Enhanced images saved to: ${outputDir}`);
  
  // Show total size comparison
  const originalSize = await getDirectorySize(inputDir);
  const enhancedSize = await getDirectorySize(outputDir);
  const totalChange = ((enhancedSize - originalSize) / originalSize * 100).toFixed(1);
  
  console.log(`\n📊 Quality enhancement results:`);
  console.log(`Original: ${(originalSize / 1024 / 1024).toFixed(2)}MB`);
  console.log(`Enhanced: ${(enhancedSize / 1024 / 1024).toFixed(2)}MB`);
  console.log(`Change: ${totalChange > 0 ? '+' : ''}${totalChange}%`);
  
  // Check if we're under 25MB limit
  const estimatedBuildSize = enhancedSize + (1024 * 1024); // Add ~1MB for other assets
  console.log(`\n🚀 Estimated total build size: ${(estimatedBuildSize / 1024 / 1024).toFixed(2)}MB`);
  
  if (estimatedBuildSize < 25 * 1024 * 1024) {
    console.log(`✅ Still under Cloudflare's 25MB limit!`);
  } else {
    console.log(`⚠️  Above 25MB limit. Consider selective enhancement.`);
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

enhanceAllImages().catch(console.error);
