const path = require('path');


module.exports = {
    entry: ['@babel/polyfill', './temp/js/index.js'],
    output: {
        path: path.resolve(__dirname, 'scripts'),
        filename: 'bundle.js'
    },
    devServer: {
       contentBase: "./scripts" 
    },
    plugins: [
       //custome plugins.
    ],
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