'use strict';

const fs = require('fs');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const RemoveEmptyScriptsPlugin = require('webpack-remove-empty-scripts');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');

const config = require('./config.json');

module.exports = function (env, argv) {
    const production = argv.mode === 'production';

    const output = {
        path: path.resolve(__dirname, 'dist'),
        clean: production
    };

    const entry = {
        collapsible: './source/js/collapsible.js',
        style: './source/css/style.css',
        mail: './source/js/mail.js'
    };

    const pages = fs.readdirSync('./source', { withFileTypes: true })
        .filter((e) => e.isFile() && path.extname(e.name) === '.pug')
        .map((e) => path.basename(e.name, '.pug'));

    const plugins = [
        ...pages.map((p) =>
            new HtmlWebpackPlugin({
                filename: `${p}.html`,
                template: `./source/${p}.pug`,
                templateParameters: { config }
            })),
        new FaviconsWebpackPlugin('./source/graphics/logo/minimal/logo.svg')
    ];

    if (production) {
        plugins.push(
            new MiniCssExtractPlugin(),
            new RemoveEmptyScriptsPlugin());
    }

    const pug = {
        test: /\.pug$/,
        use: { loader: 'pug-loader' },
    };

    const css = {
        test: /\.css$/,
        use: [
            { loader: 'style-loader' },
            { loader: 'css-loader' }
        ]
    };

    if (production) {
        css.use.splice(0, 1, MiniCssExtractPlugin.loader);
    }

    const fonts = {
        test: /\.(|eot|ttf|woff|woff2)$/,
        type: 'asset/resource',
        generator: {
            filename: 'fonts/[name][ext][query]'
        }
    };

    const img = {
        test: /\.svg$/,
        type: 'asset/resource',
        generator: {
            filename: 'img/[name][ext][query]'
        }
    };

    const md = {
        test: /\.md$/,
        use: [
            { loader: 'html-loader', options: { esModule: false } },
            { loader: 'markdown-it-loader' }
        ],
    };

    const module = {
        rules: [
            pug,
            css,
            fonts,
            img,
            md,
        ]
    };

    const resolve = {
        alias: {
            fonts: path.resolve(__dirname, 'source/fonts/min')
        }
    };

    const optimization = {
        minimizer: [
            `...`,
            new CssMinimizerPlugin(),
        ],
    };

    const devServer = {
        hot: false
    }

    return {
        output,
        entry,
        plugins,
        module,
        resolve,
        optimization,
        devServer
    };
}
