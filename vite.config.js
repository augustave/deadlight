import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  // Served from https://augustave.github.io/deadlight/
  base: "/deadlight/",
  plugins: [react()],
});
