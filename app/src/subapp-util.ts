/** SubApp definition */
type TypeSubAppDef = {
  /** Name of the subapp */
  name: string;
  /** Function that returns the subapp's module through dynamic import */
  getModule: Function;
  /** Directory where subapp's module locates. Use for server only. Typically __dirname. */
  dir?: string;
  /** Extra features that the subapp wants.  Should be initialize with the feature provider function */
  wantFeatures?: any[];
};

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

export function declareSubApp(def: TypeSubAppDef) {
  console.log("declare subapp", def.name);
  // @ts-ignore
  const subapps = (window._subapps = window._subapps || {});
  subapps[def.name] = def;
  return def;
}

export function serverModule(meta) {
  return (subapp) => meta;
}

export function ssrFeature(meta) {
  return (subapp) => meta;
}

export function reduxFeature(meta) {
  return meta;
}

export function reactRouterFeature(meta) {
  return meta;
}

export function routingFeature(meta) {
  return meta;
}
