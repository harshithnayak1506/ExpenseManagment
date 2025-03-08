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
  const [selectedRows, setSelectedRows] = useState([]);
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
    const fetchExpenses = async () => {
      const userId = localStorage.getItem("userId"); // Get logged-in user ID
      if (!userId) return;
  
      try {
        const response = await fetch(`http://localhost:3007/expense/${userId}`);
        const data = await response.json();
        setExpenses(data);
      } catch (error) {
        console.error("Error fetching expenses:", error);
      }
    };
  
    fetchExpenses();
  }, []);
  
  

  const updateLocalStorage = (data) => {
    localStorage.setItem("expenses", JSON.stringify(data));
  };

  const handleChange = (e) => {
    setExpenseData({ ...expenseData, [e.target.name]: e.target.value });
  };

  const handleAddExpense = async () => {
    if (!expenseData.amount || !expenseData.category || !expenseData.date) {
      return alert("Please fill in all required fields.");
    }
  
    const userId = localStorage.getItem("userId");
    if (!userId) return alert("User not logged in!");
  
    const newExpense = {
      amount: parseFloat(expenseData.amount),
      category: expenseData.category,
      payment_method: expenseData.payment_method,
      date: expenseData.date,
    };
  
    try {
      let response;
      if (editIndex !== null) {
        response = await fetch(`http://localhost:3007/expense/update/${userId}/${expenses[editIndex]._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newExpense),
        });
      } else {
        response = await fetch(`http://localhost:3007/expense/add/${userId}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newExpense),
        });
      }
  
      const updatedExpenses = await response.json();
      setExpenses(updatedExpenses.expenses);
      setEditIndex(null);
    } catch (error) {
      console.error("Error adding/updating expense:", error);
    }
  
    setExpenseData({ user_id: "", amount: "", category: "", payment_method: "", date: "", status: "Pending", receipt_url: "" });
    setIsFormOpen(false);
  };
  
  

  const handleDelete = async (index) => {
    const userId = localStorage.getItem("userId");
    if (!userId) return alert("User not logged in!");
  
    const expenseId = expenses[index]._id;
  
    try {
      const response = await fetch(`http://localhost:3007/expense/delete/${userId}/${expenseId}`, { method: "DELETE" });
      const updatedExpenses = await response.json();
      setExpenses(updatedExpenses.remainingExpenses);
    } catch (error) {
      console.error("Error deleting expense:", error);
    }
  };
  
  
  const handleEdit = (index) => {
    setExpenseData(expenses[index]);
    setEditIndex(index);
    setIsFormOpen(true);
  };

  // Checkbox Selection
  const handleCheckboxChange = (id) => {
    setSelectedRows((prevSelected) => {
      if (prevSelected.includes(id)) {
        return prevSelected.filter((rowId) => rowId !== id);
      } else {
        return [...prevSelected, id];
      }
    });
  };
  
  

  const handleBulkDelete = async () => {
    const userId = localStorage.getItem("userId");
    if (!userId) return alert("User not logged in!");
  
    try {
      const response = await fetch(`http://localhost:3007/expense/delete-multiple/${userId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ expenseIds: selectedRows }),
      });
  
      const updatedExpenses = await response.json();
      setExpenses(updatedExpenses.remainingExpenses);
      setSelectedRows([]); // Clear selection
    } catch (error) {
      console.error("Error deleting expenses:", error);
    }
  };
  
  

  // 🔹 Filtering logic for the search bar
  const filteredExpenses = expenses.filter((expense) =>
    (expense?.user_id?.toLowerCase() || "").includes(searchText.toLowerCase()) ||
    (expense?.category?.toLowerCase() || "").includes(searchText.toLowerCase()) ||
    (expense?.payment_method?.toLowerCase() || "").includes(searchText.toLowerCase())
  );
  
  

  const categories = ["Food", "Travel", "Bills", "Shopping", "Health", "Entertainment", "Rent", "Education", "Miscellaneous", "Salary", "Bonus", "Investment", "Freelance", "Refund"];
  const paymentMethods = ["Cash", "Credit Card", "Debit Card", "Bank Transfer", "UPI", "PayPal"];

  const columns = [
    {
      name: "",
      cell: (row) => (
        <input
          type="checkbox"
          checked={selectedRows.includes(row._id)}
          onChange={() => handleCheckboxChange(row._id)}
        />
      ),
      width: "50px",
    },
    { name: "ID", selector: (row) => row._id, sortable: true, width: "180px" }, // Display the document ID
    { name: "Amount ($)", selector: (row) => (row.amount ? row.amount.toFixed(2) : "0.00"), sortable: true },
    { name: "Category", selector: (row) => row.category, sortable: true },
    { name: "Payment Method", selector: (row) => row.payment_method, sortable: true },
    { name: "Date", selector: (row) => new Date(row.date).toLocaleDateString(), sortable: true },
    {
      name: "Actions",
      cell: (_, index) => (
        <div className="action-buttons">
          <button className="icon-button" onClick={() => handleEdit(index)}>
            <FaEdit size={22} color="white" />
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
          <input type="text" name="user_id" placeholder="User ID" value={expenseData.user_id} onChange={handleChange} className="input" disabled/>
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

      {/* Bulk Delete Button - Appears when multiple checkboxes are selected */}
      {selectedRows.length > 1 && (
  <button className="bulk-delete-button" onClick={handleBulkDelete}>
    Delete Selected
  </button>
)}

    </div>
  );
};

export default Home;