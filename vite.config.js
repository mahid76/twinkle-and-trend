import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],

  build: {
    // ✅ Target modern browsers for smaller bundles
    target: 'es2020',

    // ✅ Chunk size warning limit
    chunkSizeWarningLimit: 600,

    rollupOptions: {
      output: {
        // ✅ Manual chunk splitting — Firebase, Swiper, Framer আলাদা হবে
        // এতে initial JS bundle অনেক ছোট হবে (Performance ↑)
        manualChunks: {
          // React core
          'react-vendor': ['react', 'react-dom', 'react-router', 'react-router-dom'],
          // Firebase — সবচেয়ে বড় dependency, আলাদা chunk এ
          'firebase-app': ['firebase/app', 'firebase/auth'],
          'firebase-firestore': ['firebase/firestore'],
          // UI libraries
          'swiper-vendor': ['swiper'],
          'framer-vendor': ['framer-motion'],
          'icons-vendor': ['react-icons'],
        },
      },
    },
  },

  // ✅ Optimize dependencies pre-bundling
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      'firebase/app',
      'firebase/auth',
      'firebase/firestore',
    ],
  },
})
