
import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'instagram.fdel11-3.fna.fbcdn.net',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com',
        port: '',
        pathname: '/**',
      }
    ],
  },
  allowedDevOrigins: [
    'http://9003-firebase-studio-1749974562802.cluster-fdkw7vjj7bgguspe3fbbc25tra.cloudworkstations.dev',
    'https://9003-firebase-studio-1749974562802.cluster-fdkw7vjj7bgguspe3fbbc25tra.cloudworkstations.dev',
    // You might also need to add 'http://localhost:9003' if you sometimes access it directly.
    'http://localhost:9003'
  ],
};

export default nextConfig;
