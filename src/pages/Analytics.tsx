import React from 'react';
import MonthlyTrends from '../components/analytics/MonthlyTrends';
import ExpensesByCategory from '../components/dashboard/ExpensesByCategory';

const Analytics: React.FC = () => {
  return (
    <div className="space-y-6">
      <MonthlyTrends />
      <ExpensesByCategory />
    </div>
  );
};

export default Analytics;