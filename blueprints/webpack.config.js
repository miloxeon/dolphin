var path = require('path');

module.exports = {
    devtool: 'source-map',
    entry: [
        './js/base.js'
    ],
    output: {
        path: path.join(__dirname, 'js'),
        filename: 'bundle.js',
        publicPath: '/static/'
    },
    devServer: {
        proxy: [{
            path: '/api/',
            target: 'http://localhost:3001'
        }],
        historyApiFallback: true
    },
    module: {
        loaders: [
            {
                test: /\.js/,
                loaders: ['babel-loader'],
                include: path.join(__dirname, 'src')
            },
            {
                test: /\.css/,
                loaders: ['style-loader', 'css-loader']
            }
        ]
    }
}