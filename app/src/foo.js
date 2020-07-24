export const test1SubApp = declareSubApp({
  name: "Foo",
  getModule: () => import(/* webpackChunkName: 'subapp-test1' */ "./subapp1"),
  wantFeatures: [
    ssrFeature({ dir: __dirname }),
    reduxFeature({ reducers: false, dir: __dirname }),
    reactRouterFeature({}),
    routingFeature({ path: "/test1" }),
  ],
});
