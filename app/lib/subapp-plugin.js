const _ = require("lodash");
const pluginName = "SubAppPlugin";
const BasicEvaluatedExpression = require("webpack/lib/BasicEvaluatedExpression");

const assert = (pred, callback) => {
  if (!pred) {
    const x = typeof callback === "function" ? callback() : callback;
    if (typeof x === "string") {
      throw new Error(x);
    }
    throw x;
  }
};

class SubAppWebpackPlugin {
  constructor(declareApiName = "declareSubApp") {
    this._declareApiName = declareApiName;
    this._subApps = {};
  }

  apply(compiler) {
    const apiName = this._declareApiName;

    compiler.hooks.emit.tap(pluginName, (compilation) => {
      if (Object.keys(this._subApps).length > 0) {
        const subapps = JSON.stringify(this._subApps, null, 2) + "\n";
        compilation.assets["subapps.json"] = {
          source: () => subapps,
          size: () => subapps.length,
        };
      }
    });

    compiler.hooks.normalModuleFactory.tap(pluginName, (factory) => {
      factory.hooks.parser.for("javascript/auto").tap(pluginName, (parser, options) => {
        const noCwd = (x) => x.replace(process.cwd(), ".");

        const where = (source, loc) => {
          return `${source}:${loc.start.line}:${loc.start.column + 1}`;
        };

        parser.hooks.call.for(apiName).tap(pluginName, (expression) => {
          const currentSource = _.get(parser, "state.current.resource", "");
          const props = _.get(expression, "arguments[0].properties");
          const cw = () => where(noCwd(currentSource), expression.loc);

          assert(props, () => `${cw()}: you must pass an Object literal as argument to ${apiName}`);

          const nameProp = props.find((p) => p.key.name === "name");
          assert(nameProp, () => `${cw()}: argument for ${apiName} doesn't have a name property`);

          const nameVal = nameProp.value.value;
          assert(
            nameVal && typeof nameVal === "string",
            () => `${cw()}: subapp name must be specified as an inlined literal string`
          );
          const exist = this._subApps[nameVal];
          assert(
            !exist,
            () =>
              `${cw()}: subapp '${nameVal}' is already declared at ${where(
                noCwd(exist.source),
                exist.loc
              )}`
          );
          this._subApps[nameVal] = { name: nameVal, source: currentSource, loc: expression.loc };
        });

        parser.hooks.evaluate.for("Identifier").tap(pluginName, (expression) => {
          const name = expression.name;
          if (name === this._declareApiName) {
            return new BasicEvaluatedExpression().setIdentifier(name).setRange(expression.range);
          }
          return undefined;
        });
      });
    });
  }
}

module.exports = SubAppWebpackPlugin;
