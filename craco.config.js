const path = require('path');

module.exports = {
  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    },
    configure: (webpackConfig) => {
      webpackConfig.resolve.extensions = ['.js', '.jsx', '.ts', '.tsx'];
      return webpackConfig;
    }
  }
};
