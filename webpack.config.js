const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env, argv = {}) => ({
    mode: 'development',
    entry: './src/main.jsx',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.[contenthash:8].js',
        clean: true,
        publicPath: '/',
    },
    resolve: {
        extensions: ['.js', '.jsx', '.json'],
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: 'babel-loader',
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader', 'postcss-loader'],
            },
            {
                test: /\.(png|jpe?g|gif|svg|webp|ico)$/,
                type: 'asset/resource',
            },
            {
                test: /\.(woff2?|eot|ttf|otf)$/,
                type: 'asset/resource',
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html',
        }),
        new webpack.DefinePlugin({
            __CONTACT_FORM_ID__: JSON.stringify(process.env.CONTACT_FORM_ID || 'mnpdgjdn'),
        }),
        {
            apply(compiler) {
                compiler.hooks.afterEmit.tap('CopyPortfolioPublicAssets', () => {
                    const publicDir = path.resolve(__dirname, 'public');
                    const outputDir = path.resolve(__dirname, 'dist');
                    ['images', 'projects', 'resume', 'Gourab_Ghosh_Resume.pdf'].forEach((entry) => {
                        const source = path.join(publicDir, entry);
                        if (fs.existsSync(source)) {
                            fs.cpSync(source, path.join(outputDir, entry), { recursive: true });
                        }
                    });
                });
            },
        },
    ],
    devServer: {
        port: 3000,
        hot: true,
        open: true,
        historyApiFallback: true,
        static: {
            directory: path.join(__dirname, 'public'),
        },
    },
    devtool: argv.mode === 'production' ? false : 'eval-source-map',
});
