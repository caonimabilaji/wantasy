import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from "vite-tsconfig-paths";
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  build: {
    sourcemap: 'hidden',
    outDir: 'dist',
  },
  plugins: [
    react({
      babel: {
        plugins: [
          'react-dev-locator',
        ],
      },
    }),
    tsconfigPaths(),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'auto',
      manifest: {
        name: 'ChingLish Generator',
        short_name: 'ChingLish',
        description: '中式英语生成器 - 将中文转换为带有中式表达习惯的英语译文',
        theme_color: '#E74C3C',
        background_color: '#ffffff',
        display: 'standalone',
        scope: '/',
        start_url: '/',
        icons: [
          {
            src: 'icons/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any maskable'
          },
          {
            src: 'icons/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{html,js,css,svg,png,jpg}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/.*\.(js|css|png|jpg|svg)/,
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'external-resources',
              cacheableResponse: {
                statuses: [200]
              }
            }
          }
        ]
      },
      devOptions: {
        enabled: true,
        suppressWarnings: true,
        navigateFallback: 'index.html'
      }
    })
  ],
})
