const Path = require("path");
const SubAppWebpackPlugin = require("subapp-plugin");
const { JsonpScriptSrcPlugin } = require("./src/jsonp-script-src-plugin");

/* eslint-disable @typescript-eslint/no-var-requires */

const { SourceMapDevToolPlugin } = require("webpack");

module.exports = {
  mode: "development",
  entry: {
    main: "./src/index.tsx",
  },
  output: {
    path: Path.resolve("dist"),
    publicPath: "/js/",
    chunkLoadTimeout: 1200,
  },
  // must set this to false for the custom SourceMapDevToolPlugin config to work
  devtool: false,
  plugins: [
    new SourceMapDevToolPlugin({
      filename: "map/[file].map",
      append: `\n//# sourceMappingURL=[url]`,
    }),
    new SubAppWebpackPlugin({ webpackVersion: 4 }),
    new JsonpScriptSrcPlugin(),
  ],
  module: {
    rules: [
      {
        // any file with ~es2x~, ~es6~, or ~es2015~ etc in path will be transpiled also, even
        // if they are in node_modules
        test: /\.tsx?$|~es2x~|~es6~|~es20..~/,
        use: [
          {
            loader: "ts-loader",
            options: {
              transpileOnly: true,
              compilerOptions: { module: "es2020", target: "es5" },
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
