import React, { useState, useEffect } from "react";
import { Container, Progress } from "reactstrap";
import "./App.css";

import Form from "./components/Form";
import List from "./components/List";
import {Pie, Doughnut} from "react-chartjs-2"; 


const ALL_TRANSACTIONS = localStorage.getItem("expenses")
  ? JSON.parse(localStorage.getItem("expenses"))
  : [];

function App() {

  const [transactions, setTransactions] = useState(ALL_TRANSACTIONS);

  // for input fields
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [comments, setComments] = useState("");


  const [budget, setBudget] = useState(2000.00); 

  const [chartData, setChartData] = useState({}); 

  const [expenseData, setExpenseChartData] = useState({}); 
  
  // Income/Expense amounts
  // Map through expenses and convert them from string to numbers
  const amounts = transactions.map(item => parseFloat(item.amount, 10));
  // filter postive amounts
  const income = amounts.filter(item => item > 0).reduce((acc, item) => (acc += item), 0).toFixed(2);
  // filter negative amounts
  const expense = (amounts.filter(item => item < 0).reduce((acc, item) => (acc += item), 0) * -1).toFixed(2);
  // balance 
  const balance = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);
  
  
  // FILTER FOR EACH EXPENSE CATEGORY
  // Food 
  const foodExpenses = transactions.filter(expense => expense.category === "Food");
  const foodExpenseTotal = foodExpenses.map(item => parseFloat(item.amount, 10));
  const foodAmount = foodExpenseTotal.reduce((acc, item) => (acc += item), 0).toFixed(2);
  // Bills 
  const billsExpenses = transactions.filter(expense => expense.category === "Bills");
  const billsExpensesTotal = billsExpenses.map(item => parseFloat(item.amount, 10));
  const billsAmount = billsExpensesTotal.reduce((acc, item) => (acc += item), 0).toFixed(2);
  //Rent 
  const rentExpenses = transactions.filter(expense => expense.category === "Rent");
  const rentExpensesTotal = rentExpenses.map(item => parseFloat(item.amount, 10));
  const rentAmount = rentExpensesTotal.reduce((acc, item) => (acc += item), 0).toFixed(2);
  //Mortage
  const mortgageExpenses = transactions.filter(expense => expense.category === "Mortgage");
  const mortgageExpensesTotal = mortgageExpenses.map(item => parseFloat(item.amount, 10));
  const mortgageAmount = mortgageExpensesTotal.reduce((acc, item) => (acc += item), 0).toFixed(2);
  //Shopping
  const shoppingExpenses = transactions.filter(expense => expense.category === "Shopping");
  const shoppingExpensesTotal = shoppingExpenses.map(item => parseFloat(item.amount, 10));
  const shoppingAmount = shoppingExpensesTotal.reduce((acc, item) => (acc += item), 0).toFixed(2);
  //Shopping
  const transportationExpenses = transactions.filter(expense => expense.category === "Transportation");
  const transportationExpensesTotal = transportationExpenses.map(item => parseFloat(item.amount, 10));
  const transportationAmount = transportationExpensesTotal.reduce((acc, item) => (acc += item), 0).toFixed(2);
  //Enterntainment
  const enterntainmentExpenses = transactions.filter(expense => expense.category === "Enterntainment");
  const enterntainmentExpensesTotal = enterntainmentExpenses.map(item => parseFloat(item.amount, 10));
  const enterntainmentAmount = enterntainmentExpensesTotal.reduce((acc, item) => (acc += item), 0).toFixed(2);
  //Car
  const carExpenses = transactions.filter(expense => expense.category === "Car");
  const carExpensesTotal = carExpenses.map(item => parseFloat(item.amount, 10));
  const carAmount = carExpensesTotal.reduce((acc, item) => (acc += item), 0).toFixed(2);
  //Other
  const otherExpenses = transactions.filter(expense => expense.category === "Other");
  const otherExpensesTotal = otherExpenses.map(item => parseFloat(item.amount, 10));
  const otherAmount = otherExpensesTotal.reduce((acc, item) => (acc += item), 0).toFixed(2);

  // Math for progress bar in the budged section
  // absolute value of balance 
  const absBalance = Math.abs(balance)
  // absBalance divided by budget
  const barValue = (parseFloat(absBalance/budget) * 100).toFixed(0);

  const chart = () => {
    setChartData ({
      labels: ['Income', 'Expense'],
      datasets: [
        {
          data: [income, expense],
          backgroundColor: [
            'rgb(31, 172, 106)',
            'tomato',
          ], 
          borderWidth: 3
        }
      ]
    })
  }

  const expenseChart = () => {
    setExpenseChartData ({
      labels: ['Food', 'Bills', 'Rent', 'Mortgage', 'Shopping', 'Transportation', 'Enterntainment', 'Car', 'Other'], // categories
      datasets: [
        {
          data: [foodAmount, billsAmount, rentAmount, mortgageAmount, shoppingAmount, transportationAmount, enterntainmentAmount, carAmount, otherAmount],
          backgroundColor: [
            '#264653',
            '#2a9d8f',
            '#e9c46a',
            '#f4a261',
            '#e76f51',
            '#283618',
            '#709fb0',
            '#af2d2d'
          ],
          borderWidth: 3,
        }
      ]
    })
  }


  // Input handler functions
  const handleName = (event) => {
    setName(event.target.value);
  };

  const handleAmount = (event) => {
    setAmount(event.target.value);
  };

  const handleCategory = (event) => {
    setCategory(event.target.value);
  };

  const handleDate = (event) => {
    setDate(event.target.value);
  };

  const handleComments = (event) => {
    setComments(event.target.value);
  };

  const handleClearExpenses = () => {
    setTransactions([]);
  };

  const handleDeleteExpense = (expenseid) => {
    const filteredExpenses = transactions.filter(expense => expense.id !== expenseid);
    setTransactions(filteredExpenses);
  }


  // store expenses locally
  // useEffect will run whenever there is a change to expenses
  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    chart();
  }, []);

  useEffect(() => {
    expenseChart();
  }, []);

  const handleSubmitForm = (event) => {
    event.preventDefault();
    //check whether the name is not empty and the amount is not negative
    if (name !== "") {
      // single expense object
      const expense = { name: name, amount: amount, category: category, date: date, comments: comments, id: Math.floor(Math.random() * 100000000) };
      // do not override previous values in the array
      // use spread operator to access previous values
      setTransactions([...transactions, expense]);

      // clean input fields
      setName("");
      setAmount("");
      setCategory("");
      setDate("");
      setComments("");
    } else {
      console.log("Invalid expense name or the amount");
    }
  };

  return (
    <Container className="themed-container" fluid={true}>
      <div className="total-container">
      <h3 className="main-header">BudgetBuddy</h3>
        <div className="budget-container">
          <div>          
            <h6 className="budget-text">Budget</h6>
            <h4 className="budget-amount-text">${budget}</h4>
          </div>
          <div className="budget-bar">
          <Progress animated color={absBalance < budget ? "success" : "danger"} className="budget-bar" value={barValue}>{barValue}%</Progress>
        </div>
        </div>
        <div className="total-expense">
          <div className="balance-text-container">          
            <h6>balance</h6>
            <h4 className="balance-amount-text">            $ 
              {balance}
            </h4>
          </div>
        </div>
        <div className="inex-titles-container">
          <div className="income-text">          
            <h6>Income</h6>
            <h4 className="income-amount-text">${income}</h4>
          </div>
          <div className="expense-text">
            <h6>Expense</h6>
            <h4 className="expense-amount-text">${expense}</h4>
          </div>
        </div>
        <div className="chart-container">
          <Pie
            data={chartData}
            options={{
              responsive: true,
              title: { text: "Total", display: true, fontColor: 'white', fontSize: 25 },
              legend: {
                labels: {
                    fontColor: "white",
                    fontSize: 15
                }
            },
            }}
          />
        </div> 
        <div className="chart-container">
          <Doughnut
            data={expenseData}
            options={{
              responsive: true,
              title: { text: "Expenses Breakdown", display: true, fontColor: 'white', fontSize: 25  },
              legend: {
                labels: {
                    fontColor: "white",
                    fontSize: 15,
                }
            },
            }}
          /> 
        </div> 
      </div>
      <div class="chart-container">
      </div>
      <Form
        name={name}
        amount={amount}
        category={category}
        date={date}
        comments={comments}
        handleName={handleName}
        handleAmount={handleAmount}
        handleSubmitForm={handleSubmitForm}
        handleCategory={handleCategory}
        handleDate={handleDate}
        handleComments={handleComments}
      />
      <List expenses={transactions} handleDeleteExpense={handleDeleteExpense} handleClearExpenses={handleClearExpenses} />
    </Container>
  );
}

export default App;
