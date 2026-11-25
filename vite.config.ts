import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    // The main chunk is mostly the bilingual course text (~390 KB source, ~190 KB gzipped).
    // Widgets are already code-split; splitting content per chapter is a possible later step.
    chunkSizeWarningLimit: 700,
  },
});
