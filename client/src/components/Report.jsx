import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import "./Report.css";

ChartJS.register(ArcElement, Tooltip, Legend);

const Report = ({ expenses, onClose }) => {
  // 🔹 Aggregate category-wise data for first Pie Chart
  const categoryTotals = expenses.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
    return acc;
  }, {});

  const categoryData = {
    labels: Object.keys(categoryTotals),
    datasets: [{
      data: Object.values(categoryTotals),
      backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4CAF50", "#FF9800", "#9C27B0"],
    }]
  };

  // 🔹 Categorize transactions as Income or Expense
  const incomeKeywords = ["Salary", "Bonus", "Investment", "Freelance", "Refund"];
  const expenseKeywords = ["Food", "Bills", "Shopping", "Travel", "Rent", "Entertainment"];

  let incomeTotal = 0;
  let expenseTotal = 0;

  expenses.forEach((expense) => {
    if (incomeKeywords.some((word) => expense.category.toLowerCase().includes(word.toLowerCase()))) {
      incomeTotal += expense.amount;
    } else if (expenseKeywords.some((word) => expense.category.toLowerCase().includes(word.toLowerCase()))) {
      expenseTotal += expense.amount;
    }
  });

  const incomeExpenseData = {
    labels: ["Income", "Expense"],
    datasets: [{
      data: [incomeTotal, expenseTotal],
      backgroundColor: ["#4CAF50", "#FF6384"],
    }]
  };

  return (
    <div className="report-modal">
      <div className="report-container">
        <h2>Expense Report</h2>

        <div className="charts-wrapper">
          {/* 🔹 Pie Chart 1: Category Breakdown */}
          <div className="chart-container">
            <h3>Category-wise Breakdown</h3>
            <Pie data={categoryData} />
          </div>

          {/* 🔹 Pie Chart 2: Income vs Expense Breakdown */}
          <div className="chart-container">
            <h3>Income vs. Expense</h3>
            <Pie data={incomeExpenseData} />
          </div>
        </div>

        <button className="close-report" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default Report;
