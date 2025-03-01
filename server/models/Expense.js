const mongoose = require("mongoose");

const ExpenseSchema = new mongoose.Schema({
  userId: { type: String, required: true }, // Linked to User
  amount: Number,
  category: String,
  payment_method: String,
  date: Date,
  status: { type: String, default: "Pending" },
});

module.exports = mongoose.model("Expense", ExpenseSchema);
