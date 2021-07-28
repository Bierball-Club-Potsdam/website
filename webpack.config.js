'use strict';

const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = require('./config.json');

module.exports = function (env) {
    return {
        entry: {},
        plugins: [
            new HtmlWebpackPlugin({
                filename: 'index.html',
                template: './source/index.pug',
                templateParameters: { config }
            }),
        ],
        module: {
            rules: [
                {
                    test: /\.pug$/,
                    use: { loader: 'pug-loader' },
                }
            ],
        },
    };
}
