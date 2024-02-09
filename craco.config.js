const path = require(`path`);

module.exports = {
  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@app': path.resolve(__dirname, 'src', 'app'),
      // '@ui': path.resolve(__dirname, 'src', 'components', 'ui'),
      // '@icons': path.resolve(__dirname, 'src', 'components', 'ui', 'icons', 'icons-list'),
    },
  },
};
