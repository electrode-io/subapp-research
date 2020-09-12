import { createElement, Component } from "react";
import { SubAppDef } from "subapp";

export class SubAppComponent extends Component {
  subapp: SubAppDef;
  loading: JSX.Element;
  state: { module: any };

  constructor(props) {
    super(props);
    this.subapp = props.__subapp;
    this.state = { module: this.subapp._module };
    this.loading = <div>subapp component loading... </div>;
  }

  componentDidMount() {
    if (!this.state.module) {
      console.log("loading subapp module", this.subapp.name);
      this.subapp._getModule().then((mod) => {
        this.setState({ module: mod });
      });
    } else {
      console.log("subapp module already available", this.subapp.name);
    }
  }

  render() {
    if (this.state.module) {
      return <this.state.module.Component {...this.props} />;
    }

    return this.loading;
  }
}

export type CreateComponentOptions = {
  ssr?: boolean;
  fallback?: JSX.Element;
};

export function createComponent(subapp: SubAppDef, options: CreateComponentOptions = {}) {
  if (options.ssr) {
    subapp._ssr = true;
  }
  return (props: any) => <SubAppComponent {...props} __subapp={subapp} />;
}
