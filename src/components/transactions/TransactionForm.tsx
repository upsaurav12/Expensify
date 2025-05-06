import React, { useState, useEffect } from 'react';
import { useFinance } from '../../context/FinanceContext';
import Button from '../ui/Button';
import { getIconComponent } from '../../data/defaultCategories';

interface TransactionFormProps {
  onClose: () => void;
  initialData?: any;
}

const TransactionForm: React.FC<TransactionFormProps> = ({ onClose, initialData }) => {
  const { categories, addTransaction, updateTransaction } = useFinance();
  const [isIncome, setIsIncome] = useState(initialData?.type === 'income' || false);
  const [formData, setFormData] = useState({
    amount: initialData?.amount || '',
    categoryId: initialData?.categoryId || '',
    description: initialData?.description || '',
    date: initialData?.date ? new Date(initialData.date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Filter categories based on transaction type
  const filteredCategories = categories.filter(cat => {
    const isIncomeCategory = ['salary', 'investment', 'other_income'].includes(cat.id);
    return isIncome ? isIncomeCategory : !isIncomeCategory;
  });

  // Set default category when transaction type changes
  useEffect(() => {
    if (filteredCategories.length > 0 && !filteredCategories.find(cat => cat.id === formData.categoryId)) {
      setFormData(prev => ({
        ...prev,
        categoryId: filteredCategories[0].id
      }));
    }
  }, [isIncome, filteredCategories, formData.categoryId]);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.amount || isNaN(Number(formData.amount)) || Number(formData.amount) <= 0) {
      newErrors.amount = 'Please enter a valid amount greater than zero';
    }
    
    if (!formData.categoryId) {
      newErrors.categoryId = 'Please select a category';
    }
    
    if (!formData.date) {
      newErrors.date = 'Please select a date';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when field is changed
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    const transactionData = {
      ...formData,
      amount: Number(formData.amount),
      type: isIncome ? 'income' : 'expense',
    };
    
    if (initialData?.id) {
      updateTransaction({
        ...transactionData,
        id: initialData.id,
        createdAt: initialData.createdAt,
      });
    } else {
      addTransaction(transactionData);
    }
    
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex w-full rounded-md overflow-hidden mb-6">
        <button
          type="button"
          className={`flex-1 py-2 text-center transition-colors ${
            isIncome
              ? 'bg-success-500 text-white'
              : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
          }`}
          onClick={() => setIsIncome(true)}
        >
          Income
        </button>
        <button
          type="button"
          className={`flex-1 py-2 text-center transition-colors ${
            !isIncome
              ? 'bg-error-500 text-white'
              : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
          }`}
          onClick={() => setIsIncome(false)}
        >
          Expense
        </button>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Amount
        </label>
        <div className="relative rounded-md shadow-sm">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="text-gray-500 sm:text-sm">$</span>
          </div>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            className={`block w-full pl-7 pr-12 py-2 sm:text-sm rounded-md border ${
              errors.amount ? 'border-error-500' : 'border-gray-300'
            } focus:ring-primary-500 focus:border-primary-500`}
            placeholder="0.00"
            step="0.01"
            min="0"
          />
        </div>
        {errors.amount && <p className="mt-1 text-sm text-error-500">{errors.amount}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Category
        </label>
        <select
          name="categoryId"
          value={formData.categoryId}
          onChange={handleChange}
          className={`block w-full py-2 px-3 sm:text-sm rounded-md border ${
            errors.categoryId ? 'border-error-500' : 'border-gray-300'
          } focus:ring-primary-500 focus:border-primary-500`}
        >
          <option value="" disabled>Select a category</option>
          {filteredCategories.map(category => {
            const Icon = getIconComponent(category.icon);
            return (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            );
          })}
        </select>
        {errors.categoryId && <p className="mt-1 text-sm text-error-500">{errors.categoryId}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Date
        </label>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className={`block w-full py-2 px-3 sm:text-sm rounded-md border ${
            errors.date ? 'border-error-500' : 'border-gray-300'
          } focus:ring-primary-500 focus:border-primary-500`}
        />
        {errors.date && <p className="mt-1 text-sm text-error-500">{errors.date}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Description (Optional)
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={2}
          className="block w-full py-2 px-3 sm:text-sm rounded-md border border-gray-300 focus:ring-primary-500 focus:border-primary-500"
          placeholder="Add notes about this transaction"
        />
      </div>

      <div className="flex justify-end space-x-3 pt-4">
        <Button type="button" variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit" variant={isIncome ? 'success' : 'primary'}>
          {initialData ? 'Update' : 'Add'} {isIncome ? 'Income' : 'Expense'}
        </Button>
      </div>
    </form>
  );
};

export default TransactionForm;