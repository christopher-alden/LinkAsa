/** @type {import('next').NextConfig} */
module.exports = {
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  // Comment out the custom webpack configuration as a test
  // webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
  //   return config;
  // },
}
