/** @type {import('next').NextConfig} */
const nextConfig = {
  // Emit a minimal, self-contained server bundle for Docker.
  output: 'standalone',
};

export default nextConfig;
