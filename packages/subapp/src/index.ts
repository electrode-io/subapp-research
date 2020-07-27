/** SubApp definition */
type SubAppDef = {
  /** Name of the subapp */
  name: string;
  /** Function that returns the subapp's module through dynamic import */
  getModule: Function;
  /** Directory where subapp's module locates. Use for server only. Typically __dirname. */
  dir?: string;
  /**
   * Extra features that the subapp wants.  Should be initialized with the feature provider function
   *
   * The intent is to allow a module to provide one or more features for a subapp.
   *
   * Typically the feature needs to have implementation for server and client side, and exposed
   * thought the main/browser fields in package.json.
   *
   * The feature is access through an API function.  The API should return another
   * function to be called by the subapp system later, and the subapp's info will be
   * passed.
   */
  wantFeatures?: any[];
};

type SubAppDefContainer = Record<string, SubAppDef>;

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

export function declareSubApp(def: SubAppDef) {
  console.log("declare subapp", def.name);
  // @ts-ignore
  const subapps: SubAppDefContainer = (window._subapps = window._subapps || {});
  subapps[def.name] = def;
  return def;
}

type ServerModuleOptions = {
  /**
   * The directory path, relative to the subapp's declaration, that will contain modules pertaining
   * to server only.
   * If it's not provided, then the subapp's module will be loaded from the same location with the
   * expectation that there is a module named subapp-<name>-server.
   */
  path?: string;
};

/**
 * Add the server module feature to a subapp.
 *
 * @param meta
 */
export function serverModule(options: ServerModuleOptions) {
  return (subapp: SubAppDef) => options;
}

export function ssrFeature(meta) {
  return (subapp: SubAppDef) => meta;
}

export function reduxFeature(meta) {
  return (subapp: SubAppDef) => meta;
}

export function reactRouterFeature(meta) {
  return (subapp: SubAppDef) => meta;
}

export function routingFeature(meta) {
  return (subapp: SubAppDef) => meta;
}
