const HtmlWebpackPlugin = require('html-webpack-plugin'); // 通过 npm 安装

const AssetsPlugin=require('assets-webpack-plugin');
const webpack = require('webpack');
const path = require('path');

const config = {
    //
    entry: ["babel-polyfill", './src/index.js'],
    output: {
        filename: '[name].js',
        path: __dirname + '/dist'
    },

    devServer: {
        contentBase: "./public",//本地服务器所加载的页面所在的目录
        historyApiFallback: true,//不跳转
        inline: true,//实时刷新
        port:'9090'
    },
    module: {
        rules: [

            { test: /\.txt$/, use: 'raw-loader' },
            {
                test: /\.css$/,
                use: [ 'style-loader', 'css-loader']
            },
            {
                test: /\.less$/,
                use: [{
                    loader: "style-loader" // creates style nodes from JS strings
                }, {
                    loader: "css-loader" // translates CSS into CommonJS
                }, {
                    loader: "less-loader" // compiles Less to CSS
                }]
            },

            { test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [["env", {
                            "targets": {
                                "chrome": 52
                            },
                            "modules": false,
                            "loose": true
                        }]]
                    }
                }
              }
            ]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin(),
        new HtmlWebpackPlugin(),
        new webpack.HotModuleReplacementPlugin({
            // Options...
        }),
        new webpack.LoaderOptionsPlugin({
            options: {
                postcss: function(){
                    return [
                        require("autoprefixer")({
                            browsers: ['ie>=8','>1% in CN']
                        })
                    ]
                }
            }
        }),
        new AssetsPlugin({
            filename:'dist/webpack.assets.js',
            processOutput:function(assets){
                return 'window.WEBPACK_ASSETS='+JSON.stringify(assets);
            }
        })

    ]
};
module.exports = config;
