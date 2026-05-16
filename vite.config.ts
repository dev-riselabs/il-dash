import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import path from 'node:path'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
     tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg'],
      manifest: {
        name: 'IL-DASH | Invest Lagos 3.0',
        short_name: 'IL-DASH',
        description: 'Invest Lagos 3.0 Real-Time Intelligence Dashboard',
        theme_color: '#0a0e14',
        background_color: '#0a0e14',
        display: 'standalone',
        start_url: '/',
        icons: [
          { src: '/favicon.svg', sizes: 'any', type: 'image/svg+xml' },
        ],
      },
      workbox: {
        navigateFallbackDenylist: [/^\/api/, /^\/sanctum/, /^\/broadcasting/],
        runtimeCaching: [
          {
            urlPattern: ({ url }) => url.pathname.startsWith('/api/'),
            handler: 'NetworkFirst',
            options: {
              cacheName: 'il-dash-api-cache',
              networkTimeoutSeconds: 5,
              expiration: { maxEntries: 100, maxAgeSeconds: 60 * 5 },
            },
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 5173,
    host: 'localhost',

    // ✅ ADDED PROXY (FIX FOR CORS)
    proxy: {
      "/api": {
        target:
          "https://script.google.com/macros/s/AKfycbyyeH96j37BohMwmg5ZPXdxfIs9TL6GzexLJLDFfrk8L6O7N1kA0bnXFAAsCeI-ctO5/exec",
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
})
