const express = require("express");
const app = express();
const mongoose = require("mongoose");
const mongoSanitize = require("express-mongo-sanitize");
const { convertToApiError, handleError } = require("./middlewares/error-handling-middleware");
const routes = require("./routes");
require("dotenv").config();

///body parser
app.use(express.json());

///sanitize
app.use(mongoSanitize());

//mongodb connection
const mongoUri = `mongodb+srv://${process.env.DB_ADMIN}:${process.env.DB_PASS}@${process.env.DB_HOST}?retryWrites=true&w=majority`;
mongoose
  .connect(mongoUri)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch(() => {
    console.log("Couldn't connect to MongoDB");
  });

//ROUTES
app.use("/api", routes);

// Error Handling
app.use(convertToApiError);
app.use((err, req, res, next) => {
  handleError(err, res);
});

const port = process.env.PORT || 3002;
app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
