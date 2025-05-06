import { Category } from '../types';
import { 
  ShoppingBag, 
  Utensils, 
  Home, 
  Car, 
  Plane, 
  Clipboard, 
  Sparkles, 
  Headphones, 
  Heart, 
  Banknote, 
  Building, 
  Briefcase 
} from 'lucide-react';

export const DEFAULT_CATEGORIES: Category[] = [
  {
    id: 'food',
    name: 'Food & Dining',
    color: '#EF4444', // Red
    icon: 'Utensils'
  },
  {
    id: 'housing',
    name: 'Housing & Rent',
    color: '#3B82F6', // Blue
    icon: 'Home'
  },
  {
    id: 'transportation',
    name: 'Transportation',
    color: '#F59E0B', // Amber
    icon: 'Car'
  },
  {
    id: 'shopping',
    name: 'Shopping',
    color: '#EC4899', // Pink
    icon: 'ShoppingBag'
  },
  {
    id: 'travel',
    name: 'Travel',
    color: '#8B5CF6', // Purple
    icon: 'Plane'
  },
  {
    id: 'healthcare',
    name: 'Healthcare',
    color: '#10B981', // Green
    icon: 'Clipboard'
  },
  {
    id: 'entertainment',
    name: 'Entertainment',
    color: '#F97316', // Orange
    icon: 'Headphones'
  },
  {
    id: 'personal',
    name: 'Personal Care',
    color: '#6366F1', // Indigo
    icon: 'Heart'
  },
  {
    id: 'other_expense',
    name: 'Other Expenses',
    color: '#9CA3AF', // Gray
    icon: 'Sparkles'
  },
  {
    id: 'salary',
    name: 'Salary',
    color: '#10B981', // Green
    icon: 'Briefcase'
  },
  {
    id: 'investment',
    name: 'Investment',
    color: '#6366F1', // Indigo
    icon: 'Building'
  },
  {
    id: 'other_income',
    name: 'Other Income',
    color: '#8B5CF6', // Purple
    icon: 'Banknote'
  }
];

export const getIconComponent = (iconName: string) => {
  switch (iconName) {
    case 'ShoppingBag':
      return ShoppingBag;
    case 'Utensils':
      return Utensils;
    case 'Home':
      return Home;
    case 'Car':
      return Car;
    case 'Plane':
      return Plane;
    case 'Clipboard':
      return Clipboard;
    case 'Sparkles':
      return Sparkles;
    case 'Headphones':
      return Headphones;
    case 'Heart':
      return Heart;
    case 'Banknote':
      return Banknote;
    case 'Building':
      return Building;
    case 'Briefcase':
      return Briefcase;
    default:
      return Sparkles;
  }
};

export const getCategoryById = (id: string, categories: Category[]): Category => {
  return categories.find(cat => cat.id === id) || {
    id: 'unknown',
    name: 'Unknown',
    color: '#9CA3AF',
    icon: 'Sparkles'
  };
};