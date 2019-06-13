var path = require('path');
var webpack = require('webpack');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
// var sassLoader = 'style!css!sass?sourceMap=true&sourceMapContents=true';

module.exports = {
    mode: 'development',
    devtool: 'cheap-module-eval-source-map',
    entry: [
        'webpack-hot-middleware/client',
        './js/app.jsx'
    ],
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js',
        publicPath: '/static/',
    },
    module: {
        rules: [{
            test: /\.jsx?$/,
            exclude: /(node_modules|bower_components)/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env'],
                    plugins: ['@babel/plugin-proposal-object-rest-spread']
                }
            }
        },
            {
                test: /\.scss$/,
                include: [
                    path.resolve(__dirname, 'css'),
                ],
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            }],
    },
    resolve: {
        alias: {
            'react': path.join(__dirname, 'node_modules', 'react'),
        },
        extensions: [ '.js', '.jsx', '.scss', '.css'],
    },
    plugins: [
        // new CleanWebpackPlugin(["dist"]),
        new HtmlWebpackPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ],
};
