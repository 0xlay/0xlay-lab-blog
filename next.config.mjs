/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: { unoptimized: true },
  trailingSlash: true,
  experimental: {
    // @resvg/resvg-js is a native addon that the OG card routes use at build
    // time. Bundling it puts a .node binary through webpack, which fails; this
    // leaves it to be required from node_modules instead.
    serverComponentsExternalPackages: ['@resvg/resvg-js'],
  },
}

export default nextConfig
