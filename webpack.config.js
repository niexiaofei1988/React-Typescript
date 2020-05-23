const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const tsImportPluginFactory = require('ts-import-plugin');
// const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');

module.exports = {
    mode: 'production',
    devtool: 'source-map',
    entry: './client/index.tsx',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js',
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js'],
        enforceExtension: false,
        // alias: {}
    },
    devServer: {
        port: 9000,
        noInfo: true,
        open: 'Google Chrome',
        historyApiFallback: true, //加在devServer里
        // proxy: {
        //   'https://raw.githubusercontent.com/niexiaofei1988/data/master/data': {
        //     target: 'https://raw.githubusercontent.com/niexiaofei1988/data/master/data',
        //     changeOrigin: true,
        //   },
        // },
        // after: function(app, server) {
        //   console.log('>>>>>>>>>after');
        // },
    },
    module: {
        rules: [{
                test: /\.ts(x?)$/,
                exclude: /node_modules/,
                use: [
                    // {
                    //   loader: 'babel-loader',
                    // },
                    {
                        loader: 'ts-loader',
                        options: {
                            transpileOnly: true,
                            getCustomTransformers: () => ({
                                before: [
                                    tsImportPluginFactory({
                                        libraryName: 'antd',
                                        libraryDirectory: 'es',
                                        style: 'css', // 设置为 true 编译报错, less版本降级
                                    }),
                                ],
                            }),
                            compilerOptions: {
                                module: 'es2015',
                            },
                        },
                    },
                ],
            },
            {
                test: /\.txt$/,
                use: 'raw-loader',
            },
            {
                test: /\.(less|css)$/,
                use: ['style-loader', 'css-loader', 'less-loader'],
            },
            {
                enforce: 'pre',
                test: /\.js$/,
                loader: 'source-map-loader',
            },
        ],
    },

    plugins: [
        new CleanWebpackPlugin(),
        // new MonacoWebpackPlugin({
        //     languages: ['javascript', 'css', 'html', 'typescript', 'json'],
        // }),
        new HtmlWebpackPlugin({
            minify: {
                collapseWhitespace: true,
                removeComments: true,
                removeRedundantAttributes: true,
                removeScriptTypeAttributes: true,
                removeStyleLinkTypeAttributes: true,
                useShortDoctype: true,
            },
            template: 'client/template/index.html',
        }),
    ],
    externals: {
        react: 'React',
        'react-dom': 'ReactDOM',
    },
};