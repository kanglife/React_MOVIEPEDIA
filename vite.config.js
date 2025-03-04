import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": "https://learn.codeit.kr", // 기본 프록시 설정
    },
  },
});
