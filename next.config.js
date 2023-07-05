/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { hostname: "plus.unsplash.com" },
      { hostname: "images.unsplash.com" },
      { hostname: "lh3.googleusercontent.com" },

    ],
  },
  experimental: {
    serverActions: true,
    swcPlugins: [{ module: require.resolve("next-superjson-plugin") }],
  },
};

module.exports = nextConfig;
