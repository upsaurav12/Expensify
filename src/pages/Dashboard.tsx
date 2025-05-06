import React from 'react';
import Summary from '../components/dashboard/Summary';
import ExpensesByCategory from '../components/dashboard/ExpensesByCategory';
import TransactionList from '../components/transactions/TransactionList';

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <Summary />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ExpensesByCategory />
        <TransactionList showFilters={false} />
      </div>
    </div>
  );
};

export default Dashboard;