# webpack-ant-icon-loader

[![NPM version][npm-image]][npm-url]


### 一、简介篇

用于解决 在引入[`ant-design`](https://ant-design.gitee.io/index-cn) `3.x`版本后（全量引入`@ant-design/icons`图标文件），导致打包生成的主文件较大的问题。


### 二、安装篇

> npm

```shell
    npm install webpack-ant-icon-loader --save-dev
```

> yarn

```shell
    yarn add webpack-ant-icon-loader --dev
```
     

### 三、使用篇

#### [webpack](https://github.com/webpack/webpack)
> webpack.config.js

```js
module.exports = {
  module:{
    rules:[
      {
        loader:'webpack-ant-icon-loader',
        enforce: 'pre',
        include:[
          require.resolve('@ant-design/icons/lib/dist')
        ]
      }
    ]
  }
}

```

#### [umi](https://umijs.org/)
> .umirc.js

```js
export default {
  chainWebpack(config, { webpack }) {
    
    // code split @ant-design/icons
    config.module
    .rule('@ant-design/icons')
    .include.add(require.resolve('@ant-design/icons/lib/dist')).end()
    .use('ant-icon')
    .loader('webpack-ant-icon-loader');
   },
}
```

#### [`react-app-rewired`](https://github.com/timarney/react-app-rewired)
> config-overrides.js

```js
const path = require('path');

module.exports = {
  // The Webpack config to use when compiling your react app for development or production.
  webpack: function (config, env) {
    // ...add your webpack config

    // add webpack-ant-icon-loader
    config.module.rules.push({
      loader: 'webpack-ant-icon-loader',
      enforce: 'pre',
      include: [
        require.resolve('@ant-design/icons/lib/dist')
      ]
    })

    return config;
  },
}
```
#### [`customize-cra`](https://github.com/arackaf/customize-cra)
> config-overrides.js
```js
const path = require('path');
const { override } = require('customize-cra');

module.exports = override(
  // add webpack-ant-icon-loader
  (config) => {
    config.module.rules.push({
      loader: 'webpack-ant-icon-loader',
      enforce: 'pre',
      include: [
        require.resolve('@ant-design/icons/lib/dist')
      ]
    });
    return config;
  },
);
```


### 四、原理篇

主要通过`webpack`代码拆分([`import`](https://webpack.js.org/guides/code-splitting/#dynamic-imports))来完成体积优化：


* 把`@antd-design/icons/lib/dist`的图标文件拆成独立的`chunk`,且异步加载后自动注册该图标文件图标。

  由于[`ant design`](https://ant-design.gitee.io/index-cn) 内部组件使用了很多图标,所以不考虑按需加载图标的方案，仅仅是将图标文件拆分出来，减少`主文件`的体积，（类似于加载独立的字体文件)。
  

* 通过`webpack-ant-icon-loader` 提供的`runtime.js` 来完成延迟加载图标的刷新。

  由于使用了异步加载图标文件的原因，在首次进入页面后，会导致`已渲染的图标组件但是还未注册的图标`会出现空白，解决这个问题，需要触发一次组件刷新, 所以通过`runtime.js` 在异步图标文件加载完成后，从最小层面（仅刷新`已渲染但是未注册的的图标`)进行一次性组件刷新。刷新完毕后，`runtime.js`将不再介入操作，一切回归原始流程。
 

#### 等未来，`ant design`推出了解决方案，仅需要从`webpack.config.js`中移除当前`loader`即可。


### 五、开源许可
基于 [MIT License](http://zh.wikipedia.org/wiki/MIT_License) 开源，使用代码只需说明来源，或者引用 [license.txt](https://github.com/sofish/typo.css/blob/master/license.txt) 即可。

[npm-url]: https://www.npmjs.com/package/webpack-ant-icon-loader
[npm-image]: https://img.shields.io/npm/v/webpack-ant-icon-loader.svg
