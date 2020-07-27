import * as React from "react";

const Ext1 = () => {
  return (
    <div>
      This is the Ext1 subapp
      <h1>hello from ext1 subapp module</h1>
    </div>
  );
};

export const Component = Ext1;

export const prepare = () => {
  //
};
