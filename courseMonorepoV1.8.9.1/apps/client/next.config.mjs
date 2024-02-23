/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages:["ui","db","store"],
};

export default nextConfig;
