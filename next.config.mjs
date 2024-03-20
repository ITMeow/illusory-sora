/** @type {import('next').NextConfig} */
const nextConfig = {
    // @link https://nextjs.org/docs/app/api-reference/next-config-js/headers
	async headers(){
        return [
            {
                source: "/:path*",
                headers: [
                    { key: "Access-Control-Allow-Origin", value: "*" },
                ],
            }
        ]
    },
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'res.cloudinary.com',
            port: ''
          }
        ]
      }
};

export default nextConfig;
