/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import viteTsConfigPaths from 'vite-tsconfig-paths';
import dts from 'vite-plugin-dts';
import { join } from 'path';
import { writeFileSync } from 'fs';
import { createRequire } from 'module';
import { exec } from 'node:child_process';
const require = createRequire(import.meta.url);

export default defineConfig({
  cacheDir: '../node_modules/.vite/react-components',
  plugins: [
    dts({
      entryRoot: 'src',
      tsconfigPath: join(__dirname, 'tsconfig.lib.json'),
      afterBuild: async () => {
        if (process.env.NX_TASK_TARGET_CONFIGURATION === 'development-watch') {
          const json = require(join(__dirname, 'package.json'));

          json.version = '0.0.0-dev';

          json.scripts = {
            'yalc:push': 'yalc push',
          };

          writeFileSync(
            join(__dirname, '../dist/react-components/package.json'),
            JSON.stringify(json, null, 2),
          );

          exec('pnpm yalc:push', {
            cwd: join(__dirname, '../dist/react-components'),
          });
        }
      },
    }),
    react(),
    viteTsConfigPaths({
      root: '../',
    }),
  ],

  // Uncomment this if you are using workers.
  // worker: {
  //  plugins: [
  //    viteTsConfigPaths({
  //      root: '../',
  //    }),
  //  ],
  // },

  // Configuration for building your library.
  // See: https://vitejs.dev/guide/build.html#library-mode
  build: {
    lib: {
      // Could also be a dictionary or array of multiple entry points.
      entry: 'src/index.ts',
      name: 'react-components',
      fileName: 'index',
      // Change this to the formats you want to support.
      // Don't forgot to update your package.json as well.
      formats: ['cjs'],
    },
    minify: 'esbuild',
    rollupOptions: {
      // External packages that should not be bundled into your library.
      external: [
        'react',
        'react-dom',
        'react/jsx-runtime',
        'framer-motion',
        'd3',
        'd3-hsv',
        '@tanstack/react-table',
        '@tanstack/react-virtual',
        '@floating-ui/react',
        'classnames',
        'object-hash',
      ],
      output: {
        assetFileNames: () => 'index.css',
      },
    },
  },
});
