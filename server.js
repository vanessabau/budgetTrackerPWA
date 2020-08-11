const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const compression = require("compression");

const PORT = process.env.PORT || 3000;

const app = express();

app.use(logger("dev"));

app.use(compression());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

let workoutDb = process.env.MONGODB_URI || "mongodb://localhost/budget";
mongoose.connect(workoutDb, {useNewUrlParser: true, useFindAndModify: false})
.then(()=>{
	console.log("connected to mongo");
}).catch((err) =>{
	console.log(err);
});

// routes
app.use(require("./routes/api.js"));

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});