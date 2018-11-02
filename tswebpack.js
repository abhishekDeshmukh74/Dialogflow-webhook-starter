const fs = require('fs');
const nodeModules = {};
const env = process.env.NODE_ENV || 'development';

fs.readdirSync('node_modules')
    .filter(function (x) {
        return ['.bin'].indexOf(x) === -1;
    })
    .forEach(function (mod) {
        nodeModules[mod] = 'commonjs ' + mod;
    });

module.exports = {
    entry: './src/app.ts',
    mode: env,
    output: {
        path: __dirname + '/build',
        filename: 'app.js',
    },
    resolve: {
        // Add '.ts' and '.tsx' as a resolvable extension.
        extensions: ['.webpack.js', '.web.js', '.ts', '.tsx', '.js'],
    },
    module: {
        rules: [
            // All files with a '.ts' or '.tsx'
            // extension will be handled by 'ts-loader'
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
            },
        ],
    },
    target: 'node',
    externals: nodeModules,
};