var path = require('path');

module.exports = {
    entry: [
        './src/base.js'
    ],
    output: {
        path: path.join(__dirname, 'js'),
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.js/,
                loader: 'babel-loader',
                include: path.join(__dirname, 'js')
            }
        ]
    }
}
