function test() {
  return import(/* webpackChunkName: 'main-entry' */ "./declare-subapps");
}
