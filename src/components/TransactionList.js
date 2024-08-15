import React from 'react';

const TransactionList = ({ transactions, onEditTransaction, onDeleteTransaction }) => {
  return (
    <div>
      <h2>Transaction List</h2>
      <ul>
        {transactions.map((transaction, index) => (
          <li key={index}>
            <span>{transaction.date} - {transaction.category} - {transaction.type} - ${transaction.amount}</span>
            <button onClick={() => onEditTransaction(index, { ...transaction, amount: prompt('New amount', transaction.amount) })}>Edit</button>
            <button onClick={() => onDeleteTransaction(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TransactionList;
