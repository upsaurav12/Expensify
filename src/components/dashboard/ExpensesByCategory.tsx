import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useFinance } from '../../context/FinanceContext';
import { calculateCategorySummaries, formatCurrency } from '../../utils/helpers';
import Card from '../ui/Card';
import { getCategoryById } from '../../data/defaultCategories';

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const ExpensesByCategory: React.FC = () => {
  const { transactions, categories } = useFinance();
  const categorySummaries = calculateCategorySummaries(transactions, categories);
  
  // Sort by amount (descending)
  const sortedSummaries = [...categorySummaries].sort((a, b) => b.total - a.total);
  
  const chartData = {
    labels: sortedSummaries.map(summary => {
      const category = getCategoryById(summary.categoryId, categories);
      return category.name;
    }),
    datasets: [
      {
        data: sortedSummaries.map(summary => summary.total),
        backgroundColor: sortedSummaries.map(summary => {
          const category = getCategoryById(summary.categoryId, categories);
          return category.color;
        }),
        borderColor: sortedSummaries.map(summary => {
          const category = getCategoryById(summary.categoryId, categories);
          return category.color;
        }),
        borderWidth: 1,
      },
    ],
  };
  
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            const label = context.label || '';
            const value = context.raw || 0;
            const percentage = context.parsed || 0;
            return `${label}: ${formatCurrency(value)} (${percentage.toFixed(1)}%)`;
          }
        }
      }
    },
  };
  
  return (
    <Card 
      title="Expenses by Category"
      className="h-full"
    >
      {sortedSummaries.length === 0 ? (
        <div className="py-8 text-center">
          <p className="text-gray-500">No expense data available.</p>
        </div>
      ) : (
        <div className="flex flex-col md:flex-row items-center">
          <div className="w-full md:w-1/2 h-64">
            <Doughnut data={chartData} options={chartOptions} />
          </div>
          
          <div className="w-full md:w-1/2 mt-6 md:mt-0 max-h-64 overflow-y-auto">
            <ul className="space-y-3">
              {sortedSummaries.map(summary => {
                const category = getCategoryById(summary.categoryId, categories);
                return (
                  <li key={summary.categoryId} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div 
                        className="w-3 h-3 rounded-full mr-2"
                        style={{ backgroundColor: category.color }}
                      />
                      <span className="text-sm font-medium text-gray-700">{category.name}</span>
                    </div>
                    <div className="text-sm text-gray-900">
                      {formatCurrency(summary.total)} <span className="text-gray-500 text-xs">({summary.percentage.toFixed(1)}%)</span>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      )}
    </Card>
  );
};

export default ExpensesByCategory;