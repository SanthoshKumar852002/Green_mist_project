import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const inputDir = path.join(__dirname, '../public/images');

const files = fs.readdirSync(inputDir).filter(f => /\.(jpg|jpeg|png|webp)$/i.test(f));

console.log(`Found ${files.length} images to optimize...`);

for (const file of files) {
    const inputPath = path.join(inputDir, file);
    const outputName = file.replace(/\.[^.]+$/, '.webp');
    const outputPath = path.join(inputDir, outputName + '.tmp');
    
    try {
        await sharp(inputPath)
            .resize(800, 600, { fit: 'inside', withoutEnlargement: true })
            .webp({ quality: 70 })
            .toFile(outputPath);
        
        const finalPath = path.join(inputDir, outputName);
        fs.renameSync(outputPath, finalPath);
        
        const originalSize = fs.statSync(inputPath).size;
        const newSize = fs.statSync(finalPath).size;
        console.log(`✓ ${file} → ${outputName} (${Math.round(originalSize/1024)}KB → ${Math.round(newSize/1024)}KB)`);
    } catch (err) {
        console.error(`✗ Error processing ${file}:`, err.message);
    }
}

console.log('Done!');