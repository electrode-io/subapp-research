import {
  declareSubApp,
  serverModule,
  ssrFeature,
  reduxFeature,
  reactRouterFeature,
  routingFeature,
  SubAppDef,
} from "subapp";

export function wooo(): SubAppDef {
  return declareSubApp({
    name: "Test1",
    __filename,
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

// setTimeout(() => test2SubApp.getModule(), 5000);

// function getSubAppComponent(subapp, name = "Component") {
//   return subapp.getModule().Component;
// }
