const Path = require("path");
const fastifyServer = require("@xarc/fastify-server");

import { renderToString } from "react-dom/server";
import { createElement } from "react";
import { wooo } from "./declare-subapps";
import { extSubapp } from "ext-subapp";
import * as Fs from "fs";
import { subAppReady } from "subapp";
import { createComponent } from "./create-component";

fastifyServer({
  connection: {
    port: 8080,
  },
  plugins: {
    "fastify-static": {
      options: {
        root: Path.join(__dirname, "../dist/"),
        prefix: "/js/",
      },
    },
    routes: {
      async register(fastify, options, next) {
        const woooSubapp = wooo();
        const ExtComponent = createComponent(extSubapp, { ssr: true });
        const WoooComponent = createComponent(woooSubapp, { ssr: true });

        await subAppReady();

        console.log("registering routes");
        const indexHtml = Fs.readFileSync(Path.join(__dirname, "../static/index.html")).toString();

        fastify.route({
          method: "GET",
          path: "/",
          handler(req, reply) {
            const ssrHtml = renderToString(
              <div>
                <WoooComponent />
                <ExtComponent />
              </div>
            );
            console.log(ssrHtml);
            reply
              .headers({ "content-type": "text/html" })
              .send(indexHtml.replace("{{SSR_CONTENT}}", ssrHtml));
          },
        });
        next();
      },
    },
  },
});
