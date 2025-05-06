import React from 'react';
import { TrendingUp, TrendingDown, Wallet } from 'lucide-react';
import { useFinance } from '../../context/FinanceContext';
import { calculateSummary, formatCurrency } from '../../utils/helpers';
import Card from '../ui/Card';

const Summary: React.FC = () => {
  const { transactions } = useFinance();
  const { totalIncome, totalExpenses, balance } = calculateSummary(transactions);

  const summaryItems = [
    {
      title: 'Total Income',
      value: totalIncome,
      icon: <TrendingUp size={20} />,
      color: 'text-success-500',
      bgColor: 'bg-success-50',
    },
    {
      title: 'Total Expenses',
      value: totalExpenses,
      icon: <TrendingDown size={20} />,
      color: 'text-error-500',
      bgColor: 'bg-error-50',
    },
    {
      title: 'Balance',
      value: balance,
      icon: <Wallet size={20} />,
      color: 'text-primary-500',
      bgColor: 'bg-primary-50',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {summaryItems.map((item, index) => (
        <Card key={index} className="h-full">
          <div className="flex items-center">
            <div className={`${item.bgColor} ${item.color} p-3 rounded-full mr-4`}>
              {item.icon}
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">{item.title}</p>
              <p className={`text-xl font-semibold ${
                item.title === 'Balance' ? 
                  balance >= 0 ? 'text-success-600' : 'text-error-600' 
                : item.color
              }`}>
                {formatCurrency(item.value)}
              </p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default Summary;