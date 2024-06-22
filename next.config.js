const { i18n } = require("./next-i18next.config.js");
/** @type {import('next').NextConfig} */
// import i18n from "./next-i18next.config.js";

const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.dummyjson.com",
        pathname: "/product-images/**",
      },
      {
        protocol: "https",
        hostname: "fakestoreapi.com",
        pathname: "/img/**",
      },
      {
        protocol: "https",
        hostname: "m.media-amazon.com",
        pathname: "/images/I/**",
      },
    ],
  },
  i18n,
};

// export default nextConfig;
module.exports = nextConfig;
