const bcrypt = require("bcrypt");

async function ha() {
  const salt = await bcrypt.genSalt();
  const hashed = await bcrypt.hash("wiem", salt);
  console.log(salt);
  console.log(hashed);
}
ha();
