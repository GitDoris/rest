// const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
// const CleanWebpackPlugin = require('clean-webpack-plugin')
const path = require('path')
 function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
// 基本路径
  publicPath : './',
  // 输出文件目录
  outputDir: 'dist/'+process.env.VUE_APP_TYPE,
  // eslint-loader 是否在保存的时候检查
  lintOnSave: process.env.NODE_ENV !== 'production',

  configureWebpack: (config) => {
    // 入口文件
    config.entry.app = ['babel-polyfill', './src/main.js']
    // 删除console插件
    const plugins = [
      // new CleanWebpackPlugin(['public'])
      // new UglifyJsPlugin({
      //   uglifyOptions: {
      //     compress: {
      //       warnings: false,
      //       drop_console: true,
      //       drop_debugger: true
      //     },
      //     output: {
      //       // 去掉注释内容
      //       comments: false,
      //     }
      //   },
      //   sourceMap: false,
      //   parallel: true,
      // })
      // new CleanWebpackPlugin(
      //   ['dist'], {
      //     root: path.resolve(__dirname, './'), // 根目录
      //     verbose: true, // 是否启用控制台输出信息
      //     dry: false // 设置为false,启用删除文件
      //   }
      // )
    ]
    // 只有打包生产环境才需要将console删除
    if (process.env.VUE_APP_TYPE === 'production') {
      config.plugins = [...config.plugins, ...plugins]
    }
  },

  // 允许对内部的 webpack 配置进行更细粒度的修改。
  chainWebpack: (config) => {
    // 命名
    config.resolve.alias
      .set('@', resolve('src'))
    // .set('SRC', resolve('src'))
    //   .set('ASSET', resolve('src/assets'))
    //   .set('VIEW', resolve('src/components/page'))
    //   .set('COMPONENT', resolve('src/components/common'))
    //   .set('UTIL', resolve('src/utils'))
    //   .set('SERVICE', resolve('src/services'));
    // 打包文件带hash
    config.output.filename('[name].[hash].js').end()

     //为了补删除换行而加的配置
    config.module
      .rule("vue")
      .use("vue-loader")
      .loader("vue-loader")
      .tap(options => {
        // modify the options...
        options.compilerOptions.preserveWhitespace = true;
        return options;
      });
  },

  filenameHashing: true,
  // 生产环境是否生成 sourceMap 文件
  productionSourceMap: true,
  // css相关配置
  css: {
    // 是否使用css分离插件 ExtractTextPlugin
    extract: false,
    sourceMap: true,
    // css预设器配置项
    loaderOptions: {
      // 给 sass-loader 传递选项
      // sass: {
      //   // @/ 是 src/ 的别名 npm install -D sass-loader node-sass
      //   // 所以这里假设你有 `src/variables.scss` 这个文件 
      //   data: `@import "@/index.scss";`
      // }
    },
    modules: false
    
      
  },
  parallel: require('os').cpus().length > 1,
  // PWA 插件相关配置
  // see https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa
  pwa: {},
  // webpack-dev-server 相关配置
  devServer: {
    // open: process.platform === 'darwin',
    open:true,
    host: '0.0.0.0',
    port: 8080,
    https: false,
    hotOnly: true,
    // disableHostCheck:true,
    // proxy: {
      // '/api': {
      //   target: 'https://easy-mock.com/mock/5b875b7db762eb26e90eb8f8/huaxiafinance-api/',
      //   changeOrigin: true,
      //   pathRewrite: {
      //     '^/api': '/'
      //   }
      // }
    // }
  },
  // 第三方插件配置
  pluginOptions: {
    // ...
  }
}
