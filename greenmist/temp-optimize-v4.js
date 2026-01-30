
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

async function optimize() {
    const inputPath = 'c:/greenmist/public/images/hero_banner_v4.jpg';
    const outputPath = 'c:/greenmist/public/images/hero_banner_v4.webp';

    try {
        await sharp(inputPath)
            .webp({ quality: 80 })
            .toFile(outputPath);
        console.log('Successfully optimized hero banner v4');
    } catch (err) {
        console.error('Error optimizing image:', err);
    }
}

optimize();
