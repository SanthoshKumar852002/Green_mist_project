import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const imagesDir = path.join(__dirname, 'public', 'images');

// Image optimization settings based on usage
const optimizationConfig = {
    // Hero images - larger but still optimized for LCP
    hero: {
        width: 1200,
        quality: 75,
        enhance: true
    },
    // Feature grid images - medium size
    feature: {
        width: 800,
        quality: 70,
        enhance: true
    },
    // Logo - tiny
    logo: {
        width: 150,
        quality: 85,
        enhance: false
    },
    // Favicon - very small
    favicon: {
        width: 64,
        quality: 90,
        enhance: false
    },
    // Other images - default
    default: {
        width: 1000,
        quality: 75,
        enhance: true
    }
};

// Categorize images
function getImageConfig(filename) {
    if (filename.includes('hero_banner') || filename.includes('hero_slider')) {
        return optimizationConfig.hero;
    }
    if (filename.includes('logo')) {
        return optimizationConfig.logo;
    }
    if (filename.includes('favicon')) {
        return optimizationConfig.favicon;
    }
    if (filename.match(/crop_|water_|pest_|plant_|land_|seed_/)) {
        return optimizationConfig.feature;
    }
    return optimizationConfig.default;
}

async function optimizeImage(inputPath, outputPath, config) {
    try {
        const metadata = await sharp(inputPath).metadata();
        const isPortrait = metadata.height > metadata.width;
        
        let pipeline = sharp(inputPath);

        // Apply light enhancement (sharpening + contrast boost)
        if (config.enhance) {
            pipeline = pipeline
                .sharpen({ sigma: 0.5, flat: 1, jagged: 2 })
                .modulate({
                    brightness: 1.05,
                    saturation: 1.1
                });
        }

        // Resize maintaining aspect ratio
        const resizeOptions = {
            width: config.width,
            height: isPortrait ? Math.round(config.width * 1.5) : undefined,
            fit: 'inside',
            withoutEnlargement: true
        };

        pipeline = pipeline.resize(resizeOptions);

        // Convert to WebP with quality settings
        const ext = path.extname(inputPath).toLowerCase();
        if (ext === '.png' || ext === '.jpg' || ext === '.jpeg') {
            await pipeline
                .webp({ 
                    quality: config.quality,
                    effort: 6 // Higher effort = better compression
                })
                .toFile(outputPath);
        } else if (ext === '.webp') {
            // Re-optimize existing WebP
            await pipeline
                .webp({ 
                    quality: config.quality,
                    effort: 6
                })
                .toFile(outputPath);
        } else {
            console.log(`Skipping ${path.basename(inputPath)} - unsupported format`);
            return null;
        }

        const originalSize = fs.statSync(inputPath).size;
        const optimizedSize = fs.statSync(outputPath).size;
        const savings = ((originalSize - optimizedSize) / originalSize * 100).toFixed(1);

        return {
            filename: path.basename(inputPath),
            original: (originalSize / 1024).toFixed(1) + ' KB',
            optimized: (optimizedSize / 1024).toFixed(1) + ' KB',
            savings: savings + '%'
        };
    } catch (error) {
        console.error(`Error optimizing ${path.basename(inputPath)}:`, error.message);
        return null;
    }
}

async function optimizeAll() {
    console.log('🚀 Starting image optimization...\n');
    
    const files = fs.readdirSync(imagesDir);
    const imageFiles = files.filter(f => 
        /\.(jpg|jpeg|png|webp)$/i.test(f) && !f.includes('.optimized.')
    );

    if (imageFiles.length === 0) {
        console.log('No images found to optimize.');
        return;
    }

    const results = [];
    
    for (const file of imageFiles) {
        const inputPath = path.join(imagesDir, file);
        const ext = path.extname(file);
        const baseName = path.basename(file, ext);
        const config = getImageConfig(file);
        
        // Create optimized version (keep original, create .optimized.webp)
        const outputPath = path.join(imagesDir, `${baseName}.optimized.webp`);
        
        console.log(`Processing: ${file}...`);
        const result = await optimizeImage(inputPath, outputPath, config);
        
        if (result) {
            results.push(result);
            console.log(`  ✓ ${result.original} → ${result.optimized} (${result.savings} saved)\n`);
        }
    }

    // Summary
    console.log('\n📊 Optimization Summary:');
    console.log('─'.repeat(60));
    results.forEach(r => {
        console.log(`${r.filename.padEnd(40)} ${r.original.padStart(10)} → ${r.optimized.padStart(10)} (${r.savings})`);
    });
    
    const totalOriginal = results.reduce((sum, r) => {
        const size = parseFloat(r.original);
        return sum + size;
    }, 0);
    
    const totalOptimized = results.reduce((sum, r) => {
        const size = parseFloat(r.optimized);
        return sum + size;
    }, 0);
    
    const totalSavings = ((totalOriginal - totalOptimized) / totalOriginal * 100).toFixed(1);
    
    console.log('─'.repeat(60));
    console.log(`Total: ${totalOriginal.toFixed(1)} KB → ${totalOptimized.toFixed(1)} KB (${totalSavings}% saved)`);
    console.log('\n✅ Optimization complete!');
    console.log('\n💡 Next steps:');
    console.log('   1. Review the .optimized.webp files');
    console.log('   2. Update your component imports to use .optimized.webp');
    console.log('   3. Or replace originals if satisfied with quality');
}

optimizeAll().catch(console.error);
