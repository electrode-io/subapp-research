import {
  declareSubApp,
  serverModule,
  ssrFeature,
  reduxFeature,
  reactRouterFeature
  //   routingFeature
} from "subapp";

// export an external subapp
export const extSubapp = declareSubApp({
  name: "Ext1",
  __filename,
  getModule: () => import("./subapp"),
  wantFeatures: [
    serverModule({}),
    ssrFeature({}),
    reduxFeature({ reducers: false }),
    reactRouterFeature({})
    // routingFeature({ path: "/test1" })
  ]
});
