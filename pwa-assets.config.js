import { defineConfig } from "@vite-pwa/assets-generator/config";

export default defineConfig({
  preset: {
    transparent: {
      sizes: [64, 192, 512],
      favicons: [[48, "favicon.ico"]],
    },
    maskable: {
      sizes: [512],
      resizeOptions: {
        background: "#000000", // Set background color to black
      },
    },
    apple: {
      sizes: [180],
      resizeOptions: {
        background: "#000000", // Set background color to black
      },
    },
  },
  images: ["public/logo.svg"], // Replace with your actual image paths
  manifest: {
    background_color: "#000000", // Set background color to black
  },
});
