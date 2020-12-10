import { createElement } from "react";

import { SubApp } from "subapp";

const Home = () => {
  return (
    <div>
      This is the Home subapp
      <h1>hello world</h1>
    </div>
  );
};

export const subapp: SubApp<typeof Home> = {
  Component: Home,
  prepare: () => {},
};
