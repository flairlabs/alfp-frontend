const securityHeaders = [
    {
        key: 'X-Frame-Options',
        value: 'SAMEORIGIN'
    },
]

module.exports = {
    reactStrictMode: true,
    async headers() {
        return [
            {
                // Apply these headers to all routes in your application.
                source: '/(.*)',
                headers: securityHeaders,
            },
        ]
    },
    images: {
        domains: ['localhost', '18.141.13.165', 'aflm-backend-staging.magpie.ph', 'alfm-backend-prod.magpie.ph'],
    },
}
