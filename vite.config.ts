import * as path from 'path';
import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/pinyin/',
  plugins: [reactRefresh(), tsconfigPaths()],
  server: {
    open: true,
    port: 8000,
  },
  alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }],
  css: {
    modules: {
      localsConvention: 'camelCaseOnly',
    },
  },
});
