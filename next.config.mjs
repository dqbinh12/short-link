/** @type {import('next').NextConfig} */
const nextConfig = {
  // Serve under /short-link base path.
  basePath: '/short-link',
  // Emit a minimal, self-contained server bundle for Docker.
  output: 'standalone',
};

export default nextConfig;
