
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
    // Add the origin that was detected in the warning
    // Assuming HTTP for local/dev environments. If your Cloud Workstation uses HTTPS, adjust accordingly.
    'http://9003-firebase-studio-1749974562802.cluster-fdkw7vjj7bgguspe3fbbc25tra.cloudworkstations.dev'
    // You might also need to add 'http://localhost:9003' if you access it directly sometimes.
  ],
};

export default nextConfig;
