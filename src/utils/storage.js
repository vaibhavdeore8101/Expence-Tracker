const TRANSACTIONS_KEY = 'transactions';

export const getTransactions = () => {
  const transactions = localStorage.getItem(TRANSACTIONS_KEY);
  return transactions ? JSON.parse(transactions) : [];
};

export const addTransaction = (transaction) => {
  const transactions = getTransactions();
  transactions.push({ ...transaction, id: Date.now() });
  localStorage.setItem(TRANSACTIONS_KEY, JSON.stringify(transactions));
};

export const removeTransaction = (id) => {
  let transactions = getTransactions();
  transactions = transactions.filter(transaction => transaction.id !== id);
  localStorage.setItem(TRANSACTIONS_KEY, JSON.stringify(transactions));
};
