const withTypescript = require('@zeit/next-typescript')
const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',
})



module.exports = withBundleAnalyzer(withTypescript())