const SubAppWebpackPlugin = require("subapp-plugin");
const { JsonpScriptSrcPlugin } = require("./src/jsonp-script-src-plugin");

module.exports = {
  mode: "development",
  entry: {
    main: "./src/index.tsx",
  },
  output: {
    publicPath: "/js/",
    chunkLoadTimeout: 1200,
  },
  plugins: [new SubAppWebpackPlugin({ webpackVersion: 4 }), new JsonpScriptSrcPlugin()],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: "ts-loader",
            options: {
              transpileOnly: true,
            },
          },
        ],
      },
    ],
  },
  resolve: {
    mainFields: ["module", "browser", "main"],
    extensions: [".js", ".jsx", ".json", ".ts", ".tsx"],
  },
};
