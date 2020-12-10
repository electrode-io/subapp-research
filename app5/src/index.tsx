import { render, hydrate } from "react-dom";
import { createElement } from "react";

import { extSubapp } from "ext-subapp";
import { subAppReady } from "subapp";
import { createComponent } from "./create-component";

function app(Test1, Ext1) {
  // @ts-ignore
  const element = document.getElementById("app");
  console.log("subapps declared", element);
  Promise.all([Test1.getModule(), Ext1.getModule()]).then(([test1, ext1]) => {
    console.log("test1 loaded");
    render(
      <div>
        <test1.Component />
        <ext1.Component />
      </div>,
      element
    );
  });
}

// Testing dynamic entry

// function test() {
//   return import(/* webpackChunkName: 'main-entry' */ "./declare-subapps");
// }

// test().then(() => {
//   // @ts-ignore
//   const { Test1, Ext1 } = window._subapps;
//   return app(Test1, Ext1);
// });

// Testing static entry

import { wooo } from "./declare-subapps";

const woooSubApp = wooo();
const WoooComponent = createComponent(woooSubApp, { ssr: true });
const Ext1Component = createComponent(extSubapp, { ssr: true });

subAppReady().then(() => {
  // @ts-ignore
  const element = document.getElementById("app");
  hydrate(
    <div>
      <WoooComponent />
      <Ext1Component />
    </div>,
    element
  );
});
