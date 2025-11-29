const mongoose = require("mongoose");

mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    console.log("Has been connected with Database");
  })
  .catch((err) => {
    console.log("Has been failed with Database: ", err);
  });
