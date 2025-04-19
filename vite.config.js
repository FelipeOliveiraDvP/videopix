import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import react from "@vitejs/plugin-react";
import path from "path";
import fs from "fs";
import pathLib from "path";

const moveManifestPlugin = () => {
  return {
    name: "move-manifest",
    closeBundle: () => {
      const from = pathLib.resolve(
        __dirname,
        "public/build/.vite/manifest.json"
      );
      const to = pathLib.resolve(__dirname, "public/build/manifest.json");
      if (fs.existsSync(from)) {
        fs.renameSync(from, to);
      }
    },
  };
};

export default defineConfig({
  base: "/build/",
  plugins: [
    laravel({
      input: ["resources/js/app.tsx"],
      refresh: true,
    }),
    react(),
    moveManifestPlugin(),
  ],
  build: {
    outDir: "public/build",
    emptyOutDir: true,
    manifest: true,
    rollupOptions: {
      input: "resources/js/app.tsx",
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./resources/js"),
    },
  },
});
