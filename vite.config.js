import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react(), tailwindcss()],

  build: {
    target: 'es2020',
    chunkSizeWarningLimit: 600,

    rollupOptions: {
      output: {
        // ✅ Manual chunks — প্রতিটা library আলাদা chunk এ যাবে
        // Browser cache করবে, page reload এ re-download হবে না
        manualChunks(id) {
          // Firebase — সবচেয়ে বড়, আলাদা করা জরুরি
          if (id.includes('firebase/auth'))       return 'firebase-auth';
          if (id.includes('firebase/firestore'))  return 'firebase-firestore';
          if (id.includes('firebase/app') || id.includes('@firebase')) return 'firebase-app';

          // Swiper — forced reflow করে, আলাদা রাখো
          if (id.includes('swiper'))              return 'swiper';

          // ✅ Framer Motion — SearchModal এ use হয়, lazy load করা হবে
          if (id.includes('framer-motion'))       return 'framer-motion';

          // React core
          if (id.includes('react-dom'))           return 'react-dom';
          if (id.includes('react-router'))        return 'react-router';

          // Icons
          if (id.includes('react-icons'))         return 'icons';
        },
      },
    },
  },

  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
    ],
    // Firebase কে pre-bundle করো না — lazy load এর জন্য
    exclude: ['firebase/auth', 'firebase/firestore'],
  },
})
