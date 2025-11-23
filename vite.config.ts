import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  build: {
    // Output directory
    outDir: 'dist',

    // Source maps (disable for production)
    sourcemap: false,

    // Minification (esbuild is faster than terser)
    minify: 'esbuild',

    // Chunk splitting for better caching
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor chunks
          'react-vendor': ['react', 'react-dom'],
          'framer-motion': ['framer-motion'],
        },
      },
    },

    // CSS code splitting
    cssCodeSplit: true,

    // Chunk size warnings
    chunkSizeWarningLimit: 600,
  },

  // Development server configuration
  server: {
    port: 5173,
    strictPort: false,
    open: false,
  },

  // Preview server configuration
  preview: {
    port: 4173,
    strictPort: false,
  },
})
