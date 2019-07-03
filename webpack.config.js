require('babel-polyfill');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); 
const NodemonPlugin = require( 'nodemon-webpack-plugin' );


module.exports = {
    mode: 'development',
    entry: './src/js/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/'
    },
    devServer: {
      contentBase: path.join(__dirname, '/dist'),
      hot: true,
        // historyApiFallback: {
        //     index: './dist/index.html',
        //   },
        watchContentBase: true,
        port: 3000,
    },
    watch: true,
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.html$/,
                use: [
                  {
                    loader: "html-loader",
                    options: {
                        attrs: [':data-src']
                    }
                  }
                ]
              },
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.(css|scss)$/,
                use: ['style-loader', 'css-loader', 'sass-loader'],
                exclude: /node_modules\/(?!.*normalize\.css).*$/,
                resolve: {
                  extensions: ['.css', '.scss'],
                },
              },
        ]
    }, 
    plugins: [
        new HtmlWebpackPlugin({
          template: './src/index.html',
          filename: 'index.html',
          hash: true
        }),
        new NodemonPlugin()
    ],
    
};