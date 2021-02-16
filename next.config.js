module.exports = {
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
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },
};
