const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const path = require('path');
const port = 3000;
//TODO:make optimize with minify
const isDev = process.env.NODE_ENV==='development';
console.log(process.env.NODE_ENV)
const isProd = !isDev;


module.exports={
    mode:`${process.env.NODE_ENV}`,
    entry:'./src/index.js',
    output:{
        filename:isProd? 'bundle.[contentHash].js' : '[name].js',
        assetModuleFilename: 'assets/images/[name]-[hash][ext]',
        path:path.resolve(__dirname,'dist')
    },
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },{
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: "asset/resource",
            },
            {
                test: /\.css$/,
                include:/\.module\.css$/ ,
                exclude: /node_modules/,
                use: [
                    isProd?MiniCssExtractPlugin.loader : 'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            sourceMap: isProd,
                        }
                    }
                ]
            },
            {
                test: /\.(css|scss)$/,
                use: [
                    'style-loader',
                    'css-loader'
                ],
                exclude: /\.module\.css$/
            },
            {
                test:/\.ttf$/,
                use:[
                    'file-loader'
                ],
            }
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            template:"./public/index.html",
            minify:{
                collapseWhitespace:isProd
            }
        }),
        new MiniCssExtractPlugin()
    ],
    resolve:{
        extensions:['.js', '.css']
    },
    devServer:{
        host:'localhost',
        port:port,
        historyApiFallback: true,
        open:true
    }

}