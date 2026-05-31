/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  output: "standalone",
  typescript: {
    tsconfigPath: "tsconfig.build.json",
    ignoreBuildErrors: true,
  },
}
