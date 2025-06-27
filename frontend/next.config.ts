
import type {NextConfig} from 'next';

const cloudWorkstationOriginBase = '9003-firebase-studio-1749974562802.cluster-fdkw7vjj7bgguspe3fbbc25tra.cloudworkstations.dev';

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
    `http://${cloudWorkstationOriginBase}`,
    `https://${cloudWorkstationOriginBase}`,
    cloudWorkstationOriginBase, // Added protocol-less version from the error message
    'http://localhost:9003' // For local access
  ],
};

export default nextConfig;
