// vite.config.js
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react(), tailwindcss()],

  build: {
    target: 'es2020',
    chunkSizeWarningLimit: 600,

    // ✅ PERF: Disable modulepreload polyfill — modern browsers don't need it,
    // and it saves ~1.5 KiB from the initial JS bundle.
    // All targeted browsers (es2020) support native modulepreload.
    modulePreload: { polyfill: false },

    rollupOptions: {
      output: {
        manualChunks(id) {
          // Firebase splits: auth and firestore are large and used differently
          // auth:      needed on login/register + listener setup
          // firestore: needed for cart/wishlist (only when user is logged in)
          // app:       tiny core, keep with firestore
          if (id.includes('firebase/auth'))                              return 'firebase-auth';
          if (id.includes('firebase/firestore'))                         return 'firebase-firestore';
          if (id.includes('@firebase') || id.includes('firebase/app'))  return 'firebase-app';

          // ✅ REMOVED: 'swiper' entry — Swiper has been removed from the codebase.
          //   Keeping ghost entries wastes rollup scan time.
          // ✅ REMOVED: 'framer-motion' entry — not imported anywhere in src/.
          //   Was never bundled but wastes rollup scan time.

          // react-dom is large but always needed — separate chunk lets browser
          // cache it independently of app code changes
          if (id.includes('react-dom'))    return 'react-dom';
          if (id.includes('react-router')) return 'react-router';

          // ✅ REMOVED: react-icons — Footer now uses inline SVGs.
          //   The 'icons' chunk no longer exists, saving one network request
          //   from the critical path (MainRoute → Footer was eager).
        },
      },
    },
  },
})
