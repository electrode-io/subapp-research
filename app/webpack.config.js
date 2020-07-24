const SubAppWebpackPlugin = require("./lib/subapp-plugin");
const SubAppLoader = require("./lib/subapp-loader");
module.exports = {
  mode: "development",
  entry: {
    main: "./src/index.js"
  },
  plugins: [new SubAppWebpackPlugin()]
  //   module: {
  //     rules: [{ loader: SubAppLoader }]
  //   }
};
