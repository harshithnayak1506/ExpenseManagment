import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { FaEdit, FaTrash, FaChartPie } from "react-icons/fa";
import Report from "./Report";
import "./Home.css";

const Home = () => {
  const [expenses, setExpenses] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [expenseData, setExpenseData] = useState({
    user_id: "",
    amount: "",
    category: "",
    payment_method: "",
    date: "",
    status: "Pending",
    receipt_url: "",
  });
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    const storedExpenses = localStorage.getItem("expenses");
    if (storedExpenses) {
      setExpenses(JSON.parse(storedExpenses));
    }
  }, []);

  const updateLocalStorage = (data) => {
    localStorage.setItem("expenses", JSON.stringify(data));
  };

  const handleChange = (e) => {
    setExpenseData({ ...expenseData, [e.target.name]: e.target.value });
  };

  const handleAddExpense = () => {
    if (!expenseData.amount || !expenseData.category || !expenseData.date) {
      return alert("Please fill in all required fields.");
    }

    const newExpense = {
      id: editIndex !== null ? expenses[editIndex].id : Date.now(),
      ...expenseData,
      amount: parseFloat(expenseData.amount),
      created_at: editIndex !== null ? expenses[editIndex].created_at : new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    let updatedExpenses;
    if (editIndex !== null) {
      updatedExpenses = [...expenses];
      updatedExpenses[editIndex] = newExpense;
      setEditIndex(null);
    } else {
      updatedExpenses = [...expenses, newExpense];
    }

    setExpenses(updatedExpenses);
    updateLocalStorage(updatedExpenses);
    setExpenseData({
      user_id: "",
      amount: "",
      category: "",
      payment_method: "",
      date: "",
      status: "Pending",
      receipt_url: "",
    });

    setIsFormOpen(false);
  };

  const handleDelete = (index) => {
    const updatedExpenses = expenses.filter((_, i) => i !== index);
    setExpenses(updatedExpenses);
    updateLocalStorage(updatedExpenses);
  };

  const handleEdit = (index) => {
    setExpenseData(expenses[index]);
    setEditIndex(index);
    setIsFormOpen(true);
  };

  // 🔹 Filtering logic for the search bar
  const filteredExpenses = expenses.filter((expense) =>
    expense.user_id.toLowerCase().includes(searchText.toLowerCase()) ||
    expense.category.toLowerCase().includes(searchText.toLowerCase()) ||
    expense.payment_method.toLowerCase().includes(searchText.toLowerCase())
  );

  const categories = ["Food", "Travel", "Bills", "Shopping", "Health", "Entertainment", "Rent", "Education", "Miscellaneous","Salary", "Bonus", "Investment", "Freelance", "Refund"];
  const paymentMethods = ["Cash", "Credit Card", "Debit Card", "Bank Transfer", "UPI", "PayPal"];

  const columns = [
    { name: "ID", selector: (row) => row.id, sortable: true, width: "120px" },
    { name: "User ID", selector: (row) => row.user_id, sortable: true },
    { name: "Amount ($)", selector: (row) => (row.amount ? row.amount.toFixed(2) : "0.00"), sortable: true },
    { name: "Category", selector: (row) => row.category, sortable: true },
    { name: "Payment Method", selector: (row) => row.payment_method, sortable: true },
    { name: "Date", selector: (row) => new Date(row.date).toLocaleDateString(), sortable: true },
    {
      name: "Actions",
      cell: (_, index) => (
        <div className="action-buttons">
          <button className="icon-button" onClick={() => handleEdit(index)}>
            <FaEdit size={22} color="green" />
          </button>
          <button className="icon-button" onClick={() => handleDelete(index)}>
            <FaTrash size={22} color="red" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="container">
      <div className="header">
        {/* 🔹 Search Bar on the Left */}
        <input
          type="text"
          placeholder="Search expenses..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="search-bar"
        />

<button className="report-button" onClick={() => setIsReportOpen(true)}>
          <FaChartPie size={20} /> {/* Pie Chart Icon */}
        </button>

        {/* 🔹 New Expense Button on the Right */}
        <button className="new-expense-button" onClick={() => setIsFormOpen(true)}>New Expense</button>
      </div>

      <DataTable columns={columns} data={filteredExpenses} fixedHeader pagination highlightOnHover />

      {isFormOpen && (
        <div className="modal">
          <h2>{editIndex !== null ? "Edit Expense" : "New Expense"}</h2>
          <input type="text" name="user_id" placeholder="User ID" value={expenseData.user_id} onChange={handleChange} className="input" />
          <input type="number" name="amount" placeholder="Amount" value={expenseData.amount} onChange={handleChange} className="input" />

          <select name="category" value={expenseData.category} onChange={handleChange} className="input">
            <option value="">Select Category</option>
            {categories.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
          </select>

          <select name="payment_method" value={expenseData.payment_method} onChange={handleChange} className="input">
            <option value="">Select Payment Method</option>
            {paymentMethods.map((method) => <option key={method} value={method}>{method}</option>)}
          </select>

          <input type="date" name="date" value={expenseData.date} onChange={handleChange} className="input" />
          
          <button className="save-button" onClick={handleAddExpense}>Save</button>
          <button className="close-button" onClick={() => setIsFormOpen(false)}>Cancel</button>
        </div>
        
      )}
      {isReportOpen && <Report expenses={expenses} onClose={() => setIsReportOpen(false)} />}
    </div>
  );
};

export default Home;
