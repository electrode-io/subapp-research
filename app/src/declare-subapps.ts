import {
  declareSubApp,
  serverModule,
  ssrFeature,
  reduxFeature,
  reactRouterFeature,
  routingFeature,
} from "./subapp-util";

// @ts-ignore
const x = __webpack_chunk_load__;

console.log("hello there __webpack_chunk_load__", x);

// const {
//   declareSubApp,
//   ssrFeature,
//   reduxFeature,
//   reactRouterFeature,
//   routingFeature,
// } = require("./subapp-util");

function wooo() {
  return declareSubApp({
    name: "Test1",
    dir: __dirname,
    getModule: () => import("./subapp1"),
    wantFeatures: [
      serverModule({}),
      ssrFeature({}),
      reduxFeature({ reducers: false }),
      reactRouterFeature({}),
      routingFeature({ path: "/test1" }),
    ],
  });
}

export const test2SubApp = declareSubApp({
  name: "Test2",
  getModule: () => import("./subapp2"),
});

wooo();

setTimeout(() => test2SubApp.getModule(), 5000);
