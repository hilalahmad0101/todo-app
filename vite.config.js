import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: [
      "chunk-IRHGDTOB.js",
      "chunk-55RWFVSR.js",
      "chunk-WQ6XQXJ5.js",
      "chunk-QFHT7H3G.js",
      "chunk-YZRHPXQM.js",
      "chunk-VT2NF7RM.js",
    ],
  },
});
