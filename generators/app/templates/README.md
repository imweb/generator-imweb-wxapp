# <%= appNameInChinese %>小程序

## 项目基本信息
* AppID: `<%= appid %>`

## 项目初始化

### 1. 安装及运行

```
# 初始化依赖
npm run init

# 运行
npm run dev
```


最后，使用微信开发者工具新建项目，选择项目路径即可。

### 2. VS Code 插件

* [minapp](https://marketplace.visualstudio.com/items?itemName=qiu8310.minapp-vscode) 用于支持 wxml 代码高亮与代码片段
* [vscode weapp api](https://marketplace.visualstudio.com/items?itemName=coderfee.vscode-weapp-api) 用于支持 wx api 代码片段
* [Toggle Excluded Files](https://marketplace.visualstudio.com/items?itemName=eamodio.toggle-excluded-files) 用于隐藏 wxss 文件，只暴露 CSS 文件

### 3. 支持能力

- postcss（变量、mixin等）
- background-image 转成 inline base64
- font 字体转成 inline base64
- 图片及svg压缩，命令为 `gulp img`（图片压缩的 npm 需要配置代理或使用staffwifi）
- `nohost` 能力，命令为 `npm run nohost`
- 代码规范（eslint、stylelint、commitlint）
- 代码格式化 prettier
- 基础库 `imwxutils`，在 `tnpm` 中搜索 `@tencent/imwxutils`，具体内容详见[微信小程序 for IMWeb - 基础工具库](https://github.com/imweb/imweb-wxapp/wiki/base_utils)

更多项目基础能力，详见[微信小程序 for IMWeb - 项目基础能力](https://github.com/imweb/imweb-wxapp/wiki/base_function)

> 此项目符合 `IMWeb Team` 微信小程序项目规范，详见[微信小程序 for IMWeb](https://github.com/imweb/imweb-wxapp/wiki)
