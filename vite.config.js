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
        manualChunks(id) {
          if (id.includes('firebase/auth'))       return 'firebase-auth';
          if (id.includes('firebase/firestore'))  return 'firebase-firestore';
          if (id.includes('@firebase') || id.includes('firebase/app')) return 'firebase-app';
          if (id.includes('swiper'))              return 'swiper';
          if (id.includes('framer-motion'))       return 'framer-motion';
          if (id.includes('react-dom'))           return 'react-dom';
          if (id.includes('react-router'))        return 'react-router';
          if (id.includes('react-icons'))         return 'icons';
        },
      },
    },
  },
  // ✅ optimizeDeps.exclude সরানো হয়েছে — এটাই localhost blank page এর কারণ ছিল
})
