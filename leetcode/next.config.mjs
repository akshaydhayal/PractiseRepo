/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // webpack: (config) => {
  //   config.experiments = {
  //     topLevelAwait: true,
  //   };
  //   return config;
  // },
  experimental: {
    esmExternals: "loose", // <-- add this
    serverComponentsExternalPackages: ["mongoose"],
  },
};

export default nextConfig;
