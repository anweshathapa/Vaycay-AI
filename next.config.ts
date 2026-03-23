import type { NextConfig } from "next";



const nextConfig: NextConfig = {

  /* config options here */
  images:  {
    domains: ['places.googleapis.com']
  }

};

export default nextConfig;

// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   images: {
//     remotePatterns: [
//       {
//         protocol: 'https',
//         hostname: 'places.googleapis.com',
//         pathname: '/v1/places/**',
//       },
//     ],
//   },
// };

// export default nextConfig;