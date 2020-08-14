//Dependencies
const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const compression = require("compression");

//Set up port so it can be deployed or used locally
const PORT = process.env.PORT || 3000;

//Use Express
const app = express();

//Middleware
app.use(logger("dev"));

app.use(compression());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

//Set up connection to mogoDB for use in deployment or locally
let workoutDb = process.env.MONGODB_URI || "mongodb://localhost/budget";
mongoose
  .connect(workoutDb, { useNewUrlParser: true, useFindAndModify: false })
  .then(() => {
    console.log("connected to mongo");
  })
  .catch((err) => {
    console.log(err);
  });

//Routes
app.use(require("./routes/api.js"));

//Port listening
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
