import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

// https://vitejs.dev/config/
export default ({ mode }) => {
   process.env = { ...process.env, ...loadEnv(mode as string, process.cwd()) };
   return defineConfig({
      plugins: [react()],
      server: {
         port: 5000,
      },
      resolve: {
         alias: {
            '@': path.resolve(__dirname, './src'),
         },
      },
      envPrefix: 'K',
   });
};
