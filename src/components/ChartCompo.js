import React from 'react';

const Summary = ({ totalIncome, totalExpenses, balance }) => {
  return (
    <div>
      <h2>Summary</h2>
      <p>Total Income: ${totalIncome}</p>
      <p>Total Expenses: ${totalExpenses}</p>
      <p>Balance: ${balance}</p>
    </div>
  );
};

export default Summary;
