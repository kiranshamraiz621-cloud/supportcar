import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Agar file node_modules se aa rahi hai
          if (id.includes('node_modules')) {
            // Motion wale packages (GSAP, Framer Motion) alag chunk mein
            if (id.includes('framer-motion') || id.includes('gsap')) {
              return 'motion';
            }
            // React aur uske friends alag chunk mein
            if (id.includes('react') || id.includes('react-dom') || id.includes('react-router-dom')) {
              return 'vendor';
            }
            // Baaki sab packages ek common 'vendor' chunk mein
            return 'vendor';
          }
        }
      }
    }
  }
});