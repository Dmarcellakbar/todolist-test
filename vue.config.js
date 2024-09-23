const { defineConfig } = require('@vue/cli-service');
require('dotenv').config();

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      '/api': {
        target: process.env.VUE_APP_API_URL, // Your backend API URL
        changeOrigin: true,
        pathRewrite: { '^/api': '' },
      },
    },
  },
});
