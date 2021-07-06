const path = require('path');

module.exports = {
    mode: "development",
    entry: './src/app.ts', // relative path
    module: {
        rules: [
            {
                test: /\.ts$/,  // .ts at the end of file
                use: 'ts-loader',   // if ts file, use ts-loader to compile
                include: [path.resolve(__dirname, 'src')],  // where the ts file should be
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.js']  // instead of using import ... from 'something.js', we use import .. from 'something'
    },
    output: {
        publicPath: 'dist',   // webpack-dev-server needs this to bring the code that have recompile store in memory to the browser
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'), // absolute path
    },
    devServer: {    // where is the home page
        publicPath: "/",
        contentBase: "./",
        hot: true
    },
};