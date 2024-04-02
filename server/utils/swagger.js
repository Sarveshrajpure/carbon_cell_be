const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const { version } = require("../../package.json");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Carbon Cell Api Docs",
      version,
    },
    components: {
      securitySchemas: { bearerAuth: { type: "http", scheme: "bearer", bearerFormat: "JWT" } },
    },
    security: [{ bearerAuth: [] }],
  },
  apis: ['"../routes/index.js"'],
};

const swaggerSpec = swaggerJsDoc(options);

const swaggerDocs = (app, port) => {
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  app.get("docs.json", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });

  console.log(`Docs avaailble at http://localhost:${port}/docs`);
};
