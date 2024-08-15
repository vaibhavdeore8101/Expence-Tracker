import React, { useState, useEffect } from 'react';
import TransactionForm from './TransactionForm';
import TransactionList from './TransactionList';
import ChartCompo from './ChartCompo';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const HomePage = () => {
  const [transactions, setTransactions] = useState([]);
  
  useEffect(() => {
    const savedTransactions = JSON.parse(localStorage.getItem('transactions')) || [];
    setTransactions(savedTransactions);
  }, []);

  const handleAddTransaction = (transaction) => {
    const updatedTransactions = [...transactions, transaction];
    setTransactions(updatedTransactions);
    localStorage.setItem('transactions', JSON.stringify(updatedTransactions));
  };

  const handleEditTransaction = (index, updatedTransaction) => {
    const updatedTransactions = transactions.map((trans, i) => (i === index ? updatedTransaction : trans));
    setTransactions(updatedTransactions);
    localStorage.setItem('transactions', JSON.stringify(updatedTransactions));
  };

  const handleDeleteTransaction = (index) => {
    const updatedTransactions = transactions.filter((_, i) => i !== index);
    setTransactions(updatedTransactions);
    localStorage.setItem('transactions', JSON.stringify(updatedTransactions));
  };

  const calculateSummary = () => {
    const totalIncome = transactions
      .filter(trans => trans.type === 'income')
      .reduce((acc, trans) => acc + parseFloat(trans.amount), 0);
    const totalExpenses = transactions
      .filter(trans => trans.type === 'expense')
      .reduce((acc, trans) => acc + parseFloat(trans.amount), 0);
    const balance = totalIncome - totalExpenses;
    return { totalIncome, totalExpenses, balance };
  };

  const { totalIncome, totalExpenses, balance } = calculateSummary();

  const getMonthlyData = () => {
    const currentMonth = new Date().getMonth();
    const monthlyData = transactions
      .filter(trans => new Date(trans.date).getMonth() === currentMonth)
      .reduce((acc, trans) => {
        acc[trans.type] += parseFloat(trans.amount);
        return acc;
      }, { income: 0, expense: 0 });
    return monthlyData;
  };

  const monthlyData = getMonthlyData();

  const chartData = {
    labels: ['Income', 'Expenses', 'Balance'],
    datasets: [{
      label: 'Monthly Financial Overview',
      data: [monthlyData.income, monthlyData.expense, balance],
      backgroundColor: ['#4caf50', '#f44336', '#2196f3']
    }]
  };

  return (
    <div>
      <h1>Expense Tracker</h1>
      <TransactionForm onAddTransaction={handleAddTransaction} />
      <ChartCompo totalIncome={totalIncome} totalExpenses={totalExpenses} balance={balance} />
      <Bar data={chartData} options={{ responsive: true }} />
      <TransactionList transactions={transactions} onEditTransaction={handleEditTransaction} onDeleteTransaction={handleDeleteTransaction} />
    </div>
  );
};

export default HomePage;
