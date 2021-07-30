'use strict';

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const RemoveEmptyScriptsPlugin = require('webpack-remove-empty-scripts');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

const config = require('./config.json');

module.exports = function (env) {
    return {
        output: {
            path: path.resolve(__dirname, 'dist'),
            clean: true
        },
        entry: {
            collapsible: "./source/js/collapsible.js",
            style: "./source/css/style.css"
        },
        plugins: [
            new HtmlWebpackPlugin({
                filename: 'index.html',
                template: './source/index.pug',
                templateParameters: { config }
            }),
            new MiniCssExtractPlugin(),
            new RemoveEmptyScriptsPlugin()
        ],
        module: {
            rules: [
                {
                    test: /\.pug$/,
                    use: { loader: 'pug-loader' },
                },
                {
                    test: /\.css$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        { loader: 'css-loader' }
                    ]
                },
                {
                    test: /\.(|eot|ttf|woff|woff2)$/,
                    type: 'asset/resource',
                    generator: {
                        filename: 'fonts/[name][ext][query]'
                    }
                },
                {
                    test: /\.md$/,
                    use: [
                        { loader: 'html-loader', options: { esModule: false } },
                        { loader: 'markdown-it-loader' }
                    ],
                },
            ],
        },
        resolve: {
            alias: {
                fonts: path.resolve(__dirname, 'source/fonts/min')
            }
        },
        optimization: {
            minimizer: [
                `...`,
                new CssMinimizerPlugin(),
            ],
        }
    };
}
