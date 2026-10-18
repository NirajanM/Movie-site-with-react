import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";
import { VitePWA } from "vite-plugin-pwa";
import { visualizer } from "rollup-plugin-visualizer";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const token = env.TMDB_TOKEN || env.VITE_TOKEN;

  const plugins = [
      react(),
      VitePWA({
        registerType: "autoUpdate",
        includeAssets: ["favicon.ico", "apple-touch-icon.png", "mask-icon.svg"],
        workbox: {
          runtimeCaching: [
            {
              urlPattern: /^https:\/\/image\.tmdb\.org\/.*/i,
              handler: "CacheFirst",
              options: {
                cacheName: "tmdb-images",
                expiration: {
                  maxEntries: 300,
                  maxAgeSeconds: 60 * 60 * 24 * 30,
                },
                cacheableResponse: { statuses: [0, 200] },
              },
            },
            {
              urlPattern: /\/fonts\/[^/]+\.woff2$/,
              handler: "CacheFirst",
              options: {
                cacheName: "fonts",
                expiration: {
                  maxEntries: 20,
                  maxAgeSeconds: 60 * 60 * 24 * 365,
                },
                cacheableResponse: { statuses: [0, 200] },
              },
            },
          ],
        },
        manifest: {
          name: "LetsWatchMovie",
          short_name: "LWM",
          description:
            "Browse movies and TV shows, build a watchlist and press play.",
          theme_color: "#030302",
          background_color: "#030302",
          display: "standalone",
          start_url: "/",
          scope: "/",
          lang: "en",
          categories: ["entertainment"],
          icons: [
            {
              src: "pwa-64x64.png",
              sizes: "64x64",
              type: "image/png",
            },
            {
              src: "pwa-192x192.png",
              sizes: "192x192",
              type: "image/png",
            },
            {
              src: "pwa-512x512.png",
              sizes: "512x512",
              type: "image/png",
              purpose: "any",
            },
            {
              src: "maskable-icon-512x512.png",
              sizes: "512x512",
              type: "image/png",
              purpose: "maskable",
            },
          ],
        },
      }),
  ];

  if (mode === "analyze") {
    plugins.push(
      visualizer({
        filename: "dist/stats.html",
        template: "treemap",
        gzipSize: true,
        brotliSize: true,
      })
    );
  }

  return {
    plugins,
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    server: {
      proxy: {
        "/api/tmdb": {
          target: "https://api.themoviedb.org/3",
          changeOrigin: true,
          rewrite: (p) => p.replace(/^\/api\/tmdb/, ""),
          headers: token
            ? { accept: "application/json", Authorization: `Bearer ${token}` }
            : { accept: "application/json" },
        },
      },
    },
  };
});
