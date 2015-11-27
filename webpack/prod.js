var webpack = require('webpack');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'dist/version-compare.min.js',
        library: 'versionCompare'
    },
    devtool: 'source-map',
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel'
            }
        ]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin()
    ]
};