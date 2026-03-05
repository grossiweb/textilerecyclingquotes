/** @type {import('next').NextConfig} */
const nextConfig = {
  images: { domains: ['*'], unoptimized: true },
  async headers() {
    return [{ source:'/(.*)', headers:[
      { key:'X-Frame-Options', value:'SAMEORIGIN' },
      { key:'X-Content-Type-Options', value:'nosniff' }
    ]}]
  }
}
module.exports = nextConfig
