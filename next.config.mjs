/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "uzvunajzkvpimdfiyhzb.supabase.co",
      },
    ],
  },
};

export default nextConfig;
