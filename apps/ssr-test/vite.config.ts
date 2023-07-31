import { defineConfig } from "vite"
import dlight from "vite-plugin-dlight-client"

console.log(dlight)
export default defineConfig({
  server: {
    port: 26660
  },
  plugins: [
    dlight({ files: "**/*.view.ts" })
  ]
})
