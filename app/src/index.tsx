import { render } from "react-dom";
import * as React from "react";

function test() {
  return import(/* webpackChunkName: 'main-entry' */ "./declare-subapps");
}

import "ext-subapp";

test().then(() => {
  // @ts-ignore
  const element = document.getElementById("app");
  console.log("subapps declared", element);
  // @ts-ignore
  const { Test1, Ext1 } = window._subapps;
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
});
