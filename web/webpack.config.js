var path = require("path");
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
    devServer: {
        contentBase: path.join(__dirname, "./")
    },
    devtool: "source-map"
};
