const mongoose = require("mongoose");

const ExpenseSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
  amount: Number,
  category: String,
  payment_method: String,
  date: Date,
});

const UserSchema = new mongoose.Schema({
  userId: { type: String, unique: true, required: true },
  name: String,
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  expenses: [ExpenseSchema] // 🔥 Each user has their own expenses array
});

module.exports = mongoose.model("User", UserSchema);
