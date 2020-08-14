//Dependencies
const mongoose = require("mongoose");

//Set up our schema
const Schema = mongoose.Schema;

//Create new schema
const transactionSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: "Enter a name for transaction",
  },
  value: {
    type: Number,
    required: "Enter an amount",
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

//Store the model in a variable and export for use
const Transaction = mongoose.model("Transaction", transactionSchema);

module.exports = Transaction;
