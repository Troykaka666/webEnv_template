const path = require('path');
// const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: ['@babel/polyfill', './temp/js/index.js'],
    output: {
        path: path.resolve(__dirname, 'scripts'),
        filename: 'bundle.js'
    },
    devServer: {
       contentBase: "./scripts" 
    },
    //building html template 
    // plugins: [
    //     new HtmlWebpackPlugin({
    //         filename: 'index.html',
    //         template: './js/index.html'
    //     })
    // ],
    module:{
        rules: [
            {
                test: /\.js$/,
                exclude: '/node_modules/',
                use: {
                    loader: 'babel-loader'
                }
            }
        ]
    }
}