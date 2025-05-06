import { Transaction, FinancialSummary, CategorySummary, FilterOptions, Category } from '../types';
import { format, parseISO, isAfter, isBefore, isEqual } from 'date-fns';

// Format currency
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(amount);
};

// Format date for display
export const formatDate = (dateString: string): string => {
  return format(parseISO(dateString), 'MMM d, yyyy');
};

// Calculate financial summary
export const calculateSummary = (transactions: Transaction[]): FinancialSummary => {
  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);
  
  const totalExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);
  
  return {
    totalIncome,
    totalExpenses,
    balance: totalIncome - totalExpenses
  };
};

// Calculate category summaries for expenses
export const calculateCategorySummaries = (
  transactions: Transaction[],
  categories: Category[]
): CategorySummary[] => {
  const expenseTransactions = transactions.filter(t => t.type === 'expense');
  const totalExpenses = expenseTransactions.reduce((sum, t) => sum + t.amount, 0);
  
  const categorySums = expenseTransactions.reduce((acc, transaction) => {
    const { categoryId, amount } = transaction;
    acc[categoryId] = (acc[categoryId] || 0) + amount;
    return acc;
  }, {} as Record<string, number>);
  
  return Object.entries(categorySums).map(([categoryId, total]) => ({
    categoryId,
    total,
    percentage: totalExpenses > 0 ? (total / totalExpenses) * 100 : 0
  }));
};

// Filter transactions based on criteria
export const filterTransactions = (
  transactions: Transaction[],
  options: FilterOptions
): Transaction[] => {
  return transactions.filter(transaction => {
    const transactionDate = parseISO(transaction.date);
    
    // Filter by date range
    if (options.startDate && 
        !isEqual(transactionDate, parseISO(options.startDate)) && 
        isBefore(transactionDate, parseISO(options.startDate))) {
      return false;
    }
    
    if (options.endDate && 
        !isEqual(transactionDate, parseISO(options.endDate)) && 
        isAfter(transactionDate, parseISO(options.endDate))) {
      return false;
    }
    
    // Filter by transaction type
    if (options.type !== 'all' && transaction.type !== options.type) {
      return false;
    }
    
    // Filter by category
    if (options.categoryId !== 'all' && transaction.categoryId !== options.categoryId) {
      return false;
    }
    
    return true;
  });
};

// Group transactions by month for charts
export const groupTransactionsByMonth = (transactions: Transaction[]): Record<string, number>[] => {
  const incomeByMonth: Record<string, number> = {};
  const expensesByMonth: Record<string, number> = {};
  
  transactions.forEach(transaction => {
    const month = format(parseISO(transaction.date), 'MMM yyyy');
    
    if (transaction.type === 'income') {
      incomeByMonth[month] = (incomeByMonth[month] || 0) + transaction.amount;
    } else {
      expensesByMonth[month] = (expensesByMonth[month] || 0) + transaction.amount;
    }
  });
  
  return [incomeByMonth, expensesByMonth];
};

// Generate a unique ID
export const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
};