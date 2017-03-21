var path = require("path");
var webpack = require("webpack");

module.exports = {
    entry: [
        './index.ts'
    ],
    output: {
        path: path.resolve(__dirname, "./"),
        filename: "index.js"
    },
    resolve: {
        extensions: [
            '.js',
            '.ts',
            ".tsx"
        ],
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loaders: [
                    'awesome-typescript-loader'
                ],
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        // new webpack.ProvidePlugin({
        //     JQueryUI: "./node_modules/jquery-ui-dist/jquery-ui.min.js"
        // })
    ],
    devServer: {
        contentBase: path.join(__dirname, "./")
    },
    devtool: "source-map",
};
