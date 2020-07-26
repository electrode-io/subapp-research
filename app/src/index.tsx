import { render } from "react-dom";
import * as React from "react";

function test() {
  return import(/* webpackChunkName: 'main-entry' */ "./declare-subapps");
}

console.log("hello");

// @ts-ignore
const x = __webpack_chunk_load__;

console.log("__webpack_chunk_load__", x);

// @ts-ignore
const old = __webpack_chunk_load__;
// @ts-ignore
__webpack_chunk_load__ = (...args) => {
  console.log("loading chunk", ...args, render);
  return old(...args);
};

test().then(() => {
  // @ts-ignore
  const element = document.getElementById("app");
  console.log("subapps declared", element);
  // @ts-ignore
  window._subapps.Test1.getModule().then((test1) => {
    console.log("test1 loaded");
    render(<test1.Component />, element);
  });
});
