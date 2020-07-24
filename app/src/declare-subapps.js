// import("../lib/subapp-loader!./subapp1");

function load() {
  return {
    getModule: () => "",
  };
}

load();

function ssrFeature(meta) {
  return meta;
}

/**
 * Declare a subapp.
 *
 * **NOTE**: A webpack plugin will statically analyze the code to extract the subapp info
 *   so options must be a literal object in place.  It cannot be a variable declared elsewhere.
 *
 * GOOD:
 *
 * ```js
 * export const subapp1 = declareSubApp({
 *   name: "Subapp1",
 *   getModule: () => import("subapp1")
 * })
 * ```
 *
 * BAD:
 *
 * ```js
 * const subappInfo = { name: "Subapp1", getModule: () => import("subapp1")};
 * export const subapp1 = declareSubApp(subappInfo);
 * ```
 *
 * @param {*} options
 */
function declareSubApp(options) {
  //
}

function reduxFeature(meta) {
  return meta;
}

function reactRouterFeature(meta) {
  return meta;
}

function routingFeature(meta) {
  return meta;
}

function wooo() {
  return declareSubApp({
    name: "Test1",
    getModule: () => import(/* webpackChunkName: 'subapp-test1' */ "./subapp1"),
    wantFeatures: [
      ssrFeature({ dir: __dirname }),
      reduxFeature({ reducers: false, dir: __dirname }),
      reactRouterFeature({}),
      routingFeature({ path: "/test1" }),
    ],
  });
}

export const test2SubApp = declareSubApp({
  name: "Test2",
  getModule: () => import("./subapp1"),
});

require("./foo");
