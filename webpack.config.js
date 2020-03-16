const path = require("path");

module.exports = {
  entry: "./src/index.jsx",
  output: {
    path: path.join(__dirname, "dist"),
    filename: "bundle.js"
  },
  devServer: {
    port: 3000,
    contentBase: path.join(__dirname, "dist"),
    historyApiFallback: true
  },
  module: {
    rules: [
      {
        test: /\.js(x)?$/i,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-react", "@babel/preset-env"]
          }
        },
        exclude: /node_modules/,
        resolve: {
          extensions: [".js", ".jsx"]
        }
      },
      {
        test: /\.css$/i,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: {
                localIdentName: "[path][name]__[local]--[hash:base64:5]"
              }
            }
          }
        ]
      }
    ]
  }
};
