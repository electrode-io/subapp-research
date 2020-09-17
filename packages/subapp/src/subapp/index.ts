/**
 * Options for calling declareSubApp
 */
export type SubAppOptions = {
  /**
   * Name of the subapp
   *
   * - This will be used to name the JS bundle
   * - It must follow valid filename format, avoid space and special characters
   *
   */
  name: string;

  /**
   * The dynamic import promise for the subapp's module, or a function that returns it
   */
  getModule: Promise<any> | (() => Promise<any>);

  /**
   * The name of the export for the subapp from the module.
   *
   * - default to `subapp`
   * - then `default`
   * - If it's `false`, then this subapp is treated as having no UI logic.
   *
   */
  resolveName?: string | false;

  /**
   * _optional_ webpack bundle name for the subapp
   *
   * - By default, xarc will create one like `"subapp-<name>"`
   * - Use this if you want to override it, such as to combine multiple subapps
   *   a single bundle.
   */
  bundleName?: string;

  /**
   * Extra features that the subapp wants.  Should be initialized with the feature provider function
   *
   * - The intent is to allow a module to provide one or more features for a subapp.
   *
   * - Typically the feature needs to have implementation for server and client side, and exposed
   *   thought the main/browser fields in package.json.
   *
   * - The feature is access through an API function.  The API should return another
   *   function to be called by the subapp system later, and the subapp's info will be
   *   passed.
   */
  wantFeatures?: any[];

  /**
   * File name of the module that declares the subapp.
   *
   * - Only required for server side rendering (SSR).
   * - Typically just set it to `__filename`, which webpack set to `"/<file>"` for client side bundle.
   * - If not set, then xarc will figure it out through webpack compiling.
   * - But webpack compiling is not 100%, so setting it yourself guarantees it.
   *
   */
  __filename?: string;
};

/**
 * subapp to be exported from the subapp module
 */
export type SubApp<ComponentType> = {
  /**
   * The component for this subapp.
   *
   * If it's undefined, then this subapp is treated to have no UI component
   *
   */
  Component?: ComponentType;
  /**
   * The data prepare method for this subapp.
   *
   */
  prepare?: () => void | Promise<any>;
};

export type SubAppDef = SubAppOptions & {
  _getModule: () => Promise<any>;
  _module: any;
  _ssr: boolean;
};

export type SubAppContainer = Record<string, SubAppDef>;

interface EnvHooks {
  getContainer?: () => SubAppContainer;
}

export const envHooks: EnvHooks = {};

export function __declareSubApp(opts: SubAppOptions): SubAppDef {
  const def: SubAppDef = Object.assign(
    {
      _getModule() {
        return (typeof opts.getModule === "function"
          ? opts.getModule()
          : opts.getModule
        ).then(mod => {
          return (this._module = mod);
        });
      },
      _module: null,
      _ssr: false
    },
    opts
  );

  console.log("declare subapp", opts.name);
  envHooks.getContainer()[opts.name] = def;

  return def;
}

export function subAppReady(): Promise<any[]> {
  const container = envHooks.getContainer();

  const subAppsWithSSR = [];
  for (const x in container) {
    if (container[x]._ssr) {
      subAppsWithSSR.push(container[x]._getModule());
    }
  }

  if (subAppsWithSSR.length > 0) {
    return Promise.all(subAppsWithSSR);
  } else {
    return Promise.resolve([]);
  }
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
  return (subapp: SubAppOptions) => options;
}

export function ssrFeature(meta) {
  return (subapp: SubAppOptions) => meta;
}

export function reduxFeature(meta) {
  return (subapp: SubAppOptions) => meta;
}

export function reactRouterFeature(meta) {
  return (subapp: SubAppOptions) => meta;
}

export function routingFeature(meta) {
  return (subapp: SubAppOptions) => meta;
}
