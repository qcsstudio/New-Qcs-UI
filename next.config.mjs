/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['www.qcsstudio.com','quantumcrafters-studio.vercel.app' , 'lh3.googleusercontent.com','media.licdn.com'],
    remotePatterns: [
      {
        protocol: "https",
        hostname: `elevatrx.s3.ap-south-1.amazonaws.com`,
      },
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "drive.google.com",
      },
    ],
  },
};

export default nextConfig;
