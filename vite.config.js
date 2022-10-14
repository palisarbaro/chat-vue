import { fileURLToPath, URL } from 'url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import mkcert from 'vite-plugin-mkcert'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue(), mkcert()],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
        },
    },
    server: {
        https: true,
        proxy: {
            '/auth': {
                target: 'https://localhost:5000',
                secure: false
            },
            '/api': {
                target: 'https://localhost:4000',
                secure: false
            }
        }
    },



})
