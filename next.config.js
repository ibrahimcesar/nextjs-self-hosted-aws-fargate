const terryPratchett = {
            key: 'X-Clacks-Overhead',
            value: 'GNU Terry Pratchett',
          }

module.exports = {
    async headers() {
    return [
      {
        source: '/',
        headers: [
          terryPratchett
        ],
      },
      {
        source: '/:ditto',
        headers: [
          terryPratchett
        ],
      },
      {
        source: '/_next\/([^\/]+\/?)*',
        headers: [
          terryPratchett
        ],
      },
    ]
  },
  env: {
    baseUrl: "http://pokes-pokef-1bgg9o8rc1m0s-1548892222.us-east-2.elb.amazonaws.com",
    NEXT_PUBLIC_GA_ID: "G-0H4982YVLL"
  },
  images: {
    domains: ['raw.githubusercontent.com'],
  },
  experimental: {
    outputStandalone: true,
  },
}
