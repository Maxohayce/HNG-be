const cors = require("cors");
const errorHandler = require("errorhandler");
const express = require("express");
const formData = require("express-form-data");
const mongoose = require("mongoose");
const path = require('path');
const app = express();

require("dotenv").config();

const routes = require("./src/routes");

const { NODE_ENV, PORT, MONGO_URI_DEV, MONGO_URI_PROD, EMAIL, PASS } = process.env;

const isProduction = NODE_ENV === "production";


const port = PORT || 8080;

app.use(express.static('public'));
app.use('/css', express.static(__dirname + 'public/css'));
app.use('/js', express.static(__dirname + 'public/js'));
app.use('/assets', express.static(__dirname + 'public/assets'));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))


app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(formData.parse());

if (!isProduction) app.use(errorHandler());

mongoose.connect(isProduction ? MONGO_URI_PROD : MONGO_URI_DEV, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.set("debug", true);


app.use(routes);

app.listen(port, () => console.log(`app running on port ${port}`));
