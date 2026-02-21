import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ command }) => ({
  base: command === "build" ? "/To-Do-App/" : "/",
  plugins: [react()],
}))