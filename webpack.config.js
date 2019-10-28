let path = require('path');
let MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const isProduction = process.argv[process.argv.indexOf('--mode') + 1] === 'production';
let conf = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, './dist/'),
        filename: 'index.js',
        publicPath: './dist'
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'styles.css',
        }),
    ],
    cache: true,
    devtool: isProduction ? '' : 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: [
                            "@babel/plugin-transform-react-jsx",
                            ["@babel/plugin-proposal-class-properties", {"loose": true}]
                        ]
                    }
                }
            },
            {
                test: /\.module\.css$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            hmr: process.env.NODE_ENV === 'development'
                        }
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,
                            modules: {
                                localIdentName: '[local]__[sha1:hash:hex:7]'
                            }
                        }
                    }
                ]
            },
            {
                test: /\.(png|jp(e*)g|svg|gif)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 8000, // Convert images < 8kb to base64 strings
                        name: '/images/[name].[ext]'
                    }
                }]
            },
            {
                test: /\.(woff(2)?|ttf|eot)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '/fonts/[name].[ext]'
                        },
                    },
                ],
            },
        ]
    },
    optimization: {
        minimizer: [
            new UglifyJsPlugin(),
        ],
    },
    resolve: {
        alias: {
            '~': path.resolve(__dirname, './src'),
            '~c': path.resolve(__dirname, './src/components'),
            '~s': path.resolve(__dirname, './src/store'),
            '~img': path.resolve(__dirname, './src/assets/img')
        }
    },
    devServer: {
        publicPath: '/dist/',
        compress: true,
        port: 9000
    }
};


module.exports = conf;