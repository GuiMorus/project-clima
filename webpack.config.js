const path = require("path")
const htmlWebPlugin = require("html-webpack-plugin")
const copyWebPlugin = require("copy-webpack-plugin")

module.exports = {
    target: "web",
    mode: "development",
    entry: path.resolve(__dirname, "src", "main.js"),
    output: {
        filename: "main.js",
        path: path.resolve(__dirname, "docs")
    },

    // Configurando o Web Server
    devServer: {
        static: {
            directory: path.join(__dirname, "docs")
        },
        port: 3000,
        open: true,
        liveReload: true
    },

    // Configurando plugin para reconhecimento do HTML
    plugins: [
        new htmlWebPlugin(
            {
                template: path.resolve(__dirname, "index.html"),
                favicon: path.resolve("src", "assets", "favicon.ico")
            }
        ),

        new copyWebPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, "src", "assets"),
                    to: path.resolve(__dirname, "docs", "src", "assets")
                }
            ]
        })
    ],

    // Configurando a conexão com o css
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"],
                exclude: /node_modules/
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            ["@babel/preset-env", {targets: "defaults"}]
                        ]
                    }
                }
            }
        ]
    }
}
