import React from 'react';
import TransactionList from '../components/transactions/TransactionList';

const Transactions: React.FC = () => {
  return (
    <div>
      <TransactionList showFilters={true} />
    </div>
  );
};

export default Transactions;