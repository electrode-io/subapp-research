import {
  declareSubApp,
  serverModule,
  ssrFeature,
  reduxFeature,
  reactRouterFeature,
  routingFeature,
} from "subapp";

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
