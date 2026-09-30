import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { viteSingleFile } from 'vite-plugin-singlefile';

// `npm run build`          -> normal production build (path URLs, separate assets)
// `npm run build:preview`  -> one self-contained HTML file with hash URLs, for the Claude preview
export default defineConfig(({ mode }) => ({
  plugins: [react(), ...(mode === 'preview' ? [viteSingleFile()] : [])],
  css: { modules: { localsConvention: 'camelCaseOnly' } },
  build: { outDir: mode === 'preview' ? 'dist-preview' : 'dist' }
}));
