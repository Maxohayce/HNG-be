// Module imports
const cors = require("cors");
const errorHandler = require("errorhandler");
const express = require("express");
const formData = require("express-form-data");
const mongoose = require("mongoose");

// Set enviroment variables
require("dotenv").config();

// Route imports
const routes = require("./src/routes");

// Get environment variables
const { NODE_ENV, PORT, MONGO_URI_DEV, MONGO_URI_PROD, EMAIL, PASS } = process.env;

// Configure isProduction variable
const isProduction = NODE_ENV === "production";

// Initiate app
const app = express();
const port = PORT || 8080;

// App middleware
app.use(cors());
app.use(require('morgan')('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(formData.parse());

if (!isProduction) app.use(errorHandler());

// DB connection
mongoose.connect(isProduction ? MONGO_URI_PROD : MONGO_URI_DEV, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.set("debug", true);

// Routes
app.use(routes);

app.listen(port, () => console.log(`app running on port ${port}`));
