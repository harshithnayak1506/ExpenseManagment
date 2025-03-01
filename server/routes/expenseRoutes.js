const express = require("express");
const User = require("../models/User");
const mongoose = require("mongoose");
const router = express.Router();

// 🔹 ADD EXPENSE for a specific user
router.post("/add/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const { amount, category, payment_method, date } = req.body;

    const user = await User.findOne({ userId });
    if (!user) return res.status(404).json({ message: "User not found" });

    const newExpense = { _id: new mongoose.Types.ObjectId(), amount, category, payment_method, date };
    user.expenses.push(newExpense);
    await user.save();

    res.status(201).json({ message: "Expense added successfully", expenses: user.expenses });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// 🔹 GET ALL EXPENSES for a specific user
router.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findOne({ userId });

    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user.expenses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// 🔹 UPDATE EXPENSE
router.put("/update/:userId/:expenseId", async (req, res) => {
  try {
    const { userId, expenseId } = req.params;
    const { amount, category, payment_method, date } = req.body;

    const user = await User.findOne({ userId });
    if (!user) return res.status(404).json({ message: "User not found" });

    const expense = user.expenses.id(expenseId);
    if (!expense) return res.status(404).json({ message: "Expense not found" });

    expense.amount = amount;
    expense.category = category;
    expense.payment_method = payment_method;
    expense.date = date;

    await user.save();
    res.json({ message: "Expense updated", expenses: user.expenses });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// 🔹 DELETE EXPENSE
router.delete("/delete/:userId/:expenseId", async (req, res) => {
  try {
    const { userId, expenseId } = req.params;

    const user = await User.findOne({ userId });
    if (!user) return res.status(404).json({ message: "User not found" });

    user.expenses = user.expenses.filter(exp => exp._id.toString() !== expenseId);
    await user.save();

    res.json({ message: "Expense deleted", remainingExpenses: user.expenses });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.delete("/delete-multiple/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const { expenseIds } = req.body; // Get selected expense IDs

    const user = await User.findOne({ userId });
    if (!user) return res.status(404).json({ message: "User not found" });

    user.expenses = user.expenses.filter(exp => !expenseIds.includes(exp._id.toString()));
    await user.save();

    res.json({ message: "Selected expenses deleted", remainingExpenses: user.expenses });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



module.exports = router;
