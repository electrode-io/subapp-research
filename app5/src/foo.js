export const test1SubApp = declareSubApp({
  name: "Foo",
  getModule: () => import("./subapp1"),
  wantFeatures: [
    ssrFeature({ dir: __dirname }),
    reduxFeature({ reducers: false, dir: __dirname }),
    reactRouterFeature({}),
    routingFeature({ path: "/test1" }),
  ],
});
