import { Transaction, Category } from '../types';
import { DEFAULT_CATEGORIES } from '../data/defaultCategories';

const TRANSACTIONS_KEY = 'finance_tracker_transactions';
const CATEGORIES_KEY = 'finance_tracker_categories';

// Load transactions from local storage
export const loadTransactions = (): Transaction[] => {
  try {
    const storedTransactions = localStorage.getItem(TRANSACTIONS_KEY);
    return storedTransactions ? JSON.parse(storedTransactions) : [];
  } catch (error) {
    console.error('Error loading transactions:', error);
    return [];
  }
};

// Save transactions to local storage
export const saveTransactions = (transactions: Transaction[]): void => {
  try {
    localStorage.setItem(TRANSACTIONS_KEY, JSON.stringify(transactions));
  } catch (error) {
    console.error('Error saving transactions:', error);
  }
};

// Load categories from local storage or use defaults
export const loadCategories = (): Category[] => {
  try {
    const storedCategories = localStorage.getItem(CATEGORIES_KEY);
    return storedCategories ? JSON.parse(storedCategories) : DEFAULT_CATEGORIES;
  } catch (error) {
    console.error('Error loading categories:', error);
    return DEFAULT_CATEGORIES;
  }
};

// Save categories to local storage
export const saveCategories = (categories: Category[]): void => {
  try {
    localStorage.setItem(CATEGORIES_KEY, JSON.stringify(categories));
  } catch (error) {
    console.error('Error saving categories:', error);
  }
};

// Clear all data (for testing or reset functionality)
export const clearAllData = (): void => {
  try {
    localStorage.removeItem(TRANSACTIONS_KEY);
    localStorage.removeItem(CATEGORIES_KEY);
  } catch (error) {
    console.error('Error clearing data:', error);
  }
};