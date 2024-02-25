import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePluginRadar } from 'vite-plugin-radar';

const plugins = [react()];

if (import.meta.env.GA4_ID) {
  plugins.push(
    VitePluginRadar({
      // Google Analytics tag injection
      analytics: {
        id: import.meta.env.GA4_ID,
      },
    }),
  );
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins,
});
