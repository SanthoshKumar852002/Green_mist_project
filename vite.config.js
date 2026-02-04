import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],
    build: {
        target: 'esnext',
        cssCodeSplit: true,
        minify: 'terser',
        terserOptions: {
            compress: {
                drop_console: true,
                drop_debugger: true,
            },
        },
        rollupOptions: {
            output: {
                manualChunks: {
                    vendor: ['react', 'react-dom'],
                    motion: ['framer-motion'],
                },
            },
        },
        chunkSizeWarningLimit: 500,
        assetsInlineLimit: 4096, // Inline small images as base64 (<4kb)
    },
    optimizeDeps: {
        include: ['react', 'react-dom', 'framer-motion'],
    },
});