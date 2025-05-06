import React, { createContext, useState, useEffect, useContext } from 'react';
import { Transaction, Category, FilterOptions } from '../types';
import { loadTransactions, saveTransactions, loadCategories, saveCategories } from '../utils/storage';
import { generateId } from '../utils/helpers';

interface FinanceContextType {
  transactions: Transaction[];
  categories: Category[];
  filterOptions: FilterOptions;
  addTransaction: (transaction: Omit<Transaction, 'id' | 'createdAt'>) => void;
  updateTransaction: (transaction: Transaction) => void;
  deleteTransaction: (id: string) => void;
  addCategory: (category: Omit<Category, 'id'>) => void;
  updateCategory: (category: Category) => void;
  deleteCategory: (id: string) => void;
  setFilterOptions: (options: Partial<FilterOptions>) => void;
}

const defaultFilterOptions: FilterOptions = {
  startDate: null,
  endDate: null,
  type: 'all',
  categoryId: 'all',
};

const FinanceContext = createContext<FinanceContextType | undefined>(undefined);

export function FinanceProvider({ children }: { children: React.ReactNode }) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [filterOptions, setFilterOptions] = useState<FilterOptions>(defaultFilterOptions);

  // Load data from local storage on component mount
  useEffect(() => {
    setTransactions(loadTransactions());
    setCategories(loadCategories());
  }, []);

  // Add a new transaction
  const addTransaction = (transactionData: Omit<Transaction, 'id' | 'createdAt'>) => {
    const newTransaction: Transaction = {
      ...transactionData,
      id: generateId(),
      createdAt: new Date().toISOString(),
    };
    
    const updatedTransactions = [...transactions, newTransaction];
    setTransactions(updatedTransactions);
    saveTransactions(updatedTransactions);
  };

  // Update an existing transaction
  const updateTransaction = (updatedTransaction: Transaction) => {
    const updatedTransactions = transactions.map(transaction => 
      transaction.id === updatedTransaction.id ? updatedTransaction : transaction
    );
    
    setTransactions(updatedTransactions);
    saveTransactions(updatedTransactions);
  };

  // Delete a transaction
  const deleteTransaction = (id: string) => {
    const updatedTransactions = transactions.filter(transaction => transaction.id !== id);
    setTransactions(updatedTransactions);
    saveTransactions(updatedTransactions);
  };

  // Add a new category
  const addCategory = (categoryData: Omit<Category, 'id'>) => {
    const newCategory: Category = {
      ...categoryData,
      id: generateId(),
    };
    
    const updatedCategories = [...categories, newCategory];
    setCategories(updatedCategories);
    saveCategories(updatedCategories);
  };

  // Update an existing category
  const updateCategory = (updatedCategory: Category) => {
    const updatedCategories = categories.map(category => 
      category.id === updatedCategory.id ? updatedCategory : category
    );
    
    setCategories(updatedCategories);
    saveCategories(updatedCategories);
  };

  // Delete a category
  const deleteCategory = (id: string) => {
    // Don't allow deletion if transactions are using this category
    const isInUse = transactions.some(transaction => transaction.categoryId === id);
    if (isInUse) {
      alert('Cannot delete category as it is being used in transactions.');
      return;
    }
    
    const updatedCategories = categories.filter(category => category.id !== id);
    setCategories(updatedCategories);
    saveCategories(updatedCategories);
  };

  // Update filter options
  const updateFilterOptions = (options: Partial<FilterOptions>) => {
    setFilterOptions(prevOptions => ({
      ...prevOptions,
      ...options,
    }));
  };

  const value = {
    transactions,
    categories,
    filterOptions,
    addTransaction,
    updateTransaction,
    deleteTransaction,
    addCategory,
    updateCategory,
    deleteCategory,
    setFilterOptions: updateFilterOptions,
  };

  return (
    <FinanceContext.Provider value={value}>
      {children}
    </FinanceContext.Provider>
  );
}

// Custom hook to use the finance context
export function useFinance() {
  const context = useContext(FinanceContext);
  if (context === undefined) {
    throw new Error('useFinance must be used within a FinanceProvider');
  }
  return context;
}