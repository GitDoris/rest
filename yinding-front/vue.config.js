// const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
// const CleanWebpackPlugin = require('clean-webpack-plugin')
const path = require('path')
// const vConsolePlugin = require('vconsole-webpack-plugin'); // 引入 移动端模拟开发者工具 插件 （另：https://github.com/liriliri/eruda）
const CompressionPlugin = require('compression-webpack-plugin'); //Gzip
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin; //Webpack包文件分析器
 function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
// 基本路径
  publicPath : './',
  // 输出文件目录
  outputDir: 'dist/'+process.env.VUE_APP_TYPE,
  assetsDir:'static',  
  productionSourceMap: false,
  // eslint-loader 是否在保存的时候检查
  lintOnSave: process.env.NODE_ENV !== 'production',

  configureWebpack: (config) => {
    // 入口文件
    config.entry.app = ['babel-polyfill', './src/main.js']
    // 删除console插件
    const plugins = [
    ]
    // 只有打包生产环境才需要将console删除
    if (process.env.VUE_APP_TYPE === 'production') {
      config.plugins = [...config.plugins, ...plugins]
    }
    //开发环境
		let pluginsDev = [
			//移动端模拟开发者工具(https://github.com/diamont1001/vconsole-webpack-plugin  https://github.com/Tencent/vConsole)
			// new vConsolePlugin({
			// 	filter: [], // 需要过滤的入口文件
			// 	enable: true // 发布代码前记得改回 false
			// }),
		];
    if(process.env.NODE_ENV === 'production') { // 为生产环境修改配置...process.env.NODE_ENV !== 'development'
			config.plugins = [...config.plugins, ];
		} else {
			// 为开发环境修改配置...
			config.plugins = [...config.plugins, ...pluginsDev];
		}
 
  },

  // 允许对内部的 webpack 配置进行更细粒度的修改。
  chainWebpack: (config) => {
    // 命名
    config.resolve.alias
      .set('@', resolve('src'))
    // 打包文件带hash
    // config.output.filename('[name].[hash].js').end()

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
  
  // 花裤衩
  config
      // https://webpack.js.org/configuration/devtool/#development
      .when(process.env.NODE_ENV === 'development',
        config => config.devtool('cheap-source-map')
      )

    config
      .when(process.env.NODE_ENV !== 'development',
        config => {
          config
            .plugin('ScriptExtHtmlWebpackPlugin')
            .after('html')
            .use('script-ext-html-webpack-plugin', [{
            // `runtime` must same as runtimeChunk name. default is `runtime`
              inline: /runtime\..*\.js$/
            }])
            .end()
          config
            .optimization.splitChunks({
              chunks: 'all',
              cacheGroups: {
                libs: {
                  name: 'chunk-libs',
                  test: /[\\/]node_modules[\\/]/,
                  priority: 10,
                  chunks: 'initial' // only package third parties that are initially dependent
                },
                elementUI: {
                  name: 'chunk-elementUI', // split elementUI into a single package
                  priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
                  test: /[\\/]node_modules[\\/]_?element-ui(.*)/ // in order to adapt to cnpm
                },
                commons: {
                  name: 'chunk-commons',
                  test: resolve('src/components'), // can customize your rules
                  minChunks: 3, //  minimum common number
                  priority: 5,
                  reuseExistingChunk: true
                }
              }
            })
          config.optimization.runtimeChunk('single')
        }
      )
      //花裤衩
    },

  //调整 webpack 配置 https://cli.vuejs.org/zh/guide/webpack.html#%E7%AE%80%E5%8D%95%E7%9A%84%E9%85%8D%E7%BD%AE%E6%96%B9%E5%BC%8F
	// configureWebpack: config => {
	// 	//生产and测试环境
	// 	let pluginsPro = [
	// 		new CompressionPlugin({ //文件开启Gzip，也可以通过服务端(如：nginx)(https://github.com/webpack-contrib/compression-webpack-plugin)
	// 			filename: '[path].gz[query]',
	// 			algorithm: 'gzip',
	// 			test: new RegExp('\\.(' + ['js', 'css'].join('|') + ')$', ),
	// 			threshold: 8192,
	// 			minRatio: 0.8,
	// 		}),
	// 		//	Webpack包文件分析器(https://github.com/webpack-contrib/webpack-bundle-analyzer)
	// 		new BundleAnalyzerPlugin(),
	// 	];
	// 	//开发环境
	// 	let pluginsDev = [
	// 		//移动端模拟开发者工具(https://github.com/diamont1001/vconsole-webpack-plugin  https://github.com/Tencent/vConsole)
	// 		new vConsolePlugin({
	// 			filter: [], // 需要过滤的入口文件
	// 			enable: true // 发布代码前记得改回 false
	// 		}),
	// 	];
	// 	if(process.env.NODE_ENV === 'production') { // 为生产环境修改配置...process.env.NODE_ENV !== 'development'
	// 		config.plugins = [...config.plugins, ...pluginsPro];
	// 	} else {
	// 		// 为开发环境修改配置...
	// 		config.plugins = [...config.plugins, ...pluginsDev];
	// 	}
	// },
 
  filenameHashing: true,
  // 生产环境是否生成 sourceMap 文件
  // productionSourceMap: true,
  // css相关配置
  css: {
    // 是否使用css分离插件 ExtractTextPlugin
    extract: false,
    sourceMap: true,
    // css预设器配置项
    loaderOptions: {
    },
    modules: false
    
      
  },
  parallel: require('os').cpus().length > 1,
  // PWA 插件相关配置
  // see https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa
  // pwa: {},
  // webpack-dev-server 相关配置
  devServer: {
    // open: process.platform === 'darwin',
    open:true,
    host: '0.0.0.0',
    port: 8080,
    https: false,
    hotOnly: true,
    overlay:{
      warnings:false,
      errors:true
    },
    // proxy: {
    //   '/api': {
    //     target: 'http://192.168.72.160:9091/',
    //     changeOrigin: true,
    //     pathRewrite: {
    //       '^/api': '/'
    //     }
    //   }
    // }
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
