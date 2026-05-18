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
  },
  build: {
    chunkSizeWarningLimit: 300,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return
          if (id.includes('apexcharts') || id.includes('react-apexcharts')) {
            return 'vendor-apexcharts'
          }
          if (id.includes('chart.js') || id.includes('react-chartjs-2') || id.includes('@kurkle')) {
            return 'vendor-chartjs'
          }
          if (id.includes('react-router')) return 'vendor-router'
          if (id.includes('react-dom')) return 'vendor-react-dom'
          if (id.includes('/react/') || id.includes('\\react\\') || id.includes('scheduler')) {
            return 'vendor-react'
          }
          if (id.includes('lucide-react')) return 'vendor-lucide'
          if (id.includes('react-icons')) return 'vendor-react-icons'
          if (id.includes('@tanstack')) return 'vendor-tanstack'
          if (id.includes('laravel-echo') || id.includes('pusher-js')) return 'vendor-realtime'
          if (id.includes('axios')) return 'vendor-axios'
          if (id.includes('date-fns')) return 'vendor-date-fns'
          if (id.includes('zustand')) return 'vendor-zustand'
          if (id.includes('idb')) return 'vendor-idb'
          return 'vendor'
        },
      },
    },
  },
})
