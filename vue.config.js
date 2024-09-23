const { defineConfig } = require('@vue/cli-service');
require('dotenv').config();

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      '/api': {
        target: '*', // Your backend API URL
        changeOrigin: true,
        pathRewrite: { '^/api': '' },
      },
    },
  },
});
