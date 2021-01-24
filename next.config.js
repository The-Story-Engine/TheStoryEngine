module.exports = {
  target: "serverless",
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: {
        loader: "@svgr/webpack",
        options: { titleProp: true },
      },
    });

    return config;
  },
};
