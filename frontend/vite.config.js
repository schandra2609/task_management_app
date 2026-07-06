import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],
    server: {
        port: 3000,
        host: true,
        allowedHosts: true,
        proxy: {
            '/api/v1': {
                target: 'http://localhost:5000',
                changeOrigin: true,
                secure: false,
            },
        }
    },
    build: {
        outDir: 'dist',
        sourcemap: false,
    }
});