/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  output: "export",
  typescript: {
    tsconfigPath: "tsconfig.build.json",
    ignoreBuildErrors: true,
  },
}
