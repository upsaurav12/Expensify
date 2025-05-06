import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { useFinance } from '../../context/FinanceContext';
import { groupTransactionsByMonth } from '../../utils/helpers';
import Card from '../ui/Card';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const MonthlyTrends: React.FC = () => {
  const { transactions } = useFinance();
  const [incomeByMonth, expensesByMonth] = groupTransactionsByMonth(transactions);
  
  // Get all months from both datasets
  const allMonths = [
    ...new Set([
      ...Object.keys(incomeByMonth),
      ...Object.keys(expensesByMonth),
    ]),
  ].sort((a, b) => {
    const dateA = new Date(a);
    const dateB = new Date(b);
    return dateA.getTime() - dateB.getTime();
  });
  
  // Last 6 months only
  const months = allMonths.slice(-6);
  
  const chartData = {
    labels: months,
    datasets: [
      {
        label: 'Income',
        data: months.map(month => incomeByMonth[month] || 0),
        borderColor: 'rgba(16, 185, 129, 1)', // Green
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        tension: 0.3,
        fill: true,
      },
      {
        label: 'Expenses',
        data: months.map(month => expensesByMonth[month] || 0),
        borderColor: 'rgba(239, 68, 68, 1)', // Red
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        tension: 0.3,
        fill: true,
      },
    ],
  };
  
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function(value: number) {
            return '$' + value.toLocaleString();
          },
        },
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: function(context: any) {
            const label = context.dataset.label || '';
            const value = context.raw || 0;
            return `${label}: $${value.toLocaleString()}`;
          },
        },
      },
    },
  };
  
  return (
    <Card 
      title="Monthly Trends"
      className="h-full"
    >
      {months.length === 0 ? (
        <div className="py-8 text-center">
          <p className="text-gray-500">No trend data available.</p>
        </div>
      ) : (
        <div className="h-64">
          <Line data={chartData} options={chartOptions} />
        </div>
      )}
    </Card>
  );
};

export default MonthlyTrends;