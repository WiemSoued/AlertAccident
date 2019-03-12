const express = require("express");
const app = express();
const expressOasGenerator = require("express-oas-generator");
const mongoose = require("mongoose");

/////////////////////////////// EXPORTED MODULES //////////////////////

const user = require("./routes/user");

//////////////// SWAGGER CONFIGURATION ////////////////////////////////
expressOasGenerator.init(app, {});

/////////////////////// CONNEXION ////////////////////////////////////
mongoose
  .connect("mongodb://localhost/alertAccident")
  .then(() => console.log("Connected to MongoDB succefuly ..."))
  .catch(err => console.error("Failed to connect to MongoDB..."));

app.use(express.json());
app.use("/api/user", user);

/////////////////// PORT CONFIGURATION ////////////////////////
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Using port ${port}...`));
