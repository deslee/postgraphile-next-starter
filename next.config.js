const globalConfig = require('./globalConfig.compiled').default;
const withCSS = require('@zeit/next-css')
const withTypescript = require('@zeit/next-typescript')
const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer(withTypescript(withCSS({
    env: {
        sessionIdHeaderName: globalConfig.sessionIdHeaderName,
        s3bucketUrl: `https://${globalConfig.awsS3UploadBucket}.s3.amazonaws.com`
    }
})))