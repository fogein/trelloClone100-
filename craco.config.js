const path = require(`path`);

module.exports = {
  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@app': path.resolve(__dirname, 'src', 'app'),
      '@entities': path.resolve(__dirname, 'src', 'entities'),
      '@features': path.resolve(__dirname, 'src', 'features'),
      '@pages': path.resolve(__dirname, 'src', 'pages'),
      '@shared': path.resolve(__dirname, 'src', 'shared'),
      '@widgets': path.resolve(__dirname, 'src', 'widgets'),
      // '@ui': path.resolve(__dirname, 'src', 'components', 'ui'),
      // '@icons': path.resolve(__dirname, 'src', 'components', 'ui', 'icons', 'icons-list'),
    },
  },
};
