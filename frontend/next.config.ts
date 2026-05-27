//frontend/next.config.ts

import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: false,

  allowedDevOrigins: ['192.168.100.3'],

  images: {
    remotePatterns: [
      {
        protocol: 'https',

        hostname: 'i.pravatar.cc',
      },

      {
        protocol: 'https',

        hostname: 'lh3.googleusercontent.com',
      },
    ],
  },
};

export default nextConfig;
