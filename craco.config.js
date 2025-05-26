// craco.config.js
// Configuración de polyfills, alias y ajustes de Webpack para CRA con CRACO
const webpack = require('webpack');
const path = require('path');

module.exports = {
  webpack: {
    configure: (config) => {
      // 1. Polyfill fallbacks para módulos Node.js
      config.resolve = config.resolve || {};
      config.resolve.fallback = {
        ...config.resolve.fallback,
        util: require.resolve('util/'),
        url: require.resolve('url/'),
        http: require.resolve('stream-http'),
        https: require.resolve('https-browserify'),
        stream: require.resolve('stream-browserify'),
        assert: require.resolve('assert/'),
        path: require.resolve('path-browserify'),
        querystring: require.resolve('querystring-es3'),
        zlib: require.resolve('browserify-zlib'),
        buffer: require.resolve('buffer/'),
        process: require.resolve('process/browser'),
        // deshabilitar otros módulos sin uso en frontend
        fs: false,
        net: false,
        tls: false,
        child_process: false,
        dns: false,
      };

      // 2. Alias para imports ESM sin extensión y módulos específicos
      config.resolve.alias = {
        ...config.resolve.alias,
        'react-qr-barcode-scanner/dist/BarcodeScanner': path.resolve(__dirname, 'node_modules/react-qr-barcode-scanner/dist/BarcodeScanner.js'),
        'react-qr-barcode-scanner/dist/BarcodeStringFormat': path.resolve(__dirname, 'node_modules/react-qr-barcode-scanner/dist/BarcodeStringFormat.js'),
        'process/browser': require.resolve('process/browser.js'),
      };

      // 3. Provide globals para Buffer y process
      config.plugins = [
        ...config.plugins,
        new webpack.ProvidePlugin({
          Buffer: ['buffer', 'Buffer'],
          process: ['process/browser'],
        }),
      ];

      // 4. Desactivar fullySpecified en reglas para resolver imports sin extensión
      config.module.rules.forEach((rule) => {
        if (rule.resolve) {
          rule.resolve.fullySpecified = false;
        }
      });

      return config;
    },
  },
};
