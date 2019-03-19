const express = require("express");
const app = express();
const expressOasGenerator = require("express-oas-generator");
const mongoose = require("mongoose");
const config = require("config");

/////////////////////////////// EXPORTED MODULES //////////////////////

const user = require("./routes/user");
const admin = require("./routes/admin");
//const adress = require("./routes/adress");
const auth = require("./routes/auth");

//////////////// SWAGGER CONFIGURATION ////////////////////////////////
expressOasGenerator.init(app, {});

////////////////////////: JWT PRIVATE KEY CONFIGURATION ////////////////////
if (!config.get("jwtPrivateKey")) {
  console.error("FATAL ERROR: jwtPrivateKey is not defined.");
  process.exit(1);
}
/////////////////////// CONNEXION ////////////////////////////////////
mongoose
  .connect("mongodb://localhost/alertAccident")
  .then(() => console.log("Connected to MongoDB succefuly ..."))
  .catch(err => console.error("Failed to connect to MongoDB..."));

app.use(express.json());
app.use("/api/user", user);
app.use("/api/admin", admin);
//app.use("/api/adress", adress);
app.use("/api/auth", auth);

/////////////////// PORT CONFIGURATION ////////////////////////
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Using port ${port}...`));

//////////////////////////////////VALIDATE POST WITH VALIDATE METHODE AND SWAGGER DECOMPOSITION
