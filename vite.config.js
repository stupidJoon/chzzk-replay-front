import { defineConfig, loadEnv  } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePluginRadar } from 'vite-plugin-radar';

// process.env = {...process.env, ...loadEnv(mode, process.cwd())};

// const plugins = [react()];

// if (process.env.GA4_ID) {
//   plugins.push(
//     VitePluginRadar({
//       // Google Analytics tag injection
//       analytics: {
//         id: process.env.GA4_ID,
//       },
//     }),
//   );
// }

// https://vitejs.dev/config/
// export default defineConfig({
//   plugins,
// });

// export default defineConfig(({ command, mode, isSsrBuild, isPreview }) => {

// });

export default ({ mode }) => {
  process.env = {...process.env, ...loadEnv(mode, process.cwd())};

  const plugins = [react()];

  if (process.env.GA4_ID) {
    plugins.push(
      VitePluginRadar({
        // Google Analytics tag injection
        analytics: {
          id: process.env.GA4_ID,
        },
      }),
    );
  }

  return defineConfig({ plugins })
}
