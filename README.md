# generator-imweb-wxapp [![NPM version](https://img.shields.io/npm/v/generator-imweb-wxapp.svg)](https://www.npmjs.com/package/generator-imweb-wxapp)
yeoman generator插件，imweb 微信小程序项目脚手架

## Install

``` bash
npm install -g yo generator-imweb-wxapp
```

## Usage  

```bash
mkdir test
cd test
yo imweb-wxapp:app
```

## gulp 构建

### 运行
```bash
npm run dev
```

### 支持能力

- postcss（变量、mixin等）
- background-image 转成 inline base64
- font 字体转成 inline base64
- 图片及svg压缩，命令为 `gulp img`（图片压缩的 npm 需要配置代理或使用staffwifi）
