/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com" }],
  },
  typescript: { ignoreBuildErrors: true },
  experimental: {
    // The engine in src/ uses TypeScript ESM imports with explicit ".js"
    // extensions (e.g. `import { x } from "./fpl.js"`) that resolve to ".ts"
    // files. Teach the bundler that mapping.
    extensionAlias: {
      ".js": [".ts", ".tsx", ".js"],
      ".mjs": [".mts", ".mjs"],
    },
  },
}

export default nextConfig
