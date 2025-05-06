export type TransactionType = 'income' | 'expense';

export interface Category {
  id: string;
  name: string;
  color: string;
  icon: string;
}

export interface Transaction {
  id: string;
  amount: number;
  type: TransactionType;
  categoryId: string;
  description: string;
  date: string; // ISO string format
  createdAt: string; // ISO string format
}

export interface FinancialSummary {
  totalIncome: number;
  totalExpenses: number;
  balance: number;
}

export interface CategorySummary {
  categoryId: string;
  total: number;
  percentage: number;
}

export interface FilterOptions {
  startDate: string | null; // ISO string format
  endDate: string | null; // ISO string format
  type: TransactionType | 'all';
  categoryId: string | 'all';
}