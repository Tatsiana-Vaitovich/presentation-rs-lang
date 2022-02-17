const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { merge } = require('webpack-merge');
const CopyWebpackPlugin = require('copy-webpack-plugin');


const MASTER_JS_FILE = './src/index.js';
const MASTER_HTML_FILE = './src/index.html';
const OUTPUT_FOLDER = 'public';
const OUTPUT_MASTER_JS = '[name].bundle.js';

module.exports = env => {

    return {
        mode: env.mode || 'none',

        entry: {
            main: MASTER_JS_FILE
        },

        output: {
            filename: OUTPUT_MASTER_JS,
            path: path.resolve(__dirname, OUTPUT_FOLDER)
        },
        resolve: {
            extensions: ['.ts', '.tsx', '.js', '.jsx'],
            // убирает относительные пути
        },
        module: {
            rules: [
                {
                    test: /\.m?js$/,
                    exclude: /(node_modules|bower_components)/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env']
                        }
                    }
                }, {
                    test: /\.css$/,
                    use: ['style-loader', 'css-loader']
                }, {
                    test: /\.s[ac]ss$/i,
                    use: ['style-loader', 'css-loader', 'sass-loader']
                }, {
                    test: /\.(jpe?g|png|gif|ico|ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
                    use: 'base64-inline-loader?limit=1000&name=[name].[ext]',
                },
            ]
        },

        devtool: env.mode !== 'production'
            ? 'inline-source-map'
            : 'none', // Disabled on production

        devServer: {
            contentBase: `./${OUTPUT_FOLDER}`,
            compress: true,
            port: 8000
        },

        plugins: getPlugins(env),
    }
}

function getHtmlWebpackPluginOpt(env) {
    const opt = {
        template: MASTER_HTML_FILE,
        minify: {
            collapseInlineTagWhitespace: true,
            collapseWhitespace: true
        },
        inlineSource: '.(js|css)$'
    }
    return opt;
}

function getPlugins(env) {
    const plugins = [
        new HtmlWebpackPlugin(getHtmlWebpackPluginOpt(env)),
        new CopyWebpackPlugin(
            // таким образом можем переносить все, что нужно     
            {
              patterns: [
                {
                  from: path.resolve(__dirname, 'src/img'),
                  to: path.resolve(__dirname, 'public/img')
                },
              ]
            }),
    ];
    return plugins;
}