module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'dist/version-compare.js',
        library: 'versionCompare'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel'
            }
        ]
    }
};