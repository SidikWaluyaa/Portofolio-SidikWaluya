/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: true,
  output: process.env.NEXT_PUBLIC_EXPORT ? "export" : undefined,
  basePath: process.env.NEXT_PUBLIC_EXPORT ? "/Portofolio-SidikWaluya" : "",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
