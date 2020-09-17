import { createElement as h } from "react";
import { SubApp } from "subapp";

const Ext1 = () => {
  return (
    <div>
      This is the Ext1 subapp
      <h1>hello from ext1 subapp module</h1>
    </div>
  );
};

export const subapp: SubApp<typeof Ext1> = {
  Component: Ext1,
  prepare: () => {}
};
