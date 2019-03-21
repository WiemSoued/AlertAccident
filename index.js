const express = require("express");
const boom = require("express-boom");
const app = express();
const expressOasGenerator = require("express-oas-generator");
const mongoose = require("mongoose");
const config = require("config");
const bodyParser = require("body-parser");
const expressValidator = require("express-validator");

/////////////////////////////// EXPORTED MODULES //////////////////////

const user = require("./routes/user");
const admin = require("./routes/admin");
const auth = require("./routes/auth");

//////////////// SWAGGER CONFIGURATION ////////////////////////////////
expressOasGenerator.init(app, {});

////////////////////////: JWT PRIVATE KEY CONFIGURATION ////////////////////
if (!config.get("jwtPrivateKey")) {
  console.error("FATAL ERROR: jwtPrivateKey is not defined.");
  process.exit(1);
}
/////////////////////// CONNEXION ////////////////////////////////////
mongoose.set("useCreateIndex", true);
mongoose
  .connect("mongodb://localhost/alertAccident", { useNewUrlParser: true })
  .then(() => console.log("Connected to MongoDB succefuly ..."))
  .catch(err => console.error("Failed to connect to MongoDB..."));

app.use(express.json());
app.use(boom());
app.use(bodyParser.json());
app.use(expressValidator());
app.use("/user", user);
app.use("/api/admin", admin);
app.use("/auth", auth);

/////////////////// PORT CONFIGURATION ////////////////////////
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Using port ${port}...`));

//////////////////////////////////VALIDATE POST WITH VALIDATE METHODE AND SWAGGER DECOMPOSITION
