var prod = process.env.NODE_ENV === 'production';
var img2cloudPluginConfig = {
  qcloud: {
    // 上传到腾讯云时必须提供
    appId: '10000074',
    bucket: 'sngedu',
    region: 'ap-shanghai',
    secretId: 'AKIDt6mZ4FEunwyk1EQRY0Gxi4Zrt7X7pGQM',
    secretKey: 'piZhRsBJizGNMKA14v2FuOqF1LhFZxNV'
  },
  mode: 'qcloud' // qcloud表示上传到腾讯云、base64表示转换为base64
};

module.exports = {
  wpyExt: '.wpy',
  eslint: true,
  cliLogs: true,
  compilers: {
    sass: {
      outputStyle: 'compressed'
    },
    babel: {
      sourceMap: true,
      presets: ['env'],
      plugins: [
        'babel-plugin-transform-class-properties',
        'transform-export-extensions',
        'syntax-export-extensions'
      ]
    }
  },
  plugins: {
    img2cloud: img2cloudPluginConfig,
    autoprefixer: {
      filter: /\.wxss$/,
      config: {
        browsers: ['last 11 iOS versions']
      }
    }
  },
  appConfig: {
    noPromiseAPI: ['createSelectorQuery']
  }
};

if (prod) {
  module.exports.cliLogs = false;

  delete module.exports.compilers.babel.sourcesMap;
  // 压缩sass
  module.exports.compilers['sass'] = { outputStyle: 'compressed' };

  // 压缩js
  module.exports.plugins.uglifyjs = {
    filter: /\.js$/,
    config: {}
  };
}
