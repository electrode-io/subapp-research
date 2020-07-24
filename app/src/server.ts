const fastifyServer = require("@xarc/fastify-server");

fastifyServer({
  plugins: {
    routes: {
      register(fastify, options, next) {
        fastify.route({
          method: "GET",
          path: "/test",
          handler(req, reply) {
            reply.send("hello");
          },
        });
        next();
      },
    },
  },
});
